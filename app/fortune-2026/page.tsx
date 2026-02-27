"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { destinyNumberFromBirthdate } from "@/lib/fortune/fortuneNumber";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";

const BIRTHDATE_KEY = "fortune2026_birthdate";
const DESTINY_KEY = "fortune2026_destinyNumber";

function isValidDestinyNumber(value: string | null): value is `${1|2|3|4|5|6|7|8|9}` {
  return value !== null && /^[1-9]$/.test(value);
}

export default function Fortune2026Page() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [checkingStorage, setCheckingStorage] = useState(true);

  useEffect(() => {
    const savedDestiny = localStorage.getItem(DESTINY_KEY);
    if (isValidDestinyNumber(savedDestiny)) {
      router.replace(`/fortune-2026/result/${savedDestiny}`);
      return;
    }

    const savedBirthdate = localStorage.getItem(BIRTHDATE_KEY);
    if (savedBirthdate) {
      setBirthDate(savedBirthdate);
    }
    setCheckingStorage(false);
  }, [router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!birthDate) {
      setError("生年月日を入力してください。");
      return;
    }

    try {
      const destinyNumber = destinyNumberFromBirthdate(birthDate);
      localStorage.setItem(BIRTHDATE_KEY, birthDate);
      localStorage.setItem(DESTINY_KEY, String(destinyNumber));
      router.push(`/fortune-2026/result/${destinyNumber}`);
    } catch {
      setError("正しい生年月日を入力してください。");
    }
  };

  if (checkingStorage) {
    return (
      <PageShell
        maxWidth="narrow"
        title="生年月日で占う2026年の運勢"
        description="生年月日から運命数を計算し、2026年の運勢を表示します。"
        backHref="/"
        backLabel="トップへ戻る"
      >
        <GlassCard>
          <p className="lumina-muted text-sm">読み込み中...</p>
        </GlassCard>
      </PageShell>
    );
  }

  return (
    <PageShell
      maxWidth="narrow"
      title="生年月日で占う2026年の運勢"
      description="生年月日から運命数を計算し、2026年の運勢を表示します。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-[#2e2a26]">
            生年月日
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="lumina-input mt-2 w-full rounded-lg px-4 py-2 transition"
              required
            />
          </label>

          <LuminaButton type="submit" tone="primary">
            2026年の運勢を占う
          </LuminaButton>
        </form>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      </GlassCard>
    </PageShell>
  );
}
