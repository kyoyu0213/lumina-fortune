import Anthropic from "@anthropic-ai/sdk";
import {
  CalendarMonthData,
  getMonthDateKeys,
  isValidMonthKey,
  type FortuneNumberKey,
} from "@/lib/calendar/types";
import { loadCalendarMonth, saveCalendarMonth, sanitizeCalendarMonthData } from "@/lib/calendar/store";

type GeneratedEntry = {
  date: string;
  tag: string;
  message: string;
  hint: string;
  affirmation: string;
};

type GeneratedMonthPayload = {
  month: string;
  byNumber: Record<FortuneNumberKey, GeneratedEntry[]>;
};

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const generationLocks = new Map<string, Promise<CalendarMonthData>>();
const GENERATION_TIMEOUT_MS = 15000;

const TAGS = [
  "整え日",
  "静養日",
  "調和の日",
  "ひらめきの日",
  "手放しの日",
  "学びの日",
  "芽吹きの日",
] as const;

const MESSAGE_BASES = [
  "今日は予定を詰め込みすぎず、ひと呼吸おいて順番を整えるほど、心の静けさが戻ってきます。",
  "小さな違和感を見過ごさず、手元のことを丁寧に進めるほど、流れがゆるやかに整います。",
  "誰かに合わせすぎず自分の歩幅を守ると、必要な言葉や選択が自然に見えてきます。",
  "焦って結論を急がず、今できるひとつに集中すると、気持ちと現実のずれが減っていきます。",
  "完璧さよりも続けられる形を選ぶことで、今日の終わりに穏やかな手応えが残ります。",
] as const;

const HINTS = [
  "朝に最優先を1つだけ書き出す",
  "5分だけ深呼吸して姿勢を整える",
  "返事の前に一度だけ読み返す",
  "机の上をひと区画だけ片づける",
  "予定の間に10分の余白をつくる",
] as const;

const AFFIRMATIONS = [
  "私は静かな歩幅で、今日を整えます。",
  "私は必要なことを、必要な順番で進められます。",
  "私はやさしい集中で、自分の心を守れます。",
  "私は小さな選択を重ね、穏やかな一日を育てます。",
] as const;

function getSchema() {
  const entrySchema = {
    type: "object",
    additionalProperties: false,
    required: ["date", "tag", "message", "hint", "affirmation"],
    properties: {
      date: { type: "string" },
      tag: { type: "string" },
      message: { type: "string" },
      hint: { type: "string" },
      affirmation: { type: "string" },
    },
  } as const;

  return {
    type: "object",
    additionalProperties: false,
    required: ["month", "byNumber"],
    properties: {
      month: { type: "string" },
      byNumber: {
        type: "object",
        additionalProperties: false,
        required: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        properties: {
          "1": { type: "array", items: entrySchema },
          "2": { type: "array", items: entrySchema },
          "3": { type: "array", items: entrySchema },
          "4": { type: "array", items: entrySchema },
          "5": { type: "array", items: entrySchema },
          "6": { type: "array", items: entrySchema },
          "7": { type: "array", items: entrySchema },
          "8": { type: "array", items: entrySchema },
          "9": { type: "array", items: entrySchema },
        },
      },
    },
  } as const;
}

function buildPrompt(month: string, dateKeys: string[]): string {
  return [
    "あなたは『白い館の書斎にいるルミナ』の文体監修者です。",
    "以下の条件で、光の暦データをJSONで作成してください。",
    "",
    "【世界観】",
    "- 森の中の白い館・昼のやわらかい光",
    "- 静かで優しいトーン、煽らない、断定しない",
    "- 読後に気持ちが整う短文",
    "",
    "【出力要件】",
    "- monthはそのまま返す",
    "- byNumberは1〜9それぞれ配列で返す",
    `- 各配列は必ず ${dateKeys.length} 件、dateは次の一覧のみ使用: ${dateKeys.join(", ")}`,
    "- tagは1語〜短句（例: 整え日 / 静養日 / 火を灯す日 / ひらめきの日 / 調和の日 / 学びの日 / 手放しの日）",
    "- messageは120〜180字。問いかけ禁止。健康/医療/生死/合否の断定禁止。",
    "- hintは今日できる小さな行動を1つ",
    "- affirmationは静かな肯定の1行",
    "- 各日で文の重複を避ける",
    "",
    `対象月: ${month}`,
  ].join("\n");
}

function toMonthData(payload: GeneratedMonthPayload, month: string): CalendarMonthData {
  const days = getMonthDateKeys(month);
  const byNumber: CalendarMonthData["byNumber"] = {
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "9": {},
  };

  const keys: FortuneNumberKey[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (const key of keys) {
    const rows = payload.byNumber[key] ?? [];
    const rowMap = new Map(rows.map((row) => [row.date, row]));
    for (const dateKey of days) {
      const row = rowMap.get(dateKey);
      byNumber[key][dateKey] = {
        tag: row?.tag?.trim() || "整え日",
        message: row?.message?.trim() || "今日は呼吸を整え、静かな順番で進むと落ち着きが戻ります。",
        hint: row?.hint?.trim() || "ひとつだけ優先順位を決める",
        affirmation: row?.affirmation?.trim() || "やわらかな歩幅で、私は今日を整えます。",
      };
    }
  }

  const sanitized = sanitizeCalendarMonthData(
    {
      month,
      byNumber,
      generatedAt: new Date().toISOString(),
    },
    month
  );
  if (!sanitized) {
    throw new Error("Generated calendar payload is invalid.");
  }
  return sanitized;
}

async function generateCalendarMonthDataInternal(month: string): Promise<CalendarMonthData> {
  const dateKeys = getMonthDateKeys(month);
  const prompt = buildPrompt(month, dateKeys);

  const systemPrompt = `あなたはJSONのみを返す生成器です。説明文は一切返さず、必ずスキーマどおりのJSONのみ返してください。マークダウンのコードブロック記法は使わないでください。\n\nスキーマ: ${JSON.stringify(getSchema())}`;

  const response = await Promise.race([
    anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16384,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Calendar generation timed out.")), GENERATION_TIMEOUT_MS)
    ),
  ]);

  const block = response.content[0];
  const content = block?.type === "text" ? block.text : "";
  if (!content) {
    throw new Error("No content returned from Claude.");
  }

  const parsed = JSON.parse(content) as GeneratedMonthPayload;
  if (parsed.month !== month) {
    parsed.month = month;
  }
  const data = toMonthData(parsed, month);
  await saveCalendarMonth(data);
  return data;
}

function buildFallbackCalendarMonthData(month: string): CalendarMonthData {
  const days = getMonthDateKeys(month);
  const byNumber: CalendarMonthData["byNumber"] = {
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "9": {},
  };

  const keys: FortuneNumberKey[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (const key of keys) {
    for (let i = 0; i < days.length; i += 1) {
      const offset = i + Number(key);
      byNumber[key][days[i]] = {
        tag: TAGS[offset % TAGS.length],
        message: MESSAGE_BASES[offset % MESSAGE_BASES.length],
        hint: HINTS[offset % HINTS.length],
        affirmation: AFFIRMATIONS[offset % AFFIRMATIONS.length],
      };
    }
  }

  return {
    month,
    generatedAt: new Date().toISOString(),
    byNumber,
  };
}

export async function getOrGenerateCalendarMonth(month: string, forceRegenerate = false): Promise<CalendarMonthData> {
  if (!isValidMonthKey(month)) {
    throw new Error("Invalid month key. Expected YYYY-MM.");
  }

  if (!forceRegenerate) {
    const existing = await loadCalendarMonth(month);
    if (existing) return existing;
  }

  const lockKey = `${month}:${forceRegenerate ? "force" : "normal"}`;
  const current = generationLocks.get(lockKey);
  if (current) return current;

  const promise = (async () => {
    try {
      if (!process.env.ANTHROPIC_API_KEY) {
        const fallback = buildFallbackCalendarMonthData(month);
        await saveCalendarMonth(fallback);
        return fallback;
      }
      return await generateCalendarMonthDataInternal(month);
    } catch (error) {
      console.error("[calendar] fallback activated", error);
      const fallback = buildFallbackCalendarMonthData(month);
      await saveCalendarMonth(fallback);
      return fallback;
    } finally {
      generationLocks.delete(lockKey);
    }
  })();
  generationLocks.set(lockKey, promise);
  return promise;
}
