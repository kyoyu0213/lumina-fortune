import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PRESET_FORTUNE_QUESTIONS } from "@/lib/preset-fortune-questions";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const visiblePresetQuestions = useMemo(
    () => PRESET_FORTUNE_QUESTIONS.map((preset) => preset.question),
    []
  );

  console.log("[lumina] visible preset questions:", visiblePresetQuestions);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const trimmed = value.trim();
      if (trimmed && !disabled) {
        onSend(trimmed);
        setValue("");
      }
    },
    [value, disabled, onSend]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 border-t border-[#e1d5bf]/72 bg-[linear-gradient(160deg,rgba(255,252,246,0.86),rgba(248,242,231,0.8))] px-4 py-2.5 [padding-bottom:calc(0.625rem+env(safe-area-inset-bottom))] [padding-left:calc(1rem+env(safe-area-inset-left))] [padding-right:calc(1rem+env(safe-area-inset-right))] backdrop-blur-sm"
    >
      <div className="mx-auto max-w-3xl">
        {/* 質問例：横スクロール */}
        <div className="mb-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 whitespace-nowrap pb-1">
            {visiblePresetQuestions.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setValue(example)}
                className="shrink-0 rounded-full border border-[#dbcdb6]/78 bg-[#fcf7ee] px-3 py-1.5 text-xs text-[#5d5449] transition hover:bg-[#f8f1e4]"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={"\u4f8b\uff1a\u5f7c\u306f\u79c1\u306e\u3053\u3068\u3092\u3069\u3046\u601d\u3063\u3066\u3044\u307e\u3059\u304b\uff1f"}
            disabled={disabled}
            className="lumina-input min-w-0 flex-1 rounded-full px-4 py-2.5 text-[#2e2a26] placeholder:text-[#9a8f7e] focus:outline-none"
          />
          <motion.button
            type="submit"
            disabled={disabled || !value.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="lumina-btn lumina-btn-primary !w-auto shrink-0 px-4 py-2.5 sm:px-6 disabled:opacity-50"
          >
            {"\u9001\u4fe1"}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
