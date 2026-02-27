import { NextResponse } from "next/server";
import {
  filterHolidaysByMonth,
  getYearFromMonth,
  isValidMonthKey,
  type HolidayMap,
} from "@/lib/holidays";

export const runtime = "nodejs";

const HOLIDAYS_JP_URL = "https://holidays-jp.github.io/api/v1/date.json";
const FETCH_TIMEOUT_MS = 700;
const CACHE_TTL_MS = 1000 * 60 * 60 * 12;

type CacheEntry = {
  expiresAt: number;
  data: HolidayMap;
};

const yearlyCache = new Map<number, CacheEntry>();
const inflight = new Map<number, Promise<HolidayMap>>();

function pickYearRows(all: HolidayMap, year: number): HolidayMap {
  const prefix = `${year}-`;
  const result: HolidayMap = {};
  for (const [dateKey, name] of Object.entries(all)) {
    if (dateKey.startsWith(prefix)) {
      result[dateKey] = name;
    }
  }
  return result;
}

async function fetchHolidayYearFromApi(year: number): Promise<HolidayMap> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(HOLIDAYS_JP_URL, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`holidays-jp status=${res.status}`);
    const json = (await res.json()) as unknown;
    if (!json || typeof json !== "object") throw new Error("invalid holidays payload");
    return pickYearRows(json as HolidayMap, year);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getHolidayYear(year: number): Promise<HolidayMap> {
  const now = Date.now();
  const cached = yearlyCache.get(year);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const running = inflight.get(year);
  if (running) return running;

  const task = (async () => {
    try {
      const rows = await fetchHolidayYearFromApi(year);
      yearlyCache.set(year, { data: rows, expiresAt: now + CACHE_TTL_MS });
      return rows;
    } catch {
      if (cached?.data) return cached.data;
      return {};
    } finally {
      inflight.delete(year);
    }
  })();

  inflight.set(year, task);
  return task;
}

export async function GET(request: Request) {
  const startedAt = Date.now();
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    if (!month || !isValidMonthKey(month)) {
      return NextResponse.json({ error: "month must be YYYY-MM." }, { status: 400 });
    }

    const year = getYearFromMonth(month);
    const yearly = await getHolidayYear(year);
    const holidays = filterHolidaysByMonth(yearly, month);

    return NextResponse.json({
      month,
      holidays,
      tookMs: Date.now() - startedAt,
      source: "holidays-jp",
    });
  } catch {
    return NextResponse.json(
      { month: "", holidays: {}, source: "fallback", tookMs: Date.now() - startedAt },
      { status: 200 }
    );
  }
}

