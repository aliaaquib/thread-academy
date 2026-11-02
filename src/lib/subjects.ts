/**
 * THE SUBJECT LIST — every subject on the site lives here.
 *
 * To add a subject: copy one block, change slug / name / icon / category /
 * tagline / intro / learn, then also add its chapters to stage-chapters.ts
 * and its grade mapping to grades.ts.
 * To remove a subject: delete its whole block here, plus its blocks in
 * stage-chapters.ts and grades.ts, plus its folder under content/subject/.
 */
import type { Subject, SubjectCategory } from "./types";
import type { Lang } from "./i18n";
import { getOverlay } from "./i18n";

/**
 * Subjects, grouped by category. Chapters are subject-level outlines;
 * the actual lessons (topics) live per chapter under content/.
 */
export const SUBJECTS: Record<string, Subject> = {
  mathematics: {
    slug: "mathematics",
    name: "Mathematics",
    icon: "📐",
    category: "STEM",
    tagline: "The language of patterns — from algebra to geometry.",
    intro:
      "Mathematics trains you to reason precisely. Start with number and arithmetic, master algebra — the art of working with unknowns — then explore geometry, statistics and probability, where patterns and chance follow strict, beautiful rules.",
    learn: [
      "Number systems and arithmetic fluency",
      "Algebraic expressions, equations and functions",
      "Angles, shapes and geometric reasoning",
      "Statistics: collecting, presenting and interpreting data",
      "Probability: measuring uncertainty",
    ],
    chapters: [
      { id: "number-arithmetic", title: "Number & Arithmetic", desc: "Number systems, fractions, decimals, percentages and the rules of arithmetic." },
      { id: "algebra", title: "Algebra", desc: "Letters that stand for numbers — expressions, equations and functions." },
      { id: "geometry", title: "Geometry", desc: "Angles, shapes, area, perimeter and the logic of space." },
      { id: "statistics", title: "Statistics", desc: "Data done properly: averages, charts and what they really mean." },
      { id: "probability", title: "Probability", desc: "Chance, likelihood and the mathematics of uncertainty." },
    ],
  },
  physics: {
    slug: "physics",
    name: "Physics",
    icon: "⚛️",
    category: "STEM",
    tagline: "The rules the universe plays by.",
    intro:
      "Physics is the study of matter, energy and how they interact. From the forces that move a football to the waves that carry light, you'll learn to describe the physical world with precision — and to predict what happens next.",
    learn: [
      "Forces, motion and Newton's laws",
      "Energy transfers and conservation",
      "Waves, light and sound",
      "Electricity and circuits",
      "Solving problems with equations and graphs",
    ],
    chapters: [
      { id: "forces", title: "Forces", desc: "Pushes, pulls and Newton's three laws of motion." },
      { id: "motion", title: "Motion", desc: "Speed, velocity, acceleration and describing movement with graphs." },
      { id: "energy", title: "Energy", desc: "Kinetic, potential and the conservation of energy." },
      { id: "waves", title: "Waves", desc: "Wave properties, sound and the electromagnetic spectrum." },
      { id: "electricity", title: "Electricity", desc: "Current, voltage, resistance and simple circuits." },
    ],
  },
  chemistry: {
    slug: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    category: "STEM",
    tagline: "What stuff is made of — and why it reacts.",
    intro:
      "Chemistry explains the material world: the atoms everything is built from, how they bond into molecules, and why substances transform in reactions. You'll move from particles you can't see to predictions you can test.",
    learn: [
      "Atomic structure and the periodic table",
      "Chemical bonding and structure",
      "Representing and balancing reactions",
      "Acids, bases and rates of reaction",
      "Quantitative chemistry: moles and calculations",
    ],
    chapters: [
      { id: "atomic-structure", title: "Atomic Structure", desc: "Atoms, elements and the particles inside them." },
      { id: "periodic-table", title: "The Periodic Table", desc: "How the elements are organised — and why the pattern matters." },
      { id: "chemical-bonding", title: "Chemical Bonding", desc: "Ionic, covalent and metallic bonds: how atoms hold together." },
      { id: "chemical-changes", title: "Chemical Changes", desc: "Reactions, acids and bases, and the energy changes involved." },
      { id: "quantitative-chemistry", title: "Quantitative Chemistry", desc: "Moles, masses and doing the maths of reactions." },
    ],
  },
  biology: {
    slug: "biology",
    name: "Biology",
    icon: "🧬",
    category: "STEM",
    tagline: "The science of living things.",
    intro:
      "Biology is the study of life — from the microscopic machinery inside a single cell to entire ecosystems. You'll learn how living things are built, how they work, and how they interact with each other and their environment.",
    learn: [
      "Cell structure and organisation",
      "How the human body systems work",
      "Photosynthesis and respiration",
      "Inheritance, variation and evolution",
      "Ecology: organisms and their environment",
    ],
    chapters: [
      { id: "cell-biology", title: "Cell Biology", desc: "The building blocks of life: cells, organelles and microscopes." },
      { id: "organisation", title: "Organisation", desc: "From cells to tissues, organs and body systems." },
      { id: "bioenergetics", title: "Bioenergetics", desc: "Photosynthesis and respiration: how life gets its energy." },
      { id: "genetics", title: "Inheritance & Genetics", desc: "DNA, genes and how traits pass between generations." },
      { id: "ecology", title: "Ecology", desc: "Ecosystems, food webs and the human impact on the environment." },
    ],
  },
  "computer-science": {
    slug: "computer-science",
    name: "Computer Science",
    icon: "💻",
    category: "STEM",
    tagline: "How computers think — and how to make them do what you want.",
    intro:
      "Computer Science is about solving problems precisely. You'll learn how to break problems down, write programs in Python, and understand the ideas — from variables to functions — that every piece of software is built on.",
    learn: [
      "Computational thinking and decomposition",
      "Python programming from first principles",
      "Variables, data types and operators",
      "Conditions, loops and functions",
      "Algorithms and how data is represented",
    ],
    chapters: [
      { id: "computational-thinking", title: "Computational Thinking", desc: "The problem-solving mindset behind every program." },
      { id: "programming", title: "Programming Fundamentals", desc: "Python from zero: variables, data, logic, loops and functions." },
      { id: "algorithms", title: "Algorithms", desc: "Designing step-by-step solutions: searching, sorting and efficiency." },
      { id: "data-representation", title: "Data Representation", desc: "Binary, text, images and sound: how computers store everything." },
    ],
  },
};

export const SUBJECT_SLUGS = Object.keys(SUBJECTS);

export const CATEGORY_ORDER: SubjectCategory[] = ["STEM"];

export function subjectsByCategory(category: SubjectCategory, lang: Lang = "en"): Subject[] {
  return SUBJECT_SLUGS.map((s) => getSubject(s, lang)).filter(
    (s): s is Subject => !!s && s.category === category,
  );
}

export function getSubject(slug: string, lang: Lang = "en"): Subject | null {
  const base = SUBJECTS[slug];
  if (!base) return null;
  if (lang === "en") return base;
  // Teacher-written translations overlay the English text; anything missing
  // falls back to English rather than inventing content.
  const overlay = getOverlay(lang);
  const o = overlay?.subjects[slug];
  const chapterOverlays = overlay?.chapters;
  const chapters = chapterOverlays
    ? base.chapters.map((c) => {
        const co = chapterOverlays[c.id];
        return co ? { ...c, title: co.title ?? c.title, desc: co.desc ?? c.desc } : c;
      })
    : base.chapters;
  return {
    ...base,
    name: o?.name ?? base.name,
    tagline: o?.tagline ?? base.tagline,
    intro: o?.intro ?? base.intro,
    learn: o?.learn ?? base.learn,
    chapters,
  };
}

export function getChapter(subjectSlug: string, chapterId: string) {
  const subject = getSubject(subjectSlug);
  if (!subject) return null;
  return subject.chapters.find((c) => c.id === chapterId) ?? null;
}
