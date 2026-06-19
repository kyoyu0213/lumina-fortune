// 多言語切り替えの共通設定（診断ページ等で利用）。
// 対応言語: 日本語(ja) / English(en) / 한국어(ko) / 繁體中文(zh-TW)

export type Lang = "ja" | "en" | "ko" | "zh-TW";

/** 言語切り替えボタンの並び順と表示ラベル */
export const LANGS: { code: Lang; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "zh-TW", label: "繁體中文" },
];

export const DEFAULT_LANG: Lang = "ja";

/** localStorage に選択言語を保存するキー */
export const LANG_STORAGE_KEY = "lumina_lang";

export function isLang(value: unknown): value is Lang {
  return value === "ja" || value === "en" || value === "ko" || value === "zh-TW";
}
