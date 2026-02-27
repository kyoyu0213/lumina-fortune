import { NextResponse } from "next/server";
import { getOrGenerateCalendarMonth } from "@/lib/calendar/generator";
import { isValidMonthKey } from "@/lib/calendar/types";

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
    if (!isValidMonthKey(month)) {
      return NextResponse.json({ error: "month must be YYYY-MM." }, { status: 400 });
    }

    const force = searchParams.get("force") === "1";
    const data = await getOrGenerateCalendarMonth(month, force);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[calendar/generate] error", error);
    return NextResponse.json({ error: "Failed to generate calendar data." }, { status: 500 });
  }
}

