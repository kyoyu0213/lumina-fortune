import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import {
  getDailyWhisperByDate,
  getDailyWhispersForMonth,
  getJstDateKey,
  saveDailyWhisper,
  type DailyWhisperRecord,
} from "@/lib/daily-whispers";

const generationLocks = new Map<string, Promise<DailyWhisperRecord>>();

/**
 * ルミナらしい「今日のひとこと」──前向きな気づきや人生のヒントを
 * やさしく、でも芯のある言葉で届ける。思わずシェアしたくなるような一言。
 */
const FALLBACK_WHISPERS = [
  "人が変わるのを待つより、自分から変わるほうがずっと早い。そしてその変化は、必ず誰かに届きます",
  "理想の自分と今の自分に差があるのは当たり前。焦らなくていい。その差こそが、あなたを前に進ませる力になるから",
  "何かのせい、誰かのせいにしている間は、幸運の扉はなかなか開きません。手放した瞬間に、風が変わります",
  "言葉だけの優しさは忘れられるけれど、行動で見せてくれた優しさは、ずっと胸に残ります",
  "運気が変わる手前が、いちばんつらく苦しいもの。今がつらいなら、あと一歩で流れが変わるサインかもしれません",
  "人を喜ばせることに夢中になれる人は、気づいたら自分もいちばん楽しくなっている。それが幸せの正体です",
  "「私なんか」と思った瞬間、可能性の扉が一つ閉じてしまう。あなたの価値は、あなたが決めていいのです",
  "うまくいかない日があるから、うまくいった日の喜びが何倍にもなる。今日の涙は、明日の笑顔の種です",
  "誰かに愛されたいなら、まず自分を愛してあげてください。あなたが自分に向ける優しさが、周りにも広がっていきます",
  "完璧じゃなくていい。完璧じゃないあなたを好きでいてくれる人が、本当に大切な人です",
  "過去を変えることはできないけれど、過去の意味を変えることはできる。あの経験が今のあなたを作っています",
  "「もう遅い」と思ったときが、実はいちばん早いタイミング。始めるのに遅すぎることなんてありません",
  "比べるなら、他の誰かではなく、昨日の自分と。ほんの少しでも前に進めたなら、それで十分です",
  "心配ごとの9割は実際には起こりません。今夜の不安は、明日の朝にはきっと小さくなっています",
  "あなたが今日がんばったこと、誰も気づいていないように見えても、ちゃんと見ている人はいます",
  "「ありがとう」は魔法の言葉。口に出すたびに、あなたの周りの空気がほんの少しあたたかくなります",
  "弱さを見せられる人は、本当は誰よりも強い人。完璧なふりをしなくていいのです",
  "答えが出ない夜は、答えを出さなくていい夜。焦らず、ただ呼吸を整えるだけで大丈夫",
  "幸せは追いかけると逃げていく。でも、目の前のことを丁寧にしていると、いつの間にかそばにいます",
  "あなたが「当たり前」だと思っていることは、誰かにとっての「ありえないほどの幸せ」かもしれません",
  "嫌われることを恐れて自分を殺すより、ありのままで好かれる方がずっと楽で、ずっと幸せです",
  "涙の数だけ優しくなれるのは本当。今つらい分だけ、あなたは誰かの痛みがわかる人になれます",
  "待っているだけでは何も変わらない。でも「待つ」と決めた強さは、いつか必ず実を結びます",
  "好きなことをしている時間は、人生のごほうび。忙しい毎日の中でも、その時間だけは手放さないでくださいね",
];

const FORBIDDEN_TERMS = [
  "カード", "タロット", "ルノルマン", "大アルカナ", "小アルカナ",
  "ワンド", "カップ", "ソード", "ペンタクル",
];

const DAILY_WHISPER_SYSTEM_PROMPT = [
  "あなたは白の魔女ルミナです。",
  "「白の館 LUMINA」のトップページに表示する、日替わりの「ルミナのささやき」を書きます。",
  "占いの予言ではなく、読んだ人が「なるほど」と納得したり、前向きな気持ちになれる言葉を届けてください。",
  "思わず誰かにシェアしたくなるような、心に残る一言です。",
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
    "",
    "■ トーン",
    "- 白の魔女ルミナが読者にそっと語りかけるような、やさしく芯のある言葉",
    "- 占いの予言ではなく、人生の気づき・前向きなヒント・心が軽くなる視点",
    "- 読んだ人が「なるほど」「確かに」と思わず頷いてしまうような言葉",
    "- 思わずスクショしてシェアしたくなるような名言感",
    "",
    "■ 形式",
    "- 1〜2文（40〜80文字程度）",
    "- 改行は1回まで許可",
    "- 句点（。）は使ってよい",
    "- カード名や具体的な占い結果は出さない",
    "- 「です・ます」調で統一",
    "",
    "■ テーマの例（ローテーションして偏らないようにする）",
    "- 自分を変える勇気 / 自己肯定感 / 焦らなくていい",
    "- 人間関係の知恵 / 優しさの本質 / 感謝の力",
    "- つらい時期の乗り越え方 / 小さな幸せに気づく力",
    "- 行動することの大切さ / 比較をやめる / 完璧主義を手放す",
    "- 恋愛のヒント / 自分を大切にすること / 直感を信じる",
    "",
    "■ 避けること",
    "- 抽象的すぎて何を言っているかわからない詩的表現",
    "- 「光」「風」「星」「月」だけで構成されるふわっとした文",
    "- 占い用語（カード名、アルカナ等）",
    "- 説教臭い言い方・上から目線",
    "",
    "■ 良い例",
    "- 「人が変わるのを待つより、自分から変わるほうがずっと早い。そしてその変化は、必ず誰かに届きます」",
    "- 「完璧じゃなくていい。完璧じゃないあなたを好きでいてくれる人が、本当に大切な人です」",
    "- 「心配ごとの9割は実際には起こりません。今夜の不安は、明日の朝にはきっと小さくなっています」",
    "",
    "返答はJSONの message に本文だけを入れてください。",
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
          "上記とテーマ・表現が重ならない新作にしてください。",
        ].join("\n")
      : "同月の既存メッセージはまだありません。",
  ].join("\n");
}

function normalizeGeneratedMessage(message: string): string {
  const normalized = message
    .replace(/\r\n/g, "\n")
    .replace(/[「」"]/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  // 最大2文まで許可
  const lines = normalized.split("\n").filter(Boolean);
  if (lines.length > 2) {
    return lines.slice(0, 2).join("\n");
  }

  return normalized;
}

function isValidWhisper(message: string, monthlyMessages: string[]): boolean {
  const compact = message.trim();
  if (!compact) return false;

  // 文字数チェック（改行込みで10〜120文字）
  const charCount = compact.replace(/\n/g, "").length;
  if (charCount < 10 || charCount > 120) return false;

  // 行数チェック（最大2行）
  const lineCount = compact.split("\n").filter(Boolean).length;
  if (lineCount > 2) return false;

  // 占い用語チェック
  if (FORBIDDEN_TERMS.some((term) => compact.includes(term))) return false;

  // 同月の既存メッセージと完全一致チェック
  if (monthlyMessages.some((existing) => existing === compact)) return false;

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

  return "あなたが今日がんばったこと、ちゃんと見ている人はいます";
}

async function generateWhisperText(dateKey: string, monthlyMessages: string[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return getFallbackWhisper(dateKey, monthlyMessages);
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const userPrompt = buildUserPromptWithHistory(dateKey, monthlyMessages);
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 256,
      system: `${DAILY_WHISPER_SYSTEM_PROMPT}\n\n必ずJSONのみを返してください。説明文やマークダウンのコードブロック記法は使わないでください。スキーマ: ${JSON.stringify(getSchema())}`,
      messages: [
        { role: "user", content: userPrompt },
      ],
    });

    const block = response.content[0];
    const rawContent = block?.type === "text" ? block.text.trim() : "";
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
