/**
 * TESTIMONIALS (home page, last section) — three columns:
 * teacher reviews marquee scrolling DOWN (left), a founder note
 * (center), student reviews marquee scrolling UP (right). Marquees
 * are CSS-only (.tm-track / .tm-track-down in globals.css; lists
 * doubled for a seamless -50% loop, pause on hover). Client
 * component for the scroll reveal (.tm-reveal / .tm-on).
 *
 * ⚠️ MOCK DATA: the teacher/student quotes are PLACEHOLDER copy
 * written for this layout — role-only attribution, no invented
 * names — to be replaced with real collected reviews. The founder
 * note is real: written from Aaquib Ali's actual position
 * (founder; computer science & mathematics teacher).
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";
import SectionTag from "./SectionTag";

interface Review {
  text: string;
  role: string;
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
      { text: "I plan my week straight from the chapter order — the lessons land in the sequence I would teach them.", role: "Computer Science teacher" },
      { text: "The worked examples do the heavy lifting. My students arrive at practice already understanding the idea.", role: "Mathematics teacher" },
      { text: "Having every lesson in four languages changed my classroom. Nobody is locked out by language anymore.", role: "Physics teacher" },
      { text: "It is the first resource I have used that feels written by someone who actually teaches.", role: "Biology teacher" },
      { text: "I send the link, they read ahead, and class time becomes discussion instead of dictation.", role: "English teacher" },
    ],
    students: [
      { text: "I finally get algebra. The examples show every step, not just the answer.", role: "Grade 9 student" },
      { text: "I read the lesson in Kyrgyz first, then in English. That is how I actually learn it.", role: "Grade 8 student" },
      { text: "The AI tutor answers my questions at midnight before an exam. Enough said.", role: "Grade 10 student" },
      { text: "Every lesson tells you what comes next, so studying never feels random.", role: "Grade 9 student" },
      { text: "It is free and there is no sign-up. I just open it and start.", role: "Grade 11 student" },
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
      { text: "Haftamı doğrudan bölüm sırasına göre planlıyorum — dersler tam benim anlatacağım sırayla geliyor.", role: "Bilgisayar bilimi öğretmeni" },
      { text: "Çözümlü örnekler işin büyüğünü yapıyor. Öğrencilerim fikri anlamış olarak alıştırmaya geliyor.", role: "Matematik öğretmeni" },
      { text: "Her dersin dört dilde olması sınıfımı değiştirdi. Artık kimse dil yüzünden dışarıda kalmıyor.", role: "Fizik öğretmeni" },
      { text: "Kullandığım kaynaklar arasında gerçekten öğreten biri tarafından yazılmış hissi veren ilk kaynak.", role: "Biyoloji öğretmeni" },
      { text: "Bağlantıyı gönderiyorum, önden okuyorlar; ders saati dikte yerine tartışmaya dönüşüyor.", role: "İngilizce öğretmeni" },
    ],
    students: [
      { text: "Cebiri sonunda anladım. Örnekler sadece cevabı değil, her adımı gösteriyor.", role: "9. sınıf öğrencisi" },
      { text: "Dersi önce Kırgızca, sonra İngilizce okuyorum. Gerçekten böyle öğreniyorum.", role: "8. sınıf öğrencisi" },
      { text: "Yapay zekâ öğretmen sınavdan önce gece yarısı sorularımı cevaplıyor. Başka söze gerek yok.", role: "10. sınıf öğrencisi" },
      { text: "Her ders sırada ne olduğunu söylüyor; çalışmak hiç rastgele hissettirmiyor.", role: "9. sınıf öğrencisi" },
      { text: "Ücretsiz ve kayıt yok. Açıp hemen başlıyorum.", role: "11. sınıf öğrencisi" },
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
      { text: "Я планирую неделю прямо по порядку глав — уроки идут в той последовательности, в которой я бы их преподавал.", role: "Учитель информатики" },
      { text: "Разобранные примеры делают основную работу. Ученики приходят к практике, уже понимая идею.", role: "Учитель математики" },
      { text: "Каждый урок на четырёх языках изменил мой класс. Язык больше никого не оставляет за бортом.", role: "Учитель физики" },
      { text: "Это первый ресурс, который ощущается написанным тем, кто действительно преподаёт.", role: "Учитель биологии" },
      { text: "Я отправляю ссылку, они читают заранее, и урок становится обсуждением, а не диктовкой.", role: "Учитель английского языка" },
    ],
    students: [
      { text: "Я наконец понял алгебру. В примерах показан каждый шаг, а не только ответ.", role: "Ученик 9 класса" },
      { text: "Читаю урок сначала на кыргызском, потом на английском. Так я действительно учу.", role: "Ученик 8 класса" },
      { text: "ИИ-репетитор отвечает на мои вопросы в полночь перед экзаменом. Этим всё сказано.", role: "Ученик 10 класса" },
      { text: "Каждый урок говорит, что будет дальше, поэтому учёба не кажется случайной.", role: "Ученик 9 класса" },
      { text: "Это бесплатно и без регистрации. Просто открываю и начинаю.", role: "Ученик 11 класса" },
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
      { text: "Жумамды түздөн-түз бөлүмдөрдүн ирети менен пландайм — сабактар мен окуткандай ирет менен келет.", role: "Информатика мугалими" },
      { text: "Иштелген мисалдар негизги ишти аткарат. Окуучуларым идеяны түшүнүп алып практикага келишет.", role: "Математика мугалими" },
      { text: "Ар бир сабактын төрт тилде болушу классымды өзгөрттү. Эми эч ким тилдин айынан четте калбайт.", role: "Физика мугалими" },
      { text: "Бул — чынында окуткан адам жазгандай сезилген биринчи ресурс.", role: "Биология мугалими" },
      { text: "Шилтемени жөнөтөм, алар алдын ала окушат, сабак убактысы диктант эмес, талкууга айланат.", role: "Англис тили мугалими" },
    ],
    students: [
      { text: "Алгебраны акыры түшүндүм. Мисалдар жоопту гана эмес, ар бир кадамды көрсөтөт.", role: "9-класстын окуучусу" },
      { text: "Сабакты адегенде кыргызча, анан англисче окуйм. Мен чындап ушинтип үйрөнөм.", role: "8-класстын окуучусу" },
      { text: "AI репетитор экзамен алдында түн ортосунда суроолорума жооп берет. Башка сөз керек эмес.", role: "10-класстын окуучусу" },
      { text: "Ар бир сабак кийинкиси эмне экенин айтат, ошондуктан окуу баш аламан сезилбейт.", role: "9-класстын окуучусу" },
      { text: "Акысыз жана каттоосуз. Жөн гана ачам да баштайм.", role: "11-класстын окуучусу" },
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
        <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent-deep)" aria-hidden="true">
          <path d="M12 2c.7 5.4 2.7 7.4 8.1 9.5-5.4 2.1-7.4 4.1-8.1 9.5-.7-5.4-2.7-7.4-8.1-9.5C9.3 9.4 11.3 7.4 12 2Z" />
        </svg>
        {label}
      </p>
      <div className="tm-marquee">
        <div className={down ? "tm-track tm-track-down" : "tm-track"}>
          {doubled.map((r, i) => (
            <div key={i} className="tm-review">
              <QuoteMark />
              <p className="tm-review-quote">“{r.text}”</p>
              <span className="tm-review-role">{r.role}</span>
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
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent-deep)" aria-hidden="true">
              <path d="M12 2c.7 5.4 2.7 7.4 8.1 9.5-5.4 2.1-7.4 4.1-8.1 9.5-.7-5.4-2.7-7.4-8.1-9.5C9.3 9.4 11.3 7.4 12 2Z" />
            </svg>
            {R.founderLabel}
          </p>
          <p className="tm-founder-note">“{R.founderNote}”</p>
          <div className="tm-founder-foot">
            <strong>{R.founderName}</strong>
            <span>{R.founderRole}</span>
          </div>
        </article>

        {/* ---- right: student reviews, scrolling up ---- */}
        <ReviewColumn label={R.studentsLabel} items={R.students} delay="360ms" />
      </div>
    </section>
  );
}
