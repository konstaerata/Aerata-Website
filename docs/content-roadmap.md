# Aerata B.V. — Content Roadmap

**Date:** 2026-08-21. Tactical companion to [`seo-strategy.md`](./seo-strategy.md) — references it rather than repeating the reasoning behind each item.

---

## Done this session

| Item | What changed | Files |
|---|---|---|
| Athens LocalBusiness schema | Added a second `LocalBusiness` JSON-LD entity for the Athens/Alimos office (previously only Delft existed), rendered sitewide alongside Organization + Delft | `src/lib/schemas.js`, `src/components/layout/SiteLayout.jsx` |
| CI workflow | New GitHub Actions workflow running lint, typecheck, a new SEO regression check, and build on every push/PR | `.github/workflows/ci.yml`, `scripts/check-seo-basics.js` |
| Unused dependency cleanup | Removed 10 confirmed-unused packages (lodash, jspdf, html2canvas, canvas-confetti, three, react-leaflet, react-quill, moment, both Stripe packages) plus recharts and its sole (also-unused) importer `src/components/ui/chart.jsx` | `package.json` |
| Fleet equipment contradiction | Fleet.jsx's own description said "Zenmuse P1 or L1" while the actual listed item is "Zenmuse L2" — fixed the description, and corrected 3 references to "L1" in article copy to "L2" (L1 was retired/upgraded, per confirmed decision) | `src/pages/Fleet.jsx`, `src/lib/sampleArticles.js` |
| Training.jsx noindex | Marked noindex (thin affiliate-link page, no unique Aerata content) and removed from the sitemap | `src/pages/Training.jsx`, `scripts/generate-sitemap.js` |
| Multilingual URL routing | Real `/nl/...` and `/el/...` URLs (previously client-side-only, invisible to crawlers), hreflang tags, per-locale canonicals, `<html lang>`, sitemap locale variants with cross-referenced alternates. See `seo-strategy.md`'s Multilingual section for what's deliberately excluded (article translation, locale-preserving internal links) | `src/App.jsx`, `src/lib/LanguageContext.jsx`, `src/components/layout/SiteLayout.jsx`, `src/components/SEO.jsx`, `scripts/generate-sitemap.js` |
| Duplicate canonical/OG tags (found this session, pre-existing bug) | `index.html` had static canonical + OG + Twitter tags that `react-helmet-async` never removed once a page's own `<SEO>` mounted — every page briefly shipped two conflicting canonical tags and duplicate OG tags. Removed the static duplicates; kept title/description as a noscript-safe fallback only | `index.html` |
| `fetchpriority` React warning (found this session) | `OptimizedImage.jsx` used the camelCase JSX prop that eslint-plugin-react wants, but the installed react-dom (18.3.1) warns on it at runtime and wants the lowercase DOM attribute — fixed with a documented lint exception | `src/components/shared/OptimizedImage.jsx` |

---

## Recommended next (not built this session — needs sign-off)

1. **Solar-PV thermal inspection sub-page**, split out from `/services/renewable-energy`. See `seo-strategy.md`'s Topical Architecture section for the full justification. Needs: a decision on the exact URL (e.g. `/services/renewable-energy/solar-pv-inspection` vs. a top-level `/services/solar-pv-inspection`), and either new copy or a restructuring of the existing solar section's content into the WizePM-style template (credentials → deliverables → commissioning guidance → visual examples → defect severity → use cases → FAQ → testimonial → CTA).
2. **FAQPage schema** — not implemented anywhere on the site. Requires real, visible FAQ content first (Google invalidates schema that doesn't match on-page text); a natural fit for the solar-PV sub-page above if it's built, or could be added standalone to each existing service page.
3. **Article translation** — currently English-only. Recommend translating the highest-traffic 3-5 articles (once GSC/analytics data identifies which those are) rather than translating all 15 speculatively.
4. **Locale-preserving internal links** — currently only the language switcher navigates between locale prefixes; other internal links always point at the English URL. Revisit if user behavior data (GA4, now live) shows this causes meaningful drop-off for non-English visitors.

## Not recommended now (with reasoning, so this doesn't get re-litigated)

- **Wind-only, telecom-only, or pipelines-only pages** — insufficient distinct evidence beyond what `/services/renewable-energy`, `/services/infrastructure`, and `/services/oil-gas` already state. Revisit if a named client case study specific to one of these sub-verticals accumulates (the Sulzer Schmid wind-blade partnership is the closest candidate today, currently proportionately represented within the renewable-energy page).
- **"Industrial inspection" and "asset intelligence" as standalone pages** — these are positioning/umbrella concepts, not distinct search-intent clusters. Better served by homepage/About narrative than dedicated URLs that would compete with the real service pages for the same underlying intent.
- **Full SSR/SSG migration** — the biggest structural lever available (see `seo-strategy.md`'s Executive Verdict and AI Search section), but a major architecture change out of scope for a content/SEO pass. Worth a dedicated future evaluation if AI-answer-engine visibility becomes a measured priority.

---

## Known content gaps carried forward from `audit-report.md` (still open)

- No `eslint-plugin-jsx-a11y` — accessibility regressions aren't caught at lint time.
- `Suspense fallback={null}` can cause a blank-screen flash on slow route transitions.
- No service-to-service cross-linking existed before a prior session added `RelatedServices`/`RelatedArticles` — confirm this is still working correctly after this session's routing changes (spot-checked during this session's verification, no regressions found).
