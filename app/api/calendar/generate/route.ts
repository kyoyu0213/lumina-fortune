import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrGenerateCalendarMonth } from "@/lib/calendar/generator";
import {
  assertClaudeRateLimit,
  enforceReadRateLimit,
  RateLimitError,
} from "@/lib/security/rate-limit";
import { isAdminRequest } from "@/lib/security/admin-auth";
import { apiError } from "@/lib/api-error";

export const runtime = "nodejs";

// GETクエリ検証用Zodスキーマ。month は YYYY-MM(月01-12)、
// force は「真偽として解釈できる値」= "0"|"1" のみ許容（既存の force==="1" 判定と整合）。
// month 形式検証を集約し既存inlineチェックと二重弾きしない（isValidMonthKey は generator で温存）。
const MONTH_QUERY_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const generateQuerySchema = z.object({
  month: z.string().regex(MONTH_QUERY_RE).optional(),
  force: z.enum(["0", "1"]).optional(),
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
    const parsedQuery = generateQuerySchema.safeParse({
      month: searchParams.get("month") ?? undefined,
      force: searchParams.get("force") ?? undefined,
    });
    if (!parsedQuery.success) {
      const field = parsedQuery.error.issues[0]?.path[0];
      const message = field === "force" ? "force must be 0 or 1." : "month must be YYYY-MM.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const month = parsedQuery.data.month ?? currentMonthKey();

    const force = parsedQuery.data.force === "1";
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
    return apiError(error, { route: "calendar/generate", shape: "error" });
  }
}

