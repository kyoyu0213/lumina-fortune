// 前世診断（/pastlife）の診断ロジック
// 鳥タイプ診断と同じスコア方式：各回答でポイント加算 → 最高得点のタイプを表示。
// シークレット「星の旅人」は通常の最高スコアではなく、専用条件で出現する。

import {
  pastLifeResults,
  pastLifeOrder,
  type PastLifeId,
  type PastLifeResult,
} from "@/src/data/pastlife/results";
import {
  pastLifeQuestions,
  type ScoreKey,
} from "@/src/data/pastlife/questions";

// データを再エクスポート（クライアントからの import を一本化）
export {
  pastLifeResults,
  pastLifeOrder,
  PLACEHOLDER_IMAGE,
} from "@/src/data/pastlife/results";
export type { PastLifeId, PastLifeResult } from "@/src/data/pastlife/results";
export { pastLifeQuestions } from "@/src/data/pastlife/questions";
export type { PastLifeQuestion, PastLifeOption } from "@/src/data/pastlife/questions";

/**
 * シークレット「星の旅人」の出現条件のしきい値。
 * 後から調整できるよう定数化している。
 * - star: star_traveler のスコア（星への導き）
 * - intuition: 直感のスコア
 * - fate: 運命のスコア
 */
export const SECRET_THRESHOLDS = {
  star: 4,
  intuition: 4,
  fate: 4,
} as const;

// 通常12タイプ（star_traveler を除く）。同点時の優先順としても使う（先頭ほど優先）。
const normalOrder: PastLifeId[] = pastLifeOrder.filter(
  (id) => id !== "star_traveler",
);

type ScoreMap = Record<ScoreKey, number>;

function emptyScores(): ScoreMap {
  const keys: ScoreKey[] = [...pastLifeOrder, "intuition", "fate"];
  return Object.fromEntries(keys.map((k) => [k, 0])) as ScoreMap;
}

/**
 * 回答（各問で選んだ選択肢のindex配列：A=0/B=1/C=2/D=3）から前世タイプを算出する。
 *
 * 1. キーごとに加点。
 * 2. シークレット「星の旅人」は専用条件（SECRET_THRESHOLDS）を満たした場合のみ出現。
 * 3. それ以外は通常12タイプの最高得点を結果に。同点時は表示順で優先。
 */
export function computePastLifeResult(answers: number[]): PastLifeResult {
  const scores = emptyScores();

  answers.forEach((optionIndex, questionIndex) => {
    const option = pastLifeQuestions[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [key, point] of Object.entries(option.scores)) {
      scores[key as ScoreKey] += point ?? 0;
    }
  });

  // === シークレット「星の旅人」判定 ===
  const isSecret =
    scores.star_traveler >= SECRET_THRESHOLDS.star &&
    scores.intuition >= SECRET_THRESHOLDS.intuition &&
    scores.fate >= SECRET_THRESHOLDS.fate;

  if (isSecret) {
    return pastLifeResults.star_traveler;
  }

  // === 通常12タイプのランキング ===
  const ranked = normalOrder.slice().sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    // 同点時は表示順（先にあるものを優先）
    return normalOrder.indexOf(a) - normalOrder.indexOf(b);
  });

  return pastLifeResults[ranked[0]];
}
