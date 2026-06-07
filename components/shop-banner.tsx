"use client";

import Image from "next/image";
import { trackEvent } from "@/lib/analytics/track";

type ShopBannerProps = {
  /** 計測用の現在ページパス（例: "/bird"） */
  page?: string;
  className?: string;
};

/** SUZURI グッズショップへのバナーリンク（各ページ下部・フッターの上に設置） */
export function ShopBanner({ page = "/", className = "" }: ShopBannerProps) {
  return (
    <section className={`relative mx-auto w-full max-w-5xl px-4 ${className}`.trim()}>
      <a
        href="https://suzuri.jp/lumina-fortune/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => void trackEvent("shop_banner_click", page, "shop_banner")}
        aria-label="ルミナのグッズショップ（SUZURI）"
        className="group block overflow-hidden rounded-[1.6rem] border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
      >
        <Image
          src="/gazou/shopbanner.png"
          alt="ルミナのグッズショップ（SUZURI）"
          width={2544}
          height={416}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 1100px"
        />
      </a>
    </section>
  );
}
