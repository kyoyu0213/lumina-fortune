"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { listColumnArticles, listColumnCategories, type ColumnCategory, type ColumnArticle } from "@/lib/columns";

const ITEMS_PER_PAGE = 12;

type FilterValue = "すべて" | ColumnCategory;
const CATEGORY_LABELS: Record<string, string> = {
  仕事: "仕事",
  失恋: "恋愛",
  不安: "不安",
  心: "不安",
  願い: "願い",
  占い: "占い",
};

const CATEGORY_EMOJI: Record<string, string> = {
  仕事: "📖",
  失恋: "❤️",
  不安: "😰",
  心: "😰",
  願い: "✨",
  占い: "🔮",
};

function stripTitleEmoji(title: string): string {
  return title.replace(/^📖\s*/, "");
}

/**
 * 1ページ目だけ各カテゴリがバランスよく並ぶように並び替える。
 * 非恋愛カテゴリの記事を先頭付近に分散配置する。
 */
function balanceFirstPage(articles: ColumnArticle[]): ColumnArticle[] {
  const nonLove = articles.filter((a) => a.category !== "失恋");
  const love = articles.filter((a) => a.category === "失恋");

  if (nonLove.length === 0) return articles;

  // 1ページ目用: 非恋愛記事を均等に挟み込む
  const firstPageSize = ITEMS_PER_PAGE;
  const result: ColumnArticle[] = [];
  const nonLoveCopy = [...nonLove];
  const loveCopy = [...love];

  // 非恋愛記事を均等間隔で配置（2, 5, 8, 11番目あたり）
  const interval = Math.max(2, Math.floor(firstPageSize / (nonLoveCopy.length + 1)));

  let loveIdx = 0;
  let nonLoveIdx = 0;
  for (let i = 0; i < firstPageSize && (loveIdx < loveCopy.length || nonLoveIdx < nonLoveCopy.length); i++) {
    if (nonLoveIdx < nonLoveCopy.length && i > 0 && i % interval === 1) {
      result.push(nonLoveCopy[nonLoveIdx++]);
    } else if (loveIdx < loveCopy.length) {
      result.push(loveCopy[loveIdx++]);
    } else if (nonLoveIdx < nonLoveCopy.length) {
      result.push(nonLoveCopy[nonLoveIdx++]);
    }
  }

  // 残りを追加（2ページ目以降）
  while (loveIdx < loveCopy.length) result.push(loveCopy[loveIdx++]);
  while (nonLoveIdx < nonLoveCopy.length) result.push(nonLoveCopy[nonLoveIdx++]);

  return result;
}

export default function ColumnsPage() {
  const [filter, setFilter] = useState<FilterValue>("すべて");
  const [page, setPage] = useState(1);
  const categories = useMemo(() => listColumnCategories(), []);
  const articles = useMemo(() => {
    const raw = listColumnArticles(filter);
    // フィルタが「すべて」のときだけバランス調整
    return filter === "すべて" ? balanceFirstPage(raw) : raw;
  }, [filter]);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginatedArticles = articles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <PageShell
      maxWidth="wide"
      title="羽根ペンの部屋"
      description="ルミナが白い羽根ペンで綴った、あなたへの言葉たち。眠れない夜に、答えが見つからない日に、そっと開いてみてください。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard>
        <div className="flex flex-wrap items-center gap-2">
          <LuminaButton
            type="button"
            tone={filter === "すべて" ? "primary" : "secondary"}
            onClick={() => handleFilterChange("すべて")}
          >
            すべて
          </LuminaButton>
          {categories.map((category) => (
            <LuminaButton
              key={category}
              type="button"
              tone={filter === category ? "primary" : "secondary"}
              onClick={() => handleFilterChange(category)}
            >
              {CATEGORY_LABELS[category] ?? category}
            </LuminaButton>
          ))}
        </div>
      </GlassCard>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {paginatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/columns/${article.slug}`}
            className="group flex overflow-hidden rounded-2xl border border-[#e1d5bf]/74 bg-white/60 shadow-[0_8px_20px_-16px_rgba(82,69,53,0.18)] backdrop-blur transition hover:bg-[#fff8ed]/80"
          >
            {article.heroImage ? (
              <div className="relative h-auto w-[110px] shrink-0 sm:w-[130px]">
                <Image
                  src={article.heroImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="130px"
                />
                {/* 世界観に合わせたオーバーレイ */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,248,237,0.25),rgba(232,218,195,0.18))]" />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col px-4 py-3.5">
              <span className="inline-flex self-start rounded-full border border-[#d8c8ab]/82 bg-[#fff8ed]/86 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#7f725f]">
                {CATEGORY_LABELS[article.category] ?? article.category}
              </span>
              <h2 className="mt-1.5 text-[0.94rem] font-medium leading-snug text-[#2e2a26] group-hover:text-[#4a3f2f]">
                {CATEGORY_EMOJI[article.category] ? `${CATEGORY_EMOJI[article.category]} ` : ""}{stripTitleEmoji(article.title)}
              </h2>
              <p className="mt-1 line-clamp-1 text-[0.82rem] leading-relaxed text-[#6f6556]">
                {article.lead}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition ${
                p === page
                  ? "border-[#c9a96e] bg-[#c9a96e]/15 text-[#8b7340]"
                  : "border-[#e1d5bf]/60 bg-white/60 text-[#7f725f] hover:border-[#d4c4a8] hover:bg-[#fff8ed]/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </PageShell>
  );
}
