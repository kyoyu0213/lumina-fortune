// 鳥タイプ診断のデータとロジック（仮実装）
// 10問・4択 → 鳥タイプごとに加点 → 最高得点のタイプを結果に
// 結果文・診断ロジックは後で調整する前提の仮テキスト。

export type BirdId =
  | "simaenaga"
  | "buncho"
  | "sekiseiinko"
  | "kozakurainko"
  | "okameinko"
  | "urokoinko"
  | "siroharainko"
  | "youmu"
  | "sirohukurou"
  | "menhukurou"
  | "hakucho"
  | "karasu"
  | "haku";

export type BirdType = {
  id: BirdId;
  name: string;
  /** 結果画像（/public からの絶対パス） */
  image: string;
  /** 結果タイトル下のひとことキャッチ */
  catchCopy: string;
  /** 結果説明 */
  description: string;
  /** 恋愛傾向 */
  love: string;
  /** 仕事傾向 */
  work: string;
  /** 相性の良い鳥 */
  compatible: string;
  /** 鳥からのメッセージ */
  message: string;
  /** シークレットタイプか */
  secret?: boolean;
};

// === 13タイプ定義 ===
export const birdTypes: Record<BirdId, BirdType> = {
  simaenaga: {
    id: "simaenaga",
    name: "シマエナガ",
    image: "/gazou/bird/kekka/simaenaga.png",
    catchCopy: "雪の妖精と呼ばれるシマエナガタイプ。",
    description:
      "あなたは周囲を自然と和ませる癒しの存在です。自分では当たり前だと思っている優しさや気遣いが、多くの人に安心感を与えています。\n\n争いを好まず、人と人との間に温かな空気を作ることが得意です。強引に前へ出ることは少ないかもしれませんが、その存在そのものが誰かの支えになっているでしょう。",
    love:
      "恋愛では安心感を大切にするタイプです。\n\n激しい駆け引きよりも、自然体でいられる関係に惹かれます。好きな人には優しく寄り添い、相手を包み込むような愛情を注ぎます。",
    work: "人を支える役割で力を発揮します。調整役やサポート役として信頼されることが多いでしょう。",
    compatible: "オカメインコ・文鳥",
    message:
      "あなたの優しさは、思っている以上に多くの人を救っています。\nその温かな心を、どうか大切にしてください。",
  },
  buncho: {
    id: "buncho",
    name: "文鳥",
    image: "/gazou/bird/kekka/buncho.png",
    catchCopy: "誠実さと信頼を大切にする文鳥タイプ。",
    description:
      "あなたは一度結んだ縁を大切にする人です。軽い付き合いよりも、深く信頼できる関係を求めます。\n\n責任感が強く、約束を守るために努力を惜しまないでしょう。",
    love: "恋愛ではとても一途です。\n\n好きになった相手を長く大切にし、関係を育てていくことに喜びを感じます。",
    work: "コツコツ積み重ねる仕事が得意です。周囲から「安心して任せられる人」と思われることが多いでしょう。",
    compatible: "コザクラインコ・シマエナガ",
    message: "急がなくても大丈夫。\nあなたの誠実さは、必ず信頼という形で返ってきます。",
  },
  sekiseiinko: {
    id: "sekiseiinko",
    name: "セキセイインコ",
    image: "/gazou/bird/kekka/sekiseiinko.png",
    catchCopy: "明るく社交的な人気者。",
    description:
      "あなたは好奇心旺盛で、人との交流からエネルギーを得るタイプです。\n\n新しい出会いを楽しみ、誰とでも自然に打ち解けることができます。",
    love:
      "恋愛は楽しく前向きに進めたいタイプ。\n\n会話や一緒に過ごす時間を大切にし、友達のような関係から恋に発展することも多いでしょう。",
    work: "接客・営業・広報など、人と関わる仕事で輝きます。",
    compatible: "シロハラインコ・シマエナガ",
    message: "あなたの笑顔は、人の心を動かす魔法です。",
  },
  kozakurainko: {
    id: "kozakurainko",
    name: "コザクラインコ",
    image: "/gazou/bird/kekka/kozakurainko.png",
    catchCopy: "愛情深く情熱的な鳥。",
    description:
      "あなたは大切な人を心から愛し、全力で守ろうとする人です。\n\n愛情表現が豊かで、人との絆を何よりも大切にします。",
    love: "とても一途で情熱的。\n\n好きになった相手を深く愛し、長く大切にしようとします。",
    work: "人との信頼関係を築く仕事が向いています。",
    compatible: "文鳥・メンフクロウ",
    message: "あなたの愛情は、誰かの人生を温める光になります。",
  },
  okameinko: {
    id: "okameinko",
    name: "オカメインコ",
    image: "/gazou/bird/kekka/okameinko.png",
    catchCopy: "穏やかな癒し手。",
    description:
      "あなたは優しく、人の気持ちを考えられる人です。\n\n無理に目立つことはなくても、周囲に安心感を与える存在でしょう。",
    love: "穏やかで優しい恋愛を好みます。\n\n一緒にいて落ち着ける関係に幸せを感じます。",
    work: "サポート役や教育役として力を発揮します。",
    compatible: "シマエナガ・メンフクロウ",
    message: "焦らなくても大丈夫。\nあなたらしい優しさが、ちゃんと誰かに届いています。",
  },
  urokoinko: {
    id: "urokoinko",
    name: "ウロコインコ",
    image: "/gazou/bird/kekka/urokoinko.png",
    catchCopy: "自由な発想を持つ創造者。",
    description:
      "あなたは好奇心旺盛で、型にはまらない魅力を持っています。\n\n新しいアイデアや独自の世界観を生み出す力があるでしょう。",
    love: "束縛を嫌い、お互いを尊重できる関係を求めます。",
    work: "クリエイティブな分野や企画職で才能を発揮します。",
    compatible: "カラス・ハクチョウ",
    message: "あなたの個性は宝物です。\n誰かと同じである必要はありません。",
  },
  siroharainko: {
    id: "siroharainko",
    name: "シロハラインコ",
    image: "/gazou/bird/kekka/siroharainko.png",
    catchCopy: "場を明るくするムードメーカー。",
    description: "あなたは楽しいことが大好きで、人を笑顔にする才能があります。",
    love: "一緒にいて楽しい恋愛を求めます。",
    work: "イベントや接客など、人を楽しませる分野で活躍できます。",
    compatible: "セキセイインコ・シマエナガ",
    message: "あなたの明るさは、世界を少しだけ優しくしています。",
  },
  youmu: {
    id: "youmu",
    name: "ヨウム",
    image: "/gazou/bird/kekka/youmu.png",
    catchCopy: "知性の探究者。",
    description:
      "あなたは学ぶことや考えることを楽しめる人です。\n\n物事の表面だけではなく、本質を理解したいという欲求を持っています。",
    love: "信頼できる相手との知的な交流を大切にします。",
    work: "分析・研究・教育などの分野で力を発揮します。",
    compatible: "シロフクロウ・カラス",
    message: "あなたの知識は、未来を照らす灯火になります。",
  },
  sirohukurou: {
    id: "sirohukurou",
    name: "シロフクロウ",
    image: "/gazou/bird/kekka/sirohukurou.png",
    catchCopy: "静かな賢者。",
    description:
      "あなたは冷静で洞察力に優れています。\n\n人が見落とすような本質を見抜く力を持っています。",
    love: "精神的なつながりを重視します。",
    work: "戦略立案や分析、相談役として活躍します。",
    compatible: "ヨウム・メンフクロウ",
    message: "静けさの中にこそ、本当の答えはあります。",
  },
  menhukurou: {
    id: "menhukurou",
    name: "メンフクロウ",
    image: "/gazou/bird/kekka/menhukurou.png",
    catchCopy: "心を感じ取る守護者。",
    description: "あなたは共感力が高く、人の気持ちを敏感に察知できます。",
    love: "深い心のつながりを求めます。",
    work: "相談役やカウンセラーのような役割が向いています。",
    compatible: "オカメインコ・コザクラインコ",
    message: "あなたの優しさは、誰かの心の居場所になっています。",
  },
  hakucho: {
    id: "hakucho",
    name: "ハクチョウ",
    image: "/gazou/bird/kekka/hakucho.png",
    catchCopy: "気高き理想家。",
    description:
      "あなたは美しさや理想を追い求める人です。\n\n高い目標を掲げ、自分自身を磨き続ける力があります。",
    love: "尊敬し合える関係に惹かれます。",
    work: "リーダーや表現者として輝くことができます。",
    compatible: "ウロコインコ・シロフクロウ",
    message: "理想を追うことを恐れないでください。\nその先に、あなただけの景色があります。",
  },
  karasu: {
    id: "karasu",
    name: "カラス",
    image: "/gazou/bird/kekka/karasu.png",
    catchCopy: "独創的な発明家。",
    description:
      "あなたは柔軟な発想力と戦略性を持っています。\n\n人と違う視点で世界を見ることができるでしょう。",
    love: "刺激的で知的な関係を好みます。",
    work: "企画・開発・起業などで才能を発揮します。",
    compatible: "ヨウム・ウロコインコ",
    message: "常識の外側にこそ、新しい可能性は眠っています。",
  },
  haku: {
    id: "haku",
    name: "ハク",
    image: "/gazou/bird/kekka/haku.png",
    catchCopy: "光を運ぶ特別な鳥。",
    description:
      "ハクは、鳥たちの王国でもごく稀に現れる存在です。\n\nあなたは優しさ、希望、直感、導きを併せ持っています。\n\n困っている人に自然と手を差し伸べ、人の未来を明るく照らす力があるでしょう。",
    love: "相手を包み込むような深い愛情を持っています。",
    work: "人を支え、導く役割で大きな力を発揮します。",
    compatible: "シマエナガ・メンフクロウ・ハクチョウ",
    message:
      "あなたの中には、まだ気づいていない光があります。\n\nその光を信じてください。\n\nきっと誰かの希望になる日が訪れるでしょう。",
    secret: true,
  },
};

// 表示順（一覧などで使用）
export const birdOrder: BirdId[] = [
  "simaenaga",
  "buncho",
  "sekiseiinko",
  "kozakurainko",
  "okameinko",
  "urokoinko",
  "siroharainko",
  "youmu",
  "sirohukurou",
  "menhukurou",
  "hakucho",
  "karasu",
  "haku",
];

export type BirdOption = {
  label: string;
  /** この選択肢で加点される鳥タイプと点数 */
  scores: Partial<Record<BirdId, number>>;
};

export type BirdQuestion = {
  id: number;
  text: string;
  options: BirdOption[];
};

// === 質問 16問・4択 ===（選択肢の index は A=0 / B=1 / C=2 / D=3）
export const birdQuestions: BirdQuestion[] = [
  {
    id: 1,
    text: "初対面の人が多い場所では？",
    options: [
      { label: "自然と話しかけて、場を明るくする", scores: { sekiseiinko: 2, siroharainko: 1 } },
      { label: "無理に目立たず、近くの人と少しずつ仲良くなる", scores: { buncho: 2, okameinko: 1 } },
      { label: "周りを観察して、どんな人たちか見極める", scores: { youmu: 2, sirohukurou: 1 } },
      { label: "気が合いそうな人を直感で見つける", scores: { menhukurou: 2, kozakurainko: 1 } },
    ],
  },
  {
    id: 2,
    text: "休日の理想の過ごし方は？",
    options: [
      { label: "友達や仲間と楽しく出かけたい", scores: { sekiseiinko: 2, siroharainko: 1 } },
      { label: "大切な人とゆっくり過ごしたい", scores: { kozakurainko: 2, buncho: 1 } },
      { label: "一人で創作や趣味に没頭したい", scores: { urokoinko: 2, karasu: 1 } },
      { label: "静かな場所で心を整えたい", scores: { sirohukurou: 2, menhukurou: 1 } },
    ],
  },
  {
    id: 3,
    text: "友人が落ち込んでいたら？",
    options: [
      { label: "明るい言葉で励ます", scores: { simaenaga: 2, sekiseiinko: 1 } },
      { label: "何も言わず、そばで話を聞く", scores: { menhukurou: 2, okameinko: 1 } },
      { label: "原因を整理して、解決策を考える", scores: { youmu: 2, karasu: 1 } },
      { label: "相手が安心できるように優しく見守る", scores: { okameinko: 2, simaenaga: 1 } },
    ],
  },
  {
    id: 4,
    text: "恋愛で大切にしたいことは？",
    options: [
      { label: "深い絆と一途な愛情", scores: { kozakurainko: 2, buncho: 1 } },
      { label: "安心できる穏やかな関係", scores: { okameinko: 2, simaenaga: 1 } },
      { label: "お互いを高め合える関係", scores: { hakucho: 2, youmu: 1 } },
      { label: "言葉にしなくても通じ合える感覚", scores: { menhukurou: 2, sirohukurou: 1 } },
    ],
  },
  {
    id: 5,
    text: "褒められて一番うれしい言葉は？",
    options: [
      { label: "「一緒にいると癒される」", scores: { simaenaga: 2, okameinko: 1 } },
      { label: "「信頼できる」", scores: { buncho: 2, menhukurou: 1 } },
      { label: "「発想が面白い」", scores: { urokoinko: 2, karasu: 1 } },
      { label: "「頭がいい」", scores: { youmu: 2, karasu: 1 } },
    ],
  },
  {
    id: 6,
    text: "物事を決めるときは？",
    options: [
      { label: "直感でこれだと思う方を選ぶ", scores: { menhukurou: 2, urokoinko: 1 } },
      { label: "情報を集めて冷静に判断する", scores: { youmu: 2, sirohukurou: 1 } },
      { label: "周りの人の気持ちも考えて決める", scores: { simaenaga: 2, okameinko: 1 } },
      { label: "自分の理想に近い方を選ぶ", scores: { hakucho: 2, kozakurainko: 1 } },
    ],
  },
  {
    id: 7,
    text: "集団の中での立ち位置は？",
    options: [
      { label: "場を明るくするムードメーカー", scores: { siroharainko: 2, sekiseiinko: 1 } },
      { label: "みんなをさりげなく支える存在", scores: { simaenaga: 2, okameinko: 1 } },
      { label: "静かに全体を見ている観察者", scores: { sirohukurou: 2, youmu: 1 } },
      { label: "独自のアイデアを出す変わり者", scores: { karasu: 2, urokoinko: 1 } },
    ],
  },
  {
    id: 8,
    text: "苦手な状況は？",
    options: [
      { label: "大切な人との距離を感じること", scores: { kozakurainko: 2, buncho: 1 } },
      { label: "自分らしさを押し殺すこと", scores: { urokoinko: 2, karasu: 1 } },
      { label: "騒がしすぎて心が休まらないこと", scores: { sirohukurou: 2, okameinko: 1 } },
      { label: "誰かが傷ついているのに何もできないこと", scores: { menhukurou: 2, simaenaga: 1 } },
    ],
  },
  {
    id: 9,
    text: "仕事や役割で力を発揮しやすいのは？",
    options: [
      { label: "人と人をつなぐ役割", scores: { sekiseiinko: 2, simaenaga: 1 } },
      { label: "コツコツ信頼を積み上げる役割", scores: { buncho: 2, okameinko: 1 } },
      { label: "分析して最適解を見つける役割", scores: { youmu: 2, karasu: 1 } },
      { label: "新しいものを生み出す役割", scores: { urokoinko: 2, siroharainko: 1 } },
    ],
  },
  {
    id: 10,
    text: "あなたの魅力に近いものは？",
    options: [
      { label: "ふんわりした優しさ", scores: { simaenaga: 2, okameinko: 1 } },
      { label: "まっすぐな誠実さ", scores: { buncho: 2, kozakurainko: 1 } },
      { label: "華やかな存在感", scores: { hakucho: 2, sekiseiinko: 1 } },
      { label: "ミステリアスな知性", scores: { karasu: 2, sirohukurou: 1 } },
    ],
  },
  {
    id: 11,
    text: "子どもの頃から変わらないところは？",
    options: [
      { label: "好きな人やものを大切にするところ", scores: { kozakurainko: 2, buncho: 1 } },
      { label: "知らないことを知りたくなるところ", scores: { youmu: 2, sekiseiinko: 1 } },
      { label: "空想や自分だけの世界があるところ", scores: { urokoinko: 2, sirohukurou: 1 } },
      { label: "人の気持ちに敏感なところ", scores: { menhukurou: 2, simaenaga: 1 } },
    ],
  },
  {
    id: 12,
    text: "理想の自分は？",
    options: [
      { label: "誰かの心を明るくできる人", scores: { simaenaga: 2, siroharainko: 1 } },
      { label: "大切な人に信頼される人", scores: { buncho: 2, kozakurainko: 1 } },
      { label: "自分の美学を持っている人", scores: { hakucho: 2, urokoinko: 1 } },
      { label: "物事の本質を見抜ける人", scores: { sirohukurou: 2, youmu: 1 } },
    ],
  },
  {
    id: 13,
    text: "トラブルが起きたときは？",
    options: [
      { label: "まず落ち着いて状況を整理する", scores: { youmu: 2, sirohukurou: 1 } },
      { label: "みんなを安心させようとする", scores: { okameinko: 2, simaenaga: 1 } },
      { label: "逆転のアイデアを考える", scores: { karasu: 2, urokoinko: 1 } },
      { label: "とにかく動いて空気を変える", scores: { siroharainko: 2, sekiseiinko: 1 } },
    ],
  },
  {
    id: 14,
    text: "ひとつだけ魔法を使えるなら？",
    options: [
      { label: "誰かの悲しみをやわらげる魔法", scores: { simaenaga: 2, menhukurou: 1 } },
      { label: "大切な人との絆を守る魔法", scores: { kozakurainko: 2, buncho: 1 } },
      { label: "未来のヒントが見える魔法", scores: { sirohukurou: 2, haku: 1 } },
      { label: "新しい世界を作る魔法", scores: { urokoinko: 2, karasu: 1 } },
    ],
  },
  {
    id: 15,
    text: "あなたが惹かれる世界は？",
    options: [
      { label: "花と光に包まれた優しい庭", scores: { simaenaga: 2, okameinko: 1 } },
      { label: "静かな月明かりの森", scores: { menhukurou: 2, sirohukurou: 1 } },
      { label: "本と星図が並ぶ秘密の書斎", scores: { youmu: 2, karasu: 1 } },
      { label: "白い城と湖が輝く美しい国", scores: { hakucho: 2, haku: 1 } },
    ],
  },
  {
    id: 16,
    text: "最後に、今のあなたの心に一番近いものは？",
    options: [
      { label: "誰かに優しくしたい", scores: { simaenaga: 2, haku: 1 } },
      { label: "大切なものを守りたい", scores: { buncho: 2, menhukurou: 1 } },
      { label: "もっと自由に生きたい", scores: { urokoinko: 2, siroharainko: 1 } },
      { label: "まだ見ぬ未来へ進みたい", scores: { hakucho: 2, haku: 1 } },
    ],
  },
];

// 同点時の優先順（ハクを除く12タイプ。先にあるほど優先）
const tieBreakOrder: BirdId[] = birdOrder.filter((id) => id !== "haku");

// 指定の問で選んだ選択肢が加点した鳥のセットを返す
function birdsScoredInQuestion(answers: number[], questionIndex: number): Set<BirdId> {
  const option = birdQuestions[questionIndex]?.options[answers[questionIndex]];
  return new Set((Object.keys(option?.scores ?? {}) as BirdId[]));
}

/**
 * 回答（各問で選んだ選択肢のindex配列：A=0/B=1/C=2/D=3）から鳥タイプを算出する。
 *
 * 1. 鳥タイプごとに加点。
 * 2. 同点時は ①最終Q16で加点された鳥 → ②Q4(恋愛)で加点された鳥 → ③優先順 の順で判定。
 * 3. シークレット「ハク」は以下をすべて満たす場合のみ出現：
 *    - ハクのスコアが2点以上
 *    - シマエナガ/メンフクロウ/ハクチョウ/シロフクロウのいずれかが上位3位以内
 *    - Q14でC、またはQ16でA/Dを選んでいる
 *    - 通常トップ鳥とのスコア差が2点以内
 */
export function computeBirdResult(answers: number[]): BirdType {
  const scores: Record<BirdId, number> = Object.fromEntries(
    birdOrder.map((id) => [id, 0]),
  ) as Record<BirdId, number>;

  answers.forEach((optionIndex, questionIndex) => {
    const option = birdQuestions[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [birdId, point] of Object.entries(option.scores)) {
      scores[birdId as BirdId] += point ?? 0;
    }
  });

  // 同点判定に使う、最終問・恋愛問で加点された鳥
  const q16Birds = birdsScoredInQuestion(answers, 15);
  const q4Birds = birdsScoredInQuestion(answers, 3);

  // 通常12タイプをランキング（ハクは除外）
  const ranked = tieBreakOrder.slice().sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    // ①Q16で加点された鳥を優先
    const aQ16 = q16Birds.has(a) ? 1 : 0;
    const bQ16 = q16Birds.has(b) ? 1 : 0;
    if (aQ16 !== bQ16) return bQ16 - aQ16;
    // ②Q4で加点された鳥を優先
    const aQ4 = q4Birds.has(a) ? 1 : 0;
    const bQ4 = q4Birds.has(b) ? 1 : 0;
    if (aQ4 !== bQ4) return bQ4 - aQ4;
    // ③優先順
    return tieBreakOrder.indexOf(a) - tieBreakOrder.indexOf(b);
  });

  const topBird = ranked[0];
  const topScore = scores[topBird];

  // === シークレット「ハク」判定 ===
  const guardians: BirdId[] = ["simaenaga", "menhukurou", "hakucho", "sirohukurou"];
  const top3 = ranked.slice(0, 3);
  const hakuCond1 = scores.haku >= 2;
  const hakuCond2 = guardians.some((g) => top3.includes(g));
  const q14IsC = answers[13] === 2;
  const q16IsAorD = answers[15] === 0 || answers[15] === 3;
  const hakuCond3 = q14IsC || q16IsAorD;
  const hakuCond4 = Math.abs(topScore - scores.haku) <= 2;

  if (hakuCond1 && hakuCond2 && hakuCond3 && hakuCond4) {
    return birdTypes.haku;
  }

  return birdTypes[topBird];
}
