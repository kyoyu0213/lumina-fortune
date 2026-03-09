import { notFound } from "next/navigation";
import MonthlyResultClient from "@/app/fortune-monthly/result/[month]/monthly-result-client";
import { getValidMonthlyBirthFromCookie } from "@/lib/fortune/monthly-birth-cookie";
import { isFortuneMonth } from "@/lib/fortune/monthly-templates";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    month: string;
  }>;
};

export default async function FortuneMonthlyResultPage({ params }: PageProps) {
  const { month } = await params;
  const parsedMonth = Number(month);

  if (!isFortuneMonth(parsedMonth)) {
    notFound();
  }

  const birth = await getValidMonthlyBirthFromCookie();

  return <MonthlyResultClient month={parsedMonth} initialBirthdate={birth} />;
}
