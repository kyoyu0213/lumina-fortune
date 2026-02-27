import type { FortuneNumber } from "@/lib/fortune/types"

type FortuneNumberBadgeProps = {
  number: FortuneNumber
}

export function FortuneNumberBadge({ number }: FortuneNumberBadgeProps) {
  return (
    <div className="relative mt-2 inline-flex h-[88px] w-[88px] items-center justify-center rounded-full sm:h-[96px] sm:w-[96px]">
      <div className="absolute inset-0 rounded-full bg-[#efe5cf]/28 blur-md" aria-hidden="true" />
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-white/92 to-[#f7f1e4]/86" aria-hidden="true" />
      <div
        className="absolute inset-0 rounded-full ring-1 ring-[#d8c8ab]/78 shadow-[0_10px_22px_-18px_rgba(82,69,53,0.28),inset_0_1px_0_rgba(255,255,255,0.76)]"
        aria-hidden="true"
      />
      <span className="relative text-3xl font-medium text-[#2e2a26] sm:text-4xl">{number}</span>
    </div>
  )
}
