"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Button, Seal } from "./ui";

const links = [
  { href: "#page-one", label: "Page one" },
  { href: "#series", label: "Series" },
  { href: "#process", label: "Process" },
  { href: "#creators", label: "Creators" },
  { href: "#red-pass", label: "Red Pass" },
];

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 60));

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-kaki" style={{ scaleX: scrollYProgress }} />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6 md:pt-4">
        <nav
          aria-label="Main"
          className={`mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 pl-2 pr-2 transition-[background-color,color,box-shadow,max-width,border-color] duration-500 ease-[var(--ease-out)] md:pl-3 ${
            solid ? "max-w-[980px] border-[2.5px] border-ink bg-bone text-ink shadow-[5px_5px_0_var(--ink)]" : "border-[2.5px] border-transparent text-bone"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5" aria-label="Kurenai Comics, back to top">
            <Seal className="size-8 text-[17px]" />
            <span className="display text-[22px] tracking-[0.04em]">Kurenai</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label group relative py-2">
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden md:block">
              <Button href="#issue-one" tone={solid ? "red" : "bone"} size="sm">
                Read #1 free
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="menu"
              className="label flex h-10 items-center gap-2 px-3 md:hidden"
            >
              Menu
              <span aria-hidden className="grid gap-1">
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-3.5 bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="halftone fixed inset-0 z-[70] flex flex-col bg-red px-5 pb-8 pt-5 text-bone [--dot:color-mix(in_oklab,var(--deep)_55%,transparent)]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.15, 1] }}
          >
            <div className="flex items-center justify-between">
              <Seal />
              <button type="button" onClick={() => setOpen(false)} className="label h-10 px-3" autoFocus>
                Close ✕
              </button>
            </div>
            <ul className="mt-auto">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display block text-[19vw] leading-[0.95]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <p className="label mt-8 opacity-75">Osaka · Lisbon · Est. 2019</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
