import { validateModerationText } from "@/lib/moderation/validateText";
import { listStoredWishes, saveStoredWish, type StoredWishSubmission } from "@/lib/storage/user-submissions";

export type WishEntry = StoredWishSubmission;

const MAX_STORE_ITEMS = 300;
const HIDDEN_WORD_PATTERN = /\bunko\b/i;

function normalizeMessage(input: string): string {
  return input.replace(/\r\n/g, "\n").trim();
}

function countChars(input: string): number {
  return Array.from(input).length;
}

function isHiddenWish(entry: WishEntry): boolean {
  return HIDDEN_WORD_PATTERN.test(entry.message);
}

export async function listLatestWishes(limit = 24): Promise<WishEntry[]> {
  const entries = await listStoredWishes();
  return entries.filter((entry) => !isHiddenWish(entry)).slice(0, Math.max(1, limit));
}

export async function addWish(messageInput: string): Promise<WishEntry> {
  const message = normalizeMessage(messageInput);
  if (!message) {
    throw new Error("message is required");
  }

  const moderation = validateModerationText(message, { maxLength: 100 });
  if (!moderation.ok) {
    throw new Error(moderation.error);
  }

  if (countChars(moderation.normalizedText) > 100) {
    throw new Error("message is too long");
  }

  const entry: WishEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    message: moderation.normalizedText,
    createdAt: new Date().toISOString(),
  };

  await saveStoredWish(entry, MAX_STORE_ITEMS);
  return entry;
}
