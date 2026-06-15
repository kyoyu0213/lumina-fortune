import type { Metadata } from "next";
import AuraClient from "./aura-client";

export const metadata: Metadata = {
  title: "あなたのオーラカラー診断 | LUMINA",
  description:
    "白の魔女ルミナが導く、12色の魂の輝き。10問の質問に答えるだけで、あなたのオーラカラーを診断します。",
  alternates: {
    canonical: "/aura",
  },
  openGraph: {
    title: "あなたのオーラカラー診断 | LUMINA",
    description: "白の魔女ルミナが導く、12色の魂の輝き。",
    url: "/aura",
    type: "website",
  },
};

export default function AuraPage() {
  return <AuraClient />;
}
