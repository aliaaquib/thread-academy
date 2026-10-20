/**
 * STATS & NUMBERS (home page, after From the Library).
 * Adapted from a stats + CTA layout — but every figure is REAL, computed
 * from the content library on the server (no invented brand metrics, no
 * stock-photo "social proof": the avatar stack is subject glyphs).
 * Left: tag, serif headline, lede, CTAs, glyph stack. Right: one wide
 * metric card over two half cards, oversized light numerals.
 * Reveals are CSS transitions (.st-* in globals.css) switched on by an
 * IntersectionObserver when the section scrolls into view.
 */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";
import SectionTag from "./SectionTag";

export interface StatsData {
  lessons: number;
  chapters: number;
  languages: number;
  subjects: number;
  learnHref: string;
}

function CardIcon({ kind }: { kind: "book" | "layers" | "globe" }) {
  if (kind === "book")
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
        <path d="M4 20.5V5.5M20 18H6.5" />
      </svg>
    );
  if (kind === "layers")
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5" />
      </svg>
    );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

const STACK = ["x²", "DNA", "</>", "A", "∑"];

export default function StatsNumbers({ lang, data }: { lang: Lang; data: StatsData }) {
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
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`section${on ? " st-on" : ""}`} id="numbers" ref={ref}>
      <div className="st-grid">
        {/* ---- left: headline, CTAs, glyph stack ---- */}
        <div className="st-left">
          <div className="st-reveal" style={{ transitionDelay: "0ms" }}>
            <SectionTag label={t(lang, "home.st.tag")} />
          </div>
          <h2 className="st-reveal" style={{ transitionDelay: "80ms" }}>
            {t(lang, "home.st.title1")}
            <br />
            {t(lang, "home.st.title2")}
          </h2>
          <p className="st-lede st-reveal" style={{ transitionDelay: "160ms" }}>
            {t(lang, "home.st.lede")}
          </p>
          <div className="st-btns st-reveal" style={{ transitionDelay: "240ms" }}>
            <Link href={data.learnHref} className="st-btn1">
              <span className="st-btn1-circle" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M0.35 10 9.85 0.5M9.85 0.5V8.5M9.85 0.5H1.85" stroke="var(--accent-ink)" strokeWidth="1.4" />
                </svg>
              </span>
              {t(lang, "home.tm.cta.btn")}
            </Link>
            <a href="#subjects" className="st-btn2">
              {t(lang, "home.st.btn2")}
            </a>
          </div>
          <div className="st-proof st-reveal" style={{ transitionDelay: "320ms" }}>
            <span className="st-stack" aria-hidden="true">
              {STACK.map((g, i) => (
                <span key={g} className={i % 2 ? "alt" : undefined}>{g}</span>
              ))}
            </span>
            <p>{t(lang, "home.st.proof", { s: data.subjects, n: data.languages })}</p>
          </div>
        </div>

        {/* ---- right: real metric cards ---- */}
        <div className="st-cards">
          <article className="st-card st-reveal st-scale" style={{ transitionDelay: "200ms" }}>
            <div className="st-card-head">
              <CardIcon kind="book" />
              <span>{t(lang, "home.tm.stat.unit")}</span>
            </div>
            <div className="st-num">{data.lessons}</div>
            <p className="st-cap">{t(lang, "home.st.c1.cap")}</p>
          </article>
          <div className="st-row2">
            <article className="st-card st-reveal st-scale" style={{ transitionDelay: "320ms" }}>
              <div className="st-card-head">
                <CardIcon kind="layers" />
                <span>{t(lang, "home.st.c2.label")}</span>
              </div>
              <div className="st-num">{data.chapters}</div>
              <p className="st-cap">{t(lang, "home.st.c2.cap")}</p>
            </article>
            <article className="st-card st-reveal st-scale" style={{ transitionDelay: "440ms" }}>
              <div className="st-card-head">
                <CardIcon kind="globe" />
                <span>{t(lang, "home.st.c3.label")}</span>
              </div>
              <div className="st-num">{data.languages}</div>
              <p className="st-cap">{t(lang, "home.st.c3.cap")}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
