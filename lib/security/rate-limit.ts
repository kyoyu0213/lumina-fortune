// 多層レート制限（Claude APIコスト爆発防止）
//
// Layer 1: IPあたり 60回/分   （瞬間連打防御）
// Layer 2: IPあたり 3回/日     （既存「1日3回」仕様をサーバー側で正とする）
// Layer 3: サービス全体 200回/日（コスト爆発防御・最重要、固定キー）
//
// フォールバック方針（用途で分ける）:
// - Claudeを呼ぶ処理 → fail-closed（Redis未設定/障害なら 429 で止める）
// - Claudeを呼ばない読み出し（カレンダー閲覧＝キャッシュ返却）→ fail-open（通す）
// - どちらの分岐でも Redis 障害は console.error でサーバーログに必ず残す。

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { getClientAddress } from "@/lib/moderation/rateLimit";

const TOO_MANY_MESSAGE =
  "リクエストが多すぎます。しばらく時間をおいて、もう一度お試しください。";

const GLOBAL_KEY = "global:claude";

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = createRedis();

const burstLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, "60 s"), prefix: "rl:burst", analytics: false })
  : null;
const dailyIpLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 d"), prefix: "rl:ipday", analytics: false })
  : null;
const globalLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(200, "1 d"), prefix: "rl:global", analytics: false })
  : null;

/** Redisが利用可能か（環境変数が揃っているか） */
export function isRateLimitReady(): boolean {
  return redis !== null;
}

function retryAfterSeconds(reset: number): number {
  return Math.max(1, Math.ceil((reset - Date.now()) / 1000));
}

function tooManyResponse(retryAfterSec: number): NextResponse {
  const response = NextResponse.json({ error: TOO_MANY_MESSAGE }, { status: 429 });
  response.headers.set("Retry-After", String(Math.max(1, Math.ceil(retryAfterSec))));
  return response;
}

/**
 * Claude API を呼ぶ処理用のレート制限（fail-closed）。
 * Layer1（IP/分）+ Layer3（全体/日）を常にチェック。opts.daily=true で Layer2（IP/日）も。
 * 許可なら null、超過 or Redis障害なら 429 の NextResponse を返す。
 */
export async function enforceClaudeRateLimit(
  request: Request,
  opts: { daily?: boolean } = {},
): Promise<NextResponse | null> {
  if (!redis || !burstLimiter || !globalLimiter || (opts.daily && !dailyIpLimiter)) {
    console.error("[rate-limit] Redis未設定のため Claude 呼び出しを拒否します (fail-closed)");
    return tooManyResponse(60);
  }

  const ip = getClientAddress(request);
  try {
    const checks = [burstLimiter.limit(`ip:${ip}`), globalLimiter.limit(GLOBAL_KEY)];
    if (opts.daily && dailyIpLimiter) checks.push(dailyIpLimiter.limit(`ip:${ip}`));

    const results = await Promise.all(checks);
    const blocked = results.find((result) => !result.success);
    if (blocked) return tooManyResponse(retryAfterSeconds(blocked.reset));
    return null;
  } catch (error) {
    console.error("[rate-limit] Redis障害のため Claude 呼び出しを拒否します (fail-closed):", error);
    return tooManyResponse(60);
  }
}

/**
 * Claude を呼ばない読み出し用のレート制限（fail-open）。
 * Layer1（IP/分）+ Layer3（全体/日）をチェックするが、Redis障害なら通す。
 * 許可なら null、超過なら 429 の NextResponse を返す。
 */
export async function enforceReadRateLimit(request: Request): Promise<NextResponse | null> {
  if (!redis || !burstLimiter || !globalLimiter) {
    console.error("[rate-limit] Redis未設定 (read は fail-open: 通過させます)");
    return null;
  }

  const ip = getClientAddress(request);
  try {
    const results = await Promise.all([
      burstLimiter.limit(`ip:${ip}`),
      globalLimiter.limit(GLOBAL_KEY),
    ]);
    const blocked = results.find((result) => !result.success);
    if (blocked) return tooManyResponse(retryAfterSeconds(blocked.reset));
    return null;
  } catch (error) {
    console.error("[rate-limit] Redis障害 (read は fail-open: 通過させます):", error);
    return null;
  }
}

/** レート制限超過を表す例外。フック内から throw し、ルート側で response を返すために使う。 */
export class RateLimitError extends Error {
  readonly response: NextResponse;
  constructor(response: NextResponse) {
    super("rate limit exceeded");
    this.name = "RateLimitError";
    this.response = response;
  }
}

/**
 * Claude生成直前のフック用。fail-closed の判定を行い、超過なら RateLimitError を throw する。
 * 生成が実際に走る箇所（カレンダーのキャッシュミス時など）からのみ呼ぶこと。
 */
export async function assertClaudeRateLimit(
  request: Request,
  opts: { daily?: boolean } = {},
): Promise<void> {
  const blocked = await enforceClaudeRateLimit(request, opts);
  if (blocked) throw new RateLimitError(blocked);
}
