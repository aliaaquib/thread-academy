/**
 * FOUNDER NOTE (home page, last section). Written from Aaquib Ali's actual
 * position (founder; computer science & mathematics teacher), with his real
 * headshot. Client component for the scroll reveal (.tm-reveal / .tm-on).
 * Add reader quotes here only once they are real and collected with consent.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";

interface Founder {
  founderLabel: string;
  founderNote: string;
  founderName: string;
  founderRole: string;
}

const FOUNDER: Record<Lang, Founder> = {
  en: {
    founderLabel: "A note from the founder",
    founderNote:
      "I built Thread Academy for my own students first: one library where every lesson follows the one before it, in the language they think in. It worked in my classroom, so I opened it to everyone — free, in four languages, no account needed. If it helps your students the way it helps mine, it has done its job.",
    founderName: "Aaquib Ali",
    founderRole: "Founder — computer science & mathematics teacher",
  },
  tr: {
    founderLabel: "Kurucudan bir not",
    founderNote:
      "Thread Academy'yi önce kendi öğrencilerim için yaptım: her dersin bir öncekini izlediği, düşündükleri dilde tek bir kütüphane. Sınıfımda işe yaradı, ben de herkese açtım — ücretsiz, dört dilde, hesap gerekmeden. Öğrencilerinize benimkiler kadar faydası olursa, işini yapmış demektir.",
    founderName: "Aaquib Ali",
    founderRole: "Kurucu — bilgisayar bilimi ve matematik öğretmeni",
  },
  ru: {
    founderLabel: "Заметка основателя",
    founderNote:
      "Я создал Thread Academy сначала для своих учеников: одна библиотека, где каждый урок следует за предыдущим, на языке, на котором они думают. Это сработало в моём классе, и я открыл её для всех — бесплатно, на четырёх языках, без аккаунта. Если вашим ученикам она поможет так же, как моим, — она сделала своё дело.",
    founderName: "Aaquib Ali",
    founderRole: "Основатель — учитель информатики и математики",
  },
  ky: {
    founderLabel: "Негиздөөчүдөн кат",
    founderNote:
      "Thread Academy'ни адегенде өз окуучуларым үчүн түздүм: ар бир сабак мурункусунан кийин келген, алар ойлогон тилдеги бир китепкана. Классымда иштеди, ошондуктан баарына ачтым — акысыз, төрт тилде, аккаунтсуз. Окуучуларыңызга меникилердей пайдасы тийсе, ал өз ишин аткарды.",
    founderName: "Aaquib Ali",
    founderRole: "Негиздөөчү — информатика жана математика мугалими",
  },
};

function Sparkle() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent-deep)" aria-hidden="true">
      <path d="M12 2c.7 5.4 2.7 7.4 8.1 9.5-5.4 2.1-7.4 4.1-8.1 9.5-.7-5.4-2.7-7.4-8.1-9.5C9.3 9.4 11.3 7.4 12 2Z" />
    </svg>
  );
}

export default function FromTheLibrary({ lang }: { lang: Lang }) {
  const R = FOUNDER[lang];
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
    <section className={`section${on ? " tm-on" : ""}`} id="founder" ref={ref}>
      <article className="tm-founder tm-reveal">
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
    </section>
  );
}
