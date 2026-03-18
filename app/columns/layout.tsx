import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "羽根ペンの部屋｜恋愛・人生のコラム - ルミナ",
  description:
    "眠れない夜に、答えが見つからない日に。ルミナが白い羽根ペンで綴った言葉たちを、そっと開いてみてください。",
  openGraph: {
    title: "羽根ペンの部屋 - 白の魔女ルミナ",
    description:
      "眠れない夜に、答えが見つからない日に。ルミナが白い羽根ペンで綴った言葉たちを、そっと開いてみてください。",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "羽根ペンの部屋",
  description:
    "眠れない夜に、答えが見つからない日に。ルミナが白い羽根ペンで綴った言葉たちを、そっと開いてみてください。",
};

export default function ColumnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
