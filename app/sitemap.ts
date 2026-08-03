import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";
import { listColumnArticles } from "@/lib/columns";
import { lightWorks } from "@/lib/light-work";
import { luckyWallpapers } from "@/lib/lucky-wallpapers";

// 公開・インデックス対象の固定ページ。
// 個人向けの結果ページや履歴ページ（/aura/result, /reading-history など）は
// インデックス価値が低いため意図的に除外している。
const STATIC_PATHS: string[] = [
  "/",
  "/about",
  "/aura",
  "/basic-personality",
  "/bird",
  "/calendar",
  "/columns",
  "/compatibility",
  "/consultation",
  "/contact",
  "/daily-fortune",
  "/fortune-2026",
  "/fortune-monthly",
  "/future-letter",
  "/healing",
  "/letter",
  "/library/kanteisho",
  "/library/limited-video",
  "/library/records",
  "/library/records/cards",
  "/library/records/haku",
  "/library/records/lumina",
  "/library/records/mansion",
  "/library/records/origin",
  "/library/wallpapers",
  "/light-work",
  "/lucky-wallpapers",
  "/majyosindan",
  "/manga",
  "/manga/birds",
  "/marriage-timing",
  "/membership",
  "/moon-rituals",
  "/moon-rituals/full",
  "/moon-rituals/new",
  "/moon-rituals/wish",
  "/pastlife",
  "/profile",
  "/reading-request",
  "/voice",
  "/wish-garden",
  "/uranai/fukuen",
  "/uranai/kare-no-kimochi",
  "/uranai/kataomoi",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  // コラム記事（動的 /columns/[slug]）
  for (const article of listColumnArticles()) {
    entries.push({
      url: `${SITE_URL}/columns/${article.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // ライトワーク（動的 /light-work/[slug]）
  for (const work of lightWorks) {
    entries.push({
      url: `${SITE_URL}/light-work/${work.slug}`,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // ラッキー壁紙（動的 /lucky-wallpapers/[id]）
  for (const wallpaper of luckyWallpapers) {
    entries.push({
      url: `${SITE_URL}/lucky-wallpapers/${wallpaper.id}`,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
