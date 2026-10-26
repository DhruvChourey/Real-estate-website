# AUREL ESTATES — Architectural Properties & Considered Living

A bespoke, digital experience for **AUREL ESTATES**, an international luxury real estate advisory specializing in modernist residences, historic estates, and architectural masterworks across Europe, the Middle East, and Asia.

Conceived and executed as an agency portfolio demonstration to pitch ultra-high-net-worth real estate brokerages, developers, and boutique advisory practices.

---

## 1. Brand Identity & Art Direction

- **Brand Name:** AUREL ESTATES
- **Tagline:** *"A more considered way to live."*
- **Positioning:** International luxury real estate advisory with a modern European editorial sensibility.
- **Palette:**
  - Backgrounds: Warm ivory (`#FAF7F2`, `#F4EFE6`), parchment (`#ECE4D4`), deep charcoal (`#121315`, `#17181A`).
  - Accents: Muted bronze (`#91714E`, `#BA9C7D`) and olive stone (`#5A6352`).
  - Fine dividers: `#E2DBD0` and `#27292D`.
- **Typography:**
  - Headlines & Serifs: *Cormorant Garamond* (Google Fonts) with italic editorial cuts.
  - Body & Micro-Interface: *Plus Jakarta Sans* (clean geometric tracking and legibility).

---

## 2. Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS with bespoke luxury tokens, micro-transitions, and custom scrollbars
- **Motion & Animations:** 
  - GSAP 3.15 + `@gsap/react`
  - GSAP `ScrollTrigger` for image reveals, parallax, and section timelines
  - Lenis (`lenis`) for smooth physics scrolling synchronized with GSAP tickers
- **Icons:** Lucide React (`lucide-react`)
- **Routing:** React Router v7 (`react-router-dom`)
- **State Persistence:** LocalStorage-backed Curated Dossier (Saved Properties)

---

## 3. Information Architecture & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero GSAP reveal timeline, property search filter, asymmetrical featured grid, signature property spread (*Villa Solstice*), guiding philosophy, international locations preview, journal preview, and private consultation banner. |
| `/properties` | **Properties Catalog** | Real-time live filtering by keyword, territory, architectural typology, price bracket, bedroom suites, and sorting (curated, price asc/desc, interior area). Includes **Grid** vs **Cartography (Map)** view toggle. |
| `/properties/:slug` | **Property Details** | Architectural dossier: hero photography, asking price, reference code, specs bar, interactive fullscreen Lightbox gallery, long-form narrative, structural highlights, tactile materials palette, interior appointments, interactive SVG floor plans with room hotspots, and private viewing booking form. |
| `/locations` | **Territories** | Prime international destinations showcase (London, Côte d’Azur, Lake Como, Dubai, Lisbon, Mumbai, Paris, Kyoto, Lugano) with architectural spotlights and filtered inventory links. |
| `/journal` | **The Aurel Journal** | Editorial essays and monographs on quiet living, daylight choreography, raw travertine, and urban sanctuaries with category filter and cover feature. |
| `/journal/:slug` | **Journal Article** | High-end editorial magazine layout featuring drop-caps, pull quotes, inline architectural photography, author attribution, and related reading. |
| `/about` | **About & Philosophy** | Brand manifesto, curatorial standards, four working tenets, advisory leadership team, and corporate disclosures. |
| `/contact` | **Private Advisory** | Confidential mandate intake form with category selection (Acquisition, Disposal, Viewing, Advisory), validation, session reference generator, and physical desks in London (Mayfair), Paris (Place Vendôme), Milan (Brera), and Dubai (DIFC). |

---

## 4. Key Interactive Features

1. **Cinematic Hero Reveal:** GSAP timeline revealing the background image with scale/brightness easing, metadata badge, line-by-line editorial serif headlines, and subtle scroll-linked parallax.
2. **Curated Dossier (Favourites Drawer):** Bookmark any property across the site; saved residences persist in `localStorage`. Access the slide-over drawer from the header to review saved properties or submit a consolidated inquiry.
3. **Interactive Lightbox:** Fullscreen responsive gallery on property detail pages with thumbnail filmstrip, image counter, category badges, captions, and keyboard controls (`ArrowLeft`, `ArrowRight`, `Escape`).
4. **Interactive SVG Floor Plans (`FloorPlanViewer`):** Tabbed level switcher (Ground Floor, First Floor, Subterranean Spa) with room dimensions, clickable hotspots, hover inspection tags, and north compass orientation.
5. **Interactive Cartography View:** Map view on `/properties` with plotted property pins and hover inspector cards.
6. **Discreet Private Consultation Modal (`EnquiryModal`):** High-touch consultation modal supporting acquisition briefings, private viewings, and off-market requests with realistic validation and demo confirmation feedback.
7. **Responsive Mobile Navigation:** Fullscreen sliding drawer menu for mobile viewports with accessible navigation and quick consultation trigger.

---

## 5. Local Setup & Execution

### Prerequisites
- Node.js (v18+ recommended, tested on v24.12.0)
- npm (v9+ recommended, tested on v11.18.0)

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The application will launch at `http://127.0.0.1:5173/`.

### Production Build
```bash
npm run build
```
Generates an optimized, tree-shaken static production bundle in `dist/`.

### Production Preview
```bash
npm run preview
```

---

## 6. Deploying to Vercel

The repository is pre-configured with [vercel.json](file:///d:/real%20esate%20website/vercel.json) for instant, zero-configuration Vercel deployment with client-side SPA routing rewrites and immutable asset caching.

### Option A: Deploy via GitHub (Recommended)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit - Aurel Estates luxury web app"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your site will be live worldwide in ~30 seconds with automatic SSL and preview URLs for every commit.

### Option B: Deploy via Vercel CLI
From the project root directory, run:
```bash
npx vercel
```
Follow the interactive prompts to link or create a project. For production deployment:
```bash
npx vercel --prod
```

---

## 7. External Integrations & Production Roadmap

When transitioning from demo mode to client production deployment:
- **Email & CRM Delivery:** Configure webhooks or serverless endpoints (e.g. Resend, SendGrid, Salesforce, HubSpot) within `EnquiryModal.tsx` and `ContactPage.tsx`.
- **Map Tiles:** Replace the minimalist SVG cartography in `PropertiesPage.tsx` with Mapbox GL / MapLibre GL by providing an API token.
- **Image CDN:** Host photography on a dedicated asset CDN (Cloudinary / Cloudflare Images) with automatic WebP/AVIF generation.

---

© 2026 AUREL ESTATES LTD. Built as a demonstration digital experience.
