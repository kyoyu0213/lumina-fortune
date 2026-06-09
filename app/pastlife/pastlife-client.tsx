"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  pastLifeQuestions,
  computePastLifeResult,
  PLACEHOLDER_IMAGE,
  type PastLifeResult,
} from "@/lib/pastlife/pastlife";
import { ShopBanner } from "@/components/shop-banner";
import { DiagnosisBanners } from "@/components/diagnosis-banners";

type Phase = "intro" | "quiz" | "result";

export default function PastLifeClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [storyOpen, setStoryOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const result: PastLifeResult | null = useMemo(() => {
    if (phase !== "result" || answers.length !== pastLifeQuestions.length) return null;
    return computePastLifeResult(answers);
  }, [phase, answers]);

  const handleStart = () => {
    setAnswers([]);
    setCurrent(0);
    setStoryOpen(false);
    setPhase("quiz");
  };

  // 診断TOPをシェア（スマホはOSのシェアシート、PCはX投稿へフォールバック）
  const handleShareIntro = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/pastlife` : "/pastlife";
    const text = "あなたの魂は、どんな人生を歩んできたのか。前世診断であなたの過去世の物語を見てみよう🌙";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "前世診断", text, url });
      } catch {
        /* ユーザーがキャンセルした場合などは何もしない */
      }
      return;
    }
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${text}\n#前世診断 #ルミナ`,
    )}&url=${encodeURIComponent(url)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  const handleAnswer = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    if (nextAnswers.length >= pastLifeQuestions.length) {
      setAnswers(nextAnswers);
      setStoryOpen(false);
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
    setStoryOpen(false);
    setPhase("intro");
  };

  const handleShare = () => {
    if (!result) return;
    const shareUrl =
      typeof window !== "undefined" ? `${window.location.origin}/pastlife` : "/pastlife";
    const shareText = [
      `私の前世は「${result.name}」でした🌙`,
      "",
      result.subtitle,
      "",
      "あなたの魂は、どんな人生を歩んできた？ #前世診断 #ルミナ",
    ].join("\n");
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
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
        backgroundColor: "#171233",
      });
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `pastlife-${result.id}.png`;
      anchor.click();
      setDownloadStatus("画像を保存しました。");
    } catch {
      setDownloadStatus("画像の生成に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="pastlife relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      {/* 前世診断 — 星夜のテーマ背景 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#171233_0%,#241a4d_46%,#120e2c_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(203,182,255,0.30),transparent_44%),radial-gradient(circle_at_82%_22%,rgba(255,225,170,0.18),transparent_46%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(10,8,24,0.6))]" />
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-[#c9bdf0] underline-offset-4 transition hover:text-white hover:underline"
          >
            ← トップへ戻る
          </Link>
          <span className="text-[11px] tracking-[0.28em] text-[#a99cd6] uppercase">
            Past Life
          </span>
        </div>

        {phase === "intro" ? (
          <section className="rounded-[2rem] border border-white/15 bg-white/5 p-5 shadow-[0_24px_48px_-30px_rgba(0,0,0,0.7)] backdrop-blur-[2px] sm:p-7">
            {/* メインビジュアル */}
            <button
              type="button"
              onClick={handleStart}
              aria-label="診断をはじめる"
              className="relative block w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/15 shadow-[0_16px_34px_-24px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9bdf0]/70"
            >
              <IntroHero />
            </button>

            <div className="mt-6 text-center">
              <p className="text-[11px] tracking-[0.3em] text-[#b3a6e0] uppercase">Past Life</p>
              <h1 className="mt-2 font-[var(--font-playfair-display)] text-3xl tracking-[0.06em] text-[#f4ecd2] sm:text-4xl">
                前世診断
              </h1>
              <p className="mt-3 text-sm leading-7 text-[#d6cdf2] sm:text-base">
                あなたの魂は、
                <br />
                どんな人生を歩んできたのか。
              </p>

              <div className="mx-auto mt-5 max-w-md rounded-2xl border border-white/12 bg-white/5 px-5 py-4">
                <p className="text-sm leading-7 text-[#cfc6ec]">
                  16の質問から、あなたの魂が
                  <br />
                  かつて歩んだ前世の物語を読み解きます。
                </p>
                <p className="mt-3 text-sm leading-7 text-[#cfc6ec]">
                  あなたは悲劇の王女？
                  <br />
                  それとも星を巡ってきた旅人？
                </p>
                <p className="mt-3 text-sm leading-7 text-[#cfc6ec]">さっそく診断してみましょう。</p>
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b7a6ef]/60 bg-[linear-gradient(135deg,#8d76e0,#5b4aa8)] px-9 text-sm font-medium tracking-[0.08em] text-white shadow-[0_16px_30px_-16px_rgba(80,60,160,0.9)] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                診断をはじめる
              </button>
              <button
                type="button"
                onClick={handleShareIntro}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-[13px] font-medium tracking-[0.06em] text-[#e7e0fa] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:bg-white/15"
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
                友達にこの診断をシェア
              </button>
            </div>
          </section>
        ) : null}

        {phase === "quiz" ? (
          <section className="rounded-[2rem] border border-white/15 bg-white/5 p-5 shadow-[0_24px_48px_-30px_rgba(0,0,0,0.7)] backdrop-blur-[2px] sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-[0.16em] text-[#b3a6e0]">
                QUESTION {current + 1} / {pastLifeQuestions.length}
              </span>
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-[#c9bdf0] underline-offset-4 transition hover:text-white hover:underline"
              >
                ← 戻る
              </button>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#c9bdf0,#8d76e0)] transition-all duration-300"
                style={{ width: `${(current / pastLifeQuestions.length) * 100}%` }}
              />
            </div>

            <h2 className="mt-6 text-lg font-medium leading-relaxed text-[#f4ecd2] sm:text-xl">
              {pastLifeQuestions[current].text}
            </h2>

            <div className="mt-5 space-y-3">
              {pastLifeQuestions[current].options.map((option, optionIndex) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(optionIndex)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-5 py-4 text-left text-[15px] leading-relaxed text-[#e7e0fa] shadow-[0_12px_24px_-22px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:border-[#c9bdf0]/60 hover:bg-white/10"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-[#f4ecd2] transition group-hover:bg-white/20"
                  >
                    ✦
                  </span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {phase === "result" && result ? (
          <section className="space-y-4">
            <div ref={resultCardRef} className="space-y-4">
              {/* ① 結果画像 ② タイトル ③ サブタイトル ④ 概要 */}
              <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-[0_24px_48px_-30px_rgba(0,0,0,0.7)] backdrop-blur-[2px]">
                <div className="relative">
                  <PastLifeImage src={result.image} alt={`${result.name}のイラスト`} />
                  {result.secret ? (
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/30 bg-[#2a1f55]/85 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-[#f4ecd2]">
                      SECRET
                    </span>
                  ) : null}
                </div>

                <div className="p-5 text-center sm:p-7">
                  <p className="text-[11px] tracking-[0.3em] text-[#b3a6e0] uppercase">
                    Your Past Life
                  </p>
                  <h1 className="mt-2 text-3xl font-medium tracking-[0.06em] text-[#f4ecd2] sm:text-4xl">
                    【{result.name}】
                  </h1>
                  <p className="mt-3 text-sm leading-7 text-[#cfb6f0]">{result.subtitle}</p>
                  <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-[#e7e0fa]">
                    {result.overview}
                  </p>
                </div>
              </div>

              {/* ⑤ 今世に残る特徴 ⑥ 魂の課題 ⑦ ルミナからの一言 */}
              <ResultBlock title="今世に残る特徴" emoji="🌿" text={result.traits} />
              <ResultBlock title="魂の課題" emoji="🔮" text={result.soulTask} />

              <div className="rounded-[1.6rem] border-l-4 border-[#b7a6ef] bg-white/5 p-5 shadow-[0_16px_30px_-28px_rgba(0,0,0,0.6)] backdrop-blur-[2px]">
                <h3 className="flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-[#f4ecd2]">
                  <span aria-hidden>🌙</span>
                  ルミナからの一言
                </h3>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#e7e0fa]">
                  {result.luminaWord}
                </p>
              </div>
            </div>

            {/* ⑧ 前世の物語を読む（アコーディオン） */}
            <div className="rounded-[1.6rem] border border-white/12 bg-white/5 p-3 shadow-[0_16px_30px_-28px_rgba(0,0,0,0.6)] backdrop-blur-[2px]">
              <button
                type="button"
                onClick={() => setStoryOpen((open) => !open)}
                aria-expanded={storyOpen}
                className="flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-white/5"
              >
                <span className="flex items-center gap-2 text-[15px] font-medium text-[#f4ecd2]">
                  <span aria-hidden>📖</span>
                  前世の物語を読む
                </span>
                <span
                  aria-hidden
                  className={`text-[#c9bdf0] transition-transform duration-300 ${
                    storyOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {storyOpen ? (
                <div className="mt-2 space-y-2">
                  {result.chapters.map((chapter) => (
                    <StoryChapter key={chapter.title} title={chapter.title} text={chapter.body} />
                  ))}
                </div>
              ) : null}
            </div>

            {/* ⑨ SNSシェア ⑩ 再診断 */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-[#0e0b20] px-7 text-sm font-medium tracking-[0.06em] text-white shadow-[0_16px_30px_-16px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5 hover:brightness-125"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Xでシェアする
              </button>
              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b7a6ef]/60 bg-[linear-gradient(135deg,#8d76e0,#5b4aa8)] px-7 text-sm font-medium tracking-[0.06em] text-white shadow-[0_16px_30px_-16px_rgba(80,60,160,0.9)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDownloading ? "画像を生成中…" : "画像を保存する"}
              </button>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-medium tracking-[0.06em] text-[#e7e0fa] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                もう一度診断する
              </button>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-medium tracking-[0.06em] text-[#e7e0fa] shadow-[0_10px_22px_-18px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                トップへ戻る
              </Link>
            </div>
            {downloadStatus ? (
              <p className="text-center text-sm text-[#cfc6ec]">{downloadStatus}</p>
            ) : null}
          </section>
        ) : null}

        <DiagnosisBanners page="/pastlife" className="mt-8" />

        <ShopBanner page="/pastlife" className="mt-4 px-0" />
      </div>
    </main>
  );
}

/** 結果画像。実画像が無い場合はプレースホルダーにフォールバックする。 */
function PastLifeImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  return (
    <Image
      src={errored ? PLACEHOLDER_IMAGE : src}
      alt={alt}
      width={1024}
      height={1024}
      className="h-auto w-full object-cover"
      onError={() => setErrored(true)}
      priority
      unoptimized={errored}
    />
  );
}

/**
 * イントロのメインビジュアル。
 * /public/images/pastlife/top.png を置くと自動で表示される。
 * 未配置の場合は星空のプレースホルダーにフォールバックする。
 */
function IntroHero() {
  const [errored, setErrored] = useState(false);
  return (
    <Image
      src={errored ? PLACEHOLDER_IMAGE : "/images/pastlife/top.png"}
      alt="前世診断 — あなたの魂はどんな人生を歩んできたのか"
      width={1024}
      height={1024}
      className="h-auto w-full object-cover"
      onError={() => setErrored(true)}
      priority
      unoptimized={errored}
    />
  );
}

function ResultBlock({ title, emoji, text }: { title: string; emoji: string; text: string }) {
  return (
    <div className="rounded-[1.6rem] border border-white/12 bg-white/5 p-5 shadow-[0_16px_30px_-28px_rgba(0,0,0,0.6)] backdrop-blur-[2px]">
      <h3 className="flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-[#f4ecd2]">
        <span aria-hidden>{emoji}</span>
        {title}
      </h3>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#e7e0fa]">{text}</p>
    </div>
  );
}

/** 前世の物語の各章（個別アコーディオン）。本文は空行（\n\n）ごとに段落分けして表示する。 */
function StoryChapter({ title, text }: { title: string; text: string }) {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <details className="group rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-[#f4ecd2]">
        {title}
        <span
          aria-hidden
          className="text-[#c9bdf0] transition-transform duration-300 group-open:rotate-180"
        >
          ▼
        </span>
      </summary>
      <div className="mt-3 space-y-3.5 text-[14px] leading-8 text-[#d6cdf2]">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </details>
  );
}
