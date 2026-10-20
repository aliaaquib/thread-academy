/**
 * FROM THE LIBRARY — the home page's TESTIMONIAL section (last section).
 * Testimonial in layout only: Thread Academy has no review system and no
 * named reviewers to quote, so every "quote" here is a real line from a
 * real lesson (its own topic description), shown with the lesson it came
 * from and linking to it. The featured card quotes one lesson at large
 * size; the photo card carries that lesson's attribution; the right
 * column is a slow CSS marquee of quote cards (list doubled, -50% loop).
 * Data is computed from the content library on the server.
 * Client component only for the scroll reveal (.tm-reveal in
 * globals.css): columns fade + rise in a stagger when in view.
 */
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";
import SectionTag from "./SectionTag";

export interface LibraryData {
  quote: { text: string; title: string; meta: string; href: string };
  cards: { title: string; desc: string; meta: string; glyph: string; href: string }[];
}

function QuoteMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--accent-deep)" aria-hidden="true">
      <path d="M10.2 5C6.6 6.6 4.5 9.6 4.5 13.6c0 3 1.7 5 4.1 5 2.1 0 3.7-1.6 3.7-3.7 0-2-1.3-3.4-3.2-3.6.3-1.9 1.6-3.6 3.4-4.5L10.2 5Zm9.5 0c-3.6 1.6-5.7 4.6-5.7 8.6 0 3 1.7 5 4.1 5 2.1 0 3.7-1.6 3.7-3.7 0-2-1.3-3.4-3.2-3.6.3-1.9 1.6-3.6 3.4-4.5L19.7 5Z" transform="scale(0.95) translate(0.5,0.5)" />
    </svg>
  );
}

export default function FromTheLibrary({ lang, data }: { lang: Lang; data: LibraryData }) {
  const doubled = [...data.cards, ...data.cards];
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
    <section className={`section${on ? " tm-on" : ""}`} id="library" ref={ref}>
      {/* ---- header ---- */}
      <div className="tm-head tm-reveal">
        <div className="tm-head-left">
          <SectionTag label={t(lang, "home.tm.tag")} />
          <h2>
            {t(lang, "home.tm.title1")}
            <br />
            {t(lang, "home.tm.title2")}
          </h2>
        </div>
        <p className="tm-lede">{t(lang, "home.tm.lede")}</p>
      </div>

      <div className="tm-grid">
        {/* ---- left: featured quote ---- */}
        <article className="tm-card tm-featured tm-reveal" style={{ transitionDelay: "120ms" }}>
          <QuoteMark size={40} />
          <blockquote className="tm-featured-quote">“{data.quote.text}”</blockquote>
          <div className="tm-featured-foot">
            <p className="tm-featured-attrib">
              {data.quote.title}
              <span>{data.quote.meta}</span>
            </p>
            <p className="tm-note">{t(lang, "home.tm.note")}</p>
            <Link href={data.quote.href} className="inline-link">
              {t(lang, "home.tm.read")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>

        {/* ---- center: photo + attribution of the featured lesson ---- */}
        <article className="tm-photo group tm-reveal" style={{ transitionDelay: "240ms" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop"
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="tm-photo-gradient" aria-hidden="true" />
          <Link href={data.quote.href} className="tm-photo-caption">
            <span className="tm-quote-tag">{t(lang, "home.tm.quote.tag")}</span>
            <span className="tm-quote">{data.quote.title}</span>
            <span className="tm-attrib">{data.quote.meta}</span>
          </Link>
        </article>

        {/* ---- right: marquee of quote cards ---- */}
        <div className="tm-marquee tm-reveal" style={{ transitionDelay: "360ms" }}>
          <div className="tm-track">
            {doubled.map((c, i) => (
              <Link key={`${c.href}-${i}`} href={c.href} className="tm-review">
                <QuoteMark size={18} />
                <p className="tm-review-quote">“{c.desc}”</p>
                <span className="tm-review-meta">
                  <span className="tm-review-glyph" aria-hidden="true">{c.glyph}</span>
                  <span>
                    <strong>{c.title}</strong> · {c.meta}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
