import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "光の願いの庭｜願いを置く場所 | 白の館 LUMINA",
  description:
    "小さな願いや祈りが置かれていく、光の願いの庭。あなたの願いをそっと置いて、月の光に見守られる場所です。",
  alternates: {
    canonical: "/wish-garden",
  },
  openGraph: {
    title: "光の願いの庭｜願いを置く場所 | 白の館 LUMINA",
    description: "小さな願いや祈りが置かれていく、光の願いの庭。",
    url: "/wish-garden",
    type: "website",
  },
};

export default function WishGardenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
