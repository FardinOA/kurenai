"use client";

import { motion, type MotionValue, useTransform } from "motion/react";
import { useId } from "react";

/*
  The Scarlet Shogun, house mascot and lead of our flagship series.
  Drawn once as flat shapes on a 600×700 board so the same figure can be
  printed in colour (hero, covers) or replayed as pencils → inks → colour
  in the process section.
*/

const W = 600;

export const tones = {
  ink: "var(--ink)",
  bone: "var(--bone)",
  red: "var(--red)",
  deep: "var(--deep)",
  skin: "#f2cdb2",
  shade: "#e39c8b",
  dusk: "#c8705f",
  crown: "#eec6ad",
  crownShade: "#e2a792",
};

export type Tone = keyof typeof tones;
type Shape = { d: string; tone: Tone; stroke?: number };

/** Reflect an absolute M/L/C/Q path across the board's centre line. */
const mirror = (d: string) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${W - Number(x)} ${y}`);
const pair = (d: string, tone: Tone): Shape[] => [
  { d, tone },
  { d: mirror(d), tone },
];
const ell = (cx: number, cy: number, rx: number, ry = rx) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0Z`;
const diamond = (cx: number, cy: number, s = 7) => `M${cx} ${cy - s} L${cx + s * 0.85} ${cy} L${cx} ${cy + s} L${cx - s * 0.85} ${cy}Z`;

const hiltWraps: Shape[] = [0.25, 0.45, 0.65, 0.85].map((t) => ({ d: diamond(421 + 60 * t, 474 - 170 * t), tone: "bone" }));

export const shapes: Shape[] = [
  // Katana hilt over the right shoulder.
  { d: "M410 470 L470 300 L492 308 L432 478Z", tone: "ink" },
  ...hiltWraps,
  { d: ell(482, 302, 14, 10), tone: "red" },

  // Body and kataginu wings.
  { d: "M60 700 C70 590 150 520 240 488 L360 488 C450 520 530 590 540 700Z", tone: "ink" },
  ...pair("M250 488 L30 440 L50 502 L172 562Z", "ink"),
  ...pair("M250 488 L30 440 L34 454 L248 500Z", "red"),
  { d: ell(146, 512, 21), tone: "bone" },
  { d: ell(454, 512, 21), tone: "bone" },
  { d: ell(146, 512, 9), tone: "red" },
  { d: ell(454, 512, 9), tone: "red" },
  { d: "M120 700 L140 610 L170 700Z M480 700 L460 610 L430 700Z", tone: "deep" },

  // Neck and collar.
  { d: "M262 418 L338 418 L338 488 L322 488 L300 548 L278 488 L262 488Z", tone: "skin" },
  { d: "M300 418 L338 418 L338 488 L322 488 L300 548Z", tone: "shade" },
  { d: "M262 418 L338 418 L332 452 C312 462 288 462 268 452Z", tone: "dusk" },
  { d: "M240 488 L300 640 L360 488 L338 488 L300 590 L262 488Z", tone: "bone" },
  { d: "M262 488 L300 590 L338 488 L322 488 L300 548 L278 488Z", tone: "red" },

  // Ears.
  { d: ell(212, 320, 20, 34), tone: "skin" },
  { d: ell(388, 320, 20, 34), tone: "shade" },
  { d: ell(214, 322, 8, 18), tone: "dusk" },
  { d: ell(386, 322, 8, 18), tone: "dusk" },

  // Head: split-lit face, shaved crown, side hair and topknot.
  { d: "M212 250 C212 160 388 160 388 250 L388 335 C388 420 340 458 300 458 C260 458 212 420 212 335Z", tone: "skin" },
  { d: "M300 183 C345 183 388 205 388 250 L388 335 C388 420 340 458 300 458Z", tone: "shade" },
  { d: "M212 250 C212 160 388 160 388 250 C360 236 330 230 300 230 C270 230 240 236 212 250Z", tone: "crown" },
  { d: "M300 183 C345 183 388 205 388 250 C360 236 330 230 300 230Z", tone: "crownShade" },
  ...pair("M212 250 C206 280 206 320 210 352 L226 352 L228 262 C236 250 250 244 262 240 C240 238 222 242 212 250Z", "ink"),
  { d: "M286 236 L290 150 C292 138 308 138 310 150 L314 236 C306 240 294 240 286 236Z", tone: "ink" },
  { d: "M289 198 L311 198 L311 211 L289 211Z", tone: "red" },

  // Face.
  ...pair("M244 338 C232 352 226 370 226 394 C234 374 244 360 258 346Z", "red"),
  { d: "M296 264 L300 246 L304 264 L300 282Z", tone: "red" },
  ...pair("M232 282 L292 300 L290 314 L228 294Z", "ink"),
  ...pair("M242 328 Q264 312 288 330 Q264 336 242 328Z", "ink"),
  ...pair("M254 360 C258 380 262 395 268 406", "ink").map((s) => ({ ...s, stroke: 3 })),
  { d: "M302 318 L310 374 L320 372Z", tone: "dusk" },
  { d: "M302 318 L292 372 L310 374", tone: "ink", stroke: 4 },
  { d: "M300 388 C278 380 252 392 236 418 C258 404 280 402 300 404 C320 402 342 404 364 418 C348 392 322 380 300 388Z", tone: "ink" },
  { d: "M284 424 L316 424", tone: "ink", stroke: 4 },
  { d: "M288 434 L300 484 L312 434 C306 438 294 438 288 434Z", tone: "ink" },
];

function Paint({ s }: { s: Shape }) {
  return s.stroke ? (
    <path d={s.d} fill="none" stroke={tones[s.tone]} strokeWidth={s.stroke} strokeLinecap="round" strokeLinejoin="round" />
  ) : (
    <path d={s.d} fill={tones[s.tone]} />
  );
}

/** The finished, coloured figure as a group, for nesting inside other art. */
export function ShogunArt() {
  return (
    <g>
      {shapes.map((s, i) => (
        <Paint key={i} s={s} />
      ))}
    </g>
  );
}

export function Shogun({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 600 700" className={className}>
      <ShogunArt />
    </svg>
  );
}

/*
  The same figure rebuilt in stages. Every input is a 0–1 progress value so
  the caller can drive it from scroll: pencil draws construction lines, ink
  commits the outlines and blacks, colour floods in through a brush circle.
*/
export function ShogunStages({
  pencil,
  ink,
  colour,
  className = "",
}: {
  pencil: MotionValue<number>;
  ink: MotionValue<number>;
  colour: MotionValue<number>;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const pencilFade = useTransform(ink, [0, 1], [1, 0.22]);
  const radius = useTransform(colour, [0, 1], [0, 760]);
  const inkFill = useTransform(ink, [0.45, 1], [0, 1]);

  return (
    <svg aria-hidden viewBox="0 0 600 700" className={className}>
      <defs>
        <clipPath id={`flood-${id}`}>
          <motion.circle cx="120" cy="120" style={{ r: radius }} />
        </clipPath>
      </defs>

      <motion.g style={{ opacity: pencilFade }} fill="none" stroke="#7c8796" strokeWidth="1.6" strokeLinecap="round">
        {[ell(300, 300, 128), "M300 110 L300 560", "M190 326 L410 326", "M150 488 L450 488", "M60 700 L240 488 M540 700 L360 488"].map((d) => (
          <motion.path key={d} d={d} strokeDasharray="6 7" style={{ pathLength: pencil }} />
        ))}
        <g transform="translate(3 -2)">
          {shapes.map((s, i) => (
            <motion.path key={i} d={s.d} style={{ pathLength: pencil }} />
          ))}
        </g>
      </motion.g>

      <g>
        {shapes.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            fill={s.stroke ? "none" : s.tone === "ink" ? tones.ink : "#fffaf2"}
            stroke={tones.ink}
            strokeWidth={s.stroke ?? 2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ pathLength: ink, fillOpacity: inkFill }}
          />
        ))}
      </g>

      <g clipPath={`url(#flood-${id})`}>
        <ShogunArt />
      </g>
    </svg>
  );
}
