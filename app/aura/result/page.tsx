import type { Metadata } from "next";
import { auraColors, isAuraId } from "@/lib/aura/aura";
import AuraResultClient from "./aura-result-client";

export const metadata: Metadata = {
  title: "オーラカラー診断結果 | あなたのオーラカラー診断 | LUMINA",
  description: "白の魔女ルミナが導く、12色の魂の輝き。あなたのオーラカラー診断の結果ページです。",
  alternates: {
    canonical: "/aura/result",
  },
  robots: { index: false },
};

type ResultPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function AuraResultPage({ searchParams }: ResultPageProps) {
  const { type } = await searchParams;
  const result = isAuraId(type) ? auraColors[type] : null;
  // 表示と言語切替はクライアント側に委譲（type 解決のみサーバーで行う）
  return <AuraResultClient result={result} />;
}
