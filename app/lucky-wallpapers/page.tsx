import Image from "next/image";
import Link from "next/link";
import { luckyWallpapers } from "@/lib/lucky-wallpapers";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";

export default function LuckyWallpapersPage() {
  return (
    <PageShell
      maxWidth="wide"
      title="光の待ち受けお守り"
      description="気分や願いに合わせて選べる、ルミナのやわらかな開運待ち受けです。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard>
        <p className="lumina-muted text-sm">スマホの待ち受けに使える開運画像です。</p>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {luckyWallpapers.map((wallpaper) => (
            <Link
              key={wallpaper.id}
              href={`/lucky-wallpapers/${wallpaper.id}`}
              className="lumina-card group overflow-hidden rounded-2xl transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[9/16] w-full bg-slate-50/80">
                <Image
                  src={wallpaper.file}
                  alt={wallpaper.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div className="space-y-2 p-4">
                <h2 className="text-base font-semibold leading-snug text-slate-900">{wallpaper.title}</h2>
                <p className="lumina-muted text-sm leading-relaxed">{wallpaper.shortDescription}</p>
              </div>
            </Link>
          ))}
        </section>
      </GlassCard>
    </PageShell>
  );
}
