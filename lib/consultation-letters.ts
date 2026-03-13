import { validateModerationText } from "@/lib/moderation/validateText";
import {
  saveStoredConsultationLetter,
  type StoredConsultationLetterSubmission,
} from "@/lib/storage/user-submissions";

export type ConsultationLetter = StoredConsultationLetterSubmission;

const MAX_ITEMS = 500;

export async function saveConsultationLetter(payload: {
  nickname?: string;
  message: string;
}): Promise<ConsultationLetter> {
  const message = payload.message.trim();
  if (!message) {
    throw new Error("message is required");
  }

  const moderation = validateModerationText(message, { maxLength: 300 });
  if (!moderation.ok) {
    throw new Error(moderation.error);
  }

  if (Array.from(moderation.normalizedText).length > 300) {
    throw new Error("message is too long");
  }

  const nickname = payload.nickname?.trim();
  const letter: ConsultationLetter = {
    id: `CL-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nickname: nickname ? nickname.slice(0, 40) : null,
    message: moderation.normalizedText,
    createdAt: new Date().toISOString(),
  };

  await saveStoredConsultationLetter(letter, MAX_ITEMS);
  return letter;
}
