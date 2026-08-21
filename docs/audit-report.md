# Aerata B.V. Website — Technical SEO & Performance Audit

**Date:** 2026-08-12
**Repo:** `website` (Vite 6 + React 18 SPA, react-router-dom v6, react-helmet-async v3, Tailwind 3, shadcn/radix UI, Netlify hosting, Cloudflare R2 media CDN)

This audit is evidence-based: every claim below cites the file and line it was verified against. It reflects the actual state of the repository, not a generic checklist — several items commonly flagged in template SEO audits (missing canonical, missing per-page meta, missing sitemap, missing robots.txt) are **already implemented correctly** here and are noted as such rather than treated as gaps.

---

## 1. Routing & rendering strategy

Single client-side `BrowserRouter` in `src/App.jsx:39-62`, all routes under one `<Routes>` tree wrapped by `SiteLayout` (`src/components/layout/SiteLayout.jsx`), catch-all `*` → `PageNotFound` (`src/App.jsx:59`).

**No SSR/SSG.** No prerendering plugin, no `react-dom/server` usage. `netlify.toml:20-24` and `public/_redirects:2` both do the standard SPA `/* → /index.html` (200) fallback.

**Implication (Medium):** Content is gated behind JS download + execution + hydration. Google generally handles this fine, but non-JS crawlers/link-unfurlers (older Bing crawler, LinkedIn/Slack previews, some AI crawlers) only ever see the static `index.html` head — i.e. Home's title/description/OG tags — regardless of which page was actually shared. This affects social preview cards for every non-home URL.

---

## 2. Asset loading & JS bundle

**Code splitting:** `vite.config.js:17-30` defines manual chunks — `vendor` (react/react-dom/react-router-dom), `motion` (framer-motion), `query` (@tanstack/react-query + date-fns). Confirmed in `dist/assets/`.

**Route-level lazy loading:** Present for 12 of 14 routes (`src/App.jsx:22-33`) — Surveying, RenewableEnergy, Infrastructure, Environment, OilGas, Training, News, NewsArticle, Contact, Privacy, Fleet, ClientPortal are all `React.lazy()`. Only Home and About are eager (`App.jsx:18-19`), a reasonable choice for the two highest-traffic entry pages. Wrapped in one `<Suspense fallback={null}>` (`App.jsx:41`) — the `null` fallback means a blank-screen flash is possible during route transitions on slow connections.

**Unused dependencies** (zero imports found in `src/`, `entities/`, `src/api/`): `lodash`, `jspdf`, `html2canvas`, `canvas-confetti`, `three`, `react-leaflet`, `react-quill`, `moment`, `@stripe/react-stripe-js`, `@stripe/stripe-js`. `recharts` is only used inside `src/components/ui/chart.jsx`, which is itself never imported anywhere. These are likely tree-shaken out of the production bundle already, but they bloat `node_modules`, install time, and CI/build time, and mislead future contributors about what's live.

**Severity: Medium** (bundle hygiene, not a runtime bug).

---

## 3. CSS

`tailwind.config.js:4` content globs are correctly scoped (`./index.html`, `./src/**/*.{ts,tsx,js,jsx}`) — no purge risk. `postcss.config.js` is standard. `src/index.css` (186 lines) is small and organized — theme tokens, a few keyframes, `prefers-reduced-motion` guards (lines 135, 161). No CSS bloat found.

One notable item: line 1 imports Google Fonts via `@import` — see §5, this is a font-loading/render-blocking concern, not a Tailwind issue.

---

## 4. Image loading

**No reusable image component exists.** All 19 `<img>` tags across `src/` are raw, hand-written per usage.

- **alt text:** 19 `<img>` / 19 `alt=` — no missing alt attributes. Quality varies (some descriptive, some just entity names) but nothing broken.
- **srcset/sizes:** zero usage anywhere. Every image ships one fixed-resolution file to every viewport/DPR.
- **loading="lazy":** present on 12 of 19 `<img>` tags, correctly applied to below-fold images (service page body images, Fleet page). Correctly *omitted* on above-fold images (hero, logo).
- **fetchpriority:** used exactly once, on `src/components/shared/ServicePageHero.jsx:14` (shared hero used by all 5 service pages). The homepage's own hero fallback image (`src/components/home/HeroSection.jsx:62`) has no `fetchpriority`, and the homepage's actual hero content is a `<video autoPlay preload="auto">` (`HeroSection.jsx:49-60`) with no equivalent priority hint.
- **width/height attributes:** none on any `<img>` tag anywhere — a layout-shift risk on every image on the site.
- **R2 URL construction:** single source of truth in `src/lib/media.js` (`BASE_LOCAL` at line 19). **No Cloudflare image-resizing/transform logic exists** — no `/cdn-cgi/image/` usage anywhere. Every image is served as the raw uploaded original.
- **Format mix:** inconsistent — some newer fleet assets are `.webp` (`m350.webp`, `air3s.webp`), most sector/legacy imagery is `.jpg`/`.png`. No AVIF anywhere.

**Severity: High.** This is the single biggest Core Web Vitals and bandwidth risk in the codebase: full-resolution originals shipped to every device, no format negotiation, no CDN-side resizing, no layout-shift protection.

---

## 5. Fonts

`src/index.css:1`:
```css
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
```
This is a render-blocking `@import` inside the main stylesheet — the browser must fetch and parse it before the rest of `index.css` (including Tailwind's output) can apply.

`index.html:21-22` preconnects to `fonts.googleapis.com`/`fonts.gstatic.com`, which helps connection setup but doesn't remove the extra CSS-fetch hop the `@import` causes. `display=swap` is present in the query string, so there's no FOIT, but there is a FOUT/layout-shift moment as Oxanium (the primary heading/body font, `tailwind.config.js:9-16`) swaps in. Not self-hosted. No `<link rel="preload" as="font">` anywhere.

**Severity: Medium-High** — Oxanium is used on nearly every heading, and headings are frequently the LCP element.

---

## 6. Caching

Full `netlify.toml` review (77 lines):

- `/assets/*` → `max-age=31536000, immutable` (lines 40-43) — correctly matches Vite's actual hashed output path (`dist/assets/*.js`/`*.css`, confirmed against `vite.config.js` which has no custom `assetFileNames` override, so Vite's default hashing convention applies).
- `/*.html` and `/` → `max-age=0, must-revalidate` (lines 47-55) — correct, since `index.html` references hashed filenames and must never go stale.
- `/media/*` → `max-age=604800` (lines 59-62) — applies only to `public/media/*` (local logo/manifest icons), not R2-hosted images, which live on a separate origin outside Netlify's header control (R2 bucket cache headers weren't auditable from this repo).
- `/sitemap.xml`, `/robots.txt` → explicit content-type + 1hr cache (lines 66-76) — fine.

**Minor gap (Low):** no explicit cache rule for `/manifest.json` or `/404.html` — falls through to Netlify defaults, not verified explicitly.

---

## 7. SEO metadata

A reusable `src/components/SEO.jsx` (52 lines) wraps `react-helmet-async`, accepting `title`, `description`, `path`, `type`, `image`, `jsonLd`, `noindex`, and emits canonical + OG + Twitter Card + optional JSON-LD.

**Every one of the 14 routed pages uses it with unique title/description/path** — Home, About, all 5 service pages, Training, News, NewsArticle (dynamic per post), Contact, Privacy, Fleet, ClientPortal (correctly `noindex`). No raw ad-hoc `<Helmet>` usage found outside `SEO.jsx` itself.

**This is genuinely complete — no gaps found.** Unusual for a project at this stage; worth preserving as a pattern going forward (any new page must use `<SEO>`).

---

## 8. Structured data (JSON-LD)

Central builders in `src/lib/schemas.js` (129 lines): `organizationSchema`, `localBusinessSchema`, `breadcrumbSchema(items)`, `serviceSchema(...)`, `articleSchema(...)`.

**Coverage:**
- Organization → Home only (`Home.jsx:20`)
- LocalBusiness → About only (`About.jsx:167`)
- Service → all 5 service pages
- Article → NewsArticle, dynamic per post
- BreadcrumbList → Training, News, Contact, Privacy, Fleet, About

**Gaps:**
- No **FAQPage** schema anywhere, despite service pages likely having FAQ-suitable content (Medium priority as a rich-result opportunity, not a defect).
- `LocalBusiness`/`Organization` are single-page only rather than sitewide or combined via `@graph`. Given Aerata has two physical offices with full NAP data (`Footer.jsx:104,117`) and competes on local search terms, sitewide LocalBusiness presence (or at minimum on every service/location-relevant page) would be stronger. **Medium.**

---

## 9. Sitemap

`public/sitemap.xml` (12 URLs): `/`, `/about`, `/services/renewable-energy`, `/services/infrastructure`, `/services/surveying`, `/services/environmental`, `/services/oil-gas`, `/fleet`, `/training`, `/news`, `/contact`, `/privacy`.

Cross-referenced against `src/App.jsx:44-57` — all 12 map to real routes, **no dead entries**.

**Real gap:** `/news/:id` (individual article pages, `App.jsx:53`, `NewsArticle.jsx`) has **zero sitemap presence**. The sitemap is a static file in `public/` with no generator script, so as articles are published they never get added. Given each article already carries full `Article` JSON-LD (§8) and a dedicated SEO entry (§7), this is the most concrete, fixable gap in the whole audit — investment in per-article SEO is undermined by articles being undiscoverable via sitemap.

`/portal` is correctly excluded (noindex + robots-disallowed).

**Severity: High.**

---

## 10. robots.txt

```
User-agent: *
Allow: /
Disallow: /portal
Disallow: /api/
Sitemap: https://aerata.com/sitemap.xml
```

`Disallow: /portal` matches the real `/portal` route (`App.jsx:57`) exactly. `Disallow: /api/` is precautionary — no such public route exists (only an internal `src/api/base44Client.js` SDK client, not a routed path). Sitemap path is correct.

**No issues found — accurate and consistent with actual route structure.**

---

## 11. Canonical URLs

Hardcoded default in `index.html:11` (explicitly commented as overridden per-page), overridden per-page by `SEO.jsx:23`. `SITE_URL = 'https://aerata.com'` (no www) is consistent between `SEO.jsx:3` and `schemas.js:1`. `netlify.toml:8-12` 301-redirects `www` → non-www at the edge, matching the canonical strategy. No trailing-slash inconsistencies found — all paths are non-trailing-slash, matching route definitions exactly.

**No issues found.**

---

## 12. Internal linking

**Navbar** (`src/components/layout/Navbar.jsx`) links Home, About, all 5 services (dropdown), Fleet, Training, News, Contact, and `/portal`. **Footer** (`Footer.jsx:126-144`) duplicates Quick Links + a full Services column. Between the two, every real page except Privacy-from-nav (footer-only, expected) is reachable from every page — solid baseline.

**Gap:** no service-to-service cross-linking in page body content, and no "related articles"/"related services" pattern on `NewsArticle.jsx` or the service pages. This is nav-level linking only — no contextual, in-body links that pass topical relevance signal.

**Severity: Low-Medium** — a content-strategy gap, not a broken feature.

---

## 13. Accessibility

Spot-check, not a full WCAG pass:

- **Heading hierarchy:** Home, all 5 service pages, About, Contact, Fleet, NewsArticle, Privacy, Training, ClientPortal each have exactly one `<h1>`. **`News.jsx` has zero `<h1>` anywhere** — it only renders `SectionHeading` components, which output `<h2>` (`SectionHeading.jsx:39`). Confirmed via direct grep. **Real, concrete gap — Medium.**
- **Alt text:** no missing-alt violations (§4).
- **aria-labels:** Navbar is notably well done — labeled logo link, social icons, language switcher, hamburger; proper `aria-expanded`/`aria-haspopup`/`aria-controls` on dropdowns; full focus-trap + Escape-to-close on mobile menu (`Navbar.jsx:94-124`). Above average for a marketing site.
- **Form labels:** Contact form is HubSpot-embedded (markup generated by third-party script, outside repo control). `ROICalculator.jsx` inputs use proper `htmlFor`/`id` association.
- **Tooling gap (Low):** no `eslint-plugin-jsx-a11y` configured — a11y regressions like the News.jsx missing-h1 aren't caught automatically.

---

## 14. Core Web Vitals risks (synthesis)

1. **High** — No responsive images anywhere: no `srcset`/`sizes`, no CDN resize, no `width`/`height` on any `<img>`. Directly inflates mobile LCP and creates CLS risk on every image on the site.
2. **Medium-High** — `index.html:28` preloads `solarfarm.jpg` with `fetchpriority="high"` globally, but that image is only used on `/services/renewable-energy` — **not** the homepage, whose actual hero is a video with no preload treatment at all. On the highest-traffic entry point (`/`), the browser burns an early high-priority fetch on an asset that's never rendered there, while the real hero video gets no priority hint. This is a structural limitation of a static `index.html` in a pure SPA (can't easily be made route-aware without SSR).
3. **Medium-High** — render-blocking Google Fonts `@import` (§5), no font preload.
4. **Medium** — `Suspense fallback={null}` (`App.jsx:41`) can cause a blank-screen flash on lazy route transitions on slow connections.
5. **Low** — `framer-motion` is isolated into its own chunk (`vite.config.js:24`) but is imported by components used on the eagerly-loaded Home/About pages, so it effectively still ships on first load rather than being deferred.

Third-party scripts: HubSpot loader is `async defer` (`index.html:52`), correctly non-blocking.

---

## 15. Analytics

`package.json` has no analytics dependencies. No `gtag`, `googletagmanager`, `G-` measurement ID, or `clarity` reference found anywhere in `index.html` or `src/`. **The only tracking present is HubSpot** (`index.html:52`, plus a custom SPA page-view hook at `src/lib/useHubSpotTracking.js` wired into `App.jsx:11-14,40` to fire tracking on client-side route changes). A `CookieConsent.jsx` component exists, implying consent-gating for HubSpot.

**No Google Analytics/GTM or Microsoft Clarity present.** Not necessarily a defect — may be an intentional single-vendor decision — but flagged as requested. **Informational/Low.**

---

## 16. CI / automation

**No `.github/workflows` directory exists.** `package.json` does define `lint`, `lint:fix`, and `typecheck` scripts, and `eslint.config.js`/`jsconfig.json` are configured, but none of this runs automatically on push/PR. Netlify's own build step (`netlify.toml:1-3`, `npm run build`) will fail the deploy if the build itself breaks, but it doesn't run lint, typecheck, or any accessibility/broken-link checks — a regression like the News.jsx missing-h1 can land with zero automated signal.

**Severity: Medium.**

---

## Prioritized issue list

| # | Issue | Area | Severity |
|---|---|---|---|
| 1 | No responsive images: zero srcset/sizes, no CDN resize transforms, no width/height on any `<img>` | Images / CWV | **High** |
| 2 | `/news/:id` article pages entirely absent from sitemap.xml | Sitemap | **High** |
| 3 | Homepage hero preload targets the wrong image (renewable-energy hero, not the homepage's own video hero) | CWV / Preload | **Medium-High** |
| 4 | Render-blocking Google Fonts `@import`, no font preload | Fonts / CWV | **Medium-High** |
| 5 | `News.jsx` has no `<h1>` | Accessibility / SEO | **Medium** |
| 6 | No CI — lint/typecheck/build not gated automatically | Tooling | **Medium** |
| 7 | Organization/LocalBusiness schema only on one page each, not sitewide | Structured data | **Medium** |
| 8 | No cross-linking between service pages / no related-content pattern | Internal linking | **Low-Medium** |
| 9 | Unused dependencies still in package.json (lodash, jspdf, html2canvas, canvas-confetti, three, react-leaflet, react-quill, moment, Stripe packages, unused recharts/chart.jsx) | Bundle hygiene | **Medium** |
| 10 | No `eslint-plugin-jsx-a11y` | A11y tooling | **Low** |
| 11 | No FAQPage schema | Structured data | **Low** |
| 12 | `Suspense fallback={null}` — blank screen on slow route transitions | CWV / UX | **Low-Medium** |
| 13 | No GA4/GTM/Clarity — HubSpot only | Analytics | **Low / informational** |

**Confirmed already solid — no action needed:** robots.txt accuracy, canonical URL strategy, Tailwind content-glob scoping, per-page SEO component coverage, sitemap dead-entries, security headers, static-asset cache headers.
