import MarriageTimingClient from "@/app/marriage-timing/marriage-timing-client";
import type { Metadata } from "next";
import { getServerProfileBirthdate } from "@/lib/profile/server-birthdate";

export const metadata: Metadata = {
  title: "結婚占い｜婚期を視るタロット | 白の館 LUMINA",
  description:
    "運命数と3年の個人年数から、ご縁が深まりやすい時期と愛が形になる流れを読み解く結婚占い。白の魔女ルミナがあなたの婚期をやさしくお伝えします。",
  alternates: { canonical: "/marriage-timing" },
  openGraph: {
    title: "結婚占い｜婚期を視るタロット | 白の館 LUMINA",
    description: "運命数と個人年数から、ご縁が深まりやすい時期を読み解く結婚占い。",
    url: "/marriage-timing",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function MarriageTimingPage() {
  const serverBirthdate = await getServerProfileBirthdate().catch(() => null);
  return <MarriageTimingClient serverBirthdate={serverBirthdate} />;
}
