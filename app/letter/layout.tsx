import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ルミナへの手紙 | 白の館 LUMINA",
  description:
    "いま心にあることを、短い言葉で。白の魔女ルミナが静かに受け取る、あなたの気持ちを綴るための手紙のページです。",
  alternates: {
    canonical: "/letter",
  },
  openGraph: {
    title: "ルミナへの手紙 | 白の館 LUMINA",
    description: "いま心にあることを、短い言葉で。ルミナが静かに受け取ります。",
    url: "/letter",
    type: "website",
  },
};

export default function LetterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
