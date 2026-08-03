import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "館の休息室｜心を整えるヒーリング | 白の館 LUMINA",
  description:
    "呼吸を整え、音に身をあずけるための静かな部屋。疲れた心をそっと休ませる、白の館のヒーリングスペースです。",
  alternates: {
    canonical: "/healing",
  },
  openGraph: {
    title: "館の休息室｜心を整えるヒーリング | 白の館 LUMINA",
    description: "呼吸を整え、音に身をあずけるための静かな部屋。白の館のヒーリングスペース。",
    url: "/healing",
    type: "website",
  },
};

export default function HealingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
