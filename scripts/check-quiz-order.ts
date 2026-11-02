// Self-check for src/lib/quiz-order.ts, run against every quiz in every language:
//   npx tsx scripts/check-quiz-order.ts
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { quizOrder } from "../src/lib/quiz-order";

const QUESTION = /<QuizQuestion\s+question="([^"]*)"\s+options=\{(\[[\s\S]*?\])\}\s+answer=\{(\d)\}/g;

function* mdxFiles(dir: string): Generator<string> {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) yield* mdxFiles(join(dir, e.name));
    else if (e.name.endsWith(".mdx")) yield join(dir, e.name);
  }
}

const shown = [0, 0, 0, 0];
let total = 0;
for (const file of mdxFiles("content")) {
  for (const [, question, list, answer] of readFileSync(file, "utf8").matchAll(QUESTION)) {
    const options: string[] = JSON.parse(list);
    const order = quizOrder(question, options);
    assert.deepEqual([...order].sort(), options.map((_, i) => i), `${file}: not a permutation`);
    assert.deepEqual(order, quizOrder(question, options), `${file}: order must be repeatable`);
    shown[order.indexOf(Number(answer))]++;
    total++;
  }
}

console.log(`${total} questions; correct answer shown in positions 1-4:`, shown);
assert.ok(total > 0, "no quiz questions found");
for (const n of shown) assert.ok(n / total > 0.2 && n / total < 0.3, "positions should be about even");
