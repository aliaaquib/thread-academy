/**
 * SECTION TAG — the rotating sparkle badge + pill label that heads every
 * home page section (hero, curricula, subjects, why, how, the deck, and
 * From the Library). The sparkle spins slowly via CSS (.stag-* in
 * globals.css); the pill carries the section's name.
 */
export default function SectionTag({ label }: { label: string }) {
  return (
    <div className="stag-row">
      <span className="stag-badge">
        <svg className="stag-spark" width="18" height="18" viewBox="0 0 24 24" fill="var(--ink)" aria-hidden="true">
          <path d="M12 0c.9 6.8 3.4 9.3 10.2 12C15.4 14.7 12.9 17.2 12 24c-.9-6.8-3.4-9.3-10.2-12C8.6 9.3 11.1 6.8 12 0Z" />
        </svg>
      </span>
      <span className="stag-pill">{label}</span>
    </div>
  );
}
