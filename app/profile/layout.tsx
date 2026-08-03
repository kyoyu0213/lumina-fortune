import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロフィール登録 | 白の館 LUMINA",
  description:
    "ニックネームや生年月日を登録して、より精度の高い鑑定を。白の館 LUMINAのプロフィール設定ページです。",
  alternates: {
    canonical: "/profile",
  },
  openGraph: {
    title: "プロフィール登録 | 白の館 LUMINA",
    description: "ニックネームや生年月日を登録して、より精度の高い鑑定を。",
    url: "/profile",
    type: "website",
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
