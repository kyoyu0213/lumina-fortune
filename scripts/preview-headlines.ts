import { buildMonthlyDailyNumberFortunes } from "../lib/fortune/daily-number-fortunes";
import type { FortuneNumber } from "../lib/fortune/types";

const year = 2026;
const month = 8;
const destinyNumber: FortuneNumber = 1;

const fortunes = buildMonthlyDailyNumberFortunes({ year, month, destinyNumber });
for (const f of fortunes) {
  const stars = "★".repeat(f.flowLevel);
  console.log(`${f.date} ${stars} ${f.headline}`);
}
