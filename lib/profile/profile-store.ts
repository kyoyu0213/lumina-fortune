export const PROFILE_STORAGE_KEY = "lumina_profile";
export const BIRTHDATE_STORAGE_KEY = "lumina_birthdate";
export const PROFILE_BIRTHDATE_COOKIE_KEY = "lumina_profile_birthdate";
export const BIRTHDATE_COOKIE_KEY = "lumina_birthdate";
export const MONTHLY_BIRTH_COOKIE_KEY = "lumina_birth";
export const PROFILE_UPDATED_AT_COOKIE_KEY = "lumina_profile_updated_at";
export const PROFILE_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export type LoveStatus = "single" | "married" | "complicated" | "unrequited";

export type StoredProfile = {
  nickname?: string;
  birthdate?: string;
  job?: string;
  occupation?: string;
  loveStatus?: LoveStatus | string;
  updatedAt?: string;
};

export function loadStoredProfile(): StoredProfile | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredProfile;
    return {
      nickname: typeof parsed.nickname === "string" ? parsed.nickname : undefined,
      birthdate: typeof parsed.birthdate === "string" ? parsed.birthdate : undefined,
      job:
        typeof parsed.job === "string"
          ? parsed.job
          : typeof parsed.occupation === "string"
            ? parsed.occupation
            : undefined,
      loveStatus: typeof parsed.loveStatus === "string" ? parsed.loveStatus : undefined,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : undefined,
    };
  } catch {
    return null;
  }
}

export function getStoredProfileBirthdate(): string {
  if (typeof window === "undefined") return "";

  try {
    const direct = localStorage.getItem(BIRTHDATE_STORAGE_KEY)?.trim() ?? "";
    if (direct) return direct;
  } catch {
    return "";
  }

  return loadStoredProfile()?.birthdate?.trim() ?? "";
}

export function buildProfileVersionKey(profile: StoredProfile | null | undefined): string {
  if (!profile) return "guest";

  return [
    profile.updatedAt?.trim() ?? "",
    profile.birthdate?.trim() ?? "",
    profile.nickname?.trim() ?? "",
    profile.job?.trim() ?? "",
    profile.loveStatus?.trim() ?? "",
  ].join("|");
}
