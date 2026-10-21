"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { Cover } from "./covers";
import { creators, series } from "./data";
import { useMedia } from "./hooks";
import { Arrow, Eyebrow } from "./ui";

export function Creators() {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });

  const preview = hover === null ? null : series.find((s) => s.slug === creators[hover].series)!;

  return (
    <section
      id="creators"
      className="relative bg-paper px-5 py-24 md:px-12 md:py-36"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow n="05">Creators</Eyebrow>
            <h2 className="display mt-5 text-[clamp(52px,7vw,112px)]">
              The hands <span className="text-red">behind the red.</span>
            </h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-[1.6] text-ink/70">
            Sixty-two writers, artists and colourists across nine countries. They own their books outright. We just bring the ink.
          </p>
        </div>

        <ul className="mt-14 border-t-[2.5px] border-ink" onPointerLeave={() => setHover(null)}>
          {creators.map((c, i) => {
            const s = series.find((x) => x.slug === c.series)!;
            return (
              <motion.li
                key={c.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="border-b-[2.5px] border-ink"
              >
                <a
                  href="#issue-one"
                  onPointerEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 overflow-hidden py-5 md:grid-cols-[56px_1.4fr_1fr_1fr_auto] md:py-7"
                >
                  <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-red transition-transform duration-500 ease-[var(--ease-snap)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />
                  <span className="label numerals relative hidden pl-2 transition-colors group-hover:text-bone md:block">0{i + 1}</span>
                  <span className="display relative text-[clamp(36px,4.4vw,68px)] transition-[color,transform] duration-500 ease-[var(--ease-out)] group-hover:translate-x-3 group-hover:text-bone">
                    {c.name}
                  </span>
                  <span className="label relative col-start-1 text-ink/60 transition-colors group-hover:text-bone/80 md:col-start-auto">{c.role}</span>
                  <span className="relative hidden text-[15px] font-semibold transition-colors group-hover:text-bone md:block">
                    {s.title} <span className="label numerals ml-2 opacity-60">{c.issues} issues</span>
                  </span>
                  <span className="relative col-start-2 row-span-2 row-start-1 grid size-12 place-items-center rounded-full border-[2.5px] border-ink transition-colors group-hover:border-bone group-hover:bg-bone md:col-start-auto md:row-span-1 md:row-start-auto">
                    <Arrow className="size-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {fine && (
        <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-40">
          <AnimatePresence>
            {preview && (
              <motion.div
                key={preview.slug}
                initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="slab absolute left-6 top-[-140px] w-[200px] [--ct:26px] [--slab:6px]"
              >
                <Cover s={preview} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
