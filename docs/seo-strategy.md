# Aerata B.V. — SEO Strategy

**Date:** 2026-08-21
**Scope:** competitive positioning, topical architecture, multilingual strategy, and backlink/authority direction. Cross-references [`audit-report.md`](./audit-report.md) (technical/CWV audit) and [`performance-report.md`](./performance-report.md) (image/font/preload work) rather than repeating their findings.

**Market context:** Aerata B.V. is Dutch-incorporated (Delft HQ), but Greece is the business's largest market today, with the Athens/Alimos office serving Greece, Cyprus, and Southeast Europe. This shapes the priority order throughout this document — Greek-market visibility is not a secondary consideration to the Dutch home base, it is the primary one, with the Netherlands second.

---

## Executive verdict

Aerata's biggest constraint is structural, not content: the site is a **client-side-only React SPA with no server-side rendering** (`docs/audit-report.md` §1). Googlebot handles this reasonably well via its JS-rendering pipeline, but every other consumer of this site — Bing's crawler, link-unfurlers (LinkedIn, Slack), and AI crawlers (ChatGPT, Perplexity, Claude) — either doesn't execute JavaScript at all or does so unreliably. Concretely, this means:

- Non-Google search engines and AI answer engines are working from a much thinner signal than what a human visitor sees.
- Before this session, the site's Dutch/Greek content was **completely invisible** to every crawler, including Googlebot's non-JS-executing pass, because language switching was pure client-side state with no distinct URL (fixed this session — see Multilingual section below).

Within that ceiling, the content itself is in genuinely good shape. This is not a thin-content site: the 5 service pages carry real, specific, evidenced claims (IEC 62446-3 compliance, named clients, specific equipment, measured outcomes) rather than generic "professional drone services" copy. That's a real asset — most competitors researched this session lean on adjectives ("fast," "accurate," "AI-powered") where Aerata already has numbers and named clients to back claims up.

**The gap is not content depth. It's discoverability and structural completeness**: until this session, sitemap coverage was incomplete, hreflang didn't exist, LocalBusiness schema only covered one of two real offices, and a genuinely thin page (Training) was sitting in the indexable footprint. Most of that is now fixed (see `content-roadmap.md`). What's left is genuinely strategic: whether to split out a dedicated solar-PV page, and executing the ongoing work of building authority and backlinks in a market where two real competitors (OPSISS, WizePM) are already doing focused, evidence-backed positioning.

---

## Competitive intelligence

Verified via live web research this session (2026-08). This is a snapshot, not continuous monitoring — re-verify before treating specific claims (turnaround times, certifications) as still current.

### OPSISS (opsiss.com) — Greece/EU
- Title tag: *"OPSISS | Drone Inspection Φωτοβολταϊκών, Cell Towers & Solar Farms — Greece & EU"*
- Services: thermal/PV inspection, wind turbine, power line, 3D models/photogrammetry, mapping/surveying, film/aerial cinema, cell tower inspection, search & rescue.
- Claims: IEC 62446-3 and IEC 61400 compliance, EASA certified.
- Site structure: Services / Why Us / Process / Contact, with an EN/EL language toggle — i.e., OPSISS already treats bilingual EN/EL as table stakes for the Greek market, which validates the multilingual investment made this session.
- **Direct competitive overlap with Aerata**: solar, wind, power line, cell tower, mapping — essentially the same service set Aerata already offers, in the same country.

### WizePM (wizepm.com)
- Their solar-PV thermal inspection page is the strongest structural reference found: hero → credentials banner → "what you get" (deliverables) → commissioning guidance → "what the output looks like" (visual examples) → "what we catch" (defect categories by severity) → "where it fits" (use cases) → FAQ → testimonial → CTA.
- Claims: next-day ranked report, "EASA-authorised across all 27 EU member states," IEC TS 62446-3:2017 compliant, "DCAC-registered," 100% module-level coverage in a single flight.
- **Gap this reveals**: Aerata's renewable-energy page covers solar *and* wind together; WizePM's solar-only page can go deeper on solar-specific detail (defect taxonomy, exact deliverable formats) than a page splitting attention across two verticals can.

### DutchInspect BV (dutchinspect.net, Ouddorp NL)
- A real, direct competitor in Aerata's other home market. Wind + solar, SCIOS Scope 12 certified, up to 15 turbines/day AI-classified blade inspection (claimed 75% faster than climbing-based methods), North Sea offshore wind experience, LiDAR/photogrammetry claiming <1% volume deviation.
- **Note**: SCIOS Scope 12 is a Dutch-specific certification scheme (electrical installation inspection) that Aerata does not currently claim. Not a gap to fabricate — flagged only so it's a known difference, not an oversight.

### SpectX (spectx.nl)
- Another Netherlands competitor: wind turbine blade/nacelle/tower inspection (corrosion mapping, weld/crack inspection, delamination/debonding) plus solar park structural inspection.

### What this means for Aerata
Aerata is not entering an empty field in either market — Greece has at least one focused, EASA/IEC-compliant competitor (OPSISS) with bilingual positioning already in place, and the Netherlands has at least two (DutchInspect, SpectX) with real technical depth. Aerata's genuine differentiators, evidenced by what's already on the site, are: (a) dual-market presence with two real offices (most competitors researched are single-country), (b) named enterprise clients across both energy and infrastructure sectors (iSOLAR, Voltalia, EDF Renewables, VITO, EYDAP), (c) a named specialist partnership for wind blade photogrammetry (Sulzer Schmid Laboratories AG) that no competitor researched mentions having.

---

## Prioritization methodology

**No keyword-volume tool was used this session** (no Ahrefs/Semrush/Google Search Console access). Every recommendation below is prioritized by:

1. **Competitive gap** — does a verified competitor have a dedicated page/asset for this that Aerata doesn't?
2. **Commercial intent** — bottom-funnel service/inspection-type content is prioritized over generic awareness content.
3. **Evidence strength** — topics where Aerata has real named clients, certifications, or measured outcomes to substantiate claims outrank topics with no track record on the site.

Real search-volume and difficulty validation (via Ahrefs, Semrush, or Google Search Console query data once the site has been indexed with the fixes in this session) is a necessary follow-up before committing significant content-production budget to any single topic below — treat this document as a directional starting point, not a final validated keyword plan.

---

## Topical architecture: verdict

The mission brief that prompted this work proposed 10 candidate topical clusters (industrial inspection, solar/PV, wind, power/utility, telecom, pipelines/oil&gas, LiDAR, photogrammetry, asset intelligence, plus location-based clusters). Cross-referencing against what already exists:

| Candidate cluster | Existing coverage |
|---|---|
| Industrial inspection | Umbrella positioning concept, not a distinct search intent — fold into homepage/About narrative |
| Solar / PV | `/services/renewable-energy` (shared with wind) |
| Wind | `/services/renewable-energy` (shared with solar) |
| Power / utility | `/services/infrastructure` |
| Telecom | `/services/infrastructure` |
| Pipelines / oil & gas | `/services/oil-gas` |
| LiDAR | `/services/surveying` |
| Photogrammetry | `/services/surveying` |
| Asset intelligence | Positioning term, not a search-intent cluster — fold into narrative, not a URL |

**Verdict: deepen the 5 existing pages, plus one selective split — do not fragment into many new URLs.**

The one genuinely justified split: **a dedicated solar-PV thermal inspection sub-page**, split out from `/services/renewable-energy`, modeled on WizePM's page structure (credentials banner → deliverables → commissioning guidance → visual output examples → defect-severity categories → use cases → FAQ → testimonial → CTA). Justification:

- Solar-PV is Aerata's single most evidenced vertical on the current site — IEC 62446-3 compliance, named solar-sector clients (iSOLAR, Voltalia, EDF Renewables), a specific measured claim (237 MWp inspected in one engagement, per the site's own stats).
- Both verified competitors (OPSISS, WizePM) independently treat this exact sub-topic as its own standalone page — real signal of validated search/buyer intent distinct from generic "renewable energy inspection."
- Splitting lets solar-specific defect taxonomy (hotspots, PID, bypass diode faults, soiling) get real depth instead of competing for space with wind content on the same page.

**Not recommended now**: a wind-only page, a telecom-only page, or a pipelines-only page. None have distinct evidence beyond what `/services/infrastructure` and `/services/oil-gas` already state; each additional split adds thin-content risk and dilutes internal-linking equity across more URLs than the current evidence base supports. Revisit if/when Aerata accumulates named client case studies specific to one of these sub-verticals (the wind blade photogrammetry partnership with Sulzer Schmid Laboratories AG is the closest existing candidate, but it's currently folded into the renewable-energy page's wind section, which is proportionate to the current evidence).

This split is new-page/new-copy work requiring sign-off before building — not implemented in this session.

---

## Multilingual strategy

**Before this session:** language switching (EN/NL/EL) was 100% client-side, backed by `localStorage`, with zero URL distinction. Per current (2026) Google guidance verified this session, this made non-English content **functionally invisible** to virtually every crawler — most non-Google crawlers, including AI crawlers, don't execute JavaScript at all, and even Googlebot's rendering pass sees the same URL regardless of language, giving it no signal to index a Dutch or Greek variant separately.

**Implemented this session:** real per-locale URL routing. English remains at the original, unprefixed URLs (`/services/surveying`, etc.) — no backlinks or existing indexing is disrupted. Dutch and Greek are now served at `/nl/...` and `/el/...`, rendering the same components with `src/locales/nl.json` / `el.json` (which were already fully translated — 464 lines each, matching English exactly, so no content gap needed filling). Each language now has:
- Its own crawlable URL
- A self-referential canonical tag
- `hreflang` alternates (en / nl / el / x-default) on every translated page
- A correctly declared `<html lang>` attribute
- Sitemap entries with cross-referenced `<xhtml:link rel="alternate">` tags per Google's documented multilingual sitemap pattern

**Deliberately out of scope this session**: news articles (`src/lib/sampleArticles.js`) remain English-only — translating 15 articles × 2 languages is a content-production task, not a technical one. `SEO.jsx`'s `translated={false}` flag on `NewsArticle.jsx` correctly suppresses hreflang for this content rather than falsely claiming Dutch/Greek article variants that don't exist. If article content becomes a priority channel, translating the highest-performing 3-5 articles (once there's traffic data to identify which those are) is a reasonable next step rather than translating all 15 upfront speculatively.

**Also deliberately out of scope**: rewriting every internal `<Link>` across the codebase to preserve the current locale when clicked. Only the language switcher itself navigates between locale prefixes; other internal links (nav, footer, cross-links, CTAs) continue pointing at the English/unprefixed path. This is a real, accepted UX tradeoff — an engaged bilingual user clicking a service link while browsing in Dutch will land back on the English version of that page. It does not affect SEO correctness (URLs, hreflang, and canonicals are all still correct), only navigation continuity for a specific user flow. Revisit if user behavior data shows this is a significant friction point.

**Given the market context** (Greece is the primary market, Netherlands second): if there's a choice to invest further translation/localization effort in only one language first, Greek should take priority over Dutch, even though the company is Dutch-incorporated — the current fully-equal EN/NL/EL translation coverage doesn't force that choice today, but it should guide where future content (case studies, articles, the solar-PV split if greenlit) gets translated first.

### Update (2026-09-01): aerata.gr domain split

Greek's canonical home moved from `aerata.com/el/...` to its own domain, `aerata.gr`, at the URL root (e.g. `aerata.gr/about`, not `aerata.gr/el/about`) — `aerata.gr` was added in production as a domain alias on the same Netlify site as `aerata.com`. This is a stronger signal than a path prefix: a market-specific ccTLD (`.gr`) is itself a geo-targeting signal Google uses independent of hreflang, and it's the pattern both verified competitors (OPSISS, WizePM) effectively achieve via their own `.com`/ccTLD or subdirectory choices.

What changed:
- `src/lib/siteOrigins.js` (new, shared by `SEO.jsx`, `schemas.js`, `scripts/generate-sitemap.js`) maps `el` → `https://aerata.gr` (root, no prefix) while `en`/`nl` stay under `aerata.com` exactly as before.
- The legacy `aerata.com/el/...` routes **still render** (no broken links, no 404s for anything that was already indexed or bookmarked there) but their canonical tag now points to the equivalent `aerata.gr/...` URL — a standard, low-risk demotion rather than a hard redirect. Revisit a hard 301 once `aerata.gr` has accumulated its own indexing history.
- Athens `LocalBusiness` JSON-LD (`src/lib/schemas.js`) now points at `aerata.gr` instead of `aerata.com` — the Greek-market office's canonical URL is now the Greek-market domain, while Delft stays `aerata.com` and the umbrella `Organization` entity stays `aerata.com`.
- `robots.txt` is the one place this couldn't be handled client-side (crawlers fetch it directly, never through the React app) — a new `public/robots-gr.txt` is served on the `.gr`/`www.gr` host via a Netlify host-conditional redirect in `netlify.toml`, pointing its `Sitemap:` line at `https://aerata.gr/sitemap.xml`.
- Internal in-page links (nav, footer, cross-links, CTAs) were **not** rewired to be `.gr`-aware — same accepted tradeoff as the original `/nl/`/`/el/` work above, now extended to cover the domain split too. Only the language switcher does a real cross-origin navigation between `.com` and `.gr`.

---

## Backlink / authority strategy (directional)

No fabricated domain-authority, traffic, or backlink-count figures appear below — this section identifies real, named opportunities already evidenced on the site, not a scored backlink audit (which would require a tool like Ahrefs).

**Named entities already on the site as case-study / co-marketing / backlink opportunities:**
- **iSOLAR, Voltalia, EDF Renewables** — solar-sector clients; a joint case study or testimonial placement (with their consent) is both a conversion asset and a natural backlink opportunity from their own sites/press if they're willing to reference the engagement.
- **VITO, EYDAP** — the Lake Marathon water-quality monitoring project (VITO research partnership, EYDAP as the client) is a genuinely distinctive project (drinking-water reservoir monitoring for ~10% of Athens' water supply) that few competitors could point to. Worth pitching as a press/PR story to Greek water-infrastructure or environmental publications specifically, not just published as a blog article.
- **Sulzer Schmid Laboratories AG** — the wind-blade photogrammetry partnership is a genuine technology-partner relationship. A joint technical piece (co-authored or cross-linked) is a stronger authority signal than an Aerata-only article referencing them.
- **DroneLicense.eu** — already a formal partnership (per `sampleArticles.js` article #11); confirm whether this is a reciprocal-link relationship already, and if not, whether one is appropriate.

**Industry-relevant directories/associations** (not yet verified as real listing opportunities — flag for direct outreach, don't assume automatic eligibility): EASA-authorised operator directories, Dutch and Greek renewable-energy industry associations, geospatial/surveying professional bodies (given the LiDAR/photogrammetry expertise on `/services/surveying`).

**PR angle worth prioritizing**: the Lake Marathon story and the North Sea offshore-platform inspection story (`sampleArticles.js` #6) are both genuinely newsworthy beyond a company blog — critical water infrastructure and offshore energy safety are topics general business/trade press cover. A digital PR push targeting Greek and Dutch trade publications with these two specific stories (not generic "we do drone inspections" pitches) is higher-leverage than broad outreach.

---

## AI search / answer-engine visibility

Per verified current guidance: there is no legitimate "AI SEO" trick — the same fundamentals that help Google (clear entity information, authoritative pages, direct answers, original evidence, strong internal linking) are what make a site citable by ChatGPT, Perplexity, Claude, and Google's AI Overviews. Aerata's structured data work this session (sitewide Organization + both LocalBusiness entities, Service schema per page, Article schema per post) directly supports this — structured, unambiguous entity data is exactly what these systems parse most reliably. The SPA rendering ceiling (see Executive Verdict) is the main risk here too: if an AI crawler doesn't execute JavaScript, it sees even less than a non-JS search crawler would, since there's no server-rendered fallback content at all beyond the minimal `noscript` block in `index.html`. This is the strongest argument, if one is needed later, for eventually moving toward SSR/SSG — not for Google specifically (which handles the current setup adequately) but for the growing share of discovery happening through AI systems that may not render JS at all.

---

## Summary of what's already been implemented (this session)

See `content-roadmap.md` for the full itemized list. Headline items: Athens LocalBusiness schema added (previously only Delft existed), CI workflow with lint/typecheck/build/SEO-regression-check, unused dependency cleanup, a real equipment-copy contradiction (Zenmuse L1→L2) fixed across Fleet.jsx and article copy, Training.jsx marked noindex, and the full multilingual URL routing described above — including a pre-existing bug found and fixed along the way (duplicate/conflicting canonical and Open Graph tags on every page, caused by `react-helmet-async` never removing static tags that were already in `index.html`).
