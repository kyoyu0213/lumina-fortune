export type PresetFortuneTheme =
  | "love"
  | "marriage"
  | "work"
  | "money"
  | "health"
  | "relationship"
  | "future";

export type PresetFortuneQuestion = {
  question: string;
  theme: PresetFortuneTheme;
};

export const PRESET_FORTUNE_QUESTIONS: PresetFortuneQuestion[] = [
  {
    question: "\u3042\u306e\u4eba\u304b\u3089\u9023\u7d61\u304c\u6765\u307e\u3059\u304b\uff1f",
    theme: "love",
  },
  {
    question: "\u3053\u306e\u604b\u306e\u30a2\u30c9\u30d0\u30a4\u30b9",
    theme: "love",
  },
  {
    question: "\u79c1\u306e\u672a\u6765\u306e\u7d50\u5a5a\u76f8\u624b\u306f\u3069\u3093\u306a\u4eba\u3067\u3059\u304b\uff1f",
    theme: "marriage",
  },
  {
    question: "\u3053\u306e\u5148\u3001\u51fa\u4f1a\u3044\u306f\u3042\u308a\u307e\u3059\u304b\uff1f",
    theme: "love",
  },
  {
    question: "\u904b\u547d\u306e\u4eba\u306b\u51fa\u4f1a\u3048\u307e\u3059\u304b\uff1f",
    theme: "love",
  },
  {
    question: "\u8ee2\u8077\u306f\u3046\u307e\u304f\u3044\u304d\u307e\u3059\u304b\uff1f",
    theme: "work",
  },
  {
    question: "\u91d1\u904b\u3092\u898b\u3066\u307b\u3057\u3044",
    theme: "money",
  },
  {
    question: "\u4eca\u306e\u904b\u6c17\u306f\u3069\u3046\u306a\u3063\u3066\u3044\u307e\u3059\u304b\uff1f",
    theme: "future",
  },
  {
    question: "この苦しい時期はいつか終わりますか？",
    theme: "future",
  },
];
