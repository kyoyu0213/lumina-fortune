import { NextResponse } from "next/server";
import OpenAI from "openai";
import { pickRandomCards } from "@/lib/fortune-data";
import {
  buildBirthdate2026Prompt,
  buildChatPrompt,
  buildDialoguePrompt,
  buildDailyFortunePrompt,
  buildTarotPrompt,
} from "@/lib/prompt-builder";
import { ensureFortuneOutputFormat } from "@/lib/fortune-output";
import { greetingMessage, greetingResponse } from "@/lib/greeting-message";
import {
  buildFortuneOfferReply,
  getDialogueConversationState,
  type ChatHistoryItem,
} from "@/lib/dialogue-transition";
import {
  isDialogueModeInput,
  isFortuneRequestInput,
  isGreetingOnlyInput,
} from "@/lib/input-guards";
import { sanitizeChatReply, sanitizeDialogueReply } from "@/lib/pre-fortune-reply";
import { replyStyle } from "@/lib/reply-style";

type RequestBody = {
  message?: string;
  cards?: { name: string; reversed?: boolean }[];
  mode?: string;
  history?: ChatHistoryItem[];
};

// OpenAI初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LUMINA_SYSTEM_PROMPT = `あなたは白の魔女ルミナです。占い師として丁寧で落ち着いた口調を保ってください。
相談者の恋愛や人間関係の当事者は相談者本人であり、あなたは第三者・伴走者として助言と質問に徹してください。
「私も〜したい」「一緒に〜しよう」「私も興味がある」のように、あなた自身が当事者化する表現は禁止です。`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { message, cards: existingCards, mode = "chat" } = body;
    const history = Array.isArray(body.history) ? body.history : [];
    const trimmedMessage = message?.trim() || "こんにちは";
    const resolvedMode =
      mode === "chat" && isFortuneRequestInput(trimmedMessage) ? "fortune" : mode;

    if (resolvedMode === "chat" && trimmedMessage === "__welcome__") {
      return NextResponse.json({
        text: greetingMessage,
        cards: null,
      });
    }
    if (resolvedMode === "chat" && isGreetingOnlyInput(trimmedMessage)) {
      return NextResponse.json({
        text: greetingResponse,
        cards: null,
      });
    }
    if (resolvedMode === "chat") {
      const conversationState = getDialogueConversationState(history, trimmedMessage);
      if (conversationState.shouldOfferFortune) {
        return NextResponse.json({
          text: buildFortuneOfferReply(history, trimmedMessage),
          cards: null,
          conversationState: {
            questionStreak: conversationState.questionStreak,
          },
        });
      }
    }

    let prompt = "";
    let cards = existingCards;
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
      const isWorkFortuneRequest = /仕事運|学業運|仕事/.test(trimmedMessage);
      const fallbackCount =
        resolvedMode === "daily-fortune" || (resolvedMode === "fortune" && isWorkFortuneRequest)
          ? 1
          : 3;
      if (!cards || cards.length !== fallbackCount) {
        cards = pickRandomCards(fallbackCount);
      }

      if (resolvedMode === "daily-fortune") {
        prompt = buildDailyFortunePrompt(trimmedMessage, cards);
      } else {
        prompt = buildTarotPrompt(trimmedMessage, cards);
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
    const text =
      resolvedMode === "chat"
        ? usedDialogueMode
          ? sanitizeDialogueReply(trimmedMessage, rawText)
          : sanitizeChatReply(trimmedMessage, rawText)
        : resolvedMode === "fortune"
          ? ensureFortuneOutputFormat(rawText, cards ?? [])
        : rawText;

    return NextResponse.json({
      text,
      cards: resolvedMode === "fortune" || resolvedMode === "daily-fortune" ? cards : null,
      conversationState:
        resolvedMode === "chat"
          ? {
              questionStreak: usedDialogueMode ? 1 : 0,
            }
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
