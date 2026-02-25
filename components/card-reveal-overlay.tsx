"use client"

import { motion, AnimatePresence } from "framer-motion"
import { TarotCard, type TarotCardData } from "./tarot-card"

interface CardRevealOverlayProps {
  isOpen: boolean
  cards: TarotCardData[]
  onClose: () => void
}

export function CardRevealOverlay({
  isOpen,
  cards,
  onClose,
}: CardRevealOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-900/55 p-3 backdrop-blur-md sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto flex h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl sm:h-[calc(100dvh-2rem)]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/70 bg-white/95 px-4 py-3 backdrop-blur">
              <div>
                <p className="text-sm font-semibold text-slate-900">引いたカード</p>
                <p className="text-xs text-slate-500">3枚すべて確認できます</p>
              </div>
              <button
                className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
                onClick={onClose}
              >
                閉じる
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <TarotCard card={card} className="h-full" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
