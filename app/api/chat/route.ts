import { NextResponse } from "next/server"
import OpenAI from "openai"
import { pickRandomCards } from "@/lib/fortune-data"
import type { TarotCardData } from "@/components/tarot-card"

function getOpenAIClient() {
  const rawKey = process.env.OPENAI_API_KEY
  const apiKey = typeof rawKey === "string" ? rawKey.trim() : ""
  if (!apiKey) return null
  return new OpenAI({ apiKey })
}

const LUMINA_SYSTEM_BASE = `# 白の魔女ルミナ - 完全キャラクター設定（AIへの命令書）

## 【キャラクター設定】
- **名前**: 白の魔女ルミナ
- **正体**: 光とハーブを操る優しい魔女
- **相棒**: 真っ白なアルビノインコ（カードを運ぶ役。普段は肩や窓辺にいる）
- **口調**: 慈愛に満ちた丁寧な敬語。温かく包み込むような話し方。「〜でございます」「〜ませ」「〜でいらっしゃいますね」など、品のある敬語を使う
- **性格**: 相談者を決して責めない。どんな悩みにも共感し、希望を見出せるよう背中を押す

## 【重要：定型文禁止】
- 相手の言葉をそのまま受け止め、その内容に沿って返答すること
- 「お悩みがあれば」のような汎用フレーズを繰り返さない
- 相手が言ったこと、感じていることに具体的に触れ、一人ひとりに合わせた返答をすること`

const LUMINA_CHAT_PROMPT = `${LUMINA_SYSTEM_BASE}

## 【会話モードの役割】
- **占いは行わない**。挨拶や悩み相談の段階では、カードは絶対に引かない
- **相手の話をよく聞く**。挨拶には挨拶で、悩みには共感と励ましで返す
- **その都度考える**。定型文ではなく、相手のメッセージの内容に即して返答する
- 悩みを話してくれたら、その悩みに寄り添い、具体的に言葉を返す
- 「ハーブの香り」「白い羽根」などの癒やしの情景を、自然に織り交ぜてもよい
- 200〜400字程度で、温かく返答する`

const LUMINA_FORTUNE_PROMPT = `${LUMINA_SYSTEM_BASE}

## 【占いのルール】※すべて必須
1. **インコの描写**: 相談を受けたら、冒頭でインコがカードを引いて運んでくる描写を必ず入れる（例：「白い翼がひらりと舞い、わたしの相棒が3枚のカードを運んできてくれました」）
2. **カード解説**: 現代の悩みに合わせて解説。悪いカードでも、ポジティブなヒントとして伝える
3. **癒やしの情景**: 「ハーブの香り」「白い羽根」「柔らかな光」などを文中に混ぜる
4. **アファメーション**: 最後に「引き寄せのアファメーション」を一つ必ずプレゼントする（例：「今日のアファメーション：私は光に包まれ、安心と愛に満ちています」）
5. **分量**: 700字程度で、段落分けして読みやすく`

function getErrorMessage(error: unknown): string {
  const err = error as { status?: number; message?: string } | null
  const status = err?.status
  if (status === 401)
    return "OpenAIのAPIキーが無効です。.env.localのOPENAI_API_KEYを確認し、サーバーを再起動してください。"
  if (status === 429)
    return "OpenAIの利用上限に達しています。https://platform.openai.com でプランや請求情報をご確認ください。"
  if (status && status >= 500)
    return "OpenAIのサーバーでエラーが発生しました。しばらくして再度お試しください。"
  if (err?.message) return err.message
  return "予期せぬエラーが発生しました。"
}

export async function POST(request: Request) {
  try {
    const openai = getOpenAIClient()
    if (!openai) {
      return NextResponse.json(
        {
          error:
            "OPENAI_API_KEYが設定されていません。.env.localにOPENAI_API_KEY=sk-...を追加し、サーバーを再起動してください。",
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const {
      message,
      cards: existingCards,
      mode = "fortune",
      history = [],
    } = body as {
      message: string
      cards?: TarotCardData[]
      mode?: "chat" | "fortune"
      history?: { role: "user" | "assistant"; content: string }[]
    }

    const trimmedMessage = (message ?? "").trim()

    if (mode === "fortune" && !trimmedMessage) {
      return NextResponse.json(
        { error: "占いには相談内容が必要です" },
        { status: 400 }
      )
    }

    if (mode === "chat") {
      const openaiMessages: {
        role: "system" | "user" | "assistant"
        content: string
      }[] = [
        {
          role: "system",
          content:
            trimmedMessage === "" || trimmedMessage === "__welcome__"
              ? `${LUMINA_CHAT_PROMPT}\n\n【現在】お客様が窓口を開きました。初めての訪問者を、白の魔女ルミナとして温かく迎える挨拶をしてください。定型の案内文ではなく、その場で考えた優しい一言で。150字程度。`
              : LUMINA_CHAT_PROMPT,
        },
      ]

      const validHistory = Array.isArray(history)
        ? history.filter(
            (h) =>
              h &&
              (h.role === "user" || h.role === "assistant") &&
              typeof h.content === "string" &&
              h.content.trim()
          )
        : []

      for (const h of validHistory) {
        openaiMessages.push({
          role: h.role,
          content: h.content.trim(),
        })
      }

      if (trimmedMessage && trimmedMessage !== "__welcome__") {
        openaiMessages.push({ role: "user", content: trimmedMessage })
      } else {
        openaiMessages.push({
          role: "user",
          content: "こんにちは。初めて来ました。",
        })
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        temperature: 0.9,
        max_tokens: 500,
      })

      const text =
        completion.choices[0]?.message?.content?.trim() ||
        "ありがとうございます。お悩みがございましたら、何でもお聞かせくださいませ。"

      return NextResponse.json({ text, cards: null })
    }

    const cards: TarotCardData[] =
      existingCards &&
      Array.isArray(existingCards) &&
      existingCards.length === 3
        ? existingCards
        : pickRandomCards(3)

    const cardsDescription = cards
      .map(
        (c, i) =>
          `${i + 1}枚目: ${c.reversed ? "【逆位置】" : ""}${c.name}（${c.meaning}）`
      )
      .join("\n")

    const historyContext =
      Array.isArray(history) && history.length > 0
        ? `\n【これまでの会話（参考）】\n${history
            .map((h) => `${h.role === "user" ? "相談者" : "ルミナ"}: ${h.content}`)
            .join("\n")}\n`
        : ""

    const userPrompt = `【相談者の悩み・質問】
${trimmedMessage}
${historyContext}
【引かれたタロットカード】
${cardsDescription}

上記の3枚のカードに基づいて、白の魔女ルミナとして占いのリーディングを行ってください。相談者の悩みの内容にしっかり寄り添い、その悩みに合わせた解説をしてください。

【必須要素】
1. 冒頭に、インコがカードを運んでくる描写を入れる
2. 各カードを現代の悩みに合わせて解説（悪いカードもポジティブなヒントに）
3. ハーブの香り・白い羽根・柔らかな光などの癒やしの情景を織り交ぜる
4. 最後に引き寄せのアファメーションを一つプレゼントする`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LUMINA_FORTUNE_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 1200,
    })

    const text =
      completion.choices[0]?.message?.content?.trim() ||
      "申し訳ございません。今の気持ちではうまく読み解けなかったようです。白い羽根に包まれ、もう一度心を落ち着けてお話しいただければ幸いです。"

    return NextResponse.json({ text, cards })
  } catch (error) {
    const message = getErrorMessage(error)
    console.error("[chat API error]", error)

    if (error && typeof error === "object" && "status" in error) {
      return NextResponse.json(
        { error: message },
        { status: (error as { status?: number }).status ?? 500 }
      )
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
