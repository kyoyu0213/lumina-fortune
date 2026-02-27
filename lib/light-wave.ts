import { getMoonPhaseForDateKey } from "@/lib/moon-phase";
import type { LuckyDayRecord } from "@/lib/lucky-days";
import type { FortuneNumber } from "@/lib/fortune/types";

export type WaveEventType =
  | "none"
  | "new_moon"
  | "first_quarter"
  | "full_moon"
  | "last_quarter"
  | "ichiryumanbaibi"
  | "tenshabi"
  | "mi-no-hi"
  | "daian"
  | "holiday"
  | "fixed_day";

export type LightWaveDaily = {
  baseScore: number;
  eventType: WaveEventType;
};

const AMPLITUDE: Record<FortuneNumber, number> = {
  1: 1.04,
  2: 0.97,
  3: 1.08,
  4: 0.95,
  5: 1.0,
  6: 0.98,
  7: 1.1,
  8: 1.03,
  9: 0.96,
};

const BONUS: Record<FortuneNumber, Partial<Record<WaveEventType, number>>> = {
  1: { full_moon: 5, tenshabi: 7, ichiryumanbaibi: 4, "mi-no-hi": 3, daian: 2 },
  2: { new_moon: 4, daian: 4, "mi-no-hi": 3, holiday: 2 },
  3: { full_moon: 6, ichiryumanbaibi: 5, tenshabi: 4 },
  4: { first_quarter: 4, daian: 3, fixed_day: 2 },
  5: { full_moon: 4, new_moon: 4, holiday: 3 },
  6: { last_quarter: 4, daian: 4, "mi-no-hi": 2 },
  7: { new_moon: 6, last_quarter: 4, tenshabi: 5 },
  8: { first_quarter: 5, ichiryumanbaibi: 4, holiday: 2 },
  9: { full_moon: 3, daian: 5, fixed_day: 3 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function pickPrimaryEventType(
  lucky: LuckyDayRecord | undefined,
  hasHoliday: boolean,
  hasFixedDay: boolean,
  moonMajor: LightWaveDaily["eventType"]
): WaveEventType {
  if (lucky?.lucky.includes("tenshabi")) return "tenshabi";
  if (lucky?.lucky.includes("ichiryumanbaibi")) return "ichiryumanbaibi";
  if (lucky?.lucky.includes("mi-no-hi")) return "mi-no-hi";
  if (lucky?.rokuyo === "大安") return "daian";
  if (moonMajor !== "none") return moonMajor;
  if (hasHoliday) return "holiday";
  if (hasFixedDay) return "fixed_day";
  return "none";
}

export function getLightWaveForDay(
  dateKey: string,
  lucky: LuckyDayRecord | undefined,
  hasHoliday: boolean,
  hasFixedDay: boolean
): LightWaveDaily {
  const moon = getMoonPhaseForDateKey(dateKey);
  const cycle = (moon.age / 29.530588853) * Math.PI * 2;
  const moonRhythm = Math.sin(cycle - Math.PI / 2);

  let baseScore = 50 + moonRhythm * 16;
  if (moon.majorPhase === "new_moon" || moon.majorPhase === "full_moon") {
    baseScore += 5;
  } else if (moon.majorPhase === "first_quarter" || moon.majorPhase === "last_quarter") {
    baseScore += 3;
  }
  if (lucky?.lucky.includes("tenshabi")) baseScore += 12;
  if (lucky?.lucky.includes("ichiryumanbaibi")) baseScore += 9;
  if (lucky?.lucky.includes("mi-no-hi")) baseScore += 6;
  if (lucky?.rokuyo === "大安") baseScore += 4;
  if (hasHoliday) baseScore += 4;
  if (hasFixedDay) baseScore += 3;

  const moonMajor: WaveEventType =
    moon.majorPhase === "new_moon"
      ? "new_moon"
      : moon.majorPhase === "first_quarter"
        ? "first_quarter"
        : moon.majorPhase === "full_moon"
          ? "full_moon"
          : moon.majorPhase === "last_quarter"
            ? "last_quarter"
            : "none";

  return {
    baseScore: round1(clamp(baseScore, 0, 100)),
    eventType: pickPrimaryEventType(lucky, hasHoliday, hasFixedDay, moonMajor),
  };
}

export function getPersonalScore(
  baseScore: number,
  number: FortuneNumber,
  eventType: WaveEventType
): number {
  const bonus = BONUS[number][eventType] ?? 0;
  return round1(clamp(baseScore * AMPLITUDE[number] + bonus, 0, 100));
}
