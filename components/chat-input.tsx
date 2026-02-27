"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = value.trim()
      if (trimmed && !disabled) {
        onSend(trimmed)
        setValue("")
      }
    },
    [value, disabled, onSend]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-[#e1d5bf]/72 bg-[linear-gradient(160deg,rgba(255,252,246,0.86),rgba(248,242,231,0.8))] px-4 py-3 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-3xl gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="質問を入力..."
          disabled={disabled}
          className="lumina-input flex-1 rounded-full px-4 py-3 text-[#2e2a26] placeholder:text-[#9a8f7e] focus:outline-none"
        />
        <motion.button
          type="submit"
          disabled={disabled || !value.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="lumina-btn lumina-btn-primary !w-auto px-6 py-3 disabled:opacity-50"
        >
          送信
        </motion.button>
      </div>
    </form>
  )
}
