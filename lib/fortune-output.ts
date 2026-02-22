type LiteCard = {
  name: string;
  reversed?: boolean;
};

function normalizeText(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

function cardLabel(card?: LiteCard): string {
  if (!card) return "不明";
  return `${card.name}（${card.reversed ? "逆位置" : "正位置"}）`;
}

function ensureCardLine(text: string, cards: LiteCard[]): string {
  const normalized = normalizeText(text);
  if (/^引いたカード：/m.test(normalized)) return normalized;
  const first = cards[0];
  return `引いたカード：${cardLabel(first)}\n${normalized}`.trim();
}

function ensureNextActionBullet(text: string): string {
  if (/^\s*-\s+/m.test(text)) return text;
  return `${text}\n- 次の一手: 今日いちばん気になることを1つに絞って動いてみてください。`;
}

function trimResultBodyLines(text: string): string {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length <= 5) return lines.join("\n");
  const [first, ...rest] = lines;
  const body = rest.slice(0, 3);
  return [first, ...body].join("\n");
}

export function ensureFortuneOutputFormat(text: string, cards: LiteCard[]): string {
  const withCardLine = ensureCardLine(text, cards);
  const compact = trimResultBodyLines(withCardLine);
  return ensureNextActionBullet(compact);
}
