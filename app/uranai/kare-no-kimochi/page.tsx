import type { Metadata } from "next";
import KareNoKimochiClient from "./kare-no-kimochi-client";

export const metadata: Metadata = {
  title: "あの人の気持ち占い｜光の導きタロット【白の魔女ルミナ】",
  description:
    "あの人の気持ち占い。白の魔女ルミナの光の導きタロットで、今あの人の心にある本音やあなたへの想いをやさしく読み解きます。",
  alternates: {
    canonical: "/uranai/kare-no-kimochi",
  },
  openGraph: {
    title: "あの人の気持ち占い｜光の導きタロット【白の魔女ルミナ】",
    description:
      "あの人の気持ち占い。白の魔女ルミナの光の導きタロットで、今あの人の心にある本音やあなたへの想いをやさしく読み解きます。",
    url: "/uranai/kare-no-kimochi",
    type: "website",
  },
};

export default function KareNoKimochiPage() {
  return <KareNoKimochiClient />;
}
