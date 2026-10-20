/**
 * FROM THE LIBRARY (home page, last section).
 * Adapted from a testimonials layout — but Thread Academy has no review
 * system, so nothing here is invented social proof: the left card shows
 * the library's real counts, the photo card quotes a real lesson, and
 * the marquee scrolls real lesson cards (title + the site's own topic
 * description), all computed from the content library on the server.
 * Motion is pure CSS (.tm-* in globals.css): a slow-spinning sparkle
 * badge and a seamless vertical marquee (list doubled, -50% loop).
 */
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";

export interface LibraryData {
  totalLessons: number;
  totalSubjects: number;
  totalChapters: number;
  totalLanguages: number;
  quote: { text: string; title: string; meta: string; href: string };
  cards: { title: string; desc: string; meta: string; glyph: string; href: string }[];
  learnHref: string;
}

function Sparkle() {
  return (
    <svg className="tm-spark" width="18" height="18" viewBox="0 0 24 24" fill="var(--ink)" aria-hidden="true">
      <path d="M12 0c.9 6.8 3.4 9.3 10.2 12C15.4 14.7 12.9 17.2 12 24c-.9-6.8-3.4-9.3-10.2-12C8.6 9.3 11.1 6.8 12 0Z" />
    </svg>
  );
}

function FeatureIcon({ kind }: { kind: "chapters" | "languages" | "ai" }) {
  if (kind === "chapters")
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    );
  if (kind === "languages")
    return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3Z" />
      </svg>
    );
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="var(--accent-deep)" aria-hidden="true">
      <path d="M12 2c.7 5.4 2.7 7.4 8.1 9.5-5.4 2.1-7.4 4.1-8.1 9.5-.7-5.4-2.7-7.4-8.1-9.5C9.3 9.4 11.3 7.4 12 2Z" />
    </svg>
  );
}

export default function FromTheLibrary({ lang, data }: { lang: Lang; data: LibraryData }) {
  const doubled = [...data.cards, ...data.cards];
  return (
    <section className="section" id="library">
      {/* ---- header ---- */}
      <div className="tm-head">
        <div className="tm-head-left">
          <div className="tm-tagrow">
            <span className="tm-badge">
              <Sparkle />
            </span>
            <span className="tm-pill">{t(lang, "home.tm.tag")}</span>
          </div>
          <h2>
            {t(lang, "home.tm.title1")}
            <br />
            {t(lang, "home.tm.title2")}
          </h2>
        </div>
        <p className="tm-lede">{t(lang, "home.tm.lede")}</p>
      </div>

      <div className="tm-grid">
        {/* ---- left: real counts + CTA ---- */}
        <article className="tm-card tm-stats">
          <div className="tm-stat-row">
            <div className="tm-stat-big">
              <strong>{data.totalLessons}</strong>
              <span>{t(lang, "home.tm.stat.unit")}</span>
            </div>
            <p>
              {t(lang, "home.tm.stat.text", { s: data.totalSubjects, n: data.totalLanguages })}
            </p>
          </div>
          <ul className="tm-features">
            <li>
              <FeatureIcon kind="chapters" />
              <span>{t(lang, "home.tm.f1", { c: data.totalChapters })}</span>
            </li>
            <li>
              <FeatureIcon kind="languages" />
              <span>{t(lang, "home.tm.f2")}</span>
            </li>
            <li>
              <FeatureIcon kind="ai" />
              <span>{t(lang, "home.tm.f3")}</span>
            </li>
          </ul>
          <div className="tm-cta">
            <p className="tm-cta-q">{t(lang, "home.tm.cta.q")}</p>
            <p className="tm-cta-a">{t(lang, "home.tm.cta.a")}</p>
            <div className="tm-cta-row">
              <Link href={data.learnHref} className="tm-btn">
                {t(lang, "home.tm.cta.btn")}
              </Link>
              <Link href={data.learnHref} className="tm-btn-round" aria-label={t(lang, "home.tm.cta.btn")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </Link>
            </div>
          </div>
        </article>

        {/* ---- center: photo + real lesson quote ---- */}
        <article className="tm-photo group">
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
            <span className="tm-quote">“{data.quote.text}”</span>
            <span className="tm-attrib">
              — {data.quote.title}, {data.quote.meta}
            </span>
          </Link>
        </article>

        {/* ---- right: marquee of real lessons ---- */}
        <div className="tm-marquee">
          <div className="tm-track">
            {doubled.map((c, i) => (
              <Link key={`${c.href}-${i}`} href={c.href} className="tm-review">
                <strong>{c.title}</strong>
                <p>“{c.desc}”</p>
                <span className="tm-review-meta">
                  <span className="tm-review-glyph" aria-hidden="true">{c.glyph}</span>
                  {c.meta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
