"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { Cover } from "./covers";
import { series } from "./data";
import { useMedia } from "./hooks";
import { Arrow, Eyebrow } from "./ui";

function Card({ s, i }: { s: (typeof series)[number]; i: number }) {
  return (
    <article className="group w-[min(78vw,var(--card))] shrink-0 snap-start">
      <a href="#issue-one" className="block" aria-label={`${s.title}, ${s.genre}, ${s.issue}`}>
        <div className="slab relative overflow-hidden [--slab:6px] transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-2 group-hover:rotate-[-1.2deg] [--ct:clamp(30px,2.6vw,42px)]">
          <Cover s={s} />
          <span className="label absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-ink px-4 py-3 text-bone transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0">
            Read issue #1 <Arrow className="size-3.5" />
          </span>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <p className="label text-ink/60">
            <span className="numerals">0{i + 1}</span> · {s.genre}
          </p>
          <span className="kanji text-[22px] text-red" lang="ja">
            {s.kanji}
          </span>
        </div>
        <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.5] text-ink/80">{s.blurb}</p>
      </a>
    </article>
  );
}

export function Series() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = useMedia("(min-width: 900px)", true);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (!desktop || !track.current) return;
    const el = track.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(series.length - 1, Math.floor(v * series.length))));

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-6 px-5 md:px-12">
      <div>
        <Eyebrow n="03">The series</Eyebrow>
        <h2 className="display mt-5 text-[clamp(48px,5.6vw,92px)]">
          Six worlds, <span className="text-red">one red thread.</span>
        </h2>
      </div>
      <div className="hidden w-[220px] lg:block">
        <p className="label numerals flex justify-between">
          <span>0{active + 1}</span>
          <span className="text-ink/50">0{series.length}</span>
        </p>
        <div className="mt-3 h-[3px] bg-ink/15">
          <motion.div className="h-full bg-red" style={{ width: bar }} />
        </div>
      </div>
    </div>
  );

  const cards = series.map((s, i) => <Card key={s.slug} s={s} i={i} />);

  const end = (
    <a href="#red-pass" className="slab slab-hover group flex aspect-[3/4] w-[min(78vw,var(--card))] shrink-0 snap-start flex-col justify-between self-start bg-red p-7 text-bone">
      <span className="kanji text-[64px]" lang="ja">
        紅
      </span>
      <span>
        <span className="display block text-[52px] leading-[0.9]">+8 more series</span>
        <span className="label mt-5 flex items-center gap-2">
          Browse the catalogue <Arrow className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </a>
  );

  if (!desktop) {
    return (
      <section id="series" className="bg-paper py-20 [--card:340px]">
        {header}
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-6 [scrollbar-width:none]">
          {cards}
          {end}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} id="series" className="relative bg-paper [--card:clamp(280px,min(24vw,39svh),380px)]" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-[4svh] overflow-hidden pt-20">
        {header}
        <motion.div ref={track} style={{ x: smoothX }} className="flex w-max gap-10 px-12 pb-4">
          {cards}
          {end}
        </motion.div>
      </div>
    </section>
  );
}
