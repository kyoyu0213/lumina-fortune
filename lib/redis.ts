import "server-only";

import { Redis } from "@upstash/redis";

// サーバー共有の Upstash Redis クライアント（生成キャッシュ等で使用）。
// 環境変数が未設定なら null を返し、呼び出し側でフォールバックする。
let cachedClient: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cachedClient !== undefined) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  cachedClient = url && token ? new Redis({ url, token }) : null;
  return cachedClient;
}

/** JST（日本時間）の YYYY-MM-DD 文字列を返す。固定窓レート制限などの日次キーに使う。 */
export function jstDateKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** 次の JST（日本時間）午前0時までの残り秒数を返す（1〜86400）。 */
export function secondsUntilNextJstMidnight(now: Date = new Date()): number {
  const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
  // 実時刻を「JSTの壁時計をUTCとして見立てた」フレームへずらす
  const jst = new Date(now.getTime() + JST_OFFSET_MS);
  // そのJST日付の翌日0時（JST-as-UTCフレーム）
  const nextMidnightJstFrame =
    Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate()) + 24 * 60 * 60 * 1000;
  // 実エポックへ戻す（-9h）
  const nextMidnightEpochMs = nextMidnightJstFrame - JST_OFFSET_MS;
  const seconds = Math.ceil((nextMidnightEpochMs - now.getTime()) / 1000);
  return Math.min(86400, Math.max(1, seconds));
}
