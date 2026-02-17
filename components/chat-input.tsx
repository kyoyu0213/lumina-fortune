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
      className="border-t border-amber-200/50 bg-amber-50/80 px-4 py-3 backdrop-blur"
    >
      <div className="mx-auto flex max-w-2xl gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="質問を入力..."
          disabled={disabled}
          className="flex-1 rounded-full border border-amber-200 bg-white px-4 py-3 text-amber-900 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <motion.button
          type="submit"
          disabled={disabled || !value.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-amber-600 px-6 py-3 font-medium text-white disabled:opacity-50"
        >
          送信
        </motion.button>
      </div>
    </form>
  )
}
