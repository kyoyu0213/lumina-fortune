import type { Metadata } from "next";
import KataomoiClient from "./kataomoi-client";

export const metadata: Metadata = {
  title: "片思い占い | ルミナの光導きタロット",
  description:
    "好きな人との距離感、今の気持ち、動き出すタイミングをタロットでやさしく読み解く片思い占いです。",
  alternates: {
    canonical: "/uranai/kataomoi",
  },
  openGraph: {
    title: "片思い占い | ルミナの光導きタロット",
    description:
      "好きな人との距離感、今の気持ち、動き出すタイミングをタロットでやさしく読み解く片思い占いです。",
    url: "/uranai/kataomoi",
    type: "website",
  },
};

export default function KataomoiPage() {
  return <KataomoiClient />;
}
