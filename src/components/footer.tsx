"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Cover } from "./covers";
import { series } from "./data";
import { Arrow, Seal } from "./ui";

const columns = [
  { title: "Read", links: ["All series", "New this week", "Free first issues", "Print shop"] },
  { title: "Studio", links: ["About Kurenai", "Submit a pitch", "Careers", "Press kit"] },
  { title: "Follow", links: ["Instagram", "Bluesky", "Discord", "Newsletter archive"] },
];

export function IssueOne() {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -60]);

  return (
    <section ref={ref} id="issue-one" className="overflow-hidden bg-bone px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="label flex items-center gap-3">
            <Seal className="size-7 text-[15px]" /> Free, no card needed
          </p>
          <h2 className="display mt-6 text-[clamp(60px,8.4vw,136px)]">
            Start with issue #1.
            <br />
            <span className="text-red">It&apos;s on us.</span>
          </h2>

          <form
            className="mt-10 max-w-[520px]"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="email" className="label">
              Where should we send it?
            </label>
            <div className="slab mt-3 flex bg-white [--slab:6px]">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-[16px] outline-none placeholder:text-ink/40"
              />
              <button type="submit" className="label flex items-center gap-2 border-l-[2.5px] border-ink bg-red px-5 text-bone transition-colors hover:bg-ink">
                Send it <Arrow className="size-3.5" />
              </button>
            </div>
            <AnimatePresence>
              {sent && (
                <motion.p
                  role="status"
                  className="label mt-4 text-red"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✦ You&apos;re in. Check your inbox for Scarlet Shogun #1.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>

        <motion.div style={{ rotate, y }} className="relative mx-auto w-[min(76vw,380px)]">
          <div className="slab [--ct:clamp(32px,3.4vw,46px)] [--slab:12px]">
            <Cover s={series[0]} />
          </div>
          <span className="display absolute -bottom-8 -right-6 grid size-24 rotate-[-12deg] place-items-center rounded-full border-[2.5px] border-ink bg-kaki text-[30px] leading-none">
            Free!
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden bg-paper px-5 pt-20 md:px-12">
        <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Seal className="size-12 text-[26px]" />
            <p className="mt-5 max-w-[30ch] text-[15px] leading-[1.6] text-ink/70">
              Kurenai Comics. Independent, creator-owned, printed in one crimson. Osaka and Lisbon.
            </p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="label text-ink/50">{c.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="text-[15px] font-medium underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-red">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div aria-hidden className="relative mx-auto mt-20 flex max-w-[1440px] justify-center">
          <p className="display flex text-[min(29vw,430px)] leading-[0.86] text-red">
            {"Kurenai".split("").map((ch, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ delay: i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </p>
        </div>

        <div className="label mx-auto flex max-w-[1320px] flex-wrap justify-between gap-4 border-t-[2.5px] border-ink py-6">
          <span>© 2026 Kurenai Comics</span>
          <span className="kanji tracking-[0.3em]" lang="ja">
            紅漫画社
          </span>
          <a href="#top" className="flex items-center gap-2 hover:text-red">
            Back to top <Arrow className="size-3.5 -rotate-90" />
          </a>
        </div>
    </footer>
  );
}
