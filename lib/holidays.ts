export type HolidayMap = Record<string, string>;

export type FixedDay = {
  label: string;
  description: string;
};

export const FIXED_DAYS: Record<string, FixedDay> = {
  "01-01": {
    label: "元旦",
    description: "新しい年の光が静かに差し込む日。小さな願いをひとつ心に置くと、歩幅がやさしく整います。",
  },
  "12-25": {
    label: "クリスマス",
    description: "ぬくもりを分かち合う日。大切な人にも自分にも、やわらかな言葉を向けるほど心がほどけていきます。",
  },
};

export function isValidMonthKey(month: string): boolean {
  if (!/^\d{4}-\d{2}$/.test(month)) return false;
  const [year, mm] = month.split("-").map(Number);
  if (!Number.isInteger(year) || !Number.isInteger(mm)) return false;
  return mm >= 1 && mm <= 12;
}

export function getYearFromMonth(month: string): number {
  return Number(month.slice(0, 4));
}

export function getMonthFromDateKey(dateKey: string): string {
  return dateKey.slice(0, 7);
}

export function filterHolidaysByMonth(holidays: HolidayMap, month: string): HolidayMap {
  const result: HolidayMap = {};
  for (const [dateKey, name] of Object.entries(holidays)) {
    if (dateKey.startsWith(`${month}-`)) {
      result[dateKey] = name;
    }
  }
  return result;
}

export function getFixedDayForDate(dateKey: string): FixedDay | null {
  const key = dateKey.slice(5);
  return FIXED_DAYS[key] ?? null;
}

