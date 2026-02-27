"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton, LuminaLinkButton } from "@/components/ui/button";
import { getFixedDayForDate } from "@/lib/holidays";
import { getMoonPhaseForDateKey, type MajorMoonPhase } from "@/lib/moon-phase";
import { destinyNumberFromBirthdate } from "@/lib/fortune/fortuneNumber";
import { isFortuneNumber, type FortuneNumber } from "@/lib/fortune/types";
import { getLightWaveForDay, getPersonalScore } from "@/lib/light-wave";
import {
  getLuckyDaysForMonth,
  LUCKY_DAY_DESCRIPTIONS,
  LUCKY_DAY_LABELS,
  ROKUYO_DESCRIPTIONS,
  type LuckyDayRecord,
} from "@/lib/lucky-days";

function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

function buildMonthGrid(date: Date): Array<{ dateKey: string | null; day: number | null }> {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<{ dateKey: string | null; day: number | null }> = [];
  for (let i = 0; i < startWeekday; i += 1) {
    cells.push({ dateKey: null, day: null });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({ dateKey, day });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ dateKey: null, day: null });
  }
  return cells;
}

function weekdayLabels() {
  return ["日", "月", "火", "水", "木", "金", "土"];
}

type HolidayApiResponse = {
  month: string;
  holidays: Record<string, string>;
};

type DayEvent = {
  id: string;
  icon: string;
  label: string;
  description: string;
  priority: number;
};

type WavePoint = {
  dateKey: string;
  day: number;
  score: number;
  baseScore: number;
};

const BIRTHDATE_STORAGE_KEY = "lumina_birthdate";

export default function CalendarPage() {
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [holidays, setHolidays] = useState<Record<string, string>>({});
  const [destinyNumber, setDestinyNumber] = useState<FortuneNumber | null>(null);

  const month = useMemo(() => toMonthKey(monthDate), [monthDate]);
  const grid = useMemo(() => buildMonthGrid(monthDate), [monthDate]);
  const monthDays = useMemo(() => getLuckyDaysForMonth(month), [month]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const birthdate = localStorage.getItem(BIRTHDATE_STORAGE_KEY);
        if (!birthdate) return;
        const number = destinyNumberFromBirthdate(birthdate);
        if (isFortuneNumber(number)) {
          setDestinyNumber(number);
        }
      } catch {
        setDestinyNumber(null);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const run = async () => {
      try {
        const res = await fetch(`/api/holidays?month=${month}`, { signal: controller.signal });
        const json = (await res.json()) as HolidayApiResponse;
        if (!cancelled) {
          setHolidays(json.holidays ?? {});
        }
      } catch {
        if (!cancelled) {
          setHolidays({});
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [month]);

  const selectedEvents = selectedDateKey
    ? buildDayEvents(selectedDateKey, monthDays[selectedDateKey], holidays[selectedDateKey])
    : [];
  const selectedMoonMajorPhase = selectedDateKey
    ? getMoonPhaseForDateKey(selectedDateKey).majorPhase
    : null;
  const wavePoints = useMemo(() => {
    const points: WavePoint[] = [];
    for (const cell of grid) {
      if (!cell.dateKey || !cell.day) continue;
      const fixed = getFixedDayForDate(cell.dateKey);
      const wave = getLightWaveForDay(
        cell.dateKey,
        monthDays[cell.dateKey],
        Boolean(holidays[cell.dateKey]),
        Boolean(fixed)
      );
      const score = destinyNumber
        ? getPersonalScore(wave.baseScore, destinyNumber, wave.eventType)
        : wave.baseScore;
      points.push({
        dateKey: cell.dateKey,
        day: cell.day,
        score,
        baseScore: wave.baseScore,
      });
    }
    return points;
  }, [grid, monthDays, holidays, destinyNumber]);

  const handlePrevMonth = () => {
    setSelectedDateKey(null);
    setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDateKey(null);
    setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <PageShell
      maxWidth="wide"
      title="光の暦"
      description="月の流れに合わせて、心を静かに整えるための小さな暦です。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <LuminaButton type="button" tone="secondary" onClick={handlePrevMonth}>
              前の月
            </LuminaButton>
            <p className="min-w-36 text-center text-lg font-medium text-[#2e2a26]">{monthLabel(monthDate)}</p>
            <LuminaButton type="button" tone="secondary" onClick={handleNextMonth}>
              次の月
            </LuminaButton>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#544c42]">
          祝日と縁起のいい日を重ねて表示します。日付を押すと、その日の流れをやわらかく読めます。
        </p>

        <div className="mt-5 grid grid-cols-7 gap-2">
          {weekdayLabels().map((label) => (
            <div key={label} className="px-2 text-center text-xs font-medium text-[#7d6d5a]">
              {label}
            </div>
          ))}

          {grid.map((cell, idx) => {
            if (!cell.dateKey || !cell.day) {
              return <div key={`blank-${idx}`} className="h-24 rounded-xl border border-transparent" />;
            }
            const entry = monthDays[cell.dateKey];
            const active = selectedDateKey === cell.dateKey;
            const events = buildDayEvents(cell.dateKey, entry, holidays[cell.dateKey]);
            return (
              <button
                type="button"
                key={cell.dateKey}
                onClick={() => setSelectedDateKey(cell.dateKey)}
                className={`h-24 rounded-xl border p-2 text-left transition ${
                  active
                    ? "border-[#b9a78b] bg-[#fff8ed]"
                    : "border-[#e1d5bf]/72 bg-white/60 hover:bg-[#fff8ed]/80"
                }`}
              >
                <p className="text-sm font-medium text-[#2e2a26]">{cell.day}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {events.length > 0 ? (
                    events.slice(0, 3).map((event) => (
                      <span
                        key={event.id}
                        className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#efe4d0] px-1 text-[10px] font-semibold leading-none text-[#6a5d4c]"
                        title={buildIconTitle(event)}
                      >
                        {event.icon}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs leading-relaxed text-[#6f6556]">—</span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-[#6f6556]">
                  {getCellCaption(events)}
                </p>
              </button>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#847967]">光の波</p>
            <h2 className="mt-1 text-lg font-medium text-[#2e2a26]">
              {destinyNumber
                ? `運命数${destinyNumber}の感じやすさ補正を重ねた整いやすさ`
                : "月相と縁起日から見た整いやすさ"}
            </h2>
          </div>
          <p className="text-xs text-[#6f6556]">
            {destinyNumber ? "表示: personalScore（baseScoreを補正）" : "表示: baseScore（共通）"}
          </p>
        </div>

        {!destinyNumber ? (
          <p className="mt-3 text-sm text-[#544c42]">
            運命数を入れると、日ごとの感じやすさの振れ幅を穏やかに補正して表示できます。
            <Link href="/basic-personality" className="ml-1 underline decoration-[#b9a78b] underline-offset-2">
              運命数を設定する
            </Link>
          </p>
        ) : (
          <p className="mt-3 text-sm text-[#544c42]">
            月相と縁起日の共通波に、運命数ごとの「感じやすさ」の補正を重ねて表示しています。
          </p>
        )}

        <div className="mt-4 rounded-xl border border-[#e1d5bf]/72 bg-white/65 p-3">
          <svg viewBox="0 0 100 100" className="h-44 w-full" role="img" aria-label="光の波グラフ">
            <line x1="0" y1="20" x2="100" y2="20" stroke="#e8dcc7" strokeWidth="0.8" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#e8dcc7" strokeWidth="0.8" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#e8dcc7" strokeWidth="0.8" />
            <polyline
              fill="none"
              stroke="#9e8867"
              strokeWidth="1.8"
              points={buildWavePolyline(wavePoints)}
            />
            {wavePoints.map((point, idx) => (
              <circle
                key={point.dateKey}
                cx={toWaveX(idx, wavePoints.length)}
                cy={toWaveY(point.score)}
                r="1.5"
                fill="#c5ad88"
              />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[11px] text-[#7d6d5a]">
            <span>1日</span>
            <span>{wavePoints[wavePoints.length - 1]?.day ?? 0}日</span>
          </div>
        </div>
      </GlassCard>

      {selectedDateKey ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/20 p-4 sm:items-center">
          <div className="w-full max-w-xl rounded-2xl border border-[#e1d5bf]/78 bg-[linear-gradient(160deg,rgba(255,252,246,0.94),rgba(248,242,231,0.9))] p-5 shadow-[0_20px_36px_-24px_rgba(82,69,53,0.35)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium tracking-wide text-[#847967]">光の暦</p>
                <h2 className="mt-1 text-xl font-medium text-[#2e2a26]">{selectedDateKey}</h2>
              </div>
              <LuminaButton type="button" tone="secondary" onClick={() => setSelectedDateKey(null)}>
                閉じる
              </LuminaButton>
            </div>

            <DayDetail events={selectedEvents} moonMajorPhase={selectedMoonMajorPhase} />
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

function DayDetail({
  events,
  moonMajorPhase,
}: {
  events: DayEvent[];
  moonMajorPhase: MajorMoonPhase;
}) {
  if (events.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-[#e1d5bf]/72 bg-white/65 p-4">
        <p className="text-sm leading-relaxed text-[#544c42]">この日は特別な登録がありません。</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {events.map((event) => (
        <div key={event.id} className="rounded-xl border border-[#e1d5bf]/72 bg-white/65 p-4">
          <p className="text-xs font-medium tracking-wide text-[#847967]">{event.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#544c42]">{event.description}</p>
        </div>
      ))}
      {moonMajorPhase === "new_moon" ? (
        <LuminaLinkButton href="/moon-rituals/new" className="inline-flex">
          新月の小さな儀式
        </LuminaLinkButton>
      ) : null}
      {moonMajorPhase === "full_moon" ? (
        <LuminaLinkButton href="/moon-rituals/full" className="inline-flex">
          満月の小さな儀式
        </LuminaLinkButton>
      ) : null}
    </div>
  );
}

function buildDayEvents(
  dateKey: string,
  entry: LuckyDayRecord | undefined,
  holidayName: string | undefined
): DayEvent[] {
  const events: DayEvent[] = [];
  const moon = getMoonPhaseForDateKey(dateKey);
  events.push({
    id: `moon-${dateKey}`,
    icon: moon.icon,
    label: `月の満ち欠け✨ ${moon.phaseLabel}`,
    description: buildMoonDescription(moon.phaseLabel, moon.majorPhase, moon.age),
    priority: 5,
  });

  const fixed = getFixedDayForDate(dateKey);
  if (fixed) {
    events.push({
      id: `fixed-${dateKey}-${fixed.label}`,
      icon: "季",
      label: fixed.label,
      description: fixed.description,
      priority: 10,
    });
  }

  if (holidayName) {
    events.push({
      id: `holiday-${dateKey}`,
      icon: "祝",
      label: `祝日: ${holidayName}`,
      description: `今日は「${holidayName}」。季節の節目に、いつもより深く呼吸して歩幅を整えると心が静かに満ちていきます。`,
      priority: 20,
    });
  }

  if (entry) {
    for (const kind of entry.lucky) {
      events.push({
        id: `lucky-${dateKey}-${kind}`,
        icon: "縁",
        label: LUCKY_DAY_LABELS[kind],
        description: `${LUCKY_DAY_DESCRIPTIONS[kind]}。焦らず丁寧に始めるほど、やさしい追い風が育っていきます。`,
        priority: 30,
      });
    }
    if (entry.rokuyo) {
      const base = ROKUYO_DESCRIPTIONS[entry.rokuyo] ?? "六曜の流れを意識して過ごす日";
      events.push({
        id: `rokuyo-${dateKey}-${entry.rokuyo}`,
        icon: "六",
        label: entry.rokuyo,
        description: `${base}。小さな確認を一つ重ねると、今日の流れがより穏やかになります。`,
        priority: 40,
      });
    }
  }

  return events.sort((a, b) => a.priority - b.priority);
}

function buildMoonDescription(label: string, majorPhase: MajorMoonPhase, age: number): string {
  const ageText = `月齢はおよそ${age.toFixed(1)}です。`;
  if (majorPhase === "new_moon") {
    return `${ageText}新月。静かに願いを置くほど、これからの流れがやさしく芽吹いていきます。`;
  }
  if (majorPhase === "first_quarter") {
    return `${ageText}上弦の月。動き出す力が満ちるとき。小さな一歩を丁寧に重ねると道が明るくなります。`;
  }
  if (majorPhase === "full_moon") {
    return `${ageText}満月。ここまでの歩みを受け取り、感謝を向けるほど心に澄んだ光が広がります。`;
  }
  if (majorPhase === "last_quarter") {
    return `${ageText}下弦の月。いらない力みをほどき、整え直すことで次の流れが軽やかになります。`;
  }
  return `${ageText}${label}。今の自分の呼吸にそっと合わせるように過ごすと、今日の流れが穏やかに整います。`;
}

function getCellCaption(events: DayEvent[]): string {
  const holiday = events.find((event) => event.id.startsWith("holiday-"));
  if (holiday) return holiday.label.replace(/^祝日:\s*/, "");

  const fixed = events.find((event) => event.id.startsWith("fixed-"));
  if (fixed) return fixed.label;

  const lucky = events.find((event) => event.id.startsWith("lucky-") || event.id.startsWith("rokuyo-"));
  if (lucky) return lucky.label;

  return " ";
}

function buildIconTitle(event: DayEvent): string {
  return `${event.label}：${event.description}`;
}

function toWaveX(index: number, total: number): number {
  if (total <= 1) return 0;
  return (index / (total - 1)) * 100;
}

function toWaveY(score: number): number {
  return 100 - score;
}

function buildWavePolyline(points: WavePoint[]): string {
  if (points.length === 0) return "";
  return points
    .map((point, idx) => `${toWaveX(idx, points.length)},${toWaveY(point.score)}`)
    .join(" ");
}
