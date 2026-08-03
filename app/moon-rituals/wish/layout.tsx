import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "月光の願い｜新月に願いを置く | 白の館 LUMINA",
  description:
    "新月に願いを置き、満月にその光を振り返るための静かな場所。月のリズムに願いを重ねる、白の館の祈りのページです。",
  alternates: {
    canonical: "/moon-rituals/wish",
  },
  openGraph: {
    title: "月光の願い｜新月に願いを置く | 白の館 LUMINA",
    description: "新月に願いを置き、満月にその光を振り返るための静かな場所。",
    url: "/moon-rituals/wish",
    type: "website",
  },
};

export default function MoonWishLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
