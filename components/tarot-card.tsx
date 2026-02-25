"use client"

import { CARD_BACK_IMAGE_PATH, TarotCardArtwork } from "@/components/tarot-card-artwork"
import { findTarotCardByJaName } from "@/src/data/tarotCards"

export interface TarotCardData {
  id: string
  name: string
  meaning: string
  reversed: boolean
}

interface TarotCardProps {
  card: TarotCardData
  onClick?: () => void
  className?: string
}

export function TarotCard({ card, onClick, className = "" }: TarotCardProps) {
  const imageMeta = findTarotCardByJaName(card.name)

  return (
    <div
      className={`rounded-lg border border-amber-200/50 bg-gradient-to-b from-amber-50/90 to-amber-100/50 p-4 shadow-lg backdrop-blur ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="mb-3 flex min-h-[220px] items-center justify-center overflow-hidden rounded-md border border-amber-200 bg-white/80 p-2 shadow-sm">
        <TarotCardArtwork
          imagePath={imageMeta?.imagePath ?? CARD_BACK_IMAGE_PATH}
          alt={imageMeta?.nameJa ?? card.name}
          isReversed={card.reversed}
          className="h-auto max-h-[52vh] w-auto max-w-full object-contain"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 260px"
        />
      </div>
      <p className="font-medium text-amber-900">{card.name}</p>
      <p className="mt-1 text-xs font-medium text-amber-700/80">
        {card.reversed ? "逆位置" : "正位置"}
      </p>
      <p className="mt-1 text-sm text-amber-800/80">{card.meaning}</p>
    </div>
  )
}
