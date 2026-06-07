import type { Metadata } from "next";
import MajyosindanClient from "./majyosindan-client";

export const metadata: Metadata = {
  title: "魔女タイプ診断 | ルミナの光導きタロット",
  description:
    "白の魔女ルミナが導く、16の魔女の物語。いくつかの質問に答えるだけで、あなたの中に眠る魔女タイプがわかります。",
  alternates: {
    canonical: "/majyosindan",
  },
  openGraph: {
    title: "魔女タイプ診断 | ルミナの光導きタロット",
    description: "白の魔女ルミナが導く、16の魔女の物語。あなたの魔女タイプを診断します。",
    url: "/majyosindan",
    type: "website",
  },
};

export default function MajyosindanPage() {
  return <MajyosindanClient />;
}
