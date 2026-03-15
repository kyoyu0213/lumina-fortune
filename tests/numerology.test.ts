import assert from "node:assert/strict";
import { buildMonthlyDailyNumberFortunes, dayEnergyNumberFromDate } from "../lib/fortune/daily-number-fortunes";
import { getMoonPhaseForDateKey } from "../lib/moon-phase";
import { destinyNumberFromBirthdate } from "../lib/numerology";

function run() {
  // --- destiny number tests ---
  assert.equal(destinyNumberFromBirthdate("1990-12-25"), 2);
  assert.equal(destinyNumberFromBirthdate("2001-01-01"), 5);
  assert.equal(destinyNumberFromBirthdate("1988-08-08"), 6);
  assert.equal(destinyNumberFromBirthdate("1975-11-30"), 9);
  assert.equal(dayEnergyNumberFromDate("2026-03-11"), 6);
  assert.equal(dayEnergyNumberFromDate("2026-01-01"), 3);

  for (const sample of ["1990-12-25", "2026-01-01", "1964-02-29"]) {
    const value = destinyNumberFromBirthdate(sample);
    assert.ok(value >= 1 && value <= 9, `${sample} => ${value}`);
  }

  // --- monthly fortune structure tests ---
  const marchFortunes = buildMonthlyDailyNumberFortunes({
    year: 2026,
    month: 3,
    destinyNumber: 4,
  });

  assert.equal(marchFortunes.length, 31);
  assert.equal(marchFortunes[10]?.date, "2026-03-11");
  assert.equal(marchFortunes[10]?.dayNumber, 6);
  assert.equal(marchFortunes[10]?.flowLevel, 2);
  assert.equal(marchFortunes[10]?.title, "安定の慈しみの輪");
  assert.ok((marchFortunes[10]?.headline ?? "").length >= 5, "headline too short");
  assert.ok((marchFortunes[10]?.headline ?? "").length <= 40, "headline too long");
  assert.match(marchFortunes[10]?.summary ?? "", /愛情や気遣いがやわらかく巡りやすい流れです。/);
  assert.match(marchFortunes[10]?.action ?? "", /今日の流れをあなたらしく扱えます。/);
  assert.match(marchFortunes[10]?.emotion ?? "", /余白も同じくらい必要です。/);
  assert.deepEqual(marchFortunes[10]?.tags, ["愛情", "循環", "堅実", "信頼"]);

  // --- uniqueness within a single month ---
  for (let month = 1; month <= 12; month += 1) {
    const monthlyFortunes = buildMonthlyDailyNumberFortunes({
      year: 2026,
      month,
      destinyNumber: 1,
    });
    const uniqueHeadlines = new Set(monthlyFortunes.map((f) => f.headline));
    assert.equal(uniqueHeadlines.size, monthlyFortunes.length, `month ${month} has duplicate headlines`);
  }

  // --- headline basic constraints ---
  const allFortunes2026 = Array.from({ length: 12 }, (_, monthIndex) =>
    buildMonthlyDailyNumberFortunes({
      year: 2026,
      month: (monthIndex + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
      destinyNumber: 3,
    })
  ).flat();

  for (const fortune of allFortunes2026) {
    assert.ok(fortune.headline.length >= 5, `${fortune.date}: headline too short: ${fortune.headline}`);
    assert.ok(fortune.headline.length <= 40, `${fortune.date}: headline too long (${fortune.headline.length}): ${fortune.headline}`);
    const phase = getMoonPhaseForDateKey(fortune.date).majorPhase;
    if (!phase) continue;
    assert.ok(fortune.headline.length >= 5, `${fortune.date} ${phase} ${fortune.headline}`);
  }

  // --- error handling ---
  assert.throws(() => destinyNumberFromBirthdate("1990/12/25"));
  assert.throws(() => destinyNumberFromBirthdate("1990-1-2"));
  assert.throws(() => dayEnergyNumberFromDate("2026/03/11"));
}

run();
console.log("numerology.test.ts: OK");
