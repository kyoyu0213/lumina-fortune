import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "相性占い｜ふたりの生年月日で占う | 白の館 LUMINA",
  description:
    "ふたりの生年月日から、関係の流れと心の響きをやさしく読み解く相性占い。恋愛や結婚の相性を、白の魔女ルミナがお伝えします。",
  alternates: {
    canonical: "/compatibility",
  },
  openGraph: {
    title: "相性占い｜ふたりの生年月日で占う | 白の館 LUMINA",
    description: "ふたりの生年月日から、関係の流れと心の響きを読み解く相性占い。",
    url: "/compatibility",
    type: "website",
  },
};

export default function CompatibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
