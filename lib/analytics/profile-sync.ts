// プロフィール登録時に profiles テーブルへ保存する
// 保存後に profile_id を localStorage に保持し、events 送信時に利用する

import { supabaseInsertReturning, supabasePatch, supabaseSelect } from "./supabase-client";
import { setStoredProfileId } from "./track";
import { getAnonymousId } from "./visitor";
import type { ProfileRow, ProfileSyncData } from "./types";

/** 星座を生年月日から算出 */
function getZodiacSign(birthdate: string): string {
  const [, m, d] = birthdate.split("-").map(Number);
  if (!m || !d) return "";
  const signs = [
    { sign: "やぎ座", end: [1, 19] },
    { sign: "みずがめ座", end: [2, 18] },
    { sign: "うお座", end: [3, 20] },
    { sign: "おひつじ座", end: [4, 19] },
    { sign: "おうし座", end: [5, 20] },
    { sign: "ふたご座", end: [6, 21] },
    { sign: "かに座", end: [7, 22] },
    { sign: "しし座", end: [8, 22] },
    { sign: "おとめ座", end: [9, 22] },
    { sign: "てんびん座", end: [10, 23] },
    { sign: "さそり座", end: [11, 22] },
    { sign: "いて座", end: [12, 21] },
    { sign: "やぎ座", end: [12, 31] },
  ];
  for (const { sign, end } of signs) {
    if (m < end[0] || (m === end[0] && d <= end[1])) return sign;
  }
  return "やぎ座";
}

/** 年代を算出 */
function getAgeBand(birthdate: string): string {
  const year = parseInt(birthdate.split("-")[0], 10);
  if (!year) return "";
  const age = new Date().getFullYear() - year;
  if (age < 20) return "10代";
  if (age < 30) return "20代";
  if (age < 40) return "30代";
  if (age < 50) return "40代";
  if (age < 60) return "50代";
  return "60代以上";
}

/** プロフィールを Supabase の profiles テーブルに保存し、profile_id を localStorage に保持 */
export async function syncProfileToSupabase(profile: ProfileSyncData): Promise<void> {
  try {
    const anonymousId = getAnonymousId();
    const zodiacSign = getZodiacSign(profile.birthdate);
    const ageBand = getAgeBand(profile.birthdate);

    const payload = {
      visitor_id: anonymousId,
      nickname: profile.nickname,
      birth_date: profile.birthdate,
      age_band: ageBand,
      zodiac_sign: zodiacSign,
      profile_completed: true,
    };

    // 既存プロフィールの確認
    const existing = await supabaseSelect<ProfileRow>(
      "profiles",
      { visitor_id: `eq.${anonymousId}` },
      "id,visitor_id"
    );

    if (existing.length > 0) {
      // 既存プロフィールを更新
      await supabasePatch(
        "profiles",
        { visitor_id: `eq.${anonymousId}` },
        payload
      );
      // 既存の profile_id を保持
      if (existing[0].id) {
        setStoredProfileId(existing[0].id);
      }
    } else {
      // 新規プロフィールを挿入し、返却された id を保持
      const inserted = await supabaseInsertReturning<ProfileRow>("profiles", payload);
      if (inserted?.id) {
        setStoredProfileId(inserted.id);
      }
    }
  } catch {
    console.warn("[analytics] profile sync failed");
  }
}
