import { NextResponse } from "next/server";

/**
 * 想定外エラー（API route の catch 最終フォールバック）専用のラッパー。
 *
 * 【役割の境界】
 * これは「catch の最後に落ちてくる想定外エラー」だけを受け持つ。
 * 意図的な応答 —— モデレーションの日本語UX文言・Zod の 400・管理者認証の 401・
 * 必須チェック等 —— は catch に到達する前に return で確定済みであり、
 * このラッパーには構造上届かない（届かせてはいけない）。
 * 二段構えの catch では、既存の意図的分岐(if return)を手前に残したまま、
 * それにマッチしない最終フォールバックの 500 だけを本関数に置き換える。
 *
 * 【挙動】
 * - requestId(crypto.randomUUID()) を発行。
 * - 詳細(message/name/stack)は console.error でサーバーにのみ記録する。
 * - クライアントには技術情報を出さず、日本語の汎用文 + requestId のみ返す
 *   （ルミナの世界観を保つため英語固定文言には統一しない）。
 * - shape で既存レスポンス形を踏襲する（{error} 形 / {ok:false,error} 形）。
 */
export type ApiErrorShape = "error" | "ok";

const GENERIC_ERROR_MESSAGE = "予期せぬエラーが発生しました。";

export function apiError(
  error: unknown,
  ctx?: {
    route?: string;
    shape?: ApiErrorShape;
    /**
     * 原因切り分け用の環境診断（真偽値や状態のみ）。
     * 【厳守】機密の値そのもの（APIキー/トークンの中身等）は入れないこと。
     *   例: hasAnthropicKey: true/false は可、キーの値は不可。
     * 【厳守】これはサーバーの console.error にのみ記録し、クライアントへの
     *   レスポンス body には絶対に含めない（漏洩防止）。
     */
    extra?: Record<string, unknown>;
  }
): NextResponse {
  const requestId = crypto.randomUUID();
  const shape: ApiErrorShape = ctx?.shape ?? "error";

  // サーバーログのみ: requestId / route / message / name / stack（＋任意の extra 診断）
  console.error(`[api-error] requestId=${requestId} route=${ctx?.route ?? "unknown"}`, {
    message: error instanceof Error ? error.message : String(error),
    name: error instanceof Error ? error.name : "unknown",
    stack: error instanceof Error ? error.stack : undefined,
    ...(ctx?.extra ? { extra: ctx.extra } : {}),
  });

  // クライアント返却: 汎用文 + requestId のみ。extra も error.message/stack も含めない。
  const body =
    shape === "ok"
      ? { ok: false as const, error: GENERIC_ERROR_MESSAGE, requestId }
      : { error: GENERIC_ERROR_MESSAGE, requestId };

  return NextResponse.json(body, { status: 500 });
}
