import { NextResponse } from "next/server";
import { getLightRecords, saveLightRecord } from "@/lib/light-records";
import { checkModerationPostInterval, resolveModerationUserKey } from "@/lib/moderation/rateLimit";
import { MODERATION_MESSAGES } from "@/lib/moderation/messages";

// validateModerationText が throw しうるモデレーションUX文言集合。
// 死リテラルとのズレで 500 に漏れないよう MODERATION_MESSAGES を直接参照する。
const MODERATION_ERROR_MESSAGES = new Set<string>(Object.values(MODERATION_MESSAGES));

type SaveBody = {
  action: "save";
  profile?: {
    nickname?: string;
  };
  payload?: {
    dateKey?: string;
    cardName?: string;
    message?: string;
  };
};

type ListBody = {
  action: "list";
  profile?: {
    nickname?: string;
  };
};

type RequestBody = SaveBody | ListBody;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const nickname = body.profile?.nickname?.trim();
    if (!nickname) {
      return NextResponse.json({ error: "nickname is required" }, { status: 400 });
    }

    if (body.action === "list") {
      const records = await getLightRecords(nickname);
      return NextResponse.json({ records });
    }

    if (body.action === "save") {
      const dateKey = body.payload?.dateKey?.trim();
      const cardName = body.payload?.cardName?.trim();
      const message = body.payload?.message?.trim();
      if (!dateKey || !cardName || !message) {
        return NextResponse.json({ error: "invalid payload" }, { status: 400 });
      }
      const rateLimit = await checkModerationPostInterval(
        resolveModerationUserKey(request, [nickname])
      );
      if (!rateLimit.ok) {
        return NextResponse.json({ error: rateLimit.error }, { status: 400 });
      }
      const record = await saveLightRecord(nickname, { dateKey, cardName, message });
      return NextResponse.json({ record });
    }

    return NextResponse.json({ error: "invalid action" }, { status: 400 });
  } catch (error) {
    if (error instanceof Error && MODERATION_ERROR_MESSAGES.has(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
