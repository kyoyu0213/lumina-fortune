export type FortuneNumberKey = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type CalendarDayEntry = {
  tag: string;
  message: string;
  hint: string;
  affirmation: string;
};

export type CalendarMonthData = {
  month: string;
  generatedAt: string;
  byNumber: Record<FortuneNumberKey, Record<string, CalendarDayEntry>>;
};

export function isFortuneNumberKey(value: string): value is FortuneNumberKey {
  return /^[1-9]$/.test(value);
}

export function isValidMonthKey(month: string): boolean {
  if (!/^\d{4}-\d{2}$/.test(month)) return false;
  const [y, m] = month.split("-").map(Number);
  if (!Number.isInteger(y) || !Number.isInteger(m)) return false;
  return m >= 1 && m <= 12;
}

export function getMonthDateKeys(month: string): string[] {
  const [year, monthNum] = month.split("-").map(Number);
  const daysInMonth = new Date(Date.UTC(year, monthNum, 0)).getUTCDate();
  return Array.from({ length: daysInMonth }, (_, idx) => {
    const day = String(idx + 1).padStart(2, "0");
    return `${month}-${day}`;
  });
}

