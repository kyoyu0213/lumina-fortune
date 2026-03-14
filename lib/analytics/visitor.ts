// visitor 初期化処理
// - localStorage に anonymous_id がなければ生成して保存
// - visitors テーブルに記録（初回は INSERT、再訪は visit_count +1 更新）

import { supabaseInsert, supabasePatch, supabaseSelect } from "./supabase-client";
import type { VisitorRow } from "./types";

const ANON_ID_KEY = "lumina_anonymous_id";

/** crypto.randomUUID が使えない環境用のフォールバック */
function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** anonymous_id を取得（なければ生成して localStorage に保存） */
export function getAnonymousId(): string {
  try {
    let id = localStorage.getItem(ANON_ID_KEY);
    if (!id) {
      id = generateId();
      localStorage.setItem(ANON_ID_KEY, id);
    }
    return id;
  } catch {
    // localStorage が使えない場合はセッション限りの ID
    return generateId();
  }
}

/** visitors テーブルに初回 INSERT または再訪時 visit_count +1 更新 */
export async function initVisitor(): Promise<string> {
  const anonymousId = getAnonymousId();

  try {
    // 既存 visitor を検索
    const existing = await supabaseSelect<VisitorRow>(
      "visitors",
      { anonymous_id: `eq.${anonymousId}` },
      "anonymous_id,visit_count"
    );

    if (existing.length > 0) {
      // 再訪: last_seen_at 更新 + visit_count インクリメント
      const currentCount = existing[0].visit_count ?? 0;
      await supabasePatch(
        "visitors",
        { anonymous_id: `eq.${anonymousId}` },
        {
          last_seen_at: new Date().toISOString(),
          visit_count: currentCount + 1,
        }
      );
    } else {
      // 初回訪問: INSERT
      await supabaseInsert("visitors", {
        anonymous_id: anonymousId,
        first_seen_at: new Date().toISOString(),
        last_seen_at: new Date().toISOString(),
        visit_count: 1,
        user_agent: navigator.userAgent,
      });
    }
  } catch {
    // 分析用なので失敗しても UX に影響させない
    console.warn("[analytics] visitor init failed");
  }

  return anonymousId;
}
