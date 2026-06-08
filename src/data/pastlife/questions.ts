// 前世診断（/pastlife）の質問データ
// 16問・4択。各回答で結果タイプにポイント加算 → 最高得点を結果に。
// 質問やスコアは後から編集しやすいよう、ここに分離して管理する。

import type { PastLifeId } from "./results";

/**
 * スコアの加点先キー。
 * - 12タイプの結果ID（star_traveler はシークレット。通常ランキングには含めない）
 * - 加えて、シークレット判定用の隠しパラメータ "intuition"（直感）/ "fate"（運命）
 *   star_traveler のスコア自体がシークレット判定の "star" 値として使われる。
 *
 * シークレット「星の旅人」は、以下のような神秘的な回答を重ねると出現する：
 *   星が降るような夜空 / 運命を感じる恋に弱い / 星や宇宙 / 目覚め /
 *   本当の自分を受け入れる勇気 / 覚醒
 */
export type ScoreKey = PastLifeId | "intuition" | "fate";

export type PastLifeOption = {
  label: string;
  /** この選択肢で加点されるキーと点数 */
  scores: Partial<Record<ScoreKey, number>>;
};

export type PastLifeQuestion = {
  id: number;
  text: string;
  options: PastLifeOption[];
};

// === 質問 16問・4択 ===（選択肢の index は A=0 / B=1 / C=2 / D=3）
export const pastLifeQuestions: PastLifeQuestion[] = [
  {
    id: 1,
    text: "あなたが惹かれる景色は？",
    options: [
      { label: "古い城と夕暮れの空", scores: { tragic_princess: 2 } },
      { label: "星が降るような夜空", scores: { star_seer: 2, star_traveler: 1, intuition: 1, fate: 1 } },
      { label: "深い森の小道", scores: { forest_guardian: 2 } },
      { label: "果てしなく続く海", scores: { sea_priestess: 2 } },
    ],
  },
  {
    id: 2,
    text: "人生で一番大切にしたいものは？",
    options: [
      { label: "愛", scores: { tragic_princess: 1, healer: 1 } },
      { label: "使命", scores: { loyal_knight: 2 } },
      { label: "自由", scores: { wanderer: 1, sea_priestess: 1 } },
      { label: "真実", scores: { alchemist: 2 } },
    ],
  },
  {
    id: 3,
    text: "つらい時、あなたはどうする？",
    options: [
      { label: "一人で静かに考える", scores: { white_witch: 1, alchemist: 1 } },
      { label: "誰かのために動く", scores: { light_priest: 1, healer: 1 } },
      { label: "場所を変えて気分転換する", scores: { wanderer: 1, sea_priestess: 1 } },
      { label: "気持ちを言葉にする", scores: { bard: 2 } },
    ],
  },
  {
    id: 4,
    text: "人から言われやすい言葉は？",
    options: [
      { label: "優しい", scores: { healer: 1, light_priest: 1 } },
      { label: "不思議", scores: { star_seer: 1, dragon_contract: 1 } },
      { label: "真面目", scores: { loyal_knight: 2 } },
      { label: "自由人", scores: { wanderer: 1, sea_priestess: 1 } },
    ],
  },
  {
    id: 5,
    text: "恋愛で近いのは？",
    options: [
      { label: "好きな人を優先しがち", scores: { tragic_princess: 2 } },
      { label: "一度好きになると一途", scores: { loyal_knight: 2 } },
      { label: "運命を感じる恋に弱い", scores: { star_seer: 1, star_traveler: 1, fate: 2, intuition: 1 } },
      { label: "束縛されると苦しくなる", scores: { sea_priestess: 1, wanderer: 1 } },
    ],
  },
  {
    id: 6,
    text: "もし前世の記憶が見えるなら？",
    options: [
      { label: "誰かと別れた記憶", scores: { tragic_princess: 2 } },
      { label: "戦いや使命の記憶", scores: { loyal_knight: 2 } },
      { label: "魔法や儀式の記憶", scores: { white_witch: 1, light_priest: 1 } },
      { label: "旅をしていた記憶", scores: { wanderer: 2 } },
    ],
  },
  {
    id: 7,
    text: "あなたが得意なのは？",
    options: [
      { label: "人の気持ちを察する", scores: { healer: 1, light_priest: 1 } },
      { label: "物事を深く考える", scores: { alchemist: 2 } },
      { label: "場の空気を読む", scores: { star_seer: 2, intuition: 1 } },
      { label: "新しいことに挑戦する", scores: { wanderer: 2 } },
    ],
  },
  {
    id: 8,
    text: "心が落ち着く場所は？",
    options: [
      { label: "静かな部屋", scores: { white_witch: 1, alchemist: 1 } },
      { label: "神社や教会のような場所", scores: { light_priest: 2 } },
      { label: "森や花のある場所", scores: { forest_guardian: 2 } },
      { label: "海や川のそば", scores: { sea_priestess: 2 } },
    ],
  },
  {
    id: 9,
    text: "物語の主人公になるなら？",
    options: [
      { label: "国のために恋を諦める王女", scores: { tragic_princess: 2 } },
      { label: "大切な人を守る騎士", scores: { loyal_knight: 2 } },
      { label: "未来を読む占星術師", scores: { star_seer: 2, intuition: 1 } },
      { label: "世界を旅する放浪者", scores: { wanderer: 2 } },
    ],
  },
  {
    id: 10,
    text: "あなたの弱点に近いものは？",
    options: [
      { label: "我慢しすぎる", scores: { tragic_princess: 1, light_priest: 1 } },
      { label: "考えすぎる", scores: { alchemist: 1, white_witch: 1 } },
      { label: "感情に飲まれる", scores: { sea_priestess: 1, bard: 1 } },
      { label: "周囲と違うと感じる", scores: { dragon_contract: 2 } },
    ],
  },
  {
    id: 11,
    text: "惹かれる言葉は？",
    options: [
      { label: "約束", scores: { tragic_princess: 1, loyal_knight: 1 } },
      { label: "祈り", scores: { light_priest: 2 } },
      { label: "奇跡", scores: { white_witch: 1, star_seer: 1 } },
      { label: "目覚め", scores: { dragon_contract: 1, star_traveler: 1, intuition: 1, fate: 1 } },
    ],
  },
  {
    id: 12,
    text: "誰かが困っていたら？",
    options: [
      { label: "すぐ助けたい", scores: { healer: 2 } },
      { label: "解決策を考える", scores: { alchemist: 2 } },
      { label: "そっと寄り添う", scores: { light_priest: 1, forest_guardian: 1 } },
      { label: "必要なら戦う", scores: { loyal_knight: 1, dragon_contract: 1 } },
    ],
  },
  {
    id: 13,
    text: "子どもの頃好きだった世界観は？",
    options: [
      { label: "王国やプリンセス", scores: { tragic_princess: 2 } },
      { label: "魔法や魔女", scores: { white_witch: 2 } },
      { label: "星や宇宙", scores: { star_seer: 1, star_traveler: 1, intuition: 1, fate: 1 } },
      { label: "冒険や宝探し", scores: { wanderer: 2 } },
    ],
  },
  {
    id: 14,
    text: "あなたが怖いものは？",
    options: [
      { label: "大切な人を失うこと", scores: { tragic_princess: 1, healer: 1 } },
      { label: "自由を失うこと", scores: { sea_priestess: 1, wanderer: 1 } },
      { label: "自分の居場所がないこと", scores: { forest_guardian: 1, white_witch: 1 } },
      { label: "真実を知らないまま終わること", scores: { alchemist: 2 } },
    ],
  },
  {
    id: 15,
    text: "今のあなたに必要なものは？",
    options: [
      { label: "自分を大切にする勇気", scores: { tragic_princess: 1, healer: 1 } },
      { label: "誰かを信じる勇気", scores: { loyal_knight: 1, light_priest: 1 } },
      { label: "新しい世界へ進む勇気", scores: { wanderer: 1, sea_priestess: 1 } },
      { label: "本当の自分を受け入れる勇気", scores: { dragon_contract: 1, star_traveler: 1, intuition: 1, fate: 1 } },
    ],
  },
  {
    id: 16,
    text: "最後に、魂が求めている気がするものは？",
    options: [
      { label: "愛", scores: { tragic_princess: 1, bard: 1 } },
      { label: "癒し", scores: { healer: 1, light_priest: 1 } },
      { label: "自由", scores: { sea_priestess: 1, wanderer: 1 } },
      { label: "覚醒", scores: { dragon_contract: 1, star_traveler: 1, intuition: 1, fate: 1 } },
    ],
  },
];
