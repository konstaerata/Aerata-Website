import { SITE_ORIGINS, DEFAULT_LANG, localizedUrl } from './siteOrigins';

const SITE_URL = SITE_ORIGINS[DEFAULT_LANG];
const LOGO_URL = 'https://pub-8d398fd9e3a643679e74a0eacc815464.r2.dev/logo-1.png';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Aerata B.V.',
  url: SITE_URL,
  logo: LOGO_URL,
  description: 'Enterprise drone inspection and aerial data services across Europe — thermal, LiDAR, and photogrammetric solutions for industry.',
  foundingDate: '2022',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+31-6-38165193',
      contactType: 'sales',
      email: 'info@aerata.com',
      areaServed: ['NL', 'GR', 'EU'],
      availableLanguage: ['English', 'Dutch', 'Greek'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Van Leeuwenhoekpark 1',
    addressLocality: 'Delft',
    postalCode: '2611 DW',
    addressCountry: 'NL',
  },
  sameAs: [
    'https://www.linkedin.com/company/aerata',
    'https://www.instagram.com/aerata_bv',
    'https://www.youtube.com/@aerata6588',
    'https://www.tiktok.com/@aerata',
  ],
};

export const delftLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business-delft`,
  name: 'Aerata B.V.',
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  telephone: '+31-6-38165193',
  email: 'info@aerata.com',
  description: 'Professional drone services company headquartered in Delft, Netherlands, providing aerial inspections, LiDAR surveys, and thermal imaging for industrial clients across Europe.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Van Leeuwenhoekpark 1',
    addressLocality: 'Delft',
    postalCode: '2611 DW',
    addressRegion: 'Zuid-Holland',
    addressCountry: 'NL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.0116,
    longitude: 4.3571,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  sameAs: [
    'https://www.linkedin.com/company/aerata',
    'https://www.instagram.com/aerata_bv',
    'https://www.youtube.com/@aerata6588',
  ],
};

// Athens (Alimos) office — added alongside Delft so both real locations are
// equally discoverable in search/maps, not just the HQ. NAP matches
// src/components/layout/Footer.jsx and src/pages/Contact.jsx exactly.
// url/@id point at aerata.gr (SITE_ORIGINS.el), not aerata.com — Athens is
// the Greek-market office, and aerata.gr is now the Greek-market domain.
const ATHENS_URL = SITE_ORIGINS.el;
export const athensLocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${ATHENS_URL}/#business-athens`,
  name: 'Aerata B.V. — Athens Office',
  url: ATHENS_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  telephone: '+30-697-190-4421',
  email: 'info@aerata.com',
  description: 'Aerata B.V. Athens office, serving Greece, Cyprus, and the Southeast European market with drone inspection, LiDAR, and thermal imaging services.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Leoforos Alimou 8',
    addressLocality: 'Alimos',
    addressRegion: 'Attica',
    postalCode: '17455',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.9147,
    longitude: 23.7085,
  },
  priceRange: '$$',
  sameAs: [
    'https://www.linkedin.com/company/aerata',
    'https://www.instagram.com/aerata_bv',
    'https://www.youtube.com/@aerata6588',
  ],
};

// Backward-compatible alias — several files still import `localBusinessSchema`
// by its original (pre-Athens) name.
export const localBusinessSchema = delftLocalBusinessSchema;

/**
 * @param {{ name: string, url?: string }[]} items
 * @param {string} [lang] resolves item URLs against the correct per-language
 *   domain (aerata.com for en/nl, aerata.gr for el). Defaults to English if
 *   omitted, matching the previous (pre-.gr) behavior for any caller not yet
 *   updated to pass it.
 */
export function breadcrumbSchema(items, lang = DEFAULT_LANG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url ? localizedUrl(item.url, lang) : undefined,
    })),
  };
}

/**
 * @param {{ name: string, description: string, areaServed?: string[], lang?: string }} options
 */
export function serviceSchema({ name, description, areaServed = ['Netherlands', 'Greece', 'Europe'], lang = DEFAULT_LANG }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: 'Aerata B.V.',
      url: localizedUrl('/', lang),
    },
    description,
    areaServed: areaServed.map(area => ({
      '@type': 'Place',
      name: area,
    })),
  };
}

/**
 * Articles are English-only today (see src/pages/NewsArticle.jsx's
 * translated={false}), so this intentionally has no lang parameter — every
 * article URL resolves against the English/aerata.com origin.
 */
export function articleSchema({ headline, excerpt, datePublished, dateModified, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: excerpt,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `${SITE_URL}${url}`,
    author: {
      '@type': 'Organization',
      name: 'Aerata B.V.',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aerata B.V.',
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
  };
}
