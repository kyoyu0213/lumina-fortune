import { NextResponse } from "next/server";
import {
  getJstDateKey,
  getLatestWishForUser,
  getMoonlightWishState,
  saveMoonlightWish,
} from "@/lib/moonlight-wishes";
import { checkModerationPostInterval, resolveModerationUserKey } from "@/lib/moderation/rateLimit";
import { MODERATION_MESSAGES } from "@/lib/moderation/messages";
import { apiError } from "@/lib/api-error";

type Body = {
  user_id?: string;
  wish_text?: string;
};

// validateModerationText が throw しうるモデレーションUX文言集合。
// 死リテラルとのズレで 500 に漏れないよう MODERATION_MESSAGES を直接参照する。
const MODERATION_ERROR_MESSAGES = new Set<string>(Object.values(MODERATION_MESSAGES));

// 想定外エラー時の環境診断（このルートは Claude を呼ばないため hasAnthropicKey は付けない）
const errorDiag = () => ({ vercel: process.env.VERCEL === "1", nodeEnv: process.env.NODE_ENV });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id")?.trim() ?? "";
    const dateKey = getJstDateKey();
    const state = getMoonlightWishState(dateKey);
    const wish = state.canReview ? await getLatestWishForUser(user_id) : null;
    return NextResponse.json(
      {
        ok: true,
        dateKey,
        phaseLabel: state.moon.phaseLabel,
        majorPhase: state.moon.majorPhase,
        canWrite: state.canWrite,
        canReview: state.canReview,
        wish,
      },
      { status: 200 }
    );
  } catch (error) {
    return apiError(error, { route: "moonlight-wish", shape: "ok", extra: errorDiag() });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const rateLimit = await checkModerationPostInterval(
      resolveModerationUserKey(request, [body.user_id])
    );
    if (!rateLimit.ok) {
      return NextResponse.json({ ok: false, error: rateLimit.error }, { status: 400 });
    }

    const record = await saveMoonlightWish({
      user_id: typeof body.user_id === "string" ? body.user_id : "",
      wish_text: typeof body.wish_text === "string" ? body.wish_text : "",
      newmoon_date: getJstDateKey(),
    });
    return NextResponse.json({ ok: true, wish: record }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "user_id is required" ||
        error.message === "wish_text is required" ||
        error.message === "wish_text is too long" ||
        error.message === "newmoon_date is invalid" ||
        error.message === "new moon only" ||
        MODERATION_ERROR_MESSAGES.has(error.message)
      ) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      }
    }
    return apiError(error, { route: "moonlight-wish", shape: "ok", extra: errorDiag() });
  }
}
