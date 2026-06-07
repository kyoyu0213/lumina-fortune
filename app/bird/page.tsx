import type { Metadata } from "next";
import BirdClient from "./bird-client";

export const metadata: Metadata = {
  title: "鳥タイプ診断 | 鳥たちの王国",
  description:
    "12羽の鳥たちが教えてくれる、あなたの本当の性格。16問の質問に答えるだけで、あなたに最も近い鳥のタイプを診断します。",
  alternates: {
    canonical: "/bird",
  },
  openGraph: {
    title: "鳥タイプ診断 | 鳥たちの王国",
    description: "12羽の鳥たちが教えてくれる、あなたの本当の性格。あなたは愛されるシマエナガ？それとも知性派のヨウム？",
    url: "/bird",
    type: "website",
  },
};

export default function BirdPage() {
  return <BirdClient />;
}
