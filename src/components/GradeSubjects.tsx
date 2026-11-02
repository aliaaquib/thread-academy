/**
 * GRADE SUBJECTS — the home page's "What grade are you in?" picker.
 * Choosing a grade replaces the general subject list with that grade's
 * subjects, each linking straight to its chapters. The choice is remembered
 * in this browser only. Without a choice (or JavaScript) the general list
 * passed as children stays visible.
 */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t, tn } from "@/lib/strings";

export interface GradeSubject {
  slug: string;
  name: string;
  glyph: string;
  href: string;
  chapters: number;
}

const GRADE_KEY = "ta-grade";

export default function GradeSubjects({
  lang,
  grades,
  children,
}: {
  lang: Lang;
  grades: { grade: number; subjects: GradeSubject[] }[];
  children: ReactNode;
}) {
  const [grade, setGrade] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(GRADE_KEY));
      if (grades.some((g) => g.grade === saved)) setGrade(saved);
    } catch {
      /* private mode */
    }
  }, [grades]);

  function choose(g: number) {
    const next = g === grade ? null : g;
    setGrade(next);
    try {
      if (next === null) localStorage.removeItem(GRADE_KEY);
      else localStorage.setItem(GRADE_KEY, String(next));
    } catch {
      /* private mode */
    }
  }

  const chosen = grades.find((g) => g.grade === grade);

  return (
    <>
      <div className="grade-pick" role="group" aria-label={t(lang, "home.grade.title")}>
        <p className="grade-pick-title">{t(lang, "home.grade.title")}</p>
        <div className="grade-pick-row">
          {grades.map((g) => (
            <button key={g.grade} type="button" aria-pressed={g.grade === grade} onClick={() => choose(g.grade)}>
              {t(lang, "subject.grade.name", { grade: g.grade })}
            </button>
          ))}
        </div>
      </div>
      {chosen ? (
        <div className="subjects-grid">
          {chosen.subjects.map((s) => (
            <Link key={s.slug} className="subject-card" href={s.href}>
              <div className="subject-icon" aria-hidden="true">
                {s.glyph}
              </div>
              <div className="subject-bottom">
                <div>
                  <h3>{s.name}</h3>
                  <div className="subject-meta">{tn(lang, "common.chapters", s.chapters, { n: s.chapters })}</div>
                </div>
                <span className="subject-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        children
      )}
    </>
  );
}
