import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "魔女たちの日常 | 白の書庫 | LUMINA",
  description: "白の庭に暮らす魔女たちの、小さな物語。今日もどこかで、魔女たちは少しだけ不思議で、少しだけ賑やかな時間を過ごしています。",
  alternates: {
    canonical: "/manga",
  },
  openGraph: {
    title: "魔女たちの日常 | 白の書庫 | LUMINA",
    description: "白の庭に暮らす魔女たちの、小さな物語。",
    url: "/manga",
    type: "website",
  },
};

type MangaItem = {
  title: string;
  src: string;
  width: number;
  height: number;
};

// 漫画画像は /public/majyosindan/manga/ に保存されている。
const mangaList: MangaItem[] = [
  {
    title: "魔女たちの日常① お茶会",
    src: "/majyosindan/manga/ocyakai.png",
    width: 1122,
    height: 1402,
  },
  {
    title: "魔女たちの日常② お花見",
    src: "/majyosindan/manga/ohanami.png",
    width: 1149,
    height: 1369,
  },
  {
    title: "魔女たちの日常③ 魔女会議",
    src: "/majyosindan/manga/majyokaigi.png",
    width: 1198,
    height: 1313,
  },
];

export default function MangaPage() {
  return (
    <PageShell
      maxWidth="content"
      title="魔女たちの日常"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard>
        <p className="whitespace-pre-line text-sm leading-7 text-[#544c42] sm:text-base">
          {"白の庭に暮らす魔女たちの、小さな物語。\n今日もどこかで、魔女たちは少しだけ不思議で、少しだけ賑やかな時間を過ごしています。"}
        </p>
      </GlassCard>

      <div className="mt-4 space-y-5">
        {mangaList.map((manga) => (
          <article key={manga.src}>
            <div className="overflow-hidden rounded-2xl border border-[#e6dac8]/80 bg-[#fdfaf3] shadow-[0_18px_40px_-28px_rgba(104,86,66,0.4)]">
              <Image
                src={manga.src}
                alt={manga.title}
                width={manga.width}
                height={manga.height}
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            <h2 className="mt-3 text-center text-base font-medium tracking-[0.04em] text-[#2e2a26] sm:text-lg">
              {manga.title}
            </h2>
          </article>
        ))}
      </div>

      <section className="mt-8">
        <Link
          href="/majyosindan"
          aria-label="魔女タイプ診断"
          className="group block overflow-hidden rounded-2xl border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
        >
          <Image
            src="/majyosindan/majyosindan.png"
            alt="魔女タイプ診断"
            width={1774}
            height={296}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </Link>
      </section>
    </PageShell>
  );
}
