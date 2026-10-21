import { ShogunArt } from "./character";
import type { CoverArt, Series } from "./data";

/*
  Cover art for each series, drawn flat on a 300×400 board in the same
  woodblock language as the Shogun: a few hard shapes, two or three inks.
*/

const ink = "var(--ink)";
const bone = "var(--bone)";
const red = "var(--red)";

function Shogun() {
  return (
    <>
      <circle cx="150" cy="150" r="104" fill={bone} />
      <defs>
        <pattern id="cover-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="2" fill="var(--deep)" />
        </pattern>
      </defs>
      <circle cx="150" cy="150" r="104" fill="url(#cover-dots)" opacity="0.3" />
      <g transform="translate(-15 70) scale(0.55)">
        <ShogunArt />
      </g>
    </>
  );
}

function Wolf() {
  return (
    <>
      <circle cx="196" cy="118" r="70" fill={bone} />
      <circle cx="222" cy="104" r="14" fill="#e6dac6" />
      <g stroke={bone} strokeOpacity="0.28" strokeWidth="2">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={i * 26 - 40} y1="0" x2={i * 26 - 110} y2="400" />
        ))}
      </g>
      <path d="M0 300 L70 230 L120 270 L190 200 L300 290 L300 400 L0 400Z" fill="#203a74" />
      <path d="M0 340 L90 290 L160 330 L240 280 L300 320 L300 400 L0 400Z" fill="#172c59" />
      <path d="M150 362 L102 290 L96 218 L128 254 L172 254 L204 218 L198 290Z" fill={ink} />
      <path d="M150 362 L132 318 L168 318Z" fill="#2a2124" />
      <path d="M118 280 L140 288 L120 292Z M182 280 L160 288 L180 292Z" fill={red} />
    </>
  );
}

function Tiger() {
  const stripes = [
    "M-10 40 C60 70 90 30 150 60 C110 50 70 90 -10 70Z",
    "M310 30 C240 70 210 30 150 70 C190 54 230 96 310 66Z",
    "M-10 140 C50 160 80 120 130 150 C90 140 60 190 -10 176Z",
    "M310 130 C250 160 220 120 170 150 C210 140 240 190 310 176Z",
    "M-10 300 C70 280 90 330 150 300 C110 320 60 300 -10 336Z",
    "M310 300 C230 280 210 330 150 300 C190 320 240 300 310 336Z",
    "M120 360 C140 340 160 340 180 360 C160 352 140 352 120 360Z",
  ];
  return (
    <>
      {stripes.map((d) => (
        <path key={d} d={d} fill={ink} />
      ))}
      <path d="M58 226 Q100 180 142 226 Q100 246 58 226Z M158 226 Q200 180 242 226 Q200 246 158 226Z" fill={bone} />
      <path d="M98 196 L102 196 L106 228 L102 246 L98 246 L94 228Z M198 196 L202 196 L206 228 L202 246 L198 246 L194 228Z" fill={ink} />
      <path d="M150 262 L136 250 L164 250Z" fill={red} />
    </>
  );
}

function Lantern() {
  return (
    <>
      <circle cx="150" cy="210" r="136" fill="#f2cd6a" />
      <circle cx="150" cy="210" r="96" fill="#f7dc8f" />
      <line x1="150" y1="70" x2="150" y2="100" stroke={ink} strokeWidth="3" />
      <rect x="118" y="96" width="64" height="16" rx="3" fill={ink} />
      <rect x="118" y="304" width="64" height="16" rx="3" fill={ink} />
      <ellipse cx="150" cy="208" rx="84" ry="100" fill={red} />
      <g fill="none" stroke="var(--deep)" strokeWidth="2.5">
        {[-70, -42, -14, 14, 42, 70].map((y) => {
          const rx = 84 * Math.sqrt(1 - (y / 100) ** 2);
          return <path key={y} d={`M${150 - rx} ${208 + y} Q150 ${208 + y + 12} ${150 + rx} ${208 + y}`} />;
        })}
      </g>
      <ellipse cx="124" cy="176" rx="14" ry="36" fill={bone} opacity="0.35" />
      <path d="M150 320 L150 356 M142 356 L158 356 L154 380 L146 380Z" stroke={ink} strokeWidth="3" fill={ink} />
    </>
  );
}

function Kitsune() {
  return (
    <>
      <circle cx="150" cy="200" r="150" fill="#2a7068" />
      <path d="M78 64 L120 140 L84 160Z M222 64 L180 140 L216 160Z" fill={bone} />
      <path d="M86 92 L108 140 L90 148Z M214 92 L192 140 L210 148Z" fill={red} />
      <path d="M150 360 C120 330 72 270 70 200 C68 150 100 124 150 124 C200 124 232 150 230 200 C228 270 180 330 150 360Z" fill={bone} />
      <path d="M92 200 L136 214 L98 220Z M208 200 L164 214 L202 220Z" fill={ink} />
      <path d="M86 188 C100 170 124 176 138 196 C120 186 104 186 86 188Z M214 188 C200 170 176 176 162 196 C180 186 196 186 214 188Z" fill={red} />
      <path d="M150 150 L142 176 L150 196 L158 176Z" fill={red} />
      <path d="M138 336 L150 348 L162 336 L150 330Z" fill={ink} />
      <path d="M110 268 C126 290 140 300 150 300 C160 300 174 290 190 268" fill="none" stroke={red} strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

function Steel() {
  const waves = [];
  for (let row = 0; row < 8; row++) {
    for (let col = -1; col < 7; col++) {
      const cx = col * 50 + (row % 2 ? 25 : 0);
      const cy = 210 + row * 25;
      waves.push(
        <g key={`${row}-${col}`}>
          {[24, 17, 10].map((r, i) => (
            <path key={r} d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill={i === 0 ? "#cfe0ee" : "none"} stroke="#2f4c8f" strokeWidth="2" />
          ))}
        </g>,
      );
    }
  }
  return (
    <>
      <circle cx="226" cy="96" r="44" fill={red} />
      {waves}
      <g transform="translate(22 -38)">
        <path d="M52 330 L250 52 L262 60 L68 342Z" fill={bone} stroke={ink} strokeWidth="2.5" />
        <path d="M44 340 L70 316 L82 326 L58 352Z" fill={ink} />
        <path d="M58 352 L28 394 L14 384 L44 340Z" fill={ink} />
        <ellipse cx="66" cy="334" rx="20" ry="8" transform="rotate(-54 66 334)" fill="#e9b23c" stroke={ink} strokeWidth="2" />
      </g>
    </>
  );
}

const art: Record<CoverArt, () => React.JSX.Element> = {
  shogun: Shogun,
  wolf: Wolf,
  tiger: Tiger,
  lantern: Lantern,
  kitsune: Kitsune,
  steel: Steel,
};

/** A full printed cover: art, masthead, issue number and spine kanji. */
export function Cover({ s, bare = false, className = "" }: { s: Series; bare?: boolean; className?: string }) {
  const Art = art[s.slug];
  return (
    <div className={`relative isolate aspect-[3/4] overflow-hidden ${className}`} style={{ background: s.bg, color: s.fg }}>
      <svg aria-hidden viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 size-full">
        <Art />
      </svg>
      {!bare && (
        <>
          <div className="flex items-start justify-between p-[6%]">
            <p className="display max-w-[78%] text-[length:var(--ct,40px)] leading-[0.88] [text-shadow:0_2px_0_rgb(0_0_0/0.08)]">{s.title}</p>
            <span className="kanji grid size-[2.4em] place-items-center bg-ink text-[13px] text-bone">{s.kanji}</span>
          </div>
          <div className="label absolute inset-x-[6%] bottom-[5%] flex justify-between">
            <span className="rounded-full bg-bone px-2.5 py-1 text-ink">{s.issue}</span>
            <span className="rounded-full bg-ink px-2.5 py-1 text-bone">紅</span>
          </div>
        </>
      )}
    </div>
  );
}
