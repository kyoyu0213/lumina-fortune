"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { listColumnArticles, listColumnCategories, listAllTags, type ColumnCategory, type ColumnArticle, type ColumnTag } from "@/lib/columns";

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
 * 1ページ目に全カテゴリのコラムをバランスよく配置する。
 * - 入力は最新→古い順を想定（articles[0] が最新）。
 * - 1ページ目の先頭には必ず最新コラムを置く。
 * - 残りの枠は非恋愛コラムを散らして、恋愛一色に見えないようにする。
 */
function balanceFirstPage(articles: ColumnArticle[]): ColumnArticle[] {
  if (articles.length === 0) return [];

  // 最新コラムは必ず先頭に置く
  const latest = articles[0];
  const rest = articles.slice(1);

  const nonLove = rest.filter((a) => a.category !== "失恋");
  const love = rest.filter((a) => a.category === "失恋");

  if (nonLove.length === 0) return articles;

  // 1ページ目の残り枠（最新分を除く）
  const remainingSlots = ITEMS_PER_PAGE - 1;
  const nonLoveForFirstPage = nonLove.slice(0, remainingSlots);
  const loveForFirstPage = love.slice(0, Math.max(0, remainingSlots - nonLoveForFirstPage.length));
  const loveRemaining = love.slice(loveForFirstPage.length);
  const nonLoveRemaining = nonLove.slice(nonLoveForFirstPage.length);

  const balanced: ColumnArticle[] = [latest];

  // 恋愛と非恋愛を交互に配置（非恋愛が均等に散らばるように）
  let li = 0;
  let ni = 0;
  const ratio =
    nonLoveForFirstPage.length > 0 ? loveForFirstPage.length / nonLoveForFirstPage.length : 999;

  for (let i = 0; i < remainingSlots; i++) {
    if (ni < nonLoveForFirstPage.length && (li >= loveForFirstPage.length || (li / Math.max(ni, 0.5)) >= ratio)) {
      balanced.push(nonLoveForFirstPage[ni++]);
    } else if (li < loveForFirstPage.length) {
      balanced.push(loveForFirstPage[li++]);
    } else if (ni < nonLoveForFirstPage.length) {
      balanced.push(nonLoveForFirstPage[ni++]);
    }
  }

  // 2ページ目以降: 残りを通常順で
  return [...balanced, ...nonLoveRemaining, ...loveRemaining];
}

export default function ColumnsPage() {
  const [filter, setFilter] = useState<FilterValue>("すべて");
  const [selectedTags, setSelectedTags] = useState<ColumnTag[]>([]);
  const [page, setPage] = useState(1);
  const categories = useMemo(() => listColumnCategories(), []);
  const allTags = useMemo(() => listAllTags(), []);

  // カテゴリ表示名→タグ名のマッピング（カテゴリフィルターでタグも考慮）
  const CATEGORY_TO_TAG: Record<string, ColumnTag> = {
    仕事: "仕事", 不安: "不安", 願い: "願い", 占い: "占い",
  };

  const articles = useMemo(() => {
    let raw = listColumnArticles("すべて").filter((a) => !a.hidden);
    // カテゴリフィルター適用（カテゴリ一致 OR タグにカテゴリ名を含む）
    if (filter !== "すべて") {
      const tagName = CATEGORY_TO_TAG[filter];
      raw = raw.filter((a) =>
        a.category === filter || (tagName && a.tags?.includes(tagName))
      );
    }
    // タグフィルター適用（選択タグを1つでも持っていれば表示）
    if (selectedTags.length > 0) {
      raw = raw.filter((a) => selectedTags.some((tag) => a.tags?.includes(tag)));
    }
    // フィルタが「すべて」かつタグ未選択のときだけバランス調整
    return filter === "すべて" && selectedTags.length === 0 ? balanceFirstPage(raw) : raw;
  }, [filter, selectedTags]);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginatedArticles = articles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter);
    setSelectedTags([]);
    setPage(1);
  };

  const handleTagToggle = (tag: ColumnTag) => {
    // 同じタグを再度押したら解除、違うタグなら切り替え（単一選択）
    setSelectedTags((prev) => prev.includes(tag) ? [] : [tag]);
    setFilter("すべて");
    setPage(1);
  };

  const handleClearTags = () => {
    setSelectedTags([]);
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
            tone={filter === "すべて" && selectedTags.length === 0 ? "primary" : "secondary"}
            onClick={() => handleFilterChange("すべて")}
          >
            すべて
          </LuminaButton>
          {categories.map((category) => (
            <LuminaButton
              key={category}
              type="button"
              tone={filter === category && selectedTags.length === 0 ? "primary" : "secondary"}
              onClick={() => handleFilterChange(category)}
            >
              {CATEGORY_LABELS[category] ?? category}
            </LuminaButton>
          ))}
          {/* タグフィルター（カテゴリと同じサイズ・デザインで表示） */}
          {(["カップル", "片思い", "男性心理", "復縁"] as ColumnTag[]).map((tag) => (
            <LuminaButton
              key={tag}
              type="button"
              tone={selectedTags.includes(tag) ? "primary" : "secondary"}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </LuminaButton>
          ))}
        </div>
      </GlassCard>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {paginatedArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/columns/${article.slug}`}
            className="group relative flex overflow-hidden rounded-2xl border border-[#e1d5bf]/74 bg-white/60 shadow-[0_8px_20px_-16px_rgba(82,69,53,0.18)] backdrop-blur transition hover:bg-[#fff8ed]/80"
          >
            {article.isNew ? (
              <span className="absolute right-2 top-2 z-10 inline-flex items-center rounded-full border border-white/70 bg-[linear-gradient(135deg,#e3b85a,#c1a062)] px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] text-white shadow-[0_5px_12px_-4px_rgba(150,110,40,0.7)]">
                NEW!
              </span>
            ) : null}
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
