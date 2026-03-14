// プロフィール削除処理
// - Supabase の profiles テーブルから該当レコードを削除
// - localStorage のプロフィール関連データを削除
// - Cookie のプロフィール関連データを削除
// - anonymous_id / visitor_id は残す

import { supabaseDelete } from "./supabase-client";
import { clearStoredProfileId, trackEvent } from "./track";
import { getAnonymousId } from "./visitor";
import {
  BIRTHDATE_COOKIE_KEY,
  BIRTHDATE_STORAGE_KEY,
  MONTHLY_BIRTH_COOKIE_KEY,
  PROFILE_BIRTHDATE_COOKIE_KEY,
  PROFILE_STORAGE_KEY,
  PROFILE_UPDATED_AT_COOKIE_KEY,
} from "@/lib/profile/profile-store";

/** Cookie を削除（max-age=0 で即期限切れにする） */
function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; samesite=lax; max-age=0`;
}

export type DeleteProfileResult = {
  success: boolean;
  error?: string;
};

/**
 * プロフィールを削除する
 * - Supabase profiles テーブルから削除
 * - localStorage のプロフィール関連キーを削除
 * - Cookie のプロフィール関連キーを削除
 * - profile_deleted イベントを送信
 */
export async function deleteProfile(): Promise<DeleteProfileResult> {
  try {
    // 1. Supabase の profiles テーブルから削除
    const anonymousId = getAnonymousId();
    const deleted = await supabaseDelete("profiles", {
      visitor_id: `eq.${anonymousId}`,
    });

    // Supabase 削除が失敗しても localStorage は消す（部分成功を許容）
    if (!deleted) {
      console.warn("[profile-delete] Supabase profiles 削除に失敗しましたが、ローカルデータは削除します");
    }

    // 2. localStorage のプロフィール関連データを削除
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      localStorage.removeItem(BIRTHDATE_STORAGE_KEY);
      clearStoredProfileId();
    } catch {
      // localStorage が使えない環境でも継続
    }

    // 3. Cookie のプロフィール関連データを削除
    try {
      deleteCookie(PROFILE_BIRTHDATE_COOKIE_KEY);
      deleteCookie(BIRTHDATE_COOKIE_KEY);
      deleteCookie(MONTHLY_BIRTH_COOKIE_KEY);
      deleteCookie(PROFILE_UPDATED_AT_COOKIE_KEY);
    } catch {
      // Cookie 削除失敗は無視
    }

    // 4. 分析イベントを送信
    void trackEvent("profile_deleted", "/profile", "profile_delete_button");

    return { success: true };
  } catch {
    return {
      success: false,
      error: "削除に失敗しました。時間をおいてもう一度お試しください。",
    };
  }
}
