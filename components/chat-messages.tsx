"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TarotCard, type TarotCardData } from "./tarot-card"

export interface Message {
  id: string
  sender: "lumina" | "user"
  text: string
  time: string
  isTyping?: boolean
  cards?: TarotCardData[]
  showCardButton?: boolean
}

interface ChatMessagesProps {
  messages: Message[]
  onDrawCards: (cards: TarotCardData[]) => void
}

export function ChatMessages({ messages, onDrawCards }: ChatMessagesProps) {
  const [expandedMessageIds, setExpandedMessageIds] = useState<Record<string, boolean>>({})

  const toggleExpanded = (id: string) => {
    setExpandedMessageIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {(() => {
                const text = msg.text ?? ""
                const isLongLumina = msg.sender === "lumina" && text.length > 420
                const isExpanded = !!expandedMessageIds[msg.id]
                const previewText = isLongLumina && !isExpanded ? `${text.slice(0, 260)}…` : text

                return (
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 ${
                  msg.sender === "user"
                    ? "border border-[#aaa0bc]/70 bg-[#958cad]/95 text-white shadow-[0_10px_18px_-16px_rgba(80,67,102,0.38)]"
                    : "border border-[#e1d5bf]/74 bg-[linear-gradient(160deg,rgba(255,252,246,0.88),rgba(248,242,231,0.82))] text-[#2e2a26] shadow-[0_10px_18px_-16px_rgba(82,69,53,0.24)] backdrop-blur-sm"
                }`}
              >
                {msg.isTyping ? (
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#b7abce] [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#b7abce] [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#b7abce] [animation-delay:300ms]" />
                  </div>
                ) : (
                  <>
                    {isLongLumina ? (
                      <div className="rounded-xl border border-[#e6dac5]/80 bg-white/55 p-3">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{previewText}</p>
                        <button
                          type="button"
                          onClick={() => toggleExpanded(msg.id)}
                          className="mt-2 text-xs font-medium text-[#6f6556] underline underline-offset-4 hover:text-[#544c42]"
                        >
                          {isExpanded ? "折りたたむ" : "続きを読む"}
                        </button>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                    )}
                    {msg.showCardButton && msg.cards && (
                      <button
                        type="button"
                        className="mt-3 rounded-lg border border-[#baa98d]/72 bg-[#fdf8ee] px-3 py-2 text-sm font-medium text-[#6f6556] transition hover:bg-[#f9f3e7]"
                        onClick={() => onDrawCards(msg.cards!)}
                      >
                        カードを見る
                      </button>
                    )}
                  </>
                )}
                <p
                  className={`mt-1 text-xs ${
                    msg.sender === "user" ? "text-white/75" : "text-[#7d6d5a]/85"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
                )
              })()}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
