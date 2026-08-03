import BasicPersonalityClient from "@/app/basic-personality/basic-personality-client";
import type { Metadata } from "next";
import { getServerProfileBirthdate } from "@/lib/profile/server-birthdate";

export const metadata: Metadata = {
  title: "基本性格診断｜生年月日で占う運命数 | 白の館 LUMINA",
  description:
    "生年月日から運命数（1〜9）を計算し、あなたの基本性格を読み解く無料診断。白の魔女ルミナが本質と個性をやさしくお伝えします。",
  alternates: { canonical: "/basic-personality" },
  openGraph: {
    title: "基本性格診断｜生年月日で占う運命数 | 白の館 LUMINA",
    description: "生年月日から運命数を計算し、あなたの基本性格を読み解く無料診断。",
    url: "/basic-personality",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function BasicPersonalityPage() {
  const serverBirthdate = await getServerProfileBirthdate();
  return <BasicPersonalityClient serverBirthdate={serverBirthdate} />;
}
