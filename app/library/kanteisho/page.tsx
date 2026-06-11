import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { DiagnosisBanners } from "@/components/diagnosis-banners";
import { ShopBanner } from "@/components/shop-banner";

export const metadata: Metadata = {
  title: "ルミナの鑑定書 | 白の書庫 | LUMINA",
  description:
    "白の魔女ルミナがnoteでお届けする有料鑑定書。片思い、復縁、既読無視、不倫、告白前の不安。誰にも言えない悩みを抱えた夜に、そっと開くための一冊です。",
  alternates: {
    canonical: "/library/kanteisho",
  },
  openGraph: {
    title: "ルミナの鑑定書 | 白の書庫 | LUMINA",
    description: "恋に迷った夜に読む、小さな魔法の本たち。",
    url: "/library/kanteisho",
    type: "website",
  },
};

type Book = {
  title: string;
  description: string;
  url?: string;
  /** 個別記事URLが無く、note内で随時更新される項目に表示するボタン文言 */
  note?: string;
  /** noteのトップ等、note項目のリンク先 */
  noteUrl?: string;
};

type Category = {
  name: string;
  books: Book[];
};

const categories: Category[] = [
  {
    name: "恋愛鑑定書",
    books: [
      {
        title: "片思いを進展させる魔女の鑑定書",
        description:
          "あなたとあの人の距離は、どこで止まっているのでしょうか。片思いの現状、相手の心理、関係を動かすためのヒントを深く読み解く本格鑑定書です。",
        url: "https://note.com/lumina_fortune/n/nf179ea4f0a63",
      },
      {
        title: "告白する前夜の処方箋",
        description:
          "明日伝えようと思っているその想い。不安と緊張で眠れない夜に向けて書いた、小さなお守りのような一冊です。",
        url: "https://note.com/lumina_fortune/n/nfa0af7f39712",
      },
      {
        title: "既読無視・連絡が来ない男性心理 完全鑑定書",
        description:
          "なぜ返信が来ないのか。脈なしなのか、それとも考えているだけなのか。男性心理を徹底的に読み解く鑑定書です。",
        url: "https://note.com/lumina_fortune/n/n8e65d7d03847",
      },
      {
        title: "既読無視3日目の夜に読む処方箋",
        description:
          "不安が最も大きくなる「3日目」。待つべきか、動くべきか。心が折れそうな夜のための処方箋です。",
        url: "https://note.com/lumina_fortune/n/n31d198959dc3",
      },
      {
        title: "完全復縁マニュアル",
        description:
          "復縁したい。その気持ちだけで動いてしまう前に。復縁の可能性を高めるために知っておきたいことをまとめた実践的な鑑定書です。",
        url: "https://note.com/lumina_fortune/n/naed33ca40425",
      },
    ],
  },
  {
    name: "心を整える処方箋",
    books: [
      {
        title: "夜中に元彼を思い出してしまった夜の処方箋",
        description:
          "もう終わったはずなのに。ふとした瞬間に蘇る記憶と気持ち。過去を抱える夜に寄り添うための一冊です。",
        url: "https://note.com/lumina_fortune/n/n464465d78ba6",
      },
      {
        title: "不倫・禁断の恋の処方箋",
        description:
          "誰にも言えない恋。否定も肯定もしないまま、その苦しみと向き合うための場所です。",
        url: "https://note.com/lumina_fortune/n/n1dc588bcd47e",
      },
    ],
  },
  {
    name: "毎月の運勢",
    books: [
      {
        title: "星座×血液型運勢",
        description:
          "毎月更新。12星座×4血液型ごとの運勢を詳しく解説しています。恋愛運・仕事運・人間関係運など、その月をより良く過ごすためのヒントをお届けします。",
        note: "note内で随時更新",
        noteUrl: "https://note.com/lumina_fortune",
      },
    ],
  },
];

export default function KanteishoPage() {
  return (
    <PageShell
      maxWidth="content"
      title="ルミナの鑑定書"
      description="恋に迷った夜に読む、小さな魔法の本たち"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-[#e6dac8]/80 shadow-[0_26px_56px_-40px_rgba(104,86,66,0.28)]">
        <Image
          src="/gazou/luminaskanteisyo.png"
          alt="ルミナの鑑定書のイメージ"
          width={1050}
          height={500}
          className="w-full"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-white/25" />
      </div>

      <GlassCard className="mt-4">
        <div className="space-y-4 text-sm leading-7 text-[#544c42]">
          <p>無料コラムでは語りきれない恋の本音や心の動き。</p>
          <p>
            白の魔女ルミナは、そんな「もう少し深く知りたい」という声に応えるため、noteにて有料鑑定書をお届けしています。
          </p>
          <p>片思い、復縁、既読無視、不倫、告白前の不安。</p>
          <p>誰にも言えない悩みを抱えた夜に、そっと開くための一冊です。</p>
          <p>
            また、毎月更新している「星座×血液型運勢」もnoteにて公開中です。
          </p>
          <p>今のあなたに必要な言葉を見つけてください。</p>
        </div>
      </GlassCard>

      <div className="mt-4 space-y-4">
        {categories.map((category) => (
          <GlassCard
            key={category.name}
            className="border-[#e1d5bf]/75 bg-[linear-gradient(162deg,rgba(255,252,246,0.9),rgba(248,242,231,0.86))]"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-medium text-[#2e2a26]">カテゴリ: {category.name}</h2>
              <span className="rounded-full border border-[#d4c5ac]/80 bg-[#fff8ec]/90 px-2.5 py-1 text-xs text-[#6f6556]">
                {category.books.length}冊
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {category.books.map((book) => (
                <article key={book.title} className="flex flex-col rounded-xl border border-[#dccfb8]/75 bg-white/65 p-4">
                  <h3 className="text-lg font-medium text-[#2e2a26]">{book.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-[#544c42]">{book.description}</p>
                  <div className="mt-4">
                    {book.url ? (
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-[#baa98d]/72 bg-[#fdf8ee] px-4 py-2 text-sm text-[#6f6556] transition hover:bg-[#f9f3e7]"
                      >
                        noteで読む →
                      </a>
                    ) : book.note ? (
                      <a
                        href={book.noteUrl ?? "https://note.com/lumina_fortune"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-[#baa98d]/72 bg-[#fdf8ee] px-4 py-2 text-sm text-[#6f6556] transition hover:bg-[#f9f3e7]"
                      >
                        {book.note} →
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-4 text-center">
        <h3 className="text-base font-medium text-[#2e2a26]">もっと深く知りたいあなたへ</h3>
        <div className="mt-3 space-y-3 text-sm leading-7 text-[#544c42]">
          <p>無料コラムでは語りきれない想いがあります。</p>
          <p>恋の行方に迷ったとき。不安で眠れない夜。誰かに背中を押してほしいとき。</p>
          <p>ルミナの鑑定書が、あなたの心を照らす灯りになりますように。</p>
        </div>
        <div className="mt-5">
          <a
            href="https://note.com/lumina_fortune"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-[#baa98d]/72 bg-[#fdf8ee] px-6 py-2.5 text-sm text-[#6f6556] transition hover:bg-[#f9f3e7]"
          >
            noteで鑑定書一覧を見る →
          </a>
        </div>
      </GlassCard>

      <DiagnosisBanners page="/library/kanteisho" className="mt-8" />
      <ShopBanner page="/library/kanteisho" className="mt-4 px-0" />
    </PageShell>
  );
}
