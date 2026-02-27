import type { DrawnTarotCard } from "@/lib/tarot/deck";

type TarotOutputTheme = "love" | "marriage" | "work" | "money" | "health" | "relationship" | "future" | null;

const REQUIRED_HEADERS = [
  "1. 引いたカード",
  "2. カードの気配",
  "3. 今の状況への読み解き",
  "4. 近い未来の可能性",
  "5. 心を整えるヒント",
  "6. アファメーション",
] as const;

const HEALTH_REQUIRED_HEADERS = [
  "1. 引いたカード",
  "2. 体の流れ・エネルギー状態の象徴",
  "3. 今の心身バランスの読み解き",
  "4. 近い未来の体調傾向（断定禁止）",
  "5. 今日からできる整え方（具体的だが医療的でない）",
  "6. アファメーション（体と調和する言葉）",
] as const;

const MIMETIC_WORDS = [
  "ふわっと",
  "じんわり",
  "ぽかぽか",
  "ざわざわ",
  "もやもや",
  "ぎゅっと",
  "きらきら",
  "どきどき",
  "ドキドキ",
] as const;

function normalize(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

function cardLine(cards: DrawnTarotCard[]): string {
  return cards
    .map((c) => `${c.position}: ${c.card.nameJa}（${c.reversed ? "逆位置" : "正位置"}）`)
    .join(" / ");
}

function symbolLines(cards: DrawnTarotCard[]): string {
  return cards
    .map((c) => {
      const core = c.reversed ? c.card.reversedMeaning : c.card.uprightMeaning;
      return `- ${c.position}の${c.card.nameJa}（${c.reversed ? "逆位置" : "正位置"}）: ${c.card.imageDescription} ${core}。`;
    })
    .join("\n");
}

function fallbackTemplate(cards: DrawnTarotCard[]): string {
  return [
    `1. 引いたカード`,
    cardLine(cards),
    ``,
    `2. カードの気配`,
    symbolLines(cards),
    ``,
    `3. 今の状況への読み解き`,
    "今のあなたは、気持ちを丁寧に扱いながらも、少し肩に力が入りやすい状態です。少しだけ力を抜いたほうが、言葉は自然に届きやすくなります。",
    ``,
    `4. 近い未来の可能性`,
    "- 軽い一言がきっかけになって、距離が近づく流れがあります。",
    "- 安心できる場に身を置くほど、関係が整いやすくなる可能性が見えます。",
    ``,
    `5. 心を整えるヒント`,
    "- \"ちゃんとしなきゃ\" を少しゆるめてみてください。",
    "- 感情を分析しすぎず、まずはそのまま感じてみてください。",
    "- 落ち着ける相手や場所との時間を大切にしてください。",
    ``,
    `6. アファメーション`,
    "私は、落ち着いた愛を受け取り、やさしい関係を育てていきます。",
  ].join("\n");
}

function healthFallbackTemplate(cards: DrawnTarotCard[]): string {
  return [
    `1. 引いたカード`,
    cardLine(cards),
    ``,
    `2. 体の流れ・エネルギー状態の象徴`,
    symbolLines(cards),
    ``,
    `3. 今の心身バランスの読み解き`,
    "今は心と体のリズムにずれが出やすく、がんばり方に対して回復が追いつきにくい流れが見えます。どの時間帯なら少し力を抜けそうでしょうか？ まずは『休む前提』で一日の配分を整えると、心身の緊張がほどけやすくなります。",
    ``,
    `4. 近い未来の体調傾向（断定禁止）`,
    "- 休息の質を意識すると、重さが少しずつほどける方向へ向かう可能性があります。",
    "- 無理を詰め込みすぎると、心身のだるさとして出やすくなる可能性もあります。",
    ``,
    `5. 今日からできる整え方（具体的だが医療的でない）`,
    "- 寝る前の10分だけ光を落として、呼吸をゆっくり整えてください。",
    "- 体を冷やしすぎないよう、首元や足元の温度をやさしく整えてください。",
    "- 予定の合間に1回、何もしない時間を短く入れて回復の余白を作ってください。",
    ``,
    `6. アファメーション（体と調和する言葉）`,
    "私は自分の体の声を静かに聴き、やさしく整えていけます。",
  ].join("\n");
}

function capMimetics(text: string, maxCount = 3): string {
  let count = 0;
  let out = text;
  for (const word of MIMETIC_WORDS) {
    const re = new RegExp(word, "g");
    out = out.replace(re, (m) => {
      count += 1;
      return count <= maxCount ? m : "静かに";
    });
  }
  return out;
}

function softenEndingRuns(text: string): string {
  const sentences = text.match(/[^。！？\n]+[。！？]?|\n/g) ?? [];
  let prevEnding = "";
  let run = 0;
  return sentences
    .map((part) => {
      if (part === "\n") {
        prevEnding = "";
        run = 0;
        return part;
      }
      const ending =
        /ます。$/.test(part) ? "ます" : /です。$/.test(part) ? "です" : /でしょう。$/.test(part) ? "でしょう" : "";
      if (!ending) {
        prevEnding = "";
        run = 0;
        return part;
      }
      if (ending === prevEnding) {
        run += 1;
      } else {
        prevEnding = ending;
        run = 1;
      }
      if (run < 3) return part;
      if (ending === "です") return part.replace(/です。$/, "でしょう。");
      if (ending === "ます") return part.replace(/ます。$/, "ますね。");
      if (ending === "でしょう") return part.replace(/でしょう。$/, "ます。");
      return part;
    })
    .join("");
}

function ensureQuestion(text: string): string {
  if (/[？?]/.test(text)) return text;
  const lines = text.split("\n");
  const idx = lines.findIndex((line) => /^3\.\s/.test(line.trim()));
  if (idx >= 0) {
    lines.splice(idx + 1, 0, "ここで、あなたが本当に守りたいものは何でしょうか？");
    return lines.join("\n");
  }
  return `${text}\n\nここで、あなたが本当に守りたいものは何でしょうか？`;
}

function ensureAffirmation(text: string): string {
  const lines = text.split("\n");
  const idx = lines.findIndex((line) => /^6\.\sアファメーション/.test(line.trim()));
  if (idx < 0) return `${text}\n\n6. アファメーション\n私は落ち着いて、自分に合う選択を重ねていけます。`;
  const next = lines.slice(idx + 1).find((line) => line.trim());
  if (next) return text;
  lines.push("私は落ち着いて、自分に合う選択を重ねていけます。");
  return lines.join("\n");
}

function applyLuminaVoiceRules(text: string): string {
  return text
    .replace(/カードの象徴/g, "カードの気配")
    .replace(/心を整えるアドバイス/g, "心を整えるヒント")
    .replace(/描かれています/g, "気配があります")
    .replace(/示しています/g, "伝えています")
    .replace(/必ず/g, "近づく流れがあります")
    .replace(/絶対に/g, "その可能性が見えます")
    .replace(/LINEで[^。]*。/g, "軽い一言がきっかけになります。")
    .replace(/今週[^。]*(イベント|参加)[^。]*。/g, "安心できる場に身を置いてみてください。");
}

function ensureCalmClosing(text: string): string {
  const closingLines = [
    "あなたは、もう十分に整っています。",
    "焦らなくて大丈夫です。",
    "光は静かに近づいています。",
  ];
  if (closingLines.every((line) => text.includes(line))) return text;
  return `${text}\n${closingLines.join("\n")}`;
}

function normalizeLegacyDailyLabels(text: string): string {
  return text
    .replace(/^引いたカード：/m, "1. 引いたカード\n")
    .replace(/^カードの象徴:/m, "2. カードの気配")
    .replace(/^カードの気配:/m, "2. カードの気配")
    .replace(/^今日の読み:/m, "3. 今の状況への読み解き")
    .replace(/^注意点:/m, "4. 近い未来の可能性")
    .replace(/^今日の行動ヒント:/m, "5. 心を整えるヒント")
    .replace(/^心を整えるアドバイス:/m, "5. 心を整えるヒント")
    .replace(/^ひと言:/m, "6. アファメーション");
}

function hasAllHeaders(text: string): boolean {
  return REQUIRED_HEADERS.every((header) => text.includes(header));
}

function hasAllHealthHeaders(text: string): boolean {
  return HEALTH_REQUIRED_HEADERS.every((header) => text.includes(header));
}

export function ensureTarotChatOutputFormat(
  rawText: string,
  cards: DrawnTarotCard[],
  theme: TarotOutputTheme = null
): string {
  let text = normalizeLegacyDailyLabels(normalize(rawText));

  if (theme === "health") {
    if (!hasAllHealthHeaders(text)) {
      text = healthFallbackTemplate(cards);
    }
  } else if (!hasAllHeaders(text)) {
    text = fallbackTemplate(cards);
  }

  if (!/1\. 引いたカード[\s\S]*?(現状|課題|助言):/.test(text)) {
    text = text.replace(/1\. 引いたカード\s*\n(?:.*\n)?/, `1. 引いたカード\n${cardLine(cards)}\n`);
  }

  if (!/2\. カードの気配[\s\S]*?(描|人物|絵|姿|気配|伝え)/.test(text)) {
    text = text.replace(/2\. カードの気配[\s\S]*?(?=\n3\. 今の状況への読み解き)/, `2. カードの気配\n${symbolLines(cards)}\n`);
  }

  text = ensureQuestion(text);
  text = ensureAffirmation(text);
  text = applyLuminaVoiceRules(text);
  text = capMimetics(text);
  text = softenEndingRuns(text);
  text = ensureCalmClosing(text);

  return text.replace(/\n{3,}/g, "\n\n").trim();
}
