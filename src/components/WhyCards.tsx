/**
 * WHY THREAD ACADEMY cards (home page #why).
 * Four real features in rounded white cards: icon tile on the LEFT,
 * title + text on the right. Icons are the Lucide SVGs the founder
 * picked (route, languages, graduation-cap, lock-open) — note his
 * paste for card 3 repeated the languages icon, so card 3 uses
 * Lucide graduation-cap, the matching teacher icon. Animation:
 * cards fade + rise in a stagger, tiles pop with a spring, glyphs
 * float gently, hover lifts card + tile (CSS .why-* in globals.css,
 * switched on here when the grid scrolls into view; fallback timer
 * so cards never stay hidden). Reduced-motion disables it all.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";

function WhyIcon({ kind }: { kind: number }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === 1)
    // lucide-route
    return (
      <svg {...common}>
        <circle cx="6" cy="19" r="3" />
        <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
        <circle cx="18" cy="5" r="3" />
      </svg>
    );
  if (kind === 2)
    // lucide-languages
    return (
      <svg {...common}>
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </svg>
    );
  if (kind === 3)
    // lucide-graduation-cap (his paste repeated the languages icon)
    return (
      <svg {...common}>
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12.5V16c0 1.66 2.7 3 6 3s6-1.34 6-3v-3.5" />
        <path d="M22 10v6" />
      </svg>
    );
  // lucide-lock-open
  return (
    <svg {...common}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

export default function WhyCards({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fallback: never leave cards hidden if IO doesn't fire.
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
          <span className="why-ic" aria-hidden="true">
            <span className="why-ic-float" style={{ animationDelay: `${i * 0.7}s` }}>
              <WhyIcon kind={n} />
            </span>
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
