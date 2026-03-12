import {
  detectLightGuidanceLoveSubtheme,
  resolveOneCardReadingContext,
  type LightGuidanceLoveSubtheme,
  type LightGuidanceTheme,
} from "@/lib/fortune/light-guidance-one-card";
import { luminaDevError, luminaDevLog, luminaDevWarn } from "@/lib/config/lumina-dev";
import type { DrawnTarotCard } from "@/lib/tarot/deck";

export type LightGuidanceOneCardSections = {
  intro: string;
  readingShort: string;
  readingDetail: string;
  text: string;
};

const MARRIAGE_FORBIDDEN_TERMS_RE = /(復縁|やり直し|再び戻る)/;

function normalize(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

function ensureSentenceEnding(text: string): string {
  const value = text.trim();
  if (!value) return "";
  return /[。！？]$/.test(value) ? value : `${value}。`;
}

function splitSentences(text: string): string[] {
  return normalize(text)
    .split(/(?<=[。！？])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function stripCodeFences(text: string): string {
  return text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
}

function trimSentenceCount(text: string, min: number, max: number): string {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return "";
  const count = Math.max(min, Math.min(max, sentences.length));
  return sentences.slice(0, count).map(ensureSentenceEnding).join("");
}

function inferIntro(theme: LightGuidanceTheme, message: string): string {
  const text = message.trim();
  const loveSubtheme = detectLightGuidanceLoveSubtheme(message, theme);
  if (loveSubtheme === "marriage") {
    return "結婚の流れについて見ていきましょう。";
  }
  if (loveSubtheme === "reunion") {
    return "復縁の可能性を静かに見ていきますね。";
  }
  if (/気持ち|本音|どう思/.test(text)) return "お相手のお気持ちの流れを見ていきますね。";
  if (/恋愛|恋|好き|片思い|彼氏|彼女/.test(text)) return "恋の流れを見ていきましょう。";
  if (/仕事|転職|職場|働/.test(text)) return "お仕事の流れですね。では、この一枚から読み解いていきますね。";
  if (/人間関係|友達|家族/.test(text)) return "その関わりの流れですね。では、カードから見ていきますね。";

  switch (theme) {
    case "love":
      return "恋の流れを見ていきましょう。";
    case "marriage":
      return "結婚の流れについて見ていきましょう。";
    case "work":
      return "お仕事の流れですね。では、この一枚から読み解いていきますね。";
    case "money":
      return "お金の流れですね。では、静かに見ていきますね。";
    case "relationship":
      return "その関係性ですね。では、カードから見ていきますね。";
    case "future":
      return "これからの流れですね。では、この一枚から読み解いていきますね。";
    case "health":
      return "心と体の流れですね。では、静かに見ていきますね。";
    default:
      return "その流れですね。では、カードから見ていきますね。";
  }
}

function buildFallbackReadingShort(
  card: DrawnTarotCard,
  theme: LightGuidanceTheme,
  message: string,
  loveSubtheme: LightGuidanceLoveSubtheme = detectLightGuidanceLoveSubtheme(message, theme)
): string {
  const seed = `${theme ?? "general"}:${card.card.code}:${card.reversed ? "r" : "u"}:${message.trim()}`;
  const context = resolveOneCardReadingContext(card, theme, seed, message);
  const first = context.categoryReading[0] ?? context.selectedMode;

  if (loveSubtheme === "marriage") {
    return ensureSentenceEnding(
      card.reversed
        ? "結婚については、焦って形にするより現実的な確認を重ねたい流れです"
        : "結婚については、将来を形にするための土台が静かに整い始めています"
    );
  }

  return ensureSentenceEnding(
    card.reversed
      ? `${first}には、急がず整えたい気配が出ています`
      : `${first}には、静かに動き始める流れが出ています`
  );
}

function buildFallbackReadingDetail(
  card: DrawnTarotCard,
  theme: LightGuidanceTheme,
  message: string,
  loveSubtheme: LightGuidanceLoveSubtheme = detectLightGuidanceLoveSubtheme(message, theme)
): string {
  const seed = `${theme ?? "general"}:${card.card.code}:${card.reversed ? "r" : "u"}:${message.trim()}`;
  const context = resolveOneCardReadingContext(card, theme, seed, message);
  const first = context.categoryReading[0] ?? context.selectedMode;
  const second = context.categoryReading[1] ?? context.selectedMode;
  const orientation = card.reversed ? "逆位置" : "正位置";

  if (loveSubtheme === "marriage") {
    return [
      `この一枚には、${first}が前に出ており、結婚の可能性は感情だけでなく現実の歩幅で見極める段階です。`,
      `${card.card.nameJa}の${orientation}は、${second}を通して、二人の価値観や生活感覚が無理なく重なるかを丁寧に確かめることの大切さを示します。`,
      card.reversed
        ? "今はタイミングを急がず、将来像や役割分担を言葉にしてすり合わせるほど、話に現実味が戻りやすいでしょう。"
        : "今は将来のイメージや生活の作り方を共有するほど、結婚への流れが具体的になっていきやすいでしょう。",
      "勢いだけで結論を出すより、時期や段取りを整えることが、ふたりにとって納得のいく形につながります。",
    ].join("");
  }

  return [
    `この一枚には、${first}が前に出ています。`,
    `${card.card.nameJa}の${orientation}は、${second}を急いで決めないほうがよい場面を映しやすいです。`,
    card.reversed
      ? "今は強く押すより、乱れた気持ちや段取りを静かに整えるほうが流れに合います。"
      : "今は無理に結論を急ぐより、自然に呼吸が合う形を選ぶほうが流れに乗れます。",
    theme === "work"
      ? "目の前の優先順位をひとつずつ整えるほど、判断もぶれにくくなりそうです。"
      : theme === "relationship"
        ? "相手を決めつけず、距離の取り方を少しやわらげるほど、見え方も落ち着いてきそうです。"
        : theme === "love" || theme === "marriage"
          ? "気持ちを確かめたくなっても、今は関係の温度を乱さないことが穏やかな追い風になります。"
          : "今日はひとつずつ整える意識が、心を落ち着かせてくれそうです。",
  ].join("");
}

function parseJsonObject(rawText: string): Partial<Record<"intro" | "readingShort" | "readingDetail", string>> | null {
  try {
    luminaDevLog("[lumina] parsing response...");
    const cleaned = stripCodeFences(rawText);
    const directTarget = cleaned.startsWith("{") ? cleaned : extractJsonObject(cleaned);
    const parsed = JSON.parse(directTarget) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      intro: typeof parsed.intro === "string" ? parsed.intro : "",
      readingShort: typeof parsed.readingShort === "string" ? parsed.readingShort : "",
      readingDetail: typeof parsed.readingDetail === "string" ? parsed.readingDetail : "",
    };
  } catch (error) {
    luminaDevError("[lumina] parse failed:", error);
    return null;
  }
}

function extractJsonObject(text: string): string {
  const start = text.indexOf("{");
  if (start < 0) return text;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, index + 1);
      }
    }
  }

  return text;
}

function salvageFreeformSections(
  rawText: string,
  theme: LightGuidanceTheme,
  card: DrawnTarotCard,
  message: string
): Partial<Record<"intro" | "readingShort" | "readingDetail", string>> {
  const sentences = splitSentences(stripCodeFences(rawText)).filter(Boolean);
  const cleaned = sentences.filter(
    (sentence) =>
      !/ありがとうございます|お待ちください|シャッフル|カードを引き|ぜひまた|教えてください/.test(sentence)
  );

  if (cleaned.length === 0) {
    return {};
  }

  if (cleaned.length === 1) {
    return {
      intro: inferIntro(theme, message),
      readingShort: buildFallbackReadingShort(card, theme, message),
      readingDetail: cleaned[0],
    };
  }

  if (cleaned.length === 2) {
    return {
      intro: cleaned[0],
      readingShort: cleaned[1],
      readingDetail: buildFallbackReadingDetail(card, theme, message),
    };
  }

  return {
    intro: cleaned[0],
    readingShort: cleaned[1],
    readingDetail: cleaned.slice(2).join(""),
  };
}

export function ensureLightGuidanceOneCardOutput(
  rawText: string,
  card: DrawnTarotCard,
  theme: LightGuidanceTheme,
  message: string,
  loveSubtheme: LightGuidanceLoveSubtheme = detectLightGuidanceLoveSubtheme(message, theme)
): LightGuidanceOneCardSections {
  const parsed = parseJsonObject(rawText) ?? salvageFreeformSections(rawText, theme, card, message);
  luminaDevLog("[lumina] parsed response:", parsed);

  const inferredIntro = inferIntro(theme, message);
  const introSource =
    theme === "love" || theme === "marriage"
      ? inferredIntro
      : parsed?.intro?.trim() || inferredIntro;
  const intro = ensureSentenceEnding(introSource);
  const shouldUseMarriageFallback =
    loveSubtheme === "marriage" &&
    MARRIAGE_FORBIDDEN_TERMS_RE.test(
      [parsed?.intro ?? "", parsed?.readingShort ?? "", parsed?.readingDetail ?? ""].join(" ")
    );
  const readingShort =
    (!shouldUseMarriageFallback && trimSentenceCount(parsed?.readingShort ?? "", 1, 1)) ||
    buildFallbackReadingShort(card, theme, message, loveSubtheme);
  const readingDetail =
    (!shouldUseMarriageFallback && trimSentenceCount(parsed?.readingDetail ?? "", 3, 5)) ||
    buildFallbackReadingDetail(card, theme, message, loveSubtheme);

  if (!parsed) {
    luminaDevWarn("[lumina] fallback route: json-parse-failed");
  } else if (!parsed.intro || !parsed.readingShort || !parsed.readingDetail) {
    luminaDevWarn("[lumina] fallback route: missing-required-fields", parsed);
  }

  return {
    intro,
    readingShort,
    readingDetail,
    text: [intro, readingShort, readingDetail].join("\n\n"),
  };
}
