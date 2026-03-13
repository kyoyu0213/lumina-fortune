import {
  createSupabaseServerStorageClient,
  type SupabaseStorageClient,
  type SupabaseStorageConfigState,
} from "@/lib/storage/supabase-server";

export type StoredWishSubmission = {
  id: string;
  message: string;
  createdAt: string;
};

export type StoredConsultationLetterSubmission = {
  id: string;
  nickname: string | null;
  message: string;
  createdAt: string;
};

type UserSubmissionStoreState = {
  wishes: StoredWishSubmission[];
  consultationLetters: StoredConsultationLetterSubmission[];
};

type UserSubmissionStorageAdapter = {
  listWishes(): Promise<StoredWishSubmission[]>;
  saveWish(entry: StoredWishSubmission, limit: number): Promise<void>;
  listConsultationLetters(): Promise<StoredConsultationLetterSubmission[]>;
  saveConsultationLetter(entry: StoredConsultationLetterSubmission, limit: number): Promise<void>;
};

type WishRow = {
  id: string;
  message: string;
  created_at: string;
};

type ConsultationLetterRow = {
  id: string;
  nickname: string | null;
  message: string;
  created_at: string;
};

const memoryState: UserSubmissionStoreState = {
  wishes: [],
  consultationLetters: [],
};

let hasWarnedMemoryFallback = false;

function logStorageFailure(context: string, error: unknown, extra?: Record<string, unknown>) {
  console.error(`[storage/user-submissions] ${context}`, {
    message: error instanceof Error ? error.message : String(error),
    name: error instanceof Error ? error.name : "unknown",
    ...extra,
  });
}

function dedupeById<T extends { id: string; createdAt: string }>(items: T[]): T[] {
  const deduped = new Map<string, T>();

  for (const item of items) {
    deduped.set(item.id, item);
  }

  return Array.from(deduped.values()).sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
}

function createMemoryAdapter(reason: string): UserSubmissionStorageAdapter {
  if (!hasWarnedMemoryFallback) {
    hasWarnedMemoryFallback = true;
    console.warn("[storage/user-submissions] using non-durable in-memory fallback", {
      reason,
      vercel: process.env.VERCEL === "1",
      nodeEnv: process.env.NODE_ENV,
    });
  }

  return {
    async listWishes() {
      return dedupeById(memoryState.wishes);
    },
    async saveWish(entry, limit) {
      memoryState.wishes = dedupeById([entry, ...memoryState.wishes]).slice(0, Math.max(1, limit));
    },
    async listConsultationLetters() {
      return dedupeById(memoryState.consultationLetters);
    },
    async saveConsultationLetter(entry, limit) {
      memoryState.consultationLetters = dedupeById([entry, ...memoryState.consultationLetters]).slice(0, Math.max(1, limit));
    },
  };
}

function mapWishRow(row: WishRow): StoredWishSubmission {
  return {
    id: row.id,
    message: row.message,
    createdAt: row.created_at,
  };
}

function mapConsultationLetterRow(row: ConsultationLetterRow): StoredConsultationLetterSubmission {
  return {
    id: row.id,
    nickname: row.nickname,
    message: row.message,
    createdAt: row.created_at,
  };
}

function toWishInsertPayload(entry: StoredWishSubmission): WishRow {
  return {
    id: entry.id,
    message: entry.message,
    created_at: entry.createdAt,
  };
}

function toConsultationLetterInsertPayload(entry: StoredConsultationLetterSubmission): ConsultationLetterRow {
  return {
    id: entry.id,
    nickname: entry.nickname,
    message: entry.message,
    created_at: entry.createdAt,
  };
}

async function pruneSupabaseTable(
  client: SupabaseStorageClient,
  table: string,
  limit: number
): Promise<void> {
  const safeLimit = Math.max(1, limit);
  const overflowRows = await client.selectRows<{ id: string }>(table, {
    columns: "id",
    orderBy: "created_at.desc",
    offset: safeLimit,
  });

  if (overflowRows.length === 0) return;

  await client.deleteRowsByIds(
    table,
    overflowRows.map((row) => row.id)
  );
}

function createSupabaseAdapter(client: SupabaseStorageClient): UserSubmissionStorageAdapter {
  return {
    async listWishes() {
      const rows = await client.selectRows<WishRow>("wishes", {
        columns: "id,message,created_at",
        orderBy: "created_at.desc",
        limit: 300,
      });
      return rows.map(mapWishRow);
    },
    async saveWish(entry, limit) {
      await client.insertRow("wishes", toWishInsertPayload(entry));
      await pruneSupabaseTable(client, "wishes", limit);
    },
    async listConsultationLetters() {
      const rows = await client.selectRows<ConsultationLetterRow>("consultation_letters", {
        columns: "id,nickname,message,created_at",
        orderBy: "created_at.desc",
        limit: 500,
      });
      return rows.map(mapConsultationLetterRow);
    },
    async saveConsultationLetter(entry, limit) {
      await client.insertRow("consultation_letters", toConsultationLetterInsertPayload(entry));
      await pruneSupabaseTable(client, "consultation_letters", limit);
    },
  };
}

function createMissingConfigAdapter(configState: SupabaseStorageConfigState): UserSubmissionStorageAdapter {
  const detail = {
    state: configState.state,
    missing: configState.missing,
    vercel: process.env.VERCEL === "1",
    nodeEnv: process.env.NODE_ENV,
  };

  if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
    return {
      async listWishes() {
        console.error("[storage/user-submissions] durable storage is unavailable for wishes", detail);
        return [];
      },
      async saveWish() {
        console.error("[storage/user-submissions] durable storage is unavailable for wish saves", detail);
        throw new Error("wish storage is not configured");
      },
      async listConsultationLetters() {
        console.error("[storage/user-submissions] durable storage is unavailable for consultation letters", detail);
        return [];
      },
      async saveConsultationLetter() {
        console.error("[storage/user-submissions] durable storage is unavailable for consultation letter saves", detail);
        throw new Error("consultation letter storage is not configured");
      },
    };
  }

  console.warn("[storage/user-submissions] Supabase env vars are missing; falling back to memory storage in non-production", detail);
  return createMemoryAdapter("missing_supabase_env");
}

function createUserSubmissionStorageAdapter(): UserSubmissionStorageAdapter {
  const clientState = createSupabaseServerStorageClient();
  if (clientState.state === "ready") {
    return createSupabaseAdapter(clientState.client);
  }

  return createMissingConfigAdapter(clientState);
}

const storageAdapter = createUserSubmissionStorageAdapter();

export async function listStoredWishes(): Promise<StoredWishSubmission[]> {
  try {
    return await storageAdapter.listWishes();
  } catch (error) {
    logStorageFailure("failed to load wishes", error);
    throw error;
  }
}

export async function saveStoredWish(entry: StoredWishSubmission, limit: number): Promise<void> {
  try {
    await storageAdapter.saveWish(entry, limit);
  } catch (error) {
    logStorageFailure("failed to save wish", error, { wishId: entry.id });
    throw error;
  }
}

export async function listStoredConsultationLetters(): Promise<StoredConsultationLetterSubmission[]> {
  try {
    return await storageAdapter.listConsultationLetters();
  } catch (error) {
    logStorageFailure("failed to load consultation letters", error);
    throw error;
  }
}

export async function saveStoredConsultationLetter(
  entry: StoredConsultationLetterSubmission,
  limit: number
): Promise<void> {
  try {
    await storageAdapter.saveConsultationLetter(entry, limit);
  } catch (error) {
    logStorageFailure("failed to save consultation letter", error, { letterId: entry.id });
    throw error;
  }
}
