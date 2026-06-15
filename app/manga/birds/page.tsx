import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { ShopBanner } from "@/components/shop-banner";

export const metadata: Metadata = {
  title: "羽根の広場｜鳥タイプ診断キャラクター漫画 | 白の書庫 | LUMINA",
  description:
    "鳥タイプ診断のキャラクターたちが集まる小さな広場。ハクや文鳥、セキセイインコ、カラスたちのにぎやかな日常漫画をお楽しみください。",
  alternates: {
    canonical: "/manga/birds",
  },
  openGraph: {
    title: "羽根の広場｜鳥タイプ診断キャラクター漫画",
    description: "鳥タイプ診断のキャラクターたちが集まる小さな広場。にぎやかな日常漫画をお楽しみください。",
    url: "/manga/birds",
    type: "website",
  },
};

// 漫画画像は /public/gazou/bird/manga/ に保存する。
// このフォルダに画像を追加するだけで、自動でこのページに掲載される（ビルド時にフォルダを読み取る）。
const MANGA_DIR = path.join(process.cwd(), "public/gazou/bird/manga");
const PUBLIC_PREFIX = "/gazou/bird/manga";

// 各話のタイトル（ファイル名 → 表示名）。
// ここに無いファイルはファイル名がそのまま表示名になる。
// 並び順もこの定義順を優先し、未定義ファイルは末尾にファイル名順で追加する。
const TITLES: Record<string, string> = {
  "torikaigi.png": "鳥会議",
  "asanokaigi.png": "朝の会議",
  "oyatukaigi.png": "おやつ会議",
  "oyatunowakekata.png": "おやつの分け方",
  "sekiseiinkoaruaru.png": "セキセイインコあるある",
  "sekiseinotomodati.png": "セキセイの友達",
  "sirohukurounojyogen.png": "シロフクロウの助言",
  "oukookunokaigi.png": "王国の会議",
  "oukokuanke-to.png": "王国アンケート",
  "8.png": "",
  "9.png": "",
  "10.png": "",
  "11.png": "",
  "12.png": "",
  "13.png": "",
  "14.png": "",
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
      title: `羽根の広場${circledNumber(index + 1)} ${name}`,
      src: `${PUBLIC_PREFIX}/${file}`,
      width,
      height,
    };
  });
}

export default function BirdsMangaPage() {
  const mangaList = loadMangaList();

  return (
    <PageShell
      maxWidth="content"
      title="羽根の広場"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard>
        <p className="whitespace-pre-line text-sm leading-7 text-[#544c42] sm:text-base">
          {"鳥タイプ診断の鳥たちが集まる、小さな広場。\n今日もにぎやかなおしゃべりが始まります。"}
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
          href="/bird"
          aria-label="鳥タイプ診断"
          className="group block overflow-hidden rounded-2xl border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
        >
          <Image
            src="/gazou/bird/banner.png"
            alt="鳥タイプ診断"
            width={2544}
            height={416}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </Link>
      </section>

      <ShopBanner page="/manga/birds" className="mt-4 px-0" />
    </PageShell>
  );
}
