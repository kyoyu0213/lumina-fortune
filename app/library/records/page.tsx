import type { Metadata } from "next";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { PageShell } from "@/components/ui/page-shell";
import { RecordsClient } from "./records-client";

export const metadata: Metadata = {
  title: "白の庭の記録（物語） | 光の書庫 | LUMINA",
  description: "白の庭の記録を章ごとに辿る目次ページ。ルミナの物語を静かに読み解けます。",
};

export default function RecordsPage() {
  return (
    <PageShell
      maxWidth="content"
      title="白の庭から白の館へ。"
      description="ここは、ルミナの世界観を描いた小さな物語のコーナーです。"
      backHref="/"
      backLabel="トップへ戻る"
    >

      <div className="relative overflow-hidden rounded-[2rem] border border-[#e6dac8]/80 shadow-[0_26px_56px_-40px_rgba(104,86,66,0.28)]">
        <Image src="/gazou/syoko.png" alt="白の庭の記録のイメージ" width={1050} height={500} className="w-full" priority />
        <div className="pointer-events-none absolute inset-0 bg-white/25" />
      </div>

      <GlassCard>
        <RecordsClient />
      </GlassCard>
    </PageShell>
  );
}
