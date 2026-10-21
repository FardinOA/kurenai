# Kurenai

A landing page for an independent comics publisher, set like a woodblock poster: crimson ground, bone type, ink line work. Every figure, cover and comic panel is drawn in code.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
```

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion and Lenis. There are no image files: the Shogun, the six covers and the comic page are SVG.

## Where things live

- `src/components/character.tsx`: the Scarlet Shogun, drawn once as flat shapes and reused in the hero, covers, process and press scenes
- `src/components/covers.tsx`: the six series covers
- `src/components/page-one.tsx`: the comic page and the scroll camera that reads it panel by panel, right to left
- `src/components/process.tsx`: pencils, inks and colour driven by scroll
- `src/components/press.tsx`: the three print plates sliding into registration
- `src/components/data.ts`: series, creators, steps, plates, pricing and panel captions
- `src/components/*.tsx`: the page sections, in page order in `src/app/page.tsx`
- `src/app/globals.css`: palette, type roles, halftone, comic shadows and paper grain
- `docs/design-dna.md`: the reasoning behind the palette, type and motion choices

Colours are defined once in `globals.css`. The kanji font is requested only for the glyphs in `data.ts`, so add new kanji there.

## License

One purchase covers one end product. See [LICENSE.md](LICENSE.md).
