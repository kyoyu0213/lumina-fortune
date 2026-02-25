import NewFortune2026Result from "@/components/fortune-2026-result";
import type { Fortune2026Number } from "@/lib/fortune2026-templates";

type Props = {
  n: Fortune2026Number;
};

export default function Fortune2026Result({ n }: Props) {
  return <NewFortune2026Result fortuneNumber={n} />;
}
