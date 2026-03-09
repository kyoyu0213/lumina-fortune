import { BIRTHDATE_STORAGE_KEY, getStoredProfileBirthdate, PROFILE_STORAGE_KEY } from "@/lib/profile/profile-store";

export { BIRTHDATE_STORAGE_KEY, PROFILE_STORAGE_KEY };

export function getClientProfileBirthdate(): string {
  return getStoredProfileBirthdate();
}

export function getInitialBirthdate(serverBirthdate: string | null): string {
  if (serverBirthdate) return serverBirthdate;
  return getClientProfileBirthdate();
}
