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
  { question: "彼は私のことをどう思っていますか？", theme: "love" },
  { question: "あの人はもう私のことを忘れていますか？", theme: "love" },
  { question: "あの人から連絡が来ますか？", theme: "love" },
  { question: "復縁できますか？", theme: "love" },
  { question: "この恋のゆくえを占って", theme: "love" },
  { question: "この恋のアドバイス", theme: "love" },
  { question: "あの人は本気ですか？", theme: "love" },
  { question: "結婚できますか？", theme: "marriage" },
  { question: "この先、出会いはありますか？", theme: "love" },
  { question: "運命の人に出会えますか？", theme: "love" },
  { question: "どんな人と結婚しますか？", theme: "marriage" },
  { question: "転職はうまくいきますか？", theme: "work" },
  { question: "金運を見てほしい", theme: "money" },
  { question: "今の運気はどうなっていますか？", theme: "future" },
  { question: "いつ頃運気の流れが変わりますか？", theme: "future" },
];
