// @ts-nocheck
// rss2json.com converts RSS to JSON and handles CORS — no proxy needed
const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

const RSS_FEEDS = [
  'https://www.suasnews.com/feed/',
  'https://dronelife.com/feed/',
  'https://www.commercialuavnews.com/feed/',
];

function guessCategory(text) {
  const t = text.toLowerCase();
  if (/solar|wind|renewable|energy transition|pv plant/.test(t)) return 'renewable_energy';
  if (/oil|gas|pipeline|offshore|petrochemical/.test(t)) return 'oil_gas';
  if (/survey|mapping|lidar|photogrammetry|topograph/.test(t)) return 'surveying';
  if (/infrastructure|bridge|tower|rail|road|power line/.test(t)) return 'infrastructure';
  if (/environment|emission|carbon|ecological|wildlife/.test(t)) return 'environmental';
  return 'technology';
}

async function fetchFeed(feedUrl) {
  const res = await fetch(`${RSS2JSON}${encodeURIComponent(feedUrl)}&count=10`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('Bad response');

  return data.items.map((item, idx) => {
    const title = item.title?.trim() ?? '';
    const excerpt = (item.description ?? '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 220);

    return {
      id: `rss-${feedUrl}-${idx}`,
      title,
      excerpt: excerpt || 'Read the full article for details.',
      category: guessCategory(`${title} ${excerpt}`),
      featured_image: item.thumbnail || item.enclosure?.link || null,
      created_date: item.pubDate ? new Date(item.pubDate) : new Date(),
      published: true,
      source_url: item.link ?? '#',
      is_external: true,
    };
  });
}

export async function fetchIndustryNews() {
  const results = await Promise.allSettled(RSS_FEEDS.map(fetchFeed));

  const seen = new Set();
  return results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .sort((a, b) => b.created_date - a.created_date)
    .filter(a => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });
}
