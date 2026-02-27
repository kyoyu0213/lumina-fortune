import { GlassCard } from "@/components/ui/glass-card";
import { PageShell } from "@/components/ui/page-shell";
import { LuminaLinkButton } from "@/components/ui/button";

export default function FullMoonRitualPage() {
  return (
    <PageShell
      maxWidth="content"
      title="満月の小さな儀式"
      description="できたことを受け取り、重さをほどくための振り返りです。"
      backHref="/moon-rituals"
      backLabel="儀式一覧へ戻る"
    >
      <div className="space-y-4">
        <GlassCard>
          <h2 className="text-lg font-medium text-[#2e2a26]">振り返りの質問 5つ</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#544c42]">
            <li>1. 今月、少しでも前に進んだと感じることは何ですか？</li>
            <li>2. 無理をしていた場面は、どこにありましたか？</li>
            <li>3. 受け取ってうれしかった言葉や出来事は何ですか？</li>
            <li>4. もう背負わなくてよさそうな思い込みはありますか？</li>
            <li>5. 次の月に持っていきたい感覚をひとつ選ぶなら何ですか？</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-medium text-[#2e2a26]">手放しの一文</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#544c42]">
            「今の私に重すぎるものは、感謝とともにそっと手放します。」
          </p>
          <p className="mt-4 text-sm font-medium text-[#5f5344]">
            アファメーション: 私は満ちた光を受け取り、軽やかに次へ進めます。
          </p>
        </GlassCard>

        <LuminaLinkButton href="/calendar" className="inline-flex">
          光の暦に戻る
        </LuminaLinkButton>
      </div>
    </PageShell>
  );
}

