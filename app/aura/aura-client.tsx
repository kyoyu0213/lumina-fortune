"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auraQuestions, computeAuraId } from "@/lib/aura/aura";
import { AuraBackground } from "@/components/aura/aura-background";
import { ShopBanner } from "@/components/shop-banner";

type Phase = "intro" | "quiz";

const TOTAL = auraQuestions.length;
const LAST = TOTAL - 1;

export default function AuraClient() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(TOTAL).fill(null));

  const allAnswered = answers.every((a) => a !== null);

  const handleStart = () => {
    setAnswers(Array(TOTAL).fill(null));
    setCurrent(0);
    setPhase("quiz");
  };

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
    if (current < LAST) {
      setCurrent((index) => index + 1);
    }
  };

  const handleBack = () => {
    if (current === 0) {
      setPhase("intro");
      return;
    }
    setCurrent((index) => index - 1);
  };

  const handleShowResult = () => {
    if (!allAnswered) return;
    const id = computeAuraId(answers as number[]);
    router.push(`/aura/result?type=${id}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <AuraBackground />

      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-[#8a7c5a] underline-offset-4 transition hover:text-[#6f6242] hover:underline"
          >
            ← トップへ戻る
          </Link>
          <span className="text-[11px] tracking-[0.28em] text-[#a99a76] uppercase">Aura Color</span>
        </div>

        {phase === "intro" ? (
          <section className="rounded-[2rem] border border-white/70 bg-white/65 p-6 text-center shadow-[0_24px_48px_-32px_rgba(120,104,66,0.4)] backdrop-blur-[2px] sm:p-9">
            <button
              type="button"
              onClick={handleStart}
              aria-label="診断をはじめる"
              className="block w-full cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_16px_34px_-26px_rgba(120,104,66,0.5)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd84]/70"
            >
              <Image
                src="/gazou/aura/Top.png"
                alt="あなたのオーラカラー診断"
                width={1693}
                height={929}
                className="h-auto w-full object-cover"
                priority
              />
            </button>

            <p className="mt-6 text-[11px] tracking-[0.3em] text-[#b6a880] uppercase">Aura Color Diagnosis</p>
            <h1 className="mt-3 font-[var(--font-playfair-display)] text-3xl tracking-[0.06em] text-[#4a4030] sm:text-4xl">
              あなたのオーラカラー診断
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#6f6242] sm:text-base">
              白の魔女ルミナが導く、
              <br />
              12色の魂の輝き
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/60 bg-white/55 px-5 py-4">
              <p className="text-sm leading-7 text-[#6b5f48]">
                10問の質問に答えるだけで、
                <br />
                あなたの魂が放つオーラの色を診断します。
              </p>
              <p className="mt-3 text-sm leading-7 text-[#6b5f48]">
                今のあなたは、どんな光をまとっているのでしょう。
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9c79a]/80 bg-[linear-gradient(135deg,#f3e6c4,#d8c089)] px-10 text-sm font-medium tracking-[0.1em] text-[#5a4d33] shadow-[0_16px_30px_-16px_rgba(150,128,80,0.7)] transition hover:-translate-y-0.5 hover:brightness-[1.04]"
              >
                診断をはじめる
              </button>
            </div>
          </section>
        ) : null}

        {phase === "quiz" ? (
          <section className="rounded-[2rem] border border-white/70 bg-white/70 p-5 shadow-[0_24px_48px_-32px_rgba(120,104,66,0.4)] backdrop-blur-[2px] sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium tracking-[0.16em] text-[#9a8a64]">
                QUESTION {current + 1} / {TOTAL}
              </span>
              <button
                type="button"
                onClick={handleBack}
                className="text-sm text-[#8a7c5a] underline-offset-4 transition hover:text-[#6f6242] hover:underline"
              >
                ← 戻る
              </button>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#ece3cf]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#f6c1d1,#f3e6a8,#bfe3d0,#bcd2f0,#d8c4ec)] transition-all duration-300"
                style={{ width: `${((current + (answers[current] !== null ? 1 : 0)) / TOTAL) * 100}%` }}
              />
            </div>

            <h2 className="mt-6 text-lg font-medium leading-relaxed text-[#4a4030] sm:text-xl">
              {auraQuestions[current].text}
            </h2>

            <div className="mt-5 space-y-3">
              {auraQuestions[current].options.map((option, optionIndex) => {
                const selected = answers[current] === optionIndex;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelect(optionIndex)}
                    aria-pressed={selected}
                    className={`group flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left text-[15px] leading-relaxed shadow-[0_12px_24px_-22px_rgba(120,104,66,0.4)] transition hover:-translate-y-0.5 ${
                      selected
                        ? "border-[#d6bd84] bg-[linear-gradient(135deg,#fbf3dd,#f4e8c8)] text-[#5a4d33]"
                        : "border-white/70 bg-white/75 text-[#5b513c] hover:border-[#e0d2a8] hover:bg-white/95"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm transition ${
                        selected
                          ? "border-[#d6bd84] bg-[#f0e3bf] text-[#9a7f3d]"
                          : "border-[#e3d9bf] bg-[#f7f1e3] text-[#b6a47a]"
                      }`}
                    >
                      {selected ? "✦" : String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            {current === LAST ? (
              <div className="mt-7 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handleShowResult}
                  disabled={!allAnswered}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#d9c79a]/80 bg-[linear-gradient(135deg,#f3e6c4,#d8c089)] px-10 text-sm font-medium tracking-[0.1em] text-[#5a4d33] shadow-[0_16px_30px_-16px_rgba(150,128,80,0.7)] transition hover:-translate-y-0.5 hover:brightness-[1.04] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
                >
                  診断結果を見る
                </button>
                {!allAnswered ? (
                  <p className="text-xs text-[#b08a6a]">
                    未回答の質問があります。すべての質問に答えてください。
                  </p>
                ) : null}
              </div>
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
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </Link>
        </section>

        <section className="relative mt-4 w-full">
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
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </Link>
        </section>

        <ShopBanner page="/aura" className="mt-4 px-0" />
      </div>
    </main>
  );
}
