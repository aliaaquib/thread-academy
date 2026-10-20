/**
 * FEATURES SPLIT (home page, after the features bento).
 * Two-column: a left bento of visuals (hero card with a mock lesson
 * browser window, a black principle card, a classroom photo) and a
 * right headline + checklist + buttons. All links are real
 * (/cambridge, #subjects, #how-it-works); the "testimonial" slot is
 * deliberately the academy's own stated principle — not a made-up
 * person. Server component; hover effects in CSS (.fs-*).
 */
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";

export interface SplitData {
  lesson: { title: string; subjectName: string; chapterTitle: string; href: string; glyph: string };
  links: { learn: string; how: string };
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function FeaturesSplit({ lang, data }: { lang: Lang; data: SplitData }) {
  return (
    <section className="fs-section">
      <div className="fs-inner">
        {/* -------- left: visual bento -------- */}
        <div className="fs-visuals">
          <div className="fs-hero group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2400&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
            <div className="fs-browser">
              <div className="fs-chrome">
                <span style={{ background: "#a63a35" }} />
                <span style={{ background: "#b8a800" }} />
                <span style={{ background: "var(--success)" }} />
              </div>
              <div className="fs-mock">
                <div className="fs-mock-kicker">
                  {t(lang, "home.fs.mocklabel")} · {data.lesson.subjectName} · {data.lesson.chapterTitle}
                </div>
                <div className="fs-mock-title">{data.lesson.title}</div>
                <div className="fs-mock-line" />
                <div className="fs-mock-line short" />
                <div className="fs-mock-example">
                  <span className="fs-mock-example-tag">{t(lang, "home.hiw.2.example")}</span>
                  <div className="fs-mock-line accent-line" />
                </div>
              </div>
            </div>
          </div>

          <div className="fs-black">
            <p className="fs-quote">“{t(lang, "home.why.title")}”</p>
            <p className="fs-quote-sub">{t(lang, "home.why.copy")}</p>
            <p className="fs-attrib">{t(lang, "home.fs.principle")}</p>
          </div>

          <div className="fs-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        {/* -------- right: content -------- */}
        <div className="fs-content">
          <h2>
            {t(lang, "home.fs.l1")}
            <br />
            {t(lang, "home.fs.l2")}
            <br />
            {t(lang, "home.fs.l3")}
          </h2>
          <p>{t(lang, "home.fs.body")}</p>
          <div className="fs-buttons">
            <Link href={data.links.learn} className="fs-primary">
              {t(lang, "home.fs.cta1")}
              <span className="fs-chip" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171914" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link href={data.links.how} className="fs-secondary">
              {t(lang, "home.fs.cta2")}
            </Link>
          </div>
          <ul className="fs-checklist">
            {[t(lang, "home.fs.check1"), t(lang, "home.fs.check2"), t(lang, "home.fs.check3")].map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
