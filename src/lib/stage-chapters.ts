/**
 * CHAPTER NAMES — every chapter's display title and description, per subject.
 *
 * To rename a chapter: change its `title` here (keep the `id` the same so
 * links don't break). To add a chapter: add a line to the right subject and
 * band below, then add the chapter id to grades.ts and its topics to
 * chapters.ts. Bands run easiest -> hardest: foundations, developing,
 * examination, advanced.
 */
import type { Chapter } from "./types";
import { getSubject } from "./subjects";
import type { Lang } from "./i18n";
import { getOverlay } from "./i18n";

/**
 * Chapter sets per subject — the data behind the Subject → Chapters flow.
 * Every subject defines its own chapters per band (foundations → developing
 * → examination → advanced); the subject page merges the four bands into one
 * ordered chapter list, deduplicated by chapter id. Bands holding a subject's
 * published MDX lessons reuse that subject's existing chapter ids, keeping
 * every lesson link working.
 */

export type Band = "foundations" | "developing" | "examination" | "advanced";

/** Band order for the merged per-subject chapter list. */
const BAND_ORDER: Band[] = ["foundations", "developing", "examination", "advanced"];

export const BAND_CHAPTERS: Record<string, Record<Band, Chapter[]>> = {
  // ── Biology ──
  "biology": {
    "foundations": [
      { id: "living-things", title: "Living Things", desc: "What makes something alive? Explore habitats near you." },
    ],
    "developing": [
      { id: "cell-biology", title: "Cell Biology", desc: "The building blocks of life: cells, organelles and microscopes." },
      { id: "health-disease", title: "Health and Disease", desc: "Pathogens, immunity and healthy lifestyles." },
    ],
    "examination": [
      { id: "cell-biology", title: "Cell Biology", desc: "The building blocks of life: cells, organelles and microscopes." },
      { id: "bioenergetics", title: "Bioenergetics", desc: "Photosynthesis and respiration: how life gets its energy." },
    ],
    "advanced": [
      { id: "biochemistry", title: "Biochemistry", desc: "The molecules of life: proteins, enzymes and DNA." },
      { id: "physiology", title: "Human Physiology", desc: "Nervous and hormonal control in depth." },
    ],
  },
  // ── Chemistry ──
  "chemistry": {
    "foundations": [
      { id: "mixtures", title: "Mixtures", desc: "Separating mixtures by filtering, sieving and evaporating." },
    ],
    "developing": [
      { id: "atomic-structure", title: "Atomic Structure", desc: "Atoms, elements and the particles inside them." },
      { id: "acids-alkalis", title: "Acids and Alkalis", desc: "The pH scale, indicators and neutralisation." },
    ],
    "examination": [
      { id: "atomic-structure", title: "Atomic Structure", desc: "Atoms, elements and the particles inside them." },
      { id: "chemical-bonding", title: "Chemical Bonding", desc: "Ionic, covalent and metallic bonds: how atoms hold together." },
      { id: "quantitative-chemistry", title: "Quantitative Chemistry", desc: "Moles, masses and doing the maths of reactions." },
    ],
    "advanced": [
      { id: "organic-chemistry", title: "Organic Chemistry", desc: "Carbon compounds, mechanisms and synthesis." },
    ],
  },
  // ── Computer Science ──
  "computer-science": {
    "foundations": [
      { id: "computational-thinking-programming", title: "Computational Thinking and Programming", desc: "Plan with flowcharts, then bring your ideas to life in Python." },
],
    "developing": [
      { id: "computational-thinking", title: "Computational Thinking", desc: "The problem-solving mindset behind every program." },
      { id: "programming", title: "Programming Fundamentals", desc: "Python from zero: variables, data, logic, loops and functions." },
    ],
    "examination": [
      { id: "computational-thinking", title: "Computational Thinking", desc: "The problem-solving mindset behind every program." },
      { id: "programming", title: "Programming Fundamentals", desc: "Python from zero: variables, data, logic, loops and functions." },
      { id: "algorithms", title: "Algorithms", desc: "Designing step-by-step solutions: searching, sorting and efficiency." },
    ],
    "advanced": [
      { id: "data-structures", title: "Data Structures", desc: "Stacks, queues, trees and graphs." },
      { id: "ai-ethics", title: "AI and Ethics", desc: "How machine learning works and using it responsibly." },
    ],
  },
  // ── Mathematics ──
  "mathematics": {
    "foundations": [
      { id: "shapes-measures", title: "Shapes and Measures", desc: "Recognise common shapes and compare length, weight and capacity." },
    ],
    "developing": [
      { id: "number-arithmetic", title: "Number & Arithmetic", desc: "Number systems, fractions, decimals, percentages and the rules of arithmetic." },
      { id: "algebra", title: "Algebra", desc: "Letters that stand for numbers — expressions, equations and functions." },
      { id: "geometry", title: "Geometry", desc: "Angles, shapes, area, perimeter and the logic of space." },
    ],
    "examination": [
      { id: "number-arithmetic", title: "Number & Arithmetic", desc: "Number systems, fractions, decimals, percentages and the rules of arithmetic." },
      { id: "algebra", title: "Algebra", desc: "Letters that stand for numbers — expressions, equations and functions." },
      { id: "geometry", title: "Geometry", desc: "Angles, shapes, area, perimeter and the logic of space." },
      { id: "probability", title: "Probability", desc: "Chance, likelihood and the mathematics of uncertainty." },
    ],
    "advanced": [
      { id: "mechanics", title: "Mechanics", desc: "Kinematics, forces and Newton's laws applied to motion." },
    ],
  },
  // ── Physics ──
  "physics": {
    "foundations": [
      { id: "pushes-pulls", title: "Pushes and Pulls", desc: "How pushes and pulls can change how things move." },
    ],
    "developing": [
      { id: "forces", title: "Forces", desc: "Pushes, pulls and Newton's three laws of motion." },
      { id: "motion", title: "Motion", desc: "Speed, velocity, acceleration and describing movement with graphs." },
    ],
    "examination": [
      { id: "forces", title: "Forces", desc: "Pushes, pulls and Newton's three laws of motion." },
      { id: "motion", title: "Motion", desc: "Speed, velocity, acceleration and describing movement with graphs." },
      { id: "waves", title: "Waves", desc: "Wave properties, sound and the electromagnetic spectrum." },
      { id: "electricity", title: "Electricity", desc: "Current, voltage, resistance and simple circuits." },
    ],
    "advanced": [
      { id: "fields", title: "Fields", desc: "Gravitational, electric and magnetic fields." },
    ],
  },
};

/** Chapters for a subject: the four bands merged into one ordered list,
 *  deduplicated by chapter id (first band wins). Falls back to the
 *  subject's default chapter list when no band data exists.
 *  Teacher-written translations overlay titles/descriptions per language. */
export function getChaptersForSubject(subjectSlug: string, lang: Lang = "en"): Chapter[] {
  const byBand = BAND_CHAPTERS[subjectSlug];
  let list: Chapter[];
  if (byBand) {
    const seen = new Set<string>();
    const merged: Chapter[] = [];
    for (const band of BAND_ORDER) {
      for (const chapter of byBand[band] ?? []) {
        if (!seen.has(chapter.id)) {
          seen.add(chapter.id);
          merged.push(chapter);
        }
      }
    }
    list = merged.length > 0 ? merged : (getSubject(subjectSlug, lang)?.chapters ?? []);
  } else {
    list = getSubject(subjectSlug, lang)?.chapters ?? [];
  }
  if (lang === "en") return list;
  const overlays = getOverlay(lang)?.chapters;
  if (!overlays) return list;
  return list.map((c) => {
    const o = overlays[c.id];
    return o ? { ...c, title: o.title ?? c.title, desc: o.desc ?? c.desc } : c;
  });
}

/** Find one chapter within a subject. Checks the merged band chapters
 *  first, then the subject's default chapters. */
export function getChapterForSubject(
  subjectSlug: string,
  chapterId: string,
  lang: Lang = "en",
): Chapter | null {
  const inBands = getChaptersForSubject(subjectSlug, lang).find((c) => c.id === chapterId);
  if (inBands) return inBands;
  return getSubject(subjectSlug, lang)?.chapters.find((c) => c.id === chapterId) ?? null;
}
