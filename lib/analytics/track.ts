// 共通イベント送信関数
// events テーブルに INSERT する

import { supabaseInsert } from "./supabase-client";
import { getAnonymousId } from "./visitor";
import type { EventInsertPayload } from "./types";

const PROFILE_ID_KEY = "lumina_profile_id";

/** localStorage に保存された profile_id を取得 */
export function getStoredProfileId(): string | null {
  try {
    return localStorage.getItem(PROFILE_ID_KEY);
  } catch {
    return null;
  }
}

/** profile_id を localStorage に保存（プロフィール登録成功時に呼ぶ） */
export function setStoredProfileId(profileId: string): void {
  try {
    localStorage.setItem(PROFILE_ID_KEY, profileId);
  } catch {
    // localStorage が使えない環境でも無視
  }
}

/** profile_id を localStorage から削除（プロフィール削除時に呼ぶ） */
export function clearStoredProfileId(): void {
  try {
    localStorage.removeItem(PROFILE_ID_KEY);
  } catch {
    // 無視
  }
}

/**
 * イベントを events テーブルに送信する
 * @param eventName - イベント名（例: page_view, hero_cta_click）
 * @param pagePath - ページパス（例: /, /columns）
 * @param target - クリック対象（例: hero_today_fortune）
 * @param meta - 追加メタデータ（JSON）
 */
export async function trackEvent(
  eventName: string,
  pagePath?: string,
  target?: string,
  meta?: Record<string, unknown>
): Promise<void> {
  try {
    const anonymousId = getAnonymousId();
    const profileId = getStoredProfileId();

    const payload: EventInsertPayload = {
      anonymous_id: anonymousId,
      profile_id: profileId ?? null,
      event_name: eventName,
      page_path: pagePath ?? (typeof window !== "undefined" ? window.location.pathname : null),
      target: target ?? null,
      meta: meta ?? null,
      created_at: new Date().toISOString(),
    };

    await supabaseInsert("events", payload);
  } catch {
    console.warn("[analytics] trackEvent failed:", eventName);
  }
}
