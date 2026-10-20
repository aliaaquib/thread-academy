/**
 * FEATURES BENTO (home page, after the How It Works deck).
 * A bento grid of cards built from the academy's REAL content data — every
 * number is computed from the content library on the server and passed in
 * as props (chapter counts, category counts, lesson total, real lessons).
 * Nothing here is decorative filler data.
 * Cards: chapters-per-subject SVG chart · feature toggle list · subjects
 * donut · featured lesson · photo stat tile. Animations run once when the
 * grid scrolls into view (CSS transitions driven by an .inview class);
 * styled with the site's own tokens (.fb-* in globals.css).
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";

export interface BentoData {
  /** chapters per subject, in site order */
  chart: { label: string; value: number }[];
  totalChapters: number;
  totalSubjects: number;
  totalLessons: number;
  /** subjects per category: [stem, humanities, languages] counts + labels */
  donut: { label: string; count: number; color: string }[];
  featured: { title: string; meta: string; href: string; glyph: string };
  upNext: { title: string; meta: string; href: string };
  links: { curriculum: string; about: string; subjects: string };
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function CardFooter({ title, body, href, more }: { title: string; body: string; href: string; more: string }) {
  return (
    <div className="fb-footer">
      <h3>{title}</h3>
      <p>{body}</p>
      <Link href={href} className="fb-more">
        {more} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

/* ---- chart geometry: 13 points across 580×190, values scaled 5..14 ---- */
const CW = 580;
const CH = 190;
function chartPoints(chart: { label: string; value: number }[]) {
  const min = 5;
  const max = 14;
  return chart.map((d, i) => ({
    ...d,
    x: 24 + (i * (CW - 48)) / (chart.length - 1),
    y: CH - 26 - ((d.value - min) / (max - min)) * (CH - 70),
  }));
}
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x},${p2.y}`;
  }
  return d;
}

export default function FeaturesBento({ lang, data }: { lang: Lang; data: BentoData }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const pts = chartPoints(data.chart);
  const line = smoothPath(pts);
  const peak = pts.reduce((a, b) => (b.value > a.value ? b : a), pts[0]);

  /* donut math: r=65, circumference 2πr */
  const C = 2 * Math.PI * 65;
  const total = data.donut.reduce((s, d) => s + d.count, 0);
  let acc = 0;
  const arcs = data.donut.map((d) => {
    const frac = d.count / total;
    const seg = { ...d, frac, start: acc, len: frac * C };
    acc += frac;
    return seg;
  });

  const toggles = [
    { t: t(lang, "home.fb.auto.t1"), c: t(lang, "home.fb.auto.c1"), on: true },
    { t: t(lang, "home.fb.auto.t2"), c: t(lang, "home.fb.auto.c2"), on: true },
    { t: t(lang, "home.fb.auto.t3"), c: t(lang, "home.fb.auto.c3"), on: true },
    { t: t(lang, "home.fb.auto.t4"), c: t(lang, "home.fb.auto.c4"), on: false },
  ];

  return (
    <section className="section" id="features">
      <div className="section-head">
        <div>
          <div className="eyebrow">{t(lang, "home.fb.kicker")}</div>
          <h2>{t(lang, "home.fb.title")}</h2>
        </div>
        <Link href={data.links.curriculum} className="fb-cta">
          {t(lang, "home.fb.cta")} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div ref={ref} className={`fb-grid${inView ? " inview" : ""}`}>
        {/* ---- Chart card ---- */}
        <article className="fb-card fb-chart-card">
          <div className="fb-visual">
            <div className="fb-chart-top">
              <div>
                <span className="fb-label">{t(lang, "home.fb.chart.label")}</span>
                <strong className="fb-big">{data.totalChapters}</strong>
                <span className="fb-meta">{t(lang, "home.fb.chart.meta", { c: data.totalChapters, s: data.totalSubjects })}</span>
              </div>
            </div>
            <svg viewBox={`0 0 ${CW} ${CH}`} className="fb-svg" role="img" aria-label={t(lang, "home.fb.chart.label")}>
              {[30, 85, 140].map((y) => (
                <line key={y} x1="0" y1={y} x2={CW} y2={y} stroke="var(--line)" strokeWidth="1" />
              ))}
              <path d={line} fill="none" stroke="var(--accent-deep)" strokeWidth="2.5" pathLength={1} className="fb-line" />
              {pts.map((p, i) => (
                <g key={p.label} className="fb-point" style={{ transitionDelay: `${0.9 + i * 0.07}s` }}>
                  <circle cx={p.x} cy={p.y} r="4.5" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
                </g>
              ))}
              {peak && (
                <g className="fb-tip">
                  <rect x={Math.min(peak.x - 10, CW - 118)} y={Math.max(peak.y - 52, 2)} width="112" height="40" fill="var(--ink)" />
                  <text x={Math.min(peak.x - 10, CW - 118) + 12} y={Math.max(peak.y - 52, 2) + 17} fill="#fff" fontSize="12" fontWeight="700">
                    {peak.label}
                  </text>
                  <text x={Math.min(peak.x - 10, CW - 118) + 12} y={Math.max(peak.y - 52, 2) + 32} fill="var(--accent)" fontSize="11">
                    {peak.value}
                  </text>
                </g>
              )}
              {pts.map((p) => (
                <text key={`v-${p.label}`} x={p.x} y={p.y - 12} textAnchor="middle" fontSize="10" fill="var(--muted)" fontWeight="700">
                  {p.value}
                </text>
              ))}
            </svg>
          </div>
          <CardFooter
            title={t(lang, "home.fb.chart.title")}
            body={t(lang, "home.fb.chart.body")}
            href={data.links.curriculum}
            more={t(lang, "home.fb.chart.more")}
          />
        </article>

        {/* ---- Toggle card ---- */}
        <article className="fb-card">
          <div className="fb-visual">
            <ul className="fb-toggles">
              {toggles.map((row, i) => (
                <li key={row.t} className="fb-toggle-row" style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div>
                    <strong>{row.t}</strong>
                    <span>{row.c}</span>
                  </div>
                  <span className={`fb-switch${row.on ? " on" : ""}`} aria-hidden="true">
                    <span className="fb-knob" style={{ transitionDelay: `${0.3 + i * 0.12}s` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <CardFooter
            title={t(lang, "home.fb.auto.title")}
            body={t(lang, "home.fb.auto.body")}
            href={data.links.about}
            more={t(lang, "home.fb.auto.more")}
          />
        </article>

        {/* ---- Donut card ---- */}
        <article className="fb-card">
          <div className="fb-visual fb-donut-wrap">
            <svg viewBox="0 0 180 180" className="fb-donut" role="img" aria-label={t(lang, "home.fb.donut.title")}>
              <circle cx="90" cy="90" r="65" fill="none" stroke="var(--surface-2)" strokeWidth="20" />
              {arcs.map((a, i) => (
                <circle
                  key={a.label}
                  cx="90"
                  cy="90"
                  r="65"
                  fill="none"
                  stroke={a.color}
                  strokeWidth="20"
                  transform="rotate(-90 90 90)"
                  className="fb-arc"
                  style={
                    {
                      transitionDelay: `${i * 0.2}s`,
                      "--len": a.len,
                      "--gap": C - a.len,
                      "--off": -a.start * C,
                    } as React.CSSProperties
                  }
                />
              ))}
              <text x="90" y="86" textAnchor="middle" fontSize="26" fontWeight="800" fill="var(--ink)">
                {total}
              </text>
              <text x="90" y="106" textAnchor="middle" fontSize="10" fill="var(--muted)">
                {t(lang, "home.fb.donut.center")}
              </text>
            </svg>
            <ul className="fb-legend">
              {arcs.map((a) => (
                <li key={a.label}>
                  <span className="fb-dot" style={{ background: a.color }} aria-hidden="true" />
                  <strong>{a.count}</strong>
                  <span>{a.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <CardFooter
            title={t(lang, "home.fb.donut.title")}
            body={t(lang, "home.fb.donut.body")}
            href={data.links.subjects}
            more={t(lang, "home.fb.donut.more")}
          />
        </article>

        {/* ---- Featured lesson card ---- */}
        <article className="fb-card">
          <div className="fb-visual">
            <span className="fb-label">{t(lang, "home.fb.lesson.tag")}</span>
            <Link href={data.featured.href} className="fb-lesson">
              <span className="fb-lesson-glyph" aria-hidden="true">{data.featured.glyph}</span>
              <span>
                <strong>{data.featured.title}</strong>
                <span className="fb-meta">{data.featured.meta}</span>
              </span>
              <span className="fb-lesson-arrow" aria-hidden="true">→</span>
            </Link>
            <span className="fb-label">{t(lang, "home.fb.lesson.next")}</span>
            <Link href={data.upNext.href} className="fb-lesson alt">
              <span>
                <strong>{data.upNext.title}</strong>
                <span className="fb-meta">{data.upNext.meta}</span>
              </span>
              <span className="fb-lesson-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <CardFooter
            title={t(lang, "home.fb.lesson.title")}
            body={t(lang, "home.fb.lesson.body")}
            href={data.featured.href}
            more={t(lang, "home.fb.chart.more")}
          />
        </article>

        {/* ---- Photo stat tile ---- */}
        <article className="fb-stat">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
            alt=""
            loading="lazy"
          />
          <div className="fb-stat-overlay" aria-hidden="true" />
          <div className="fb-stat-text">
            <strong>{data.totalLessons}</strong>
            <p>{t(lang, "home.fb.stat.body")}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
