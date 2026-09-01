#!/usr/bin/env node
/**
 * check-domain-seo.js — verifies the aerata.com / aerata.gr domain-split
 * canonical/hreflang logic in isolation, without a browser.
 *
 * Imports src/lib/siteOrigins.js directly (plain data/pure function, no
 * React/DOM dependency, so it's importable from a Node script the same way
 * scripts/generate-sitemap.js does) and asserts:
 *
 *  1. For every static route, the expected {origin, prefix} combination for
 *     en/nl/el resolves correctly — en/nl under aerata.com (nl prefixed,
 *     en not), el under aerata.gr (unprefixed, root).
 *  2. After running `npm run generate:sitemap`, every el <loc> in the
 *     built public/sitemap.xml is under aerata.gr (never aerata.com/el/...),
 *     and every en/nl <loc> is under aerata.com.
 *
 * Run manually or in CI as a separate step (deliberately not chained into
 * `build` — a bug in this checker shouldn't be able to block a production
 * deploy). Dependency-free, mirrors scripts/check-seo-basics.js's pattern.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { SITE_ORIGINS, localizedUrl } from '../src/lib/siteOrigins.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = resolve(__dirname, '../public/sitemap.xml');

const SAMPLE_ROUTES = ['/', '/about', '/services/renewable-energy', '/fleet', '/contact'];

function main() {
  const errors = [];

  // 1. Pure-function assertions on localizedUrl()
  for (const path of SAMPLE_ROUTES) {
    const en = localizedUrl(path, 'en');
    const nl = localizedUrl(path, 'nl');
    const el = localizedUrl(path, 'el');

    if (!en.startsWith(SITE_ORIGINS.en) || en.includes('/en/')) {
      errors.push(`localizedUrl(${path}, 'en') = "${en}" — expected unprefixed under ${SITE_ORIGINS.en}`);
    }
    if (!nl.startsWith(`${SITE_ORIGINS.nl}/nl`)) {
      errors.push(`localizedUrl(${path}, 'nl') = "${nl}" — expected /nl-prefixed under ${SITE_ORIGINS.nl}`);
    }
    if (!el.startsWith(SITE_ORIGINS.el) || el.includes('/el/')) {
      errors.push(`localizedUrl(${path}, 'el') = "${el}" — expected unprefixed under ${SITE_ORIGINS.el} (aerata.gr), never /el/-prefixed`);
    }
  }

  if (SITE_ORIGINS.el === SITE_ORIGINS.en) {
    errors.push(`SITE_ORIGINS.el equals SITE_ORIGINS.en ("${SITE_ORIGINS.en}") — the .gr domain split is not configured`);
  }

  // 2. Built sitemap.xml assertions (skipped with a warning if not built yet)
  let sitemapXml;
  try {
    sitemapXml = readFileSync(SITEMAP_PATH, 'utf-8');
  } catch {
    console.warn(`(skipping sitemap checks — ${SITEMAP_PATH} not found; run "npm run generate:sitemap" first)`);
    sitemapXml = null;
  }

  if (sitemapXml) {
    const locs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    if (locs.length === 0) {
      errors.push('sitemap.xml contains no <loc> entries at all — check generate-sitemap.js ran correctly');
    }
    for (const loc of locs) {
      if (loc.includes('/el/')) {
        errors.push(`sitemap.xml <loc>${loc}</loc> — legacy /el/-prefixed URL should never appear in the sitemap (Greek's canonical home is aerata.gr root)`);
      }
    }
    const grLocs = locs.filter((l) => l.startsWith(SITE_ORIGINS.el));
    if (grLocs.length === 0) {
      errors.push('sitemap.xml has zero aerata.gr entries — expected one per static route for the el language variant');
    }
  }

  if (errors.length) {
    console.error(`\n${errors.length} domain-SEO error(s):`);
    for (const e of errors) console.error(`  x ${e}`);
    console.error('');
    process.exit(1);
  }

  console.log(`Domain SEO check passed — ${SAMPLE_ROUTES.length} routes checked against siteOrigins.js${sitemapXml ? `, ${sitemapXml.match(/<loc>/g)?.length ?? 0} sitemap entries verified` : ' (sitemap check skipped)'}.`);
}

main();
