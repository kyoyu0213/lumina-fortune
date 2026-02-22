export type TarotCardEntry = {
  id: string;
  nameJa: string;
  imageUrl: string | null;
  meaningJa: string;
};

const majorArcana: TarotCardEntry[] = [
  { id: "major-00-fool", nameJa: "愚者", imageUrl: null, meaningJa: "新しい始まり。軽やかに一歩を出すほど流れが動きやすい日です。" },
  { id: "major-01-magician", nameJa: "魔術師", imageUrl: null, meaningJa: "意思と工夫が鍵。手持ちの道具を活かすほど結果につながります。" },
  { id: "major-02-high-priestess", nameJa: "女教皇", imageUrl: null, meaningJa: "静かな直感が冴える日。急がず観察すると良い判断ができます。" },
  { id: "major-03-empress", nameJa: "女帝", imageUrl: null, meaningJa: "豊かさと育てる力。心地よさを整えるほど運気が安定しやすいです。" },
  { id: "major-04-emperor", nameJa: "皇帝", imageUrl: null, meaningJa: "土台づくりの日。段取りを決めて進めると安心感と成果が得られます。" },
  { id: "major-05-hierophant", nameJa: "教皇", imageUrl: null, meaningJa: "基本に戻ることで整う日。信頼できる助言やルールが助けになります。" },
  { id: "major-06-lovers", nameJa: "恋人", imageUrl: null, meaningJa: "対話と選択がテーマ。心が自然に向く方を丁寧に選ぶと良い流れです。" },
  { id: "major-07-chariot", nameJa: "戦車", imageUrl: null, meaningJa: "前進力が高まる日。勢いを活かしつつ、方向を絞ると進みやすいです。" },
  { id: "major-08-strength", nameJa: "力", imageUrl: null, meaningJa: "やさしい粘り強さが効く日。強引さより落ち着いた対応が成果につながります。" },
  { id: "major-09-hermit", nameJa: "隠者", imageUrl: null, meaningJa: "一人で整える時間が鍵。考えを整理すると次の一手が見えてきます。" },
  { id: "major-10-wheel-of-fortune", nameJa: "運命の輪", imageUrl: null, meaningJa: "流れの切り替わり。偶然の動きに柔軟に乗るほどチャンスを拾えます。" },
  { id: "major-11-justice", nameJa: "正義", imageUrl: null, meaningJa: "バランスと判断の日。感情と事実を分けると迷いが減りやすいです。" },
  { id: "major-12-hanged-man", nameJa: "吊るされた男", imageUrl: null, meaningJa: "視点転換が必要な日。少し待つことで見落としに気づきやすくなります。" },
  { id: "major-13-death", nameJa: "死神", imageUrl: null, meaningJa: "切り替えと手放しのサイン。古い流れを終えるほど次が入りやすくなります。" },
  { id: "major-14-temperance", nameJa: "節制", imageUrl: null, meaningJa: "調整力が活きる日。無理なく配分を整えると全体がスムーズになります。" },
  { id: "major-15-devil", nameJa: "悪魔", imageUrl: null, meaningJa: "執着や惰性を見直す日。いつもの癖に気づくことが流れを変える鍵です。" },
  { id: "major-16-tower", nameJa: "塔", imageUrl: null, meaningJa: "想定外の気づきが起こりやすい日。慌てず立て直しを優先すると安定します。" },
  { id: "major-17-star", nameJa: "星", imageUrl: null, meaningJa: "希望と回復の流れ。先の明るさを意識すると心が軽くなりやすいです。" },
  { id: "major-18-moon", nameJa: "月", imageUrl: null, meaningJa: "不安や曖昧さが出やすい日。結論を急がず確認を重ねると安心できます。" },
  { id: "major-19-sun", nameJa: "太陽", imageUrl: null, meaningJa: "明るさと前向きさが追い風。素直な表現が人間関係を温めやすいです。" },
  { id: "major-20-judgement", nameJa: "審判", imageUrl: null, meaningJa: "再評価と再始動のタイミング。過去の経験を活かすほど前進しやすいです。" },
  { id: "major-21-world", nameJa: "世界", imageUrl: null, meaningJa: "ひと区切りと達成。仕上げや完了を意識すると満足度が高まりやすいです。" },
];

const suitMeta = [
  {
    key: "wands",
    nameJa: "ワンド",
    tone: "行動力や勢い",
    cue: "まず小さく着手すると流れが乗りやすい",
  },
  {
    key: "cups",
    nameJa: "カップ",
    tone: "感情や人間関係",
    cue: "気持ちを言葉にすると関係が整いやすい",
  },
  {
    key: "swords",
    nameJa: "ソード",
    tone: "思考や判断",
    cue: "情報整理を先にすると迷いが減りやすい",
  },
  {
    key: "pentacles",
    nameJa: "ペンタクル",
    tone: "現実面や積み重ね",
    cue: "足元を整えるほど安心して進みやすい",
  },
] as const;

const rankMeta = [
  { key: "ace", nameJa: "エース", focus: "始まりの兆し", angle: "新しいきっかけ" },
  { key: "two", nameJa: "2", focus: "調整と選択", angle: "バランス取り" },
  { key: "three", nameJa: "3", focus: "広がりと連携", angle: "協力の流れ" },
  { key: "four", nameJa: "4", focus: "安定と土台", angle: "守りの整え" },
  { key: "five", nameJa: "5", focus: "揺れや変化", angle: "立て直しの視点" },
  { key: "six", nameJa: "6", focus: "調和と前進", angle: "流れの回復" },
  { key: "seven", nameJa: "7", focus: "工夫と見極め", angle: "作戦の見直し" },
  { key: "eight", nameJa: "8", focus: "加速と継続", angle: "手を止めないこと" },
  { key: "nine", nameJa: "9", focus: "仕上げ前の踏ん張り", angle: "最後の調整" },
  { key: "ten", nameJa: "10", focus: "区切りと次段階", angle: "抱えすぎの整理" },
  { key: "page", nameJa: "ペイジ", focus: "学びと知らせ", angle: "素直な吸収" },
  { key: "knight", nameJa: "ナイト", focus: "行動と推進力", angle: "勢いの使い方" },
  { key: "queen", nameJa: "クイーン", focus: "受容と成熟", angle: "落ち着いた対応" },
  { key: "king", nameJa: "キング", focus: "統率と責任", angle: "全体を整える視点" },
] as const;

function buildMinorMeaning(
  suit: (typeof suitMeta)[number],
  rank: (typeof rankMeta)[number]
): string {
  return `${suit.tone}で「${rank.focus}」が出やすい日です。${rank.angle}を意識し、${suit.cue}。`;
}

function buildMinorArcana(): TarotCardEntry[] {
  return suitMeta.flatMap((suit) =>
    rankMeta.map((rank) => ({
      id: `minor-${suit.key}-${rank.key}`,
      nameJa: `${suit.nameJa}の${rank.nameJa}`,
      imageUrl: null,
      meaningJa: buildMinorMeaning(suit, rank),
    }))
  );
}

export const tarotCards: TarotCardEntry[] = [...majorArcana, ...buildMinorArcana()];

if (tarotCards.length !== 78) {
  throw new Error(`tarotCards must contain 78 cards, got ${tarotCards.length}`);
}

export function pickRandomTarotCard(random = Math.random): TarotCardEntry {
  const index = Math.floor(random() * tarotCards.length);
  return tarotCards[index] ?? tarotCards[0];
}
