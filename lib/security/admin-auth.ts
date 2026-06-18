import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

// 定数時間比較。両方を SHA-256（32バイト固定長）にしてから比較するため、
// 長さの違いによるタイミングリークも避けられる。
function safeEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a, "utf8").digest();
  const bh = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ah, bh);
}

/**
 * 管理者リクエストか判定する。
 * シークレットは環境変数 CALENDAR_ADMIN_SECRET。
 * 提示はヘッダ `x-admin-secret` を優先し、互換でクエリ `?key=` も許容。
 * 環境変数が未設定、または不一致なら false（＝force=1 を弾く）。
 */
export function isAdminRequest(request: Request): boolean {
  const expected = process.env.CALENDAR_ADMIN_SECRET?.trim();
  if (!expected) return false;

  const headerValue = request.headers.get("x-admin-secret")?.trim();
  const queryValue = new URL(request.url).searchParams.get("key")?.trim();
  const provided = headerValue || queryValue || "";
  if (!provided) return false;

  return safeEqual(provided, expected);
}
