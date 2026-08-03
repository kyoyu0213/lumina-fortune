import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "個人鑑定のご依頼窓口 | 白の館 LUMINA",
  description:
    "あなたの状況に合わせた、より丁寧な読み解きをお届けするための窓口。白の魔女ルミナへの鑑定のお申し込みはこちらから。",
  alternates: {
    canonical: "/reading-request",
  },
  openGraph: {
    title: "個人鑑定のご依頼窓口 | 白の館 LUMINA",
    description: "あなたの状況に合わせた、より丁寧な読み解きをお届けするための窓口です。",
    url: "/reading-request",
    type: "website",
  },
};

export default function ReadingRequestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
