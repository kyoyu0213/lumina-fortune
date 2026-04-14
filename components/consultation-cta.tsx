"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/track-event";

export function ConsultationCta({ page, label }: { page: string; label?: string }) {
  return (
    <section className="rounded-2xl border border-[#d8cde7]/50 bg-[linear-gradient(160deg,rgba(250,246,255,0.88),rgba(244,236,252,0.82))] p-6 shadow-[0_12px_28px_-20px_rgba(95,79,128,0.18)] sm:p-8">
      <p className="text-center text-[0.92rem] leading-relaxed text-[#5f5472]">
        もっと深く、あなただけの鑑定を受けたいときは
      </p>
      <p className="mt-2 text-center text-[0.82rem] leading-relaxed text-[#8a7d96]">
        ルミナが一対一であなたの状況を読み解く個人鑑定もご用意しています。
      </p>
      <div className="mt-5 text-center">
        <Link
          href="/consultation"
          onClick={() => void trackEvent({ event_name: "consultation_click", page, label })}
          className="inline-flex items-center justify-center rounded-full border border-[#cfc2e2] bg-[linear-gradient(160deg,#ffffff,#f1e8fb)] px-6 py-2.5 text-sm font-medium text-[#5f5472] shadow-[0_10px_24px_-20px_rgba(95,79,128,0.28)] transition hover:border-[#bdaed7] hover:bg-[#f8f2ff] hover:text-[#4f4660]"
        >
          個人鑑定の詳細を見る
        </Link>
      </div>
    </section>
  );
}
