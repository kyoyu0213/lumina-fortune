"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { birdQuestions, computeBirdResult, type BirdType } from "@/lib/bird/bird";
import { ShopBanner } from "@/components/shop-banner";

type Phase = "intro" | "quiz" | "result";

export default function BirdClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);

  const result: BirdType | null = useMemo(() => {
    if (phase !== "result" || answers.length !== birdQuestions.length) return null;
    return computeBirdResult(answers);
  }, [phase, answers]);

  const handleStart = () => {
    setAnswers([]);
    setCurrent(0);
    setPhase("quiz");
  };

  // 診断TOPをシェア（スマホはOSのシェアシート、PCはX投稿へフォールバック）
  const handleShareIntro = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/bird` : "/bird";
    const text = "12羽の鳥たちが教えてくれる、あなたの本当の性格🪶 あなたはどの鳥？【鳥タイプ診断】";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "鳥タイプ診断", text, url });
      } catch {
        /* ユーザーがキャンセルした場合などは何もしない */
      }
      return;
    }
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${text}\n#鳥タイプ診断 #鳥たちの王国`,
    )}&url=${encodeURIComponent(url)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  const handleAnswer = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    if (nextAnswers.length >= birdQuestions.length) {
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

  const handleShare = () => {
    if (!result) return;
    const shareUrl =
      typeof window !== "undefined" ? `${window.location.origin}/bird` : "/bird";
    const shareText = [
      `私の鳥タイプは「${result.name}」でした🪶`,
      "",
      result.catchCopy,
      "",
      "あなたはどの鳥？ #鳥タイプ診断 #鳥たちの王国",
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
        backgroundColor: "#e8f0e4",
      });
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `bird-type-${result.id}.png`;
      anchor.click();
      setDownloadStatus("画像を保存しました。");
    } catch {
      setDownloadStatus("画像の生成に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="bird-kingdom relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      {/* 鳥たちの王国 — テーマ背景 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#dbeaf0_0%,#e8f0e4_42%,#f4ecdc_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.85),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(200,221,210,0.55),transparent_46%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(120,150,120,0.18))]" />
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-[#5a6b58] underline-offset-4 transition hover:text-[#3c5340] hover:underline"
          >
            ← トップへ戻る
          </Link>
          <span className="text-[11px] tracking-[0.28em] text-[#7e8a72] uppercase">
            Bird Kingdom
          </span>
        </div>

        {phase === "intro" ? (
          <section className="rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-[0_24px_48px_-32px_rgba(60,83,64,0.45)] backdrop-blur-[2px] sm:p-7">
            <button
              type="button"
              onClick={handleStart}
              aria-label="診断をはじめる"
              className="block w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_16px_34px_-26px_rgba(60,83,64,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b8161]/70"
            >
              <Image
                src="/gazou/bird/Top.png"
                alt="鳥タイプ診断 — 鳥たちの王国"
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
                priority
              />
            </button>

            <div className="mt-6 text-center">
              <p className="text-[11px] tracking-[0.3em] text-[#8a9a7d] uppercase">Bird Type</p>
              <h1 className="mt-2 font-[var(--font-playfair-display)] text-3xl tracking-[0.06em] text-[#33493a] sm:text-4xl">
                鳥タイプ診断
              </h1>
              <p className="mt-3 text-sm leading-7 text-[#4f6450] sm:text-base">
                12羽の鳥たちが教えてくれる、
                <br />
                あなたの本当の性格
              </p>

              <div className="mx-auto mt-5 max-w-md rounded-2xl border border-white/60 bg-white/45 px-5 py-4">
                <p className="text-sm leading-7 text-[#52614f]">
                  あなたの考え方や行動パターンから、
                  <br />
                  12羽の鳥の中で最も近いタイプを診断します。
                </p>
                <p className="mt-3 text-sm leading-7 text-[#52614f]">
                  あなたは愛されるシマエナガ？
                  <br />
                  それとも知性派のヨウム？
                </p>
                <p className="mt-3 text-sm leading-7 text-[#52614f]">さっそく診断してみましょう。</p>
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#7fa07d]/80 bg-[linear-gradient(135deg,#7fa07d,#5b8161)] px-9 text-sm font-medium tracking-[0.08em] text-white shadow-[0_16px_30px_-16px_rgba(60,83,64,0.7)] transition hover:-translate-y-0.5 hover:brightness-105"
              >
                診断をはじめる
              </button>
              <button
                type="button"
                onClick={handleShareIntro}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#9bb592]/80 bg-white/70 px-6 text-[13px] font-medium tracking-[0.06em] text-[#4f6450] shadow-[0_10px_22px_-18px_rgba(60,83,64,0.4)] transition hover:-translate-y-0.5 hover:bg-white"
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
          <section className="rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-[0_24px_48px_-32px_rgba(60,83,64,0.45)] backdrop-blur-[2px] sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-[0.16em] text-[#6f7f68]">
                QUESTION {current + 1} / {birdQuestions.length}
              </span>
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-[#5a6b58] underline-offset-4 transition hover:text-[#3c5340] hover:underline"
              >
                ← 戻る
              </button>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#d6e3d2]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#9bbf8f,#5b8161)] transition-all duration-300"
                style={{ width: `${(current / birdQuestions.length) * 100}%` }}
              />
            </div>

            <h2 className="mt-6 text-lg font-medium leading-relaxed text-[#33493a] sm:text-xl">
              {birdQuestions[current].text}
            </h2>

            <div className="mt-5 space-y-3">
              {birdQuestions[current].options.map((option, optionIndex) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(optionIndex)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-5 py-4 text-left text-[15px] leading-relaxed text-[#46563f] shadow-[0_12px_24px_-22px_rgba(60,83,64,0.4)] transition hover:-translate-y-0.5 hover:border-[#9bbf8f] hover:bg-white/90"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#bcd6b3] bg-[#eef5ea] text-sm text-[#5b8161] transition group-hover:bg-[#dcebd5]"
                  >
                    🪶
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
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 shadow-[0_24px_48px_-30px_rgba(60,83,64,0.5)] backdrop-blur-[2px]">
              <div className="relative">
                <Image
                  src={result.image}
                  alt={`${result.name}のイラスト`}
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-cover"
                  priority
                />
                {result.secret ? (
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/70 bg-[#3c5340]/85 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-white">
                    SECRET
                  </span>
                ) : null}
              </div>

              <div className="p-5 text-center sm:p-7">
                <p className="text-[11px] tracking-[0.3em] text-[#8a9a7d] uppercase">
                  Your Bird Type
                </p>
                <h1 className="mt-2 text-3xl font-medium tracking-[0.06em] text-[#33493a] sm:text-4xl">
                  【{result.name}】
                </h1>
                <p className="mt-3 text-sm leading-7 text-[#4f6450]">{result.catchCopy}</p>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-[#46563f]">
                  {result.description}
                </p>
              </div>
            </div>

            <ResultBlock title="恋愛傾向" emoji="💕" text={result.love} />
            <ResultBlock title="仕事傾向" emoji="🌿" text={result.work} />
            <ResultBlock title="相性の良い鳥" emoji="🪺" text={result.compatible} />

            <div className="rounded-[1.6rem] border-l-4 border-[#7fa07d] bg-white/65 p-5 shadow-[0_16px_30px_-28px_rgba(60,83,64,0.4)] backdrop-blur-[2px]">
              <h3 className="flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-[#33493a]">
                <span aria-hidden>🕊️</span>
                {result.name}からのメッセージ
              </h3>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#46563f]">
                {result.message}
              </p>
            </div>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#3c5340]/70 bg-[#2f3a33] px-7 text-sm font-medium tracking-[0.06em] text-white shadow-[0_16px_30px_-16px_rgba(47,58,51,0.8)] transition hover:-translate-y-0.5 hover:brightness-110"
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
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#7fa07d]/80 bg-[linear-gradient(135deg,#7fa07d,#5b8161)] px-7 text-sm font-medium tracking-[0.06em] text-white shadow-[0_16px_30px_-16px_rgba(60,83,64,0.7)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDownloading ? "画像を生成中…" : "画像を保存する"}
              </button>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#9bb592]/80 bg-white/70 px-7 text-sm font-medium tracking-[0.06em] text-[#4f6450] shadow-[0_10px_22px_-18px_rgba(60,83,64,0.4)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                もう一度診断する
              </button>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#9bb592]/80 bg-white/70 px-7 text-sm font-medium tracking-[0.06em] text-[#4f6450] shadow-[0_10px_22px_-18px_rgba(60,83,64,0.4)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                トップへ戻る
              </Link>
            </div>
            {downloadStatus ? (
              <p className="text-center text-sm text-[#4f6450]">{downloadStatus}</p>
            ) : null}
          </section>
        ) : null}

        <section className="relative mt-8 w-full">
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
              sizes="(max-width: 768px) 100vw, 1100px"
            />
          </Link>
        </section>

        <section className="relative mt-4 w-full">
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

        <ShopBanner page="/bird" className="mt-4 px-0" />
      </div>
    </main>
  );
}

function ResultBlock({ title, emoji, text }: { title: string; emoji: string; text: string }) {
  return (
    <div className="rounded-[1.6rem] border border-white/70 bg-white/60 p-5 shadow-[0_16px_30px_-28px_rgba(60,83,64,0.4)] backdrop-blur-[2px]">
      <h3 className="flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-[#33493a]">
        <span aria-hidden>{emoji}</span>
        {title}
      </h3>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#46563f]">{text}</p>
    </div>
  );
}
