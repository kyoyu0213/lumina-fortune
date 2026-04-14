"use client";

import Image from "next/image";
import { useEffect } from "react";
import CoconalaWidget from "@/components/coconala-widget";
import { GlassCard } from "@/components/ui/glass-card";
import { PageShell } from "@/components/ui/page-shell";
import { trackEvent } from "@/lib/track-event";

export default function ConsultationPage() {
  useEffect(() => {
    void trackEvent({ event_name: "page_view", page: "/consultation" });
  }, []);

  return (
    <PageShell
      maxWidth="content"
      title="個人鑑定のご依頼"
      description="いま抱えている悩みや違和感を、そのまま書いてください。"
      backHref="/"
      backLabel="トップへ戻る"
      className="font-serif"
    >
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-[#e2d6c0]/60 shadow-[0_12px_32px_-12px_rgba(82,69,53,0.18)]">
        <Image
          src="/gazou/tarot.png"
          alt="タロット占いのイメージ"
          width={1200}
          height={600}
          className="h-auto w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-white/25" />
      </div>
      <GlassCard className="rounded-3xl">
        <div className="space-y-4">
          <section className="relative overflow-hidden rounded-2xl border border-[#e1d5bf]/75 bg-[linear-gradient(160deg,rgba(255,251,245,0.92),rgba(248,241,229,0.88))] p-4">
            <div className="pointer-events-none absolute -right-6 -top-8 hidden md:block">
              <Image
                src="/gazou/stamp.png"
                alt=""
                aria-hidden
                width={140}
                height={140}
                className="rotate-[14deg] opacity-30"
              />
            </div>
            <h2 className="text-base font-medium text-[#2e2a26]">🌙 ルミナに相談する</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#544c42]">
              <p>
                もし今、心の中で答えが見つからず静かに迷っていることがあるなら、その想いをルミナに預けてみてください。
              </p>
              <p>
                白の館で引かれたカードを通して、あなたの心の流れを丁寧に読み解き、言葉としてお届けします。
              </p>
              <p>焦らなくて大丈夫です。光はいつも、あなたの中にあります。</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e1d5bf]/75 bg-white/65 p-4">
            <h2 className="text-base font-medium text-[#2e2a26]">🌙 こんなご相談が届いています</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
              <div className="space-y-3 text-sm leading-relaxed text-[#544c42]">
                <p>
                  20代女性
                  <br />
                  付き合っている彼と喧嘩をしてしまい、連絡が途絶えています。
                  <br />
                  仲直りしたいのですが、今どんな言葉をかけるのがよいのでしょうか。
                </p>
                <p>
                  30代女性
                  <br />
                  今の仕事を続けるか、転職するかで迷っています。
                  <br />
                  新しい道へ進むタイミングなのかを知りたいです。
                </p>
                <p>
                  40代女性
                  <br />
                  職場の人間関係に疲れてしまいました。
                  <br />
                  どう接すれば気持ちが楽になるでしょうか。
                </p>
                <p>
                  20代女性
                  <br />
                  これからの人生で、どんな方向に進めばよいのか迷っています。
                  <br />
                  自分に合う流れを知りたいです。
                </p>
                <p>
                  30代男性
                  <br />
                  仕事は順調ですが、このまま今の道を進んでよいのか迷いがあります。
                  <br />
                  これからの人生の流れや、自分に合う選択を知りたいです。
                </p>
                <p>このようなご相談を、ルミナがカードを通して丁寧に読み解きます。</p>
              </div>
              <div className="mx-auto w-full max-w-[280px] rounded-xl border border-[#e1d5bf]/70 bg-white/80 p-2">
                <Image
                  src="/gazou/kanteisyo.png"
                  alt="個人鑑定の鑑定結果イメージ"
                  width={1200}
                  height={1600}
                  className="h-auto w-full rounded-lg"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e1d5bf]/75 bg-[linear-gradient(160deg,rgba(255,249,241,0.9),rgba(249,240,225,0.86))] p-4">
            <h2 className="text-base font-medium text-[#2e2a26]">🌙 個人鑑定について</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#544c42]">
              <p>
                ご依頼を受け取ってから、通常 2〜3営業日ほどで指定のメールアドレスへ鑑定結果をお届けします。
              </p>
              <p>
                カードからの導きを丁寧に読み解くため、ご相談内容によっては少し詳しくお話を伺うメールをお送りする場合があります。
              </p>
              <p>個人鑑定は 1件 3,000円です。</p>
              <p>ルミナは、あなたの心の流れを静かに読み解き、言葉としてお届けします。</p>
              <p className="text-xs text-[#6f6355]">
                ※ 鑑定方法は命占（宿曜／運命数）と卜占（タロット／場合によりルノルマン）です。ご相談内容に合わせてルミナが適宜鑑定方法を選びます。
              </p>
              <p className="text-xs text-[#6f6355]">※ ご相談内容はすべて秘密として大切に扱います。</p>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-2xl border border-[#e1d5bf]/75 bg-[linear-gradient(160deg,rgba(255,251,245,0.92),rgba(248,241,229,0.88))] p-4">
            <div className="pointer-events-none absolute -right-5 -top-6">
              <Image
                src="/gazou/stamp.png"
                alt=""
                aria-hidden
                width={108}
                height={108}
                className="rotate-[8deg] opacity-35"
              />
            </div>
            <h2 className="text-base font-medium text-[#2e2a26]">🌙 個人鑑定を依頼する</h2>
            <p className="mt-2 pr-20 text-xs leading-relaxed text-[#6a6054]">
              お申し込みはココナラのページへ移動して進められます。内容は白の館で大切に扱います。
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#e7dcc7]/80 bg-white/90 p-3 shadow-[0_12px_30px_-24px_rgba(82,69,53,0.28)]">
              <div className="flex justify-center">
                <CoconalaWidget />
              </div>
            </div>
          </section>

          <section id="limits" className="rounded-2xl border border-[#e1d5bf]/75 bg-[linear-gradient(160deg,rgba(255,249,241,0.9),rgba(249,240,225,0.86))] p-4">
            <h2 className="text-base font-medium text-[#2e2a26]">🌿 白の館の鑑定について</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#544c42]">
              <p>ルミナのカードは、未来を決めるためのものではありません。</p>
              <p>人の心にある光を思い出すための静かな道しるべです。</p>
              <p>そのため次のような内容については、白の館ではお答えしていません。</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>生死に関わること</li>
                <li>子宝の時期</li>
                <li>犯人探しや浮気の特定</li>
                <li>他人の不幸を願う内容</li>
                <li>病気の診断</li>
                <li>合否・勝敗・ギャンブルなどの当てもの</li>
              </ul>
              <p>これらはカードの役目を越えるものだからです。</p>
              <p>
                ルミナは未来を決める存在ではなく、あなたが自分の道を見つけるための灯りを渡す存在です。
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e1d5bf]/75 bg-white/70 p-4">
            <h2 className="text-base font-medium text-[#2e2a26]">🌙 白の館に届いた鑑定の記録</h2>
            <p className="mt-2 text-sm font-medium text-[#6a6054]">20代女性｜別れた彼との復縁の可能性について</p>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#544c42]">
              <p>白の館には、恋愛や仕事、人との関係について さまざまなご相談が届きます。</p>
              <p>ここでは、ルミナがカードを通して読み解いた 鑑定書の一例をご覧いただけます。</p>
              <p>実際にお届けする鑑定の雰囲気を、静かな紙面の形で受け取ってみてください。</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#7a6f61]">
              ※鑑定例ではルノルマンカードを使用していますが、タロットでの鑑定がメインです。
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="rounded-xl border border-[#e1d5bf]/70 bg-[rgba(255,252,247,0.86)] p-3">
                <p className="text-sm font-medium text-[#2e2a26]">静かな紙面で読む鑑定書</p>
                <p className="mt-1 text-xs leading-relaxed text-[#6a6054]">
                  落ち着いた時間の中でゆっくり言葉を受け取りたい方へ。
                  <br />
                  大きな画面で読みやすいよう整えた白の館の鑑定書です。
                </p>
                <div className="mt-3 overflow-hidden rounded-lg border border-[#e7dcc7]/80 bg-white/90">
                  <iframe
                    src="/PDF/1.pdf#view=FitH"
                    title="PCで見る方向け鑑定例PDF"
                    className="h-[420px] w-full"
                  />
                </div>
                <a
                  href="/PDF/1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-[#6f6556] underline decoration-[#b7a98f] underline-offset-4"
                >
                  大きな紙面をひらく
                </a>
              </div>

              <div className="rounded-xl border border-[#e1d5bf]/70 bg-[rgba(255,252,247,0.86)] p-3">
                <p className="text-sm font-medium text-[#2e2a26]">手のひらで受け取る鑑定書</p>
                <p className="mt-1 text-xs leading-relaxed text-[#6a6054]">
                  日々の合間にも読みやすいよう、やさしく整えた紙面です。
                  <br />
                  スマートフォンでもルミナの言葉を静かに受け取れます。
                </p>
                <div className="mt-3 overflow-hidden rounded-lg border border-[#e7dcc7]/80 bg-white/90">
                  <iframe
                    src="/PDF/2.pdf#view=FitH"
                    title="スマホで見る方向け鑑定例PDF"
                    className="h-[420px] w-full"
                  />
                </div>
                <a
                  href="/PDF/2.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-[#6f6556] underline decoration-[#b7a98f] underline-offset-4"
                >
                  手のひらの紙面をひらく
                </a>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-[#e7dcc7]/70 bg-[rgba(255,252,247,0.72)] p-3 text-sm leading-relaxed text-[#544c42]">
              <p>
                これは白の館に残された鑑定の記録のひとつです。
                <br />
                あなたの物語も、カードは静かに映し出します。
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e1d5bf]/75 bg-white/70 p-4">
            <h2 className="text-base font-medium text-[#2e2a26]">🌙 白の館に届いた声</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 text-sm leading-relaxed text-[#544c42] md:grid-cols-3">
              <div className="flex min-h-[320px] flex-col rounded-xl border border-[#e1d5bf]/60 bg-[rgba(255,252,247,0.78)] p-4">
                <p className="font-medium text-[#2e2a26]">30代女性 / 恋愛相談</p>
                <p className="mt-2 whitespace-pre-line">
                  {`ルミナさんの鑑定を読んで、
自分の気持ちを落ち着いて見つめ直すことができました。

相手の気持ちを決めつけるのではなく、
自分の心を整える大切さに気づかせてもらえた気がします。

言葉がとても優しくて、
読んだあと少し安心できました。`}
                </p>
              </div>

              <div className="flex min-h-[320px] flex-col rounded-xl border border-[#e1d5bf]/60 bg-[rgba(255,252,247,0.78)] p-4">
                <p className="font-medium text-[#2e2a26]">20代女性 / 人生相談</p>
                <p className="mt-2 whitespace-pre-line">
                  {`今の仕事を続けるべきか迷っていたのですが、
鑑定の言葉を読んで焦らなくていいんだと思えました。

未来を断定するのではなく、
「今の自分にできること」を教えてもらえた感じです。`}
                </p>
              </div>

              <div className="flex min-h-[320px] flex-col rounded-xl border border-[#e1d5bf]/60 bg-[rgba(255,252,247,0.78)] p-4">
                <p className="font-medium text-[#2e2a26]">40代女性 / 人間関係</p>
                <p className="mt-2 whitespace-pre-line">
                  {`人間関係で悩んでいたのですが、
カードの意味を丁寧に説明していただき、
気持ちがとても軽くなりました。

文章が温かくて、
何度も読み返しています。`}
                </p>
              </div>
            </div>
          </section>
        </div>
      </GlassCard>
    </PageShell>
  );
}
