"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function BirdSpirit() {
  return (
    <svg viewBox="0 0 140 92" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="luminaBirdWing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffefb" />
          <stop offset="100%" stopColor="#ede5d6" />
        </linearGradient>
        <linearGradient id="luminaBirdBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffdfa" />
          <stop offset="100%" stopColor="#f3ecdf" />
        </linearGradient>
      </defs>

      <motion.path
        d="M70 45 C41 13, 12 12, 4 34 C25 30, 45 37, 60 52 Z"
        fill="url(#luminaBirdWing)"
        stroke="#e7dece"
        strokeWidth="1.4"
        animate={{ rotate: [-10, 5, -4, 0], y: [-2, 1, -1, 0] }}
        transition={{ duration: 1.04, times: [0, 0.34, 0.72, 1], ease: "easeInOut" }}
        style={{ transformOrigin: "60px 42px" }}
      />
      <motion.path
        d="M72 43 C101 13, 129 13, 136 35 C116 30, 96 38, 81 52 Z"
        fill="url(#luminaBirdWing)"
        stroke="#e7dece"
        strokeWidth="1.4"
        animate={{ rotate: [10, -5, 4, 0], y: [-2, 1, -1, 0] }}
        transition={{ duration: 1.04, times: [0, 0.34, 0.72, 1], ease: "easeInOut" }}
        style={{ transformOrigin: "82px 42px" }}
      />
      <motion.ellipse
        cx="71"
        cy="50"
        rx="20"
        ry="13"
        fill="url(#luminaBirdBody)"
        stroke="#e5dccb"
        strokeWidth="1.4"
        animate={{ y: [-1.5, 1.2, -0.5, 0] }}
        transition={{ duration: 1.02, times: [0, 0.4, 0.78, 1], ease: "easeInOut" }}
      />
      <ellipse cx="51" cy="46" rx="9" ry="8" fill="#fffdfa" stroke="#e7dece" strokeWidth="1.3" />
      <path
        d="M41 47 C34 47, 30 50, 27 54 C35 54, 39 53, 43 50 Z"
        fill="#e5c5b7"
        stroke="#d9b7a7"
        strokeWidth="1"
      />
      <circle cx="48" cy="44" r="1.9" fill="#a86f7d" />
      <path
        d="M88 60 C100 63, 106 68, 108 75 C98 74, 90 70, 84 64 Z"
        fill="#f8f3ea"
        stroke="#e8dfcf"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function WhiteBirdAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.16, ease: "easeOut" } }}
          className="pointer-events-none relative mx-auto my-1 h-[8.8rem] w-full max-w-[38rem] overflow-hidden sm:h-[10rem]"
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_56%,rgba(255,250,241,0.36),rgba(255,250,241,0)_60%)]"
            animate={{ opacity: [0.12, 0.34, 0] }}
            transition={{ duration: 1.24, ease: "easeOut" }}
          />

          {[0, 1, 2, 3, 4].map((index) => (
            <motion.span
              key={index}
              className="absolute left-[28%] top-1/2 h-2 w-2 rounded-full bg-[#fff7e8]/90 blur-[0.5px]"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                x: [0, 42 + index * 28, 88 + index * 44],
                y: [8 - index * 2, -8 + index * 3, -22 + index * 5],
                opacity: [0, 0.9, 0],
                scale: [0.4, 1.1, 0.55],
              }}
              transition={{
                duration: 1.05,
                delay: 0.18 + index * 0.06,
                ease: "easeOut",
              }}
            />
          ))}

          <motion.div
            className="absolute left-[-18%] top-[56%] h-20 w-40 -translate-y-1/2 sm:h-24 sm:w-48"
            initial={{ x: 0, y: 18, opacity: 0, scale: 0.88, rotate: -8 }}
            animate={{
              x: ["0%", "52%", "118%"],
              y: [18, -10, -24],
              opacity: [0, 1, 1, 0],
              scale: [0.88, 1.08, 1.02, 0.92],
              rotate: [-8, -2, 4, 7],
            }}
            transition={{ duration: 1.34, times: [0, 0.24, 0.76, 1], ease: "easeInOut" }}
          >
            <div className="relative h-full w-full">
              <motion.div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(255,255,255,0)_72%)] blur-xl"
                animate={{ opacity: [0.18, 0.42, 0] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              <BirdSpirit />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
