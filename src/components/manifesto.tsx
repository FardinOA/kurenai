"use client";

import { animate, motion, type MotionValue, useInView, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { Cover } from "./covers";
import { series } from "./data";
import { Eyebrow, Seal } from "./ui";

type Token = string | { node: ReactNode; key: string };

const text: Token[] = [
  ..."We publish comics the way".split(" "),
  { key: "seal", node: <Seal className="size-[1.6em] translate-y-[0.1em] text-[0.55em]" /> },
  ..."woodblock printers carved: one deliberate line at a time. No algorithm picks the ending. No committee softens the blow. Just".split(" "),
  {
    key: "cover",
    node: (
      <span className="-my-[0.6em] inline-block w-[1.05em] translate-y-[0.1em] -rotate-6 align-middle border-2 border-ink shadow-[3px_3px_0_var(--ink)]">
        <Cover s={series[0]} bare />
      </span>
    ),
  },
  ..."artists with something to say, and the nerve to say it in".split(" "),
  { key: "red", node: <span className="text-red">red.</span> },
];

function Word({ p, range, children }: { p: MotionValue<number>; range: [number, number]; children: ReactNode }) {
  const opacity = useTransform(p, range, [0.12, 1]);
  const y = useTransform(p, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.24em] inline-block">
      {children}
    </motion.span>
  );
}

function Count({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = v.toFixed(decimals) + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix, decimals]);
  return (
    <span ref={ref} className="numerals">
      {to.toFixed(decimals) + suffix}
    </span>
  );
}

const stats = [
  { to: 14, label: "Original series in print" },
  { to: 62, label: "Creators, all keeping their rights" },
  { to: 1.2, suffix: "M", decimals: 1, label: "Readers every month" },
  { to: 9, label: "Award nominations, so far" },
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const n = text.length;

  return (
    <section id="manifesto" className="bg-paper px-5 pb-24 pt-16 md:px-12 md:pb-36 md:pt-24">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Eyebrow n="01">Manifesto</Eyebrow>
          <p className="max-w-[34ch] text-[15px] leading-[1.6] text-ink/70">
            Kurenai began as a photocopied zine in an Osaka laundromat. Today it is a house of fourteen series, and we still print every one in a single spot of crimson.
          </p>
        </div>

        <div ref={ref} className="text-[clamp(30px,4.3vw,64px)] font-semibold leading-[1.08] tracking-[-0.025em] [font-stretch:92%]">
          {text.map((t, i) => (
            <Word key={typeof t === "string" ? `${t}-${i}` : t.key} p={scrollYProgress} range={[i / n, (i + 1) / n]}>
              {typeof t === "string" ? t : t.node}
            </Word>
          ))}
        </div>
      </div>

      <dl className="mx-auto mt-20 grid max-w-[1320px] grid-cols-2 border-t-[2.5px] border-ink md:mt-28 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col-reverse gap-3 pt-6 pb-8 pr-4 ${i % 2 ? "pl-5 border-l-[2.5px] border-ink" : ""} ${i === 2 ? "lg:pl-5 lg:border-l-[2.5px] lg:border-ink" : ""} ${i > 1 ? "border-t-[2.5px] border-ink lg:border-t-0" : ""}`}
          >
            <dt className="label max-w-[20ch] text-ink/70">{s.label}</dt>
            <dd className="display text-[clamp(64px,8vw,120px)] text-red">
              <Count to={s.to} suffix={s.suffix} decimals={s.decimals} />
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
