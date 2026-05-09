# Haderslebener 26 — CLAUDE.md

Project context for agents picking up work on this codebase.

---

## What this is

A static Astro site for **Haderslebener 26**, a student shared-apartment property in Berlin Steglitz-Dahlem. It markets rooms/apartments to students and provides info about the building, location, and availability.

- **Live URL:** https://nathaliemh.github.io/hobb-site/
- **Repo:** https://github.com/NathalieMH/hobb-site
- **Owner:** Nathalie (family@eloundagroup.com)

---

## Tech stack

- **Astro 4.x** static site — no server, no React/Vue, plain Astro components
- **TypeScript** inside `<script>` blocks
- **No test suite, no lint scripts** — `npm run build` is the verification step
- **Deploy:** GitHub Pages via GitHub Actions on push to `main`
- Base URL is `/hobb-site/` — always use `${base}` (from `import.meta.env.BASE_URL`) for links/image srcs

---

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build (use this to verify changes)
npm run preview  # preview production build
```

---

## Project structure

```
src/
  components/
    BilingualText.astro — reusable DE/EN text wrapper
    Header.astro       — sticky nav, language toggle (DE/EN), hamburger on mobile
    ImageZoom.astro    — site-wide lightbox/zoom overlay (present in Layout)
    FloorplanZoom.astro — dedicated floorplan zoom overlay for Grundriss buttons
    RoomModal.astro    — shared room/common-space modal used by WG pages and Vermietung photo buttons
    RotationModal.astro — Belegungs-Rotationsprinzip document content, wraps TextModal
    TextModal.astro    — generic text panel component (overlay + scrollable card + close button)
    DecoRule.astro     — gold decorative divider line used across pages
  layouts/
    Layout.astro       — root layout: Header + main slot + ImageZoom + footer
  pages/
    index.astro        — redirects to /home/
    home.astro         — hero + intro + 3 nav cards + CTA (Verfügbarkeit / Kontakt)
    haus.astro         — "Das Haus" page, building history/photos
    lage.astro         — Location page with Google Maps embed
    vermietung.astro   — room/pricing table + floorplan/photo actions + rotation modal
    impressum-kontakt.astro — Legal / contact
    wohngemeinschaften/
      index.astro      — apartment listing with floorplan cards
      [apartment].astro — apartment detail + room grid + room modal
    zimmer/
      [slug].astro     — individual room page (not currently linked from nav)
  content/
    apartments/        — MDX files, one per WG (1og, 2og, ...)
    rooms/             — MDX files, one per room
  styles/
    global.css         — design tokens, reset, typography, container, section
  utils/
    images.ts          — loadImages helper; filters supported image formats and sorts cover first
public/
  first-image.png      — villa exterior (home hero)
  das-haus/            — photos for haus.astro
  wohngemeinschaften/  — per-apartment images; subfolder = image_folder in frontmatter
    [folder]/
      cover.*          — apartment carousel cover image
      grundriss.*      — floorplan (shown on listing cards + carousel)
      [others]         — shared space photos (named by prefix: kitchen, dining-room, ...)
  zimmer/
    [room-slug]/       — room photos; cover.* is shown first
```

---

## Design system

All CSS variables defined in `src/styles/global.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FAF8F3` | Page background (warm cream) |
| `--ink` | `#1C1A17` | Primary text |
| `--ink-light` | `#F5F2EC` | Light text on dark |
| `--gold` | `#B8952A` | Accent color, CTAs, borders |
| `--muted` | `#776D60` | Secondary text |
| `--border` | `#DDD9D0` | Borders, dividers |
| `--font-serif` | Cormorant Garamond | Headings, titles |
| `--font-sans` | DM Sans | Body, UI, labels |

Hero sections use `background: #fff` (not `var(--bg)`) so no cream band shows behind images.

---

## Bilingual (DE/EN)

Language is stored in `localStorage` as `'vt-lang'` and set as `data-lang="en"` on `<html>`.

Content visibility: elements with `data-de` are hidden when `data-lang="en"` and vice versa. This is handled by CSS in `global.css`. Always provide both `data-de` and `data-en` variants for any user-visible text.

---

## Key components

### ImageZoom (`src/components/ImageZoom.astro`)

Site-wide lightbox included in Layout. Opens via:
- HTML: `data-iz-open data-iz-src="url"` on any element
- JS: `document.dispatchEvent(new CustomEvent('iz:open', { detail: { src, images?, idx?, titleDe?, titleEn? } }))`

Settings: zoom range 100%–250%, scroll step 0.12, button step 0.3.

### Room modal (`src/components/RoomModal.astro`)

Shared modal used by apartment detail pages and Vermietung photo buttons. It renders room templates as `tpl-{slug}` and common-space templates as `tpl-space-{prefix}`, then clones the selected template into `#modal-body`.

Open triggers:
- Apartment room cards: `.open-room data-room="{slug}"`
- Vermietung photo buttons: `data-room-modal-open="{slug}"`

The `data-room-modal-open` trigger is only a different trigger shape; it opens the exact same RoomModal view as the WG room cards.

Navigation:
- **Desktop:** overlaid `‹ ›` arrow buttons on image sides (appear on hover)
- **Mobile:** touch swipe left/right; arrows hidden; `x / y` counter overlaid on image bottom-left
- Thumbnails shown on desktop, hidden on mobile (`@media max-width: 600px`)

Common-space tiles pass data into `RoomModal` via the `spaces` prop and open from `.space-card`; keep carousel, thumbnails, swipe, zoom, and image layout changes in `RoomModal` so room/common-space behavior stays shared.

### Text modal (`src/components/TextModal.astro`)

Generic component for any text panel. Renders a dimmed overlay, a centered scrollable card (`max-height: min(82svh, 680px)`), and a gold-bordered × close button inside the card top-right. Use it via `<TextModal id="some-id">` with slot content.

The page using it is responsible for open/close logic. Standard pattern (see `vermietung.astro`):
- Open: remove `hidden`, set `aria-hidden="false"`, lock body scroll
- Close: triggered by `.txt-close` click or backdrop click (`.txt-overlay`)
- Scroll containment: `keepScrollInsideModal(overlay)` prevents page scroll bleed-through

`RotationModal.astro` wraps `TextModal` with the Belegungs-Rotationsprinzip document. `vermietung.astro` uses it for the Nebenkostenpauschale panel too. Any future text popup should use `TextModal`.

---

## Content management

### Apartment frontmatter schema (`src/content/apartments/[slug].md`)

```yaml
---
title_de: "Wohnung 1. Obergeschoss"
title_en: "Apartment 1st Upper Floor"
description_de: "..."           # optional
description_en: "..."           # optional
shared_spaces:
  - {prefix: dining-room, de: Wohn-Esszimmer, en: Living-Dining Room}
  - {prefix: kitchen, de: Küche, en: Kitchen}
  - {prefix: bathroom1, de: Bad 1, en: Bathroom 1}
  # prefix = image filename prefix; de/en = tile label in that language
  # only entries with matching images in image_folder render as tiles
shared_m2: 86                   # optional — total communal area in m²
order: 10                       # sort order on listing page (lower = earlier)
image_folder: wohnung-1OG       # subfolder of public/wohngemeinschaften/
---
```

`shared_spaces` drives both tile order and tile labels. Only prefixes listed here AND that have photos in `image_folder` appear. Images named `[prefix]-cover.webp` are used as tile thumbnails; otherwise the first photo in that prefix group is used.

### Room frontmatter schema (`src/content/rooms/[slug].md`)

```yaml
---
title_de: "Zimmer 2 · 1. OG"
title_en: "Room 2 · 1st Floor"
teaser_de: "..."                # optional
teaser_en: "..."                # optional
apartment: "1og"                # must match slug of parent apartment file (lowercase, no .md)
size_m2: 10.7                   # optional
kaltmiete_eur: 620              # optional
nebenkosten_eur: 85             # optional
gesamtmiete_eur: 705            # optional
available_from: "18.05.2026"    # optional, free-form string
available: true                 # true = available, false = taken (default: true)
---
```

Room photos are loaded automatically from `public/zimmer/[room-slug]/`. No `images` field in frontmatter. `cover.*` is shown first; remaining photos sort numerically.

### Adding content

To add a new apartment:
1. Create `src/content/apartments/[slug].md` with required frontmatter
2. Add `image_folder: "[folder]"` pointing to `public/wohngemeinschaften/[folder]/`
3. Add images: `cover.*`, `grundriss.*`, shared space photos named by prefix (`kitchen-1.webp`, `dining-room-1.webp`, etc.)

To add a room:
1. Create `src/content/rooms/[slug].md` with `apartment: "[apt-slug]"` in frontmatter
2. Add room photos to `public/zimmer/[slug]/` — `cover.*` is shown first

### Image formats

`loadImages` only serves `jpg`, `png`, `webp`, `gif` — HEIC files are silently ignored.

To convert any photo to webp, use a single magick call — do NOT pipe through an intermediate PNG as it can corrupt colors:
```bash
# HEIC / JPG from iPhone (needs -auto-orient to bake in EXIF rotation)
magick source.HEIC -auto-orient -resize 1600x -quality 82 output.webp

# PNG or already-oriented JPG
magick source.png -resize 1600x -quality 82 output.webp
```
Target ~150–400 KB for covers. Portrait photos from iPhones require `-auto-orient` to bake in the rotation — skipping it produces a sideways image. Never route through `cwebp` with an intermediate PNG — the two-step pipeline causes color space corruption (images come out washed out/bright).

### Vermietung table conventions

Desktop table header is bilingual and includes all data columns:
- Größe / Size
- Kalt / Rent
- NK / Utilities
- Gesamt/M / Total/M
- Grundriss / Floorplan
- Verfügbar ab / Available from

Mobile keeps the header only for values that remain in the first row: size, cold rent, utilities, total rent. Wrapped action items self-label via their buttons. When a room is available and the date no longer fits in the first row, the second/action row shows `Verfügbar ab 18.05` / `Available from 18.05` next to the floorplan/photo buttons, without the year.

### Impressum / contact conventions

The Impressum page should render statically, without `reveal` classes or staggered entrance animation. Contact email is `info@haderslebener.de`. Do not reintroduce the old placeholder block for "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV".

---

## Known issues / low-priority backlog

- Overlay arrow buttons (‹ ›) on narrow desktop viewports (<600px) are hidden with no keyboard alternative — only touch swipe works
- Room modal image counter has no `aria-live` region for screen readers
- Deposit amount placeholder `[#]` on `wohngemeinschaften/index.astro` line 79/80 needs to be filled in
- 5 apartments (3og, Anbau, etc.) not yet built out — only 1og and 2og have content

---

## Design principles

This site targets the aesthetic of luxury real estate and portfolio sites. When making any visual or interaction decision, apply these tenets:

1. **Whitespace is content.** Generous negative space signals quality. Never compress the layout to fit more in.

2. **Design system is strict.** One serif (Cormorant Garamond) for headings, one sans (DM Sans) for body/UI. Scale and weight contrast are the hierarchy — not color. Use only defined tokens; the gold accent (`--gold`) appears sparingly on CTAs, dividers, and key highlights. Overuse dilutes it.

3. **Every interaction responds, and luxury moves slowly.** Hover states, cursor feedback, and transitions on all interactive elements — smooth and proportional. Entrances 0.8–1.5s, nothing snaps or pops. More animation is fine; fast animation is not. Scroll-triggered animations must replay every time the element scrolls into view — never fire once and stop.

4. **Images are the product.** Intentional cropping, no layout shift, always fade in. Images are never filler.

5. **Navigation is invisible.** Minimal links, clean page transitions, consistent placement. The header never competes with content.

6. **Mobile is equally considered.** Not a degraded version. Every layout decision validated at mobile sizes.

7. **Performance is part of the impression.** Slow loads break the aesthetic before the first pixel. Self-hosted fonts, appropriately sized images (WebP), above-the-fold content prioritized. Assets should be cached aggressively via HTTP/browser caching only — no cookies (EU site, no consent banner).

---

## Git workflow

- **Main branch deploys to live** — every push to `main` triggers GitHub Actions
- Worktrees directory: `.worktrees/` (gitignored)
- Branch naming convention: kebab-case description (e.g. `ui-mobile-fixes`)
- Always merge to `main` when done — owner prefers direct merge, not long-lived branches
