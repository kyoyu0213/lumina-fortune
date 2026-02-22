"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,247,237,0.75)_40%,rgba(254,215,170,0.35)_100%)]" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-8 h-56 w-56 rounded-full bg-amber-100/60 blur-3xl" />
      <motion.div
        className="relative w-full max-w-xl rounded-3xl border border-white/70 bg-white/55 p-8 text-center shadow-[0_24px_50px_-24px_rgba(120,53,15,0.45)] backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full border-4 border-amber-100 bg-amber-50 shadow-[0_18px_30px_-14px_rgba(146,64,14,0.5)] ring-4 ring-white/70">
          <Image
            src="/lumina-icon.png"
            alt="ルミナのアイコン"
            width={144}
            height={144}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <p className="mb-1 text-xs tracking-[0.28em] text-amber-700/80">WHITE WITCH ORACLE</p>
        <h1 className="font-serif text-4xl font-bold text-amber-900 sm:text-5xl">星の導きタロット占い</h1>
        <p className="mt-4 text-lg leading-relaxed text-amber-900/80">
          心とハーブを整える占いで、今日のあなたに必要なメッセージを届けます。
          <br />
          気になることを質問してみてください。
        </p>
        <motion.button
          className="btn btn--primary mt-10"
          onClick={onStart}
        >
          占いを始める
        </motion.button>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/fortune-2026"
            className="btn btn--primary"
          >
            生年月日で占う2026年の運勢
          </Link>
        </motion.div>
        <motion.div
          className="mt-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/daily-fortune" className="btn btn--primary">
            毎日の占い
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
