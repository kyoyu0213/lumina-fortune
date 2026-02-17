"use client"

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
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.sender === "user"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50/90 text-amber-900"
                }`}
              >
                {msg.isTyping ? (
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:300ms]" />
                  </div>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
                    {msg.showCardButton && msg.cards && (
                      <button
                        className="mt-3 rounded-lg bg-amber-200/60 px-3 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-200/80"
                        onClick={() => onDrawCards(msg.cards!)}
                      >
                        カードを見る
                      </button>
                    )}
                  </>
                )}
                <p
                  className={`mt-1 text-xs ${
                    msg.sender === "user" ? "text-amber-200" : "text-amber-600/70"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
