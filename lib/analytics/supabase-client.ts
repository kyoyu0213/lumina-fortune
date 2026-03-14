// Supabase ブラウザクライアント（分析用）
// 環境変数: NEXT_PUBLIC_SUPABASE_URL（または SUPABASE_URL からのフォールバック）
//           NEXT_PUBLIC_SUPABASE_ANON_KEY
// ※ service role key はブラウザ側では使わない

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  return { url, anonKey };
}

function headers(anonKey: string) {
  return {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
    "Content-Type": "application/json",
  };
}

/** Supabase REST API に POST (insert) する — 結果を返さない */
export async function supabaseInsert(
  table: string,
  payload: Record<string, unknown>
): Promise<boolean> {
  const { url, anonKey } = getEnv();
  if (!url || !anonKey) return false;

  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: { ...headers(anonKey), Prefer: "return=minimal" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.warn(`[analytics] INSERT ${table} failed:`, res.status);
    return res.ok;
  } catch (e) {
    console.warn(`[analytics] INSERT ${table} error:`, e);
    return false;
  }
}

/** Supabase REST API に POST (insert) して挿入行を返す */
export async function supabaseInsertReturning<T>(
  table: string,
  payload: Record<string, unknown>
): Promise<T | null> {
  const { url, anonKey } = getEnv();
  if (!url || !anonKey) return null;

  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: { ...headers(anonKey), Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn(`[analytics] INSERT ${table} failed:`, res.status);
      return null;
    }
    const rows = (await res.json()) as T[];
    return rows[0] ?? null;
  } catch (e) {
    console.warn(`[analytics] INSERT ${table} error:`, e);
    return null;
  }
}

/** Supabase REST API に PATCH (update) する */
export async function supabasePatch(
  table: string,
  filters: Record<string, string>,
  payload: Record<string, unknown>
): Promise<boolean> {
  const { url, anonKey } = getEnv();
  if (!url || !anonKey) return false;

  try {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${url}/rest/v1/${table}?${params.toString()}`, {
      method: "PATCH",
      headers: { ...headers(anonKey), Prefer: "return=minimal" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.warn(`[analytics] PATCH ${table} failed:`, res.status);
    return res.ok;
  } catch (e) {
    console.warn(`[analytics] PATCH ${table} error:`, e);
    return false;
  }
}

/** Supabase REST API に DELETE する */
export async function supabaseDelete(
  table: string,
  filters: Record<string, string>
): Promise<boolean> {
  const { url, anonKey } = getEnv();
  if (!url || !anonKey) return false;

  try {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${url}/rest/v1/${table}?${params.toString()}`, {
      method: "DELETE",
      headers: { ...headers(anonKey), Prefer: "return=minimal" },
    });
    if (!res.ok) console.warn(`[analytics] DELETE ${table} failed:`, res.status);
    return res.ok;
  } catch (e) {
    console.warn(`[analytics] DELETE ${table} error:`, e);
    return false;
  }
}

/** Supabase REST API に SELECT する */
export async function supabaseSelect<T>(
  table: string,
  filters: Record<string, string>,
  columns = "*"
): Promise<T[]> {
  const { url, anonKey } = getEnv();
  if (!url || !anonKey) return [];

  try {
    const params = new URLSearchParams({ select: columns, ...filters });
    const res = await fetch(`${url}/rest/v1/${table}?${params.toString()}`, {
      method: "GET",
      headers: headers(anonKey),
    });
    if (!res.ok) {
      console.warn(`[analytics] SELECT ${table} failed:`, res.status);
      return [];
    }
    return (await res.json()) as T[];
  } catch (e) {
    console.warn(`[analytics] SELECT ${table} error:`, e);
    return [];
  }
}
