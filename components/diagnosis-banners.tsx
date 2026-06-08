"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/track";

type DiagnosisBannersProps = {
  /** 計測用の現在ページパス（例: "/uranai/kataomoi"） */
  page?: string;
  className?: string;
};

const banners = [
  {
    href: "/bird",
    src: "/gazou/bird/banner.png",
    alt: "鳥タイプ診断",
    width: 2544,
    height: 416,
    event: "bird_banner_click",
    label: "bird_banner",
  },
  {
    href: "/majyosindan",
    src: "/majyosindan/majyosindan.png",
    alt: "魔女タイプ診断",
    width: 1774,
    height: 296,
    event: "witch_banner_click",
    label: "majyosindan_banner",
  },
] as const;

/** 鳥タイプ診断・魔女タイプ診断へのバナーリンク（占い結果ページ下部に設置） */
export function DiagnosisBanners({ page = "/", className = "" }: DiagnosisBannersProps) {
  return (
    <section className={`space-y-3 ${className}`.trim()}>
      <p className="text-center text-[11px] tracking-[0.18em] text-[#8d806e] uppercase">
        Other Diagnosis
      </p>
      <h3 className="text-center text-[0.95rem] font-medium text-[#4a4035]">
        あなたのタイプも占ってみませんか？
      </h3>
      {banners.map((banner) => (
        <Link
          key={banner.href}
          href={banner.href}
          onClick={() => void trackEvent(banner.event, page, banner.label)}
          aria-label={banner.alt}
          className="group block overflow-hidden rounded-[1.6rem] border border-[#e6dac7]/85 shadow-[0_14px_28px_-22px_rgba(82,69,53,0.3)] transition hover:-translate-y-0.5 hover:opacity-90"
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            width={banner.width}
            height={banner.height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 760px"
          />
        </Link>
      ))}
    </section>
  );
}
