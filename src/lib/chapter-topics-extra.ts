/**
 * Extra topic ideas per chapter, grouped by subject.
 * getChapterTopics() (in chapters.ts) uses these to top every chapter up
 * to four lessons. Key = chapter id. Slugs here never repeat a hand-written
 * slug from chapters.ts.
 */

import type { Topic } from "./types";

export const EXTRA_TOPICS: Record<string, Topic[]> = {
  // ── Mathematics ──
  counting: [
    { slug: "counting-to-10", title: "Counting to 10", desc: "Count reliably from 0 to 10 using objects and number songs." },
    { slug: "counting-to-100", title: "Counting to 100", desc: "Count on and back in ones and tens up to 100." },
    { slug: "ordering-numbers", title: "Ordering Numbers", desc: "Place numbers in order from smallest to largest and back." },
    { slug: "comparing-numbers", title: "Comparing Numbers", desc: "Use more than and fewer than to compare two groups." },
  ],
  "addition-subtraction": [
    { slug: "adding-two-numbers", title: "Adding Two Numbers", desc: "Combine two groups and count them all to find the total." },
    { slug: "number-bonds-10", title: "Number Bonds to 10", desc: "Learn the pairs of numbers that add to make 10." },
    { slug: "subtracting-objects", title: "Subtracting Objects", desc: "Take some away and count what is left to find the difference." },
    { slug: "number-line-steps", title: "Number Line Steps", desc: "Jump forwards and backwards along a number line to add and subtract." },
  ],
  "shapes-measures": [
    { slug: "flat-shapes", title: "Flat Shapes", desc: "Name and describe circles, triangles, rectangles and squares." },
    { slug: "solid-shapes", title: "Solid Shapes", desc: "Meet cubes, cuboids, spheres, cylinders and cones you can hold." },
    { slug: "measuring-length", title: "Measuring Length", desc: "Compare and measure length using rulers and centimetres." },
    { slug: "weight-and-capacity", title: "Weight and Capacity", desc: "Compare how heavy things are and how much containers hold." },
  ],
  "fractions-first": [
    { slug: "halves-of-shapes", title: "Halves of Shapes", desc: "Split shapes into two equal parts and shade one half." },
    { slug: "halves-of-numbers", title: "Halves of Numbers", desc: "Find half of small even numbers by sharing equally." },
    { slug: "quarters-of-shapes", title: "Quarters of Shapes", desc: "Split shapes and groups into four equal parts." },
    { slug: "comparing-fractions", title: "Comparing Fractions", desc: "Decide which is bigger: a half or a quarter?" },
  ],
  "number-arithmetic": [
    { slug: "place-value", title: "Place Value", desc: "Read, write and compare large numbers using place value." },
    { slug: "fractions-decimals-percentages", title: "Fractions, Decimals and Percentages", desc: "Convert fluently between fractions, decimals and percentages." },
    { slug: "order-of-operations", title: "Order of Operations", desc: "Apply BIDMAS to multi-step calculations." },
    { slug: "negative-numbers", title: "Negative Numbers", desc: "Add, subtract and order integers below zero." },
  ],
  "ratio-proportion": [
    { slug: "simplifying-ratios", title: "Simplifying Ratios", desc: "Reduce ratios to their simplest form like fractions." },
    { slug: "sharing-in-a-ratio", title: "Sharing in a Ratio", desc: "Split amounts fairly according to a given ratio." },
    { slug: "direct-proportion", title: "Direct Proportion", desc: "Solve problems where two quantities grow together." },
    { slug: "scale-and-maps", title: "Scale and Maps", desc: "Use scale factors to find real distances from maps and plans." },
  ],
  geometry: [
    { slug: "angles-and-angle-facts", title: "Angles and angle facts", desc: "Names of angles, angles on a line and around a point, and angles formed by parallel lines." },
    { slug: "triangles-and-quadrilaterals", title: "Triangles and quadrilaterals", desc: "Properties of 2D shapes, angle sums in triangles and quadrilaterals, and symmetry." },
    { slug: "perimeter-and-area", title: "Perimeter and area", desc: "Perimeter and area of rectangles, triangles, trapezia and compound shapes." },
    { slug: "circles-and-pi", title: "Circles and pi", desc: "Circumference and area of circles, with pi as the link between diameter and circumference." },
  ],
  statistics: [
    { slug: "averages-and-range", title: "Averages and range", desc: "Mean, median, mode and range, and which average suits which situation." },
    { slug: "charts-and-graphs", title: "Charts and graphs", desc: "Bar charts, pie charts, frequency diagrams and pictograms, drawn and read accurately." },
    { slug: "scatter-diagrams", title: "Scatter diagrams", desc: "Plotting paired data, spotting correlation, and drawing a line of best fit." },
    { slug: "interpreting-data", title: "Interpreting data honestly", desc: "Reading claims critically and spotting misleading scales and cherry-picked averages." },
  ],
  probability: [
    { slug: "probability-scale-and-basics", title: "Probability scale and basics", desc: "The 0 to 1 scale, equally likely outcomes, and writing probabilities as fractions, decimals or percentages." },
    { slug: "combined-outcomes", title: "Combined outcomes", desc: "Sample space diagrams and listing all outcomes for two-step experiments." },
    { slug: "independent-and-mutually-exclusive", title: "Independent and mutually exclusive events", desc: "Multiplying probabilities for independent events and adding for mutually exclusive ones." },
    { slug: "tree-diagrams-and-conditional", title: "Tree diagrams and conditional probability", desc: "Building tree diagrams for events with and without replacement, and finding conditional probabilities." },
  ],
  "pure-mathematics": [
    { slug: "functions-and-graphs", title: "Functions and graphs", desc: "Domain, range, composite and inverse functions, and transforming graphs of functions." },
    { slug: "sequences-and-series", title: "Sequences and series", desc: "Arithmetic and geometric progressions, nth terms, and sums of series." },
    { slug: "introducing-differentiation", title: "Introducing Differentiation", desc: "Gradients from first principles ideas, the power rule, and stationary points." },
    { slug: "introducing-integration", title: "Introducing Integration", desc: "Antidifferentiation, definite integrals, and areas under curves." },
  ],
  mechanics: [
    { slug: "kinematics-in-a-straight-line", title: "Kinematics in a straight line", desc: "Displacement, velocity and acceleration, with the constant-acceleration SUVAT equations." },
    { slug: "newtons-laws-of-motion", title: "Newton's laws of motion", desc: "Inertia, F = ma, and action–reaction pairs applied to real situations." },
    { slug: "friction-and-connected-particles", title: "Friction and connected particles", desc: "Modelling friction with F ≤ μR and solving systems of connected particles." },
    { slug: "projectile-motion", title: "Projectile motion", desc: "Resolving motion into independent horizontal and vertical components under gravity." },
  ],
  "further-statistics": [
    { slug: "binomial-distribution", title: "The binomial distribution", desc: "Modelling fixed numbers of independent trials with two outcomes, and computing probabilities." },
    { slug: "normal-distribution", title: "The normal distribution", desc: "The bell curve, standardisation with z-scores, and finding probabilities from tables or technology." },
    { slug: "hypothesis-testing", title: "Hypothesis testing", desc: "Null and alternative hypotheses, significance levels, and deciding whether to reject H₀." },
    { slug: "correlation-and-regression", title: "Correlation and regression", desc: "Measuring linear association and fitting regression lines for prediction." },
  ],
  // ── Physics ──
  "pushes-pulls": [
    { slug: "what-is-a-push-or-pull", title: "What Is a Push or Pull", desc: "Learning that a force is simply a push or a pull, and spotting both in everyday life." },
    { slug: "starting-and-stopping", title: "Starting and Stopping", desc: "Seeing how pushes and pulls can start things moving or bring them to a stop." },
    { slug: "changing-shape", title: "Changing Shape", desc: "Exploring how pushes and pulls can squash, stretch, bend and twist objects." },
    { slug: "friction-friend-or-foe", title: "Friction: Friend or Foe?", desc: "Discovering how friction slows moving things down and when that is useful." },
  ],
  "everyday-materials": [
    { slug: "hard-and-soft", title: "Hard and Soft", desc: "Feeling and comparing materials by how hard or soft they are." },
    { slug: "waterproof-or-not", title: "Waterproof or Not?", desc: "Testing which materials let water through and which keep it out." },
    { slug: "let-the-light-through", title: "Let the Light Through", desc: "Sorting materials into transparent, translucent and opaque." },
    { slug: "right-material-for-the-job", title: "Right Material for the Job", desc: "Choosing materials for everyday objects based on their properties." },
  ],
  "light-shadows": [
    { slug: "sources-of-light", title: "Sources of Light", desc: "Naming natural and artificial light sources, from the Sun to light bulbs." },
    { slug: "light-travels-straight", title: "Light Travels Straight", desc: "Learning that light travels in straight lines and cannot bend around corners." },
    { slug: "how-shadows-form", title: "How Shadows Form", desc: "Seeing how an opaque object blocks light to make a shadow." },
    { slug: "changing-shadows", title: "Changing Shadows", desc: "Investigating how moving a light or object makes shadows grow, shrink and move." },
  ],
  forces: [
    { slug: "types-of-forces", title: "Types of Forces", desc: "Meeting contact forces like friction and non-contact forces like gravity and magnetism." },
    { slug: "balanced-and-unbalanced", title: "Balanced and Unbalanced", desc: "Using force diagrams to see when forces cancel out or cause acceleration." },
    { slug: "friction-and-drag", title: "Friction and Drag", desc: "Exploring how surfaces and air resistance oppose motion — and when that helps." },
  ],
  motion: [
    { slug: "speed-and-velocity", title: "Speed and Velocity", desc: "Calculating speed from distance and time, and seeing how velocity adds direction." },
    { slug: "distance-time-graphs", title: "Distance–Time Graphs", desc: "Reading journeys from graphs and finding speed from the gradient." },
    { slug: "acceleration", title: "What Is Acceleration", desc: "Working out how quickly velocity changes using a = (v − u) ÷ t." },
    { slug: "velocity-time-graphs", title: "Velocity–Time Graphs", desc: "Finding acceleration from the gradient and distance from the area under the graph." },
  ],
  energy: [
    { slug: "kinetic-energy", title: "Kinetic Energy", desc: "Calculating the energy of moving objects with E = ½mv²." },
    { slug: "potential-energy", title: "Potential Energy", desc: "Working with gravitational potential energy, E = mgh, and stored elastic energy." },
    { slug: "energy-transfers", title: "Energy Transfers", desc: "Tracing energy as it moves between stores, from batteries to bouncing balls." },
    { slug: "conservation-and-efficiency", title: "Conservation and Efficiency", desc: "Using the conservation of energy and calculating the efficiency of devices." },
  ],
  sound: [
    { slug: "how-sounds-are-made", title: "How Sounds Are Made", desc: "Linking every sound you hear to a vibrating object." },
    { slug: "sound-needs-a-medium", title: "Sound Needs a Medium", desc: "Learning that sound travels through solids, liquids and gases — but not through space." },
    { slug: "pitch-and-loudness", title: "Pitch and Loudness", desc: "Relating pitch to frequency and loudness to amplitude." },
    { slug: "echoes-and-hearing", title: "Echoes and Hearing", desc: "Using echoes to find distances and seeing how the ear detects sound." },
  ],
  waves: [
    { slug: "transverse-and-longitudinal", title: "Transverse and Longitudinal", desc: "Comparing the two wave types and the direction of their vibrations." },
    { slug: "wave-speed-equation", title: "The Wave Speed Equation", desc: "Using v = f × λ to link speed, frequency and wavelength." },
    { slug: "reflection-and-refraction", title: "Reflection and Refraction", desc: "Explaining how waves bounce off surfaces and bend at boundaries." },
    { slug: "electromagnetic-spectrum", title: "The Electromagnetic Spectrum", desc: "Ordering the spectrum from radio waves to gamma rays and meeting their uses." },
  ],
  electricity: [
    { slug: "current-and-charge", title: "Current and Charge", desc: "Linking current to the flow of charge with Q = I × t." },
    { slug: "voltage-and-resistance", title: "Voltage and Resistance", desc: "Using V = I × R and reading simple circuit measurements." },
    { slug: "series-and-parallel", title: "Series and Parallel", desc: "Comparing current, voltage and resistance in the two circuit types." },
    { slug: "electrical-power", title: "Electrical Power", desc: "Calculating power with P = I × V and the energy transferred." },
  ],
  "further-mechanics": [
    { slug: "circular-motion", title: "Circular Motion", desc: "Deriving a = v²/r and applying F = mv²/r to orbits and roundabouts." },
    { slug: "simple-harmonic-motion", title: "Simple Harmonic Motion", desc: "Modelling oscillations with a = −ω²x and the mass–spring period." },
    { slug: "momentum-and-impulse", title: "Momentum and Impulse", desc: "Using p = mv and impulse FΔt = Δp for impacts and safety design." },
    { slug: "collisions", title: "Elastic and Inelastic Collisions", desc: "Applying conservation of momentum to elastic and inelastic collisions." },
  ],
  fields: [
    { slug: "gravitational-fields", title: "Gravitational Fields", desc: "Mapping g fields with F = GmM/r² and linking field strength to potential." },
    { slug: "electric-fields", title: "Electric Fields", desc: "Using E = F/Q and E = V/d for point charges and uniform fields." },
    { slug: "magnetic-fields", title: "Magnetic Fields", desc: "Finding field patterns and the force F = BIl on current-carrying wires." },
    { slug: "potentials-and-equipotentials", title: "Potentials and Equipotentials", desc: "Reading field strength from equipotential spacing and calculating work done." },
  ],
  "particle-physics": [
    { slug: "the-standard-model", title: "The Standard Model", desc: "Meeting quarks, leptons and the force-carrying bosons." },
    { slug: "antimatter", title: "Matter Meets Antimatter", desc: "Seeing how every particle has an antiparticle and what happens when they meet." },
    { slug: "quarks-and-hadrons", title: "Quarks and Hadrons", desc: "Building protons, neutrons and mesons from up and down quarks." },
    { slug: "quantum-ideas", title: "Quantum Ideas", desc: "Introducing photons, E = hf and the photoelectric effect." },
  ],
  // ── Chemistry ──
  "sorting-materials": [
    { slug: "describing-materials", title: "Describing Materials", desc: "Learn words like hard, smooth and stretchy to describe what materials are like." },
    { slug: "testing-properties", title: "Testing Properties", desc: "Carry out simple fair tests to find out which materials are waterproof, magnetic or stretchy." },
    { slug: "grouping-materials", title: "Grouping Materials", desc: "Sort objects into groups using one property at a time, such as rough or smooth." },
    { slug: "choosing-materials", title: "Choosing Materials", desc: "Decide which material suits a job, like glass for windows or fabric for clothes." },
  ],
  "solids-liquids": [
    { slug: "what-is-a-solid", title: "What Is a Solid", desc: "Discover how solids keep their shape even when you move them." },
    { slug: "what-is-a-liquid", title: "What Is a Liquid", desc: "See how liquids flow and take the shape of their container." },
    { slug: "melting-and-freezing", title: "Melting and Freezing", desc: "Watch what happens to ice, chocolate and butter when they are warmed and cooled." },
    { slug: "heating-and-cooling", title: "Heating and Cooling", desc: "Investigate how warming and cooling change materials, and how to test fairly." },
  ],
  mixtures: [
    { slug: "what-is-a-mixture", title: "What Is a Mixture", desc: "Learn how mixtures are made of two or more materials mixed together." },
    { slug: "sieving", title: "Separating by Sieving", desc: "Use a sieve to separate solids of different sizes, like flour from lumps." },
    { slug: "filtering", title: "Separating by Filtering", desc: "Use filter paper to separate a solid from a liquid, like sand from water." },
    { slug: "evaporating", title: "Separating by Evaporating", desc: "Use gentle heat to leave dissolved salt behind when water evaporates." },
  ],
  particles: [
    { slug: "particle-model", title: "The Particle Model", desc: "Meet the idea that all matter is made of tiny moving particles." },
    { slug: "solids-liquids-gases", title: "Solids, Liquids and Gases", desc: "Compare how particles are arranged and move in each state." },
    { slug: "changes-of-state", title: "Changes of State", desc: "Explain melting, boiling, condensing and freezing with particles." },
    { slug: "diffusion", title: "Spreading by Diffusion", desc: "See how particles spread from crowded places to empty ones." },
  ],
  "atomic-structure": [
    { slug: "subatomic-particles", title: "Subatomic Particles", desc: "Meet protons, neutrons and electrons and learn their charges and masses." },
    { slug: "atomic-number-mass", title: "Atomic Number and Mass Number", desc: "Use proton and nucleon numbers to describe any atom." },
    { slug: "electron-shells", title: "Electron Shells", desc: "Arrange electrons in shells and link the arrangement to the periodic table." },
  ],
  "periodic-table": [
    { slug: "arranging-elements", title: "Arranging the Elements", desc: "See how Mendeleev ordered elements by atomic mass and properties." },
    { slug: "groups-and-periods", title: "Groups and Periods", desc: "Read the table's columns and rows and what they tell you." },
    { slug: "metals-and-nonmetals", title: "Metals and Non-metals", desc: "Compare the properties of metals with those of non-metals." },
    { slug: "group-trends", title: "Trends in Groups", desc: "Predict how reactivity changes down Group 1 and Group 7." },
  ],
  "acids-alkalis": [
    { slug: "acids-everyday", title: "Acids in Everyday Life", desc: "Meet acids in citrus fruits, vinegar and your stomach." },
    { slug: "ph-scale", title: "The pH Scale", desc: "Use the 1–14 scale to measure how acidic or alkaline a solution is." },
    { slug: "indicators", title: "Testing with Indicators", desc: "Use litmus and universal indicator to test for acids and alkalis." },
    { slug: "neutralisation", title: "Acids Meet Alkalis", desc: "See how acids and alkalis cancel each other out." },
  ],
  "chemical-bonding": [
    { slug: "ionic-bonding", title: "Ionic Bonding", desc: "Learn how metals and non-metals bond by transferring electrons." },
    { slug: "covalent-bonding", title: "Covalent Bonding", desc: "See how non-metals share pairs of electrons." },
    { slug: "metallic-bonding", title: "Metallic Bonding", desc: "Discover the sea of electrons that holds metals together." },
    { slug: "structures-properties", title: "Structures and Properties", desc: "Link giant and molecular structures to melting points and conductivity." },
  ],
  "chemical-changes": [
    { slug: "acids-metals", title: "Acids with Metals and Carbonates", desc: "Write equations for acids reacting with metals and carbonates." },
    { slug: "making-salts", title: "Making Salts", desc: "Prepare pure salts by reacting acids with bases and carbonates." },
    { slug: "reactivity-series", title: "The Reactivity Series", desc: "Use the series to predict displacement and extraction reactions." },
    { slug: "energy-changes", title: "Energy in Reactions", desc: "Distinguish exothermic and endothermic reactions." },
  ],
  "quantitative-chemistry": [
    { slug: "the-mole", title: "The Mole", desc: "Count particles using the mole and Avogadro's constant." },
    { slug: "reacting-masses", title: "Masses in Reactions", desc: "Calculate how much product a reaction makes." },
    { slug: "yield-and-atom-economy", title: "Yield and Atom Economy", desc: "Measure how efficient a reaction is." },
    { slug: "concentrations", title: "Concentrations of Solutions", desc: "Work with moles per cubic decimetre." },
  ],
  "physical-chemistry": [
    { slug: "enthalpy-changes", title: "Enthalpy Changes", desc: "Measure heat changes with calorimetry and standard enthalpy definitions." },
    { slug: "hess-law", title: "Hess's Law", desc: "Calculate enthalpy changes indirectly using energy cycles." },
    { slug: "reaction-rates", title: "Rates of Reaction", desc: "Use collision theory to explain how reactions speed up." },
    { slug: "equilibria", title: "Chemical Equilibria", desc: "Apply Le Chatelier's principle and calculate equilibrium constants." },
  ],
  "organic-chemistry": [
    { slug: "alkanes", title: "Meeting the Alkanes", desc: "Study saturated hydrocarbons, fractional distillation and combustion." },
    { slug: "alkenes", title: "The Reactive Alkenes", desc: "Explore the double bond, electrophilic addition and polymers." },
    { slug: "alcohols", title: "Alcohols and Oxidation", desc: "Classify alcohols and follow their oxidation to carbonyls and acids." },
    { slug: "organic-synthesis", title: "Organic Synthesis", desc: "Plan reaction routes and identify functional groups." },
  ],
  "analytical-chemistry": [
    { slug: "chemical-tests", title: "Chemical Tests", desc: "Identify gases and ions with classic test-tube tests." },
    { slug: "flame-tests", title: "Flame Tests and Precipitates", desc: "Use flame colours and precipitation to identify metal ions." },
    { slug: "mass-spectrometry", title: "Mass Spectrometry", desc: "Find relative masses and molecular formulae from m/z peaks." },
    { slug: "spectroscopy", title: "Infrared and NMR Spectroscopy", desc: "Identify bonds and hydrogen environments in molecules." },
  ],
  // ── Biology ──
  "living-things": [
    { slug: "what-is-alive", title: "What Is Alive?", desc: "Learn the seven life processes (MRS GREN) that separate living things from things that were never alive." },
    { slug: "habitats-nearby", title: "Habitats Near You", desc: "Explore local habitats and discover how animals and plants suit the places where they live." },
    { slug: "sorting-animals", title: "Sorting Animals", desc: "Group animals by their features into mammals, birds, fish, reptiles, amphibians and minibeasts." },
    { slug: "simple-food-chains", title: "Simple Food Chains", desc: "Follow food chains from producer to consumer and see why plants start them all." },
  ],
  plants: [
    { slug: "parts-of-a-plant", title: "Parts of a Plant", desc: "Name the roots, stem, leaves and flower and learn what each part does for the plant." },
    { slug: "what-plants-need", title: "What Plants Need", desc: "Discover the light, water, warmth and air that plants need to stay healthy and grow." },
    { slug: "how-seeds-grow", title: "How Seeds Grow", desc: "Follow germination as a seed sprouts roots and shoots and becomes a new plant." },
    { slug: "making-food", title: "How Plants Make Food", desc: "Meet photosynthesis in simple words: leaves use sunlight, water and air to make food." },
  ],
  "animals-humans": [
    { slug: "five-senses", title: "The Five Senses", desc: "Explore sight, hearing, smell, taste and touch and the body parts that carry them." },
    { slug: "bones-and-skeletons", title: "Bones and Skeletons", desc: "Learn how the skeleton supports the body, protects delicate organs and helps us move." },
    { slug: "healthy-food", title: "Food for Health", desc: "Sort foods into groups and build a balanced plate that keeps your body strong." },
    { slug: "staying-healthy", title: "Staying Healthy", desc: "See why exercise, sleep, clean hands and clean teeth matter every single day." },
  ],
  "cell-biology": [
    { slug: "using-microscopes", title: "Using Microscopes", desc: "Learn how light microscopes work and practise calculating magnification." },
    { slug: "specialised-cells", title: "Specialised Cells", desc: "See how root hair cells, sperm cells, red blood cells and neurones are adapted to their jobs." },
    { slug: "mitosis", title: "Cell Division: Mitosis", desc: "Follow the stages of mitosis and learn why growth and repair need identical cells." },
  ],
  organisation: [
    { slug: "levels-of-organisation", title: "Levels of Organisation", desc: "Build the hierarchy from cells to tissues, organs and organ systems." },
    { slug: "digestive-system", title: "The Digestive System", desc: "Trace food through the gut and learn how nutrients reach the blood." },
    { slug: "heart-circulation", title: "Heart and Circulation", desc: "Explore the double circulatory system and how blood moves around the body." },
    { slug: "enzymes-in-digestion", title: "Enzymes in Digestion", desc: "Meet amylase, protease and lipase and see how enzymes speed up digestion." },
  ],
  reproduction: [
    { slug: "plant-reproduction", title: "Plant Reproduction", desc: "Learn how flowers, pollination and seeds create the next generation of plants." },
    { slug: "animal-life-cycles", title: "Animal Life Cycles", desc: "Compare the life cycles of mammals, birds, amphibians and insects, including metamorphosis." },
    { slug: "human-life-cycle", title: "The Human Life Cycle", desc: "Follow the stages from baby to adult to older age and what changes at each stage." },
    { slug: "puberty-and-growth", title: "Puberty and Growing Up", desc: "Understand the physical and emotional changes of adolescence in a factual, sensitive way." },
  ],
  "health-disease": [
    { slug: "pathogens", title: "Meet the Pathogens", desc: "Meet bacteria, viruses, fungi and protists and find out how they make us ill." },
    { slug: "body-defences", title: "The Body's Defences", desc: "Discover skin, stomach acid, white blood cells and antibodies that fight infection." },
    { slug: "vaccines", title: "How Vaccines Work", desc: "Learn how vaccination trains the immune system to defeat a disease before it strikes." },
    { slug: "healthy-lifestyle", title: "A Healthy Lifestyle", desc: "Explore how diet, exercise, sleep and avoiding smoking protect long-term health." },
  ],
  bioenergetics: [
    { slug: "photosynthesis", title: "How Photosynthesis Works", desc: "Master the word and symbol equations and how leaves are adapted for the job." },
    { slug: "limiting-factors", title: "Limiting Factors", desc: "Investigate how light, carbon dioxide and temperature limit the rate of photosynthesis." },
    { slug: "respiration", title: "Aerobic and Anaerobic Respiration", desc: "Compare the equations for respiration with and without oxygen, and their uses." },
    { slug: "energy-in-ecosystems", title: "Energy in Ecosystems", desc: "Calculate the percentage efficiency of energy transfer between trophic levels." },
  ],
  genetics: [
    { slug: "dna-genes-chromosomes", title: "DNA, Genes and Chromosomes", desc: "Connect DNA, genes, chromosomes and alleles into one clear picture." },
    { slug: "punnett-squares", title: "Punnett Squares", desc: "Predict the outcomes of single-gene crosses with step-by-step Punnett squares." },
    { slug: "inherited-disorders", title: "Inherited Disorders", desc: "Trace cystic fibrosis and polydactyly through family trees." },
    { slug: "variation-and-selection", title: "Variation and Selection", desc: "Explain the genetic and environmental causes of variation in populations." },
  ],
  ecology: [
    { slug: "food-webs", title: "Food Webs", desc: "Build food webs and identify producers, consumers, predators and decomposers." },
    { slug: "pyramids-of-biomass", title: "Pyramids of Biomass", desc: "Construct pyramids of biomass and explain why energy transfer is inefficient." },
    { slug: "carbon-cycle", title: "The Carbon Cycle", desc: "Follow carbon through photosynthesis, respiration, decay and combustion." },
    { slug: "human-impacts", title: "Humans and the Environment", desc: "Evaluate deforestation, pollution and global warming, and how we can respond." },
  ],
  biochemistry: [
    { slug: "biological-molecules", title: "Biological Molecules", desc: "Classify carbohydrates, lipids, proteins and nucleic acids, and test foods for them." },
    { slug: "protein-structure", title: "Protein Structure", desc: "Build proteins from amino acids through primary to quaternary structure." },
    { slug: "enzymes", title: "Enzymes in Depth", desc: "Explain specificity, the induced-fit model, and the effects of pH and temperature." },
    { slug: "dna-replication", title: "DNA Structure and Replication", desc: "Describe the double helix and the semi-conservative replication mechanism." },
  ],
  physiology: [
    { slug: "neurones-synapses", title: "Neurones and Synapses", desc: "Trace nerve impulses along neurones and across synapses in detail." },
    { slug: "reflex-arc", title: "The Reflex Arc", desc: "Map the five stages of a spinal reflex and explain why speed matters." },
    { slug: "hormones", title: "Hormonal Control", desc: "Compare nervous and hormonal control and explore the glands of the endocrine system." },
    { slug: "homeostasis", title: "Homeostasis: Blood Glucose", desc: "Explain the negative-feedback control of blood glucose by insulin and glucagon." },
  ],
  evolution: [
    { slug: "natural-selection", title: "Natural Selection", desc: "Explain Darwin's theory step by step, with real examples like antibiotic resistance." },
    { slug: "evidence-for-evolution", title: "Evidence for Evolution", desc: "Weigh the fossil, anatomical, embryological and DNA evidence for common ancestry." },
    { slug: "speciation", title: "How Speciation Happens", desc: "Show how isolation and selection split one species into two." },
    { slug: "classification", title: "Classification and Phylogeny", desc: "Use the taxonomic hierarchy and DNA data to build evolutionary trees." },
  ],
  // ── Computer Science ──
  "creating-media": [
    { slug: "planning-your-project", title: "Planning Your Project", desc: "Sketch a simple storyboard before you start making anything." },
    { slug: "making-images", title: "Making Images", desc: "Create and edit pictures, then save them with sensible file names." },
    { slug: "storing-images", title: "Storing Images: Pixels and Colour Depth", desc: "How a picture becomes binary — pixels, colour depth, and how to calculate the exact file size." },
    { slug: "adding-text-and-sound", title: "Text and Sound", desc: "Add clear titles, captions and recorded sound to your work." },
    { slug: "animation-basics", title: "Animation Basics", desc: "Make simple animations and slideshows that tell a story in order." },
  ],
  "computational-thinking": [
    { slug: "decomposition", title: "Breaking Problems Down", desc: "Split large problems into smaller, solvable pieces." },
    { slug: "pattern-recognition", title: "Pattern Recognition", desc: "Spot similarities and repetitions that let you reuse solutions." },
    { slug: "abstraction", title: "Focusing on What Matters", desc: "Strip away unimportant detail to focus on what matters." },
    { slug: "algorithmic-thinking", title: "Algorithmic Thinking", desc: "Turn your plan into clear, ordered steps a computer can follow." },
  ],
  programming: [
    { slug: "output-and-input", title: "Output and Input", desc: "Make programs talk to the user with print and input." },
    { slug: "selection", title: "Making Decisions", desc: "Branch your program's behaviour with if, elif and else." },
    { slug: "loops", title: "Repeating with Loops", desc: "Repeat actions efficiently with for and while loops." },
  ],
  "data-representation": [
    { slug: "binary-numbers", title: "Binary Numbers", desc: "Count in base 2 and convert between binary and denary." },
    { slug: "text-and-characters", title: "Text and Characters", desc: "See how ASCII and Unicode turn letters into numbers." },
    { slug: "images-pixels", title: "Images and Pixels", desc: "Discover how grids of coloured dots become photographs." },
    { slug: "sound-sampling", title: "Sound and Sampling", desc: "Learn how sound waves are sampled into digital audio." },
  ],
  networks: [
    { slug: "what-is-a-network", title: "What Is a Network?", desc: "Explore LANs, WANs and the hardware that connects devices." },
    { slug: "packets-and-protocols", title: "Packets and Protocols", desc: "See how data is split into packets that follow agreed rules." },
    { slug: "how-the-internet-works", title: "How the Internet Works", desc: "Trace a web request from your device to a server and back." },
    { slug: "network-security", title: "Network Security", desc: "Learn how encryption and firewalls keep networks safe." },
  ],
  algorithms: [
    { slug: "linear-search", title: "Linear Search", desc: "Find items by checking each one in turn." },
    { slug: "binary-search", title: "Binary Search", desc: "Search sorted lists far faster by halving the problem." },
    { slug: "bubble-sort", title: "Bubble Sort", desc: "Sort lists by repeatedly swapping neighbouring items." },
    { slug: "measuring-efficiency", title: "Measuring Efficiency", desc: "Compare algorithms using Big-O notation and worst cases." },
  ],
  "data-structures": [
    { slug: "stacks", title: "Using Stacks", desc: "Store data last-in, first-out, like a pile of plates." },
    { slug: "queues", title: "Using Queues", desc: "Store data first-in, first-out, like a real queue." },
    { slug: "trees", title: "Tree Structures", desc: "Organise hierarchical data with binary trees and traversals." },
    { slug: "graphs", title: "Graph Networks", desc: "Model networks and relationships with nodes and edges." },
  ],
  "databases-sql": [
    { slug: "tables-and-keys", title: "Tables and Keys", desc: "Design tables with primary keys that uniquely identify each row." },
    { slug: "relationships", title: "Table Relationships", desc: "Link tables with foreign keys in one-to-many relationships." },
    { slug: "select-queries", title: "SELECT Queries", desc: "Retrieve exactly the data you need with SELECT, WHERE and ORDER BY." },
    { slug: "changing-data", title: "Changing Data", desc: "Add, update and delete rows safely with INSERT, UPDATE and DELETE." },
  ],
  "ai-ethics": [
    { slug: "how-machine-learning-works", title: "How Machine Learning Works", desc: "See how models learn patterns from data instead of following coded rules." },
    { slug: "training-data", title: "Training Data", desc: "Understand why the quality and quantity of data decides what AI learns." },
    { slug: "bias-and-fairness", title: "Bias and Fairness", desc: "Explore how biased data creates unfair AI — and how to fight it." },
    { slug: "using-ai-responsibly", title: "Using AI Responsibly", desc: "Weigh up privacy, accountability and honest use of AI tools." },
  ],
};
