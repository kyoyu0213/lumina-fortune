// 本番公開URL。Vercel等の環境変数 NEXT_PUBLIC_SITE_URL があれば優先。
// 末尾スラッシュ無しに正規化（metadataBase / sitemap / canonical で使用）。
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.lumina-fortune.com"
).replace(/\/$/, "");

export const BRAND = {
  name: "白の館 LUMINA",
  tagline: "光と静寂のタロット占い",
  seoTitle: "白の館 LUMINA｜無料タロット占い・恋愛占い・今日の運勢",
  seoDescription:
    "白の館 LUMINAは無料で使えるタロット占いサイト。恋愛占い（片思い・復縁・相性）、今日の運勢、結婚占い、毎月の運勢など多彩な占いメニューをご用意。白の魔女ルミナがあなたの悩みに寄り添います。",
} as const;
