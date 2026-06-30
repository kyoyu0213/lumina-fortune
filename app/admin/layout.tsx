import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理画面 | 白の館 LUMINA",
  // 検索エンジンにインデックスさせない（robots.ts でも /admin を Disallow 済み）。
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
