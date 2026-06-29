import type { Metadata } from "next";
import { Suspense } from "react";
import { getOrCreateDailyWhisper } from "@/lib/generateDailyWhisper";
import { getServerProfileBirthdate } from "@/lib/profile/server-birthdate";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

// canonical / og:url はトップページ自身に設定する。
// （ルート layout に置くと canonical を持たない全子ページに "/" が継承され、
//  それらがトップの複製とみなされてしまうため。）
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

const FALLBACK_DAILY_WHISPER = {
  message: "薄明かりが背を押す日",
};

export default async function Page() {
  const dailyWhisper = await getOrCreateDailyWhisper().catch(() => FALLBACK_DAILY_WHISPER);
  const serverBirthdate = await getServerProfileBirthdate().catch(() => null);

  return (
    <Suspense fallback={null}>
      <HomeClient initialDailyWhisper={dailyWhisper?.message ?? FALLBACK_DAILY_WHISPER.message} serverBirthdate={serverBirthdate ?? null} />
    </Suspense>
  );
}
