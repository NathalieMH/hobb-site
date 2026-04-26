# Theodor — CLAUDE.md

Project context for agents picking up work on this codebase.

---

## What this is

A static Astro site for **Theodor**, a student shared-apartment property in Berlin Steglitz-Dahlem. It markets rooms/apartments to students and provides info about the building, location, and availability.

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
    Header.astro       — sticky nav, language toggle (DE/EN), hamburger on mobile
    ImageZoom.astro    — site-wide lightbox/zoom overlay (present in Layout)
    DecoRule.astro     — gold decorative divider line used across pages
  layouts/
    Layout.astro       — root layout: Header + main slot + ImageZoom + footer
  pages/
    index.astro        — redirects to /home/
    home.astro         — hero + intro + 3 nav cards + CTA (Verfügbarkeit / Kontakt)
    haus.astro         — "Das Haus" page, building history/photos
    lage.astro         — Location page with Google Maps embed
    verfuegbarkeit.astro — Availability table
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

Settings: zoom range 75%–250%, scroll step 0.12, button step 0.3.

### Room modal (`[apartment].astro`)

Opened by clicking a `.open-room` button. Clones a `<template id="tpl-{slug}">` into `#modal-body`. Navigation:
- **Desktop:** overlaid `‹ ›` arrow buttons on image sides (appear on hover)
- **Mobile:** touch swipe left/right; arrows hidden; `x / y` counter overlaid on image bottom-left
- Thumbnails shown on desktop, hidden on mobile (`@media max-width: 600px`)

---

## Content management

To add a new apartment:
1. Create `src/content/apartments/[slug].mdx` with required frontmatter
2. Add `image_folder: "[folder]"` pointing to `public/wohngemeinschaften/[folder]/`
3. Add images: `cover.*`, `grundriss.*`, named space images (`kitchen-1.jpg`, `dining-room-1.jpg`, etc.)

To add a room:
1. Create `src/content/rooms/[slug].mdx` with `apartment: "[apt-slug]"` in frontmatter
2. Add room photos to `public/zimmer/[slug]/` — `cover.*` is shown first

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

3. **Every interaction responds, and luxury moves slowly.** Hover states, cursor feedback, and transitions on all interactive elements — smooth and proportional. Entrances 0.8–1.5s, nothing snaps or pops. More animation is fine; fast animation is not.

4. **Images are the product.** Intentional cropping, no layout shift, always fade in. Images are never filler.

5. **Navigation is invisible.** Minimal links, clean page transitions, consistent placement. The header never competes with content.

6. **Mobile is equally considered.** Not a degraded version. Every layout decision validated at mobile sizes.

7. **Performance is part of the impression.** Slow loads break the aesthetic before the first pixel. Self-hosted fonts, appropriately sized images (WebP), above-the-fold content prioritized. Assets should be cached aggressively; animations must always replay correctly on cached page loads.

---

## Git workflow

- **Main branch deploys to live** — every push to `main` triggers GitHub Actions
- Worktrees directory: `.worktrees/` (gitignored)
- Branch naming convention: kebab-case description (e.g. `ui-mobile-fixes`)
- Always merge to `main` when done — owner prefers direct merge, not long-lived branches
