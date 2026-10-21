import type { AnchorHTMLAttributes, ReactNode } from "react";

/** The house hanko: a crimson seal stamped slightly off-square. */
export function Seal({ className = "size-9 text-[19px]", glyph = "紅" }: { className?: string; glyph?: string }) {
  return (
    <span aria-hidden className={`kanji inline-grid -rotate-3 place-items-center rounded-[4px] bg-red text-bone shadow-[inset_0_0_0_2px_var(--red),inset_0_0_0_3.5px_var(--bone)] ${className}`}>
      {glyph}
    </span>
  );
}

/** Section number and name, the margin note above every heading. */
export function Eyebrow({ n, children, className = "" }: { n: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span className="numerals">({n})</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      {children}
    </p>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className}>
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

type Tone = "ink" | "bone" | "red" | "kaki";

const tones: Record<Tone, string> = {
  ink: "bg-ink text-bone",
  bone: "bg-bone text-ink",
  red: "bg-red text-bone",
  kaki: "bg-kaki text-ink",
};

/** Comic-panel action: ink border, hard shadow, presses down when clicked. */
export function Button({
  children,
  tone = "ink",
  size = "md",
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { tone?: Tone; size?: "sm" | "md" }) {
  const sizing = size === "sm" ? "h-10 px-4 gap-2.5 [--slab:3px]" : "h-14 px-6 gap-4 [--slab:5px]";
  return (
    <a
      {...rest}
      className={`label slab slab-hover group inline-flex items-center whitespace-nowrap ${sizing} ${tones[tone]} ${className}`}
    >
      {children}
      <Arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
