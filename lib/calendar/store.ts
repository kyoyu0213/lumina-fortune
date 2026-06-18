import { promises as fs } from "node:fs";
import path from "node:path";
import { CalendarMonthData, getMonthDateKeys, type FortuneNumberKey } from "@/lib/calendar/types";
import { getRedis } from "@/lib/redis";

const CALENDAR_DIR = path.join(process.cwd(), "data", "calendar");

// 本番の正キャッシュ（Redis）。キーは calendar:<YYYY-MM>、
// TTL は「翌月の JST 1日 0時まで」。月をまたぐと自動失効する。
const CALENDAR_CACHE_PREFIX = "calendar:";
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const FALLBACK_TTL_SECONDS = 35 * 24 * 60 * 60; // 過去月など計算結果が非正の場合の保険

function getMonthPath(month: string): string {
  return path.join(CALENDAR_DIR, `${month}.json`);
}

/** その月（YYYY-MM）の「翌月 JST 1日 0時」までの残り秒数。非正なら固定35日。 */
function calendarTtlSeconds(month: string, now: Date = new Date()): number {
  const [yearStr, monthStr] = month.split("-");
  const year = Number(yearStr);
  const mon = Number(monthStr); // 1-12（当月）
  if (!Number.isFinite(year) || !Number.isFinite(mon)) return FALLBACK_TTL_SECONDS;
  // Date.UTC(year, mon, 1) は monthIndex=mon＝「翌月」の1日（12月→翌年1月も自動繰り上げ）。
  // これは JST の壁時計を UTC として見立てたフレームなので、実エポックへは -9h する。
  const nextMonthEpochMs = Date.UTC(year, mon, 1) - JST_OFFSET_MS;
  const seconds = Math.ceil((nextMonthEpochMs - now.getTime()) / 1000);
  return seconds > 0 ? seconds : FALLBACK_TTL_SECONDS;
}

async function readCalendarCache(month: string): Promise<CalendarMonthData | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const cached = await redis.get<unknown>(`${CALENDAR_CACHE_PREFIX}${month}`);
    if (!cached) return null;
    return sanitizeCalendarMonthData(cached, month);
  } catch (error) {
    // キャッシュは fail-open（落ちても既存フローへフォールバック）。障害はログに残す。
    console.error("[calendar-cache] Redis read failed:", error);
    return null;
  }
}

async function writeCalendarCache(data: CalendarMonthData): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(`${CALENDAR_CACHE_PREFIX}${data.month}`, data, {
      ex: calendarTtlSeconds(data.month),
    });
  } catch (error) {
    console.error("[calendar-cache] Redis write failed:", error);
  }
}

export async function ensureCalendarDir(): Promise<void> {
  await fs.mkdir(CALENDAR_DIR, { recursive: true });
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeEntry(entry: unknown) {
  if (!entry || typeof entry !== "object") return null;
  const source = entry as Record<string, unknown>;
  const tag = normalizeString(source.tag);
  const message = normalizeString(source.message);
  const hint = normalizeString(source.hint);
  const affirmation = normalizeString(source.affirmation);
  if (!tag || !message || !hint || !affirmation) return null;
  return {
    tag,
    message,
    hint,
    affirmation,
  };
}

function emptyByNumber(): CalendarMonthData["byNumber"] {
  return {
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "9": {},
  };
}

export function sanitizeCalendarMonthData(input: unknown, month: string): CalendarMonthData | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Record<string, unknown>;
  const byNumberSource = source.byNumber;
  if (!byNumberSource || typeof byNumberSource !== "object") return null;

  const days = getMonthDateKeys(month);
  const byNumber = emptyByNumber();
  const keys: FortuneNumberKey[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (const numberKey of keys) {
    const numberRaw = (byNumberSource as Record<string, unknown>)[numberKey];
    if (!numberRaw || typeof numberRaw !== "object") {
      return null;
    }
    const dayMap = numberRaw as Record<string, unknown>;
    for (const dateKey of days) {
      const entry = sanitizeEntry(dayMap[dateKey]);
      if (!entry) return null;
      byNumber[numberKey][dateKey] = entry;
    }
  }

  return {
    month,
    generatedAt: normalizeString(source.generatedAt) || new Date().toISOString(),
    byNumber,
  };
}

export async function loadCalendarMonth(month: string): Promise<CalendarMonthData | null> {
  // 1. 本番の正キャッシュ（Redis）。ヒットすればそのまま返す。
  const cached = await readCalendarCache(month);
  if (cached) return cached;

  // 2. 開発フォールバック（FS）。本番では永続しないため通常 null。
  try {
    const filePath = getMonthPath(month);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return sanitizeCalendarMonthData(parsed, month);
  } catch {
    return null;
  }
}

export async function saveCalendarMonth(data: CalendarMonthData): Promise<void> {
  // 開発フォールバック（FS）。読み取り専用/サーバーレス環境では失敗するため握りつぶす。
  try {
    await ensureCalendarDir();
    const filePath = getMonthPath(data.month);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("[calendar-cache] FS write skipped:", error);
  }

  // 本番の正キャッシュ（Redis）。TTL = 翌月 JST 1日 0時まで。
  await writeCalendarCache(data);
}

