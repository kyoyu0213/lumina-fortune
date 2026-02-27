import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { PageShell } from "@/components/ui/page-shell";
import { getColumnArticle, getColumnDisplayContent } from "@/lib/columns";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ColumnDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getColumnArticle(slug);
  if (!article) {
    notFound();
  }

  // 将来は認証状態に応じて差し替える
  const isMember = true;
  const content = getColumnDisplayContent(article, isMember);

  return (
    <PageShell
      maxWidth="content"
      title={article.title}
      description={article.lead}
      backHref="/columns"
      backLabel="館の書棚へ戻る"
    >
      <GlassCard>
        <p className="text-xs font-medium tracking-wide text-[#847967]">{article.category}</p>
        <div className="mt-3 space-y-3">
          {content.preview.map((paragraph, index) => (
            <p key={`${article.slug}-preview-${index + 1}`} className="text-sm leading-relaxed text-[#544c42]">
              {paragraph}
            </p>
          ))}
        </div>
      </GlassCard>

      {content.showFull ? (
        <GlassCard className="mt-4">
          <div className="space-y-3">
            {content.full.map((paragraph, index) => (
              <p key={`${article.slug}-full-${index + 1}`} className="text-sm leading-relaxed text-[#544c42]">
                {paragraph}
              </p>
            ))}
          </div>
        </GlassCard>
      ) : null}
    </PageShell>
  );
}
