"use client";

import { LANGS, type Lang } from "@/lib/i18n/config";

/**
 * 言語切り替えボタン（横並び）。選択中はオレンジ系背景で強調。
 * 既存の暖色パレットに馴染むよう、非選択はクリーム系ボタンに揃える。
 */
export function LanguageSwitcher({
  lang,
  onChange,
  className = "",
}: {
  lang: Lang;
  onChange: (next: Lang) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="言語切り替え / Language"
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`.trim()}
    >
      {LANGS.map((item) => {
        const active = item.code === lang;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => onChange(item.code)}
            aria-pressed={active}
            className={
              active
                ? "inline-flex min-h-9 items-center justify-center rounded-full border border-[#e0954c] bg-[#ef9b4f] px-4 text-[13px] font-medium text-white shadow-[0_8px_18px_-12px_rgba(214,138,68,0.65)]"
                : "inline-flex min-h-9 items-center justify-center rounded-full border border-[#e1d5bf]/85 bg-white/70 px-4 text-[13px] font-medium text-[#6b6053] shadow-[0_8px_18px_-16px_rgba(82,69,53,0.24)] transition hover:-translate-y-0.5 hover:bg-white"
            }
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
