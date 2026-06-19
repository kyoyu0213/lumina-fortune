import { NextResponse } from "next/server";
import { addWish, listLatestWishes } from "@/lib/wish-garden";
import { checkModerationPostInterval, resolveModerationUserKey } from "@/lib/moderation/rateLimit";
import { MODERATION_MESSAGES } from "@/lib/moderation/messages";

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
    console.error("[api/wish-garden][GET] failed to load wishes", {
      message: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "failed to load wishes" }, { status: 500 });
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
    console.error("[api/wish-garden][POST] failed to save wish", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "unknown",
    });
    return NextResponse.json({ error: "failed to save wish" }, { status: 500 });
  }
}
