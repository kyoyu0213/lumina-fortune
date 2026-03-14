import { drawTarotSpread } from "@/lib/tarot/deck";
import { findTarotCardByJaName } from "@/src/data/tarotCards";

export const KARE_NO_KIMOCHI_QUESTION_CHIPS = [
  "今あの人は私をどう思っていますか？",
  "あの人の心の中に私はまだいますか？",
  "あの人は私を恋愛対象として見ていますか？",
  "あの人は今、私に会いたいと思っていますか？",
  "あの人の本音はどこにありますか？",
  "あの人は今、何に悩んでいますか？",
  "あの人は今、寂しいと感じていますか？",
  "あの人は今、幸せですか？",
  "私がいなくなったら気づきますか？",
  "連絡してこない本当の理由は何ですか？",
] as const;

type DrawnCard = ReturnType<typeof drawTarotSpread>[number];

export type KareNoKimochiReading = {
  question: string;
  cardName: string;
  cardMeaning: string;
  cardImagePath: string;
  isReversed: boolean;
  intro: string;
  cardInterpretation: string;
  partnerEmotion: string;
  partnerFeeling: string;
  relationshipFlow: string;
  luminaMessage: string;
  shortMessage: string;
  heartTone: string;
  distanceLabel: string;
  guidanceLabel: string;
};

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash || 1;
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickBySeed<T>(items: readonly T[], seed: number, offset = 0): T {
  const index = (seed + offset) % items.length;
  return items[index]!;
}

function buildIntro() {
  return [
    "こんにちは。白の魔女ルミナです。",
    "光の導きタロットに、あなたの想いを預けてみました。",
  ].join("\n");
}

function buildCardInterpretation(card: DrawnCard, seed: number) {
  const symbol = card.reversed ? "まだ言葉になっていない想い" : "心の奥で静かに育っている本音";

  const suitText =
    card.card.arcana === "major"
      ? pickBySeed(
          [
            "このカードは、心の深い層で動いている大きな気持ちを象徴しています。",
            "このカードは、表面だけでは見えない運命的な心の流れを映しています。",
            "このカードは、相手の内側で確かに揺れている本質的な想いを示しています。",
          ],
          seed,
          3,
        )
      : pickBySeed(
          [
            "このカードは、日々の中で少しずつ形になっている感情を象徴しています。",
            "このカードは、相手の態度の奥で動いている本音の方向を示しています。",
            "このカードは、今の関係の空気と心の反応をやさしく教えてくれます。",
          ],
          seed,
          5,
        );

  return `今現れたカードは「${card.card.nameJa}」。\nこのカードは、${symbol}を象徴しています。\n${suitText}`;
}

function buildPartnerEmotion(card: DrawnCard, seed: number) {
  if (card.reversed) {
    return pickBySeed(
      [
        "気になっているのに、素直に近づくには少し迷いが残っているようです。",
        "あなたの存在を意識しながらも、気持ちを表に出すことをためらっているようです。",
        "心の中に想いはあるものの、どう扱えばいいのかを静かに考えているようです。",
      ],
      seed,
      7,
    );
  }

  return pickBySeed(
    [
      "あなたに対してやわらかな関心と親しみを抱いている気配があります。",
      "あなたのことを特別な存在として意識しはじめている流れが見えます。",
      "会話や距離感の中に、もっと知りたいという前向きな想いが宿っています。",
    ],
    seed,
    11,
  );
}

function buildPartnerFeeling(card: DrawnCard, seed: number) {
  const base = `あの人の心の中には\n\n${buildPartnerEmotion(card, seed)}\n\nという想いが見えてきます。`;

  const supplement = card.reversed
    ? pickBySeed(
        [
          "ただし、その気持ちはまだ整理の途中にあり、はっきりした行動には結びついていないかもしれません。",
          "今は感情よりも状況を優先していて、想いを見せるまでに少し時間が必要そうです。",
        ],
        seed,
        13,
      )
    : pickBySeed(
        [
          "相手の中では、あなたへの印象がゆっくりと温度を持ちはじめています。",
          "その想いは無理に強い形ではなくても、やさしく確かなものとして育っています。",
        ],
        seed,
        17,
      );

  return `${base}\n${supplement}`;
}

function buildRelationshipFlow(card: DrawnCard, seed: number) {
  const state = card.reversed
    ? pickBySeed(
        ["気持ちはあるのに動きがゆっくりな状態", "心の中で行き来しながら様子を見ている状態", "近づきたい思いと慎重さが並んでいる状態"],
        seed,
        19,
      )
    : pickBySeed(
        ["静かに距離が縮まりつつある状態", "まだ繊細ながらも好意が育っている状態", "自然なつながりの中で想いが深まっている状態"],
        seed,
        23,
      );

  const next = card.reversed
    ? "焦って答えを求めるより、安心できる空気を重ねることで本音が見えやすくなります。"
    : "やさしいやり取りを重ねるほど、相手も素直な気持ちを見せやすくなるでしょう。";

  return `今二人の関係は\n\n${state}\n\nのような状態にあります。\n${next}`;
}

function buildLuminaMessage(card: DrawnCard, seed: number) {
  const close = card.reversed
    ? pickBySeed(
        [
          "言葉にならない想いも、心の奥には静かに残っていることがあります。",
          "今は曖昧に見える気持ちも、やがてやさしい形で輪郭を持ち始めます。",
        ],
        seed,
        29,
      )
    : pickBySeed(
        [
          "カードは、あなたとあの人の間に流れているやさしい想いを映し出しています。",
          "心の奥で育っている温かな感情は、無理をしなくても少しずつ届いていくでしょう。",
        ],
        seed,
        31,
      );

  return `言葉にならない想いも、\n心の奥には静かに残っていることがあります。\n\n${close}`;
}

function buildHeartTone(card: DrawnCard) {
  if (card.reversed) return "揺れながらも意識している";
  if (card.card.arcana === "major") return "深く、はっきり響いている";
  switch (card.card.suit) {
    case "cups":
      return "やさしい好意がにじむ";
    case "wands":
      return "気になって目で追っている";
    case "swords":
      return "考えながら距離を測っている";
    case "pentacles":
    default:
      return "静かに信頼を育てている";
  }
}

function buildDistanceLabel(card: DrawnCard) {
  if (card.reversed) return "近づきたいが慎重";
  if (card.card.arcana === "major") return "心では強くつながる";
  switch (card.card.suit) {
    case "cups":
      return "感情は近づいている";
    case "wands":
      return "きっかけ待ち";
    case "swords":
      return "様子見が続く";
    case "pentacles":
    default:
      return "ゆっくり安定へ";
  }
}

function buildGuidanceLabel(card: DrawnCard) {
  if (card.reversed) return "急がず、安心を重ねる";
  if (card.card.arcana === "major") return "自然体で受け止める";
  switch (card.card.suit) {
    case "cups":
      return "やさしく気持ちを返す";
    case "wands":
      return "軽やかに話しかける";
    case "swords":
      return "答えを急がない";
    case "pentacles":
    default:
      return "穏やかに信頼を育てる";
  }
}

export function getKareNoKimochiReading(question: string): KareNoKimochiReading {
  const normalizedQuestion = question.trim();

  if (!normalizedQuestion) {
    throw new Error("question is required");
  }

  const seed = hashString(normalizedQuestion);
  const random = createSeededRandom(seed);
  const drawn = drawTarotSpread(random, undefined)[0];

  if (!drawn) {
    throw new Error("failed to draw tarot card");
  }

  const cardImage = findTarotCardByJaName(drawn.card.nameJa);

  return {
    question: normalizedQuestion,
    cardName: drawn.card.nameJa,
    cardMeaning: drawn.reversed ? drawn.card.reversedMeaning : drawn.card.uprightMeaning,
    cardImagePath: cardImage?.imagePath ?? "/cards/00-the-fool.png",
    isReversed: drawn.reversed,
    intro: buildIntro(),
    cardInterpretation: buildCardInterpretation(drawn, seed),
    partnerEmotion: buildPartnerEmotion(drawn, seed),
    partnerFeeling: buildPartnerFeeling(drawn, seed),
    relationshipFlow: buildRelationshipFlow(drawn, seed),
    luminaMessage: buildLuminaMessage(drawn, seed),
    shortMessage: pickBySeed(
      [
        "あの人の心には、まだやさしい余白があります。",
        "本音は急がせずに見るほど、自然に輪郭が見えてきます。",
        "相手の心は、静かな温度であなたを意識しています。",
      ],
      seed,
      37,
    ),
    heartTone: buildHeartTone(drawn),
    distanceLabel: buildDistanceLabel(drawn),
    guidanceLabel: buildGuidanceLabel(drawn),
  };
}
