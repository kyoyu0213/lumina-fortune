import assert from "node:assert/strict";
import { buildDailyFortunePrompt } from "../lib/prompt-builder";
import { snapshots } from "./prompt-builder.snapshot";

function run() {
  const prompt = buildDailyFortunePrompt("2026年2月21日の運勢を占ってください。", [
    { name: "星" },
  ]);

  // Snapshot
  assert.equal(prompt, snapshots.dailyFortune);

  // Style constraints
  assert.match(prompt, /一人称は必ず「私」を使う/);
  assert.match(prompt, /です\/ます/);
  assert.match(prompt, /「〜わ」は使わない/);
  assert.match(prompt, /1枚引きの結果/);
  assert.match(prompt, /200〜350文字程度/);
  assert.match(prompt, /第三者として助言/);
}

run();
console.log("prompt-builder.test.ts: OK");
