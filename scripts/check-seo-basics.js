#!/usr/bin/env node
/**
 * check-seo-basics.js — lightweight SEO regression check, run in CI.
 *
 * Statically scans each page component for its <SEO title="..." description="..." />
 * call and flags: missing/empty title, missing/empty description, title over
 * ~60 chars, description over ~160 chars, and duplicate titles/descriptions
 * across pages. This is a source-level check (regex on the JSX), not a
 * rendered-DOM check — it only covers pages that pass literal string props
 * to <SEO> (which is all of them as of this writing; dynamic pages like
 * NewsArticle.jsx build title/description from data and are skipped).
 *
 * Deliberately dependency-free (no headless browser) to keep CI fast and
 * avoid adding new tooling for a repo that doesn't otherwise need one.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Pages with a literal title/description passed to <SEO>. Dynamic pages
// (NewsArticle.jsx builds these from article data) are intentionally
// excluded — there's nothing static to check there.
const PAGES = [
  'src/pages/About.jsx',
  // Sector pages and Services take title/description from the locale files
  // (sectorPages.<key>, servicesPage and homePage seoTitle/seoDesc); checked below per language.
  'src/pages/Training.jsx',
  'src/pages/News.jsx',
  'src/pages/Contact.jsx',
  'src/pages/Fleet.jsx',
  'src/pages/ClientPortal.jsx',
];

const TITLE_MAX = 65;
const DESCRIPTION_MAX = 165;

function extractSeoProps(source) {
  const seoBlockMatch = source.match(/<SEO\s+([\s\S]*?)\/>/);
  if (!seoBlockMatch) return null;
  const block = seoBlockMatch[1];
  const title = block.match(/title=["']([^"']*)["']/)?.[1] ?? block.match(/title=\{`([^`]*)`\}/)?.[1];
  const description = block.match(/description=["']([^"']*)["']/)?.[1] ?? block.match(/description=\{`([^`]*)`\}/)?.[1];
  return { title, description };
}

function main() {
  const errors = [];
  const warnings = [];
  const titles = new Map();
  const descriptions = new Map();

  for (const page of PAGES) {
    const fullPath = resolve(ROOT, page);
    let source;
    try {
      source = readFileSync(fullPath, 'utf-8');
    } catch {
      errors.push(`${page}: file not found`);
      continue;
    }

    const seo = extractSeoProps(source);
    if (!seo) {
      errors.push(`${page}: no <SEO ... /> found`);
      continue;
    }

    if (!seo.title || !seo.title.trim()) {
      errors.push(`${page}: missing or empty title`);
    } else {
      if (seo.title.length > TITLE_MAX) {
        warnings.push(`${page}: title is ${seo.title.length} chars (recommended <= ${TITLE_MAX}): "${seo.title}"`);
      }
      const existing = titles.get(seo.title);
      if (existing) errors.push(`${page}: duplicate title with ${existing}: "${seo.title}"`);
      else titles.set(seo.title, page);
    }

    if (!seo.description || !seo.description.trim()) {
      errors.push(`${page}: missing or empty description`);
    } else {
      if (seo.description.length > DESCRIPTION_MAX) {
        warnings.push(`${page}: description is ${seo.description.length} chars (recommended <= ${DESCRIPTION_MAX})`);
      }
      const existing = descriptions.get(seo.description);
      if (existing) errors.push(`${page}: duplicate description with ${existing}`);
      else descriptions.set(seo.description, page);
    }

    // At least one <h1 or a component known to render one (SectionHeading as="h1",
    // ServicePageHero, HeroSection, FlyoverHero, which always render h1) should appear in
    // the file. This is a best-effort static check — some pages (e.g. Home.jsx)
    // delegate their h1 to a child component this script doesn't trace into.
    const H1_INDICATORS = [/<h1[\s>]/, /as=["']h1["']/, /<ServicePageHero[\s>]/, /<HeroSection[\s>]/, /<FlyoverHero[\s>]/];
    const hasH1 = H1_INDICATORS.some((re) => re.test(source));
    if (!hasH1) {
      warnings.push(`${page}: no <h1> (or known h1-rendering component) found in source — verify manually if this component delegates its h1 to an untraced child`);
    }
  }

  // Sector + services pages: same length/duplicate rules on the locale copy,
  // for every language those pages are published in.
  for (const lang of ['en', 'el']) {
    const loc = JSON.parse(readFileSync(resolve(ROOT, `src/locales/${lang}.json`), 'utf-8'));
    const seoPages = { ...(loc.sectorPages || {}), services: loc.servicesPage || {}, home: loc.homePage || {} };
    for (const [key, page] of Object.entries(seoPages)) {
      if (!page || (!page.seoTitle && !page.seoDesc)) continue;
      const label = `${lang}:${key}`;
      if (!page.seoTitle?.trim()) errors.push(`${label}: missing seoTitle`);
      else {
        if (page.seoTitle.length > TITLE_MAX) warnings.push(`${label}: title is ${page.seoTitle.length} chars (recommended <= ${TITLE_MAX})`);
        if (titles.has(page.seoTitle)) errors.push(`${label}: duplicate title with ${titles.get(page.seoTitle)}`);
        titles.set(page.seoTitle, label);
      }
      if (!page.seoDesc?.trim()) errors.push(`${label}: missing seoDesc`);
      else {
        if (page.seoDesc.length > DESCRIPTION_MAX) warnings.push(`${label}: description is ${page.seoDesc.length} chars (recommended <= ${DESCRIPTION_MAX})`);
        if (descriptions.has(page.seoDesc)) errors.push(`${label}: duplicate description with ${descriptions.get(page.seoDesc)}`);
        descriptions.set(page.seoDesc, label);
      }
    }
  }

  if (warnings.length) {
    console.warn(`\n${warnings.length} SEO warning(s):`);
    for (const w of warnings) console.warn(`  ! ${w}`);
  }

  if (errors.length) {
    console.error(`\n${errors.length} SEO error(s):`);
    for (const e of errors) console.error(`  x ${e}`);
    console.error('');
    process.exit(1);
  }

  console.log(`SEO basics check passed — ${PAGES.length} pages checked, 0 errors, ${warnings.length} warning(s).`);
}

main();
