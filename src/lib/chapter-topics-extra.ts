/**
 * Extra topic ideas per chapter, grouped by subject.
 * getChapterTopics() (in chapters.ts) uses these to top every chapter up
 * to four lessons. Key = chapter id. Slugs here never repeat a hand-written
 * slug from chapters.ts.
 */

import type { Topic } from "./types";

export const EXTRA_TOPICS: Record<string, Topic[]> = {
  // ── Mathematics ──
  "shapes-measures": [
    { slug: "solid-shapes", title: "Solid Shapes", desc: "Meet cubes, cuboids, spheres, cylinders and cones you can hold." },
  ],
  "number-arithmetic": [
    { slug: "order-of-operations", title: "Order of Operations", desc: "Apply BIDMAS to multi-step calculations." },
  ],
  geometry: [
    { slug: "angles-and-angle-facts", title: "Angles and angle facts", desc: "Names of angles, angles on a line and around a point, and angles formed by parallel lines." },
  ],
  probability: [
    { slug: "probability-scale-and-basics", title: "Probability scale and basics", desc: "The 0 to 1 scale, equally likely outcomes, and writing probabilities as fractions, decimals or percentages." },
  ],
  mechanics: [
    { slug: "kinematics-in-a-straight-line", title: "Kinematics in a straight line", desc: "Displacement, velocity and acceleration, with the constant-acceleration SUVAT equations." },
  ],
  // ── Physics ──
  "pushes-pulls": [
    { slug: "friction-friend-or-foe", title: "Friction: Friend or Foe?", desc: "Discovering how friction slows moving things down and when that is useful." },
  ],
  motion: [
    { slug: "speed-and-velocity", title: "Speed and Velocity", desc: "Calculating speed from distance and time, and seeing how velocity adds direction." },
  ],
  waves: [
    { slug: "wave-speed-equation", title: "The Wave Speed Equation", desc: "Using v = f × λ to link speed, frequency and wavelength." },
  ],
  electricity: [
    { slug: "voltage-and-resistance", title: "Voltage and Resistance", desc: "Using V = I × R and reading simple circuit measurements." },
  ],
  fields: [
    { slug: "gravitational-fields", title: "Gravitational Fields", desc: "Mapping g fields with F = GmM/r² and linking field strength to potential." },
  ],
  // ── Chemistry ──
  mixtures: [
    { slug: "what-is-a-mixture", title: "What Is a Mixture", desc: "Learn how mixtures are made of two or more materials mixed together." },
  ],
  "acids-alkalis": [
    { slug: "ph-scale", title: "The pH Scale", desc: "Use the 1–14 scale to measure how acidic or alkaline a solution is." },
  ],
  "chemical-bonding": [
    { slug: "ionic-bonding", title: "Ionic Bonding", desc: "Learn how metals and non-metals bond by transferring electrons." },
  ],
  "quantitative-chemistry": [
    { slug: "the-mole", title: "The Mole", desc: "Count particles using the mole and Avogadro's constant." },
  ],
  "organic-chemistry": [
    { slug: "alkanes", title: "Meeting the Alkanes", desc: "Study saturated hydrocarbons, fractional distillation and combustion." },
  ],
  // ── Biology ──
  "living-things": [
    { slug: "simple-food-chains", title: "Simple Food Chains", desc: "Follow food chains from producer to consumer and see why plants start them all." },
  ],
  "health-disease": [
    { slug: "pathogens", title: "Meet the Pathogens", desc: "Meet bacteria, viruses, fungi and protists and find out how they make us ill." },
  ],
  bioenergetics: [
    { slug: "photosynthesis", title: "How Photosynthesis Works", desc: "Master the word and symbol equations and how leaves are adapted for the job." },
  ],
  biochemistry: [
    { slug: "enzymes", title: "Enzymes in Depth", desc: "Explain specificity, the induced-fit model, and the effects of pH and temperature." },
  ],
  physiology: [
    { slug: "homeostasis", title: "Homeostasis: Blood Glucose", desc: "Explain the negative-feedback control of blood glucose by insulin and glucagon." },
  ],
  // ── Computer Science ──
  "computational-thinking": [
    { slug: "decomposition", title: "Breaking Problems Down", desc: "Split large problems into smaller, solvable pieces." },
  ],
  algorithms: [
    { slug: "linear-search", title: "Linear Search", desc: "Find items by checking each one in turn." },
  ],
  "data-structures": [
    { slug: "stacks", title: "Using Stacks", desc: "Store data last-in, first-out, like a pile of plates." },
  ],
  "ai-ethics": [
    { slug: "how-machine-learning-works", title: "How Machine Learning Works", desc: "See how models learn patterns from data instead of following coded rules." },
  ],
};
