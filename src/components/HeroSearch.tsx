/**
 * HERO SEARCH — the big search field in the home page hero, under the
 * subtext, plus the quick links to popular lessons below it.
 * Submitting the field opens the site search overlay (via the search bus)
 * pre-filled with the typed query, where results live-filter — the same
 * overlay the nav search icon opens. Quick links follow the page language
 * and only include lessons that exist in it.
 */
"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { withLang, type Lang } from "@/lib/i18n";
import { t } from "@/lib/strings";
import { openSiteSearch } from "./search-bus";

export interface QuickLink {
  label: string;
  href: string;
}

export default function HeroSearch({ lang, links }: { lang: Lang; links: QuickLink[] }) {
  const [query, setQuery] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // The search bar is exactly as wide as the "Try:" quick-links row under
  // it — its length therefore varies with the labels (and the language).
  // Measured after layout (and again when fonts land / the window resizes);
  // if the row is wider than the hero, the bar simply stays full width.
  useLayoutEffect(() => {
    const sync = () => {
      const form = formRef.current;
      const row = linksRef.current;
      if (!form || !row) return;
      const w = row.offsetWidth;
      const parentW = form.parentElement?.clientWidth ?? 0;
      form.style.width = w > 0 && parentW > 0 && w < parentW ? `${w}px` : "";
    };
    sync();
    document.fonts?.ready.then(sync).catch(() => {});
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  });

  return (
    <>
      <form
        ref={formRef}
        className="search-wrap"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          openSiteSearch(query.trim());
        }}
      >
        <svg className="search-icon" width="24" height="24" viewBox="0 0 19 19" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="6.5" stroke="currentColor" strokeWidth="2" />
          <path d="M13.5 13.5L17.5 17.5" stroke="currentColor" strokeWidth="2" />
        </svg>
        <input
          className="hero-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t(lang, "search.placeholder")}
          aria-label={t(lang, "search.aria")}
        />
        <button className="search-submit" type="submit">
          {t(lang, "search.button")}
        </button>
      </form>
      {links.length > 0 && (
        <div className="quick-links" ref={linksRef}>
          <span>{t(lang, "hero.try")}</span>
          {links.map((l) => (
            <Link key={l.href} href={withLang(l.href, lang)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
