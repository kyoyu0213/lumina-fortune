import { NextResponse } from "next/server";
import { addWish, listLatestWishes } from "@/lib/wish-garden";
import { checkModerationPostInterval, resolveModerationUserKey } from "@/lib/moderation/rateLimit";
import { MODERATION_MESSAGES } from "@/lib/moderation/messages";
import { apiError } from "@/lib/api-error";

// 想定外エラー時の環境診断（このルートは Claude を呼ばないため hasAnthropicKey は付けない）
const errorDiag = () => ({ vercel: process.env.VERCEL === "1", nodeEnv: process.env.NODE_ENV });

type CreateWishBody = {
  message?: string;
  userKey?: string;
};

// validateModerationText が throw しうるモデレーションUX文言集合。
// MODERATION_MESSAGES を直接参照し、死リテラルとのズレで 500 に漏れないようにする
// （tooLong/url/ngWord/spamWord/spam を網羅）。
const MODERATION_ERROR_MESSAGES = new Set<string>(Object.values(MODERATION_MESSAGES));

export async function GET() {
  try {
    const wishes = await listLatestWishes(24);
    return NextResponse.json({ wishes });
  } catch (error) {
    return apiError(error, { route: "wish-garden", shape: "error", extra: errorDiag() });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateWishBody;
    const rateLimit = await checkModerationPostInterval(
      resolveModerationUserKey(request, [body.userKey])
    );
    if (!rateLimit.ok) {
      return NextResponse.json({ error: rateLimit.error }, { status: 400 });
    }

    const rawMessage = typeof body.message === "string" ? body.message : "";
    const wish = await addWish(rawMessage);
    return NextResponse.json({ wish }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "message is required" ||
        error.message === "message is too long" ||
        MODERATION_ERROR_MESSAGES.has(error.message)
      ) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
    return apiError(error, { route: "wish-garden", shape: "error", extra: errorDiag() });
  }
}
