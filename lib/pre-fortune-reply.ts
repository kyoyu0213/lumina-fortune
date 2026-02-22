import { greetingResponse } from "./greeting-message";
import { isGreetingOnlyInput } from "./input-guards";
import { replyStyle } from "./reply-style";

export const PRE_FORTUNE_NG_PHRASES = [
  "私も仲良くなりたい",
  "私も興味がある",
  "一緒に仲良くなろう",
  "一緒に距離を縮めよう",
] as const;

const COMPANION_ROLE_PATTERNS = [
  /私も[^。！？\n]*(仲良くなりたい|興味|したい|してみたい)/,
  /一緒に[^。！？\n]*(しよう|しましょう|仲良くなろう|距離を縮めよう)/,
];

function normalizeReply(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function splitSentences(text: string): string[] {
  const chunks = text.match(/[^。！？?]+[。！？?]?/g) ?? [];
  return chunks.map((s) => s.trim()).filter(Boolean);
}

function hasCompanionRoleLanguage(text: string): boolean {
  return COMPANION_ROLE_PATTERNS.some((pattern) => pattern.test(text));
}

export function buildPreFortuneFallbackReply(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "そうなんですね。いま気になっていることは何ですか？";
  if (isGreetingOnlyInput(trimmed)) return greetingResponse;

  if (/その人/.test(trimmed) && /仲良くなりたい/.test(trimmed)) {
    return "そうなんですね。その人の好きなことは分かりますか？";
  }
  if (/仲良くなりたい/.test(trimmed)) {
    return "いいですね。どんな場面で距離を縮めたいですか？";
  }
  if (/(好き|気になる人|気になる)/.test(trimmed)) {
    return "そうなんですね。その人の好きなことは分かりますか？";
  }

  return "そうなんですね。いま特に気になっていることは何ですか？";
}

export function sanitizeDialogueReply(input: string, rawText: string): string {
  const normalized = normalizeReply(rawText);
  if (!normalized) return buildPreFortuneFallbackReply(input);
  if (hasCompanionRoleLanguage(normalized)) {
    return buildPreFortuneFallbackReply(input);
  }

  const sentences = splitSentences(normalized);
  if (
    sentences.length === 0 ||
    sentences.length > replyStyle.dialogue.maxSentences ||
    normalized.length > replyStyle.dialogue.maxChars
  ) {
    return buildPreFortuneFallbackReply(input);
  }

  if (!/[?？]/.test(sentences[sentences.length - 1] ?? "")) {
    return buildPreFortuneFallbackReply(input);
  }

  return normalized;
}

export function sanitizeChatReply(input: string, rawText: string): string {
  const normalized = normalizeReply(rawText);
  if (!normalized) return buildPreFortuneFallbackReply(input);
  if (hasCompanionRoleLanguage(normalized)) {
    return buildPreFortuneFallbackReply(input);
  }
  return normalized;
}
