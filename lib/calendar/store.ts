import { promises as fs } from "node:fs";
import path from "node:path";
import { CalendarMonthData, getMonthDateKeys, type FortuneNumberKey } from "@/lib/calendar/types";

const CALENDAR_DIR = path.join(process.cwd(), "data", "calendar");

function getMonthPath(month: string): string {
  return path.join(CALENDAR_DIR, `${month}.json`);
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
  await ensureCalendarDir();
  const filePath = getMonthPath(data.month);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

