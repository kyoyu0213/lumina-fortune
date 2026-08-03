import FortuneMonthlyClient from "@/app/fortune-monthly/fortune-monthly-client";
import type { Metadata } from "next";
import { getServerProfileBirthdate } from "@/lib/profile/server-birthdate";

export const metadata: Metadata = {
  title: "今月の運勢｜生年月日で占う月運 | 白の館 LUMINA",
  description:
    "生年月日から運命数を計算し、月ごとの運勢を占います。今月の流れと過ごし方のヒントを、白の魔女ルミナがお届けします。",
  alternates: { canonical: "/fortune-monthly" },
  openGraph: {
    title: "今月の運勢｜生年月日で占う月運 | 白の館 LUMINA",
    description: "生年月日から運命数を計算し、月ごとの運勢を占います。",
    url: "/fortune-monthly",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

type FortuneMonthlyPageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

export default async function FortuneMonthlyPage({ searchParams }: FortuneMonthlyPageProps) {
  const { edit } = await searchParams;
  const isEditMode = edit === "1" || edit === "true";
  const serverBirthdate = await getServerProfileBirthdate();

  return <FortuneMonthlyClient isEditMode={isEditMode} serverBirthdate={serverBirthdate} />;
}
