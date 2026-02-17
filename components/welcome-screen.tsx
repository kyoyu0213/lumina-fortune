"use client"

import { motion } from "framer-motion"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        className="max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-4xl font-bold text-amber-900">
          白の魔女ルミナの占い
        </h1>
        <p className="mt-4 text-lg text-amber-800/80">
          光とハーブを操る魔女が、相棒の白いインコと共に
          <br />
          タロットであなたの運勢を占います。
        </p>
        <motion.button
          className="mt-10 rounded-full bg-amber-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-amber-700"
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          占いを始める
        </motion.button>
      </motion.div>
    </div>
  )
}
