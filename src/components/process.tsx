"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ShogunStages } from "./character";
import { steps } from "./data";
import { Eyebrow } from "./ui";

const stops = [0, 0.28, 0.52, 0.78];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => setActive(stops.findLastIndex((s) => v >= s)));

  const pencil = useTransform(p, [0.03, 0.26], [0, 1]);
  const ink = useTransform(p, [0.28, 0.5], [0, 1]);
  const colour = useTransform(p, [0.52, 0.76], [0, 1]);
  const bubble = useTransform(p, [0.8, 0.86], [0, 1]);
  const dots = useTransform(p, [0.78, 0.9], [0, 0.55]);
  const tilt = useTransform(p, [0.78, 0.92], [0, -2]);

  return (
    <section ref={ref} id="process" className="relative h-[420svh] bg-bone">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 pt-16 md:px-12">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-8 md:grid-cols-[1fr_minmax(0,1.05fr)] md:gap-16">
          <div className="order-2 md:order-1">
            <Eyebrow n="04">Process</Eyebrow>
            <h2 className="display mt-5 hidden text-[clamp(52px,6.4vw,104px)] md:block">
              From blank page <span className="text-red">to red ink.</span>
            </h2>

            <ol className="mt-10 hidden border-t-[2.5px] border-ink md:block">
              {steps.map((s, i) => (
                <li key={s.title} className="relative border-b-[2.5px] border-ink py-5">
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-full origin-left bg-red"
                    initial={false}
                    animate={{ scaleX: i === active ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.7, 0, 0.15, 1] }}
                  />
                  <div className={`relative grid grid-cols-[48px_1fr_auto] items-baseline gap-4 px-4 transition-colors duration-300 ${i === active ? "text-bone" : "text-ink"}`}>
                    <span className="label numerals">0{i + 1}</span>
                    <div>
                      <p className="display text-[34px]">{s.title}</p>
                      <AnimatePresence initial={false}>
                        {i === active && (
                          <motion.p
                            className="max-w-[44ch] overflow-hidden text-[15px] leading-[1.55]"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className="block pt-2">{s.body}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="kanji text-[22px]" lang="ja">
                      {s.kanji}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            {/* Compact caption for small screens. */}
            <div className="mt-4 md:hidden" aria-live="polite">
              <p className="display text-[44px]">
                <span className="text-red numerals">0{active + 1}</span> {steps[active].title}
              </p>
              <p className="mt-2 text-[15px] leading-[1.55] text-ink/80">{steps[active].body}</p>
            </div>
          </div>

          <motion.figure style={{ rotate: tilt }} className="order-1 mx-auto w-full max-w-[min(100%,58svh)] md:order-2 md:max-w-[min(100%,70svh)]">
            <div className="slab relative bg-[#fffaf2] [--slab:8px]">
              <div className="label flex items-center justify-between border-b-[2.5px] border-ink px-4 py-2.5">
                <span>Scarlet Shogun · p.07</span>
                <span className="kanji text-[15px] text-red" lang="ja">
                  {steps[active].kanji}
                </span>
              </div>
              <div className="relative aspect-[6/6.4] overflow-hidden">
                <motion.div
                  aria-hidden
                  style={{ opacity: dots }}
                  className="halftone absolute inset-0 [--dot:var(--red)] [mask:linear-gradient(200deg,#000,transparent_65%)]"
                />
                <ShogunStages pencil={pencil} ink={ink} colour={colour} className="absolute inset-x-0 bottom-0 mx-auto h-[94%]" />
                <motion.div
                  style={{ scale: bubble, opacity: bubble }}
                  className="absolute left-[5%] top-[7%] origin-bottom-right md:left-[6%]"
                >
                  <div className="relative border-[2.5px] border-ink bg-white px-4 py-3">
                    <p className="display text-[clamp(20px,2.2vw,30px)] leading-[0.95]">
                      Draw it like
                      <br />
                      it matters!
                    </p>
                    <svg aria-hidden viewBox="0 0 30 26" className="absolute -bottom-[23px] right-6 w-[30px]">
                      <path d="M0 0 L30 26 L22 0" fill="white" stroke="var(--ink)" strokeWidth="2.5" />
                      <path d="M1.5 -2 L21 -2" stroke="white" strokeWidth="4" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
            <figcaption className="label mt-5 flex justify-between text-ink/60">
              <span>Haru Kitagawa</span>
              <span className="hidden md:inline">{active === 3 ? "Page finished" : "Keep scrolling to finish the page"}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
