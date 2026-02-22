import assert from "node:assert/strict";
import { buildDialoguePrompt } from "../lib/prompt-builder";
import {
  buildPreFortuneFallbackReply,
  sanitizeDialogueReply,
} from "../lib/pre-fortune-reply";

function run() {
  assert.equal(
    sanitizeDialogueReply(
      "もっと仲良くなりたい",
      "私も仲良くなりたいと思います。どんなきっかけがほしいですか？"
    ),
    "いいですね。どんな場面で距離を縮めたいですか？"
  );

  assert.equal(
    sanitizeDialogueReply(
      "その人ともっと仲良くなりたい",
      "私も興味があります。何をきっかけに仲良くなれそうですか？"
    ),
    "そうなんですね。その人の好きなことは分かりますか？"
  );

  assert.equal(
    buildPreFortuneFallbackReply("こんにちは"),
    "こんにちは、何かお悩みですか？"
  );

  const prompt = buildDialoguePrompt("もっと仲良くなりたい");
  assert.match(prompt, /第三者・伴走者/);
  assert.match(prompt, /当事者にならない/);
  assert.match(prompt, /「私も〜したい」/);
}

run();
console.log("dialogue-reply.test.ts: OK");
