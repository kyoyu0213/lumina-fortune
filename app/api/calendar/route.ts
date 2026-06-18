import { NextResponse } from "next/server";
import { getOrGenerateCalendarMonth } from "@/lib/calendar/generator";
import { isFortuneNumberKey, isValidMonthKey } from "@/lib/calendar/types";
import {
  assertClaudeRateLimit,
  enforceReadRateLimit,
  RateLimitError,
} from "@/lib/security/rate-limit";

export const runtime = "nodejs";

function currentMonthKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month") ?? currentMonthKey();
    const number = searchParams.get("number");

    if (!isValidMonthKey(month)) {
      return NextResponse.json({ error: "month must be YYYY-MM." }, { status: 400 });
    }
    if (!number || !isFortuneNumberKey(number)) {
      return NextResponse.json({ error: "number must be 1..9." }, { status: 400 });
    }

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
    console.error("[calendar] error", error);
    return NextResponse.json({ error: "Failed to fetch calendar data." }, { status: 500 });
  }
}

