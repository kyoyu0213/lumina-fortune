"use client"

import { motion } from "framer-motion"

const FEATHERS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${10 + i * 12}%`,
  delay: i * 0.5,
  duration: 8 + Math.random() * 4,
}))

export function FloatingFeathers() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {FEATHERS.map(({ id, left, delay, duration }) => (
        <motion.div
          key={id}
          className="absolute text-amber-200/40"
          style={{ left, top: "-20px" }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 180],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width="24"
            height="40"
            viewBox="0 0 24 40"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12 0c-2 4-4 10-4 18 0 4 1 8 3 11 2 3 5 6 9 8l-1 3c-4-2-8-6-10-11-2-4-2-9-1-14l5-15z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
