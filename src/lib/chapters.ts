/**
 * Topics inside each chapter, grouped by subject.
 * Key = chapter id (the folder name under content/subject/<subject>/grade-<n>/).
 *
 * A topic becomes a real page only when its lesson file exists:
 *   content/subject/<subject>/grade-<n>/<chapter>/<topic>.mdx
 * So adding a topic = adding one line here + one .mdx file. Nothing else changes.
 *
 * Hand-written topics below always come first. getChapterTopics() tops each
 * chapter up to four lessons using chapter-topics-extra.ts.
 */

import type { Topic } from "./types";
import { EXTRA_TOPICS } from "./chapter-topics-extra";
import type { Lang } from "./i18n";
import { getOverlay } from "./i18n";

export const CHAPTER_TOPICS: Record<string, Topic[]> = {
  // ── Mathematics ──
  algebra: [
    { slug: "linear-equations", title: "Linear Equations", desc: "Solve for x: one step, two steps, both sides." },
  ],
  // ── Physics ──
  forces: [
    { slug: "newtons-laws", title: "Newton's Laws of Motion", desc: "The three laws that govern how everything moves." },
  ],
  // ── Chemistry ──
  "atomic-structure": [
    { slug: "atoms-and-elements", title: "Atoms and Elements", desc: "Protons, neutrons, electrons — and what makes an element." },
  ],
  // ── Biology ──
  "cell-biology": [
    { slug: "cell-structure", title: "Cell Structure", desc: "Meet the organelles: the tiny machines inside every cell." },
  ],
  // ── Computer Science ──
  "computational-thinking-programming": [
    { slug: "flowcharts", title: "Flowcharts", desc: "Draw the steps of a solution with standard flowchart symbols." },
  ],
  programming: [
    { slug: "variables", title: "Variables", desc: "A named box that stores a value — in real, runnable Python." },
  ],
};

export function getChapterTopics(subject: string, chapterId: string, lang: Lang = "en"): Topic[] {
  const base = CHAPTER_TOPICS[chapterId] ?? [];
  // Hand-written topics always come first; generated ones top the chapter up to four lessons.
  let topics: Topic[];
  if (base.length >= 4) topics = base;
  else {
    const extra = (EXTRA_TOPICS[chapterId] ?? []).filter((t) => !base.some((b) => b.slug === t.slug));
    topics = [...base, ...extra].slice(0, 4);
  }
  if (lang === "en") return topics;
  const overlays = getOverlay(lang)?.topics;
  if (!overlays) return topics;
  // Topic overlay keys are "subject/slug" so the same slug in different
  // subjects (e.g. "variables" in maths vs computer science) never collide.
  return topics.map((t) => {
    const o = overlays[`${subject}/${t.slug}`] ?? overlays[t.slug];
    return o ? { ...t, title: o.title ?? t.title, desc: o.desc ?? t.desc } : t;
  });
}
