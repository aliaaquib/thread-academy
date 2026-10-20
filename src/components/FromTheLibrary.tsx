/**
 * TESTIMONIALS (home page, last section) — three columns:
 * teacher reviews marquee scrolling DOWN (left), a founder note
 * (center), student reviews marquee scrolling UP (right). Marquees
 * are CSS-only (.tm-track / .tm-track-down in globals.css; lists
 * doubled for a seamless -50% loop, pause on hover). Client
 * component for the scroll reveal (.tm-reveal / .tm-on).
 * Review cards use the classic byline: monogram avatar + name,
 * with subject (teachers) or class (students) underneath.
 *
 * ⚠️ MOCK DATA: the teacher/student quotes AND names are
 * PLACEHOLDER copy written for this layout, to be replaced with
 * real collected reviews (real names, subjects, classes, photos).
 * The founder note is real: written from Aaquib Ali's actual
 * position (founder; computer science & mathematics teacher),
 * and the founder photo is his real uploaded headshot.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";
import SectionTag from "./SectionTag";

interface Review {
  text: string;
  name: string;
  /** Subject for teachers, class for students. */
  meta: string;
}
interface Reviews {
  teachersLabel: string;
  studentsLabel: string;
  founderLabel: string;
  founderNote: string;
  founderName: string;
  founderRole: string;
  teachers: Review[];
  students: Review[];
}

const NAMES = {
  teachers: ["Daniel Carter", "Maria Santos", "David Kim", "Anna Petrova", "Michael Reed"],
  students: ["Aibek T.", "Nuray S.", "Daniel K.", "Aruuke M.", "Timur B."],
};

const REVIEWS: Record<Lang, Reviews> = {
  en: {
    teachersLabel: "From teachers",
    studentsLabel: "From students",
    founderLabel: "A note from the founder",
    founderNote:
      "I built Thread Academy for my own students first: one library where every lesson follows the one before it, in the language they think in. It worked in my classroom, so I opened it to everyone — free, in four languages, no account needed. If it helps your students the way it helps mine, it has done its job.",
    founderName: "Aaquib Ali",
    founderRole: "Founder — computer science & mathematics teacher",
    teachers: [
      { text: "I plan my week straight from the chapter order — the lessons land in the sequence I would teach them.", name: NAMES.teachers[0], meta: "Computer Science" },
      { text: "The worked examples do the heavy lifting. My students arrive at practice already understanding the idea.", name: NAMES.teachers[1], meta: "Mathematics" },
      { text: "Having every lesson in four languages changed my classroom. Nobody is locked out by language anymore.", name: NAMES.teachers[2], meta: "Physics" },
      { text: "It is the first resource I have used that feels written by someone who actually teaches.", name: NAMES.teachers[3], meta: "Biology" },
      { text: "I send the link, they read ahead, and class time becomes discussion instead of dictation.", name: NAMES.teachers[4], meta: "English" },
    ],
    students: [
      { text: "I finally get algebra. The examples show every step, not just the answer.", name: NAMES.students[0], meta: "Grade 9" },
      { text: "I read the lesson in Kyrgyz first, then in English. That is how I actually learn it.", name: NAMES.students[1], meta: "Grade 8" },
      { text: "The AI tutor answers my questions at midnight before an exam. Enough said.", name: NAMES.students[2], meta: "Grade 10" },
      { text: "Every lesson tells you what comes next, so studying never feels random.", name: NAMES.students[3], meta: "Grade 9" },
      { text: "It is free and there is no sign-up. I just open it and start.", name: NAMES.students[4], meta: "Grade 11" },
    ],
  },
  tr: {
    teachersLabel: "Öğretmenlerden",
    studentsLabel: "Öğrencilerden",
    founderLabel: "Kurucudan bir not",
    founderNote:
      "Thread Academy'yi önce kendi öğrencilerim için yaptım: her dersin bir öncekini izlediği, düşündükleri dilde tek bir kütüphane. Sınıfımda işe yaradı, ben de herkese açtım — ücretsiz, dört dilde, hesap gerekmeden. Öğrencilerinize benimkiler kadar faydası olursa, işini yapmış demektir.",
    founderName: "Aaquib Ali",
    founderRole: "Kurucu — bilgisayar bilimi ve matematik öğretmeni",
    teachers: [
      { text: "Haftamı doğrudan bölüm sırasına göre planlıyorum — dersler tam benim anlatacağım sırayla geliyor.", name: NAMES.teachers[0], meta: "Bilgisayar Bilimi" },
      { text: "Çözümlü örnekler işin büyüğünü yapıyor. Öğrencilerim fikri anlamış olarak alıştırmaya geliyor.", name: NAMES.teachers[1], meta: "Matematik" },
      { text: "Her dersin dört dilde olması sınıfımı değiştirdi. Artık kimse dil yüzünden dışarıda kalmıyor.", name: NAMES.teachers[2], meta: "Fizik" },
      { text: "Kullandığım kaynaklar arasında gerçekten öğreten biri tarafından yazılmış hissi veren ilk kaynak.", name: NAMES.teachers[3], meta: "Biyoloji" },
      { text: "Bağlantıyı gönderiyorum, önden okuyorlar; ders saati dikte yerine tartışmaya dönüşüyor.", name: NAMES.teachers[4], meta: "İngilizce" },
    ],
    students: [
      { text: "Cebiri sonunda anladım. Örnekler sadece cevabı değil, her adımı gösteriyor.", name: NAMES.students[0], meta: "9. sınıf" },
      { text: "Dersi önce Kırgızca, sonra İngilizce okuyorum. Gerçekten böyle öğreniyorum.", name: NAMES.students[1], meta: "8. sınıf" },
      { text: "Yapay zekâ öğretmen sınavdan önce gece yarısı sorularımı cevaplıyor. Başka söze gerek yok.", name: NAMES.students[2], meta: "10. sınıf" },
      { text: "Her ders sırada ne olduğunu söylüyor; çalışmak hiç rastgele hissettirmiyor.", name: NAMES.students[3], meta: "9. sınıf" },
      { text: "Ücretsiz ve kayıt yok. Açıp hemen başlıyorum.", name: NAMES.students[4], meta: "11. sınıf" },
    ],
  },
  ru: {
    teachersLabel: "От учителей",
    studentsLabel: "От учеников",
    founderLabel: "Заметка основателя",
    founderNote:
      "Я создал Thread Academy сначала для своих учеников: одна библиотека, где каждый урок следует за предыдущим, на языке, на котором они думают. Это сработало в моём классе, и я открыл её для всех — бесплатно, на четырёх языках, без аккаунта. Если вашим ученикам она поможет так же, как моим, — она сделала своё дело.",
    founderName: "Aaquib Ali",
    founderRole: "Основатель — учитель информатики и математики",
    teachers: [
      { text: "Я планирую неделю прямо по порядку глав — уроки идут в той последовательности, в которой я бы их преподавал.", name: NAMES.teachers[0], meta: "Информатика" },
      { text: "Разобранные примеры делают основную работу. Ученики приходят к практике, уже понимая идею.", name: NAMES.teachers[1], meta: "Математика" },
      { text: "Каждый урок на четырёх языках изменил мой класс. Язык больше никого не оставляет за бортом.", name: NAMES.teachers[2], meta: "Физика" },
      { text: "Это первый ресурс, который ощущается написанным тем, кто действительно преподаёт.", name: NAMES.teachers[3], meta: "Биология" },
      { text: "Я отправляю ссылку, они читают заранее, и урок становится обсуждением, а не диктовкой.", name: NAMES.teachers[4], meta: "Английский язык" },
    ],
    students: [
      { text: "Я наконец понял алгебру. В примерах показан каждый шаг, а не только ответ.", name: NAMES.students[0], meta: "9 класс" },
      { text: "Читаю урок сначала на кыргызском, потом на английском. Так я действительно учу.", name: NAMES.students[1], meta: "8 класс" },
      { text: "ИИ-репетитор отвечает на мои вопросы в полночь перед экзаменом. Этим всё сказано.", name: NAMES.students[2], meta: "10 класс" },
      { text: "Каждый урок говорит, что будет дальше, поэтому учёба не кажется случайной.", name: NAMES.students[3], meta: "9 класс" },
      { text: "Это бесплатно и без регистрации. Просто открываю и начинаю.", name: NAMES.students[4], meta: "11 класс" },
    ],
  },
  ky: {
    teachersLabel: "Мугалимдерден",
    studentsLabel: "Окуучулардан",
    founderLabel: "Негиздөөчүдөн кат",
    founderNote:
      "Thread Academy'ни адегенде өз окуучуларым үчүн түздүм: ар бир сабак мурункусунан кийин келген, алар ойлогон тилдеги бир китепкана. Классымда иштеди, ошондуктан баарына ачтым — акысыз, төрт тилде, аккаунтсуз. Окуучуларыңызга меникилердей пайдасы тийсе, ал өз ишин аткарды.",
    founderName: "Aaquib Ali",
    founderRole: "Негиздөөчү — информатика жана математика мугалими",
    teachers: [
      { text: "Жумамды түздөн-түз бөлүмдөрдүн ирети менен пландайм — сабактар мен окуткандай ирет менен келет.", name: NAMES.teachers[0], meta: "Информатика" },
      { text: "Иштелген мисалдар негизги ишти аткарат. Окуучуларым идеяны түшүнүп алып практикага келишет.", name: NAMES.teachers[1], meta: "Математика" },
      { text: "Ар бир сабактын төрт тилде болушу классымды өзгөрттү. Эми эч ким тилдин айынан четте калбайт.", name: NAMES.teachers[2], meta: "Физика" },
      { text: "Бул — чынында окуткан адам жазгандай сезилген биринчи ресурс.", name: NAMES.teachers[3], meta: "Биология" },
      { text: "Шилтемени жөнөтөм, алар алдын ала окушат, сабак убактысы диктант эмес, талкууга айланат.", name: NAMES.teachers[4], meta: "Англис тили" },
    ],
    students: [
      { text: "Алгебраны акыры түшүндүм. Мисалдар жоопту гана эмес, ар бир кадамды көрсөтөт.", name: NAMES.students[0], meta: "9-класс" },
      { text: "Сабакты адегенде кыргызча, анан англисче окуйм. Мен чындап ушинтип үйрөнөм.", name: NAMES.students[1], meta: "8-класс" },
      { text: "AI репетитор экзамен алдында түн ортосунда суроолорума жооп берет. Башка сөз керек эмес.", name: NAMES.students[2], meta: "10-класс" },
      { text: "Ар бир сабак кийинкиси эмне экенин айтат, ошондуктан окуу баш аламан сезилбейт.", name: NAMES.students[3], meta: "9-класс" },
      { text: "Акысыз жана каттоосуз. Жөн гана ачам да баштайм.", name: NAMES.students[4], meta: "11-класс" },
    ],
  },
};

function QuoteMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--accent-deep)" aria-hidden="true">
      <path d="M10.2 5C6.6 6.6 4.5 9.6 4.5 13.6c0 3 1.7 5 4.1 5 2.1 0 3.7-1.6 3.7-3.7 0-2-1.3-3.4-3.2-3.6.3-1.9 1.6-3.6 3.4-4.5L10.2 5Zm9.5 0c-3.6 1.6-5.7 4.6-5.7 8.6 0 3 1.7 5 4.1 5 2.1 0 3.7-1.6 3.7-3.7 0-2-1.3-3.4-3.2-3.6.3-1.9 1.6-3.6 3.4-4.5L19.7 5Z" transform="scale(0.95) translate(0.5,0.5)" />
    </svg>
  );
}

const AVATAR_STYLES = [
  { background: "var(--accent)", color: "var(--accent-ink)" },
  { background: "var(--ink)", color: "#fff" },
  { background: "var(--surface-2)", color: "var(--ink)" },
];
function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Sparkle() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent-deep)" aria-hidden="true">
      <path d="M12 2c.7 5.4 2.7 7.4 8.1 9.5-5.4 2.1-7.4 4.1-8.1 9.5-.7-5.4-2.7-7.4-8.1-9.5C9.3 9.4 11.3 7.4 12 2Z" />
    </svg>
  );
}

function ReviewColumn({
  label,
  items,
  down,
  delay,
}: {
  label: string;
  items: Review[];
  down?: boolean;
  delay: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="tm-col tm-reveal" style={{ transitionDelay: delay }}>
      <p className="tm-col-label">
        <Sparkle />
        {label}
      </p>
      <div className="tm-marquee">
        <div className={down ? "tm-track tm-track-down" : "tm-track"}>
          {doubled.map((r, i) => (
            <div key={i} className="tm-review">
              <div className="tm-review-head">
                <span className="tm-avatar" style={AVATAR_STYLES[i % 3]} aria-hidden="true">
                  {initials(r.name)}
                </span>
                <span className="tm-review-who">
                  <strong>{r.name}</strong>
                  <span>{r.meta}</span>
                </span>
              </div>
              <QuoteMark />
              <p className="tm-review-quote">“{r.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FromTheLibrary({ lang }: { lang: Lang }) {
  const R = REVIEWS[lang];
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`section${on ? " tm-on" : ""}`} id="testimonials" ref={ref}>
      {/* ---- header ---- */}
      <div className="tm-head tm-reveal">
        <div className="tm-head-left">
          <SectionTag label={t(lang, "home.tm.tag")} />
          <h2>
            {t(lang, "home.tm.title1")}
            {t(lang, "home.tm.title2") && (
              <>
                <br />
                {t(lang, "home.tm.title2")}
              </>
            )}
          </h2>
        </div>
        <p className="tm-lede">{t(lang, "home.tm.lede")}</p>
      </div>

      <div className="tm-grid">
        {/* ---- left: teacher reviews, scrolling down ---- */}
        <ReviewColumn label={R.teachersLabel} items={R.teachers} down delay="120ms" />

        {/* ---- center: founder note ---- */}
        <article className="tm-founder tm-reveal" style={{ transitionDelay: "240ms" }}>
          <p className="tm-col-label">
            <Sparkle />
            {R.founderLabel}
          </p>
          <p className="tm-founder-note">“{R.founderNote}”</p>
          <div className="tm-founder-foot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="tm-founder-avatar" src="/images/founder.jpg" alt={R.founderName} loading="lazy" />
            <div>
              <strong>{R.founderName}</strong>
              <span>{R.founderRole}</span>
            </div>
          </div>
        </article>

        {/* ---- right: student reviews, scrolling up ---- */}
        <ReviewColumn label={R.studentsLabel} items={R.students} delay="360ms" />
      </div>
    </section>
  );
}
