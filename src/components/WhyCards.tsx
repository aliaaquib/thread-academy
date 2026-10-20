/**
 * WHY THREAD ACADEMY cards (home page #why).
 * Four real features in rounded cards with proper line icons
 * (route, globe, graduation cap, open lock) in lime tiles.
 * Animation (CSS .why-* in globals.css, switched on here when the grid
 * scrolls into view): cards fade + rise in a stagger, icon tiles pop
 * with a spring curve, glyphs float gently, hover lifts the card.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";

function WhyIcon({ kind }: { kind: number }) {
  const common = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === 1)
    return (
      <svg {...common}>
        <circle cx="6" cy="19" r="3" />
        <circle cx="18" cy="5" r="3" />
        <path d="M9 19h6a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6" />
      </svg>
    );
  if (kind === 2)
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3Z" />
      </svg>
    );
  if (kind === 3)
    return (
      <svg {...common}>
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12.5V16c0 1.66 2.7 3 6 3s6-1.34 6-3v-3.5" />
        <path d="M22 10v6" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.8-1.3" />
      <circle cx="12" cy="16" r="1.4" fill="currentColor" stroke="none" />
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
