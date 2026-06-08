import type { Metadata } from "next";
import PastLifeClient from "./pastlife-client";

export const metadata: Metadata = {
  title: "前世診断 | あなたの魂はどんな人生を歩んできたのか",
  description:
    "あなたの魂は、どんな人生を歩んできたのか。16問の質問に答えるだけで、あなたの前世の物語を読み解きます。悲劇の王女、忠義の騎士、星の旅人…あなたの過去世は？",
  alternates: {
    canonical: "/pastlife",
  },
  openGraph: {
    title: "前世診断 | あなたの魂はどんな人生を歩んできたのか",
    description:
      "あなたの魂は、どんな人生を歩んできたのか。16問であなたの前世の物語を読み解きます。",
    url: "/pastlife",
    type: "website",
  },
};

export default function PastLifePage() {
  return <PastLifeClient />;
}
