/**
 * WHY THREAD ACADEMY cards (home page #why).
 * Four real features in rounded white cards: icon tile on the LEFT,
 * title + text on the right. Icons are detailed stroke SVGs that
 * DRAW themselves in when the grid scrolls into view (.dr paths use
 * pathLength=1 dash animation; .fd shapes fade), then idle with a
 * per-icon motion (pin bounce, globe rock, tassel swing, shackle
 * lift). Cards fade + rise in a stagger; hover lifts card + tile.
 * All CSS lives in globals.css (.why-*); reduced-motion disables it.
 */
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";

function WhyIcon({ kind }: { kind: number }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === 1)
    // Clear structure — a route that winds up to a destination pin.
    return (
      <svg {...common}>
        <circle className="fd" cx="5.5" cy="18" r="2.2" />
        <path className="dr" pathLength={1} d="M5.5 15.5c0-4.3 2.5-5 5.5-5h2.5c2.8 0 4-1.2 4-3.4" />
        <g className="wic-pin">
          <path className="dr" pathLength={1} d="M17.5 2.6a3 3 0 0 1 3 3c0 2.1-3 5.2-3 5.2s-3-3.1-3-5.2a3 3 0 0 1 3-3Z" />
          <circle className="fd" cx="17.5" cy="5.6" r="1.1" />
        </g>
      </svg>
    );
  if (kind === 2)
    // Four languages — a globe with meridians and parallels.
    return (
      <svg {...common}>
        <g className="wic-globe">
          <circle className="fd" cx="12" cy="12" r="8.8" />
          <path className="dr" pathLength={1} d="M12 3.2c2.4 2.5 3.7 5.5 3.7 8.8s-1.3 6.3-3.7 8.8c-2.4-2.5-3.7-5.5-3.7-8.8S9.6 5.7 12 3.2Z" />
          <path className="dr" pathLength={1} d="M12 3.2c1.2 2.5 1.8 5.5 1.8 8.8s-.6 6.3-1.8 8.8c-1.2-2.5-1.8-5.5-1.8-8.8S10.8 5.7 12 3.2Z" />
          <path className="dr" pathLength={1} d="M4.1 9.2h15.8" />
          <path className="dr" pathLength={1} d="M4.1 14.8h15.8" />
        </g>
      </svg>
    );
  if (kind === 3)
    // Built by a teacher — graduation cap with a swinging tassel.
    return (
      <svg {...common}>
        <path className="dr" pathLength={1} d="M2.5 9.8 12 5l9.5 4.8L12 14.6Z" />
        <path className="dr" pathLength={1} d="M6.2 12.3v3.3c0 1.7 2.6 3 5.8 3s5.8-1.3 5.8-3v-3.3" />
        <g className="wic-tassel">
          <path className="dr" pathLength={1} d="M21.5 9.8v4.4" />
          <circle className="fd" cx="21.5" cy="15.9" r="1.3" />
        </g>
      </svg>
    );
  // Free, no account — an open padlock with keyhole.
  return (
    <svg {...common}>
      <rect className="fd" x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
      <path className="dr wic-shackle" pathLength={1} d="M8 10.5V7.2a4.2 4.2 0 0 1 7.9-1.9" />
      <circle className="fd" cx="15.9" cy="5.3" r="0.9" fill="currentColor" stroke="none" />
      <circle className="fd" cx="12" cy="14.2" r="1.5" fill="currentColor" stroke="none" />
      <path className="dr" pathLength={1} d="M12 15.4v1.9" />
    </svg>
  );
}

export default function WhyCards({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`why-grid${on ? " in" : ""}`} ref={ref}>
      {[1, 2, 3, 4].map((n, i) => (
        <article key={n} className="why-card" style={{ transitionDelay: `${i * 120}ms` }}>
          <span
            className="why-ic"
            aria-hidden="true"
            style={{ "--dr-delay": `${0.45 + i * 0.15}s` } as CSSProperties}
          >
            <WhyIcon kind={n} />
          </span>
          <div className="why-card-text">
            <h3>{t(lang, `home.why.${n}.t`)}</h3>
            <p>{t(lang, `home.why.${n}.d`)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
