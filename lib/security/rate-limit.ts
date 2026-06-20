// 多層レート制限（Claude APIコスト爆発防止）
//
// Layer 1: IPあたり 60回/分   （瞬間連打防御）
// Layer 2: IPあたり 5回/日     （JST 0時固定窓。手動 INCR+EXPIRE でJST 0時に一斉リセット）
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
import { jstDateKey, secondsUntilNextJstMidnight } from "@/lib/redis";

const GLOBAL_KEY = "global:claude";

// Layer 2（IP/日）。JST 0時で区切る固定窓。上限はサイト発展途上のため 5回/日。
const DAILY_IP_LIMIT = 5;
const DAILY_IP_PREFIX = "rl:ipday";

// 超過したレイヤー種別。文言と Retry-After の出し分けに使う。
type RateLimitLayer = "burst" | "daily" | "global";

// レイヤー別の 429 文言（ユーザーの画面に表示される。ルミナの世界観に合わせる）。
const RATE_LIMIT_MESSAGES: Record<RateLimitLayer, string> = {
  // Layer 1（60回/分）: 数十秒で回復する案内（「0時」とは書かない）。
  burst:
    "少しの間に、たくさんのお言葉をいただいたようです。ほんの少しだけ時間をおいて、もう一度お試しください。",
  // Layer 2（日次 DAILY_IP_LIMIT 回）: リセット時刻（JST0時以降）が伝わる優しい文言。
  daily: `本日の鑑定は、${DAILY_IP_LIMIT}回までご一緒できました。日本時間の0時を過ぎると、また新たにお話を伺えます。どうぞ、またおいでください。`,
  // Layer 3（全体200回/日）: 全体混雑の案内。
  global:
    "ただいま、多くの方が鑑定に訪れているようです。少し時間をおいてから、またおいでください。",
};

// fail-closed（Redis未設定/障害）用の汎用文言。
const SYSTEM_BUSY_MESSAGE =
  "ただいま占いをお届けできないようです。少し時間をおいて、もう一度お試しください。";

// 複数レイヤーが同時に超過したときの文言優先順位（daily > burst > global）。
const LAYER_PRIORITY: RateLimitLayer[] = ["daily", "burst", "global"];

type LayerCheck = { layer: RateLimitLayer; result: { success: boolean; reset: number } };

/** タグ付きチェック結果から、優先順位に従って最初にブロックされたレイヤーを返す。 */
function pickBlocked(results: LayerCheck[]): LayerCheck | undefined {
  for (const layer of LAYER_PRIORITY) {
    const hit = results.find((r) => r.layer === layer && !r.result.success);
    if (hit) return hit;
  }
  return undefined;
}

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
const globalLimiter = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(200, "1 d"), prefix: "rl:global", analytics: false })
  : null;

/**
 * Layer 2（IPあたり 5回/日）を JST 0時固定窓で判定し、トークンを1つ消費する。
 * キーに JST 日付を含め、TTL を次の JST 0時までに設定するため、JST 0時をまたぐと
 * 旧キーは自動失効し、新しい JST 日付のキーで 0 から数え直す（＝毎日 JST 0時に一斉リセット）。
 * INCR と EXPIRE は pipeline で同時実行（EXPIRE 先は常に同じ JST0時なので冪等）。
 * 戻り値は @upstash/ratelimit の .limit() と同じく { success, reset(エポックms) }。
 */
async function consumeDailyIpJst(client: Redis, ip: string): Promise<{ success: boolean; reset: number }> {
  const ttlSeconds = secondsUntilNextJstMidnight();
  const key = `${DAILY_IP_PREFIX}:${jstDateKey()}:ip:${ip}`;
  const pipeline = client.pipeline();
  pipeline.incr(key);
  pipeline.expire(key, ttlSeconds);
  const [count] = (await pipeline.exec()) as [number, number];
  return { success: count <= DAILY_IP_LIMIT, reset: Date.now() + ttlSeconds * 1000 };
}

/** Redisが利用可能か（環境変数が揃っているか） */
export function isRateLimitReady(): boolean {
  return redis !== null;
}

function retryAfterSeconds(reset: number): number {
  return Math.max(1, Math.ceil((reset - Date.now()) / 1000));
}

function tooManyResponse(retryAfterSec: number, message: string = SYSTEM_BUSY_MESSAGE): NextResponse {
  const response = NextResponse.json({ error: message }, { status: 429 });
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
  if (!redis || !burstLimiter || !globalLimiter) {
    console.error("[rate-limit] Redis未設定のため Claude 呼び出しを拒否します (fail-closed)");
    return tooManyResponse(60);
  }

  const ip = getClientAddress(request);
  try {
    // 各チェックに layer タグを付ける。run はここで生成され即座に消費(INCR)が走る（並列・全件消費）。
    const checks: { layer: RateLimitLayer; run: Promise<{ success: boolean; reset: number }> }[] = [
      { layer: "burst", run: burstLimiter.limit(`ip:${ip}`) },
      { layer: "global", run: globalLimiter.limit(GLOBAL_KEY) },
    ];
    if (opts.daily) checks.push({ layer: "daily", run: consumeDailyIpJst(redis, ip) });

    const results = await Promise.all(checks.map(async (c) => ({ layer: c.layer, result: await c.run })));
    const blocked = pickBlocked(results);
    // 文言と Retry-After は同じレイヤーの値に揃える（daily→次のJST0時 / burst→数十秒 / global→当日窓）。
    if (blocked) return tooManyResponse(retryAfterSeconds(blocked.result.reset), RATE_LIMIT_MESSAGES[blocked.layer]);
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
    // 読み出し経路は Layer1（burst）+ Layer3（global）のみ（daily は使わない）。
    const checks: { layer: RateLimitLayer; run: Promise<{ success: boolean; reset: number }> }[] = [
      { layer: "burst", run: burstLimiter.limit(`ip:${ip}`) },
      { layer: "global", run: globalLimiter.limit(GLOBAL_KEY) },
    ];
    const results = await Promise.all(checks.map(async (c) => ({ layer: c.layer, result: await c.run })));
    const blocked = pickBlocked(results);
    if (blocked) return tooManyResponse(retryAfterSeconds(blocked.result.reset), RATE_LIMIT_MESSAGES[blocked.layer]);
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
