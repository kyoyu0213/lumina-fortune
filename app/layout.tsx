import type { Metadata } from "next";
import { Geist_Mono, Noto_Serif_JP, Playfair_Display } from "next/font/google";
import { StarfieldBackground } from "@/components/starfield-background";
import "./globals.css";

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "白の魔女ルミナの占い - タロット占い",
  description: "光とハーブを操る白の魔女ルミナが、相棒の白いインコと共にタロットであなたの運勢を占います。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJp.variable} ${playfairDisplay.variable} ${geistMono.variable} relative antialiased text-[#2e2a26]`}>
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/main_back.png')] bg-cover bg-center bg-no-repeat opacity-62" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,246,0.34),transparent_48%),radial-gradient(circle_at_82%_20%,rgba(255,240,213,0.22),transparent_50%),linear-gradient(180deg,rgba(252,248,239,0.44),rgba(246,241,231,0.46))]" />
          <StarfieldBackground className="opacity-30" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
