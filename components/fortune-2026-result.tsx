"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { getFortune2026Template } from "@/lib/fortune2026-templates";

const BIRTHDATE_KEY = "fortune2026_birthdate";
const DESTINY_KEY = "fortune2026_destinyNumber";

type Props = {
  fortuneNumber: number;
};

export default function Fortune2026Result({ fortuneNumber }: Props) {
  const router = useRouter();
  const data = getFortune2026Template(fortuneNumber);

  if (!data) {
    return null;
  }

  const resultTitleName = data.introTitle.replace(/のあなたへ。$/, "");

  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(BIRTHDATE_KEY);
      localStorage.removeItem(DESTINY_KEY);
    }
    router.push("/fortune-2026");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 px-4 py-8 text-amber-950 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-amber-200/80 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-sm text-amber-700 underline-offset-4 hover:underline">
            トップへ戻る
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-full border border-amber-300 bg-white px-4 py-2 text-sm text-amber-900 transition hover:bg-amber-50 sm:w-auto"
          >
            別の生年月日で占い直す
          </button>
        </div>

        <header className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-rose-50 p-5">
          <p className="text-xs font-semibold tracking-[0.12em] text-amber-700">NUMEROLOGY 2026</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{resultTitleName}の2026年鑑定結果</h1>
        </header>

        <div className="mt-8 space-y-8">
          <section className="rounded-2xl border border-amber-100 bg-white/70 p-5">
            <SectionHeading>🕊 導入</SectionHeading>
            <h2 className="mt-3 text-lg font-semibold text-amber-950 sm:text-xl">{data.introTitle}</h2>
            <div className="mt-3">
              <MarkdownText text={data.introBody} />
            </div>
          </section>

          <section className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-5 shadow-sm sm:p-6">
            <SectionHeading>🌟 全体テーマ</SectionHeading>
            <p className="mt-4 text-xl font-bold leading-relaxed text-amber-950 sm:text-2xl">{data.themeCatch}</p>
          </section>

          <section className="rounded-2xl border border-amber-100 bg-white/70 p-5">
            <SectionHeading>⏳ 上半期・下半期</SectionHeading>
            <TwoColumnGrid className="mt-4">
              <InfoCard title="上半期">
                <MarkdownText text={data.firstHalf} />
              </InfoCard>
              <InfoCard title="下半期">
                <MarkdownText text={data.secondHalf} />
              </InfoCard>
            </TwoColumnGrid>
          </section>

          <section className="rounded-2xl border border-amber-100 bg-white/70 p-5">
            <SectionHeading>💗 恋愛運</SectionHeading>
            <TwoColumnGrid className="mt-4">
              <InfoCard title="シングル" description="出会い・進展・心の整え方のヒント">
                <MarkdownText text={data.loveSingle} />
              </InfoCard>
              <InfoCard title="パートナーあり" description="関係を育てる対話と行動のヒント">
                <MarkdownText text={data.lovePartner} />
              </InfoCard>
            </TwoColumnGrid>
          </section>

          <TextSection title="💼 仕事・学業運" body={data.work} />
          <TextSection title="🤝 人間関係" body={data.relations} />

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <SectionHeading>🍀 開運パート</SectionHeading>

            <div className="mt-4 rounded-xl border border-emerald-100 bg-white/80 p-4">
              <h3 className="text-sm font-semibold text-emerald-800">■ 開運アクション</h3>
              <ul className="mt-3 space-y-3">
                {data.actions.slice(0, 3).map((action, index) => (
                  <li
                    key={`${data.fortuneNumber}-action-${index + 1}`}
                    className="rounded-lg border border-emerald-100 bg-emerald-50/40 px-4 py-3"
                  >
                    <p className="text-xs font-semibold tracking-wide text-emerald-700">
                      {index === 0 ? "・色" : index === 1 ? "・習慣" : "・小さな挑戦"}
                    </p>
                    <div className="mt-1">
                      <MarkdownText text={action} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-xl border border-emerald-100 bg-white/80 p-4">
              <h3 className="text-sm font-semibold text-emerald-800">■ 開運場所</h3>
              <ul className="mt-3 space-y-2">
                {data.powerSpots.slice(0, 3).map((spot, index) => (
                  <li
                    key={`${data.fortuneNumber}-spot-${index + 1}`}
                    className="rounded-lg border border-emerald-100 bg-emerald-50/40 px-4 py-3"
                  >
                    <p className="text-xs font-semibold tracking-wide text-emerald-700">・場所{index + 1}</p>
                    <div className="mt-1">
                      <MarkdownText text={spot} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-amber-100 bg-white/70 p-5">
            <SectionHeading>🔑 キーワード</SectionHeading>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.keywords.slice(0, 3).map((keyword, index) => (
                <span
                  key={`${data.fortuneNumber}-keyword-${index + 1}`}
                  className="rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-900"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
            <SectionHeading>✨ ルミナからの祝福</SectionHeading>
            <div className="mt-4 rounded-xl border border-rose-100 bg-white/80 p-4">
              <MarkdownText text={data.blessing} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-base font-semibold tracking-wide text-amber-900">{children}</h2>;
}

function TextSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border border-amber-100 bg-white/70 p-5">
      <SectionHeading>{title}</SectionHeading>
      <div className="mt-4">
        <MarkdownText text={body} />
      </div>
    </section>
  );
}

function TwoColumnGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid gap-4 md:grid-cols-2 ${className}`.trim()}>{children}</div>;
}

function InfoCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
      <h3 className="text-sm font-semibold text-amber-900">{title}</h3>
      {description ? <p className="mt-1 text-xs leading-relaxed text-amber-800/80">{description}</p> : null}
      <div className="mt-3">
        {children}
      </div>
    </div>
  );
}

function MarkdownText({ text }: { text: string }) {
  const blocks = parseMarkdownLikeBlocks(text);

  return (
    <div className="space-y-3 leading-relaxed text-amber-950/90">
      {blocks.map((block, index) => {
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="whitespace-pre-wrap">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="whitespace-pre-wrap">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

type MarkdownBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function parseMarkdownLikeBlocks(text: string): MarkdownBlock[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join("\n") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const bulletMatch = line.match(/^\s*[-*]\s+(.+)$/);

    if (bulletMatch) {
      flushParagraph();
      list.push(bulletMatch[1]);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraph.push(rawLine);
  }

  flushParagraph();
  flushList();

  return blocks;
}
