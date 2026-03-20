/**
 * 占い機能の1日1回制限ユーティリティ
 * localStorage ベース、日本時間（Asia/Tokyo）で判定
 */

const STORAGE_KEY = "lumina_daily_limits";

/** 占い種別 */
export type FortuneType =
  | "daily_fortune"
  | "light_guidance_tarot"
  | "unrequited_love"
  | "their_feelings"
  | "reconciliation";

type DailyLimits = Record<string, string>;

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

/** その占い種別が本日利用済みかどうか */
export function isDailyLocked(type: FortuneType): boolean {
  const limits = loadLimits();
  const today = getJstDateKey();
  return limits[type] === today;
}

/** その占い種別を本日利用済みとしてマーク */
export function markDailyUsed(type: FortuneType): void {
  const limits = loadLimits();
  const today = getJstDateKey();
  limits[type] = today;
  saveLimits(limits);
}

/** 利用制限時のメッセージ */
export const DAILY_LIMIT_MESSAGE =
  "この占いは1日1回までです。\n0時を過ぎたらもう一度お試しください。";
