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
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '../public/sitemap.xml');
const SITE_URL = 'https://aerata.com';
const TODAY = new Date().toISOString().slice(0, 10);

// Static routes — keep in sync with src/App.jsx. /portal is intentionally
// excluded (noindex + robots-disallowed).
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/renewable-energy', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/infrastructure', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/surveying', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/environmental', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/oil-gas', changefreq: 'monthly', priority: '0.9' },
  { path: '/fleet', changefreq: 'monthly', priority: '0.7' },
  { path: '/training', changefreq: 'monthly', priority: '0.6' },
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

function buildUrlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

async function main() {
  const articles = loadArticles();

  const staticEntries = STATIC_ROUTES.map((r) =>
    buildUrlEntry({
      loc: `${SITE_URL}${r.path}`,
      lastmod: TODAY,
      changefreq: r.changefreq,
      priority: r.priority,
    })
  );

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
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...articleEntries,
    '</urlset>',
    '',
  ].join('\n');

  writeFileSync(OUT_PATH, xml, 'utf-8');
  console.log(`sitemap.xml written: ${STATIC_ROUTES.length} static routes + ${articleEntries.length} articles`);
}

main();
