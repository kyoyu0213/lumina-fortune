import CalendarClient from "@/app/calendar/calendar-client";
import type { Metadata } from "next";
import { getServerProfileBirthdate } from "@/lib/profile/server-birthdate";

export const metadata: Metadata = {
  title: "光の暦｜月の満ち欠けと開運カレンダー | 白の館 LUMINA",
  description:
    "月の流れに合わせて心を静かに整えるための暦。新月・満月のリズムに寄り添い、日々の過ごし方をやさしくご案内します。",
  alternates: { canonical: "/calendar" },
  openGraph: {
    title: "光の暦｜月の満ち欠けと開運カレンダー | 白の館 LUMINA",
    description: "月の流れに合わせて心を整えるための暦。新月・満月のリズムに寄り添います。",
    url: "/calendar",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const serverBirthdate = await getServerProfileBirthdate();
  return <CalendarClient serverBirthdate={serverBirthdate} />;
}
