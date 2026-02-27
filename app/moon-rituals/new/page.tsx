import { GlassCard } from "@/components/ui/glass-card";
import { PageShell } from "@/components/ui/page-shell";
import { LuminaLinkButton } from "@/components/ui/button";

export default function NewMoonRitualPage() {
  return (
    <PageShell
      maxWidth="content"
      title="新月の小さな儀式"
      description="整える、書く、ひとこと。やさしい3ステップで願いを置く時間です。"
      backHref="/moon-rituals"
      backLabel="儀式一覧へ戻る"
    >
      <div className="space-y-4">
        <GlassCard>
          <h2 className="text-lg font-medium text-[#2e2a26]">3ステップ</h2>
          <ol className="mt-3 space-y-3 text-sm leading-relaxed text-[#544c42]">
            <li>
              1. 整える
              <br />
              深呼吸を3回して、今の気持ちをひとことで確かめます。
            </li>
            <li>
              2. 願いを書く
              <br />
              「こうなったらいいな」を、短い一文で2〜3個だけ書きます。
            </li>
            <li>
              3. ひとこと
              <br />
              最後に「今日はここまでで十分」と小さく声に出して終えます。
            </li>
          </ol>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-medium text-[#2e2a26]">願いごとの例文</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#544c42]">
            <li>・私は、毎日の生活リズムをやさしく整えられます。</li>
            <li>・私は、必要なご縁を落ち着いて受け取れます。</li>
            <li>・私は、自分の気持ちを丁寧に言葉にできます。</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-medium text-[#2e2a26]">注意点</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#544c42]">
            願いは多すぎないほうが、心に残りやすくなります。焦って完成させなくても大丈夫です。短くても、今のあなたの言葉ならそれで十分です。
          </p>
          <p className="mt-4 text-sm font-medium text-[#5f5344]">
            アファメーション: 私は静かな始まりを、やさしく育てていけます。
          </p>
        </GlassCard>

        <LuminaLinkButton href="/calendar" className="inline-flex">
          光の暦に戻る
        </LuminaLinkButton>
      </div>
    </PageShell>
  );
}

