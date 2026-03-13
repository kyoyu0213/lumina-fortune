import MarriageTimingClient from "@/app/marriage-timing/marriage-timing-client";
import { getServerProfileBirthdate } from "@/lib/profile/server-birthdate";

export const dynamic = "force-dynamic";

export default async function MarriageTimingPage() {
  const serverBirthdate = await getServerProfileBirthdate().catch(() => null);
  return <MarriageTimingClient serverBirthdate={serverBirthdate} />;
}
