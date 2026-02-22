"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { pickRandomTarotCard, type TarotCardEntry } from "@/src/data/tarotCards";

type DrawnCard = TarotCardEntry & {
  reversed: boolean;
};

type DailyFortuneResponse = {
  text?: string;
  error?: string;
};

function getTodayLabel() {
  const now = new Date();
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function DailyFortunePage() {
  const [readyToFlip, setReadyToFlip] = useState(false);
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipFinished, setFlipFinished] = useState(false);
  const [resultText, setResultText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const [error, setError] = useState("");
  const today = useMemo(() => getTodayLabel(), []);
  const prefersReducedMotion = usePrefersReducedMotion();
  const requestIdRef = useRef(0);
  const flipTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (flipFinished && selectedCard) {
      setShowResult(true);
    }
  }, [flipFinished, selectedCard]);

  useEffect(() => {
    return () => {
      if (flipTimerRef.current !== null) {
        window.clearTimeout(flipTimerRef.current);
      }
    };
  }, []);

  const resetState = () => {
    requestIdRef.current += 1;
    if (flipTimerRef.current !== null) {
      window.clearTimeout(flipTimerRef.current);
      flipTimerRef.current = null;
    }
    setReadyToFlip(false);
    setSelectedCard(null);
    setIsFlipped(false);
    setFlipFinished(false);
    setResultText("");
    setShowResult(false);
    setLoadingResult(false);
    setError("");
  };

  const handlePrepare = () => {
    requestIdRef.current += 1;
    if (flipTimerRef.current !== null) {
      window.clearTimeout(flipTimerRef.current);
      flipTimerRef.current = null;
    }
    setReadyToFlip(true);
    setSelectedCard(null);
    setIsFlipped(false);
    setFlipFinished(false);
    setResultText("");
    setShowResult(false);
    setLoadingResult(false);
    setError("");
  };

  const handleFlip = async () => {
    if (!readyToFlip || isFlipped) return;

    const requestId = ++requestIdRef.current;
    const baseCard = pickRandomTarotCard();
    const card: DrawnCard = {
      ...baseCard,
      reversed: Math.random() > 0.75,
    };

    setSelectedCard(card);
    setIsFlipped(true);
    setFlipFinished(false);
    setShowResult(false);
    setResultText("");
    setError("");
    setLoadingResult(true);

    const flipDelay = prefersReducedMotion ? 0 : 520;
    flipTimerRef.current = window.setTimeout(() => {
      if (requestIdRef.current !== requestId) return;
      setFlipFinished(true);
      flipTimerRef.current = null;
    }, flipDelay);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${today}の毎日の運勢を1枚引きで占ってください。`,
          mode: "daily-fortune",
          cards: [{ name: card.nameJa, reversed: card.reversed }],
        }),
      });

      const data = (await res.json()) as DailyFortuneResponse;
      if (!res.ok) {
        throw new Error(data.error ?? "占い結果の取得に失敗しました。");
      }
      if (requestIdRef.current !== requestId) return;
      setResultText(data.text ?? "");
    } catch (err) {
      if (requestIdRef.current !== requestId) return;
      setError(err instanceof Error ? err.message : "通信エラーが発生しました。");
    } finally {
      if (requestIdRef.current === requestId) {
        setLoadingResult(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed_0%,_#ffedd5_45%,_#ffe4e6_100%)] px-5 py-10 text-amber-950">
      <div className="mx-auto max-w-2xl rounded-3xl border border-amber-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-32px_rgba(146,64,14,0.35)] backdrop-blur">
        <div className="mb-4">
          <Link href="/" className="text-sm text-amber-700 underline-offset-4 hover:underline">
            トップへ戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold tracking-tight">毎日の占い</h1>
        <p className="mt-2 text-sm text-amber-900/80">
          {today}の運勢を、タロット1枚引きで見ます。
        </p>

        {!readyToFlip ? (
          <div className="mt-6">
            <button type="button" onClick={handlePrepare} className="btn btn--primary">
              今日の運勢を占う
            </button>
          </div>
        ) : (
          <section className="mt-6">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-amber-900/80">
                カードをタップして、今日の1枚をめくってください。
              </p>

              <button
                type="button"
                onClick={handleFlip}
                disabled={isFlipped}
                aria-label={isFlipped ? "カードがめくられました" : "カードをめくる"}
                className="fortune-card-button group"
              >
                <span
                  className={`fortune-card-inner ${isFlipped ? "is-flipped" : ""}`}
                  aria-hidden="true"
                >
                  <span className="fortune-card-face fortune-card-back">
                    <span className="fortune-card-back-mark">LUMINA</span>
                    <span className="fortune-card-back-stars" />
                  </span>

                  <span className="fortune-card-face fortune-card-front">
                    {selectedCard ? (
                      <>
                        <span className="fortune-card-frame">
                          {selectedCard.imageUrl ? (
                            <img
                              src={selectedCard.imageUrl}
                              alt={selectedCard.nameJa}
                              className="h-full w-full rounded-xl object-cover"
                            />
                          ) : (
                            <span className="fortune-card-placeholder" role="img" aria-label={selectedCard.nameJa}>
                              ✧
                            </span>
                          )}
                        </span>
                        <span className="mt-3 text-sm font-semibold text-amber-950">
                          {selectedCard.nameJa}
                          {selectedCard.reversed ? "（逆位置）" : ""}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-amber-900/80">めくると表示されます</span>
                    )}
                  </span>
                </span>
              </button>

              {error ? <p className="text-sm text-red-700">{error}</p> : null}

              {isFlipped && !flipFinished ? (
                <p className="text-sm text-amber-800/80">カードを読み解いています…</p>
              ) : null}
              {flipFinished && loadingResult && !showResult ? (
                <p className="text-sm text-amber-800/80">今日のメッセージを整えています…</p>
              ) : null}
            </div>

            <div className={`fortune-result ${showResult ? "is-visible" : ""}`}>
              {selectedCard ? (
                <section className="mt-6 rounded-2xl border border-amber-200 bg-white/70 p-4 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-24 w-16 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-gradient-to-b from-amber-100 to-rose-100 text-2xl shadow-sm">
                      {selectedCard.imageUrl ? (
                        <img
                          src={selectedCard.imageUrl}
                          alt={selectedCard.nameJa}
                          className="h-full w-full rounded-xl object-cover"
                        />
                      ) : (
                        <span aria-hidden="true">✧</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold">
                        {selectedCard.nameJa}
                        {selectedCard.reversed ? "（逆位置）" : ""}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-amber-900/85">
                        {selectedCard.meaningJa}
                      </p>
                    </div>
                  </div>

                  {resultText ? (
                    <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/70 p-3">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{resultText}</p>
                    </div>
                  ) : null}
                </section>
              ) : null}
            </div>

            <div className="mt-6">
              <button type="button" onClick={resetState} className="btn btn--primary">
                もう一度占う
              </button>
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        .fortune-card-button {
          width: min(100%, 18rem);
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          perspective: 1200px;
        }

        .fortune-card-button:disabled {
          cursor: default;
        }

        .fortune-card-button:focus-visible {
          outline: 3px solid #b45309;
          outline-offset: 6px;
          border-radius: 1.5rem;
        }

        .fortune-card-inner {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 2.5 / 4;
          transform-style: preserve-3d;
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fortune-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .fortune-card-face {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 1.25rem;
          border: 1px solid rgba(251, 191, 36, 0.35);
          box-shadow:
            0 16px 28px -18px rgba(120, 53, 15, 0.45),
            0 8px 16px -12px rgba(0, 0, 0, 0.3);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .fortune-card-back {
          overflow: hidden;
          background:
            radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.35), transparent 48%),
            radial-gradient(circle at 80% 25%, rgba(251, 113, 133, 0.24), transparent 55%),
            linear-gradient(160deg, #1f2937 0%, #111827 55%, #0f172a 100%);
          color: #fef3c7;
        }

        .fortune-card-back-mark {
          z-index: 1;
          letter-spacing: 0.22em;
          font-size: 0.95rem;
          font-weight: 700;
          opacity: 0.92;
        }

        .fortune-card-back-stars {
          position: absolute;
          inset: 10%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 251, 235, 0.22);
          box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.15);
        }

        .fortune-card-back-stars::before,
        .fortune-card-back-stars::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(255, 251, 235, 0.95) 0 1px, transparent 1.5px),
            radial-gradient(circle, rgba(251, 191, 36, 0.55) 0 1px, transparent 1.6px);
          background-size: 28px 28px, 37px 37px;
          background-position: 0 0, 10px 14px;
          opacity: 0.45;
        }

        .fortune-card-back-stars::after {
          transform: rotate(8deg) scale(1.04);
          opacity: 0.18;
        }

        .fortune-card-front {
          padding: 0.9rem;
          transform: rotateY(180deg);
          background:
            linear-gradient(180deg, rgba(255, 251, 235, 0.98), rgba(255, 247, 237, 0.94)),
            linear-gradient(140deg, rgba(254, 243, 199, 0.3), rgba(251, 207, 232, 0.25));
          color: #451a03;
        }

        .fortune-card-frame {
          display: flex;
          width: 100%;
          flex: 1;
          min-height: 0;
          align-items: center;
          justify-content: center;
          border-radius: 0.85rem;
          border: 1px solid rgba(217, 119, 6, 0.2);
          background:
            radial-gradient(circle at 30% 25%, rgba(251, 191, 36, 0.28), transparent 45%),
            radial-gradient(circle at 75% 20%, rgba(251, 113, 133, 0.22), transparent 48%),
            linear-gradient(180deg, #fffdf8 0%, #fff7ed 100%);
        }

        .fortune-card-placeholder {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80%;
          height: 80%;
          border-radius: 0.9rem;
          border: 1px dashed rgba(180, 83, 9, 0.25);
          color: rgba(180, 83, 9, 0.7);
          font-size: 2rem;
          background: rgba(255, 255, 255, 0.5);
        }

        .fortune-result {
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 360ms ease,
            transform 360ms ease;
          pointer-events: none;
        }

        .fortune-result.is-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .fortune-card-inner,
          .fortune-result {
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </main>
  );
}
