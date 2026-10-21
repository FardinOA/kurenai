"use client";

import { motion, type MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Shogun } from "./character";
import { Button } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

/* Notches cut into the masthead, in % of the line box. Same crimson as the ground. */
const chips = [
  "M8 0 L12 0 L10 9Z",
  "M27 100 L33 100 L30 86Z",
  "M44 0 L47 0 L46 14Z",
  "M61 38 L64 33 L64 44Z",
  "M79 100 L84 100 L81 90Z",
  "M93 0 L97 0 L94 11Z",
  "M2 60 L5 55 L5 66Z",
  "M51 100 L54 100 L52 91Z",
];

const mastSize = "text-[23vw] md:text-[min(20.5vw,30svh)]";

function MastLine({ word, x, delay, slash = false }: { word: string; x: MotionValue<string>; delay: number; slash?: boolean }) {
  return (
    <motion.div style={{ x }} className="relative">
      <div className={`display flex leading-[0.82] ${mastSize}`}>
        {word.split("").map((ch, i) => (
          <span key={i} className="block overflow-hidden pt-[0.04em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ delay: delay + i * 0.05, duration: 1, ease }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </div>
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full fill-red">
        {chips.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
      {slash && (
        <motion.span
          aria-hidden
          className={`absolute left-[-4%] top-[50%] h-[0.045em] w-[108%] origin-left -rotate-[5deg] bg-red ${mastSize}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.9, duration: 0.45, ease: [0.7, 0, 0.15, 1] }}
        />
      )}
    </motion.div>
  );
}

/* A comic burst with a slightly uneven edge, like it was cut by hand. */
const burst = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
  const r = i % 2 ? 58 : 76 + ((i * 7) % 5) - 2;
  return `${(80 + Math.cos(a) * r).toFixed(1)},${(80 + Math.sin(a) * r).toFixed(1)}`;
}).join(" ");

function Burst() {
  return (
    <motion.a
      href="#issue-one"
      aria-label="Scarlet Shogun volume 3, out Friday. Read issue one free."
      className="relative grid size-[128px] place-items-center text-ink md:size-[156px]"
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: -8 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 14 }}
      whileHover={{ rotate: [-8, -2, -12, -6], transition: { duration: 0.5 } }}
    >
      <svg aria-hidden viewBox="0 0 160 160" className="absolute inset-0 size-full overflow-visible">
        <polygon points={burst} transform="translate(5 5)" fill="var(--ink)" />
        <polygon points={burst} fill="var(--kaki)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <span className="relative text-center">
        <span className="label block text-[10px]">New!</span>
        <span className="display block text-[30px] leading-[0.9] md:text-[36px]">Vol. 3</span>
        <span className="label block text-[10px]">Out Friday</span>
      </span>
    </motion.a>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const left = useTransform(p, [0, 1], ["0%", "-26%"]);
  const right = useTransform(p, [0, 1], ["0%", "26%"]);
  const figureY = useTransform(p, [0, 1], ["0%", "16%"]);
  const figureScale = useTransform(p, [0, 1], [1, 1.14]);
  const discScale = useTransform(p, [0, 1], [1, 1.5]);
  const fade = useTransform(p, [0, 0.45], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[620px] bg-paper p-2 md:p-3">
      <h1 className="sr-only">Kurenai Comics: visionary, creator-owned comics</h1>

      <div className="relative isolate size-full overflow-hidden border-[2.5px] border-ink bg-red text-bone">
        {/* Ben-Day sun behind everything. */}
        <motion.div
          aria-hidden
          style={{ scale: discScale }}
          className="halftone absolute left-1/2 top-[56%] -z-10 aspect-square w-[min(92vw,78svh)] -translate-x-1/2 -translate-y-1/2 rounded-full [--dot:color-mix(in_oklab,var(--deep)_70%,transparent)] [mask:radial-gradient(closest-side,#000_55%,transparent)]"
        />

        <div aria-hidden className="absolute inset-x-[4vw] top-[calc(84px+14svh)] md:inset-x-[5vw] md:top-[calc(88px+3svh)]">
          <div className="flex items-start justify-between">
            <MastLine word="Kurenai" x={left} delay={0.15} slash />
            <motion.p
              style={{ opacity: fade }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease }}
              className="kanji mt-[1vw] text-[clamp(18px,2.8vw,42px)] tracking-[0.18em] [writing-mode:vertical-rl]"
              lang="ja"
            >
              紅漫画社
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <motion.div
              style={{ opacity: fade }}
              initial={{ opacity: 0, rotate: -4, y: 16 }}
              animate={{ opacity: 1, rotate: -1.5, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease }}
              className="mb-[2vw] hidden max-w-[300px] border-[2.5px] border-ink bg-bone px-4 py-3 text-ink shadow-[4px_4px_0_var(--ink)] md:block"
            >
              <p className="label text-red">Osaka, 2019</p>
              <p className="mt-1.5 text-[14px] font-semibold leading-[1.45]">
                Three friends, a borrowed photocopier and a samurai story every publisher in Tokyo turned down.
              </p>
            </motion.div>
            <MastLine word="Comics" x={right} delay={0.35} />
          </div>
        </div>

        <motion.div style={{ y: figureY, scale: figureScale }} className="absolute bottom-0 left-1/2 z-10 h-[min(64svh,140vw)] origin-bottom -translate-x-1/2 md:h-[72svh]">
          <motion.div
            className="h-full"
            initial={{ y: "45%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.55, type: "spring", stiffness: 70, damping: 15 }}
          >
            <Shogun className="h-full w-auto" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease }}
          className="absolute bottom-5 left-4 z-20 md:bottom-8 md:left-8"
        >
          <p className="label mb-4 hidden md:block">14 series · 62 creators · one crimson</p>
          <Button href="#series" tone="bone">
            Explore the series
          </Button>
        </motion.div>

        <div className="absolute bottom-4 right-3 z-20 md:bottom-8 md:right-8">
          <Burst />
        </div>
      </div>
    </section>
  );
}
