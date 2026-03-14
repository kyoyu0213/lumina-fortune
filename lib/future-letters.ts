import {
  listStoredFutureLetters,
  saveStoredFutureLetter,
  type StoredFutureLetterSubmission,
} from "@/lib/storage/user-submissions";

export type FutureLetterRecord = {
  id: string;
  date: string;
  message: string;
  user: string;
  created_at: string;
};

const MAX_ITEMS = 1000;

export function getJstDateKey(base = new Date()): string {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(base);
  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  return `${year}-${month}-${day}`;
}

function toPublicRecord(entry: StoredFutureLetterSubmission): FutureLetterRecord {
  return {
    id: entry.id,
    date: entry.deliverDate,
    message: entry.message,
    user: entry.user,
    created_at: entry.createdAt,
  };
}

export async function saveFutureLetter(payload: {
  user?: string;
  message: string;
  date: string;
}): Promise<FutureLetterRecord> {
  const user = payload.user?.trim();
  const message = payload.message.trim();
  const date = payload.date.trim();

  if (!user) {
    throw new Error("user is required");
  }
  if (!message) {
    throw new Error("message is required");
  }
  if (Array.from(message).length > 500) {
    throw new Error("message is too long");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("date is invalid");
  }
  if (date < getJstDateKey()) {
    throw new Error("date must be today or later");
  }

  const entry: StoredFutureLetterSubmission = {
    id: `FL-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    user: user.slice(0, 40),
    message,
    deliverDate: date,
    createdAt: new Date().toISOString(),
  };

  await saveStoredFutureLetter(entry, MAX_ITEMS);
  return toPublicRecord(entry);
}

export async function listDeliveredFutureLetters(user: string, date = getJstDateKey()): Promise<FutureLetterRecord[]> {
  const trimmed = user.trim();
  if (!trimmed) return [];
  const entries = await listStoredFutureLetters(trimmed, date);
  return entries.map(toPublicRecord);
}
