"use client";

import Image from "next/image";
import Link from "next/link";
import type { AuraColor } from "@/lib/aura/aura";
import { AuraBackground } from "@/components/aura/aura-background";
import { ShopBanner } from "@/components/shop-banner";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { auraResultUI, localizeAuraResult } from "../translations";

/**
 * オーラカラー診断の結果表示（クライアント）。
 * 言語切替はここで行う（page.tsx はサーバーで type 解決のみ）。
 * 結果本文は ja を正とし、未訳は ja フォールバック（localizeAuraResult）。
 */
export default function AuraResultClient({ result }: { result: AuraColor | null }) {
  const { lang, setLang } = useLanguage();
  const t = auraResultUI[lang];
  const localized = result ? localizeAuraResult(result, lang) : null;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <AuraBackground />

      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-[#8a7c5a] underline-offset-4 transition hover:text-[#6f6242] hover:underline"
          >
            {t.backTop}
          </Link>
          <span className="text-[11px] tracking-[0.28em] text-[#a99a76] uppercase">Aura Color</span>
        </div>

        <LanguageSwitcher lang={lang} onChange={setLang} className="mb-5" />

        {localized ? (
          <section className="space-y-4">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_24px_48px_-30px_rgba(120,104,66,0.45)] backdrop-blur-[2px]">
              {/* 画像枠：result.image が設定されたらイラストを表示。未設定でも崩れないようプレースホルダーを表示。 */}
              <div className="relative aspect-square w-full bg-[linear-gradient(135deg,#fdf7e9,#f4ecdb)]">
                {localized.image ? (
                  <Image
                    src={localized.image}
                    alt={localized.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                    <span aria-hidden className="text-4xl">✦</span>
                    <p className="text-sm tracking-[0.12em] text-[#b6a880]">{t.illustrationPending}</p>
                  </div>
                )}
                {localized.secret ? (
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/70 bg-[#5a4d33]/85 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-white">
                    SECRET
                  </span>
                ) : null}
              </div>

              <div className="p-6 text-center sm:p-8">
                <p className="text-[11px] tracking-[0.3em] text-[#b6a880] uppercase">{t.resultEyebrow}</p>
                <h1 className="mt-3 text-2xl font-medium leading-relaxed tracking-[0.04em] text-[#4a4030] sm:text-3xl">
                  {t.resultHeading(localized.name)}
                </h1>
                <p className="mt-4 inline-flex items-center rounded-full border border-[#e3d9bf] bg-white/70 px-4 py-1.5 text-sm tracking-[0.06em] text-[#7a6c4c]">
                  {t.themeLabel(localized.theme)}
                </p>
                {localized.reading ? null : (
                  <p className="mt-6 text-[15px] leading-7 text-[#8a7c5a]">{t.readingPending}</p>
                )}
              </div>
            </div>

            {localized.reading ? (
              <>
                <ReadingBlock title={t.overviewTitle} emoji="✨" text={localized.reading.overview} />
                <ReadingBlock title={t.personalityTitle} emoji="🔮" text={localized.reading.personality} />
                <ReadingBlock title={t.loveTitle} emoji="💕" text={localized.reading.love} />
                <ReadingBlock title={t.workTitle} emoji="🌟" text={localized.reading.work} />
                <div className="rounded-[1.6rem] border-l-4 border-[#d6bd84] bg-white/70 p-5 shadow-[0_16px_30px_-28px_rgba(120,104,66,0.4)] backdrop-blur-[2px] sm:p-6">
                  <h3 className="flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-[#5a4d33]">
                    <span aria-hidden>💌</span>
                    {t.letterTitle}
                  </h3>
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#6b5f48]">
                    {localized.reading.letter}
                  </p>
                </div>
              </>
            ) : null}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link
                href="/aura"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9c79a]/80 bg-[linear-gradient(135deg,#f3e6c4,#d8c089)] px-8 text-sm font-medium tracking-[0.08em] text-[#5a4d33] shadow-[0_16px_30px_-16px_rgba(150,128,80,0.7)] transition hover:-translate-y-0.5 hover:brightness-[1.04]"
              >
                {t.retryButton}
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e0d2a8]/80 bg-white/75 px-8 text-sm font-medium tracking-[0.06em] text-[#6f6242] shadow-[0_10px_22px_-18px_rgba(120,104,66,0.4)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {t.backTopButton}
              </Link>
            </div>

            <div className="space-y-4 pt-4">
              <Link
                href="/majyosindan"
                aria-label="魔女タイプ診断"
                className="group block overflow-hidden rounded-[1.6rem] border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Image
                  src="/majyosindan/majyosindan.png"
                  alt="魔女タイプ診断"
                  width={1774}
                  height={296}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </Link>
              <Link
                href="/bird"
                aria-label="鳥タイプ診断"
                className="group block overflow-hidden rounded-[1.6rem] border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Image
                  src="/gazou/bird/banner.png"
                  alt="鳥タイプ診断"
                  width={2544}
                  height={416}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </Link>
              <Link
                href="/pastlife"
                aria-label="前世診断"
                className="group block overflow-hidden rounded-[1.6rem] border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Image
                  src="/images/pastlife/zensebanner.png"
                  alt="前世診断"
                  width={2544}
                  height={416}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </Link>
              <ShopBanner page="/aura/result" className="px-0" />
            </div>
          </section>
        ) : (
          <section className="rounded-[2rem] border border-white/70 bg-white/70 p-8 text-center shadow-[0_24px_48px_-32px_rgba(120,104,66,0.4)] backdrop-blur-[2px]">
            <h1 className="text-xl font-medium text-[#4a4030]">{t.notFoundTitle}</h1>
            <p className="mt-3 text-sm leading-7 text-[#6f6242]">{t.notFoundBody}</p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/aura"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9c79a]/80 bg-[linear-gradient(135deg,#f3e6c4,#d8c089)] px-8 text-sm font-medium tracking-[0.08em] text-[#5a4d33] shadow-[0_16px_30px_-16px_rgba(150,128,80,0.7)] transition hover:-translate-y-0.5 hover:brightness-[1.04]"
              >
                {t.startButton}
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function ReadingBlock({ title, emoji, text }: { title: string; emoji: string; text: string }) {
  return (
    <div className="rounded-[1.6rem] border border-white/70 bg-white/65 p-5 shadow-[0_16px_30px_-28px_rgba(120,104,66,0.4)] backdrop-blur-[2px] sm:p-6">
      <h3 className="flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-[#5a4d33]">
        <span aria-hidden>{emoji}</span>
        {title}
      </h3>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#6b5f48]">{text}</p>
    </div>
  );
}
