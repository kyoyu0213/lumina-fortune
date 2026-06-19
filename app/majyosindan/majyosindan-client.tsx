"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";
import { ShopBanner } from "@/components/shop-banner";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/useLanguage";
import {
  witchQuestions,
  computeMBTI,
  getWitchResult,
  type WitchResult,
} from "@/lib/majyosindan/witch";
import { majyosindanUI, questionTexts, localizeResult } from "./translations";

type Pole = (typeof witchQuestions)[number]["options"][number]["pole"];

type Phase = "intro" | "quiz" | "result";

export default function MajyosindanClient() {
  const { lang, setLang } = useLanguage();
  const t = majyosindanUI[lang];

  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Pole[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const result: WitchResult | null = useMemo(() => {
    if (phase !== "result" || answers.length !== witchQuestions.length) return null;
    return getWitchResult(computeMBTI(answers));
  }, [phase, answers]);

  // 日本語の結果に、選択言語のオーバーライドを合成（未訳は ja フォールバック）
  const localizedResult = useMemo(
    () => (result ? localizeResult(result, lang) : null),
    [result, lang],
  );

  const currentQuestionText = questionTexts[lang][witchQuestions[current].id];

  const handleStart = () => {
    setAnswers([]);
    setCurrent(0);
    setPhase("quiz");
  };

  // 診断TOPをシェア（スマホはOSのシェアシート、PCはX投稿へフォールバック）
  const handleShareIntro = async () => {
    const url =
      typeof window !== "undefined" ? `${window.location.origin}/majyosindan` : "/majyosindan";
    const text = t.shareIntroText;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: t.pageTitle, text, url });
      } catch {
        /* ユーザーがキャンセルした場合などは何もしない */
      }
      return;
    }
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(url)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  const handleAnswer = (pole: Pole) => {
    const nextAnswers = [...answers, pole];
    if (nextAnswers.length >= witchQuestions.length) {
      setAnswers(nextAnswers);
      setPhase("result");
      return;
    }
    setAnswers(nextAnswers);
    setCurrent((index) => index + 1);
  };

  const handleBack = () => {
    if (current === 0) {
      setPhase("intro");
      return;
    }
    setAnswers((prev) => prev.slice(0, -1));
    setCurrent((index) => index - 1);
  };

  const handleRetry = () => {
    setAnswers([]);
    setCurrent(0);
    setPhase("intro");
  };

  const handleDownloadImage = async () => {
    if (!result || !resultCardRef.current) return;
    setIsDownloading(true);
    setDownloadStatus(null);
    try {
      const htmlToImage = await import("html-to-image");
      const dataUrl = await htmlToImage.toPng(resultCardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#f8f3e8",
      });
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `lumina-majyosindan-${result.mbti}.png`;
      anchor.click();
      setDownloadStatus(t.imageSaved);
    } catch {
      setDownloadStatus(t.imageFailed);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (!localizedResult) return;
    const shareUrl =
      typeof window !== "undefined" ? `${window.location.origin}/majyosindan` : "/majyosindan";
    const shareText = t.shareResultText(
      localizedResult.name,
      localizedResult.mbti,
      localizedResult.catchCopy,
    );
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <PageShell
      maxWidth="narrow"
      title={t.pageTitle}
      description={t.pageDescription}
      backHref="/"
      backLabel={t.backLabel}
      bottomButtonLabel={t.bottomButtonLabel}
    >
      <LanguageSwitcher lang={lang} onChange={setLang} className="mb-5" />

      {phase === "intro" ? (
        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 w-full overflow-hidden rounded-2xl border border-[#e1d5bf]/74 shadow-[0_14px_30px_-24px_rgba(82,69,53,0.24)]">
              <Image
                src="/majyosindan/Top.png"
                alt={t.pageTitle}
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <p className="text-[11px] tracking-[0.24em] text-[#8d7f69] uppercase">{t.introEyebrow}</p>
            <h2 className="mt-2 text-xl font-medium tracking-[0.04em] text-[#2f2a25] sm:text-2xl">
              {t.introHeading}
            </h2>
            <p className="mt-4 max-w-md whitespace-pre-line text-sm leading-7 text-[#5d5346]">
              {t.introLead(witchQuestions.length)}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <LuminaButton type="button" tone="primary" onClick={handleStart}>
              {t.startButton}
            </LuminaButton>
            <button
              type="button"
              onClick={handleShareIntro}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#d6c39d]/85 bg-white/70 px-6 text-[13px] font-medium tracking-[0.06em] text-[#6b6053] shadow-[0_10px_22px_-18px_rgba(82,69,53,0.24)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
                <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
              </svg>
              {t.shareIntroButton}
            </button>
          </div>
        </GlassCard>
      ) : null}

      {phase === "quiz" ? (
        <GlassCard>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.16em] text-[#847967]">
              {t.questionLabel(current + 1, witchQuestions.length)}
            </span>
            <button
              type="button"
              onClick={handleBack}
              className="lumina-link text-sm underline-offset-4 hover:underline"
            >
              {t.backButton}
            </button>
          </div>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#e8ddc8]/70">
            <div
              className="h-full rounded-full bg-[#c1a062] transition-all duration-300"
              style={{ width: `${(current / witchQuestions.length) * 100}%` }}
            />
          </div>

          <h2 className="mt-6 text-lg font-medium leading-relaxed text-[#2e2a26] sm:text-xl">
            {currentQuestionText.text}
          </h2>

          <div className="mt-5 space-y-3">
            {witchQuestions[current].options.map((option, idx) => (
              <button
                key={option.pole + option.label}
                type="button"
                onClick={() => handleAnswer(option.pole)}
                className="group flex w-full items-center gap-3 rounded-2xl border border-[#e1d5bf]/80 bg-white/65 px-5 py-4 text-left text-[15px] leading-relaxed text-[#544c42] shadow-[0_10px_22px_-22px_rgba(82,69,53,0.24)] transition hover:-translate-y-0.5 hover:border-[#d2bd96] hover:bg-white/85"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d2c4e7] bg-[#f5f0ff] text-xs text-[#75658f]"
                >
                  ✦
                </span>
                <span>{currentQuestionText.options[idx]}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      ) : null}

      {phase === "result" && localizedResult ? (
        <section className="space-y-4">
          <div ref={resultCardRef}>
          <GlassCard>
            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] tracking-[0.24em] text-[#8d7f69] uppercase">
                {t.resultEyebrow}
              </p>
              <h2 className="mt-2 text-3xl font-medium tracking-[0.06em] text-[#2e2a26] sm:text-4xl">
                {localizedResult.name}
              </h2>
              <span className="mt-3 inline-flex items-center rounded-full border border-[#d2c4e7] bg-white/70 px-3 py-1 text-xs font-medium tracking-[0.18em] text-[#75658f]">
                {localizedResult.mbti}
              </span>
              <p className="mt-3 text-sm leading-7 text-[#6b6053]">{localizedResult.catchCopy}</p>

              <div className="mt-5 w-full overflow-hidden rounded-2xl border border-[#e1d5bf]/74 shadow-[0_14px_30px_-24px_rgba(82,69,53,0.24)]">
                <Image
                  src={localizedResult.image}
                  alt={localizedResult.name}
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
          </GlassCard>
          </div>

          {localizedResult.detail ? (
            <>
              <GlassCard>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                  {localizedResult.detail.body}
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">
                  {t.loveHeading(localizedResult.name)}
                </h3>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                  {localizedResult.detail.love}
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">
                  {t.compatHeading}
                </h3>
                <div className="mt-4 space-y-3">
                  {localizedResult.detail.compatibility.map((item) => (
                    <div
                      key={item.mbti}
                      className="rounded-xl border border-[#e1d5bf]/72 bg-white/70 p-4"
                    >
                      <p className="flex items-center gap-2 text-[15px] font-medium text-[#2e2a26]">
                        <span aria-hidden="true">{item.medal}</span>
                        <span>
                          {item.name}
                          <span className="ml-1 text-xs font-normal tracking-[0.12em] text-[#847967]">
                            （{item.mbti}）
                          </span>
                        </span>
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#544c42]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">
                  {t.rivalHeading}
                </h3>
                <div className="mt-4 rounded-xl border border-[#d2c4e7]/70 bg-[#f5f0ff]/55 p-4">
                  <p className="flex items-center gap-2 text-[15px] font-medium text-[#2e2a26]">
                    <span aria-hidden="true">{localizedResult.detail.rival.emoji}</span>
                    <span>
                      {localizedResult.detail.rival.name}
                      <span className="ml-1 text-xs font-normal tracking-[0.12em] text-[#847967]">
                        （{localizedResult.detail.rival.mbti}）
                      </span>
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#544c42]">
                    {localizedResult.detail.rival.text}
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">
                  {t.messageHeading(localizedResult.name)}
                </h3>
                <blockquote className="mt-3 rounded-xl border-l-4 border-[#c4b8da] bg-[#f5f0ff]/55 p-4">
                  <p className="whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                    {localizedResult.detail.message}
                  </p>
                </blockquote>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">{t.keywordsHeading}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {localizedResult.detail.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center rounded-full border border-[#d2c4e7] bg-white/70 px-3 py-1 text-xs font-medium tracking-[0.04em] text-[#75658f]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </>
          ) : (
            <GlassCard>
              <h3 className="text-sm font-medium tracking-wide text-[#2e2a26]">{t.fallbackHeading}</h3>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                {localizedResult.description}
              </p>
            </GlassCard>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LuminaButton type="button" tone="primary" onClick={handleShare}>
              {t.shareButton}
            </LuminaButton>
            <LuminaButton
              type="button"
              tone="secondary"
              onClick={handleDownloadImage}
              disabled={isDownloading}
            >
              {isDownloading ? t.savingImage : t.saveImageButton}
            </LuminaButton>
            <LuminaButton type="button" tone="secondary" onClick={handleRetry}>
              {t.retryButton}
            </LuminaButton>
          </div>
          {downloadStatus ? (
            <p className="text-center text-sm text-[#6b6053]">{downloadStatus}</p>
          ) : null}
        </section>
      ) : null}

      <section className="relative mx-auto mt-8 w-full max-w-2xl">
        <Link
          href="/manga"
          aria-label={t.mangaTitle}
          className="group flex items-center gap-4 overflow-hidden rounded-[1.6rem] border border-[#e6dac7]/85 bg-[linear-gradient(160deg,rgba(255,252,246,0.92),rgba(248,242,231,0.84))] p-3 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-95"
        >
          <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#e6dac8]/80 bg-[#fdfaf3]">
            <Image
              src="/majyosindan/manga/ocyakai.png"
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] tracking-[0.22em] text-[#a08f6a] uppercase">{t.mangaEyebrow}</span>
            <span className="mt-1 block text-base font-medium text-[#2e2a26]">{t.mangaTitle}</span>
            <span className="mt-1 block text-sm leading-6 text-[#6b6053]">
              {t.mangaDescription}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 pr-1 text-lg text-[#a08f6a] transition group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </section>

      <section className="relative mx-auto mt-4 w-full max-w-2xl">
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
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </Link>
      </section>

      <section className="relative mx-auto mt-4 w-full max-w-2xl">
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
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </Link>
      </section>

      <section className="relative mx-auto mt-4 w-full max-w-2xl">
        <Link
          href="/aura"
          aria-label="オーラカラー診断"
          className="group block overflow-hidden rounded-[1.6rem] border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
        >
          <Image
            src="/gazou/aura/banner.png"
            alt="オーラカラー診断"
            width={2544}
            height={416}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 1100px"
          />
        </Link>
      </section>

      <ShopBanner page="/majyosindan" className="mt-4" />
    </PageShell>
  );
}
