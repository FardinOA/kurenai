"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { tiers } from "./data";
import { Button, Eyebrow } from "./ui";

function Check() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="mt-[3px] size-4 shrink-0">
      <path d="M2.5 8.5 6 12l7.5-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    </svg>
  );
}

export function RedPass() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="red-pass"
      className="halftone relative overflow-hidden bg-red px-5 py-24 text-bone [--dot:color-mix(in_oklab,var(--deep)_45%,transparent)] md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow n="07">The Red Pass</Eyebrow>
            <h2 className="display mt-5 text-[clamp(52px,7vw,112px)]">
              Read everything.
              <br />
              <span className="text-ink">Own the ink.</span>
            </h2>
          </div>

          <div role="radiogroup" aria-label="Billing period" className="slab relative flex w-fit bg-bone p-1 text-ink [--slab:4px]">
            {[
              { v: false, label: "Monthly" },
              { v: true, label: "Yearly −20%" },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={yearly === o.v}
                onClick={() => setYearly(o.v)}
                className={`label relative h-10 px-5 transition-colors duration-300 ${yearly === o.v ? "text-bone" : ""}`}
              >
                {yearly === o.v && (
                  <motion.span layoutId="billing" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-7">
          {tiers.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 70, rotate: i === 1 ? 0 : i === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`slab relative flex flex-col p-7 text-ink [--slab:8px] md:p-8 ${t.featured ? "bg-kaki lg:-mt-6 lg:mb-6" : "bg-bone"}`}
            >
              {t.featured && (
                <span className="label absolute -top-4 right-6 rotate-3 border-[2.5px] border-ink bg-bone px-3 py-1.5">Most loved</span>
              )}
              <div className="flex items-start justify-between">
                <h3 className="display text-[44px]">{t.name}</h3>
                <span className="kanji grid size-12 place-items-center border-[2.5px] border-ink text-[24px]" lang="ja">
                  {t.kanji}
                </span>
              </div>
              <p className="mt-2 text-[15px] text-ink/75">{t.note}</p>

              <p className="mt-8 flex items-end gap-2 border-y-[2.5px] border-ink py-5">
                <span className="display numerals relative h-[88px] overflow-hidden text-[96px] leading-[0.92]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={String(yearly)}
                      className="block"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.45, ease: [0.7, 0, 0.15, 1] }}
                    >
                      ${yearly ? t.yearly : t.monthly}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="label mb-3 text-ink/70">/ {yearly ? "year" : "month"}</span>
              </p>

              <ul className="mt-6 grid gap-3 text-[15px]">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <Check />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <Button href="#issue-one" tone={t.featured ? "ink" : "red"} className="w-full justify-between">
                  Join as {t.name}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
