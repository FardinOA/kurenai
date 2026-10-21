# Design DNA: Kurenai

Kurenai (紅, "deep crimson") is an independent comics publisher: fourteen creator-owned series, printed and digital. The site has one job: make a stranger feel that these books are made by hand, by people with something to say, and get them reading issue #1 or joining the Red Pass membership.

## Evidence Binding

| Decision | Evidence | Source | Mechanism |
|---|---|---|---|
| Crimson ground, bone type, ink line work | Reference poster: crimson field, cream masthead, black-and-white figure | User brief: Oda Nobunaga reference | The hero is the poster: same three-ink palette, same hierarchy |
| Giant condensed masthead with chipped letters, figure in front of it | Reference "ODA NOBUNAGA" set in a heavy condensed sans, letters cut by small notches, the portrait breaks the type | User brief | Anton at poster scale; crimson chips over the letters; the Shogun bust overlaps both lines |
| Kanji above the masthead | Reference "織田信長" centred under the nav | User brief | 紅漫画社 in a heavy Mincho, loaded only for glyphs in use |
| Flat geometric character illustration, split lighting | Reference figure: flat vector, hard light/shadow split down the face | User brief | Original figure drawn in code (no stock art), reused in hero, cover and process |
| No dark background | "avoid dark background" | User brief | Red, bone and paper only; ink appears as line, type and comic shadow |
| Scroll animation everywhere | "must have scroll animation" | User brief | Pinned horizontal series shelf, pinned pencils → inks → colour scene, word-by-word manifesto, parallax hero |
| Framed hero panel, narration caption, starburst | "slightly change the hero layout, don't use any Slop output" | User brief, second round | Panel border, caption box and burst are devices comics already use; the rotating circular-text badge was dropped as a generic pattern |
| Dribbble-level polish | "need dribble standard UI" | User brief | Starburst sticker, crossing marquee tapes, hover-follow cover previews, hard-shadow comic cards |

## Category Default Analysis

**Category:** comic publisher / creative studio landing page.

| Common strategy | Used here? | Evidence row |
|---|---|---|
| Black page, neon, glitch type | No: light-only, printed-paper feel | No dark background |
| Collage of licensed superhero panels | No: one original figure and six drawn covers, all in SVG | Flat figure row |
| Grid of cover thumbnails | Reworked: a pinned horizontal shelf driven by scroll | Scroll row |
| Generic "Subscribe" form | Reworked: Red Pass tiers styled as comic panels with hard ink shadows | Dribbble row |

## Territories considered

- **A. Woodblock poster (selected).** Crimson, bone and ink; condensed poster type; flat split-lit figures; halftone dots; hard comic shadows. Taken straight from the user's reference, and it is the only territory that is already a print medium, which is what a comics publisher sells.
- **B. Newsprint funnies.** Off-white newsprint, CMYK primaries, Ben-Day dots everywhere, rounded hand-lettered type. Rejected: playful and nostalgic where the brief asks for "visionary", and it ignores the reference.
- **C. Gallery white.** White walls, tiny serif captions, covers hung as framed art with lots of air. Rejected: the reference poster is a full-bleed crimson field with type touching the edges, and a white-wall layout would throw away both the colour and the scale the user pointed at.

## Anti-Bias Check

The brief bans dark grounds, so there is no dark mode. Ink is never a section background. The page alternates crimson (hero, Red Pass) with bone and paper (everything else) so the red stays loud by being rationed.

## Design Thesis

The landing page is a printed poster that comes alive: the masthead splits, the hero is redrawn in front of you, and every section is a panel.

## Color Philosophy

Six tokens: `red` (house crimson, hero and membership grounds), `deep` (shadow red, halftone dots), `bone` and `paper` (page grounds), `ink` (type, line, comic shadow), `kaki` (persimmon, stickers and highlights, one per view). Covers carry their own series colour.

## Typography Philosophy

- Anton for display: tall, condensed, poster weight.
- Archivo (variable width) for reading and UI; labels use its condensed width in tracked capitals.
- Shippori Mincho B1 ExtraBold for kanji, subset to the exact glyphs on the page.

## Shape Language

Hard rectangles with 2.5px ink borders and offset ink shadows (comic panels). Circles only for the sticker badge and mon crests. Chips and sword slashes cut into display type.

## Motion Philosophy

Snappy, printed, mechanical: things slam in rather than float. Hero letters rise, the slash cuts, the figure pops. Scroll drives the rest. Reduced motion turns off smooth scrolling and looping animation; scroll-linked scenes still resolve to their final state.

## Signature Moments

1. Hero: masthead splits apart as you scroll, figure pushes forward.
2. Series shelf: pinned horizontal scroll of six covers.
3. Page one: a scroll-driven camera reads a full comic page panel by panel, right to left.
4. Process: the Shogun is redrawn from pencils to inks to crimson as you scroll.
5. Off the press: the poster's three print plates slide into registration and multiply into the finished image.
