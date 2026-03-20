"use client";

import Image from "next/image";
import { useState } from "react";

type CardImageModalProps = {
  src: string;
  alt: string;
  /** "sm" = 180/220px (default), "md" = 270/330px */
  size?: "sm" | "md";
};

const SIZE_CLASSES = {
  sm: "w-[180px] sm:w-[220px]",
  md: "w-[270px] sm:w-[330px]",
} as const;

export function CardImageModal({ src, alt, size = "sm" }: CardImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sizeClass = SIZE_CLASSES[size];
  const imgWidth = size === "md" ? 330 : 220;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="my-6 flex justify-center w-full cursor-zoom-in"
      >
        <div className={`${sizeClass} overflow-hidden rounded-xl border border-[#d8c8ab]/50 shadow-[0_10px_24px_-16px_rgba(82,69,53,0.22)] transition hover:shadow-[0_14px_32px_-16px_rgba(82,69,53,0.32)]`}>
          <Image
            src={src}
            alt={alt}
            width={imgWidth}
            height={Math.round(imgWidth * 1.5)}
            className="h-auto w-full"
          />
        </div>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white text-xl transition hover:bg-white/30"
            aria-label="閉じる"
          >
            ✕
          </button>
          <div
            className="max-h-[85vh] w-[300px] overflow-hidden rounded-2xl border border-[#d8c8ab]/30 shadow-2xl sm:w-[360px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={360}
              height={612}
              className="h-auto w-full"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
