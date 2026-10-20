/**
 * WHY THREAD ACADEMY cards (home page #why).
 * Four real features in rounded white cards: icon tile on the LEFT,
 * title + text on the right. Icons are bold stroke SVGs (36px) that
 * spin slowly like the section sparkle (.wic-spin-a clockwise,
 * .wic-spin-b counter-clockwise, alternating per card). They
 * draw in fast when the grid scrolls into view (.dr paths use
 * pathLength=1 dash animation; .fd shapes fade), with a fallback
 * timer so they can never stay hidden. Continuous icon animation:
 * a dot travels the route (SMIL animateMotion), the globe meridian
 * spins (SMIL rx), the cap tassel swings and the lock shackle
 * bounces (CSS). Cards fade + rise in a stagger; hover lifts card
 * + tile. CSS in globals.css (.why-*); reduced-motion disables it.
 */
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";

const ROUTE_PATH = "M5 16.2V11a3 3 0 0 1 3-3h5a3 3 0 0 0 3 3v.2";

function WhyIcon({ kind, spin }: { kind: number; spin: string }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === 1)
    // Clear structure — bold route from a start dot up to a pin,
    // with a dot that keeps travelling the path.
    return (
      <svg {...common} className={spin}>
        <circle className="fd" cx="5" cy="18.7" r="2.3" />
        <path className="dr" pathLength={1} d={ROUTE_PATH} />
        <g className="wic-pin">
          <path className="dr" pathLength={1} d="M16 1.8a3.3 3.3 0 0 1 3.3 3.3c0 2.2-3.3 5.5-3.3 5.5s-3.3-3.3-3.3-5.5A3.3 3.3 0 0 1 16 1.8Z" />
          <circle className="fd" cx="16" cy="5.1" r="1.2" />
        </g>
        <circle r="1.9" fill="currentColor" stroke="none">
          <animateMotion dur="3.4s" repeatCount="indefinite" path={ROUTE_PATH} />
        </circle>
      </svg>
    );
  if (kind === 2)
    // Four languages — globe whose meridian spins (rx oscillation).
    return (
      <svg {...common} className={spin}>
        <circle className="fd" cx="12" cy="12" r="8.8" />
        <ellipse className="fd" cx="12" cy="12" rx="4" ry="8.8">
          <animate attributeName="rx" values="4;8.6;4;0.8;4" keyTimes="0;0.25;0.5;0.75;1" dur="7s" repeatCount="indefinite" />
        </ellipse>
        <path className="dr" pathLength={1} d="M4.1 9.2h15.8" />
        <path className="dr" pathLength={1} d="M4.1 14.8h15.8" />
      </svg>
    );
  if (kind === 3)
    // Built by a teacher — graduation cap, tassel swinging.
    return (
      <svg {...common} className={spin}>
        <path className="dr" pathLength={1} d="M2.5 9.8 12 5l9.5 4.8L12 14.6Z" />
        <path className="dr" pathLength={1} d="M6.2 12.3v3.3c0 1.7 2.6 3 5.8 3s5.8-1.3 5.8-3v-3.3" />
        <g className="wic-tassel">
          <path className="dr" pathLength={1} d="M21.5 9.8v4.4" />
          <circle className="fd" cx="21.5" cy="15.9" r="1.4" />
        </g>
      </svg>
    );
  // Free, no account — open padlock, shackle bouncing.
  return (
    <svg {...common} className={spin}>
      <rect className="fd" x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
      <path className="dr wic-shackle" pathLength={1} d="M8 10.5V7.2a4.2 4.2 0 0 1 7.9-1.9" />
      <circle className="fd" cx="15.9" cy="5.3" r="0.9" fill="currentColor" stroke="none" />
      <circle className="fd" cx="12" cy="14.2" r="1.6" fill="currentColor" stroke="none" />
      <path className="dr" pathLength={1} d="M12 15.6v1.7" />
    </svg>
  );
}

export default function WhyCards({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fallback: never leave cards/icons hidden if IO doesn't fire.
    const fb = setTimeout(() => setOn(true), 1600);
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
    return () => {
      clearTimeout(fb);
      io.disconnect();
    };
  }, []);

  return (
    <div className={`why-grid${on ? " in" : ""}`} ref={ref}>
      {[1, 2, 3, 4].map((n, i) => (
        <article key={n} className="why-card" style={{ transitionDelay: `${i * 120}ms` }}>
          <span
            className="why-ic"
            aria-hidden="true"
            style={{ "--dr-delay": `${0.25 + i * 0.1}s` } as CSSProperties}
          >
            <WhyIcon kind={n} spin={i % 2 === 0 ? "wic-spin-a" : "wic-spin-b"} />
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
