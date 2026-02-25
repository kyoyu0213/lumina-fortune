import { NextResponse } from "next/server";
import OpenAI from "openai";
import { pickRandomCards as pickDailyFortuneCards } from "@/lib/fortune-data";
import {
  buildBirthdate2026Prompt,
  buildChatPrompt,
  buildDialoguePrompt,
  buildDailyFortunePrompt,
} from "@/lib/prompt-builder";
import { ensureFortuneOutputFormat } from "@/lib/fortune-output";
import { buildTarotChatPrompt } from "@/lib/prompts/tarotChatPrompt";
import { greetingMessage, greetingResponse } from "@/lib/greeting-message";
import {
  buildFortuneOfferReply,
  getDialogueConversationState,
  type ChatHistoryItem,
} from "@/lib/dialogue-transition";
import { getGuardedChatDecision } from "@/lib/chat-flow-guard";
import {
  classifyIntent,
  isAcknowledgementInput,
  isAffirmativeInput,
} from "@/lib/intent-classifier";
import {
  isDialogueModeInput,
  isGreetingOnlyInput,
} from "@/lib/input-guards";
import { sanitizeChatReply, sanitizeDialogueReply } from "@/lib/pre-fortune-reply";
import { replyStyle } from "@/lib/reply-style";
import { drawTarotSpread, toUiTarotCardData, type DrawnTarotCard } from "@/lib/tarot/deck";
import { ensureTarotChatOutputFormat } from "@/lib/tarot/tarot-chat-output";

type RequestBody = {
  message?: string;
  cards?: { name: string; reversed?: boolean }[];
  mode?: string;
  history?: ChatHistoryItem[];
  conversationState?: {
    phase?: string;
    topic?: string | null;
    awaitingConsent?: boolean;
    awaitingTheme?: boolean;
    questionStreak?: number;
    lastTopic?: string | null;
    offtopicStreak?: number;
    awaitingFortuneResult?: boolean;
  };
};

type TarotChatPhase = "idle" | "intent_confirm" | "reading" | "followup";
type TarotChatTheme =
  | "love"
  | "marriage"
  | "work"
  | "money"
  | "relationship"
  | "future";

type TarotChatConversationState = {
  phase: TarotChatPhase;
  topic: TarotChatTheme | null;
  awaitingConsent: boolean;
  awaitingTheme: boolean;
  questionStreak: number;
  lastTopic: string | null;
  offtopicStreak: number;
  awaitingFortuneResult: boolean;
};

// OpenAI初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LUMINA_SYSTEM_PROMPT = `あなたは白の魔女ルミナです。占い師として丁寧で落ち着いた口調を保ってください。
相談者の恋愛や人間関係の当事者は相談者本人であり、あなたは第三者・伴走者として助言と質問に徹してください。
「私も〜したい」「一緒に〜しよう」「私も興味がある」のように、あなた自身が当事者化する表現は禁止です。
雑談は雑談として返し、勝手に占いへ変換しないでください。
ユーザーが恋愛と言っていないのに恋愛鑑定を始めてはいけません。
占いは、テーマ確定と許可が取れてから開始してください。
「うん / はい / お願い / OK」などの肯定返答を受けた直後は、質問を増やさずに鑑定へ進んでください。
鑑定は「今日限定」ではなく、今の流れ・近い未来・助言として伝えてください。
ですます調を保ち、同じ語尾の連続を避け、過度な誘導をしないでください。
最後に短いアファメーションを1行添えてください。`;

const FORTUNE_DECLARATION_RE = /少しカードを引いてみますね。少しだけお待ちください。/;
const FORTUNE_OFFER_CONFIRM_RE = /見てみましょうか[？?]?\s*$/;

function isAwaitingFortuneResultFromHistory(history: ChatHistoryItem[]): boolean {
  const lastAssistant = [...history].reverse().find((h) => h.role === "assistant");
  if (!lastAssistant) return false;
  if (!FORTUNE_DECLARATION_RE.test(lastAssistant.content)) return false;

  const lastAssistantIndex = history.lastIndexOf(lastAssistant);
  const hasAssistantAfter = history.slice(lastAssistantIndex + 1).some((h) => h.role === "assistant");
  return !hasAssistantAfter;
}

function buildImmediateFortuneLeadIn(message: string): string | null {
  if (/(相手|お相手).*(気持ち)/.test(message) || /(気持ち).*(占って|見て|みて)/.test(message)) {
    return "そうなんですね。お相手様の気持ちを見てみましょう。";
  }
  return null;
}

function getLastAssistantMessage(history: ChatHistoryItem[]): string | null {
  return [...history].reverse().find((h) => h.role === "assistant")?.content ?? null;
}

function buildFortuneRequestFromOfferConfirmation(assistantMessage: string | null): string | null {
  if (!assistantMessage) return null;
  const text = assistantMessage.trim();
  if (!FORTUNE_OFFER_CONFIRM_RE.test(text)) return null;

  if (/結婚運/.test(text)) return "結婚運を占って";
  if (/(恋愛運|お相手の気持ち)/.test(text)) return "恋愛運を占って";
  if (/仕事運/.test(text)) return "仕事運を占って";
  if (/金運/.test(text)) return "金運を占って";
  return "占って";
}

const TAROT_INTENT_RE = /(占って|占い|見て|みて|鑑定|タロット|リーディング)/i;
const LOVE_THEME_RE = /(恋愛|相手の気持ち|片思い|復縁|彼氏|彼女|相性)/;
const MARRIAGE_THEME_RE = /(結婚|婚活|入籍|プロポーズ)/;
const WORK_THEME_RE = /(仕事|転職|職場|学業|勉強|受験|進路|就活)/;
const MONEY_THEME_RE = /(金運|お金|収入|貯金|家計|投資)/;
const RELATIONSHIP_THEME_RE = /(人間関係|対人関係|家族関係|友人関係|友達関係|上司との関係|同僚との関係)/;
const FUTURE_THEME_RE = /(未来|今後|この先|将来)/;
const SMALLTALK_FOOD_RE =
  /(好きな食べ物|何食べた|うどん|ラーメン|そば|パスタ|カレー|寿司|焼肉|ごはん|ご飯)/;

function defaultTarotChatConversationState(): TarotChatConversationState {
  return {
    phase: "idle",
    topic: null,
    awaitingConsent: false,
    awaitingTheme: false,
    questionStreak: 0,
    lastTopic: null,
    offtopicStreak: 0,
    awaitingFortuneResult: false,
  };
}

function normalizeTarotChatConversationState(
  raw: RequestBody["conversationState"]
): TarotChatConversationState {
  const base = defaultTarotChatConversationState();
  if (!raw || typeof raw !== "object") return base;
  const phase =
    raw.phase === "idle" ||
    raw.phase === "intent_confirm" ||
    raw.phase === "reading" ||
    raw.phase === "followup"
      ? raw.phase
      : base.phase;
  const topic =
    raw.topic === "love" ||
    raw.topic === "marriage" ||
    raw.topic === "work" ||
    raw.topic === "money" ||
    raw.topic === "relationship" ||
    raw.topic === "future"
      ? raw.topic
      : null;
  return {
    phase,
    topic,
    awaitingConsent: Boolean(raw.awaitingConsent),
    awaitingTheme: Boolean(raw.awaitingTheme),
    questionStreak:
      typeof raw.questionStreak === "number" ? Math.max(0, Math.min(raw.questionStreak, 2)) : 0,
    lastTopic: typeof raw.lastTopic === "string" ? raw.lastTopic : null,
    offtopicStreak:
      typeof raw.offtopicStreak === "number" ? Math.max(0, Math.min(raw.offtopicStreak, 3)) : 0,
    awaitingFortuneResult: Boolean(raw.awaitingFortuneResult),
  };
}

function detectTarotTheme(input: string): TarotChatTheme | null {
  if (MARRIAGE_THEME_RE.test(input)) return "marriage";
  if (LOVE_THEME_RE.test(input)) return "love";
  if (WORK_THEME_RE.test(input)) return "work";
  if (MONEY_THEME_RE.test(input)) return "money";
  if (RELATIONSHIP_THEME_RE.test(input)) return "relationship";
  if (FUTURE_THEME_RE.test(input)) return "future";
  return null;
}

function isTarotIntentInput(input: string): boolean {
  return TAROT_INTENT_RE.test(input);
}

function isSmalltalkLikeInput(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  if (isTarotIntentInput(trimmed)) return false;
  if (detectTarotTheme(trimmed)) return false;
  if (/悩み|相談|不安|つらい|しんどい|モヤモヤ|もやもや/.test(trimmed)) return false;
  return SMALLTALK_FOOD_RE.test(trimmed);
}

function themeLabel(theme: TarotChatTheme): string {
  if (theme === "love") return "恋愛";
  if (theme === "marriage") return "結婚";
  if (theme === "work") return "仕事";
  if (theme === "money") return "お金";
  if (theme === "relationship") return "人間関係";
  return "未来";
}

function buildThemeChoicePrompt(): string {
  return "占いをご希望でしたら、テーマを教えてください。恋愛 / 仕事 / 人間関係 / 未来（必要なら結婚・お金でも大丈夫です）。";
}

function buildSmalltalkReply(input: string): string {
  if (/うどん/.test(input)) {
    return `うどん、いいですね。気分に合う一杯ってほっとしますよね。\n${buildThemeChoicePrompt()}`;
  }
  if (/好きな食べ物/.test(input)) {
    return `好きな食べ物の話、いいですね。つい盛り上がる話題です。\n${buildThemeChoicePrompt()}`;
  }
  return `そうなんですね。ありがとうございます。\n${buildThemeChoicePrompt()}`;
}

function buildIntentConfirmReply(theme: TarotChatTheme): string {
  return `${themeLabel(theme)}ですね。3枚引き（現状 / 課題 / 助言）で占ってみましょうか？`;
}

function buildThemeRequestedReply(): string {
  return `ありがとうございます。まずはテーマを1つ選んでください。${buildThemeChoicePrompt()}`;
}

function buildFollowupPrompt(topic: TarotChatTheme | null): string {
  const topicText = topic ? `${themeLabel(topic)}` : "そのテーマ";
  return `${topicText}について、どこを深掘りしたいですか？（現状 / 相手の気持ち / 近い未来 / 行動のコツ など）`;
}

function toFortunePromptMessage(theme: TarotChatTheme | null, userMessage: string): string {
  if (theme === "love") return userMessage.includes("恋愛") ? userMessage : `恋愛について占ってください。相談内容: ${userMessage}`;
  if (theme === "marriage") return userMessage.includes("結婚") ? userMessage : `結婚について占ってください。相談内容: ${userMessage}`;
  if (theme === "work") return userMessage.includes("仕事") ? userMessage : `仕事について占ってください。相談内容: ${userMessage}`;
  if (theme === "money") return userMessage.includes("金") || userMessage.includes("お金") ? userMessage : `お金について占ってください。相談内容: ${userMessage}`;
  if (theme === "relationship") return userMessage.includes("人間関係") ? userMessage : `人間関係について占ってください。相談内容: ${userMessage}`;
  if (theme === "future") return userMessage.includes("未来") || userMessage.includes("今後") ? userMessage : `近い未来について占ってください。相談内容: ${userMessage}`;
  return userMessage;
}

function normalizeTarotReadingOutputHeadings(text: string): string {
  let normalized = text
    .replace(/^1\. 引いたカード$/m, "1. 引いたカード（3枚）")
    .replace(/^2\. カードの象徴$/m, "2. カードの象徴")
    .replace(/^3\. 今の状況への読み解き$/m, "3. 読み解き（相談内容に合わせて）")
    .replace(/^4\. 近い未来の可能性$/m, "4. 近い未来の可能性（2〜3個）")
    .replace(/^5\. 心を整えるアドバイス$/m, "5. 今日からできる一歩")
    .replace(/^6\. アファメーション$/m, "6. アファメーション（1行）");
  if (!/^引いたカード：/m.test(normalized)) {
    normalized = normalized.replace(
      /^1\. 引いたカード（3枚）\n([^\n]+)/,
      "引いたカード：$1\n\n1. 引いたカード（3枚）\n$1"
    );
  }
  return normalized;
}

function inferThemeFromOfferMessage(assistantMessage: string | null): TarotChatTheme | null {
  if (!assistantMessage) return null;
  if (/結婚運/.test(assistantMessage)) return "marriage";
  if (/恋愛運|お相手の気持ち/.test(assistantMessage)) return "love";
  if (/仕事運/.test(assistantMessage)) return "work";
  if (/金運/.test(assistantMessage)) return "money";
  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { message, cards: existingCards, mode = "chat" } = body;
    const history = Array.isArray(body.history) ? body.history : [];
    const incomingConversationState = normalizeTarotChatConversationState(body.conversationState);
    const trimmedMessage = message?.trim() || "こんにちは";
    const lastAssistantMessage = getLastAssistantMessage(history);
    const offerBasedFortuneMessage = buildFortuneRequestFromOfferConfirmation(lastAssistantMessage);
    const acceptedFortuneOffer =
      mode === "chat" && !!offerBasedFortuneMessage && isAffirmativeInput(trimmedMessage);
    let fortunePromptMessage = acceptedFortuneOffer
      ? offerBasedFortuneMessage
      : trimmedMessage;
    const detectedTheme = detectTarotTheme(trimmedMessage);
    const explicitTarotIntent = isTarotIntentInput(trimmedMessage);
    const affirmativeInput = isAffirmativeInput(trimmedMessage);
    const stateTopic = incomingConversationState.topic ?? inferThemeFromOfferMessage(lastAssistantMessage);
    let nextConversationState: TarotChatConversationState = {
      ...incomingConversationState,
      topic: stateTopic,
      lastTopic: stateTopic ?? incomingConversationState.lastTopic ?? null,
    };
    const awaitingFortuneResult = isAwaitingFortuneResultFromHistory(history);
    const awaitingFollowupIntent = awaitingFortuneResult
      ? classifyIntent(trimmedMessage)
      : null;
    const shouldAddAwaitingBridge =
      awaitingFortuneResult && !isAcknowledgementInput(trimmedMessage);
    let resolvedMode = mode;
    if (acceptedFortuneOffer) {
      resolvedMode = "fortune";
    }
    const guardedDecision =
      resolvedMode === "chat" ? getGuardedChatDecision(history, trimmedMessage) : null;

    if (guardedDecision?.kind === "proceed_to_fortune") {
      resolvedMode = "fortune";
    }
    if (awaitingFortuneResult) {
      resolvedMode = "fortune";
    }

    if (mode === "chat" && trimmedMessage === "__welcome__") {
      return NextResponse.json({
        text: greetingMessage,
        cards: null,
        conversationState: defaultTarotChatConversationState(),
      });
    }

    if (mode === "chat" && isGreetingOnlyInput(trimmedMessage)) {
      return NextResponse.json({
        text: greetingResponse,
        cards: null,
        conversationState: {
          ...defaultTarotChatConversationState(),
          topic: nextConversationState.topic,
          lastTopic: nextConversationState.lastTopic,
        },
      });
    }

    if (mode === "chat" && !awaitingFortuneResult) {
      const offeredByAssistant =
        nextConversationState.awaitingConsent || !!offerBasedFortuneMessage;
      const activeTheme = detectedTheme ?? nextConversationState.topic;

      if (nextConversationState.phase === "followup" && affirmativeInput) {
        return NextResponse.json({
          text: buildFollowupPrompt(activeTheme),
          cards: null,
          conversationState: {
            ...nextConversationState,
            phase: "followup",
            topic: activeTheme,
            lastTopic: activeTheme ?? nextConversationState.lastTopic,
            awaitingConsent: false,
            awaitingTheme: false,
          },
        });
      }

      if (nextConversationState.phase === "intent_confirm" && nextConversationState.awaitingTheme) {
        if (!activeTheme) {
          return NextResponse.json({
            text: buildThemeChoicePrompt(),
            cards: null,
            conversationState: nextConversationState,
          });
        }
        if (affirmativeInput || explicitTarotIntent) {
          resolvedMode = "fortune";
          fortunePromptMessage = toFortunePromptMessage(activeTheme, trimmedMessage);
          nextConversationState = {
            ...nextConversationState,
            phase: "reading",
            topic: activeTheme,
            lastTopic: activeTheme,
            awaitingTheme: false,
            awaitingConsent: false,
          };
        } else {
          return NextResponse.json({
            text: buildIntentConfirmReply(activeTheme),
            cards: null,
            conversationState: {
              ...nextConversationState,
              phase: "intent_confirm",
              topic: activeTheme,
              lastTopic: activeTheme,
              awaitingTheme: false,
              awaitingConsent: true,
            },
          });
        }
      }

      if (
        nextConversationState.phase === "intent_confirm" &&
        nextConversationState.awaitingConsent &&
        affirmativeInput
      ) {
        const confirmTheme = activeTheme ?? inferThemeFromOfferMessage(lastAssistantMessage);
        if (!confirmTheme) {
          return NextResponse.json({
            text: buildThemeRequestedReply(),
            cards: null,
            conversationState: {
              ...nextConversationState,
              phase: "intent_confirm",
              awaitingTheme: true,
              awaitingConsent: false,
            },
          });
        }
        resolvedMode = "fortune";
        fortunePromptMessage = toFortunePromptMessage(confirmTheme, trimmedMessage);
        nextConversationState = {
          ...nextConversationState,
          phase: "reading",
          topic: confirmTheme,
          lastTopic: confirmTheme,
          awaitingConsent: false,
          awaitingTheme: false,
        };
      }

      if (resolvedMode === "chat" && isSmalltalkLikeInput(trimmedMessage)) {
        return NextResponse.json({
          text: buildSmalltalkReply(trimmedMessage),
          cards: null,
          conversationState: {
            ...nextConversationState,
            phase: "idle",
            awaitingConsent: false,
            awaitingTheme: false,
            offtopicStreak: Math.min((nextConversationState.offtopicStreak ?? 0) + 1, 3),
          },
        });
      }

      if (resolvedMode === "chat" && explicitTarotIntent && !activeTheme) {
        return NextResponse.json({
          text: buildThemeChoicePrompt(),
          cards: null,
          conversationState: {
            ...nextConversationState,
            phase: "intent_confirm",
            awaitingTheme: true,
            awaitingConsent: false,
          },
        });
      }

      if (resolvedMode === "chat" && explicitTarotIntent && activeTheme) {
        return NextResponse.json({
          text: buildIntentConfirmReply(activeTheme),
          cards: null,
          conversationState: {
            ...nextConversationState,
            phase: "intent_confirm",
            topic: activeTheme,
            lastTopic: activeTheme,
            awaitingTheme: false,
            awaitingConsent: true,
          },
        });
      }

      if (resolvedMode === "chat" && offeredByAssistant && affirmativeInput) {
        const confirmTheme = activeTheme ?? inferThemeFromOfferMessage(lastAssistantMessage);
        if (!confirmTheme) {
          return NextResponse.json({
            text: buildThemeChoicePrompt(),
            cards: null,
            conversationState: {
              ...nextConversationState,
              phase: "intent_confirm",
              awaitingTheme: true,
              awaitingConsent: false,
            },
          });
        }
        resolvedMode = "fortune";
        fortunePromptMessage = toFortunePromptMessage(confirmTheme, trimmedMessage);
        nextConversationState = {
          ...nextConversationState,
          phase: "reading",
          topic: confirmTheme,
          lastTopic: confirmTheme,
          awaitingTheme: false,
          awaitingConsent: false,
        };
      }

      if (
        resolvedMode === "chat" &&
        nextConversationState.phase === "followup" &&
        !isAcknowledgementInput(trimmedMessage) &&
        !isSmalltalkLikeInput(trimmedMessage)
      ) {
        const followupTheme = activeTheme ?? nextConversationState.topic;
        if (followupTheme) {
          resolvedMode = "fortune";
          fortunePromptMessage = toFortunePromptMessage(followupTheme, trimmedMessage);
          nextConversationState = {
            ...nextConversationState,
            phase: "reading",
            topic: followupTheme,
            lastTopic: followupTheme,
            awaitingConsent: false,
            awaitingTheme: false,
          };
        }
      }
    }

    if (resolvedMode === "chat" && guardedDecision?.kind === "reply") {
      return NextResponse.json({
        text: guardedDecision.text,
        cards: null,
        conversationState: guardedDecision.conversationState,
      });
    }
    if (resolvedMode === "chat") {
      const conversationState = getDialogueConversationState(history, trimmedMessage);
      if (conversationState.shouldOfferFortune) {
        return NextResponse.json({
          text: buildFortuneOfferReply(history, trimmedMessage),
          cards: null,
          conversationState: {
            questionStreak: Math.min(conversationState.questionStreak + 1, 2),
            lastTopic: guardedDecision?.conversationState.lastTopic ?? null,
            offtopicStreak: 0,
            awaitingFortuneResult: false,
          },
        });
      }
    }

    let prompt = "";
    let cards = existingCards;
    let tarotSpread: DrawnTarotCard[] | null = null;
    let usedDialogueMode = false;

    if (resolvedMode === "chat") {
      if (
        isDialogueModeInput(
          trimmedMessage,
          replyStyle.dialogue.maxInputCharsForAutoDialogue
        )
      ) {
        prompt = buildDialoguePrompt(trimmedMessage);
        usedDialogueMode = true;
      } else {
        prompt = buildChatPrompt(trimmedMessage);
      }
    } else if (resolvedMode === "birthdate-2026") {
      prompt = buildBirthdate2026Prompt(trimmedMessage);
    } else {
      // タロット占いモード
      if (resolvedMode === "daily-fortune") {
        if (!cards || cards.length !== 1) {
          cards = pickDailyFortuneCards(1);
        }
        prompt = buildDailyFortunePrompt(fortunePromptMessage, cards);
      } else {
        tarotSpread = drawTarotSpread();
        cards = tarotSpread.map(toUiTarotCardData);
        prompt = buildTarotChatPrompt(fortunePromptMessage, tarotSpread);
      }
    }

    // OpenAI呼び出し
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: LUMINA_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    });

    const rawText = completion.choices[0].message?.content || "";
      const formattedText =
        resolvedMode === "chat"
          ? usedDialogueMode
            ? sanitizeDialogueReply(trimmedMessage, rawText)
            : sanitizeChatReply(trimmedMessage, rawText)
        : resolvedMode === "fortune"
          ? normalizeTarotReadingOutputHeadings(
              ensureTarotChatOutputFormat(rawText, tarotSpread ?? drawTarotSpread())
            )
        : resolvedMode === "daily-fortune"
          ? ensureFortuneOutputFormat(rawText, cards ?? [])
          : rawText;
    const immediateFortuneLeadIn =
      resolvedMode === "fortune" && mode === "chat" && !awaitingFortuneResult
        ? buildImmediateFortuneLeadIn(trimmedMessage)
        : null;
    const text =
      resolvedMode === "fortune" && awaitingFortuneResult && shouldAddAwaitingBridge
        ? `ありがとうございます。では、カードから見えたことをお伝えしますね。\n${formattedText}`
        : immediateFortuneLeadIn
          ? `${immediateFortuneLeadIn}\n${formattedText}`
          : formattedText;

    return NextResponse.json({
      text,
      cards: resolvedMode === "fortune" || resolvedMode === "daily-fortune" ? cards : null,
      conversationState:
        awaitingFortuneResult
          ? {
              ...nextConversationState,
              phase: "followup",
              awaitingConsent: false,
              awaitingTheme: false,
              questionStreak: 0,
              offtopicStreak: 0,
              awaitingFortuneResult: false,
            }
          : resolvedMode === "chat"
            ? {
                ...nextConversationState,
                phase:
                  nextConversationState.phase === "reading"
                    ? "followup"
                    : nextConversationState.phase,
                questionStreak: usedDialogueMode
                  ? Math.min((guardedDecision?.conversationState.questionStreak ?? 0) + 1, 2)
                  : nextConversationState.questionStreak,
                lastTopic:
                  (nextConversationState.lastTopic as string | null) ??
                  guardedDecision?.conversationState.lastTopic ??
                  null,
                offtopicStreak: guardedDecision?.conversationState.offtopicStreak ?? 0,
                awaitingFortuneResult: false,
              }
            : resolvedMode === "fortune"
              ? {
                  ...nextConversationState,
                  phase: "followup",
                  awaitingConsent: false,
                  awaitingTheme: false,
                  questionStreak: 0,
                  offtopicStreak: 0,
                  awaitingFortuneResult: false,
                }
              : undefined,
      meta:
        awaitingFortuneResult && awaitingFollowupIntent
          ? { awaitingFollowupIntent }
          : undefined,
    });
  } catch (error: unknown) {
    console.error("OpenAIエラー:", error);
    return NextResponse.json(
      { error: "ルミナさんとの通信に失敗しました。" },
      { status: 500 }
    );
  }
}
