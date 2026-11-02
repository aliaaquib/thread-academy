/**
 * HOME PAGE — the page at / (the very first page visitors see).
 * Shows the hero, quick lesson links, and subject cards grouped by category
 * (STEM / Humanities / Languages). Content comes from src/lib/subjects.ts —
 * to change which subjects appear, edit that file, not this one.
 * Rendered once per language at /, /tr, /ru and /ky.
 */
import type { Metadata } from "next";
import Link from "next/link";
import HeroSearch, { type QuickLink } from "@/components/HeroSearch";
import { CATEGORY_ORDER, SUBJECT_SLUGS, getSubject, subjectsByCategory } from "@/lib/subjects";
import { getChaptersForSubject } from "@/lib/stage-chapters";
import { getTopicContent, type TopicParams } from "@/lib/content";
import { GRADES, getChaptersForGrade } from "@/lib/grades";
import {
  chapterPathForGrade,
  curriculumPath,
  gradePath,
  levelIdForGrade,
  levelSubjectsPath,
  subjectLandingPath,
} from "@/lib/curricula";
import GradeSubjects from "@/components/GradeSubjects";
import HowItWorksDeck from "@/components/HowItWorksDeck";
import SectionTag from "@/components/SectionTag";
import FromTheLibrary from "@/components/FromTheLibrary";
import StatsNumbers, { type StatsData } from "@/components/StatsNumbers";
import { getChapterTopics } from "@/lib/chapters";
import { JsonLd, organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";
import { langMeta, withLang, type Lang } from "@/lib/i18n";
import { t, tn } from "@/lib/strings";
import { requireLang, type LangParam } from "@/lib/route-lang";

/** The title Google shows for the home page, in the page language. */
export async function generateMetadata(props: { params: Promise<LangParam> }): Promise<Metadata> {
  const params = await props.params;
  const lang = requireLang(params);
  const base = pageMetadata({
    title: t(lang, "home.meta.title"),
    description: t(lang, "home.meta.desc"),
    path: "/",
    lang,
  });
  // `absolute` is used because the root layout's title template does not apply
  // to the root segment's own title — without it the brand suffix would be missing.
  const full = `${t(lang, "home.meta.title")} — Thread Academy`;
  return {
    ...base,
    title: { absolute: full },
    openGraph: { ...base.openGraph, title: full },
    twitter: { ...base.twitter, title: full },
  };
}

/** Reference glyphs per subject slug (approved design; not emoji). */
const GLYPHS: Record<string, string> = {
  mathematics: "x²",
  physics: "F→",
  chemistry: "H₂",
  biology: "DNA",
  "computer-science": "</>",
};

/** Featured lessons for the hero quick links (only shown where they exist). */
const QUICK: (TopicParams & { grade: number })[] = [
  { subject: "mathematics", grade: 9, chapter: "algebra", topic: "linear-equations" },
  { subject: "biology", grade: 8, chapter: "cell-biology", topic: "cell-structure" },
  { subject: "physics", grade: 8, chapter: "forces", topic: "newtons-laws" },
  { subject: "computer-science", grade: 9, chapter: "programming", topic: "variables" },
];

function quickLinks(lang: Lang): QuickLink[] {
  const links: QuickLink[] = [];
  for (const q of QUICK) {
    const content = getTopicContent(q, lang);
    if (!content) continue;
    const href = chapterPathForGrade(q.subject, q.grade, q.chapter, q.topic);
    if (!href) continue;
    links.push({ label: content.title, href });
  }
  return links;
}

/** The page itself — what the visitor sees. */
export default async function HomePage(props: { params: Promise<LangParam> }) {
  const params = await props.params;
  const lang = requireLang(params);

  // ---- From the Library: real counts + real lessons, computed from the
  // content library (nothing here is invented social proof).
  const libChapters = SUBJECT_SLUGS.map((slug) => getChaptersForSubject(slug, lang));
  const totalChapters = libChapters.reduce((s, c) => s + c.length, 0);
  let totalLessons = 0;
  for (const slug of SUBJECT_SLUGS) {
    for (const ch of getChaptersForSubject(slug, "en")) {
      totalLessons += getChapterTopics(slug, ch.id, "en").length;
    }
  }
  const statsData: StatsData = {
    lessons: totalLessons,
    chapters: totalChapters,
    languages: 4,
    subjects: SUBJECT_SLUGS.length,
    learnHref: withLang(curriculumPath("cambridge"), lang),
  };



  // The first grade with lessons sets the level, so homepage subject links
  // never land on the empty Primary level.
  const firstLevel = levelIdForGrade("cambridge", GRADES[0]) ?? "lower-secondary";


  // Each grade's subjects for the picker, linking straight to that grade's chapters.
  const gradeSubjects = GRADES.map((grade) => ({
    grade,
    subjects: SUBJECT_SLUGS.flatMap((slug) => {
      const chapters = getChaptersForGrade(slug, grade, lang).length;
      const level = levelIdForGrade("cambridge", grade);
      const subject = getSubject(slug, lang);
      if (!chapters || !level || !subject) return [];
      return [
        {
          slug,
          name: subject.name,
          glyph: GLYPHS[slug] ?? slug.slice(0, 2).toUpperCase(),
          href: withLang(gradePath("cambridge", level, slug, grade), lang),
          chapters,
        },
      ];
    }),
  }));

  return (
    <>
      {/* Machine-readable site data for Google. Invisible to visitors. */}
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      <header className="home-hero">
        <div className="hero-grid">
          <div>
            <h1>
              {t(lang, "home.hero.a")} <span className="underline">{t(lang, "home.hero.b")}</span>
            </h1>
            <p className="hero-copy">{t(lang, "home.hero.copy")}</p>
          </div>
        </div>
        <HeroSearch lang={lang} links={quickLinks(lang)} />
      </header>


      <section className="section" id="subjects">
        <div className="section-head">
          <div>
            <SectionTag label={t(lang, "home.stag.subjects")} />
            <h2>{t(lang, "home.subjects.title")}</h2>
          </div>
          <p>{t(lang, "home.subjects.lede")}</p>
        </div>
        <GradeSubjects lang={lang} grades={gradeSubjects}>
        {CATEGORY_ORDER.map((category) => (
          <div key={category}>
            <div className="eyebrow" style={{ margin: "42px 0 16px" }}>
              {t(lang, `subject.category.${category.toLowerCase()}`)}
            </div>
            <div className="subjects-grid">
              {subjectsByCategory(category, lang).map((subject) => {
                const n = getChaptersForSubject(subject.slug, lang).length;
                const href = subjectLandingPath(subject.slug);
                if (!href) return null;
                return (
                  <Link
                    key={subject.slug}
                    className="subject-card"
                    href={withLang(href, lang)}
                  >
                    <div className="subject-icon" aria-hidden="true">
                      {GLYPHS[subject.slug] ?? subject.slug.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="subject-bottom">
                      <div>
                        <h3>{subject.name}</h3>
                        <div className="subject-meta">
                          {tn(lang, "common.chapters", n, { n })}
                        </div>
                      </div>
                      <span className="subject-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <p style={{ marginTop: 18 }}>
              <Link className="inline-link" href={withLang(`${levelSubjectsPath("cambridge", firstLevel)}/${category.toLowerCase()}`, lang)}>
                {t(lang, "home.browse.category", { category: t(lang, `subject.category.${category.toLowerCase()}`) })}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        ))}
        <p style={{ marginTop: 36 }}>
          <Link className="inline-link" href={withLang(curriculumPath("cambridge"), lang)}>
            {t(lang, "home.browse.all")} <span aria-hidden="true">→</span>
          </Link>
        </p>
        </GradeSubjects>
      </section>


      <HowItWorksDeck lang={lang} />

      <StatsNumbers lang={lang} data={statsData} />

      <FromTheLibrary lang={lang} />
    </>
  );
}
