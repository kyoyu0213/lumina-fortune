import assert from "node:assert/strict";
import { getMarriageTimingReading } from "../lib/marriageTiming";
import { getThreeYearWindow, personalYearNumberFromBirthdate } from "../lib/numerology";

function run() {
  assert.deepEqual(getThreeYearWindow(2026), [2026, 2027, 2028]);
  assert.equal(personalYearNumberFromBirthdate("1992-07-15", 2026), 5);
  assert.equal(personalYearNumberFromBirthdate("1992-07-15", 2027), 6);
  assert.equal(personalYearNumberFromBirthdate("1992-07-15", 2028), 7);

  const reading = getMarriageTimingReading("1992-07-15", 2026);
  assert.equal(reading.destinyNumber, 7);
  assert.equal(reading.years.length, 3);
  assert.equal(reading.years[0]?.label, "今年");
  assert.equal(reading.years[1]?.label, "来年");
  assert.equal(reading.years[2]?.label, "再来年");
  assert.equal(reading.years[1]?.badge, "婚期の本命年");
  assert.match(reading.intro, /魂です。/);
  assert.match(reading.tendency, /結婚/);
  assert.match(reading.flowSummary, /今年/);
  assert.equal(reading.signs.length, 3);
  assert.equal(reading.advice.length, 3);
  assert.ok(reading.freePreview.headline.length > 0);
}

run();
console.log("marriage-timing.test.ts: OK");
