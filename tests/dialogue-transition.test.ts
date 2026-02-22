import assert from "node:assert/strict";
import {
  buildFortuneOfferReply,
  getDialogueConversationState,
  type ChatHistoryItem,
} from "../lib/dialogue-transition";

function run() {
  const flowHistory: ChatHistoryItem[] = [
    { role: "user", content: "最近気になる人がいます" },
    { role: "assistant", content: "そうなんですね。どんな場面で話すことが多いですか？" },
  ];

  const state = getDialogueConversationState(flowHistory, "手をつないでくれました");
  assert.equal(state.hasRelationshipInfo, true);
  assert.equal(state.shouldOfferFortune, true);
  assert.equal(state.triggerReason, "relationship-info");

  const offer = buildFortuneOfferReply(flowHistory, "手をつないでくれました");
  assert.match(offer, /手をつないだことがある/);
  assert.match(offer, /(占ってみますか|占いますか|1枚引きして)/);
  assert.ok(offer.length <= 120, `offer too long: ${offer.length}`);

  const questionRallyHistory: ChatHistoryItem[] = [
    { role: "assistant", content: "そうなんですね。どんな人ですか？" },
    { role: "user", content: "優しい人です" },
    { role: "assistant", content: "どんな時にやさしいと感じますか？" },
    { role: "user", content: "話を聞いてくれます" },
    { role: "assistant", content: "最近の印象的な出来事はありますか？" },
  ];
  const stateByStreak = getDialogueConversationState(questionRallyHistory, "はい");
  assert.equal(stateByStreak.questionStreak, 3);
  assert.equal(stateByStreak.shouldOfferFortune, true);
  assert.equal(stateByStreak.triggerReason, "question-streak");

  const stateFortuneRequest = getDialogueConversationState(flowHistory, "占って");
  assert.equal(stateFortuneRequest.shouldOfferFortune, false);

  const affirmativeHistory: ChatHistoryItem[] = [
    { role: "assistant", content: "気になるんですね。会話は続きますか？" },
    { role: "user", content: "はい" },
    { role: "assistant", content: "そうなんですね。相手もよく話しかけてくれますか？" },
  ];
  const stateByAffirmative = getDialogueConversationState(affirmativeHistory, "気になります");
  assert.equal(stateByAffirmative.affirmativeStreak, 2);
  assert.equal(stateByAffirmative.shouldOfferFortune, true);
  assert.equal(stateByAffirmative.triggerReason, "affirmative-streak");
}

run();
console.log("dialogue-transition.test.ts: OK");
