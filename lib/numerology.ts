import { isFortuneNumber, type FortuneNumber } from "./fortune/types";

function assertBirthdate(dateString: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error("Invalid birthdate format");
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    throw new Error("Invalid birthdate");
  }

  return { year, month, day };
}

function reduceDigits(value: string): FortuneNumber {
  let sum = value.split("").reduce((total, digit) => total + Number(digit), 0);

  while (sum >= 10) {
    sum = String(sum)
      .split("")
      .reduce((total, digit) => total + Number(digit), 0);
  }

  if (!isFortuneNumber(sum)) {
    throw new Error("Reduced value out of range");
  }

  return sum;
}

export function destinyNumberFromBirthdate(dateString: string): FortuneNumber {
  assertBirthdate(dateString);
  return reduceDigits(dateString.replace(/\D/g, ""));
}

export function personalYearNumberFromBirthdate(
  dateString: string,
  targetYear: number,
): FortuneNumber {
  const { month, day } = assertBirthdate(dateString);

  if (!Number.isInteger(targetYear) || targetYear < 1) {
    throw new Error("Invalid target year");
  }

  const monthDayDigits = `${month}${day}`;
  const yearDigits = String(targetYear).replace(/\D/g, "");
  return reduceDigits(`${monthDayDigits}${yearDigits}`);
}

export function getThreeYearWindow(baseYear = new Date().getFullYear()) {
  if (!Number.isInteger(baseYear) || baseYear < 1) {
    throw new Error("Invalid base year");
  }

  return [baseYear, baseYear + 1, baseYear + 2] as const;
}
