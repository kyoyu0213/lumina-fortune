import { redirect } from "next/navigation";
import { saveMonthlyBirthAndRedirect } from "@/app/fortune-monthly/actions";
import { getValidMonthlyBirthFromCookie } from "@/lib/fortune/monthly-birth-cookie";
import { PageShell } from "@/components/ui/page-shell";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";

export default async function FortuneMonthlyPage() {
  const savedBirth = await getValidMonthlyBirthFromCookie();
  if (savedBirth) {
    redirect("/fortune-monthly/result");
  }

  return (
    <PageShell
      maxWidth="narrow"
      title="生年月日で占う毎月の運勢"
      description="生年月日から運命数を計算し、月ごとの運勢を表示します。"
      backHref="/"
      backLabel="トップへ戻る"
    >
      <GlassCard>

        <form action={saveMonthlyBirthAndRedirect} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-[#2e2a26]">
            生年月日
            <input
              type="date"
              name="birth"
              className="lumina-input mt-2 w-full rounded-lg px-4 py-2 transition"
              required
            />
          </label>

          <LuminaButton type="submit" tone="primary">
            鑑定する
          </LuminaButton>
        </form>
      </GlassCard>
    </PageShell>
  );
}
