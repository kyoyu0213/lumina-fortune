import { NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { saveConsultationLetter } from "@/lib/consultation-letters";
import { checkModerationPostInterval, resolveModerationUserKey } from "@/lib/moderation/rateLimit";
import { MODERATION_MESSAGES } from "@/lib/moderation/messages";
import { enforceClaudeRateLimit } from "@/lib/security/rate-limit";

// saveConsultationLetter が throw しうる「ユーザー起因のUXエラー文言」集合。
// MODERATION_MESSAGES を直接参照することで、文言が変わってもリテラル不一致で
// 500 にフォールスルーしない（tooLong/url/ngWord/spamWord/spam を網羅）。
const MODERATION_ERROR_MESSAGES = new Set<string>(Object.values(MODERATION_MESSAGES));

type Body = {
  nickname?: string;
  message?: string;
};

// ── 入力検証用Zodスキーマ（形式の入口ガードに徹する）──
// 既存の saveConsultationLetter 側の検証（message必須・300文字上限・NG語・URL・
// 連続語チェックの意図的な日本語UX文言）は温存し、Zodはそれを preempt しない。
// 役割分担:
//   - nickname: 生値がプロンプト/モデレーションキーへ未切り詰めで流入するため上限を新設。
//     クライアントは maxLength=40・保存時 slice(0,40) なので、≤100 なら正常系を一切弾かず
//     巨大nicknameによる注入のみ締められる（実上限40に対し約2.5倍の余裕）。
//   - message: 型(string)と「極端な長さ」のみ。既存の300文字UX判定を二重弾きしないよう、
//     上限は機能上限300を大きく上回る5000（約16倍）に設定。301〜5000は従来どおり
//     既存の "message is too long" / モデレーションUXに委ね、>5000の異常payloadのみ形式400。
const consultationRequestSchema = z.object({
  nickname: z.string().max(100).optional(),
  message: z.string().max(5000).optional(),
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const LUMINA_LETTER_SYSTEM_PROMPT = `あなたは「ルミナ」として返信します。
相手の悩みを占わずに受け止め、安心感と小さな前向きさを渡す文章を書いてください。

必須ルール:
- 占い・予言・カード・霊視などの表現は使わない
- 診断や断定をしない
- 優しく自然な日本語で2〜4文
- まず気持ちの受容、次に励まし
- 1つだけ、今日できる小さな行動を提案する
`;

function buildFallbackReply(nickname: string, message: string): string {
  const name = nickname.trim() ? `${nickname.trim()}さん` : "あなた";
  const shortMessage = message.trim().slice(0, 120);
  return `${name}、言葉にして届けてくれてありがとう。${shortMessage ? `「${shortMessage}」という気持ち、ちゃんと受け取りました。` : "その気持ち、ちゃんと受け取りました。"}無理に元気を出さなくて大丈夫。今日は深呼吸を3回して、温かい飲み物をひと口だけゆっくり飲んでみてください。`;
}

async function buildLuminaLetterReply(nickname: string, message: string): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("[api/consultation-letter] ANTHROPIC_API_KEY is not set; using fallback reply");
    return buildFallbackReply(nickname, message);
  }

  const name = nickname.trim() || "（ニックネームなし）";
  const userPrompt = [
    `ニックネーム: ${name}`,
    "手紙本文:",
    message,
    "",
    "上記に対して、ルミナとして返信してください。",
  ].join("\n");

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: LUMINA_LETTER_SYSTEM_PROMPT,
      messages: [
        { role: "user", content: userPrompt },
      ],
    });

    const block = response.content[0];
    const text = block?.type === "text" ? block.text.trim() : "";
    if (!text) {
      return buildFallbackReply(nickname, message);
    }
    return text;
  } catch (error) {
    console.error("[api/consultation-letter] failed to generate Claude reply; using fallback reply", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "unknown",
    });
    return buildFallbackReply(nickname, message);
  }
}

export async function POST(request: Request) {
  try {
    const rateLimited = await enforceClaudeRateLimit(request, { daily: true });
    if (rateLimited) return rateLimited;

    const rawBody = await request.json();
    const parsed = consultationRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "リクエストの形式が正しくありません。" },
        { status: 400 }
      );
    }
    const body: Body = parsed.data;
    const message = typeof body.message === "string" ? body.message : "";
    const nickname = typeof body.nickname === "string" ? body.nickname : "";
    const rateLimit = await checkModerationPostInterval(
      resolveModerationUserKey(request, [nickname])
    );
    if (!rateLimit.ok) {
      return NextResponse.json({ ok: false, error: rateLimit.error }, { status: 400 });
    }
    const letter = await saveConsultationLetter({ nickname, message });
    const reply = await buildLuminaLetterReply(nickname, letter.message);
    return NextResponse.json({ ok: true, letter, reply }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "message is required" ||
        error.message === "message is too long" ||
        MODERATION_ERROR_MESSAGES.has(error.message)
      ) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      }
    }
    console.error("[api/consultation-letter][POST] failed to save letter", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "unknown",
      vercel: process.env.VERCEL === "1",
      nodeEnv: process.env.NODE_ENV,
      hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
    });
    return NextResponse.json({ ok: false, error: "failed to save letter" }, { status: 500 });
  }
}
