"use client";

import { useEffect, useMemo, useState } from "react";
import { destinyNumberFromBirthdate } from "@/lib/fortune/fortuneNumber";
import { isFortuneNumber } from "@/lib/fortune/types";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";

type CalendarDayEntry = {
  tag: string;
  message: string;
  hint: string;
  affirmation: string;
};

type CalendarResponse = {
  month: string;
  number: string;
  days: Record<string, CalendarDayEntry>;
  generatedAt: string;
};

const BIRTHDATE_STORAGE_KEY = "lumina_birthdate";

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

export default function CalendarPage() {
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [fortuneNumber, setFortuneNumber] = useState<number | null>(null);
  const [days, setDays] = useState<Record<string, CalendarDayEntry>>({});
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const month = useMemo(() => toMonthKey(monthDate), [monthDate]);
  const grid = useMemo(() => buildMonthGrid(monthDate), [monthDate]);
  const selectedEntry = selectedDateKey ? days[selectedDateKey] ?? null : null;

  useEffect(() => {
    try {
      const birthDate = localStorage.getItem(BIRTHDATE_STORAGE_KEY);
      if (!birthDate) return;
      const number = destinyNumberFromBirthdate(birthDate);
      setFortuneNumber(number);
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    if (!fortuneNumber || !isFortuneNumber(fortuneNumber)) return;
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/calendar?month=${month}&number=${fortuneNumber}`);
        const json = (await res.json()) as CalendarResponse | { error?: string };
        if (!res.ok) {
          throw new Error((json as { error?: string }).error ?? "取得に失敗しました。");
        }
        if (!cancelled) {
          setDays((json as CalendarResponse).days);
          setSelectedDateKey(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "取得に失敗しました。");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [month, fortuneNumber]);

  const handlePrevMonth = () => {
    setMonthDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LuminaButton type="button" tone="secondary" onClick={handlePrevMonth}>
              前の月
            </LuminaButton>
            <p className="min-w-36 text-center text-lg font-medium text-[#2e2a26]">{monthLabel(monthDate)}</p>
            <LuminaButton type="button" tone="secondary" onClick={handleNextMonth}>
              次の月
            </LuminaButton>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="fortune-number" className="text-sm text-[#544c42]">
              運命数
            </label>
            <select
              id="fortune-number"
              value={fortuneNumber ?? ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                setFortuneNumber(isFortuneNumber(value) ? value : null);
              }}
              className="lumina-input rounded-lg px-3 py-2 text-sm"
            >
              <option value="">選択してください</option>
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!fortuneNumber ? (
          <p className="mt-4 text-sm text-[#544c42]">
            基本性格を占うと運命数が自動で反映されます。先に運命数を選んで表示することもできます。
          </p>
        ) : null}

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

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
            const entry = days[cell.dateKey];
            const active = selectedDateKey === cell.dateKey;
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
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#6f6556]">
                  {isLoading ? "読み込み中..." : entry?.tag ?? "—"}
                </p>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {selectedEntry && selectedDateKey ? (
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

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-[#e1d5bf]/72 bg-white/65 p-4">
                <p className="text-xs font-medium tracking-wide text-[#847967]">タグ</p>
                <p className="mt-1 text-base font-medium text-[#2e2a26]">{selectedEntry.tag}</p>
              </div>

              <div className="rounded-xl border border-[#e1d5bf]/72 bg-white/65 p-4">
                <p className="text-xs font-medium tracking-wide text-[#847967]">メッセージ</p>
                <p className="mt-2 text-sm leading-relaxed text-[#544c42]">{selectedEntry.message}</p>
              </div>

              <div className="rounded-xl border border-[#e1d5bf]/72 bg-white/65 p-4">
                <p className="text-xs font-medium tracking-wide text-[#847967]">今日のヒント</p>
                <p className="mt-2 text-sm leading-relaxed text-[#544c42]">{selectedEntry.hint}</p>
              </div>

              <div className="rounded-xl border border-[#e1d5bf]/72 bg-white/65 p-4">
                <p className="text-xs font-medium tracking-wide text-[#847967]">アファメーション</p>
                <p className="mt-2 text-sm leading-relaxed text-[#544c42]">{selectedEntry.affirmation}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

