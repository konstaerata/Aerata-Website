# Performance & Indexing Improvements — 2026-08-21

Implements the High and Medium-High priority items from [`audit-report.md`](./audit-report.md), scoped to the two levers with the most direct effect on organic search visibility: Core Web Vitals (a Google ranking factor) and sitemap completeness (indexing coverage).

## What changed

### 1. Responsive image system
- **`src/lib/media.js`** — added `mediaUrl()` / `mediaSrcSet()` helpers that build Cloudflare Image Resizing URLs (`/cdn-cgi/image/...`) for AVIF/WebP + the standard responsive width ladder (320–1920px). Gated behind `MEDIA_TRANSFORMS_ENABLED` (currently `false` — see **Action required** below).
- **`src/components/shared/OptimizedImage.jsx`** — new reusable component: responsive `srcset`/`sizes`, `loading`/`fetchPriority` based on a `priority` prop, `width`/`height` to eliminate layout shift, async decoding, and a fade-in transition over a placeholder background color.
- Migrated the highest-traffic image usages to it: both hero images (homepage `HeroSection`, and `ServicePageHero` shared by all 5 service pages), 8 body-content images across the 5 service pages, and all 14 Fleet page card images.
- Left as plain `<img>` intentionally: small logos (~50px, not a bandwidth factor), circular team avatars in About (risk of breaking the circular crop for negligible gain), and the RenewableEnergy thermal-comparison slider (pixel-exact overlay interaction).

### 2. Fixed the homepage hero preload mismatch
- `index.html` was preloading `solarfarm.jpg` with `fetchpriority="high"` on every route — but that image is only used on `/services/renewable-energy`. The homepage's actual hero is a video (`promovideoforfrontpage.mp4`) that had no preload treatment at all.
- Fixed to preload the homepage's actual hero video instead.

### 3. Fixed render-blocking font loading
- `src/index.css` loaded Google Fonts via `@import`, which blocks CSSOM construction until that fetch completes — delaying the entire stylesheet, including Tailwind's own output.
- Moved to the standard preload+swap pattern in `index.html`: `<link rel="preload" as="style" onload="...rel='stylesheet'">` with a `<noscript>` fallback. Non-blocking, same fonts, same `display=swap`.

### 4. Fixed sitemap coverage
- `public/sitemap.xml` had 12 URLs and was missing every individual news article (`/news/:id`) despite articles already carrying full `Article` JSON-LD and unique per-page SEO metadata — meaning that investment was undermined by articles being undiscoverable via sitemap.
- Added **`scripts/generate-sitemap.js`**, wired into `npm run build` as a `prebuild`-style step (`"build": "npm run generate:sitemap && vite build"`). It regenerates `public/sitemap.xml` from the static route list plus every published entry in `src/lib/sampleArticles.js`, using each article's own date for `<lastmod>`.
- Sitemap now has 27 URLs (12 static + 15 articles).
- **Known limitation:** News/NewsArticle pages prefer a live `base44.entities.BlogPost` list at runtime and only fall back to `SAMPLE_ARTICLES` if that call fails or is empty. The sitemap generator has no build-time access to that live data source, so it sitemaps `SAMPLE_ARTICLES` only. If articles move fully into the live CMS, point the generator at that data source instead so the sitemap doesn't drift from what's actually published.

## Verified
- `npm run build` — clean, sitemap regenerates automatically first.
- `npm run lint` — no new errors introduced (5 pre-existing, unrelated unused-import errors remain untouched).

## Action required (not done — needs your Cloudflare account)

The responsive image system is built and wired up, but **image transforms are currently disabled** (`MEDIA_TRANSFORMS_ENABLED = false` in `src/lib/media.js`) because Cloudflare's on-the-fly image resizing only works on a custom domain proxied through your Cloudflare zone — it does **not** work on the free `pub-xxxx.r2.dev` dev subdomain every image on the site currently uses.

To unlock real AVIF/WebP + responsive-width delivery:

1. In the Cloudflare dashboard, go to the R2 bucket (`pub-8d398fd9e3a643679e74a0eacc815464`) → **Settings → Custom Domains** → add `media.aerata.com`.
2. Make sure that DNS record is proxied (orange cloud, not grey/DNS-only).
3. On the Cloudflare zone for `aerata.com`, enable **Image Resizing** (Speed → Optimization → Image Resizing, or it may require a paid plan tier — check current Cloudflare pricing for your zone).
4. In `src/lib/media.js`, flip `MEDIA_TRANSFORMS_ENABLED` to `true`.
5. Rebuild and deploy. Every page using `OptimizedImage` will immediately start serving AVIF/WebP at the correct size for each device with zero further code changes — the URLs are already built correctly, they're just inert until the domain exists.

Until that's done, images still benefit from lazy loading, fetchPriority hints, and zero layout shift (width/height reserved) — they just won't be resized/format-converted at the CDN edge.
