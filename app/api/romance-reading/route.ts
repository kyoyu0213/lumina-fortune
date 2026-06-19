import { NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { buildLuminaPrompt, type RomanceFeature, type InterpretationFrameInput } from "@/lib/ai/lumina-prompts";
import { enforceClaudeRateLimit } from "@/lib/security/rate-limit";
import { apiError } from "@/lib/api-error";

type RequestBody = {
  feature: RomanceFeature;
  templateReading: Record<string, unknown>;
  context?: string;
  interpretationFrame?: InterpretationFrameInput;
};

const VALID_FEATURES: RomanceFeature[] = [
  "fukuen",
  "kare-no-kimochi",
  "kataomoi",
  "compatibility",
  "marriage-timing",
];

// ── 入力検証用Zodスキーマ ──
// 目的: context / templateReading / interpretationFrame が無検証のまま
//       プロンプトへ連結される箇所を締め、無制限な文字列によるプロンプト注入を防ぐ。
// 上限は実測値（templateReading≈1.1KB・最長文字列≈100字・深さ2、
//   frameの自由記述≈13〜24字、質問≈69字）に対し十分な余裕を取り、正常系を弾かない。
const MAX_CONTEXT = 2000; // 質問文。実測≈69字に対し約29倍の余裕
const MAX_TEMPLATE_STRING = 2000; // templateReading内の各文字列。実測最長≈100字に対し約20倍
const MAX_TEMPLATE_ARRAY = 200; // 配列要素数（years/tips/signs等。実測は数件）
const MAX_TEMPLATE_KEYS = 200; // オブジェクトのキー数
const MAX_TEMPLATE_DEPTH = 8; // ネスト深さ（実測は深さ2〜3）
const MAX_FRAME_FIELD = 500; // interpretationFrameの各フィールド。実測≈24字に対し約20倍

// templateReadingは feature ごとに形が異なる Record<string, unknown>。
// プロンプト注入の本質的リスクは「どこかの文字列が無制限に長い／ネストが膨らむ」こと。
// そこで再帰的に「あらゆる文字列に上限・配列長・キー数・深さ上限」をかける有界JSONとして検証する。
const boundedJsonObject = (
  valueSchema: z.ZodTypeAny
): z.ZodTypeAny =>
  z
    .record(z.string().max(200), valueSchema)
    .refine((o) => Object.keys(o).length <= MAX_TEMPLATE_KEYS, {
      message: "object has too many keys",
    });

function boundedJsonValue(depth: number): z.ZodTypeAny {
  const leaf = z.union([
    z.string().max(MAX_TEMPLATE_STRING),
    z.number(),
    z.boolean(),
    z.null(),
  ]);
  if (depth <= 0) return leaf;
  const inner = boundedJsonValue(depth - 1);
  return z.union([leaf, z.array(inner).max(MAX_TEMPLATE_ARRAY), boundedJsonObject(inner)]);
}

const templateReadingSchema = boundedJsonObject(boundedJsonValue(MAX_TEMPLATE_DEPTH));

// interpretationFrame は InterpretationFrameInput（8フィールド必須）に対応。
// keyObstacle / emotionalCore は自由記述としてそのままプロンプトへ入るため上限必須。
const interpretationFrameSchema = z.object({
  userEmotionalState: z.string().max(MAX_FRAME_FIELD),
  partnerState: z.string().max(MAX_FRAME_FIELD),
  relationshipPhase: z.string().max(MAX_FRAME_FIELD),
  energyFlow: z.string().max(MAX_FRAME_FIELD),
  keyObstacle: z.string().max(MAX_FRAME_FIELD),
  hopeLevel: z.string().max(MAX_FRAME_FIELD),
  guidanceTone: z.string().max(MAX_FRAME_FIELD),
  emotionalCore: z.string().max(MAX_FRAME_FIELD),
});

const romanceRequestSchema = z.object({
  // 既存のホワイトリスト VALID_FEATURES と一致させる
  feature: z.enum(["fukuen", "kare-no-kimochi", "kataomoi", "compatibility", "marriage-timing"]),
  templateReading: templateReadingSchema,
  context: z.string().max(MAX_CONTEXT).optional(),
  interpretationFrame: interpretationFrameSchema.optional(),
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const rateLimited = await enforceClaudeRateLimit(request, { daily: true });
    if (rateLimited) return rateLimited;

    const rawBody = await request.json();
    const parsed = romanceRequestSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "リクエストの形式が正しくありません。" },
        { status: 400 }
      );
    }
    const body = parsed.data as RequestBody;
    const { feature, templateReading, context, interpretationFrame } = body;

    if (!feature || !templateReading) {
      return NextResponse.json({ ok: false, error: "missing required fields" }, { status: 400 });
    }

    if (!VALID_FEATURES.includes(feature)) {
      return NextResponse.json({ ok: false, error: "unknown feature" }, { status: 400 });
    }

    // API キーがない場合はテンプレートをそのまま返す
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn("[api/romance-reading] ANTHROPIC_API_KEY not set; returning template");
      return NextResponse.json({ ok: true, reading: templateReading });
    }

    const prompt = buildLuminaPrompt({ feature, templateReading, context, interpretationFrame });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: prompt.system,
      messages: [{ role: "user", content: prompt.user }],
    });

    const block = response.content[0];
    const text = block?.type === "text" ? block.text.trim() : "";

    if (!text) {
      return NextResponse.json({ ok: true, reading: templateReading });
    }

    // JSON を抽出（コードブロックで囲まれている場合にも対応）
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonText = (jsonMatch ? jsonMatch[1]! : text).trim();

    try {
      const enhanced = JSON.parse(jsonText) as Record<string, unknown>;
      // テンプレートをベースに Claude の結果をマージ（非テキストフィールドの欠落を防ぐ）
      const merged = { ...templateReading, ...enhanced };
      return NextResponse.json({ ok: true, reading: merged });
    } catch {
      console.warn("[api/romance-reading] failed to parse Claude JSON; returning template");
      return NextResponse.json({ ok: true, reading: templateReading });
    }
  } catch (error) {
    return apiError(error, { route: "romance-reading", shape: "ok" });
  }
}
