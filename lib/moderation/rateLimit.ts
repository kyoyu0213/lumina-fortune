import { MODERATION_MESSAGES } from "./messages";

const POST_INTERVAL_MS = 30_000;

type RateLimitStore = Record<string, number>;
const memoryStore: RateLimitStore = {};

export function normalizeRateLimitKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^\w\-:.@]/g, "_").slice(0, 120) || "guest";
}

export function getClientAddress(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "guest";
  }

  return request.headers.get("x-real-ip")?.trim() || "guest";
}

export function resolveModerationUserKey(request: Request, candidates: Array<string | null | undefined>): string {
  const candidate = candidates.find((value) => typeof value === "string" && value.trim());
  if (candidate) {
    return normalizeRateLimitKey(candidate);
  }

  return normalizeRateLimitKey(getClientAddress(request));
}

export async function checkModerationPostInterval(userKey: string): Promise<
  | { ok: true }
  | { ok: false; error: string; code: "rate_limit" }
> {
  const normalizedKey = normalizeRateLimitKey(userKey);
  const now = Date.now();
  const lastPostedAt = memoryStore[normalizedKey] ?? 0;

  if (now - lastPostedAt < POST_INTERVAL_MS) {
    return { ok: false, error: MODERATION_MESSAGES.rateLimit, code: "rate_limit" };
  }

  memoryStore[normalizedKey] = now;
  return { ok: true };
}
