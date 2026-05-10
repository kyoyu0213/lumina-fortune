import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "ルミナが信頼する電話鑑定 | 白の館 LUMINA",
  description: "声で話したい夜に、ルミナがご案内する信頼できる電話鑑定。",
};

type Affiliate = {
  href: string;
  imgSrc: string;
  imgAlt: string;
  width: number;
  height: number;
  pixelSrc?: string;
};

const PROVIDERS: ReadonlyArray<{
  number: string;
  name: string;
  eyebrow: string;
  body: readonly string[];
  pull: string;
  ctaLabel: string;
  affiliate?: Affiliate;
}> = [
  {
    number: "1",
    name: "ココナラ電話占い",
    eyebrow: "はじめての方に",
    body: [
      "電話占いをはじめてご利用される方に、いちばん最初におすすめできる場所です。",
      "大手の運営による安心感、占い師の方々の数の多さ、そして料金体系の明朗さ——「電話占いがどんなものか、まず試してみたい」という方が、安心して一歩を踏み出せる場所として整っています。",
      "初回登録で3,000円分のクーポンが受け取れますので、最初の1〜2回のご相談を、実質無料に近い形ではじめていただけます。占い師を自分のペースで選べる仕組みなので、合うと感じる方を見つけるまで、複数の方に少しずつ相談していくことができます。",
    ],
    pull: "「いきなり長く話すのはハードルが高い。まずは試してみたい」——そう思われる方の、最初の入口に。",
    ctaLabel: "ココナラ電話占いを覗いてみる",
    affiliate: {
      href: "https://px.a8.net/svt/ejp?a8mat=4B3G6I+6BFMMY+2PEO+C3YG1",
      imgSrc: "https://www23.a8.net/svt/bgt?aid=260501418382&wid=002&eno=01&mid=s00000012624002034000&mc=1",
      imgAlt: "ココナラ電話占い",
      width: 468,
      height: 60,
      pixelSrc: "https://www14.a8.net/0.gif?a8mat=4B3G6I+6BFMMY+2PEO+C3YG1",
    },
  },
  {
    number: "2",
    name: "ヴェルニ",
    eyebrow: "実力派でじっくり見てもらいたい方に",
    body: [
      "電話占い業界の中でも、占い師の方々の選考基準が厳しいことで知られる老舗です。",
      "リピーターの方が多いことが、占い師の質の高さを物語っています。「同じ方に継続して見ていただきたい」「ひとりの占い師の方に、深く長く相談したい」——そんなご希望のある方に合う場所です。",
      "電話だけでなくチャットや対面での鑑定にも対応している占い師の方が多いため、最初は電話で、慣れたら別の形で、という使い分けもできます。",
    ],
    pull: "「単発ではなく、信頼できる占い師の方を見つけて、じっくり相談していきたい」——そう願う方の、長く続く相談相手に。",
    ctaLabel: "ヴェルニを覗いてみる",
  },
  {
    number: "3",
    name: "電話占いピュアリ",
    eyebrow: "本格的な鑑定を求める方に",
    body: [
      "2004年創業の老舗電話占い。テレビや雑誌で取り上げられることの多い、メディア実績のある占い師の方々が在籍しています。",
      "特別な悩みを、本気で見てもらいたい——そんな夜のための場所です。一般的な恋愛相談を超えた、人生の岐路に立つようなご相談、複雑な事情を抱えたご相談を、本格的な実力で受け止めてくださる占い師の方々がいらっしゃいます。",
      "老舗ならではの安定した運営と、実力派の占い師。「軽く話を聴いてほしい」というよりは、「本気で人生を見てもらいたい」という方に合います。",
    ],
    pull: "「他のところでは深く見てもらえなかった」「特別な悩みを、本気の実力で解いてほしい」——そんな方の、最後にたどり着ける場所に。",
    ctaLabel: "電話占いピュアリを覗いてみる",
  },
];

function SectionCard({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-[1.6rem] border border-[#ebe1cf]/85 bg-[linear-gradient(160deg,rgba(255,252,246,0.82),rgba(247,240,228,0.78))] px-5 py-6 shadow-[0_14px_28px_-26px_rgba(82,69,53,0.24)] sm:px-7 sm:py-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.34),transparent_34%),radial-gradient(circle_at_86%_76%,rgba(231,214,181,0.16),transparent_28%)]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function DisabledCta({ label }: { label: string }) {
  return (
    <span
      aria-disabled="true"
      className="mt-4 inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-full border border-[#c7ab73]/70 bg-[linear-gradient(160deg,rgba(255,252,246,0.9),rgba(245,236,219,0.85))] px-6 py-2.5 text-sm font-medium tracking-[0.02em] text-[#8a7a5b] opacity-80 shadow-[0_10px_22px_-18px_rgba(82,69,53,0.3)]"
    >
      {label} →
    </span>
  );
}

export default function VoicePage() {
  return (
    <PageShell maxWidth="content" backHref="/" backLabel="← トップへ戻る" showBottomHomeButton={false}>
      <div className="flex flex-col gap-6">
        {/* PRラベル + タイトル */}
        <header className="text-center">
          <p className="text-[10px] tracking-[0.32em] text-[#8d806e] uppercase">[ PR ]</p>
          <h1 className="mt-3 text-2xl font-medium tracking-[0.04em] text-[#2e2a26] sm:text-3xl">
            ルミナが信頼する電話鑑定
          </h1>
        </header>

        {/* アイキャッチ画像 */}
        <div className="relative overflow-hidden rounded-[1.6rem] border border-[#ebe1cf]/85 shadow-[0_14px_28px_-26px_rgba(82,69,53,0.24)]">
          <Image
            src="/gazou/denwakantei.png"
            alt="ルミナが信頼する電話鑑定"
            width={1200}
            height={675}
            priority
            className="block h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,246,0)_55%,rgba(255,252,246,0.18))]" />
        </div>

        {/* プロローグ */}
        <SectionCard>
          <h2 className="text-center text-base font-medium tracking-[0.08em] text-[#5d513f] sm:text-lg">
            ✦ プロローグ ✦
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#544c42] sm:text-base">
            <p>ご縁あってこのページを開いてくださり、ありがとうございます。</p>
            <p>白の魔女ルミナと申します。</p>
            <p>このページでお伝えしたいのは、私の言葉ではなく、声で誰かに話したい——そう感じる夜のための場所です。</p>
            <p>
              私のもとには、文字ではどうしても言葉にならないご相談が届くことがあります。声でしか伝えられないこと、誰かに聴いてもらうだけで楽になる夜、占い師の声を直接聴きたいという願い。私はタロットとハーブを携えて、文字でお応えする魔女ですから、そういう時間にはご一緒できません。
            </p>
            <p>
              けれど、声を必要とされる方を、行き場のないまま夜に置いていきたくない——そう思って、このページをご用意しました。
            </p>
            <p>ここでご紹介するのは、私が信頼できると判断した、3つの電話鑑定の場所です。</p>
          </div>
          <p className="mt-6 rounded-2xl border border-[#e1d5bf]/70 bg-white/55 px-4 py-3 text-[12px] leading-6 text-[#7a7063] sm:text-[13px]">
            ※ このページでご紹介する電話鑑定は、提携先によるアフィリエイト広告（PR）です。
            <br />
            ルミナが信頼できると判断した場所のみをご案内しています。
          </p>
        </SectionCard>

        {/* どの相談方法か */}
        <SectionCard>
          <h2 className="text-center text-base font-medium tracking-[0.08em] text-[#5d513f] sm:text-lg">
            ✦ あなたに合うのは、どの相談方法でしょうか ✦
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-[#544c42] sm:text-base">
            電話鑑定をご検討くださる前に、一度、あなたのご相談がどのタイプかを確かめてみてくださいね。
          </p>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-[#e1d5bf]/70 bg-white/60 px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="text-[15px] font-medium text-[#3f372d] sm:text-base">じっくり考えながら言葉にしたい方へ</h3>
              <p className="mt-2 text-[14px] leading-7 text-[#544c42] sm:text-[15px]">
                ご自身のペースで、文字でお伝えしたい方には、ルミナの個人鑑定書がございます。タロット、ルノルマン、数秘術を組み合わせた17〜19ページの鑑定書を、お手元にお届けします。
              </p>
              <Link
                href="/consultation"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.02em] text-[#9a8455] underline-offset-4 hover:text-[#7e6a44] hover:underline"
              >
                👉 ルミナの個人鑑定書
              </Link>
            </div>

            <div className="rounded-2xl border border-[#e1d5bf]/70 bg-white/60 px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="text-[15px] font-medium text-[#3f372d] sm:text-base">気軽に1問だけ聴いてみたい方へ</h3>
              <p className="mt-2 text-[14px] leading-7 text-[#544c42] sm:text-[15px]">
                ふと気になることがある夜には、ルミナの公式サイトでいつでも引ける無料のタロット占いをどうぞ。
              </p>
              <Link
                href="/"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.02em] text-[#9a8455] underline-offset-4 hover:text-[#7e6a44] hover:underline"
              >
                👉 ルミナの公式サイト
              </Link>
            </div>

            <div className="rounded-2xl border border-[#d6c39d]/85 bg-[linear-gradient(160deg,rgba(255,252,246,0.7),rgba(245,236,219,0.62))] px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="text-[15px] font-medium text-[#3f372d] sm:text-base">今夜すぐ、声で誰かに話したい方へ</h3>
              <p className="mt-2 text-[14px] leading-7 text-[#544c42] sm:text-[15px]">
                それが、このページの先にある場所です。
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 3つの場所の導入 */}
        <SectionCard>
          <h2 className="text-center text-base font-medium tracking-[0.08em] text-[#5d513f] sm:text-lg">
            ✦ ルミナが選んだ3つの場所 ✦
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-[#544c42] sm:text-base">
            3つの場所をご紹介します。それぞれに役割があり、あなたのご相談の質によって合う場所が変わります。
          </p>
        </SectionCard>

        {/* 各社カード */}
        {PROVIDERS.map((provider) => (
          <SectionCard key={provider.number}>
            <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center">
              <h2 className="text-base font-medium tracking-[0.08em] text-[#5d513f] sm:text-lg">
                ✦ {provider.number}. {provider.name}
              </h2>
              <span className="text-[10px] tracking-[0.24em] text-[#8d806e] uppercase">[ PR ]</span>
              <h2 className="text-base font-medium tracking-[0.08em] text-[#5d513f] sm:text-lg">
                ── {provider.eyebrow} ✦
              </h2>
            </div>

            <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#544c42] sm:text-base">
              {provider.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-5 border-l-2 border-[#c7ab73]/70 bg-white/45 px-4 py-3 text-[14px] italic leading-7 text-[#5d513f] sm:text-[15px]">
              {provider.pull}
            </p>

            <div className="mt-4 text-center">
              {provider.affiliate ? (
                <>
                  <a
                    href={provider.affiliate.href}
                    rel="nofollow sponsored noopener"
                    target="_blank"
                    className="inline-block max-w-full rounded-md border border-[#e1d5bf]/70 bg-white/60 p-1.5 shadow-[0_10px_22px_-18px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:border-[#d2bd96] hover:bg-white/80"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={provider.affiliate.imgSrc}
                      width={provider.affiliate.width}
                      height={provider.affiliate.height}
                      alt={provider.affiliate.imgAlt}
                      className="block h-auto max-w-full"
                    />
                  </a>
                  {provider.affiliate.pixelSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={provider.affiliate.pixelSrc} width={1} height={1} alt="" aria-hidden="true" className="hidden" />
                  ) : null}
                </>
              ) : (
                <DisabledCta label={`👉 ${provider.ctaLabel}`} />
              )}
            </div>
          </SectionCard>
        ))}

        {/* 選定基準 */}
        <SectionCard>
          <h2 className="text-center text-base font-medium tracking-[0.08em] text-[#5d513f] sm:text-lg">
            ✦ ルミナが3つを選ぶときに、大切にしたこと ✦
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#544c42] sm:text-base">
            <p>
              正直に申し上げますと、電話占いの世界には、ルミナの世界観とは合わないと感じる場所も少なくありません。煽るような広告、不安を強める言葉、過剰な料金体系——そうしたものを避けて、私が3つを選ぶときに、大切にした基準があります。
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-[#e1d5bf]/70 bg-white/60 px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="text-[15px] font-medium text-[#3f372d] sm:text-base">ひとつ —— 老舗であること。</h3>
              <p className="mt-2 text-[14px] leading-7 text-[#544c42] sm:text-[15px]">
                長く続いている運営は、それだけで占い師の方々と利用者の方々の信頼の積み重ねです。新興のサービスを否定するわけではありませんが、夜中の不安の中で初めて電話する場所としては、安定した運営の信頼が何よりも大切です。
              </p>
            </div>

            <div className="rounded-2xl border border-[#e1d5bf]/70 bg-white/60 px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="text-[15px] font-medium text-[#3f372d] sm:text-base">ふたつ —— 料金体系が明朗であること。</h3>
              <p className="mt-2 text-[14px] leading-7 text-[#544c42] sm:text-[15px]">
                「分単位の料金がわかりやすい」「初回特典の条件がはっきりしている」「不当に長く話すことを促さない」——電話占いは時間で課金されるからこそ、料金の透明性が利用者の方の安心に直結します。
              </p>
            </div>

            <div className="rounded-2xl border border-[#e1d5bf]/70 bg-white/60 px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="text-[15px] font-medium text-[#3f372d] sm:text-base">みっつ —— 占い師の方の質が高いこと。</h3>
              <p className="mt-2 text-[14px] leading-7 text-[#544c42] sm:text-[15px]">
                登録基準・選考基準が明確で、利用者のレビューが安定して高い場所のみを選びました。電話占いは、占い師の方との出会いそのものがすべて。質の低い方に当たって辛い思いをされる場所は、選びませんでした。
              </p>
            </div>
          </div>

          <p className="mt-5 text-[15px] leading-8 text-[#544c42] sm:text-base">
            3つの場所は、それぞれに性質が違います。けれど、この3つの基準はすべて満たしています。
          </p>
        </SectionCard>

        {/* 最後のメッセージ */}
        <SectionCard>
          <h2 className="text-center text-base font-medium tracking-[0.08em] text-[#5d513f] sm:text-lg">
            ✦ 最後のメッセージ ✦
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#544c42] sm:text-base">
            <p>電話で誰かに話したいと感じる夜は、それだけ気持ちが切実な夜です。</p>
            <p>
              ご紹介した3つの場所のうち、どこを選ばれても構いません。あるいは、最初は試しに小さく、慣れてきたら本格的に、と段階を踏んで使い分けていただいても良いと思います。私が大切にしているのは、あなたが行き場のないまま夜を過ごさないこと。それだけです。
            </p>
            <p>
              声で話して、すこしでも気持ちが軽くなったら——そのあとで、よろしければまた、ルミナのもとへ戻ってきてくださいね。文字でじっくり整理する時間が必要になったときに、私の鑑定書がお役に立てる日が来るかもしれません。
            </p>
            <p>ハクの白い羽根とラベンダーの香りが、今夜のあなたを、深く眠りへと運んでくれますように。</p>
          </div>
          <p className="mt-6 text-right text-[14px] tracking-[0.04em] text-[#5d513f] sm:text-[15px]">
            —— 白の魔女ルミナ
          </p>
        </SectionCard>

        {/* トップへ戻る */}
        <div className="pt-2 pb-1 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#c6b497]/70 bg-[linear-gradient(160deg,rgba(255,252,246,0.96),rgba(247,239,226,0.92))] px-6 py-2.5 text-[13px] font-medium tracking-[0.02em] text-[#675b4a] shadow-[0_10px_22px_-18px_rgba(82,69,53,0.35)] transition hover:border-[#bca883]/85 hover:bg-[#faf3e7]"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
