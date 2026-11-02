/**
 * WHICH CHAPTER GOES IN WHICH GRADE (7-12), per subject.
 *
 * To move a chapter to another grade: cut its id from one grade list and
 * paste it into another. To add a chapter: add its id to a grade list, and
 * make sure the chapter also exists in stage-chapters.ts and chapters.ts.
 * Every chapter id must appear in exactly one grade.
 */
import type { Chapter } from "./types";
import { getChapterForSubject } from "./stage-chapters";
import type { Lang } from "./i18n";

/** School grades offered after subject selection. */
export const GRADES = [7, 8, 9, 10, 11, 12] as const;
export type Grade = (typeof GRADES)[number];

/** URL slug for a grade, e.g. 8 -> "grade-8". */
export function gradeSlug(grade: number): string {
  return `grade-${grade}`;
}

/** Parse a URL grade segment ("grade-8") -> 8, or null when invalid. */
export function parseGradeSlug(slug: string): Grade | null {
  const m = /^grade-([789]|1[012])$/.exec(slug);
  if (!m) return null;
  return Number(m[1]) as Grade;
}

/**
 * Approved chapter -> grade assignment per subject (2026-09-24).
 * Chapters were ordered easiest-first (Foundations -> Developing ->
 * Examination -> Advanced) and dealt across grades 7-12 as evenly as
 * possible; every chapter belongs to exactly one grade.
 *
 * To add a chapter later:
 *  1. Add its id to the right grade list below.
 *  2. Add its metadata to src/lib/stage-chapters.ts (it must exist there).
 *  3. Add its topics to CHAPTER_TOPICS in src/lib/chapters.ts.
 *  4. Drop the lesson files in content/subject/<subject>/grade-<n>/<chapter>/.
 * The site rebuild picks everything up automatically.
 */
export const GRADE_CHAPTER_IDS: Record<string, Record<number, string[]>> = {
  "biology": {
    7: ["living-things"],
    8: ["cell-biology"],
    9: ["health-disease"],
    10: ["bioenergetics"],
    11: ["biochemistry"],
    12: ["physiology"],
  },
  "chemistry": {
    7: ["mixtures"],
    8: ["atomic-structure"],
    9: ["acids-alkalis"],
    10: ["chemical-bonding"],
    11: ["quantitative-chemistry"],
    12: ["organic-chemistry"],
  },
  "computer-science": {
    7: ["computational-thinking-programming"],
    8: ["computational-thinking"],
    9: ["programming"],
    10: ["algorithms"],
    11: ["data-structures"],
    12: ["ai-ethics"],
  },
  "mathematics": {
    7: ["shapes-measures"],
    8: ["number-arithmetic"],
    9: ["algebra"],
    10: ["geometry"],
    11: ["probability"],
    12: ["mechanics"],
  },
  "physics": {
    7: ["pushes-pulls"],
    8: ["forces"],
    9: ["motion"],
    10: ["waves"],
    11: ["electricity"],
    12: ["fields"],
  },
};

/** Chapters for one grade of a subject, easiest-first. */
export function getChaptersForGrade(subjectSlug: string, grade: number, lang: Lang = "en"): Chapter[] {
  const ids = GRADE_CHAPTER_IDS[subjectSlug]?.[grade] ?? [];
  const out: Chapter[] = [];
  for (const id of ids) {
    const c = getChapterForSubject(subjectSlug, id, lang);
    if (c) out.push(c);
  }
  return out;
}

/** Every grade of a subject with its chapters. */
export function getGradesForSubject(
  subjectSlug: string,
  lang: Lang = "en",
): { grade: Grade; chapters: Chapter[] }[] {
  return GRADES.map((grade) => ({ grade, chapters: getChaptersForGrade(subjectSlug, grade, lang) }));
}

/** Which grade a chapter belongs to (each chapter lives in exactly one grade). */
export function getGradeForChapter(subjectSlug: string, chapterId: string): Grade | null {
  const grades = GRADE_CHAPTER_IDS[subjectSlug];
  if (!grades) return null;
  for (const grade of GRADES) {
    if ((grades[grade] ?? []).includes(chapterId)) return grade;
  }
  return null;
}

/** Every (subject, grade, chapter) chapter page on the site. */
export function allGradeChapters(): { subject: string; grade: Grade; chapter: string }[] {
  const combos: { subject: string; grade: Grade; chapter: string }[] = [];
  for (const subject of Object.keys(GRADE_CHAPTER_IDS).sort()) {
    for (const grade of GRADES) {
      for (const chapter of GRADE_CHAPTER_IDS[subject][grade] ?? []) {
        combos.push({ subject, grade, chapter });
      }
    }
  }
  return combos;
}
