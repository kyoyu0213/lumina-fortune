type SupabaseHeaders = Record<string, string>;

export type SupabaseStorageClient = {
  selectRows<T>(
    table: string,
    options: {
      columns: string;
      orderBy?: string;
      limit?: number;
      offset?: number;
      filters?: Record<string, string>;
    }
  ): Promise<T[]>;
  insertRow(table: string, payload: Record<string, unknown>): Promise<void>;
  deleteRowsByIds(table: string, ids: string[]): Promise<void>;
};

export type SupabaseStorageConfigState =
  | {
      state: "ready";
      client: SupabaseStorageClient;
      missing: [];
    }
  | {
      state: "missing_env";
      missing: string[];
    };

function getSupabaseEnv() {
  const url = process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

  return { url, serviceRoleKey };
}

function buildHeaders(serviceRoleKey: string): SupabaseHeaders {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function buildRestUrl(
  baseUrl: string,
  table: string,
  options?: {
    columns?: string;
    orderBy?: string;
    limit?: number;
    offset?: number;
    filters?: Record<string, string>;
  }
): string {
  const url = new URL(`/rest/v1/${table}`, baseUrl);
  if (options?.columns) {
    url.searchParams.set("select", options.columns);
  }
  if (options?.orderBy) {
    url.searchParams.set("order", options.orderBy);
  }
  if (typeof options?.limit === "number") {
    url.searchParams.set("limit", String(options.limit));
  }
  if (typeof options?.offset === "number") {
    url.searchParams.set("offset", String(options.offset));
  }
  if (options?.filters) {
    for (const [column, expr] of Object.entries(options.filters)) {
      url.searchParams.set(column, expr);
    }
  }
  return url.toString();
}

async function parseErrorBody(response: Response): Promise<string> {
  try {
    const json = (await response.json()) as { message?: string; error?: string; hint?: string };
    return json.message || json.error || json.hint || `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

function createRestClient(baseUrl: string, serviceRoleKey: string): SupabaseStorageClient {
  const headers = buildHeaders(serviceRoleKey);

  return {
    async selectRows<T>(
      table: string,
      options: {
        columns: string;
        orderBy?: string;
        limit?: number;
        offset?: number;
        filters?: Record<string, string>;
      }
    ) {
      const response = await fetch(buildRestUrl(baseUrl, table, options), {
        method: "GET",
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        const detail = await parseErrorBody(response);
        throw new Error(`Supabase select failed for ${table}: ${detail}`);
      }

      return (await response.json()) as T[];
    },

    async insertRow(table: string, payload: Record<string, unknown>) {
      const response = await fetch(buildRestUrl(baseUrl, table), {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!response.ok) {
        const detail = await parseErrorBody(response);
        throw new Error(`Supabase insert failed for ${table}: ${detail}`);
      }
    },

    async deleteRowsByIds(table: string, ids: string[]) {
      if (ids.length === 0) return;

      const url = new URL(buildRestUrl(baseUrl, table));
      url.searchParams.set("id", `in.(${ids.map((id) => `"${id}"`).join(",")})`);

      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          ...headers,
          Prefer: "return=minimal",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const detail = await parseErrorBody(response);
        throw new Error(`Supabase delete failed for ${table}: ${detail}`);
      }
    },
  };
}

export function createSupabaseServerStorageClient(): SupabaseStorageConfigState {
  const { url, serviceRoleKey } = getSupabaseEnv();
  const missing: string[] = [];

  if (!url) missing.push("SUPABASE_URL");
  if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

  if (missing.length > 0) {
    console.error("[storage/supabase-server] missing Supabase server environment variables", {
      missing,
      hasUrl: Boolean(url),
      hasServiceRoleKey: Boolean(serviceRoleKey),
      vercel: process.env.VERCEL === "1",
      nodeEnv: process.env.NODE_ENV,
    });
    return { state: "missing_env", missing };
  }

  return {
    state: "ready",
    client: createRestClient(url, serviceRoleKey),
    missing: [],
  };
}
