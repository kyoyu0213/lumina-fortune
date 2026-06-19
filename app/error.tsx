"use client";

import { useEffect } from "react";

/**
 * ルートセグメントのエラーUI（Error Boundary）。
 * 技術情報（error.message / stack）は画面に出さない。安全な汎用文言と、
 * Next が付与する error.digest（識別子）・再試行導線(reset)のみ表示する。
 * レイアウト内でレンダされるため背景・フォントは layout.tsx のものを継承する。
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 画面には出さず、識別子のみログに残す（詳細はサーバー側ログ/監視に委ねる）
    console.error("[app/error] digest:", error.digest ?? "(none)");
  }, [error]);

  return (
    <main className="relative z-10 flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[1.6rem] border border-[#e6dac7]/80 bg-[rgba(255,252,247,0.82)] px-6 py-10 text-center shadow-[0_18px_40px_-28px_rgba(82,69,53,0.35)] backdrop-blur-[1px]">
        <p className="text-sm tracking-[0.18em] text-[#a4906f]">LUMINA</p>
        <h1 className="mt-4 text-lg font-medium text-[#2e2a26]">
          予期せぬエラーが発生しました
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6f6457]">
          少し時間をおいて、もう一度お試しください。
          <br />
          何度か続くときは、しばらく経ってからまたおいでくださいね。
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-[#c7ab73]/90 bg-[#c1a062] px-8 text-sm font-medium text-white shadow-[0_14px_28px_-18px_rgba(106,86,52,0.52)] transition hover:bg-[#b59558]"
        >
          もう一度試す
        </button>
        {error.digest ? (
          <p className="mt-6 text-[11px] tracking-wide text-[#b3a994]">
            エラーID: {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
