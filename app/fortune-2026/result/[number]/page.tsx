import { notFound } from "next/navigation";
import Fortune2026Result from "@/components/fortune-2026-result";
import { isFortune2026Number } from "@/lib/fortune2026-templates";

type PageProps = {
  params: Promise<{
    number: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { number } = await params;
  const parsed = Number(number);

  if (!isFortune2026Number(parsed)) {
    notFound();
  }

  return <Fortune2026Result fortuneNumber={parsed} />;
}
