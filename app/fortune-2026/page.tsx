import Fortune2026Client from "@/app/fortune-2026/fortune-2026-client";
import type { Metadata } from "next";
import { getServerProfileBirthdate } from "@/lib/profile/server-birthdate";

export const metadata: Metadata = {
  title: "2026年の運勢｜生年月日で占う | 白の館 LUMINA",
  description:
    "生年月日から運命数を計算し、2026年の運勢を占います。恋愛・仕事・人間関係の一年の流れを、白の魔女ルミナがやさしく読み解きます。",
  alternates: { canonical: "/fortune-2026" },
  openGraph: {
    title: "2026年の運勢｜生年月日で占う | 白の館 LUMINA",
    description: "生年月日から運命数を計算し、2026年の運勢を占います。",
    url: "/fortune-2026",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function Fortune2026Page() {
  const serverBirthdate = await getServerProfileBirthdate();
  return <Fortune2026Client serverBirthdate={serverBirthdate} />;
}
