export type CoverArt = "shogun" | "wolf" | "tiger" | "lantern" | "kitsune" | "steel";

export type Series = {
  slug: CoverArt;
  title: string;
  kanji: string;
  issue: string;
  genre: string;
  blurb: string;
  bg: string;
  fg: string;
};

export const series: Series[] = [
  {
    slug: "shogun",
    title: "Scarlet Shogun",
    kanji: "将",
    issue: "Vol. 3 · #48",
    genre: "Historical epic",
    blurb: "A warlord paints his armour red so the enemy will see him coming.",
    bg: "var(--red)",
    fg: "var(--bone)",
  },
  {
    slug: "wolf",
    title: "Wolf Night",
    kanji: "狼",
    issue: "#22",
    genre: "Supernatural noir",
    blurb: "A detective who only works under a full moon, and never says why.",
    bg: "#2f4c8f",
    fg: "var(--bone)",
  },
  {
    slug: "tiger",
    title: "Paper Tiger",
    kanji: "虎",
    issue: "#31",
    genre: "Crime caper",
    blurb: "Four forgers, one priceless scroll and a tiger that was never real.",
    bg: "var(--kaki)",
    fg: "var(--ink)",
  },
  {
    slug: "lantern",
    title: "The Last Lantern",
    kanji: "灯",
    issue: "#09",
    genre: "Ghost story",
    blurb: "One lantern stays lit in a drowned village. Someone keeps refilling it.",
    bg: "#e9b23c",
    fg: "var(--ink)",
  },
  {
    slug: "kitsune",
    title: "Kitsune Takes Tokyo",
    kanji: "狐",
    issue: "#14",
    genre: "Heist comedy",
    blurb: "A nine-tailed trickster discovers the stock exchange.",
    bg: "#2e7d74",
    fg: "var(--bone)",
  },
  {
    slug: "steel",
    title: "Salt & Steel",
    kanji: "鋼",
    issue: "#05",
    genre: "Pirate saga",
    blurb: "A swordsmith's daughter forges a blade that can cut the tide.",
    bg: "#9cc3e4",
    fg: "var(--ink)",
  },
];

export const creators = [
  { name: "Haru Kitagawa", role: "Writer & artist", series: "shogun", issues: 48 },
  { name: "Inês Valadares", role: "Artist", series: "wolf", issues: 22 },
  { name: "Tomasz Wren", role: "Writer", series: "tiger", issues: 31 },
  { name: "Amara Osei", role: "Writer & artist", series: "lantern", issues: 9 },
  { name: "Rin Takeda", role: "Colourist & writer", series: "kitsune", issues: 14 },
  { name: "Mateo Saito-Ruiz", role: "Artist", series: "steel", issues: 5 },
] satisfies { name: string; role: string; series: CoverArt; issues: number }[];

export const steps = [
  {
    kanji: "脚本",
    title: "Script",
    body: "Every book starts as one creator's idea, pitched in a page. We back the voice, not the trend report.",
  },
  {
    kanji: "下絵",
    title: "Pencils",
    body: "Loose construction first: the circle of a head, the line of a shoulder, the beat of a panel.",
  },
  {
    kanji: "墨入れ",
    title: "Inks",
    body: "Brush and nib commit to the line. Nothing is auto-traced, nothing is generated.",
  },
  {
    kanji: "彩色",
    title: "Red",
    body: "Then the colour floods in, always printed with a single spot of house crimson.",
  },
];

export const tiers = [
  {
    kanji: "読",
    name: "Reader",
    monthly: 6,
    yearly: 58,
    note: "Every issue, the day it drops.",
    perks: ["All 14 series, digital, day one", "Full back catalogue", "Offline reading on any device"],
  },
  {
    kanji: "集",
    name: "Collector",
    monthly: 16,
    yearly: 154,
    note: "Paper in your hands each month.",
    perks: ["Everything in Reader", "A printed issue shipped monthly", "Members-only variant covers", "The Red Ink studio zine"],
    featured: true,
  },
  {
    kanji: "守",
    name: "Patron",
    monthly: 40,
    yearly: 384,
    note: "Keep independent comics independent.",
    perks: ["Everything in Collector", "A signed original page every quarter", "Your name in the credits", "Live studio sessions"],
  },
];

/** Scarlet Shogun #1, page one, in manga reading order (right to left). */
export const pageOne = [
  { kind: "Caption", text: "Owari Province, 1560. The rain has not stopped for three days." },
  { kind: "Caption", text: "They say the young lord paints his armour red." },
  { kind: "Soldier", text: "So we see him coming?" },
  { kind: "Sound", text: "斬 (zan): the cut." },
  { kind: "Shogun", text: "Good. Let them look." },
];

export const sfx = "斬";

export const plates = [
  { name: "Sumi", note: "Black key plate: line, hair, the kataginu.", colour: "var(--ink)" },
  { name: "Kurenai", note: "House crimson: the ground, the war paint, the collar.", colour: "var(--red)" },
  { name: "Hada", note: "Warm plate: skin, shadow and the paper-white sun.", colour: "#e39c8b" },
];

/** Every kanji the page renders, so the font request asks for only these glyphs. */
export const kanjiGlyphs = [
  ...new Set("紅漫画社" + sfx + series.map((s) => s.kanji).join("") + steps.map((s) => s.kanji).join("") + tiers.map((t) => t.kanji).join("")),
].join("");
