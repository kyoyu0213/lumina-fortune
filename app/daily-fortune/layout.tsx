import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "今日の運勢｜無料タロット占い | 白の館 LUMINA",
  description:
    "白の魔女ルミナが今日のあなたへ贈る、タロットからのメッセージ。毎日の運勢と過ごし方のヒントを無料でお届けします。",
  alternates: {
    canonical: "/daily-fortune",
  },
  openGraph: {
    title: "今日の運勢｜無料タロット占い | 白の館 LUMINA",
    description: "白の魔女ルミナが今日のあなたへ贈る、タロットからのメッセージ。",
    url: "/daily-fortune",
    type: "website",
  },
};

export default function DailyFortuneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
