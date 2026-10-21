"use client";

import { AnimatePresence, motion, type MotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { ShogunArt } from "./character";
import { pageOne, sfx } from "./data";
import { Button, Eyebrow } from "./ui";

/*
  Page one of Scarlet Shogun #1 on an 800×1100 board. Scrolling moves a
  camera across it in manga order (right to left, top to bottom), holding
  on each panel, then pulls back to the whole page.
*/

type Rect = { x: number; y: number; w: number; h: number };

const PAGE: Rect = { x: 0, y: 0, w: 800, h: 1100 };

const panels: { shape: string; box: Rect }[] = [
  { shape: "300,28 772,28 772,344 300,360", box: { x: 300, y: 28, w: 472, h: 332 } },
  { shape: "28,28 284,28 284,360 28,360", box: { x: 28, y: 28, w: 256, h: 332 } },
  { shape: "28,376 772,360 772,620 28,650", box: { x: 28, y: 360, w: 744, h: 290 } },
  { shape: "412,651 772,636 772,1072 412,1072", box: { x: 412, y: 636, w: 360, h: 436 } },
  { shape: "28,666 396,651 396,1072 28,1072", box: { x: 28, y: 651, w: 368, h: 421 } },
];

const frames: Rect[] = [PAGE, PAGE, ...panels.flatMap((p) => [p.box, p.box]), PAGE, PAGE];
const times = [0, 0.06, 0.14, 0.2, 0.28, 0.34, 0.42, 0.48, 0.56, 0.62, 0.7, 0.78, 0.88, 1];
const holds = [0.1, 0.24, 0.38, 0.52, 0.66, 0.84];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function frameAt(v: number): Rect {
  let i = times.findLastIndex((t) => v >= t);
  i = Math.max(0, Math.min(times.length - 2, i));
  const t = easeInOut(Math.min(1, Math.max(0, (v - times[i]) / (times[i + 1] - times[i]))));
  const a = frames[i];
  const b = frames[i + 1];
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), w: lerp(a.w, b.w, t), h: lerp(a.h, b.h, t) };
}

const ink = "var(--ink)";
const bone = "var(--bone)";
const red = "var(--red)";
const lettering = { fontFamily: "var(--font-archivo)", fontWeight: 700, letterSpacing: "0.04em" } as const;

function Caption({ x, y, w, lines }: { x: number; y: number; w: number; lines: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={18 + lines.length * 16} fill="#fffaf2" stroke={ink} strokeWidth="2.5" />
      <text x={x + 12} y={y + 24} fontSize="12.5" fill={ink} style={lettering}>
        {lines.map((l, i) => (
          <tspan key={l} x={x + 12} dy={i ? 16 : 0}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function Bubble({ cx, cy, rx, ry, tail, lines }: { cx: number; cy: number; rx: number; ry: number; tail: [number, number]; lines: string[] }) {
  const [tx, ty] = tail;
  return (
    <g>
      <path d={`M${cx - 14} ${cy + ry - 6} L${tx} ${ty} L${cx + 12} ${cy + ry - 4}Z`} fill="white" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="white" stroke={ink} strokeWidth="2.5" />
      <path d={`M${cx - 13} ${cy + ry - 7} L${cx + 11} ${cy + ry - 5}`} stroke="white" strokeWidth="5" />
      <text x={cx} y={cy - (lines.length - 1) * 8 + 5} fontSize="15" textAnchor="middle" fill={ink} style={lettering}>
        {lines.map((l, i) => (
          <tspan key={l} x={cx} dy={i ? 17 : 0}>
            {l}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function Rain({ x0, x1, y0, y1, step = 22, opacity = 0.22 }: { x0: number; x1: number; y0: number; y1: number; step?: number; opacity?: number }) {
  const lines = [];
  for (let x = x0 - 120; x < x1; x += step) lines.push(<line key={x} x1={x} y1={y0} x2={x + 90} y2={y1} />);
  return (
    <g stroke={ink} strokeOpacity={opacity} strokeWidth="1.5">
      {lines}
    </g>
  );
}

/* 1 · Establishing shot: the castle in the rain. */
function Castle() {
  return (
    <g>
      <rect x="300" y="28" width="472" height="332" fill={bone} />
      <circle cx="655" cy="118" r="60" fill={red} />
      <path d="M300 262 L380 204 L450 240 L540 172 L640 232 L720 194 L772 222 L772 360 L300 360Z" fill="#dccbb4" />
      <path d="M300 330 C420 272 560 254 700 288 L772 300 L772 360 L300 360Z" fill="#b9a58c" />
      <g stroke={ink} strokeWidth="2" fill={bone}>
        <path d="M466 300 L574 300 L562 270 L478 270Z" fill="#8f7d6b" />
        <rect x="482" y="240" width="76" height="30" />
        <rect x="494" y="212" width="52" height="26" />
        <rect x="504" y="186" width="32" height="24" />
      </g>
      <g fill={ink}>
        <path d="M460 246 Q520 226 580 246 L568 232 Q520 218 472 232Z" />
        <path d="M478 216 Q520 198 562 216 L552 205 Q520 194 488 205Z" />
        <path d="M490 190 Q520 170 550 190 L520 164Z" />
        <rect x="498" y="250" width="8" height="12" />
        <rect x="516" y="250" width="8" height="12" />
        <rect x="534" y="250" width="8" height="12" />
        <rect x="514" y="220" width="12" height="10" />
      </g>
      <path d="M598 92 l8 6 l8 -6 M622 74 l6 5 l6 -5 M690 66 l7 5 l7 -5" fill="none" stroke={ink} strokeWidth="2" />
      <Rain x0={300} x1={772} y0={28} y1={360} />
      <Caption x={316} y={44} w={238} lines={["OWARI PROVINCE, 1560.", "THE RAIN HAS NOT STOPPED", "FOR THREE DAYS."]} />
    </g>
  );
}

/* 2 · Extreme close-up: the war paint. */
function Eyes() {
  return (
    <g>
      <rect x="28" y="28" width="256" height="332" fill={red} />
      <g transform="translate(156 196) scale(1.75) translate(-300 -330)">
        <ShogunArt />
      </g>
      <Caption x={40} y={290} w={232} lines={["THEY SAY THE YOUNG LORD", "PAINTS HIS ARMOUR RED."]} />
    </g>
  );
}

/* 3 · Wide: the enemy ranks waiting on the ridge. */
function Army() {
  const rows = [
    { y: 560, op: 0.35, dx: 0 },
    { y: 596, op: 0.6, dx: 22 },
    { y: 636, op: 1, dx: 8 },
  ];
  return (
    <g>
      <rect x="28" y="360" width="744" height="290" fill="#e9dcc8" />
      <path d="M28 520 C200 500 420 512 772 492 L772 650 L28 650Z" fill="#d6c5ad" />
      <Rain x0={28} x1={772} y0={360} y1={650} step={18} opacity={0.18} />
      {rows.map((r, ri) => (
        <g key={ri} opacity={r.op}>
          {Array.from({ length: 18 }, (_, i) => {
            const x = 40 + i * 44 + r.dx;
            return (
              <g key={i}>
                <line x1={x + 13} y1={r.y + 8} x2={x + 22} y2={r.y - 92} stroke={ink} strokeWidth="2" />
                {i % 4 === 1 && (
                  <g>
                    <rect x={x + 22} y={r.y - 118} width="16" height="52" fill={red} stroke={ink} strokeWidth="2" />
                    <circle cx={x + 30} cy={r.y - 100} r="4.5" fill={bone} />
                  </g>
                )}
                <path d={`M${x - 12} ${r.y - 30} L${x} ${r.y - 46} L${x + 12} ${r.y - 30}Z`} fill={ink} />
                <rect x={x - 10} y={r.y - 30} width="20" height="44" fill={ink} />
              </g>
            );
          })}
        </g>
      ))}
      <Bubble cx={612} cy={420} rx={118} ry={34} tail={[560, 500]} lines={["SO WE SEE", "HIM COMING?"]} />
    </g>
  );
}

/* 4 · Impact: the draw, with speed lines and the sound of the cut. */
function Cut() {
  const lines = Array.from({ length: 56 }, (_, i) => {
    const a = (i / 56) * Math.PI * 2;
    const inner = 92 + ((i * 37) % 50);
    const spread = 0.022 + ((i * 13) % 5) * 0.004;
    const cx = 600;
    const cy = 850;
    const R = 420;
    return `M${cx + Math.cos(a) * inner} ${cy + Math.sin(a) * inner} L${cx + Math.cos(a - spread) * R} ${cy + Math.sin(a - spread) * R} L${cx + Math.cos(a + spread) * R} ${cy + Math.sin(a + spread) * R}Z`;
  });
  return (
    <g>
      <rect x="412" y="636" width="360" height="436" fill={red} />
      <g fill={bone} opacity="0.55">
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d="M520 984 L756 700 L766 710 L534 996Z" fill={bone} stroke={ink} strokeWidth="2.5" />
      <path d="M700 768 L748 712" stroke="white" strokeWidth="3" />
      <ellipse cx="526" cy="988" rx="26" ry="10" transform="rotate(-50 526 988)" fill={ink} />
      <path d="M470 1050 L516 994 L532 1008 L486 1064Z" fill={ink} />
      {[0.25, 0.55, 0.85].map((t) => {
        const x = 516 - 46 * t;
        const y = 1001 + 56 * t;
        return <path key={t} d={`M${x} ${y - 7} L${x + 6} ${y} L${x} ${y + 7} L${x - 6} ${y}Z`} fill={bone} />;
      })}
      <path d="M478 1006 C470 1020 476 1046 494 1052 C512 1058 530 1044 528 1024 C526 1010 506 998 490 1000Z" fill="#f2cdb2" stroke={ink} strokeWidth="2.5" />
      <path d="M484 1020 L516 1024 M482 1034 L514 1038" stroke={ink} strokeWidth="2" />
      <text
        x="640"
        y="850"
        fontSize="168"
        textAnchor="middle"
        transform="rotate(-10 640 790)"
        fill={bone}
        stroke={ink}
        strokeWidth="7"
        paintOrder="stroke"
        style={{ fontFamily: '"Shippori Mincho B1", serif', fontWeight: 800 }}
      >
        {sfx}
      </text>
    </g>
  );
}

/* 5 · Reveal: the Shogun, finally facing us. */
function Reveal({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <pattern id={`dots-${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2.3" fill={red} />
        </pattern>
      </defs>
      <rect x="28" y="651" width="368" height="421" fill={bone} />
      <circle cx="212" cy="880" r="190" fill={`url(#dots-${id})`} opacity="0.55" />
      <g transform="translate(26 650) scale(0.62)">
        <ShogunArt />
      </g>
      <Bubble cx={150} cy={712} rx={104} ry={34} tail={[196, 772]} lines={["GOOD.", "LET THEM LOOK."]} />
    </g>
  );
}

function Panel({ i, p, id, children }: { i: number; p: MotionValue<number>; id: string; children: React.ReactNode }) {
  const box = panels[i].box;
  const opacity = useTransform(
    p,
    times,
    frames.map((f) => (f === PAGE || f === box ? 1 : 0.18)),
  );
  return (
    <motion.g style={{ opacity }}>
      <clipPath id={`panel-${id}-${i}`}>
        <polygon points={panels[i].shape} />
      </clipPath>
      <g clipPath={`url(#panel-${id}-${i})`}>{children}</g>
      <polygon points={panels[i].shape} fill="none" stroke={ink} strokeWidth="5" strokeLinejoin="round" />
    </motion.g>
  );
}

export function PageOne() {
  const id = useId().replace(/:/g, "");
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => setView({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress: p } = useScroll({ target: section, offset: ["start start", "end end"] });

  const camera = useTransform(p, (v) => {
    if (!view.w) return "none";
    // Frame the shot between the title card above and the caption below.
    const top = view.w < 768 ? 184 : 196;
    const room = view.h - top - 116;
    const r = frameAt(v);
    const s = Math.min((view.w * 0.88) / r.w, room / r.h);
    const tx = view.w / 2 - (r.x + r.w / 2) * s;
    const ty = top + room / 2 - (r.y + r.h / 2) * s;
    return `translate(${tx}px, ${ty}px) scale(${s})`;
  });

  useMotionValueEvent(p, "change", (v) => {
    const i = holds.findLastIndex((h) => v >= h);
    setActive(i >= 0 && i < panels.length ? i : -1);
    setDone(v >= holds[holds.length - 1]);
  });

  const line = active >= 0 ? pageOne[active] : null;

  return (
    <section ref={section} id="page-one" className="relative h-[620svh] bg-bone" aria-labelledby={`title-${id}`}>
      <div ref={stage} className="halftone sticky top-0 h-[100svh] overflow-hidden [--dot:color-mix(in_oklab,var(--ink)_7%,transparent)]">
        <motion.div
          aria-hidden
          style={{ transform: camera }}
          className="absolute left-0 top-0 h-[1100px] w-[800px] origin-top-left bg-[#fffaf2] shadow-[14px_14px_0_var(--ink)]"
        >
          <svg viewBox="0 0 800 1100" className="size-full">
            <Panel i={0} p={p} id={id}>
              <Castle />
            </Panel>
            <Panel i={1} p={p} id={id}>
              <Eyes />
            </Panel>
            <Panel i={2} p={p} id={id}>
              <Army />
            </Panel>
            <Panel i={3} p={p} id={id}>
              <Cut />
            </Panel>
            <Panel i={4} p={p} id={id}>
              <Reveal id={id} />
            </Panel>
            <text x="400" y="1092" textAnchor="middle" fontSize="11" fill={ink} opacity="0.5" style={lettering}>
              SCARLET SHOGUN #1 · 1
            </text>
          </svg>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-5 pt-24 md:px-12">
          <div className="slab pointer-events-auto bg-paper px-4 py-3 [--slab:4px]">
            <Eyebrow n="02">Page one</Eyebrow>
            <h2 id={`title-${id}`} className="display mt-2 text-[clamp(26px,2.6vw,38px)]">
              Read it like it was drawn
            </h2>
          </div>
          <p className="label hidden items-center gap-2 bg-ink px-3 py-2 text-bone md:flex">
            <span aria-hidden>←</span> Right to left
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 px-5 pb-6 md:px-12 md:pb-10">
          <div className="min-h-[76px] max-w-[440px]" aria-live="polite">
            <AnimatePresence mode="wait">
              {line ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="slab bg-paper px-4 py-3 [--slab:4px]"
                >
                  <p className="label text-red">
                    Panel {active + 1} · {line.kind}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold leading-[1.4]">{line.text}</p>
                </motion.div>
              ) : done ? (
                <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-auto">
                  <Button href="#issue-one" tone="red">
                    Read the other 31 pages free
                  </Button>
                </motion.div>
              ) : (
                <motion.p key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="label bg-paper px-3 py-2">
                  Scroll to turn the camera
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <ol className="flex gap-1.5" aria-label="Panels">
            {panels.map((_, i) => (
              <li
                key={i}
                aria-current={i === active ? "step" : undefined}
                className={`label numerals grid size-9 place-items-center border-[2.5px] border-ink transition-colors duration-300 ${
                  i === active ? "bg-red text-bone" : i < active || done ? "bg-ink text-bone" : "bg-paper"
                }`}
              >
                {i + 1}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
