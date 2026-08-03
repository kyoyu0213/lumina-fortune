import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "未来の手紙｜未来の自分へ言葉を預ける | 白の館 LUMINA",
  description:
    "未来のあなたへ、いまの言葉を静かに預ける場所。白がその手紙を大切に抱えておきます。",
  alternates: {
    canonical: "/future-letter",
  },
  openGraph: {
    title: "未来の手紙｜未来の自分へ言葉を預ける | 白の館 LUMINA",
    description: "未来のあなたへ、いまの言葉を静かに預ける場所です。",
    url: "/future-letter",
    type: "website",
  },
};

export default function FutureLetterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
