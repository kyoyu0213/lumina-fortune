import { PageShell } from "@/components/ui/page-shell";
import type { Metadata } from "next";
import { WallpapersClient } from "./WallpapersClient";

export const metadata: Metadata = {
  title: "今月の待ち受け｜限定壁紙 | 白の館 LUMINA",
  description:
    "今月の来訪日数が7日になると受け取れる、白の館の限定待ち受け。日々の訪れに寄り添う特別なお守りです。",
  alternates: { canonical: "/library/wallpapers" },
  openGraph: {
    title: "今月の待ち受け｜限定壁紙 | 白の館 LUMINA",
    description: "来訪日数が7日になると受け取れる、白の館の限定待ち受け。",
    url: "/library/wallpapers",
    type: "website",
  },
};

export default function MonthlyWallpaperPage() {
  return (
    <PageShell
      maxWidth="content"
      title="今月の待ち受け"
      description="今月の来訪日数が7日になると、限定待ち受けを受け取れます。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <WallpapersClient />
    </PageShell>
  );
}
