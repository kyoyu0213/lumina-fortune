"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface WelcomeScreenProps {
  onStart: () => void
}

const menuItems = [
  {
    title: "基本性格",
    description: "生年月日から導かれる運命数で、あなたの基本となる性質を読み解きます。",
    href: "/basic-personality",
    ctaLabel: "占う",
  },
  {
    title: "2026年の運勢",
    description: "生年月日をもとに、2026年の流れとテーマをやさしく紐解きます。",
    href: "/fortune-2026",
    ctaLabel: "読む",
  },
  {
    title: "毎月の運勢",
    description: "今月のテーマと心の整え方を、静かな言葉でお届けします。",
    href: "/fortune-monthly",
    ctaLabel: "読む",
  },
  {
    title: "毎日の占い",
    description: "今日という一日に寄り添う、小さなヒントをお伝えします。",
    href: "/daily-fortune",
    ctaLabel: "見る",
  },
  {
    title: "光の待ち受けお守り",
    description: "今の気持ちに合わせて選べる、ルミナの光のお守りです。",
    href: "/lucky-wallpapers",
    ctaLabel: "受け取る",
  },
  {
    title: "光のワーク",
    description: "心を整える小さな実践で、日常に静かな光を取り戻します。",
    href: "/light-work",
    ctaLabel: "はじめる",
  },
  {
    title: "光の暦",
    description: "月の流れに合わせて、今日の心をやさしく整える暦です。",
    href: "/calendar",
    ctaLabel: "ひらく",
  },
] as const

const recommendedLinks = [
  {
    label: "はじめて",
    title: "基本性格",
    href: "/basic-personality",
  },
  {
    label: "今年",
    title: "2026年の運勢",
    href: "/fortune-2026",
  },
  {
    label: "今すぐ",
    title: "今日の運勢",
    href: "/daily-fortune",
  },
] as const

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(255,255,247,0.2),transparent_46%),radial-gradient(circle_at_78%_14%,rgba(246,233,202,0.16),transparent_50%),radial-gradient(circle_at_36%_74%,rgba(223,242,226,0.12),transparent_56%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[#fffdf5]/28 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 right-6 h-56 w-56 rounded-full bg-[#efe5cf]/18 blur-3xl" />

      <section className="relative mx-auto flex min-h-[72vh] w-full max-w-4xl items-center justify-center">
        <motion.div
          className="lumina-shell relative mx-auto flex w-full max-w-2xl flex-col items-center rounded-3xl border border-[#e4dbc9]/85 bg-[linear-gradient(155deg,rgba(255,255,251,0.88),rgba(248,242,231,0.82))] px-5 py-8 text-center shadow-[0_18px_34px_-26px_rgba(82,69,53,0.24),0_8px_16px_-14px_rgba(82,69,53,0.16)] sm:px-8 sm:py-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-[#f2ebde]/85 bg-[#fffdf8]/85 shadow-[0_10px_20px_-16px_rgba(82,69,53,0.22)] ring-2 ring-[#ece2ce]/65 sm:h-32 sm:w-32">
            <Image
              src="/lumina-icon.png"
              alt="ルミナのアイコン"
              width={128}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <p className="mb-2 text-xs tracking-[0.24em] text-[#766e62]">WHITE WITCH TAROT</p>
          <h1 className="font-[var(--font-playfair-display)] text-4xl font-normal tracking-[0.16em] text-[#2e2a26] sm:text-5xl">LUMINA</h1>
          <p className="mt-3 text-base font-normal leading-relaxed text-[#544c42] sm:text-lg">光と静寂の占い</p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/basic-personality"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#aaa0bc]/78 bg-[#958cad] px-5 text-base font-medium text-white shadow-[0_7px_14px_-12px_rgba(80,67,102,0.32)] transition hover:bg-[#9f96b7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a39ab9] focus-visible:ring-offset-2 sm:w-auto sm:min-w-56"
            >
              生年月日で占う（基本性格）
            </Link>
            <Link
              href="/daily-fortune"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#c3b59f]/70 bg-[#fcf8ef]/80 px-5 text-base font-medium text-[#6f6556] shadow-[0_7px_14px_-12px_rgba(96,80,60,0.16)] transition hover:bg-[#f9f3e7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b59f] focus-visible:ring-offset-2 sm:w-auto sm:min-w-56"
            >
              今日の運勢を見る
            </Link>
          </div>
          <p className="mt-5 whitespace-pre-line text-sm font-normal leading-relaxed text-[#665d51]">
            がんばりすぎた心に、静かな光を。{"\n"}LUMINAの占いは、あなたを整えるための言葉です。
          </p>
        </motion.div>
      </section>

      <section className="relative mx-auto -mt-2 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {recommendedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-[#e1d5be]/75 bg-[#fcf8ee]/78 p-4 shadow-[0_10px_20px_-20px_rgba(82,69,53,0.2)] backdrop-blur transition hover:border-[#d8c8ab]/82 hover:shadow-[0_12px_24px_-20px_rgba(182,161,126,0.28)]"
            >
              <p className="text-xs font-medium tracking-[0.14em] text-[#847967]">{item.label}</p>
              <div className="mt-1 flex items-center justify-between gap-3">
                <p className="text-base font-medium text-[#2e2a26]">{item.title}</p>
                <span className="text-sm text-[#7d6d5a] transition group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </section>

      <section className="relative mx-auto mt-6 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="group flex h-full flex-col rounded-2xl border border-[#e1d5bf]/75 bg-[linear-gradient(160deg,rgba(255,252,246,0.88),rgba(248,242,231,0.82))] p-5 shadow-[0_12px_24px_-20px_rgba(82,69,53,0.22)] backdrop-blur transition hover:border-[#d8c8ab]/82 hover:shadow-[0_14px_26px_-20px_rgba(182,161,126,0.3)] sm:p-6">
            <h2 className="text-lg font-medium text-[#2e2a26]">光の導きタロット占い</h2>
            <p className="mt-2 text-sm font-normal leading-relaxed text-[#544c42]">
              ルミナとの対話を通して、いまのあなたに必要なメッセージをお届けします。
            </p>
            <div className="mt-auto flex justify-end pt-4">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#baa98d]/72 bg-[#fdf8ee] px-4 text-base font-medium text-[#6f6556] transition hover:bg-[#f9f3e7]"
              >
                引く
              </button>
            </div>
          </div>

          {menuItems.map((item) => (
            <div
              key={item.href}
              className="group flex h-full flex-col rounded-2xl border border-[#e1d5bf]/75 bg-[linear-gradient(160deg,rgba(255,252,246,0.88),rgba(248,242,231,0.82))] p-5 shadow-[0_12px_24px_-20px_rgba(82,69,53,0.22)] backdrop-blur transition hover:border-[#d8c8ab]/82 hover:shadow-[0_14px_26px_-20px_rgba(182,161,126,0.3)] sm:p-6"
            >
              <h2 className="text-lg font-medium text-[#2e2a26]">{item.title}</h2>
              <p className="mt-2 text-sm font-normal leading-relaxed text-[#544c42]">{item.description}</p>
              <div className="mt-auto flex justify-end pt-4">
                <Link
                  href={item.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#baa98d]/72 bg-[#fdf8ee] px-4 text-base font-medium text-[#6f6556] transition hover:bg-[#f9f3e7]"
                >
                  {item.ctaLabel}
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="relative mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-[#ded3bf]/68 bg-[linear-gradient(160deg,rgba(248,244,236,0.9),rgba(241,235,223,0.84))] px-5 py-8 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-base font-normal leading-relaxed text-[#544c42]">
            ここで過ごした時間が、あなたの静かな支えになりますように。
          </p>
        </motion.div>
      </section>
    </div>
  )
}
