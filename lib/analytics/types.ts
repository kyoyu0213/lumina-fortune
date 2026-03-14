// Supabase テーブルの型定義（分析用）

/** visitors テーブルの行 */
export type VisitorRow = {
  id?: string;
  anonymous_id: string;
  first_seen_at: string;
  last_seen_at: string;
  visit_count: number;
  user_agent?: string;
};

/** profiles テーブルの行 */
export type ProfileRow = {
  id?: string;
  visitor_id: string;
  nickname: string;
  birth_date: string;
  age_band: string;
  zodiac_sign: string;
  profile_completed: boolean;
};

/** events テーブルへの INSERT ペイロード */
export type EventInsertPayload = {
  anonymous_id: string;
  profile_id?: string | null;
  event_name: string;
  page_path?: string | null;
  target?: string | null;
  meta?: Record<string, unknown> | null;
  created_at: string;
};

/** プロフィール保存時の入力データ */
export type ProfileSyncData = {
  nickname: string;
  birthdate: string;
  loveStatus?: string;
  job?: string;
};
