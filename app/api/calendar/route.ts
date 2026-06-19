import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrGenerateCalendarMonth } from "@/lib/calendar/generator";
import {
  assertClaudeRateLimit,
  enforceReadRateLimit,
  RateLimitError,
} from "@/lib/security/rate-limit";
import { apiError } from "@/lib/api-error";

export const runtime = "nodejs";

// GETクエリ検証用Zodスキーマ（入口ガード）。
// month/number の形式検証をここに集約し、既存のinlineチェックとの二重弾きを避ける。
// 基準は従来の isValidMonthKey(YYYY-MM・月01-12) / isFortuneNumberKey(1..9) と同一で、
// 400メッセージも従来と同一文言を返すため外形挙動は不変。
// なお isValidMonthKey は generator 内で引き続き使用される（深層防御として温存）。
const MONTH_QUERY_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const calendarQuerySchema = z.object({
  month: z.string().regex(MONTH_QUERY_RE).optional(),
  number: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9"]),
});

function currentMonthKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsedQuery = calendarQuerySchema.safeParse({
      month: searchParams.get("month") ?? undefined,
      number: searchParams.get("number") ?? undefined,
    });
    if (!parsedQuery.success) {
      const field = parsedQuery.error.issues[0]?.path[0];
      const message = field === "number" ? "number must be 1..9." : "month must be YYYY-MM.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const month = parsedQuery.data.month ?? currentMonthKey();
    const number = parsedQuery.data.number;

    // 閲覧（キャッシュ返却）は L1+L3 で守る（fail-open）。
    const readBlocked = await enforceReadRateLimit(request);
    if (readBlocked) return readBlocked;

    // 実際にClaude生成が走るときだけ L1+L2+L3 を fail-closed で判定する。
    const data = await getOrGenerateCalendarMonth(month, false, {
      onBeforeGenerate: () => assertClaudeRateLimit(request, { daily: true }),
    });
    return NextResponse.json({
      month: data.month,
      number,
      days: data.byNumber[number],
      generatedAt: data.generatedAt,
    });
  } catch (error) {
    if (error instanceof RateLimitError) return error.response;
    return apiError(error, { route: "calendar", shape: "error" });
  }
}

