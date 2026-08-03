import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "有料会員登録 | 白の館 LUMINA",
  description:
    "白の館 LUMINAの有料会員のご案内。限定の鑑定や記録機能など、より深くルミナと過ごすためのメンバーシップです。",
  alternates: {
    canonical: "/membership",
  },
  openGraph: {
    title: "有料会員登録 | 白の館 LUMINA",
    description: "限定の鑑定や記録機能など、より深くルミナと過ごすためのメンバーシップ。",
    url: "/membership",
    type: "website",
  },
};

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
