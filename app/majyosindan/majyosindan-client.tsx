"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";
import {
  witchQuestions,
  computeMBTI,
  getWitchResult,
  type WitchResult,
} from "@/lib/majyosindan/witch";

type Pole = (typeof witchQuestions)[number]["options"][number]["pole"];

type Phase = "intro" | "quiz" | "result";

export default function MajyosindanClient() {
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

  const handleStart = () => {
    setAnswers([]);
    setCurrent(0);
    setPhase("quiz");
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
      setDownloadStatus("画像を保存しました。");
    } catch {
      setDownloadStatus("画像の生成に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (!result) return;
    const shareUrl =
      typeof window !== "undefined" ? `${window.location.origin}/majyosindan` : "/majyosindan";
    const shareText = [
      `私の魔女タイプは「${result.name}」でした。`,
      `（${result.mbti}）`,
      "",
      result.catchCopy,
      "",
      "あなたの魔女タイプは？ #魔女タイプ診断 #LUMINA",
    ].join("\n");
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <PageShell
      maxWidth="narrow"
      title="魔女タイプ診断"
      description="白の魔女ルミナが導く、16の魔女の物語"
      backHref="/"
      backLabel="トップへ戻る"
    >
      {phase === "intro" ? (
        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 w-full overflow-hidden rounded-2xl border border-[#e1d5bf]/74 shadow-[0_14px_30px_-24px_rgba(82,69,53,0.24)]">
              <Image
                src="/majyosindan/Top.png"
                alt="魔女タイプ診断"
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <p className="text-[11px] tracking-[0.24em] text-[#8d7f69] uppercase">Witch Type</p>
            <h2 className="mt-2 text-xl font-medium tracking-[0.04em] text-[#2f2a25] sm:text-2xl">
              あなたの中に眠る魔女を見つけましょう
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#5d5346]">
              {witchQuestions.length}つの質問に直感で答えるだけ。
              <br />
              あなたの心の傾きから、16タイプの魔女のうち、いまのあなたに重なる一人を白の魔女ルミナがそっとお伝えします。
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <LuminaButton type="button" tone="primary" onClick={handleStart}>
              診断をはじめる
            </LuminaButton>
          </div>
        </GlassCard>
      ) : null}

      {phase === "quiz" ? (
        <GlassCard>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-[0.16em] text-[#847967]">
              QUESTION {current + 1} / {witchQuestions.length}
            </span>
            <button
              type="button"
              onClick={handleBack}
              className="lumina-link text-sm underline-offset-4 hover:underline"
            >
              ← 戻る
            </button>
          </div>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#e8ddc8]/70">
            <div
              className="h-full rounded-full bg-[#c1a062] transition-all duration-300"
              style={{ width: `${(current / witchQuestions.length) * 100}%` }}
            />
          </div>

          <h2 className="mt-6 text-lg font-medium leading-relaxed text-[#2e2a26] sm:text-xl">
            {witchQuestions[current].text}
          </h2>

          <div className="mt-5 space-y-3">
            {witchQuestions[current].options.map((option) => (
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
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      ) : null}

      {phase === "result" && result ? (
        <section className="space-y-4">
          <div ref={resultCardRef}>
          <GlassCard>
            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] tracking-[0.24em] text-[#8d7f69] uppercase">
                Your Witch Type
              </p>
              <h2 className="mt-2 text-3xl font-medium tracking-[0.06em] text-[#2e2a26] sm:text-4xl">
                {result.name}
              </h2>
              <span className="mt-3 inline-flex items-center rounded-full border border-[#d2c4e7] bg-white/70 px-3 py-1 text-xs font-medium tracking-[0.18em] text-[#75658f]">
                {result.mbti}
              </span>
              <p className="mt-3 text-sm leading-7 text-[#6b6053]">{result.catchCopy}</p>

              <div className="mt-5 w-full overflow-hidden rounded-2xl border border-[#e1d5bf]/74 shadow-[0_14px_30px_-24px_rgba(82,69,53,0.24)]">
                <Image
                  src={result.image}
                  alt={`${result.name}のイラスト`}
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
          </GlassCard>
          </div>

          {result.detail ? (
            <>
              <GlassCard>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                  {result.detail.body}
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">
                  {result.name}の恋愛
                </h3>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                  {result.detail.love}
                </p>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">
                  相性の良い魔女
                </h3>
                <div className="mt-4 space-y-3">
                  {result.detail.compatibility.map((item) => (
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
                  少し刺激的な相手
                </h3>
                <div className="mt-4 rounded-xl border border-[#d2c4e7]/70 bg-[#f5f0ff]/55 p-4">
                  <p className="flex items-center gap-2 text-[15px] font-medium text-[#2e2a26]">
                    <span aria-hidden="true">{result.detail.rival.emoji}</span>
                    <span>
                      {result.detail.rival.name}
                      <span className="ml-1 text-xs font-normal tracking-[0.12em] text-[#847967]">
                        （{result.detail.rival.mbti}）
                      </span>
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#544c42]">
                    {result.detail.rival.text}
                  </p>
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">
                  {result.name}からのメッセージ
                </h3>
                <blockquote className="mt-3 rounded-xl border-l-4 border-[#c4b8da] bg-[#f5f0ff]/55 p-4">
                  <p className="whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                    {result.detail.message}
                  </p>
                </blockquote>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-medium tracking-[0.04em] text-[#2e2a26]">キーワード</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.detail.keywords.map((keyword) => (
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
              <h3 className="text-sm font-medium tracking-wide text-[#2e2a26]">魔女からのことば</h3>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#544c42]">
                {result.description}
              </p>
            </GlassCard>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LuminaButton type="button" tone="primary" onClick={handleShare}>
              Xでシェアする
            </LuminaButton>
            <LuminaButton
              type="button"
              tone="secondary"
              onClick={handleDownloadImage}
              disabled={isDownloading}
            >
              {isDownloading ? "画像を生成中…" : "画像を保存する"}
            </LuminaButton>
            <LuminaButton type="button" tone="secondary" onClick={handleRetry}>
              もう一度診断する
            </LuminaButton>
          </div>
          {downloadStatus ? (
            <p className="text-center text-sm text-[#6b6053]">{downloadStatus}</p>
          ) : null}
        </section>
      ) : null}
    </PageShell>
  );
}
