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
      { id: "plants", title: "Plants", desc: "What plants need to grow and stay healthy." },
      { id: "animals-humans", title: "Animals and Humans", desc: "Senses, skeletons and how to stay healthy." },
    ],
    "developing": [
      { id: "cell-biology", title: "Cell Biology", desc: "The building blocks of life: cells, organelles and microscopes." },
      { id: "organisation", title: "Organisation", desc: "From cells to tissues, organs and body systems." },
      { id: "reproduction", title: "Reproduction", desc: "Life cycles in plants, animals and humans." },
      { id: "health-disease", title: "Health and Disease", desc: "Pathogens, immunity and healthy lifestyles." },
    ],
    "examination": [
      { id: "cell-biology", title: "Cell Biology", desc: "The building blocks of life: cells, organelles and microscopes." },
      { id: "organisation", title: "Organisation", desc: "From cells to tissues, organs and body systems." },
      { id: "bioenergetics", title: "Bioenergetics", desc: "Photosynthesis and respiration: how life gets its energy." },
      { id: "genetics", title: "Inheritance & Genetics", desc: "DNA, genes and how traits pass between generations." },
      { id: "ecology", title: "Ecology", desc: "Ecosystems, food webs and the human impact on the environment." },
    ],
    "advanced": [
      { id: "biochemistry", title: "Biochemistry", desc: "The molecules of life: proteins, enzymes and DNA." },
      { id: "physiology", title: "Human Physiology", desc: "Nervous and hormonal control in depth." },
      { id: "evolution", title: "Evolution", desc: "Natural selection, speciation and the evidence." },
    ],
  },
  // ── Chemistry ──
  "chemistry": {
    "foundations": [
      { id: "sorting-materials", title: "Sorting Materials", desc: "Grouping everyday materials by their properties." },
      { id: "solids-liquids", title: "Solids and Liquids", desc: "What happens when materials are heated or cooled." },
      { id: "mixtures", title: "Mixtures", desc: "Separating mixtures by filtering, sieving and evaporating." },
    ],
    "developing": [
      { id: "particles", title: "Particles", desc: "Everything is made of tiny particles that are always moving." },
      { id: "atomic-structure", title: "Atomic Structure", desc: "Atoms, elements and the particles inside them." },
      { id: "periodic-table", title: "The Periodic Table", desc: "How the elements are organised — and why the pattern matters." },
      { id: "acids-alkalis", title: "Acids and Alkalis", desc: "The pH scale, indicators and neutralisation." },
    ],
    "examination": [
      { id: "atomic-structure", title: "Atomic Structure", desc: "Atoms, elements and the particles inside them." },
      { id: "periodic-table", title: "The Periodic Table", desc: "How the elements are organised — and why the pattern matters." },
      { id: "chemical-bonding", title: "Chemical Bonding", desc: "Ionic, covalent and metallic bonds: how atoms hold together." },
      { id: "chemical-changes", title: "Chemical Changes", desc: "Reactions, acids and bases, and the energy changes involved." },
      { id: "quantitative-chemistry", title: "Quantitative Chemistry", desc: "Moles, masses and doing the maths of reactions." },
    ],
    "advanced": [
      { id: "physical-chemistry", title: "Physical Chemistry", desc: "Energetics, reaction rates and equilibria." },
      { id: "organic-chemistry", title: "Organic Chemistry", desc: "Carbon compounds, mechanisms and synthesis." },
      { id: "analytical-chemistry", title: "Analytical Techniques", desc: "Spectroscopy and chemical tests for substances." },
    ],
  },
  // ── Computer Science ──
  "computer-science": {
    "foundations": [
      { id: "computational-thinking-programming", title: "Computational Thinking and Programming", desc: "Plan with flowcharts, then bring your ideas to life in Python." },
      { id: "managing-data", title: "Managing Data", desc: "Spreadsheets, databases and collecting data properly." },
      { id: "networks-and-digital-communication", title: "Networks and Digital Communication", desc: "How devices connect and data travels the world." },
      { id: "computer-systems", title: "Computer Systems", desc: "What is inside a computer, and how it thinks in binary." },
      { id: "creating-media", title: "Creating Digital Media", desc: "Make simple presentations, images and animations." },
          { id: "networks-and-the-effects-of-using-them", title: "Networks and the Effects of Using Them", desc: "test" },
],
    "developing": [
      { id: "computational-thinking", title: "Computational Thinking", desc: "The problem-solving mindset behind every program." },
      { id: "programming", title: "Programming Fundamentals", desc: "Python from zero: variables, data, logic, loops and functions." },
      { id: "data-representation", title: "Data Representation", desc: "Binary, text, images and sound: how computers store everything." },
      { id: "networks", title: "Networks", desc: "How computers connect and share information." },
    ],
    "examination": [
      { id: "computational-thinking", title: "Computational Thinking", desc: "The problem-solving mindset behind every program." },
      { id: "programming", title: "Programming Fundamentals", desc: "Python from zero: variables, data, logic, loops and functions." },
      { id: "algorithms", title: "Algorithms", desc: "Designing step-by-step solutions: searching, sorting and efficiency." },
      { id: "data-representation", title: "Data Representation", desc: "Binary, text, images and sound: how computers store everything." },
    ],
    "advanced": [
      { id: "data-structures", title: "Data Structures", desc: "Stacks, queues, trees and graphs." },
      { id: "databases-sql", title: "Databases and SQL", desc: "Design tables and query them with SQL." },
      { id: "ai-ethics", title: "AI and Ethics", desc: "How machine learning works and using it responsibly." },
    ],
  },
  // ── Mathematics ──
  "mathematics": {
    "foundations": [
      { id: "counting", title: "Counting", desc: "Count, order and compare whole numbers with confidence." },
      { id: "addition-subtraction", title: "Addition and Subtraction", desc: "Add and subtract using objects, pictures and number lines." },
      { id: "shapes-measures", title: "Shapes and Measures", desc: "Recognise common shapes and compare length, weight and capacity." },
      { id: "fractions-first", title: "First Fractions", desc: "Halves and quarters of shapes and small quantities." },
    ],
    "developing": [
      { id: "number-arithmetic", title: "Number & Arithmetic", desc: "Number systems, fractions, decimals, percentages and the rules of arithmetic." },
      { id: "algebra", title: "Algebra", desc: "Letters that stand for numbers — expressions, equations and functions." },
      { id: "ratio-proportion", title: "Ratio and Proportion", desc: "Ratios, scale factors and proportional reasoning." },
      { id: "geometry", title: "Geometry", desc: "Angles, shapes, area, perimeter and the logic of space." },
      { id: "statistics", title: "Statistics", desc: "Data done properly: averages, charts and what they really mean." },
    ],
    "examination": [
      { id: "number-arithmetic", title: "Number & Arithmetic", desc: "Number systems, fractions, decimals, percentages and the rules of arithmetic." },
      { id: "algebra", title: "Algebra", desc: "Letters that stand for numbers — expressions, equations and functions." },
      { id: "geometry", title: "Geometry", desc: "Angles, shapes, area, perimeter and the logic of space." },
      { id: "statistics", title: "Statistics", desc: "Data done properly: averages, charts and what they really mean." },
      { id: "probability", title: "Probability", desc: "Chance, likelihood and the mathematics of uncertainty." },
    ],
    "advanced": [
      { id: "pure-mathematics", title: "Pure Mathematics", desc: "Functions, sequences and an introduction to calculus." },
      { id: "mechanics", title: "Mechanics", desc: "Kinematics, forces and Newton's laws applied to motion." },
      { id: "further-statistics", title: "Further Statistics", desc: "Distributions, hypothesis testing and regression." },
    ],
  },
  // ── Physics ──
  "physics": {
    "foundations": [
      { id: "pushes-pulls", title: "Pushes and Pulls", desc: "How pushes and pulls can change how things move." },
      { id: "everyday-materials", title: "Everyday Materials", desc: "Sorting materials by what they feel and look like." },
      { id: "light-shadows", title: "Light and Shadows", desc: "Light sources and how shadows are formed." },
    ],
    "developing": [
      { id: "forces", title: "Forces", desc: "Pushes, pulls and Newton's three laws of motion." },
      { id: "motion", title: "Motion", desc: "Speed, velocity, acceleration and describing movement with graphs." },
      { id: "energy", title: "Energy", desc: "Kinetic, potential and the conservation of energy." },
      { id: "sound", title: "Sound", desc: "How vibrations make sounds that travel to our ears." },
    ],
    "examination": [
      { id: "forces", title: "Forces", desc: "Pushes, pulls and Newton's three laws of motion." },
      { id: "motion", title: "Motion", desc: "Speed, velocity, acceleration and describing movement with graphs." },
      { id: "energy", title: "Energy", desc: "Kinetic, potential and the conservation of energy." },
      { id: "waves", title: "Waves", desc: "Wave properties, sound and the electromagnetic spectrum." },
      { id: "electricity", title: "Electricity", desc: "Current, voltage, resistance and simple circuits." },
    ],
    "advanced": [
      { id: "further-mechanics", title: "Further Mechanics", desc: "Circular motion, oscillations and momentum in depth." },
      { id: "fields", title: "Fields", desc: "Gravitational, electric and magnetic fields." },
      { id: "particle-physics", title: "Particle Physics", desc: "The standard model and ideas from quantum physics." },
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
