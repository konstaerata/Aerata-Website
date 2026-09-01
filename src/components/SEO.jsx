import { Helmet } from 'react-helmet-async';
import { useLang, LANGUAGES, DEFAULT_LANG } from '../lib/LanguageContext';
import { SITE_ORIGINS, localizedUrl } from '../lib/siteOrigins';

// Kept for backward compat with anything importing SITE_URL from this module —
// equal to the English origin. Canonical/hreflang URL-building now goes
// through src/lib/siteOrigins.js, which maps each language to its own
// domain (en/nl -> aerata.com, el -> aerata.gr).
const SITE_URL = SITE_ORIGINS[DEFAULT_LANG];
const SITE_NAME = 'Aerata B.V.';
const DEFAULT_OG_IMAGE = 'https://pub-8d398fd9e3a643679e74a0eacc815464.r2.dev/og-aerata-1200x630.png';
const TWITTER_HANDLE = '@aerata_bv';

export default function SEO({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  jsonLd,
  noindex = false,
  /**
   * Set false for pages that only exist in English (e.g. news articles,
   * which aren't translated) so hreflang alternates aren't emitted for
   * language variants that don't actually have this content.
   */
  translated = true,
}) {
  const { lang } = useLang();
  const url = localizedUrl(path, lang);
  const emitHreflang = translated && !noindex;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {emitHreflang && LANGUAGES.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={localizedUrl(path, l.code)} />
      ))}
      {emitHreflang && <link rel="alternate" hrefLang="x-default" href={localizedUrl(path, DEFAULT_LANG)} />}

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
