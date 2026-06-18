import { NextResponse } from "next/server";
import { getOrGenerateCalendarMonth } from "@/lib/calendar/generator";
import { isValidMonthKey } from "@/lib/calendar/types";
import {
  assertClaudeRateLimit,
  enforceReadRateLimit,
  RateLimitError,
} from "@/lib/security/rate-limit";
import { isAdminRequest } from "@/lib/security/admin-auth";

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
    // force=1（キャッシュを無視した再生成＝高コスト）は管理者のみ許可。
    // 認証チェックはレート制限より前に行い、未認証の force 連打で
    // 閲覧用の枠（L3）を消費させない。通常GET（force なし）は影響を受けない。
    if (force && !isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 閲覧（キャッシュ返却）は L1+L3 で守る（fail-open）。
    const readBlocked = await enforceReadRateLimit(request);
    if (readBlocked) return readBlocked;

    // 実際にClaude生成が走るときだけ L1+L2+L3 を fail-closed で判定する。
    const data = await getOrGenerateCalendarMonth(month, force, {
      onBeforeGenerate: () => assertClaudeRateLimit(request, { daily: true }),
    });
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof RateLimitError) return error.response;
    console.error("[calendar/generate] error", error);
    return NextResponse.json({ error: "Failed to generate calendar data." }, { status: 500 });
  }
}

