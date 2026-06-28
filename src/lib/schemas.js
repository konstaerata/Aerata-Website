const SITE_URL = 'https://aerata.com';
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

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
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

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

export function serviceSchema({ name, description, areaServed = ['Netherlands', 'Greece', 'Europe'] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'Organization',
      name: 'Aerata B.V.',
      url: SITE_URL,
    },
    description,
    areaServed: areaServed.map(area => ({
      '@type': 'Place',
      name: area,
    })),
  };
}

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
