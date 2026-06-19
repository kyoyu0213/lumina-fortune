"use client";

import { useEffect } from "react";

/**
 * ルートレイアウトごと落ちた時の最終フォールバック。
 * layout.tsx は適用されないため <html><body> を自前で持ち、globals.css にも
 * 依存しないようインラインスタイルで自己完結させる。
 * 技術情報（error.message / stack）は出さず、digest と再試行導線のみ。
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/global-error] digest:", error.digest ?? "(none)");
  }, [error]);

  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f1e7",
          color: "#2e2a26",
          fontFamily: "'Noto Serif JP', serif",
          padding: "1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "26rem",
            textAlign: "center",
            border: "1px solid rgba(230,218,199,0.8)",
            borderRadius: "1.6rem",
            background: "rgba(255,252,247,0.92)",
            padding: "2.5rem 1.5rem",
            boxShadow: "0 18px 40px -28px rgba(82,69,53,0.35)",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.8rem", letterSpacing: "0.18em", color: "#a4906f" }}>
            LUMINA
          </p>
          <h1 style={{ margin: "1rem 0 0", fontSize: "1.1rem", fontWeight: 500 }}>
            予期せぬエラーが発生しました
          </h1>
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.875rem", lineHeight: 1.7, color: "#6f6457" }}>
            少し時間をおいて、もう一度お試しください。
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "1.75rem",
              minHeight: "2.75rem",
              padding: "0 2rem",
              borderRadius: "9999px",
              border: "1px solid rgba(199,171,115,0.9)",
              background: "#c1a062",
              color: "#ffffff",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            もう一度試す
          </button>
          {error.digest ? (
            <p style={{ marginTop: "1.5rem", fontSize: "0.7rem", color: "#b3a994" }}>
              エラーID: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
