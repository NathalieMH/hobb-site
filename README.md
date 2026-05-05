# 🏡 Anleitung für das Bearbeiten der HoBB-Website (für Mama & Papa)

Diese Anleitung erklärt einfach, wie ihr neue Apartments oder Zimmer hinzufügen, bestehende Einträge löschen oder anpassen könnt – ganz ohne Programmierkenntnisse.  
Alles funktioniert direkt über die GitHub-Webseite. Sobald ihr eine Änderung speichert (Commit), aktualisiert sich die Webseite automatisch.

---

## 🧱 Grundprinzip
Die Webseite zieht alle Informationen automatisch aus sogenannten **Markdown-Dateien (.md)**.  
Jede Datei steht für **ein Apartment** oder **ein Zimmer**.

- Apartments liegen in: `src/content/apartments/`
- Zimmer liegen in: `src/content/rooms/`
- Fotos der Apartments liegen in: `public/apartments/`
- Fotos der Zimmer liegen in: `public/rooms/`

---

## Schnellübersicht

### 🖼️ A. Fotos eines Zimmers ändern oder hinzufügen

Zimmerfotos liegen in `public/zimmer/[zimmer-name]/`, z. B. `public/zimmer/1og-zimmer-2/`

1. Auf GitHub: `public` → `zimmer` → richtigen Zimmerordner öffnen.
2. **"Add file" → "Upload files"** → Datei auswählen → **"Commit changes"**.
3. Zum Ersetzen einfach ein neues Foto mit **demselben Namen** hochladen.

**Namensregeln:**
- Das Titelbild heißt immer **`cover.webp`** — bei Zimmern mit Grundrissnummer z. B. **`3.2_cover.webp`** (die Nummer vor dem `_` entspricht der Zimmernummer im Grundriss).
- Weitere Fotos einfach durchnummerieren: `1.webp`, `2.webp` ... bzw. `3.2_1.webp`, `3.2_2.webp` ...
- `cover` erscheint immer als erstes, danach in numerischer Reihenfolge.

| Zimmer | Cover | Weitere Fotos |
|--------|-------|---------------|
| 1. OG Zimmer 1 | `cover.webp` | `1.webp`, `2.webp`, `3.webp` |
| 1. OG Zimmer 2 (Nr. 3.2) | `3.2_cover.webp` | `3.2_1.webp`, `3.2_2.webp` |
| 2. OG Zimmer 2 (Nr. 4.2) | `4.2_cover.webp` | `4.2_1.webp`, `4.2_2.webp` |

---

### 🛋️ B. Fotos für Gemeinschaftsräume hinzufügen

Fotos von Gemeinschaftsräumen (Küche, Bad, Balkon usw.) liegen im Wohnungsordner:  
`public/wohngemeinschaften/[wohnungsordner]/`, z. B. `public/wohngemeinschaften/wohnung-1OG/`

1. Auf GitHub: `public` → `wohngemeinschaften` → richtigen Wohnungsordner öffnen.
2. **"Add file" → "Upload files"** → Dateien auswählen → **"Commit changes"**.

**Namensregeln:**  
Der Dateiname bestimmt, in welcher Kachel das Foto erscheint. Immer mit einem der folgenden Präfixe beginnen:

| Präfix | Kachel | Beispiele |
|--------|--------|-----------|
| `kitchen` | Küche | `kitchen-1.webp`, `kitchen-2.webp` |
| `dining-room` | Wohn-Esszimmer | `dining-room-1.webp` |
| `bathroom1` | Bad 1 | `bathroom1-1.webp`, `bathroom1-2.webp` |
| `bathroom2` | Bad 2 | `bathroom2-1.webp` |
| `balcony` | Balkon | `balcony-1.webp` |
| `terrace` | Terrasse | `terrace-1.webp` |
| `laundry` | Waschküche | `laundry-1.webp` |
| `digital-lock` | Digitales Schloss | `digital-lock-1.webp` |
| `entrance` | Eingang | `entrance-1.webp` |

- Fotos desselben Raums einfach durchnummerieren: `kitchen-1.webp`, `kitchen-2.webp`, …
- Ein Foto mit dem Zusatz `-cover` (z. B. `kitchen-cover.webp`) wird als Vorschaubild der Kachel angezeigt — sonst erscheint das erste Foto.
- `cover.webp` (ohne Präfix) ist das Titelbild der Wohnung auf der Übersichtsseite — kein Raumfoto.
- `grundriss.webp` ist der Grundriss — wird separat angezeigt, nicht als Raumkachel.

**Reihenfolge der Kacheln steuern:**  
Die Reihenfolge der Gemeinschaftsraum-Kacheln wird in der Content-Datei der Wohnung festgelegt:  
`src/content/apartments/1OG.md` (bzw. `2OG.md`)

Das Feld `shared_spaces_de` listet die Räume in der gewünschten Reihenfolge:

```yaml
shared_spaces_de: ["Wohn-Esszimmer", "Küche", "Balkon", "Bad 1", "Bad 2", "Waschküche", "Digitales Schloss"]
shared_spaces_en: ["Living-Dining Room", "Kitchen", "Balcony", "Bathroom 1", "Bathroom 2", "Laundry Room", "Digital Lock"]
```

Räume, die nicht in dieser Liste stehen, erscheinen trotzdem — nur nach den gelisteten, in beliebiger Reihenfolge.

---

### 🏠 C. Cover-Bild einer Wohnung ändern

Das Cover-Bild ist das Foto, das auf der WGs-Seite für jede Wohnung angezeigt wird.

Liegt hier: `public/wohngemeinschaften/[wohnungsordner]/cover.webp`  
z. B. `public/wohngemeinschaften/wohnung-1OG/cover.webp`

1. Auf GitHub: `public` → `wohngemeinschaften` → richtigen Wohnungsordner öffnen.
2. Neues Foto muss **`cover.webp`** heißen und im `.webp`-Format sein.
3. **"Add file" → "Upload files"** → hochladen → **"Commit changes"**.

Alle Namenskonventionen für Gemeinschaftsraum-Fotos: → siehe Abschnitt B oben.

---

### ✏️ D. Zimmer-Inhalt ändern (Miete, Größe, Text)

Die Daten jedes Zimmers stehen in `src/content/rooms/[zimmer-name].md`, z. B. `src/content/rooms/1OG-zimmer-2.md`

1. Auf GitHub: `src` → `content` → `rooms` → Datei öffnen → **Stift-Symbol** klicken.
2. Gewünschte Felder anpassen:

```yaml
---
title_de: "Zimmer 2 · 1. OG"          ← Name auf Deutsch
title_en: "Room 2 · 1st Floor"         ← Name auf Englisch
apartment: "1OG"                        ← Nicht ändern
size_m2: 10.7                           ← Größe in m²
kaltmiete_eur: 620                      ← Kaltmiete in €
nebenkosten_eur: 85                     ← Nebenkosten in €
gesamtmiete_eur: 705                    ← Gesamtmiete in €
available_from: "18.05.2026"            ← Verfügbar ab
available: true                         ← true = verfügbar, false = vergeben
teaser_de: "Kurze Beschreibung DE"     ← Kurztext auf Deutsch
teaser_en: "Kurze Beschreibung EN"     ← Kurztext auf Englisch
---
```

3. **"Commit changes"** klicken.

---

## 🏢 1. Neues Apartment hinzufügen

1. Öffne auf GitHub den Ordner:  
   `src/content/apartments/`
2. Klicke oben rechts auf **“Add file” → “Create new file”**.
3. Gib der Datei einen Namen, z. B.:  
   ```
   apartment-3.md
   ```
4. Kopiere diesen Inhalt in die Datei und passe ihn an:
   ```yaml
   ---
   title: "5 Zimmer / Wohnung 3"
   shared_spaces: ["Bad 1", "Bad 2", "Küche", "Esszimmer", "Balkon", "Laundry"]
   order: 10
   ---
   Kurze Beschreibung der Wohnung …
   ```
   - `title` = Überschrift der Seite  
   - `shared_spaces` = geteilte Räume  
   - `order` = Reihenfolge (kleinere Zahl = weiter oben)
   - Der Text unter den Strichen ist die Beschreibung.
5. Klicke unten auf **“Commit changes”**.

👉 Fertig! Das neue Apartment erscheint automatisch auf der Seite  
`/wohngemeinschaften/`.

---

## 🚪 2. Neues Zimmer hinzufügen

1. Öffne den Ordner:  
   `src/content/rooms/`
2. Klicke auf **“Add file → Create new file”**.
3. Gib der Datei einen Namen, z. B.:  
   ```
   albert.md
   ```
4. Kopiere diesen Inhalt und passe ihn an:
   ```yaml
   ---
   title: "3.1 Albert"
   apartment: "apartment-3"      # muss dem Dateinamen des Apartments entsprechen!
   size_m2: 18
   cold_rent_eur: 520
   available_from: "2025-12"
   teaser: "Größtes Zimmer im 1. OG mit Ausblick."
   images: ["/rooms/albert1.jpg", "/rooms/albert2.jpg"]
   ---
   Ausführliche Beschreibung des Zimmers …
   ```
   - `apartment` = Verknüpft das Zimmer mit einem Apartment (z. B. apartment-3)
   - `images` = Liste der Fotos (siehe unten)
5. **Fotos hochladen:**  
   Gehe zu `public/rooms/` → **“Add file → Upload files”** → wähle die Bilder (z. B. `albert1.jpg`, `albert2.jpg`).

👉 Nach dem Speichern (Commit) erscheint das Zimmer automatisch unter dem richtigen Apartment.

---

## 🧹 3. Apartment oder Zimmer entfernen

1. Gehe in den entsprechenden Ordner (`apartments/` oder `rooms/`).
2. Klicke auf die Datei, die du löschen möchtest.
3. Oben rechts auf das Mülleimer-Symbol klicken → **“Delete this file”** → Commit.

Die Seite wird beim nächsten Deployment automatisch ohne diesen Eintrag neu erstellt.

---

## ✏️ 4. Inhalte ändern

### 4.1 Text oder Daten anpassen
1. Öffne die Datei des Apartments oder Zimmers, das du bearbeiten möchtest.
2. Klicke auf das **Stift-Symbol (Edit)**.
3. Ändere Text, Zahlen oder Daten (z. B. Miete, Beschreibung, Titel).
4. Klicke auf **“Commit changes”**.

### 4.2 Neues Bild hinzufügen
1. Lade das Foto hoch in:  
   `public/rooms/`  
   → z. B. `zimmer3b.jpg`
2. Öffne die zugehörige `.md`-Datei des Zimmers.
3. Füge den Dateinamen in der Bildliste hinzu:
   ```yaml
   images: ["/rooms/zimmer3a.jpg", "/rooms/zimmer3b.jpg"]
   ```
4. **Commit changes**.  
   Nach dem nächsten Deployment ist das neue Foto sichtbar.

---

💡 **Tipp:**  
- Ihr könnt Änderungen jederzeit rückgängig machen – GitHub speichert automatisch alte Versionen.
- ChatGPT kennt sich sehr gut mit GitHub aus! 


---
---


# 🏠 HoBB Site – Developer Details — Astro Static Website

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
- Add a working contact form
- Add a “currently available rooms” tag auto-filter.
