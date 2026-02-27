export type MajorMoonPhase = "new_moon" | "first_quarter" | "full_moon" | "last_quarter" | null;

export type MoonPhaseInfo = {
  age: number;
  icon: "🌑" | "🌒" | "🌓" | "🌔" | "🌕" | "🌖" | "🌗" | "🌘";
  phaseLabel: string;
  majorPhase: MajorMoonPhase;
};

const SYNODIC_MONTH = 29.530588853;
const KNOWN_NEW_MOON_UTC_MS = Date.UTC(2000, 0, 6, 18, 14, 0);
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const PHASE_ICONS: MoonPhaseInfo["icon"][] = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
const PHASE_LABELS = [
  "新月",
  "三日月",
  "上弦の月",
  "満ちていく月",
  "満月",
  "欠けていく月",
  "下弦の月",
  "細い月",
] as const;

function normalizeAge(age: number): number {
  const mod = age % SYNODIC_MONTH;
  return mod < 0 ? mod + SYNODIC_MONTH : mod;
}

function nearestDistance(a: number, b: number): number {
  const diff = Math.abs(a - b);
  return Math.min(diff, SYNODIC_MONTH - diff);
}

export function getMoonPhaseForDateKey(dateKey: string): MoonPhaseInfo {
  const [y, m, d] = dateKey.split("-").map(Number);
  const utcNoon = Date.UTC(y, (m || 1) - 1, d || 1, 12, 0, 0);
  const daysSinceKnown = (utcNoon - KNOWN_NEW_MOON_UTC_MS) / MS_PER_DAY;
  const age = normalizeAge(daysSinceKnown);

  const phaseIndex = Math.floor((age / SYNODIC_MONTH) * 8 + 0.5) % 8;
  const quarter = SYNODIC_MONTH / 4;
  const tolerance = 0.9;

  let majorPhase: MajorMoonPhase = null;
  if (nearestDistance(age, 0) <= tolerance) majorPhase = "new_moon";
  else if (nearestDistance(age, quarter) <= tolerance) majorPhase = "first_quarter";
  else if (nearestDistance(age, quarter * 2) <= tolerance) majorPhase = "full_moon";
  else if (nearestDistance(age, quarter * 3) <= tolerance) majorPhase = "last_quarter";

  return {
    age,
    icon: PHASE_ICONS[phaseIndex] ?? "🌑",
    phaseLabel: PHASE_LABELS[phaseIndex] ?? "新月",
    majorPhase,
  };
}

