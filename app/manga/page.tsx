import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { ShopBanner } from "@/components/shop-banner";

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

// 漫画画像は /public/majyosindan/manga/ に保存する。
// このフォルダに画像を追加するだけで、自動でこのページに掲載される（ビルド時にフォルダを読み取る）。
const MANGA_DIR = path.join(process.cwd(), "public/majyosindan/manga");
const PUBLIC_PREFIX = "/majyosindan/manga";

// 各話のタイトル（ファイル名 → 表示名）。
// ここに無いファイルはファイル名がそのまま表示名になる。
// 並び順もこの定義順を優先し、未定義ファイルは末尾にファイル名順で追加する。
const TITLES: Record<string, string> = {
  "ocyakai.png": "お茶会",
  "ohanami.png": "お花見",
  "ohanami2.png": "お花見ふたたび",
  "majyokaigi.png": "魔女会議",
  "majyokaigiaruaru.png": "魔女会議あるある",
  "hoshimikai.png": "星見会",
  "tanabatanonegai.png": "七夕の願い",
  "takarasagasi.png": "宝探し",
  "ri-da-taiketu.png": "リーダー対決",
  "sirotohana.png": "白と花",
  "sironomajyonokoe.png": "白の魔女の声",
  "morinomajyonokurou.png": "森の魔女の苦労",
  "tokinomajyonogekido.png": "時の魔女の激怒",
  "morinomajyonokurou2.png": "森の魔女の苦労ふたたび",
  "tokinomajyonogekido2.png": "時の魔女の激怒ふたたび",
  "sironomajyonokokoronokoe.png": "白の魔女の心の声",
  "hanatoumi.png": "花と海",
  "kurotoakatuki.png": "黒と暁",
  "mondaijikaigi.png": "問題児会議",
  "tokinomajyonokurou.png": "時の魔女の苦労",
  "morinomajyonokurou3.png": "森の魔女の苦労みたび",
  "sironomajyonokokoronokoe6.png": "白の魔女の心の声6",
};

type MangaItem = {
  title: string;
  src: string;
  width: number;
  height: number;
};

// PNGのIHDRから画像サイズを取得（比率維持・レイアウトシフト防止のため）。
function readPngSize(buffer: Buffer): { width: number; height: number } {
  if (buffer.length >= 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  return { width: 1200, height: 1400 };
}

// 丸囲み数字（①②③…）。20件を超えたら "(n)" で表記。
function circledNumber(n: number): string {
  return n >= 1 && n <= 20 ? String.fromCodePoint(0x2460 + (n - 1)) : `(${n})`;
}

function loadMangaList(): MangaItem[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(MANGA_DIR).filter((file) => /\.png$/i.test(file));
  } catch {
    return [];
  }

  const ordered = [
    ...Object.keys(TITLES).filter((file) => files.includes(file)),
    ...files.filter((file) => !(file in TITLES)).sort(),
  ];

  return ordered.map((file, index) => {
    const { width, height } = readPngSize(fs.readFileSync(path.join(MANGA_DIR, file)));
    const name = TITLES[file] ?? file.replace(/\.[^.]+$/, "");
    return {
      title: `魔女たちの日常${circledNumber(index + 1)} ${name}`,
      src: `${PUBLIC_PREFIX}/${file}`,
      width,
      height,
    };
  });
}

export default function MangaPage() {
  const mangaList = loadMangaList();

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

      <ShopBanner page="/manga" className="mt-4 px-0" />
    </PageShell>
  );
}
