import "server-only";

import OpenAI from "openai";
import {
  getDailyWhisperByDate,
  getDailyWhispersForMonth,
  getJstDateKey,
  saveDailyWhisper,
  type DailyWhisperRecord,
} from "@/lib/daily-whispers";

const generationLocks = new Map<string, Promise<DailyWhisperRecord>>();

const FALLBACK_WHISPERS = [
  "薄明かりが背を押す日",
  "月影が迷いをほどく気配",
  "風紋が答えを運ぶ予感",
  "白露が心を澄ます兆し",
  "静かな扉が開くタイミング",
  "灯芯に願いが宿るきっかけ",
  "朝霧が歩幅を整える日",
  "星屑が本音を照らす気配",
  "水鏡に道筋が映る予感",
  "羽音が追い風を告げる兆し",
  "花雫が余白を満たすタイミング",
  "銀糸が縁を結ぶきっかけ",
  "凪いだ空に福音が差す日",
  "琥珀の灯が揺らぐ気配",
  "朝露に直感が宿る予感",
  "舟影が流れを変える兆し",
  "白波が縛りを解くタイミング",
  "梢風が新章を呼ぶきっかけ",
  "宵星が静けさを編む日",
  "光粒がめぐりを寄せる気配",
  "雲間に吉兆がひらく予感",
  "鈴音が縁先を知らせる兆し",
  "野花が視界を和らげるタイミング",
  "真珠の息が満ちるきっかけ",
];

const FORBIDDEN_TERMS = [
  "カード",
  "タロット",
  "ルノルマン",
  "大アルカナ",
  "小アルカナ",
  "ワンド",
  "カップ",
  "ソード",
  "ペンタクル",
  "愚者",
  "魔術師",
  "女教皇",
  "女帝",
  "皇帝",
  "法王",
  "恋人",
  "戦車",
  "力",
  "隠者",
  "運命の輪",
  "正義",
  "吊るされた男",
  "死神",
  "節制",
  "悪魔",
  "塔",
  "星",
  "月",
  "太陽",
  "審判",
  "世界",
];

const ENDINGS = ["日", "気配", "予感", "兆し", "タイミング", "きっかけ"] as const;
const METAPHOR_TERMS = [
  "薄明かり",
  "月影",
  "風紋",
  "白露",
  "扉",
  "灯芯",
  "朝霧",
  "星屑",
  "水鏡",
  "羽音",
  "花雫",
  "銀糸",
  "凪いだ空",
  "琥珀",
  "朝露",
  "舟影",
  "白波",
  "梢風",
  "宵星",
  "光粒",
  "雲間",
  "鈴音",
  "野花",
  "真珠",
];
const TERM_STOPWORDS = new Set([
  "今日",
  "明日",
  "気持ち",
  "心",
  "流れ",
  "静か",
  "やさしさ",
  "余白",
  "答え",
  "予感",
  "気配",
  "兆し",
  "日",
  "タイミング",
  "きっかけ",
]);

const DAILY_WHISPER_SYSTEM_PROMPT = [
  "あなたは「白の館 LUMINA」のトップページに表示する短い日替わりメッセージを書きます。",
  "これは「今日のルミナのささやき」であり、毎日の占い本文とは別物です。",
  "JSONのみを返してください。",
].join("\n");

function getSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["message"],
    properties: {
      message: { type: "string" },
    },
  } as const;
}

function buildUserPrompt(dateKey: string): string {
  return [
    `対象日: ${dateKey}`,
    "",
    "次の条件を守って、日本語で1つだけ生成してください。",
    "- トップページ用の短い日別運勢",
    "- 1日1文のみ",
    "- 最大24文字",
    "- 短く余韻のある文章",
    "- 占いの雰囲気を保つ",
    "- 静かでやわらかい語り口",
    "- 改行しない",
    "- 句点は付けなくてよい",
    "- カード名や具体的な鑑定結果は出さない",
    "- 恋愛や仕事など特定テーマに寄せすぎない",
    "- 同月に使った単語を繰り返さない",
    "- 同月に使った比喩表現を繰り返さない",
    "- 語尾は「日 / 気配 / 予感 / 兆し / タイミング / きっかけ」から自然に選ぶ",
    "- 同じ語尾を同月で3回以上使わない",
    "- 返答はJSONの message に本文だけを入れる",
  ].join("\n");
}

function buildUserPromptWithHistory(dateKey: string, monthlyMessages: string[]): string {
  return [
    buildUserPrompt(dateKey),
    "",
    monthlyMessages.length > 0
      ? [
          "同月の既存メッセージ:",
          ...monthlyMessages.map((message) => `- ${message}`),
          "上記と単語・比喩・語尾が重ならない新作にしてください。",
        ].join("\n")
      : "同月の既存メッセージはまだありません。",
  ].join("\n");
}

function normalizeGeneratedMessage(message: string): string {
  const normalized = message
    .replace(/\r\n/g, "")
    .replace(/\n/g, "")
    .replace(/[「」"]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const firstSentence = normalized
    .split(/(?<=[。！？])/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)[0] ?? normalized;

  return firstSentence.replace(/[。！？]+$/g, "").trim();
}

function extractTerms(message: string): string[] {
  return Array.from(message.matchAll(/[一-龠々ぁ-んァ-ヶー]{2,}/g))
    .map((match) => match[0])
    .filter((term) => !TERM_STOPWORDS.has(term));
}

function extractMetaphors(message: string): string[] {
  return METAPHOR_TERMS.filter((term) => message.includes(term));
}

function resolveEnding(message: string): (typeof ENDINGS)[number] | null {
  return ENDINGS.find((ending) => message.endsWith(ending)) ?? null;
}

function isValidWhisper(message: string, monthlyMessages: string[]): boolean {
  const compact = message.trim();
  const compactLength = compact.length;
  const lineCount = compact.split("\n").filter(Boolean).length;

  if (!compact || compactLength > 24) {
    return false;
  }
  if (lineCount !== 1) {
    return false;
  }
  if (/[。！？].+[。！？]/.test(compact)) {
    return false;
  }
  if (FORBIDDEN_TERMS.some((term) => compact.includes(term))) {
    return false;
  }
  const currentTerms = new Set(extractTerms(compact));
  const currentMetaphors = new Set(extractMetaphors(compact));
  const currentEnding = resolveEnding(compact);

  const previousTerms = new Set(monthlyMessages.flatMap((entry) => extractTerms(entry)));
  const previousMetaphors = new Set(monthlyMessages.flatMap((entry) => extractMetaphors(entry)));
  const endingCount = monthlyMessages.filter((entry) => resolveEnding(entry) === currentEnding).length;

  if ([...currentTerms].some((term) => previousTerms.has(term))) {
    return false;
  }
  if ([...currentMetaphors].some((term) => previousMetaphors.has(term))) {
    return false;
  }
  if (!currentEnding || endingCount >= 2) {
    return false;
  }
  return true;
}

function getFallbackWhisper(dateKey: string, monthlyMessages: string[]): string {
  const numeric = Number(dateKey.replace(/-/g, ""));
  const startIndex = Number.isFinite(numeric) ? numeric % FALLBACK_WHISPERS.length : 0;

  for (let offset = 0; offset < FALLBACK_WHISPERS.length; offset += 1) {
    const candidate = FALLBACK_WHISPERS[(startIndex + offset) % FALLBACK_WHISPERS.length]!;
    if (isValidWhisper(candidate, monthlyMessages)) {
      return candidate;
    }
  }

  return "月灯りが道を示す日";
}

async function generateWhisperText(dateKey: string, monthlyMessages: string[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return getFallbackWhisper(dateKey, monthlyMessages);
  }

  try {
    const openai = new OpenAI({ apiKey });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "daily_whisper",
          schema: getSchema(),
          strict: true,
        },
      },
      messages: [
        { role: "system", content: DAILY_WHISPER_SYSTEM_PROMPT },
        { role: "user", content: buildUserPromptWithHistory(dateKey, monthlyMessages) },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content?.trim();
    if (!rawContent) {
      return getFallbackWhisper(dateKey, monthlyMessages);
    }

    const parsed = JSON.parse(rawContent) as { message?: string };
    const normalized = normalizeGeneratedMessage(parsed.message ?? "");
    if (!isValidWhisper(normalized, monthlyMessages)) {
      return getFallbackWhisper(dateKey, monthlyMessages);
    }
    return normalized;
  } catch {
    return getFallbackWhisper(dateKey, monthlyMessages);
  }
}

async function createDailyWhisper(dateKey: string): Promise<DailyWhisperRecord> {
  const existing = await getDailyWhisperByDate(dateKey);
  if (existing) {
    return existing;
  }

  const monthlyMessages = (await getDailyWhispersForMonth(dateKey))
    .filter((record) => record.date !== dateKey)
    .map((record) => record.message);
  const message = await generateWhisperText(dateKey, monthlyMessages);
  return saveDailyWhisper({
    date: dateKey,
    message,
    created_at: new Date().toISOString(),
  });
}

export async function getOrCreateDailyWhisper(dateKey = getJstDateKey()): Promise<DailyWhisperRecord> {
  const existing = await getDailyWhisperByDate(dateKey);
  if (existing) {
    return existing;
  }

  const inFlight = generationLocks.get(dateKey);
  if (inFlight) {
    return inFlight;
  }

  const pending = createDailyWhisper(dateKey).finally(() => {
    generationLocks.delete(dateKey);
  });

  generationLocks.set(dateKey, pending);
  return pending;
}
