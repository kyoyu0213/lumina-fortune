import { buildMonthlyDailyNumberFortunes } from "../lib/fortune/daily-number-fortunes";
import type { FortuneNumber } from "../lib/fortune/types";

for (let dn = 1; dn <= 9; dn++) {
  const all: string[] = [];
  for (let m = 1; m <= 12; m++) {
    const fortunes = buildMonthlyDailyNumberFortunes({ year: 2026, month: m, destinyNumber: dn as FortuneNumber });
    fortunes.forEach(f => all.push(f.headline));
  }
  const unique = new Set(all);
  console.log(`運命数${dn}: ${all.length}日 / ユニーク${unique.size} / 重複${all.length - unique.size}`);
}
