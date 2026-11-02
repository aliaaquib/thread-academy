/**
 * QUIZ ORDER — the order a question's options are shown in.
 * Lesson files mostly list the correct option last, so the display order is
 * mixed here. It comes from a hash of the question, not Math.random, so the
 * static HTML and the browser agree and every student sees the same order.
 */

/** Options that refer to their neighbours only make sense in the written order. */
const POSITIONAL = /\b(all|none) of the above\b|\bboth [a-d]\b|\b[a-d] and [a-d]\b/i;

/** Indices into `options`, in display order. */
export function quizOrder(question: string, options: string[]): number[] {
  const order = options.map((_, i) => i);
  if (options.some((o) => POSITIONAL.test(o))) return order;

  let h = 2166136261;
  for (const ch of question + options.join("|")) h = Math.imul(h ^ ch.codePointAt(0)!, 16777619);
  for (let i = order.length - 1; i > 0; i--) {
    h = (Math.imul(h, 1664525) + 1013904223) | 0;
    const j = (h >>> 16) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
