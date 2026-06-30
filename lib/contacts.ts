import { validateModerationText } from "@/lib/moderation/validateText";
import { saveStoredContact, type StoredContactSubmission } from "@/lib/storage/user-submissions";

export type Contact = StoredContactSubmission;

const MAX_ITEMS = 1000;
const MAX_NAME_LENGTH = 60;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

// 入口の形式ガード用。厳密なRFC準拠ではなく「明らかに不正なものを弾く」程度。
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function countChars(input: string): number {
  return Array.from(input).length;
}

export async function saveContact(payload: {
  name?: string;
  email?: string;
  message?: string;
}): Promise<Contact> {
  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").replace(/\r\n/g, "\n").trim();

  if (!name) {
    throw new Error("name is required");
  }
  if (countChars(name) > MAX_NAME_LENGTH) {
    throw new Error("name is too long");
  }

  if (!email) {
    throw new Error("email is required");
  }
  if (countChars(email) > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    throw new Error("email is invalid");
  }

  if (!message) {
    throw new Error("message is required");
  }

  const moderation = validateModerationText(message, { maxLength: MAX_MESSAGE_LENGTH });
  if (!moderation.ok) {
    throw new Error(moderation.error);
  }
  if (countChars(moderation.normalizedText) > MAX_MESSAGE_LENGTH) {
    throw new Error("message is too long");
  }

  const contact: Contact = {
    id: `CT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.slice(0, MAX_NAME_LENGTH),
    email,
    message: moderation.normalizedText,
    createdAt: new Date().toISOString(),
  };

  await saveStoredContact(contact, MAX_ITEMS);
  return contact;
}
