/* eslint-disable @typescript-eslint/no-require-imports */

const {
  buildMonthlyDailyHeadlineComparison,
  buildMonthlyDailyNumberFortunes,
  countPatternRuns,
  estimateEllipsisRisk,
  findMeaningUnclearLines,
  summarizeMonthHalfTone,
} = require("./lib/fortune/daily-number-fortunes");
const { destinyNumberFromBirthdate } = require("./lib/fortune/fortuneNumber");

const YEAR = 2026;
const BIRTHDATE = "1990-01-01";
const destinyNumber = destinyNumberFromBirthdate(BIRTHDATE);
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

for (const month of months) {
  const comparison = buildMonthlyDailyHeadlineComparison({
    year: YEAR,
    month,
    destinyNumber,
  });
  const generated = buildMonthlyDailyNumberFortunes({
    year: YEAR,
    month,
    destinyNumber,
  });
  const sampleLines = generated.map((item: { headline: string }) => item.headline);
  const tone = summarizeMonthHalfTone(sampleLines);

  console.log(`\n[${YEAR}-${String(month).padStart(2, "0")}]`);
  console.log(
    `before repeats=${comparison.legacy.repeatedWords.length} over22=${comparison.legacy.over22} over24=${comparison.legacy.over24} over28=${comparison.legacy.over28}`
  );
  console.log(
    `after  repeats=${comparison.current.repeatedWords.length} over22=${comparison.current.over22} over24=${comparison.current.over24} over28=${comparison.current.over28}`
  );
  console.log(
    `before prevDup=${comparison.legacy.previousMonthDuplicateLines} skeletonRepeats=${comparison.legacy.repeatedSkeletonPatterns.length} adjacentSimilarity=${comparison.legacy.adjacentSimilarityScore}`
  );
  console.log(
    `after  prevDup=${comparison.current.previousMonthDuplicateLines} skeletonRepeats=${comparison.current.repeatedSkeletonPatterns.length} adjacentSimilarity=${comparison.current.adjacentSimilarityScore}`
  );

  const beforeTop = comparison.legacy.repeatedWords
    .slice(0, 5)
    .map(([word, count]: [string, number]) => `${word}:${count}`)
    .join(", ");
  const afterTop = comparison.current.repeatedWords
    .slice(0, 5)
    .map(([word, count]: [string, number]) => `${word}:${count}`)
    .join(", ");

  console.log(`before top repeats: ${beforeTop || "-"}`);
  console.log(`after top repeats: ${afterTop || "-"}`);
  console.log(`after pattern run max: ${countPatternRuns(sampleLines)}`);
  console.log(`after ellipsis risk (>22): ${estimateEllipsisRisk(sampleLines)}`);
  console.log(
    `after tone firstHalf=${comparison.current.firstHalfTone.dominant} secondHalf=${comparison.current.secondHalfTone.dominant}`
  );
  console.log(
    `after tone counts firstHalf=${JSON.stringify(tone.firstHalfTone.counts)} secondHalf=${JSON.stringify(tone.secondHalfTone.counts)}`
  );
  const unclear = findMeaningUnclearLines(sampleLines);
  console.log(`after meaning unclear: ${unclear.length}`);
  if (unclear.length > 0) {
    console.log("unclear lines:");
    for (const item of unclear.slice(0, 5)) {
      console.log(`- ${item.text} [${item.diagnostics.reasons.join(", ")}]`);
    }
  }
  console.log("samples:");
  for (const sample of generated.slice(0, 3)) {
    console.log(`- ${sample.date}: ${sample.headline}`);
  }
}
