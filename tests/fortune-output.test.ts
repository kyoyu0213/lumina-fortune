import assert from "node:assert/strict";
import { ensureFortuneOutputFormat } from "../lib/fortune-output";

function run() {
  const formatted = ensureFortuneOutputFormat(
    "今日は仕事の流れに少し整理が必要そうです。優先順位を先に決めると動きやすくなります。",
    [{ name: "世界", reversed: false }]
  );

  assert.match(formatted, /^引いたカード：世界（正位置）/);
  assert.match(formatted, /- 次の一手:/);

  const alreadyFormatted = ensureFortuneOutputFormat(
    "引いたカード：隠者（逆位置）\n今日は抱え込みやすい流れです。相談先を1つ決めると整理しやすくなります。\n- 次の一手: 朝のうちに相談したい内容を3行でメモしてください。",
    [{ name: "隠者", reversed: true }]
  );
  assert.match(alreadyFormatted, /^引いたカード：隠者（逆位置）/);
  assert.equal((alreadyFormatted.match(/- 次の一手:/g) ?? []).length, 1);
}

run();
console.log("fortune-output.test.ts: OK");
