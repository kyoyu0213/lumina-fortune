"use client";

import { useEffect, useRef, useState } from "react";

type CoconalaService = {
  serviceId: string;
  href: string;
  text: string;
};

const SERVICES: CoconalaService[] = [
  {
    serviceId: "4121312",
    href: "https://coconala.com/services/4121312",
    text: "タロットと宿曜で丁寧な鑑定書をお届けします 恋愛・仕事・人間関係をカードで深く読み解きます",
  },
  {
    serviceId: "4139195",
    href: "https://coconala.com/services/4139195",
    text: "白の魔女がタロット1枚であなたの悩みに光を灯します どんなに暗い夜でも、あなたの物語はまだ終わっていません。",
  },
];

/**
 * ココナラウィジェット
 * coconala_widget.js はページ内の .coconala-widget を探してiframeに変換する。
 * SPAではDOMレンダリング後にスクリプトを挿入する必要がある。
 */
export function CoconalaWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // DOM描画完了を待ってからスクリプトを挿入
    const timer = setTimeout(() => {
      // 既存のウィジェットスクリプトを完全に削除
      const oldScript = document.getElementById("coconala-wjs");
      if (oldScript) oldScript.remove();

      // 新しいスクリプトをbodyの末尾に追加（coconalaの仕様に合わせる）
      const script = document.createElement("script");
      script.id = "coconala-wjs";
      script.src = "https://coconala.com/js/coconala_widget.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="mb-6 rounded-2xl border border-[#e1d5bf]/50 bg-white/60 p-6 shadow-[0_12px_28px_-20px_rgba(82,69,53,0.14)] backdrop-blur sm:p-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] text-[#c9a96e]">✦</span>
        <h2 className="text-[0.95rem] font-semibold tracking-wide text-[#4e453a]">ココナラで個人鑑定を受ける</h2>
      </div>
      <div ref={containerRef} className="space-y-4">
        {SERVICES.map((service) => (
          <div key={service.serviceId}>
            <a
              className="coconala-widget"
              href={service.href}
              data-service_id={service.serviceId}
              data-width="468"
              data-comment="0"
              data-invite="0"
              data-user_id="5959842"
            >
              {service.text}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
