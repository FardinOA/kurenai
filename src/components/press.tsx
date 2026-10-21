"use client";

import { motion, type MotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { shapes, type Tone, tones } from "./character";
import { plates } from "./data";
import { useMedia } from "./hooks";
import { Eyebrow, Seal } from "./ui";

/*
  The Scarlet Shogun poster separated into the three plates it is printed
  from. Each plate prints only its own tones and knocks out everything
  above it in white, so multiplied together on paper they rebuild the
  full image, and slightly off-register they show the overprint.
*/

const plateOf: Record<Tone, number> = {
  ink: 0,
  red: 1,
  deep: 1,
  skin: 2,
  shade: 2,
  dusk: 2,
  crown: 2,
  crownShade: 2,
  bone: 2,
};

const markColour = ["var(--ink)", "var(--red)", "#d98a6f"];

function Plate({ n }: { n: number }) {
  const paint = (tone: Tone) => (plateOf[tone] === n ? tones[tone] : "#fff");
  return (
    <svg aria-hidden viewBox="-40 -40 680 880" className="size-full overflow-visible">
      <rect width="600" height="800" fill={paint("red")} />
      <circle cx="300" cy="330" r="200" fill={paint("bone")} />
      <text x="300" y="104" textAnchor="middle" fontSize="88" fill={paint("bone")} style={{ fontFamily: "var(--font-anton)" }}>
        SCARLET SHOGUN
      </text>
      <text x="548" y="168" textAnchor="middle" fontSize="44" fill={paint("ink")} style={{ fontFamily: '"Shippori Mincho B1", serif', fontWeight: 800 }}>
        将
      </text>
      <g transform="translate(0 100)">
        {shapes.map((s, i) =>
          s.stroke ? (
            <path key={i} d={s.d} fill="none" stroke={paint(s.tone)} strokeWidth={s.stroke} strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path key={i} d={s.d} fill={paint(s.tone)} />
          ),
        )}
      </g>
      <g fill="none" stroke={markColour[n]} strokeWidth="2">
        {[
          [-22, -22],
          [622, -22],
          [-22, 822],
          [622, 822],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="9" />
            <path d={`M${x - 16} ${y} H${x + 16} M${x} ${y - 16} V${y + 16}`} />
          </g>
        ))}
      </g>
    </svg>
  );
}

const fan = [
  { from: -1, range: [0.4, 0.74], rotate: -7, lift: -0.06 },
  { from: 0, range: [0.24, 0.58], rotate: 4, lift: 0.04 },
  { from: 1, range: [0.08, 0.42], rotate: 8, lift: -0.02 },
];

function MovingPlate({ n, p, spread }: { n: number; p: MotionValue<number>; spread: number }) {
  const f = fan[n];
  const x = useTransform(p, f.range, [`${f.from * spread * 100}%`, "0%"]);
  const y = useTransform(p, f.range, [`${f.lift * 100}%`, "0%"]);
  const rotate = useTransform(p, f.range, [f.rotate, 0]);
  const label = useTransform(p, [f.range[0], f.range[0] + 0.1], [1, 0]);
  return (
    <motion.div style={{ x, y, rotate, zIndex: 3 - n }} className="absolute inset-0 mix-blend-multiply">
      <Plate n={n} />
      <motion.p style={{ opacity: label }} className="label absolute -top-8 left-0 right-0 text-center">
        <span className="numerals">0{n + 1}</span> · {plates[n].name}
      </motion.p>
    </motion.div>
  );
}

export function Press() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useMedia("(min-width: 900px)", true);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [landed, setLanded] = useState(0);

  useMotionValueEvent(p, "change", (v) => setLanded(fan.filter((f) => v >= f.range[1]).length));

  const stampScale = useTransform(p, [0.8, 0.86], [2.4, 1]);
  const stampOpacity = useTransform(p, [0.8, 0.83], [0, 1]);

  return (
    <section ref={ref} id="press" className="relative h-[380svh] bg-paper">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-24 md:px-12 md:pb-10">
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow n="06">Off the press</Eyebrow>
            <h2 className="display mt-4 text-[clamp(44px,5.4vw,88px)]">
              Three plates. <span className="text-red">One pull.</span>
            </h2>
          </div>
          <p className="hidden max-w-[40ch] text-[15px] leading-[1.6] text-ink/75 md:block">
            Collector issues are printed in three passes on a 1960s platen press in Osaka. Scroll to line the plates up.
          </p>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <div className="relative isolate aspect-[680/880] h-[min(54svh,104vw)] max-h-full">
            <div aria-hidden className="absolute inset-x-[5.9%] inset-y-[4.5%] bg-white shadow-[8px_8px_0_rgb(29_21_23/0.12)]" />
            {[2, 1, 0].map((n) => (
              <MovingPlate key={n} n={n} p={p} spread={desktop ? 1.15 : 0.55} />
            ))}
            <motion.div style={{ scale: stampScale, opacity: stampOpacity }} className="absolute -right-6 bottom-[8%] z-10 rotate-[-12deg] md:-right-10">
              <Seal className="size-16 text-[34px] shadow-[inset_0_0_0_3px_var(--red),inset_0_0_0_6px_var(--bone)] md:size-20 md:text-[44px]" />
            </motion.div>
            <motion.p style={{ opacity: stampOpacity }} className="label absolute -bottom-7 left-0 right-0 text-center text-ink/60">
              Edition of 2,000 · pulled by hand
            </motion.p>
          </div>
        </div>

        <ol className="relative z-10 grid grid-cols-3 gap-3 md:gap-6">
          {plates.map((pl, i) => {
            const on = landed > 2 - i;
            return (
              <li key={pl.name} className={`flex items-start gap-2 border-t-[2.5px] md:gap-3 pt-3 transition-colors duration-300 ${on ? "border-ink" : "border-ink/20"}`}>
                <span aria-hidden className="mt-0.5 size-3 shrink-0 border-2 md:mt-1 md:size-4 border-ink transition-transform duration-300" style={{ background: on ? pl.colour : "transparent" }} />
                <p className="text-[14px] leading-[1.45]">
                  <span className="label block whitespace-nowrap">
                    <span className="hidden md:inline">Plate </span>
                    <span className="numerals">0{i + 1}</span> · {pl.name} {on && <span className="hidden text-red md:inline">· registered</span>}
                  </span>
                  <span className="hidden text-ink/70 md:block">{pl.note}</span>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
