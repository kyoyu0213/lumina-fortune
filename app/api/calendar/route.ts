import { NextResponse } from "next/server";
import { getOrGenerateCalendarMonth } from "@/lib/calendar/generator";
import { isFortuneNumberKey, isValidMonthKey } from "@/lib/calendar/types";

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

    const data = await getOrGenerateCalendarMonth(month, false);
    return NextResponse.json({
      month: data.month,
      number,
      days: data.byNumber[number],
      generatedAt: data.generatedAt,
    });
  } catch (error) {
    console.error("[calendar] error", error);
    return NextResponse.json({ error: "Failed to fetch calendar data." }, { status: 500 });
  }
}

