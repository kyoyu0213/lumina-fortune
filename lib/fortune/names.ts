import { isFortuneNumber, type FortuneNumber } from "@/lib/fortune/types";

export const fortuneNumberNames: Record<FortuneNumber, string> = {
  1: "はじまりの光",
  2: "調和のしずく",
  3: "祝福の歌声",
  4: "大地の守り手",
  5: "風をまとう旅人",
  6: "愛を灯す人",
  7: "静寂の賢者",
  8: "実りを築く星",
  9: "慈しみの月",
};

export function getFortuneNumberName(number: number): string | null {
  return isFortuneNumber(number) ? fortuneNumberNames[number] : null;
}
