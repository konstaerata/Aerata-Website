#!/usr/bin/env node
/**
 * generate-sitemap.js — regenerates public/sitemap.xml from a static route
 * list plus every published article in src/lib/sampleArticles.js.
 *
 * Run manually after publishing/editing articles, or wire into `npm run build`
 * as a `prebuild` step. Article dates come from `created_date`; if an article
 * has an `updated_date` that will be used for <lastmod> instead.
 *
 * NOTE: News.jsx/NewsArticle.jsx prefer a live `base44.entities.BlogPost`
 * list at runtime and only fall back to SAMPLE_ARTICLES when that call fails
 * or returns nothing. This script has no build-time access to that live data
 * source, so it sitemaps SAMPLE_ARTICLES only. If/when articles move fully
 * into the live CMS, point this script at that data source instead so the
 * sitemap doesn't drift from what's actually published.
 *
 * MULTILINGUAL: each static route gets an <xhtml:link rel="alternate"> per
 * language (matching src/components/SEO.jsx's hreflang output) rather than
 * being listed 3x as separate unrelated <url> entries — this is Google's
 * documented pattern for multilingual sitemaps. Articles are English-only
 * (src/pages/NewsArticle.jsx passes translated={false} to <SEO>), so they
 * get no alternates, consistent with not emitting hreflang for them either.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { SITE_ORIGINS, DEFAULT_LANG, localizedUrl } from '../src/lib/siteOrigins.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../public/sitemap.xml');
const SITE_URL = SITE_ORIGINS[DEFAULT_LANG];
const TODAY = new Date().toISOString().slice(0, 10);

// Keep in sync with src/lib/LanguageContext.jsx's LANGUAGES/DEFAULT_LANG.
// localizedUrl (src/lib/siteOrigins.js) resolves en/nl against aerata.com
// and el against aerata.gr — the sitemap therefore lists aerata.gr/... as
// the Greek <loc> (never aerata.com/el/...), since a sitemap should only
// list canonical URLs, and aerata.gr is Greek's canonical home.
const LANGUAGES = ['en', 'nl', 'el'];
const localizedLoc = localizedUrl;

// Static routes — keep in sync with src/App.jsx. /portal and /training are
// intentionally excluded (both noindex — /training because it's a thin
// affiliate-link page with no unique content, per docs/content-roadmap.md).
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/renewable-energy', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/infrastructure', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/surveying', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/environmental', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/oil-gas', changefreq: 'monthly', priority: '0.9' },
  { path: '/fleet', changefreq: 'monthly', priority: '0.7' },
  { path: '/news', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
];

function toLastmod(dateLike) {
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  if (Number.isNaN(d.getTime())) return TODAY;
  return d.toISOString().slice(0, 10);
}

function loadArticles() {
  // sampleArticles.js imports MEDIA from './media' without an extension,
  // which only Vite's resolver (not Node's native ESM loader) can follow, so
  // it can't be `import()`-ed directly from a plain Node script. Extract just
  // the `id`, `published`, `created_date`, and `updated_date` fields with a
  // regex instead of evaluating the module — good enough for sitemap
  // purposes without needing a bundler step here.
  const src = readFileSync(resolve(__dirname, '../src/lib/sampleArticles.js'), 'utf-8');
  const articles = [];
  const objectPattern = /\{\s*id:\s*(\d+)[\s\S]*?published:\s*(true|false)/g;
  let match;
  while ((match = objectPattern.exec(src))) {
    const [, idStr, publishedStr] = match;
    const objectSrc = match[0];
    const createdMatch = objectSrc.match(/created_date:\s*new Date\('([^']+)'\)/);
    const updatedMatch = objectSrc.match(/updated_date:\s*new Date\('([^']+)'\)/);
    articles.push({
      id: Number(idStr),
      published: publishedStr === 'true',
      created_date: createdMatch ? createdMatch[1] : null,
      updated_date: updatedMatch ? updatedMatch[1] : null,
    });
  }
  return articles;
}

function buildUrlEntry({ loc, lastmod, changefreq, priority, alternates }) {
  const alternateLines = (alternates ?? []).map(
    ({ hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`
  );
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...alternateLines,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

async function main() {
  const articles = loadArticles();

  // One <url> per (route, language) pair, each carrying the full set of
  // alternates (including itself and x-default) — matches SEO.jsx exactly.
  const staticEntries = STATIC_ROUTES.flatMap((r) => {
    const alternates = [
      ...LANGUAGES.map((lang) => ({ hreflang: lang, href: localizedLoc(r.path, lang) })),
      { hreflang: 'x-default', href: localizedLoc(r.path, DEFAULT_LANG) },
    ];
    return LANGUAGES.map((lang) =>
      buildUrlEntry({
        loc: localizedLoc(r.path, lang),
        lastmod: TODAY,
        changefreq: r.changefreq,
        priority: r.priority,
        alternates,
      })
    );
  });

  const articleEntries = articles
    .filter((a) => a.published)
    .map((a) =>
      buildUrlEntry({
        loc: `${SITE_URL}/news/${a.id}`,
        lastmod: toLastmod(a.updated_date ?? a.created_date),
        changefreq: 'monthly',
        priority: '0.6',
      })
    );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...staticEntries,
    ...articleEntries,
    '</urlset>',
    '',
  ].join('\n');

  writeFileSync(OUT_PATH, xml, 'utf-8');
  console.log(`sitemap.xml written: ${STATIC_ROUTES.length} static routes x ${LANGUAGES.length} languages + ${articleEntries.length} articles`);
}

main();
