/**
 * 占い機能の1日3回制限ユーティリティ
 * localStorage ベース、日本時間（Asia/Tokyo）で判定
 */

const STORAGE_KEY = "lumina_daily_limits";
const MAX_DAILY_USES = 3;

/** 占い種別 */
export type FortuneType =
  | "daily_fortune"
  | "light_guidance_tarot"
  | "unrequited_love"
  | "their_feelings"
  | "reconciliation";

type DailyLimitEntry = { date: string; count: number };
type DailyLimits = Record<string, string | DailyLimitEntry>;

/** 日本時間の日付文字列（YYYY-MM-DD）を取得 */
export function getJstDateKey(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function loadLimits(): DailyLimits {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as DailyLimits;
  } catch {
    return {};
  }
}

function saveLimits(limits: DailyLimits): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limits));
  } catch {
    // localStorage が使えない環境では無視
  }
}

/** エントリを正規化（旧形式の文字列→新形式のオブジェクトに変換） */
function getEntry(limits: DailyLimits, type: FortuneType): DailyLimitEntry | null {
  const val = limits[type];
  if (!val) return null;
  // 旧形式: 日付文字列のみ → count: 1 として扱う
  if (typeof val === "string") {
    return { date: val, count: 1 };
  }
  return val;
}

/** その占い種別が本日の利用上限に達しているかどうか */
export function isDailyLocked(type: FortuneType): boolean {
  const limits = loadLimits();
  const today = getJstDateKey();
  const entry = getEntry(limits, type);
  if (!entry || entry.date !== today) return false;
  return entry.count >= MAX_DAILY_USES;
}

/** 本日の残り回数を取得 */
export function getDailyRemaining(type: FortuneType): number {
  const limits = loadLimits();
  const today = getJstDateKey();
  const entry = getEntry(limits, type);
  if (!entry || entry.date !== today) return MAX_DAILY_USES;
  return Math.max(0, MAX_DAILY_USES - entry.count);
}

/** その占い種別の利用回数を1加算 */
export function markDailyUsed(type: FortuneType): void {
  const limits = loadLimits();
  const today = getJstDateKey();
  const entry = getEntry(limits, type);
  if (!entry || entry.date !== today) {
    limits[type] = { date: today, count: 1 };
  } else {
    limits[type] = { date: today, count: entry.count + 1 };
  }
  saveLimits(limits);
}

/** 利用制限時のメッセージ */
export const DAILY_LIMIT_MESSAGE =
  `この占いは1日${MAX_DAILY_USES}回までです。\n翌日にまたお試しください。`;
