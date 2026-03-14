import Image from "next/image";
import Link from "next/link";
import { lightWorks } from "@/lib/light-work";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";

export default function LightWorkPage() {
  return (
    <PageShell
      maxWidth="content"
      title="光のワーク"
      description="気分や目的に合わせて選べる、短時間で実行しやすいセルフワークです。呼吸とイメージを使って、心と空気感を静かに整えます。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-[#e6dac8]/80 shadow-[0_26px_56px_-40px_rgba(104,86,66,0.28)]">
        <Image src="/gazou/work.png" alt="光のワークのイメージ" width={1050} height={500} className="w-full" priority />
        <div className="pointer-events-none absolute inset-0 bg-white/25" />
      </div>

      <GlassCard className="mt-6">
        <section className="grid gap-4">
          {lightWorks.map((work) => (
            <Link
              key={work.slug}
              href={`/light-work/${work.slug}`}
              className="lumina-card rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{work.title}</h2>
                  <p className="lumina-muted mt-2 text-sm leading-relaxed">{work.summary}</p>
                </div>
                <span className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
                  {work.duration}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </GlassCard>
    </PageShell>
  );
}
