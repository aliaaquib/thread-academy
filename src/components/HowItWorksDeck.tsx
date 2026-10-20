/**
 * HOW IT WORKS — INTERACTIVE DECK (home page, after the static steps).
 * Three alternating panels with working mini-demos of the student journey:
 *   01 Find your lesson — subject pills + "open chapter" loading state machine
 *   02 Learn step by step — a worked example that reveals one step at a time
 *   03 Ask AI — a mock tutor chat (thinking dots, then a typed answer)
 * The subject toggle (Mathematics / Computer Science / Biology) drives the
 * mock content in all three panels. All copy is localized (strings.ts for UI
 * chrome, MOCK below for the demo content). Styled with the site's own
 * design tokens in globals.css (.hiw-* classes) — no extra libraries.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";
import { getSubject } from "@/lib/subjects";

type SubjectSlug = "mathematics" | "computer-science" | "biology";
const SUBJECTS: SubjectSlug[] = ["mathematics", "computer-science", "biology"];
const GLYPHS: Record<SubjectSlug, string> = {
  mathematics: "x²",
  "computer-science": "</>",
  biology: "DNA",
};

interface MockLesson { title: string; mins: number }
interface MockSubject {
  chapter: string;
  lessons: MockLesson[];
  exampleTitle: string;
  steps: string[];
  question: string;
  answer: string;
}

/** Demo content per language — kept short on purpose; it's a mock, not a lesson. */
const MOCK: Record<Lang, Record<SubjectSlug, MockSubject>> = {
  en: {
    mathematics: {
      chapter: "Algebra",
      lessons: [
        { title: "Linear equations", mins: 12 },
        { title: "Solving with brackets", mins: 10 },
        { title: "Word problems", mins: 14 },
      ],
      exampleTitle: "Solve  2x + 5 = 17",
      steps: [
        "Subtract 5 from both sides → 2x = 12",
        "Divide both sides by 2 → x = 6",
        "Check: 2 × 6 + 5 = 17 ✓ — it balances.",
      ],
      question: "Why do we do the same thing to both sides of an equation?",
      answer:
        "Think of an equation as a balanced scale. If you take 5 from one side only, the scale tips over — so whatever you do to one side, you must do to the other to keep it balanced.",
    },
    "computer-science": {
      chapter: "Programming",
      lessons: [
        { title: "Variables", mins: 10 },
        { title: "Loops", mins: 12 },
        { title: "Conditionals", mins: 11 },
      ],
      exampleTitle: "Trace this loop:  for i in 0..2: print(i)",
      steps: [
        "i starts at 0 → print 0",
        "i grows to 1 → print 1",
        "i grows to 2 → print 2, then the loop ends",
      ],
      question: "What's the difference between a for loop and a while loop?",
      answer:
        "A for loop repeats a known number of times — use it when you can count the rounds. A while loop repeats until a condition changes — use it when you're waiting for something to happen.",
    },
    biology: {
      chapter: "Cell biology",
      lessons: [
        { title: "Cell structure", mins: 12 },
        { title: "Cell division", mins: 15 },
        { title: "Tissues and organs", mins: 10 },
      ],
      exampleTitle: "Name the parts of a plant cell",
      steps: [
        "Nucleus — controls everything the cell does",
        "Mitochondria — release energy from food",
        "Cell wall — a rigid coat that holds the shape",
      ],
      question: "Why do plant cells have a cell wall but animal cells don't?",
      answer:
        "Plants have no skeleton, so each cell needs its own rigid wall for support and shape — that's what lets a stem stand upright. Animal cells rely on the skeleton instead, so they stay soft and flexible.",
    },
  },
  tr: {
    mathematics: {
      chapter: "Cebir",
      lessons: [
        { title: "Doğrusal denklemler", mins: 12 },
        { title: "Parantezli denklemler", mins: 10 },
        { title: "Sözel problemler", mins: 14 },
      ],
      exampleTitle: "Çöz:  2x + 5 = 17",
      steps: [
        "İki taraftan da 5 çıkar → 2x = 12",
        "İki tarafı da 2'ye böl → x = 6",
        "Kontrol: 2 × 6 + 5 = 17 ✓ — denge sağlanıyor.",
      ],
      question: "Denklemin iki tarafına da neden aynı işlemi yapıyoruz?",
      answer:
        "Denklemi dengedeki bir terazi gibi düşün. Sadece bir taraftan 5 alırsan terazi devrilir — bu yüzden bir tarafa yaptığını, dengeyi korumak için diğer tarafa da yapmalısın.",
    },
    "computer-science": {
      chapter: "Programlama",
      lessons: [
        { title: "Değişkenler", mins: 10 },
        { title: "Döngüler", mins: 12 },
        { title: "Koşullar", mins: 11 },
      ],
      exampleTitle: "Bu döngüyü izle:  for i in 0..2: print(i)",
      steps: [
        "i, 0'dan başlar → 0 yazdır",
        "i, 1 olur → 1 yazdır",
        "i, 2 olur → 2 yazdır, sonra döngü biter",
      ],
      question: "For döngüsü ile while döngüsü arasındaki fark nedir?",
      answer:
        "For döngüsü bilinen sayıda tekrar eder — turları sayabiliyorsan onu kullan. While döngüsü bir koşul değişene kadar tekrar eder — bir şeyin olmasını bekliyorsan onu kullan.",
    },
    biology: {
      chapter: "Hücre biyolojisi",
      lessons: [
        { title: "Hücre yapısı", mins: 12 },
        { title: "Hücre bölünmesi", mins: 15 },
        { title: "Dokular ve organlar", mins: 10 },
      ],
      exampleTitle: "Bir bitki hücresinin kısımlarını adlandır",
      steps: [
        "Çekirdek — hücrenin yaptığı her şeyi kontrol eder",
        "Mitokondri — besinden enerji açığa çıkarır",
        "Hücre duvarı — şekli koruyan sert bir kılıf",
      ],
      question: "Bitki hücrelerinde neden hücre duvarı var da hayvan hücrelerinde yok?",
      answer:
        "Bitkilerin iskeleti yoktur, bu yüzden her hücrenin destek ve şekil için kendi sert duvarına ihtiyacı vardır — bir sapın dik durmasını sağlayan budur. Hayvan hücreleri bunun yerine iskelete dayanır, böylece yumuşak ve esnek kalırlar.",
    },
  },
  ru: {
    mathematics: {
      chapter: "Алгебра",
      lessons: [
        { title: "Линейные уравнения", mins: 12 },
        { title: "Уравнения со скобками", mins: 10 },
        { title: "Текстовые задачи", mins: 14 },
      ],
      exampleTitle: "Реши:  2x + 5 = 17",
      steps: [
        "Вычти 5 из обеих частей → 2x = 12",
        "Раздели обе части на 2 → x = 6",
        "Проверка: 2 × 6 + 5 = 17 ✓ — равенство сохраняется.",
      ],
      question: "Почему мы делаем одно и то же с обеими частями уравнения?",
      answer:
        "Представь уравнение как уравновешенные весы. Если убрать 5 только с одной чаши, весы перекосятся — поэтому всё, что делаешь с одной частью, нужно делать и с другой, чтобы сохранить баланс.",
    },
    "computer-science": {
      chapter: "Программирование",
      lessons: [
        { title: "Переменные", mins: 10 },
        { title: "Циклы", mins: 12 },
        { title: "Условия", mins: 11 },
      ],
      exampleTitle: "Проследи цикл:  for i in 0..2: print(i)",
      steps: [
        "i начинается с 0 → печатаем 0",
        "i становится 1 → печатаем 1",
        "i становится 2 → печатаем 2, затем цикл завершается",
      ],
      question: "В чём разница между циклом for и циклом while?",
      answer:
        "Цикл for повторяется известное число раз — используй его, когда повторы можно сосчитать. Цикл while повторяется, пока не изменится условие, — используй его, когда ждёшь наступления события.",
    },
    biology: {
      chapter: "Биология клетки",
      lessons: [
        { title: "Строение клетки", mins: 12 },
        { title: "Деление клетки", mins: 15 },
        { title: "Ткани и органы", mins: 10 },
      ],
      exampleTitle: "Назови части растительной клетки",
      steps: [
        "Ядро — управляет всем, что делает клетка",
        "Митохондрии — высвобождают энергию из пищи",
        "Клеточная стенка — жёсткая оболочка, держащая форму",
      ],
      question: "Почему у растительных клеток есть клеточная стенка, а у животных — нет?",
      answer:
        "У растений нет скелета, поэтому каждой клетке нужна собственная жёсткая стенка для опоры и формы — именно она позволяет стеблю стоять вертикально. Клетки животных опираются на скелет, поэтому остаются мягкими и гибкими.",
    },
  },
  ky: {
    mathematics: {
      chapter: "Алгебра",
      lessons: [
        { title: "Сызыктуу теңдемелер", mins: 12 },
        { title: "Кашаалуу теңдемелер", mins: 10 },
        { title: "Тексттик маселелер", mins: 14 },
      ],
      exampleTitle: "Чыгар:  2x + 5 = 17",
      steps: [
        "Эки жагынан тең 5ти кемит → 2x = 12",
        "Эки жагын тең 2ге бөл → x = 6",
        "Текшерүү: 2 × 6 + 5 = 17 ✓ — теңдик сакталат.",
      ],
      question: "Эмне үчүн теңдеменин эки жагына тең бир эле амал жасайбыз?",
      answer:
        "Теңдемени тең салмактуу таразадай элестет. Бир жагынан гана 5ти алсаң, тараза кыйшаят — ошондуктан бир жагына жасаган амалды, салмакты сактоо үчүн экинчи жагына да жасаш керек.",
    },
    "computer-science": {
      chapter: "Программалоо",
      lessons: [
        { title: "Өзгөрмөлөр", mins: 10 },
        { title: "Циклдер", mins: 12 },
        { title: "Шарттар", mins: 11 },
      ],
      exampleTitle: "Бул циклди байка:  for i in 0..2: print(i)",
      steps: [
        "i 0дон башталат → 0 чыгарат",
        "i 1 болот → 1 чыгарат",
        "i 2 болот → 2 чыгарат, андан кийин цикл аяктайт",
      ],
      question: "For циклы менен while циклынын айырмасы эмнеде?",
      answer:
        "For циклы белгилүү санда кайталанат — кайталоону санай алсаң, аны колдон. While циклы шарт өзгөргөнгө чейин кайталанат — бир нерсенин болушун күтүп жатсаң, аны колдон.",
    },
    biology: {
      chapter: "Клетка биологиясы",
      lessons: [
        { title: "Клетканын түзүлүшү", mins: 12 },
        { title: "Клетканын бөлүнүшү", mins: 15 },
        { title: "Ткандар жана органдар", mins: 10 },
      ],
      exampleTitle: "Өсүмдүк клеткасынын бөлүктөрүн ата",
      steps: [
        "Ядро — клетканын бардык ишин башкарат",
        "Митохондриялар — тамактан энергия бөлүп чыгарат",
        "Клетка кабыгы — форманы кармаган катуу катмар",
      ],
      question: "Эмне үчүн өсүмдүк клеткаларында клетка кабыгы бар, ал эми жаныбарлардыкында жок?",
      answer:
        "Өсүмдүктөрдө скелет жок, ошондуктан ар бир клеткага тирөөч жана форма үчүн өз катуу кабыгы керек — сабактын тик турушун камсыз кылган ошол. Жаныбар клеткалары анын ордуна скелетке таянат, ошондуктан жумшак жана ийкемдүү бойдон калат.",
    },
  },
};

function StepShell({
  num,
  title,
  copy,
  features,
  flipped,
  children,
}: {
  num: string;
  title: string;
  copy: string;
  features: { t: string; d: string }[];
  flipped?: boolean;
  children: React.ReactNode;
}) {
  const text = (
    <div className="hiw-text">
      <h3>{title}</h3>
      <p>{copy}</p>
      <div className="hiw-features">
        {features.map((f) => (
          <div key={f.t} className="hiw-feature">
            <strong>{f.t}</strong>
            <span>{f.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className={`hiw-row${flipped ? " flipped" : ""}`}>
      <div className="hiw-side hiw-demo-side">{children}</div>
      <div className="hiw-side hiw-text-side">{text}</div>
      <span className="hiw-stepnum" aria-hidden="true">{num}</span>
    </div>
  );
}

export default function HowItWorksDeck({ lang }: { lang: Lang }) {
  const [subject, setSubject] = useState<SubjectSlug>("mathematics");
  const mock = MOCK[lang][subject];

  /* ---- Step 1: open-chapter state machine ---- */
  const [s1, setS1] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setS1("idle");
    setProgress(0);
  }, [subject]);
  useEffect(() => {
    if (s1 !== "loading") return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setS1("done");
          return 100;
        }
        return p + 10;
      });
    }, 110);
    return () => clearInterval(id);
  }, [s1]);

  /* ---- Step 2: worked-example stepper ---- */
  const [revealed, setRevealed] = useState(1);
  useEffect(() => {
    setRevealed(1);
  }, [subject]);
  const totalSteps = mock.steps.length;
  const exampleDone = revealed >= totalSteps;

  /* ---- Step 3: mock tutor chat ---- */
  const [chat, setChat] = useState<"idle" | "thinking" | "typing" | "done">("idle");
  const [typed, setTyped] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    setChat("idle");
    setTyped(0);
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, [subject]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function ask() {
    if (chat !== "idle") return;
    setChat("thinking");
    timers.current.push(
      setTimeout(() => {
        setChat("typing");
        const id = setInterval(() => {
          setTyped((n) => {
            if (n >= mock.answer.length) {
              clearInterval(id);
              setChat("done");
              return n;
            }
            return n + 3;
          });
        }, 16);
        timers.current.push(id as unknown as ReturnType<typeof setTimeout>);
      }, 900),
    );
  }
  function resetChat() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setChat("idle");
    setTyped(0);
  }

  return (
    <section className="section" id="how-it-works">
      <div className="section-head">
        <div>
          <div className="eyebrow">{t(lang, "home.hiw.kicker")}</div>
          <h2>{t(lang, "home.hiw.title")}</h2>
        </div>
        <p>{t(lang, "home.hiw.lede")}</p>
      </div>

      <div className="hiw-deck">
        {/* ---------------- STEP 01 ---------------- */}
        <StepShell
          num="01"
          title={t(lang, "home.hiw.1.title")}
          copy={t(lang, "home.hiw.1.copy")}
          features={[
            { t: t(lang, "home.hiw.1.f1t"), d: t(lang, "home.hiw.1.f1d") },
            { t: t(lang, "home.hiw.1.f2t"), d: t(lang, "home.hiw.1.f2d") },
          ]}
        >
          <div className="hiw-card">
            <div className="hiw-pills" role="tablist" aria-label="subject">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={subject === s}
                  className={`hiw-pill${subject === s ? " active" : ""}`}
                  onClick={() => setSubject(s)}
                >
                  {getSubject(s, lang)?.name ?? s}
                </button>
              ))}
            </div>
            <div className="hiw-path">{t(lang, "home.hiw.1.path")}</div>
            <div className="hiw-chapter">
              <span className="hiw-chapter-glyph" aria-hidden="true">{GLYPHS[subject]}</span>
              <div>
                <strong>{mock.chapter}</strong>
                <span>{mock.lessons.length} {t(lang, "home.hiw.1.lessons")}</span>
              </div>
            </div>
            {s1 === "done" ? (
              <>
                <ul className="hiw-lessons">
                  {mock.lessons.map((l) => (
                    <li key={l.title}>
                      <span className="hiw-check" aria-hidden="true">✓</span>
                      <span className="hiw-lesson-title">{l.title}</span>
                      <span className="hiw-lesson-mins">{l.mins} {t(lang, "home.hiw.1.min")}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="hiw-btn ghost" onClick={() => { setS1("idle"); setProgress(0); }}>
                  {t(lang, "home.hiw.reset")}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="hiw-btn"
                  disabled={s1 === "loading"}
                  onClick={() => setS1("loading")}
                >
                  {s1 === "loading" ? t(lang, "home.hiw.1.opening") : t(lang, "home.hiw.1.open")}
                </button>
                {s1 === "loading" && (
                  <div className="hiw-bar" aria-hidden="true">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                )}
                <p className="hiw-hint">{t(lang, "home.hiw.1.hint")}</p>
              </>
            )}
          </div>
        </StepShell>

        {/* ---------------- STEP 02 ---------------- */}
        <StepShell
          flipped
          num="02"
          title={t(lang, "home.hiw.2.title")}
          copy={t(lang, "home.hiw.2.copy")}
          features={[
            { t: t(lang, "home.hiw.2.f1t"), d: t(lang, "home.hiw.2.f1d") },
            { t: t(lang, "home.hiw.2.f2t"), d: t(lang, "home.hiw.2.f2d") },
          ]}
        >
          <div className="hiw-card">
            <div className="hiw-path">{t(lang, "home.hiw.2.example")} · {mock.chapter}</div>
            <div className="hiw-example-title">{mock.exampleTitle}</div>
            <ol className="hiw-steps">
              {mock.steps.slice(0, revealed).map((s, i) => (
                <li key={i}>
                  <span className="hiw-stepdot" aria-hidden="true">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <div className="hiw-bar" aria-hidden="true">
              <span style={{ width: `${(revealed / totalSteps) * 100}%` }} />
            </div>
            {exampleDone ? (
              <>
                <p className="hiw-done-note">✓ {t(lang, "home.hiw.2.done")}</p>
                <button type="button" className="hiw-btn ghost" onClick={() => setRevealed(1)}>
                  {t(lang, "home.hiw.reset")}
                </button>
              </>
            ) : (
              <button type="button" className="hiw-btn" onClick={() => setRevealed((r) => Math.min(totalSteps, r + 1))}>
                {t(lang, "home.hiw.2.next")} · {t(lang, "home.hiw.2.of", { a: revealed, b: totalSteps })}
              </button>
            )}
          </div>
        </StepShell>

        {/* ---------------- STEP 03 ---------------- */}
        <StepShell
          num="03"
          title={t(lang, "home.hiw.3.title")}
          copy={t(lang, "home.hiw.3.copy")}
          features={[
            { t: t(lang, "home.hiw.3.f1t"), d: t(lang, "home.hiw.3.f1d") },
            { t: t(lang, "home.hiw.3.f2t"), d: t(lang, "home.hiw.3.f2d") },
          ]}
        >
          <div className="hiw-card">
            <div className="hiw-chat">
              <button
                type="button"
                className="hiw-bubble you"
                onClick={ask}
                disabled={chat !== "idle"}
                title={t(lang, "home.hiw.3.hint")}
              >
                {mock.question}
              </button>
              {chat === "thinking" && (
                <div className="hiw-bubble ai thinking" aria-label={t(lang, "home.hiw.3.thinking")}>
                  <span /><span /><span />
                </div>
              )}
              {(chat === "typing" || chat === "done") && (
                <div className="hiw-bubble ai">
                  <strong>Ask AI</strong>
                  <p>{mock.answer.slice(0, typed)}{chat === "typing" && <span className="hiw-caret" aria-hidden="true" />}</p>
                </div>
              )}
              {chat === "idle" && <p className="hiw-hint">{t(lang, "home.hiw.3.hint")}</p>}
              {chat === "done" && (
                <button type="button" className="hiw-btn ghost" onClick={resetChat}>
                  {t(lang, "home.hiw.reset")}
                </button>
              )}
            </div>
          </div>
        </StepShell>
      </div>
    </section>
  );
}
