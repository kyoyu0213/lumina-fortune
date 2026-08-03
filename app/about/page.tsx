import type { Metadata } from "next";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { PageShell } from "@/components/ui/page-shell";

const lastRevisedAt = "2026年7月28日";

type AboutSection = {
  title: string;
  body?: string[];
  items?: string[];
};

const sections: AboutSection[] = [
  {
    title: "サービスについて",
    body: [
      "「白の館 LUMINA」は、占い師・白の魔女ルミナが監修・運営するタロット占いサービスです。ユーザーの質問やお悩みに対し、白の魔女ルミナの監修のもとで育てられたAI占い師がタロットカードを用いた鑑定をお届けします。恋愛占い（片思い・復縁・相性）、今日の運勢、結婚占い、毎月の運勢など、無料でご利用いただける多彩な占いメニューをご用意しています。",
    ],
  },
  {
    title: "運営者",
    body: [
      "白の館 LUMINA 運営者（監修・運営：白の魔女ルミナ）",
      "現役の占い師として、鑑定文のチェックおよびAI占い師「白の魔女ルミナ」の教育・監修を行っています。",
    ],
  },
  {
    title: "監修体制",
    body: [
      "本サービスの鑑定は、現役占い師である白の魔女ルミナの知識・経験・感性をもとに監修・指導を受けたAIによって提供されます。鑑定スタイルや言葉づかい、キャラクター設定に至るまで、占い師本人が監修しています。",
    ],
  },
  {
    title: "提供しているサービス",
    body: ["白の館 LUMINAでは、次のサービスを提供しています。"],
    items: [
      "AI占い師「白の魔女ルミナ」による無料タロット占い（恋愛占い・今日の運勢・各種診断など）",
      "白の魔女ルミナ本人による本格的な個人鑑定。個人鑑定は外部プラットフォーム（ココナラ等）を通じて受付・決済を行い、鑑定結果はPDFにて納品いたします。",
      "コラム「羽根ペンの部屋」など、恋愛や人生に寄り添う読み物の掲載",
    ],
  },
  {
    title: "鑑定の性質について",
    body: [
      "本サービスの鑑定結果は、占いという性質上、科学的根拠に基づくものではなく、的中を保証するものではありません。医療・法律・金融・進路・人間関係などの重大な判断の唯一の根拠として利用することはお控えください。重要な意思決定においては、各分野の専門家にもご相談されることをおすすめします。",
    ],
  },
  {
    title: "お問い合わせ",
    body: [
      "ご質問・ご感想・不具合のご連絡などは、お問い合わせフォームよりお寄せください。個人鑑定のお申し込みは個人鑑定のご依頼ページから、白の魔女ルミナへのメッセージはルミナへの手紙からお送りいただけます。",
    ],
  },
];

export const metadata: Metadata = {
  title: "運営者情報 | 白の館 LUMINA",
  description:
    "白の館 LUMINAの運営者情報。現役占い師・白の魔女ルミナが監修・運営するタロット占いサービスの概要、監修体制、提供サービス、お問い合わせについてご案内します。",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "運営者情報 | 白の館 LUMINA",
    description:
      "現役占い師・白の魔女ルミナが監修・運営するタロット占いサービス「白の館 LUMINA」の運営者情報。",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <PageShell
      title="運営者情報"
      description="白の館 LUMINAの運営体制と、サービスについてご案内します。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard className="space-y-6 text-sm leading-relaxed text-[#544c42]">
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8a7a66]">About</p>
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-[#2e2a26]">白の館 LUMINA</h2>
            <p className="text-base font-medium text-[#2e2a26]">運営者情報</p>
            <p>最終更新日：{lastRevisedAt}</p>
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="space-y-3 border-t border-[#e7dcc7]/70 pt-5">
            <h3 className="text-base font-medium text-[#2e2a26]">{section.title}</h3>
            {section.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul className="list-disc space-y-2 pl-5">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="space-y-2 border-t border-[#e7dcc7]/70 pt-5">
          <h3 className="text-base font-medium text-[#2e2a26]">関連ページ</h3>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/terms" className="underline decoration-[#b7a98f] underline-offset-4">
              利用規約
            </Link>
            <Link href="/privacy" className="underline decoration-[#b7a98f] underline-offset-4">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="underline decoration-[#b7a98f] underline-offset-4">
              お問い合わせ
            </Link>
            <Link href="/consultation" className="underline decoration-[#b7a98f] underline-offset-4">
              個人鑑定のご依頼
            </Link>
          </p>
        </section>

        <section className="space-y-2 border-t border-[#e7dcc7]/70 pt-5 text-xs text-[#6f6355]">
          <p>最終更新日：{lastRevisedAt}</p>
          <p>白の館 LUMINA 運営者</p>
        </section>
      </GlassCard>
    </PageShell>
  );
}
