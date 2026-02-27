"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface ChatHeaderProps {
  onBackToTop?: () => void
}

export function ChatHeader({ onBackToTop }: ChatHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    onBackToTop?.()
    router.push("/")
  }

  return (
    <header className="relative z-20 border-b border-[#e1d5bf]/72 bg-[linear-gradient(160deg,rgba(255,252,246,0.86),rgba(248,242,231,0.8))] px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-white via-[#f9f5ec] to-[#efe8d8] ring-2 ring-[#e1d5bf]/75">
            <Image
              src="/lumina-icon.png"
              alt="ルミナのアイコン"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="font-medium text-[#2e2a26]">白の魔女ルミナ</h2>
            <p className="text-xs text-[#544c42]">光とハーブを操るやさしい案内役</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleBack}
          className="lumina-btn lumina-btn-secondary pointer-events-auto !min-h-0 rounded-full px-3 py-1.5 text-xs"
        >
          ← トップへ戻る
        </button>
      </div>
    </header>
  )
}
