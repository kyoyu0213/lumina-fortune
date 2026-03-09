"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaLinkButton } from "@/components/ui/button";
import { destinyNumberFromBirthdate } from "@/lib/fortune/fortuneNumber";
import { getFortuneNumberName } from "@/lib/fortune/names";
import { buildProfileVersionKey, loadStoredProfile } from "@/lib/profile/profile-store";

type Props = {
  initialBirthdate: string | null;
};

export default function MonthlyResultIndexClient({ initialBirthdate }: Props) {
  const router = useRouter();
  const [profile, setProfile] = useState<ReturnType<typeof loadStoredProfile>>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setProfile(loadStoredProfile());
      setIsHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const birthdate = isHydrated ? profile?.birthdate?.trim() || initialBirthdate || "" : initialBirthdate || "";
  const profileKey = useMemo(() => buildProfileVersionKey(profile), [profile]);

  const fortuneName = useMemo(() => {
    if (!birthdate) return null;

    try {
      return getFortuneNumberName(destinyNumberFromBirthdate(birthdate));
    } catch {
      return null;
    }
  }, [birthdate]);

  useEffect(() => {
    if (!isHydrated && !initialBirthdate) return;
    if (!birthdate || !fortuneName) {
      router.replace("/fortune-monthly");
    }
  }, [birthdate, fortuneName, initialBirthdate, isHydrated, router]);

  if (!birthdate || !fortuneName) {
    return (
      <PageShell maxWidth="narrow" title="毎月の運勢" backHref="/" backLabel="トップへ戻る">
        <GlassCard>
          <p className="lumina-muted text-sm">最新プロフィールを確認しています...</p>
        </GlassCard>
      </PageShell>
    );
  }

  return (
    <PageShell
      maxWidth="content"
      title={`${fortuneName}の毎月の運勢`}
      description="最新プロフィールをもとに毎月の流れを表示します。"
      backHref="/fortune-monthly?edit=1"
      backLabel="生年月日を入力し直す"
      headerRight={<LuminaLinkButton href="/" tone="secondary">トップへ戻る</LuminaLinkButton>}
    >
      <GlassCard>
        <section className="lumina-card rounded-2xl p-5">
          <h2 className="text-base font-semibold tracking-wide text-slate-800">月を選ぶ</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }, (_, index) => {
              const month = index + 1;
              return (
                <Link
                  key={`${month}-${profileKey}`}
                  href={`/fortune-monthly/result/${month}`}
                  className="lumina-pill-link rounded-xl px-4 py-3 text-sm font-medium transition"
                >
                  {month}月の運勢
                </Link>
              );
            })}
          </div>
        </section>
      </GlassCard>
    </PageShell>
  );
}
