import type { FortuneNumber } from "@/lib/fortune/types";

export const SOUL_NAME_BY_NUMBER: Record<FortuneNumber, string> = {
  1: "黎明のひかり",
  2: "月雫のこころ",
  3: "花ひらく声",
  4: "白土のまもり",
  5: "風巡る羽",
  6: "灯火のまなざし",
  7: "星影の叡智",
  8: "黄金の礎",
  9: "満ちる慈愛",
};

export function getSoulNameByNumber(number: FortuneNumber): string {
  return SOUL_NAME_BY_NUMBER[number];
}
