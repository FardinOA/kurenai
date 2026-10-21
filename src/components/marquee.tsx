"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { series } from "./data";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** A strip of printer's tape that idles along and surges with scroll speed. */
function Tape({ items, dir, className }: { items: string[]; dir: 1 | -1; className: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [5, 0, 5], { clamp: false });

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const step = dir * 1.6 * (delta / 1000) * (1 + boost.get());
    x.set(wrap(-50, 0, x.get() + step));
  });

  const translate = useTransform(x, (v) => `${v}%`);
  const run = [...items, ...items];

  return (
    <div className={`absolute left-[-5%] w-[110%] overflow-hidden border-y-[2.5px] border-ink py-3 ${className}`}>
      <motion.div style={{ x: translate }} className="flex w-max">
        {run.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="display flex shrink-0 items-center gap-6 pr-6 text-[clamp(34px,4.6vw,64px)] leading-none">
            {t}
            <span className="text-[0.5em] text-red">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  const titles = series.map((s) => s.title);
  return (
    <section aria-label="Now publishing" className="relative h-[200px] overflow-hidden bg-paper md:h-[260px]">
      <Tape items={["New issue every Friday", "14 original series", "100% creator-owned", "Printed in one crimson"]} dir={1} className="top-[56%] rotate-[2.5deg] bg-kaki text-ink" />
      <Tape items={titles} dir={-1} className="top-[22%] -rotate-[3deg] bg-bone text-ink shadow-[0_8px_0_rgb(29_21_23/0.08)]" />
    </section>
  );
}
