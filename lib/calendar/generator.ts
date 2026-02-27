import OpenAI from "openai";
import {
  CalendarMonthData,
  getMonthDateKeys,
  isValidMonthKey,
  type FortuneNumberKey,
} from "@/lib/calendar/types";
import { loadCalendarMonth, saveCalendarMonth, sanitizeCalendarMonthData } from "@/lib/calendar/store";

type OpenAIEntry = {
  date: string;
  tag: string;
  message: string;
  hint: string;
  affirmation: string;
};

type OpenAIMonthPayload = {
  month: string;
  byNumber: Record<FortuneNumberKey, OpenAIEntry[]>;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generationLocks = new Map<string, Promise<CalendarMonthData>>();

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

function toMonthData(payload: OpenAIMonthPayload, month: string): CalendarMonthData {
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

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "lumina_calendar_month",
        schema: getSchema(),
        strict: true,
      },
    },
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "あなたはJSONのみを返す生成器です。説明文は一切返さず、必ずスキーマどおりのJSONのみ返してください。",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No content returned from OpenAI.");
  }

  const parsed = JSON.parse(content) as OpenAIMonthPayload;
  if (parsed.month !== month) {
    parsed.month = month;
  }
  const data = toMonthData(parsed, month);
  await saveCalendarMonth(data);
  return data;
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

  const promise = generateCalendarMonthDataInternal(month).finally(() => {
    generationLocks.delete(lockKey);
  });
  generationLocks.set(lockKey, promise);
  return promise;
}

