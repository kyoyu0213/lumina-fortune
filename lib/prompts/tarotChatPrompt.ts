import {
  buildLuminaTarotCorePrompt,
  buildLuminaTarotInterpretationGuide,
} from "@/lib/fortune/lumina-core";
import { formatTarotMeaningGuide } from "@/lib/fortune/tarot-meanings";
import { STYLE_GUIDE } from "@/lib/style-guide";
import type { DrawnTarotCard } from "@/lib/tarot/deck";

type TarotPromptTheme = "love" | "marriage" | "work" | "money" | "relationship" | "future" | "health" | null;

function formatSpreadCards(cards: DrawnTarotCard[]): string {
  return cards
    .map((draw, index) => {
      const orientation = draw.reversed ? "逆位置" : "正位置";
      const meaning = draw.reversed ? draw.card.reversedMeaning : draw.card.uprightMeaning;

      return [
        `${index + 1}. ${draw.position}: ${draw.card.nameJa}（${orientation}）`,
        `- 象徴キーワード: ${draw.card.symbolKeywords.join(" / ")}`,
        `- カードの情景: ${draw.card.imageDescription}`,
        `- 今回の読みの核: ${meaning}`,
      ].join("\n");
    })
    .join("\n");
}

function buildThemeLens(theme: TarotPromptTheme): string {
  switch (theme) {
    case "love":
      return "恋愛の流れ、相手との距離感、気持ちの動きに焦点を当てて読み解くこと。";
    case "marriage":
      return "結婚や将来のご縁、関係の成熟度、現実的な歩幅に焦点を当てて読み解くこと。";
    case "work":
      return "仕事運、役割、評価、進み方、選択の質に焦点を当てて読み解くこと。";
    case "money":
      return "金運、お金との向き合い方、使い方、守り方、育て方に焦点を当てて読み解くこと。";
    case "relationship":
      return "人間関係の距離感、誤解、信頼、関わり方に焦点を当てて読み解くこと。";
    case "future":
      return "少し先の流れ、これから開く可能性、今の選択が未来へどうつながるかに焦点を当てて読み解くこと。";
    case "health":
      return "健康運として、心身の流れや整え方に焦点を当てて読み解くこと。診断や病名の断定はしないこと。";
    default:
      return "相談全体の流れ、今の心の状態、次の一歩に焦点を当てて読み解くこと。";
  }
}

function getThemeLabel(theme: TarotPromptTheme): string {
  switch (theme) {
    case "love":
      return "恋愛";
    case "marriage":
      return "結婚";
    case "work":
      return "仕事";
    case "money":
      return "金運";
    case "relationship":
      return "人間関係";
    case "future":
      return "未来";
    case "health":
      return "健康";
    default:
      return "総合";
  }
}

function buildOutputFormatSection(theme: TarotPromptTheme): string {
  if (theme === "health") {
    return [
      "【出力形式】",
      "必ず以下の見出しをすべて使い、この順番で出力すること。",
      "🌿 健康運の鑑定結果",
      "🕊 引いたカード",
      "🌿 今の体と心の状態",
      "🌿 今、整えるとよいこと",
      "🌿 これからの流れ",
      "🌿 今日からできる整え方",
      "🌿 今日のひとこと",
    ].join("\n");
  }

  return [
    "【出力形式】",
    "必ず以下の見出しをすべて使い、この順番で出力すること。",
    "1. 引いたカード",
    "2. カードの気配",
    "3. 今の状況への読み解き",
    "4. 近い未来の可能性",
    "5. 心を整えるヒント",
    "6. アファメーション",
  ].join("\n");
}

function buildTarotRules(theme: TarotPromptTheme): string {
  const baseRules = [
    "【タロット文章ルール】",
    buildThemeLens(theme),
    "- 3枚のカードを別々に説明するだけでなく、一つの流れとして結ぶこと。",
    "- カードの意味を丸写しせず、相談内容に寄せた解釈へ編み直すこと。",
    "- やわらかく神秘的に語るが、曖昧な美辞麗句だけで終わらせないこと。",
    "- 不安を煽らず、相手が現実で試せる小さな行動へ着地させること。",
    "- 同じ意味や言い回しの繰り返しを避けること。",
    "- 決めつけではなく、今の流れと選び方として伝えること。",
  ];

  if (theme === "health") {
    baseRules.push("- 医療判断、病名、治療方針、生死に関する断定はしないこと。");
    baseRules.push("- 受診や相談を促す場合も、一般的で穏やかな表現に留めること。");
  }

  return baseRules.join("\n");
}

function buildCardInterpretationRules(cards: DrawnTarotCard[]): string {
  return [
    "【カード別解釈ルール】",
    "以下の辞書は説明文としてそのまま写さず、相談内容に合わせて自然な文章へ編み直すこと。",
    "正位置なら追い風として、逆位置なら注意点や調整点として扱うこと。",
    cards.map((draw) => formatTarotMeaningGuide(draw.card)).join("\n\n"),
  ].join("\n");
}

export function buildTarotChatPrompt(
  message: string,
  cards: DrawnTarotCard[],
  theme: TarotPromptTheme = null
): string {
  return [
    buildLuminaTarotCorePrompt(),
    buildLuminaTarotInterpretationGuide(getThemeLabel(theme)),
    buildTarotRules(theme),
    buildCardInterpretationRules(cards),
    "【カード意味】\n" + formatSpreadCards(cards),
    "【ユーザー質問】\n" + message,
    buildOutputFormatSection(theme),
    STYLE_GUIDE,
  ].join("\n\n");
}
