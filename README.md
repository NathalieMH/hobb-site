# 🏠 HoBB Site — Astro Static Website

This project is a minimal static website for the HoBB student house. It is built with **[Astro](https://astro.build)**, deployed automatically using **GitHub Actions**, and hosted on **GitHub Pages**.

---

## 🌐 Overview

The HoBB website consists of static pages that describe the building, its location, and its shared apartments (Wohngemeinschaften) and rooms (Zimmer).  
Everything is generated automatically — no CMS, no backend — just Markdown content and Astro templates.

---

## ⚙️ Tech Stack

| Tool | Purpose |
|------|----------|
| **Astro** | Static site generator that builds fast HTML pages. |
| **TypeScript** | For schema definitions in the content collections. |
| **Markdown (MD)** | For apartment and room content files. |
| **GitHub Pages** | Hosts the built site. |
| **GitHub Actions** | Automatically builds and deploys the site every time you commit to `main`. |

---

## 🧱 Folder Structure

```
hobb-site/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml          # CI/CD: builds Astro & deploys to GitHub Pages
│
├─ public/
│  ├─ logo.png               # Header logo
│  ├─ home-wohngemeinschaften.png  # Home tile images
│  ├─ home-lage.jpg
│  ├─ home-dashaus.png
│  └─ rooms/                 # (Optional) Parents can drag photos here for rooms
│
├─ src/
│  ├─ content/
│  │  ├─ config.ts           # Defines schema for apartments + rooms
│  │  ├─ apartments/         # Each .md file = one apartment (Wohngemeinschaft)
│  │  └─ rooms/              # Each .md file = one room
│  │     └─ TEMPLATE.md      # Example file showing what frontmatter to use
│  │
│  ├─ components/
│  │  └─ Header.astro        # The black top banner (logo + navigation)
│  │
│  ├─ layouts/
│  │  └─ Layout.astro        # Base layout applied to all pages (includes header)
│  │
│  └─ pages/
│     ├─ index.astro         # Welcome “Enter HoBB” page (no header)
│     ├─ home.astro          # Home page (with banner, 2 columns, 3 tiles)
│     ├─ wohngemeinschaften/
│     │  ├─ index.astro      # Lists all apartments
│     │  └─ [apartment].astro # Apartment detail page, auto-shows its rooms
│     ├─ zimmer/
│     │  └─ [slug].astro     # Room detail page
│     ├─ lage.astro          # Location page
│     ├─ haus.astro          # House description
│     ├─ impressum-kontakt.astro  # Legal/contact info
│     └─ 404.astro           # Not found page
│
├─ astro.config.mjs          # Astro configuration (site URL, etc.)
├─ package.json              # Dependencies + npm scripts
└─ README.md                 # You are here
```

---

## 🚀 Deployment

Deployment is automatic via **GitHub Actions**.

1. When you **commit or edit a file** in the `main` branch, GitHub builds the site using Astro.
2. The resulting HTML files are uploaded to GitHub Pages.
3. You can view the live site at:  
   **https://nathaliemh.github.io/hobb-site/**

If the workflow ever fails, check:
- `.github/workflows/deploy.yml` (correct branch + folder)
- That all Astro files compile (no syntax errors)
- That `astro.config.mjs` has the correct base path:  
  ```js
  export default {
    site: 'https://nathaliemh.github.io/hobb-site/',
    base: '/hobb-site/',
  };
  ```

---

## 🧩 How the Layout Works

### Layout.astro
Defines the global page structure — includes:
- `<Header />` (the black top banner)
- A footer
- The main content slot (`<slot />`)

Every standard page (`home`, `lage`, `haus`, etc.) wraps content inside `<Layout>`.

### Header.astro
Contains:
- The HoBB logo (linking to `/home/`)
- A responsive hamburger menu for mobile
- Navigation links: Home, Wohngemeinschaften, Lage, Haus, Impressum/Kontakt

### index.astro
A full black “welcome” page with white text saying **“Enter HoBB”** linking to `/home/`.

### home.astro
The main home page showing:
- Two columns (German & English intro)
- Three clickable image tiles linking to the main subpages:
  - die Wohngemeinschaften
  - die Lage
  - das Haus

---

## 📦 Content System (Astro Content Collections)

Astro has a **content collections** feature, which validates your Markdown content using schemas.

Defined in `src/content/config.ts`:
```ts
import { defineCollection, z } from "astro:content";

const apartments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    shared_spaces: z.array(z.string()).default([]),
    order: z.number().default(0)
  })
});

const rooms = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    apartment: z.string(),
    size_m2: z.number().optional(),
    cold_rent_eur: z.number().optional(),
    available_from: z.string().optional(),
    teaser: z.string().optional(),
    images: z.array(z.string()).default([])
  })
});

export const collections = { apartments, rooms };
```

Each `.md` file inside `/src/content/apartments` or `/src/content/rooms` must follow these rules.

---

## 👩‍💻 Developer Setup

If you want to run this locally:
```bash
npm install
npm run dev
```

Visit:  
👉 `http://localhost:4321/hobb-site/home/`

When ready to publish:
```bash
git add .
git commit -m "update site"
git push
```

GitHub Actions will rebuild automatically.

---

## 🧭 How My Parents Can Add Apartments & Rooms

> 🧠 You don’t need to touch code — just edit or add Markdown files.  
> Everything else updates automatically when you save & commit.

---

### 🏢 To Add a New Wohngemeinschaft (Apartment)

1. Go to the folder:  
   `src/content/apartments/`

2. Create a new file (click **Add file → Create new file**)  
   Name it like this:  
   ```
   wohnung-3.md
   ```

3. Paste this **template** and fill it out:

   ```yaml
   ---
   title: "Wohnung 3"
   shared_spaces:
     - Küche
     - Wohnzimmer
     - Bad
   order: 3
   ---
   ```

4. Commit the file (click **Commit changes**).

That’s it! It will appear automatically on  
👉 `/wohngemeinschaften/`

---

### 🚪 To Add a Room (Zimmer)

1. Go to the folder:  
   `src/content/rooms/`

2. Create a new file, e.g.:  
   ```
   wohnung3-zimmer1.md
   ```

3. Paste this and fill it out:

   ```yaml
   ---
   title: "Zimmer 1 – Wohnung 3"
   apartment: "3"
   size_m2: 14
   cold_rent_eur: 450
   available_from: "2025-02"
   teaser: "Helles Zimmer mit Gartenblick"
   images:
     - "/rooms/zimmer1a.jpg"
     - "/rooms/zimmer1b.jpg"
   ---
   ```

4. Upload photos to:
   ```
   public/rooms/
   ```
   (just drag and drop via GitHub web UI)

5. Commit changes.

The new room will now automatically appear on that apartment’s page.

---

### ✅ Summary for Parents

| Task | Folder | What to Do |
|------|---------|------------|
| Add new apartment | `src/content/apartments/` | Create `.md` file using template |
| Add new room | `src/content/rooms/` | Create `.md` file with frontmatter |
| Upload room photos | `public/rooms/` | Drag & drop images |
| Publish | Nothing extra — GitHub auto-updates site |

---

## 🪄 Auto-Generated Pages

| Path | Description | Source |
|------|--------------|--------|
| `/home/` | Two-column text + three image tiles | `src/pages/home.astro` |
| `/wohngemeinschaften/` | Lists all apartments | Pulls from `/src/content/apartments/` |
| `/wohngemeinschaften/[apartment]/` | Apartment detail page | Generated per apartment file |
| `/zimmer/[slug]/` | Room detail page | Generated per room file |
| `/lage/` | Location text page | Static |
| `/haus/` | House description | Static |
| `/impressum-kontakt/` | Legal + contact info | Static |

---

## 🧩 Future Improvements (Optional)

- Add a small CMS like **DecapCMS** for visual editing.
- Add a “currently available rooms” tag auto-filter.
- Add a gallery layout for rooms.
