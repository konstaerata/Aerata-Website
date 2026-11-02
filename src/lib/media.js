/// <reference types="vite/client" />
/**
 * media.js — single source of truth for all site media
 *
 * HOW TO UPDATE
 * ─────────────
 * • Upload files to Cloudflare R2 (bucket: pub-8d398fd9e3a643679e74a0eacc815464).
 *
 * • To swap any image or video, change only the URL on the right-hand side
 *   of the relevant key below. No need to touch any component files.
 *
 * • For BASE_B44 placeholders: upload your own photo to R2, then replace
 *   the `${BASE_B44}/...` value with `${BASE_LOCAL}/your-photo.jpg`.
 *
 * IMAGE TRANSFORMS
 * ─────────────────
 * `mediaUrl()` / `srcSet()` (below) build Cloudflare Image Resizing URLs
 * (`/cdn-cgi/image/...`) against MEDIA_TRANSFORM_HOST. This ONLY works when
 * that host is a custom domain attached to the R2 bucket and proxied
 * (orange-clouded) through a Cloudflare zone with Image Resizing enabled —
 * it does NOT work on the free `pub-xxxx.r2.dev` dev subdomain. Until the
 * custom domain is live, transform helpers fall back to serving the
 * original file untransformed.
 */

// ── Base paths ─────────────────────────────────────────────────────────────────

/** Cloudflare R2 dev subdomain — plain file hosting, no transforms available here */
const BASE_LOCAL = 'https://pub-8d398fd9e3a643679e74a0eacc815464.r2.dev';

/**
 * Custom domain for R2, proxied through Cloudflare with Image Resizing enabled.
 * Set this once the domain is attached in the Cloudflare dashboard
 * (R2 bucket → Settings → Custom Domains → media.aerata.com).
 * Until then, MEDIA_TRANSFORMS_ENABLED stays false and all images serve
 * as plain originals from BASE_LOCAL.
 */
const MEDIA_TRANSFORM_HOST = 'https://media.aerata.com';
export const MEDIA_TRANSFORMS_ENABLED = true;

/** External image CDN (base44) */
const BASE_B44 = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774';

/**
 * Web-optimised video renditions, compressed from the camera originals
 * (which are 100–560 MB each and stall page loads). They live in the same R2
 * bucket under web/. VITE_VIDEO_BASE overrides the base for local previews
 * before upload, e.g. VITE_VIDEO_BASE=/media-preview with the files in
 * public/media-preview/ (git-ignored).
 */
const VIDEO_BASE = import.meta.env.VITE_VIDEO_BASE || `${BASE_LOCAL}/web`;

/** Sector and service photos on R2 (resized and served as AVIF/WebP via media.aerata.com). */
const PHOTO_BASE = `${BASE_LOCAL}/photos`;

// ── Media registry ─────────────────────────────────────────────────────────────
// Keys are named after where they appear in the UI.
// Even if the same file is reused in multiple places, each usage has its own key.

export const MEDIA = {

  // ── Navbar ───────────────────────────────────────────────────────────────────
  navbar_logo:                         `${BASE_LOCAL}/logo-1.png`,
  navbar_logo_fallback:                `${BASE_LOCAL}/logo-1.png`,

  // ── Footer ───────────────────────────────────────────────────────────────────
  footer_logo:                         `${BASE_LOCAL}/logo-1.png`,

  // ── Home page ────────────────────────────────────────────────────────────────
  // 720p on desktop too: decoding the 1080p rendition while scrolling made
  // the Home hero visibly less smooth than the other (720p) video heroes.
  home_hero_video:                     `${VIDEO_BASE}/home-hero-720.mp4`,
  home_hero_video_mobile:              `${VIDEO_BASE}/home-hero-720.mp4`,
  home_hero_poster:                    `${VIDEO_BASE}/home-hero-poster.jpg`,
  // Shown only if the hero video can't play: the video's own still frame.
  home_hero_image:                     `${VIDEO_BASE}/home-hero-poster.jpg`,

  // ── Sectors Showcase (homepage IndustryCards) ────────────────────────────────
  // Update these URLs to swap sector card background images
  sector_card_renewable_image:         `${BASE_LOCAL}/solarfarm.jpg`,
  sector_card_infrastructure_image:    `${BASE_LOCAL}/powerinspection.jpg`,
  sector_card_surveying_image:         `${BASE_LOCAL}/photogrammetry.png`,
  sector_card_oilgas_image:            `${BASE_LOCAL}/gaspipe.jpg`,
  sector_card_environmental_image:     `${BASE_LOCAL}/environmentalmonitoring.png`,

  // ── OG / Social share image ──────────────────────────────────────────────────
  // Replace with a 1200×630 branded image for social sharing cards
  og_image:                            `${BASE_LOCAL}/logo-1.png`,

  // ── About page ───────────────────────────────────────────────────────────────
  about_hero_image:                    `${BASE_LOCAL}/sitia.mp4`,
  about_hero_video:                    `${VIDEO_BASE}/about-hero-720.mp4`,
  about_hero_poster:                   `${VIDEO_BASE}/about-hero-poster.jpg`,
  about_case_solar_farm_image:         `${BASE_B44}/c8d2cb737_generated_7a5a50ca.png`,
  about_case_powerline_image:          `${BASE_B44}/04b2da82d_generated_65a9eb1f.png`,
  about_case_archaeological_image:     `${BASE_B44}/81b06a698_generated_69f885a6.png`,
  about_case_construction_image:       `${BASE_B44}/38a98ba55_generated_a71edd9a.png`,
  about_case_wetland_image:            `${BASE_B44}/c8d2cb737_generated_7a5a50ca.png`,
  about_case_offshore_image:           `${BASE_B44}/04b2da82d_generated_65a9eb1f.png`,

  // ── Fleet page ───────────────────────────────────────────────────────────────
  fleet_matrice_300_image:             `${BASE_LOCAL}/windmatrice.jpg`,
  fleet_matrice_350_video:             `${BASE_LOCAL}/m350.webp`,
  fleet_matrice_4e_image:              `${BASE_LOCAL}/matrice4e.png`,
  fleet_matrice_4td_image:             `${BASE_LOCAL}/4td.png`,
  fleet_air3s_image:                   `${BASE_LOCAL}/air3s.webp`,
  fleet_air2s_image:                   `${BASE_LOCAL}/air2s.jpg`,
  fleet_neo_image:                     `${BASE_LOCAL}/dji neo.jpg`,
  fleet_h20t_image:                    `${BASE_LOCAL}/h20t.jpg`,
  fleet_p1_image:                      `${BASE_LOCAL}/p1.jpg`,
  // NOTE: key/filename say "l1" but this is used as the Zenmuse L2 fleet
  // image (Fleet.jsx) — the L1 payload was retired/upgraded to L2. Left as
  // "l1" rather than renamed since the underlying R2 file itself (l1.webp)
  // wasn't visually re-verified to confirm it's actually an L2 product photo.
  fleet_l1_image:                      `${BASE_LOCAL}/l1.webp`,
  fleet_drtk3_image:                   `${BASE_LOCAL}/rtk3.jpg`,
  fleet_drtk2_image:                   `${BASE_LOCAL}/rtk2.png`,
  fleet_topcon_hiper_image:            `${BASE_LOCAL}/topcon.jpg`,
  fleet_starlink_image:                `${BASE_LOCAL}/starlink.webp`,

  // ── News page ────────────────────────────────────────────────────────────────
  news_article_lidar_tech_image:       `${BASE_B44}/65a98b32e_generated_a74332b5.png`,
  news_article_infrastructure_image:   `${BASE_B44}/38a98ba55_generated_a71edd9a.png`,
  news_article_surveying_image:        `${BASE_B44}/c8d2cb737_generated_7a5a50ca.png`,
  news_article_ai_analytics_image:     `${BASE_B44}/81b06a698_generated_69f885a6.png`,
  news_article_oil_gas_image:          `${BASE_B44}/04b2da82d_generated_65a9eb1f.png`,
  news_article_company_news_image:     `${BASE_B44}/65a98b32e_generated_a74332b5.png`,

  // ── Environmental Monitoring page ────────────────────────────────────────────
  env_hero_image:                      `${VIDEO_BASE}/environmental-720.mp4`,
  env_hero_poster:                     `${VIDEO_BASE}/environmental-poster.jpg`,
  env_gallery_bird_migration_image:    `${BASE_B44}/396042db6_generated_7dacdf8c.png`,
  env_gallery_crop_health_image:       `${BASE_B44}/81b06a698_generated_69f885a6.png`,
  env_gallery_habitat_mapping_image:   `${BASE_B44}/c8d2cb737_generated_7a5a50ca.png`,
  env_gallery_ecosystem_image:         `${BASE_B44}/396042db6_generated_7dacdf8c.png`,
  env_section_monitoring_image:        `${BASE_LOCAL}/environmentalmonitoring.png`,
  env_section_biodiversity_image:      `${BASE_LOCAL}/ainest.png`,
  env_section_smart_agriculture_image: `${BASE_LOCAL}/smartagriculture.png`,

  // ── Surveying page ───────────────────────────────────────────────────────────
  surveying_hero_video:                `${VIDEO_BASE}/surveying-hero-720.mp4`,
  surveying_hero_poster:               `${VIDEO_BASE}/surveying-hero-poster.jpg`,
  surveying_section_orthophotos_image: `${BASE_LOCAL}/photogrammetry.png`,
  surveying_section_lidar_image:       `${BASE_LOCAL}/lidarsurvey.png`,
  surveying_section_construction_image:`${BASE_LOCAL}/guillherme-schneider-CJK1s0Cd0fU-unsplash.webp`,
  surveying_section_ai_image:          `${BASE_LOCAL}/aidamage.png`,
  surveying_demo_3d_video:             `${VIDEO_BASE}/surveying-3d-demo-720.mp4`,
  surveying_demo_3d_poster:            `${VIDEO_BASE}/surveying-3d-demo-poster.jpg`,

  // ── Renewable Energy page ────────────────────────────────────────────────────
  renewable_hero_image:                `${BASE_LOCAL}/solarfarm.jpg`,
  renewable_section_solar_image:       `${BASE_B44}/861fc5002_generated_b0e7bfe4.png`,
  renewable_section_wind_image:        `${BASE_LOCAL}/IMG_1840.jpg`,
  renewable_thermal_slider_thermal:    `${BASE_LOCAL}/irsolar.png`,
  renewable_thermal_slider_standard:   `${BASE_LOCAL}/normalsolar.png`,
  renewable_workflow_image:            `${BASE_LOCAL}/renewableworkflow.png`,
  renewable_why_aerata_image:          `${BASE_LOCAL}/renewablewhy.png`,

  // ── Infrastructure page ──────────────────────────────────────────────────────
  infra_hero_image:                    `${BASE_B44}/bea0ea3d1_generated_5b243c29.png`,
  infra_section_telecom_image:         `${BASE_B44}/460f7d297_generated_f4efa52d.png`,
  infra_section_powerlines_image:      `${BASE_LOCAL}/powerinspection.jpg`,
  infra_report_transmission_image:     `${BASE_LOCAL}/powertransmissiontower.jpg`,
  infra_report_tower_audit_image:      `${BASE_LOCAL}/powertower.jpg`,
  infra_why_aerata_image:              `${BASE_LOCAL}/infrastructurewhy.png`,

  // ── Oil & Gas page ───────────────────────────────────────────────────────────
  oilgas_hero_image:                   `${BASE_B44}/f380e9e02_generated_a743b199.png`,
  oilgas_section_cost_image:           `${BASE_LOCAL}/gaspipe.jpg`,
  oilgas_section_safety_image:         `${BASE_B44}/04b2da82d_generated_65a9eb1f.png`,
  oilgas_report_pipeline_image:        `${BASE_LOCAL}/oilandgas.jpg`,
  oilgas_report_flare_stack_image:     `${BASE_LOCAL}/powertower.jpg`,
  oilgas_workflow_image:               `${BASE_LOCAL}/oilgasworkflow.png`,
  oilgas_why_aerata_image:             `${BASE_LOCAL}/oilgaswhy.png`,

  // ── Surveying page (bottom sections) ─────────────────────────────────────────
  surveying_capabilities_image:        `${BASE_LOCAL}/surveyingwhy.png`,
  surveying_workflow_image:            `${BASE_LOCAL}/surveyingworkflow.png`,

  // ── Environmental Monitoring page (bottom sections) ───────────────────────────
  env_capabilities_image:              `${BASE_LOCAL}/environmentalwhy.png`,
  env_workflow_image:                  `${BASE_LOCAL}/environmentalworkflow.png`,

  // ── Sector & service photos (content refactor, 2026-11) ───────────────────
  // On R2 under photos/, named by slot code (see docs/photo-guide.html).
  photo_sol_01:                        `${PHOTO_BASE}/sol-01.jpg`,
  photo_sol_02:                        `${PHOTO_BASE}/sol-02.jpg`,
  photo_sol_03:                        `${PHOTO_BASE}/sol-03.jpg`,
  photo_sol_04:                        `${PHOTO_BASE}/sol-04.jpg`,
  photo_wnd_01:                        `${PHOTO_BASE}/wnd-01.jpg`,
  photo_wnd_02:                        `${PHOTO_BASE}/wnd-02.jpg`,
  photo_wnd_03:                        `${PHOTO_BASE}/wnd-03.jpg`,
  photo_wnd_04:                        `${PHOTO_BASE}/wnd-04.jpg`,
  photo_srv_02:                        `${PHOTO_BASE}/srv-02.jpg`,
  photo_grd_h:                         `${PHOTO_BASE}/grd-h.jpg`,
  photo_grd_card:                      `${PHOTO_BASE}/grd-card.jpg`,
  photo_grd_01:                        `${PHOTO_BASE}/grd-01.jpg`,
  photo_grd_02:                        `${PHOTO_BASE}/grd-02.jpg`,
  photo_grd_04:                        `${PHOTO_BASE}/grd-04.jpg`,
  photo_grd_05:                        `${PHOTO_BASE}/grd-05.jpg`,
  photo_grd_06:                        `${PHOTO_BASE}/grd-06.jpg`,
  photo_bld_card:                      `${PHOTO_BASE}/bld-card.jpg`,
  photo_bld_01:                        `${PHOTO_BASE}/bld-01.jpg`,
  photo_bld_02:                        `${PHOTO_BASE}/bld-02.jpg`,
  photo_bld_03:                        `${PHOTO_BASE}/bld-03.jpg`,
  photo_bld_05:                        `${PHOTO_BASE}/bld-05.jpg`,
  photo_bld_06:                        `${PHOTO_BASE}/bld-06.jpg`,
  photo_inf_h:                         `${PHOTO_BASE}/inf-h.jpg`,
  photo_inf_card:                      `${PHOTO_BASE}/inf-card.jpg`,
  photo_inf_01:                        `${PHOTO_BASE}/inf-01.jpg`,
  photo_inf_02:                        `${PHOTO_BASE}/inf-02.jpg`,
  photo_inf_03:                        `${PHOTO_BASE}/inf-03.jpg`,
  photo_inf_05:                        `${PHOTO_BASE}/inf-05.jpg`,
  photo_inf_07:                        `${PHOTO_BASE}/inf-07.jpg`,
  photo_inf_08:                        `${PHOTO_BASE}/inf-08.jpg`,
  photo_saf_h:                         `${PHOTO_BASE}/saf-h.jpg`,
  photo_saf_01:                        `${PHOTO_BASE}/saf-01.jpg`,
  photo_saf_02:                        `${PHOTO_BASE}/saf-02.jpg`,
  photo_saf_03:                        `${PHOTO_BASE}/saf-03.jpg`,
  photo_saf_04:                        `${PHOTO_BASE}/saf-04.jpg`,
  photo_env_card:                      `${PHOTO_BASE}/env-card.jpg`,
  photo_env_01:                        `${PHOTO_BASE}/env-01.jpg`,
  photo_env_05:                        `${PHOTO_BASE}/env-05.jpg`,
  photo_bld_09:                        `${PHOTO_BASE}/bld-09.jpg`,
  photo_wnd_06:                        `${PHOTO_BASE}/wnd-06.jpg`,
};

/**
 * 3–5 s silent hover previews cut from the homepage promo footage, keyed by
 * service path. Oil & Gas has no matching footage, so it has no preview.
 */
export const SERVICE_PREVIEW_VIDEOS = {
  '/services/renewable-energy': `${VIDEO_BASE}/previews/renewable-energy.mp4`,
  '/services/infrastructure':   `${VIDEO_BASE}/previews/infrastructure.mp4`,
  '/services/surveying':        `${VIDEO_BASE}/previews/surveying.mp4`,
  '/services/environmental':    `${VIDEO_BASE}/previews/environmental.mp4`,
};

// ── Image transform helpers ──────────────────────────────────────────────────

// Kept short deliberately: each width is a distinct Cloudflare cache key, and
// a cold cache-miss transform takes 800ms-1s+ vs ~30ms once warm (measured).
// A long width ladder means the first visitors after every deploy fan out
// into many simultaneous slow transforms — this covers mobile / tablet /
// laptop / large-desktop without that fan-out.
const RESPONSIVE_WIDTHS = [480, 768, 1280, 1920];

/**
 * Splits an R2 URL into { host, path } so transform helpers can rebuild it
 * against MEDIA_TRANSFORM_HOST regardless of which base the registry entry used.
 */
function splitMediaUrl(url) {
  if (url.startsWith(BASE_LOCAL)) return { path: url.slice(BASE_LOCAL.length), transformable: true };
  if (MEDIA_TRANSFORMS_ENABLED && url.startsWith(MEDIA_TRANSFORM_HOST)) {
    return { path: url.slice(MEDIA_TRANSFORM_HOST.length), transformable: true };
  }
  return { path: null, transformable: false };
}

/**
 * Builds a single Cloudflare Image Resizing URL for the given original media URL.
 * Falls back to the untransformed original when transforms aren't enabled
 * (see MEDIA_TRANSFORMS_ENABLED) or the URL isn't from our R2 bucket
 * (e.g. base44-hosted placeholders, external URLs).
 * @param {string} originalUrl
 * @param {{ width?: number, format?: string, quality?: number, fit?: string }} [options]
 */
export function mediaUrl(originalUrl, { width, format = 'auto', quality = 82, fit = 'cover' } = {}) {
  if (!originalUrl) return originalUrl;
  const { path, transformable } = splitMediaUrl(originalUrl);
  if (!MEDIA_TRANSFORMS_ENABLED || !transformable) return originalUrl;

  const opts = [`format=${format}`, `quality=${quality}`, `fit=${fit}`];
  if (width) opts.push(`width=${width}`);
  // Spaces in filenames are encoded, or a srcset would split the URL at them.
  return `${MEDIA_TRANSFORM_HOST}/cdn-cgi/image/${opts.join(',')}${path.replace(/ /g, '%20')}`;
}

/**
 * Builds a srcset string across the standard responsive width ladder for a
 * given original media URL and target format. Returns null when transforms
 * aren't available, so callers can omit `srcSet` entirely (browser then
 * falls back to plain `src`).
 * @param {string} originalUrl
 * @param {{ format?: string, quality?: number, widths?: number[] }} [options]
 */
export function mediaSrcSet(originalUrl, { format = 'auto', quality = 82, widths = RESPONSIVE_WIDTHS } = {}) {
  if (!originalUrl) return null;
  const { transformable } = splitMediaUrl(originalUrl);
  if (!MEDIA_TRANSFORMS_ENABLED || !transformable) return null;

  return widths
    .map((w) => `${mediaUrl(originalUrl, { width: w, format, quality })} ${w}w`)
    .join(', ');
}

export { RESPONSIVE_WIDTHS };
