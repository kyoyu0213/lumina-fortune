import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // APIエンドポイントと個人向けの結果・履歴ページはクロール不要。
      disallow: [
        "/api/",
        "/admin",
        "/aura/result",
        "/fortune-2026/result/",
        "/fortune-monthly/result",
        "/reading-history",
        "/saved-guidance",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
