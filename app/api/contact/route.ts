import { NextResponse } from "next/server";
import { z } from "zod";
import { saveContact } from "@/lib/contacts";
import { checkModerationPostInterval, resolveModerationUserKey } from "@/lib/moderation/rateLimit";
import { MODERATION_MESSAGES } from "@/lib/moderation/messages";
import { apiError } from "@/lib/api-error";

// saveContact / モデレーションが throw しうる「ユーザー起因のUXエラー文言」集合。
// これらは 400 で返し、想定外エラー(500)と切り分ける。
const USER_ERROR_MESSAGES = new Set<string>([
  "name is required",
  "name is too long",
  "email is required",
  "email is invalid",
  "message is required",
  "message is too long",
  ...Object.values(MODERATION_MESSAGES),
]);

// 入口の形式ガード。厳密な検証は saveContact 側に委ね、ここは極端なpayloadのみ弾く。
const contactRequestSchema = z.object({
  name: z.string().max(200).optional(),
  email: z.string().max(400).optional(),
  message: z.string().max(8000).optional(),
  userKey: z.string().max(200).optional(),
});

const errorDiag = () => ({ vercel: process.env.VERCEL === "1", nodeEnv: process.env.NODE_ENV });

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = contactRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "リクエストの形式が正しくありません。" },
        { status: 400 }
      );
    }
    const body = parsed.data;

    const rateLimit = await checkModerationPostInterval(
      resolveModerationUserKey(request, [body.userKey, body.email])
    );
    if (!rateLimit.ok) {
      return NextResponse.json({ ok: false, error: rateLimit.error }, { status: 400 });
    }

    const contact = await saveContact({
      name: body.name,
      email: body.email,
      message: body.message,
    });
    return NextResponse.json({ ok: true, contact }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && USER_ERROR_MESSAGES.has(error.message)) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
    return apiError(error, { route: "contact", shape: "ok", extra: errorDiag() });
  }
}
