import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "個人鑑定のご依頼｜白の魔女ルミナ | 白の館 LUMINA",
  description:
    "いま抱えている悩みや違和感を、そのまま言葉に。白の魔女ルミナ本人による本格的な個人鑑定のお申し込み窓口です。",
  alternates: {
    canonical: "/consultation",
  },
  openGraph: {
    title: "個人鑑定のご依頼｜白の魔女ルミナ | 白の館 LUMINA",
    description: "白の魔女ルミナ本人による本格的な個人鑑定のお申し込み窓口です。",
    url: "/consultation",
    type: "website",
  },
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
