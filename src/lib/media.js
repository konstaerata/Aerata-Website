/**
 * media.js — single source of truth for all site media URLs
 *
 * HOW TO UPDATE
 * ─────────────
 * • Local files (logos, photos, videos) live in /public/media/ in this repo
 *   and are served at /media/ by both Vite dev server and Netlify.
 *   To move them to an external host, change BASE_LOCAL only.
 *
 * • External images (base44 CDN) are served from BASE_B44.
 *   To replace any image, update the individual URL below — no need to
 *   search through component files.
 *
 * NETLIFY
 * ───────
 * Upload / replace files in:  /public/media/
 * They will be live at:       https://your-site.netlify.app/media/<filename>
 *
 * To switch to an external CDN for local files, change BASE_LOCAL to e.g.:
 *   const BASE_LOCAL = 'https://your-cdn.com/aerata-media';
 */

// ── Base paths ────────────────────────────────────────────────────────────────

/** Local files hosted from /public/media/ */
const BASE_LOCAL = '/media';

/** Aerata external image CDN (base44) */
const BASE_B44 = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774';

// ── Media registry ────────────────────────────────────────────────────────────

export const MEDIA = {
  // Branding
  logo:               `${BASE_LOCAL}/logo.png`,
  logoPrimary:        `${BASE_LOCAL}/logo-1.png`,

  // Videos
  heroVideo:          `${BASE_LOCAL}/promovideo.mp4`,
  constructionVideo:  `${BASE_LOCAL}/construction_monitoring.mp4`,
  model3dVideo:       `${BASE_LOCAL}/3d_model.mp4`,

  // Local photography
  solar:              `${BASE_LOCAL}/solar_normal.jpg`,
  oilGas:             `${BASE_LOCAL}/oilandgas.jpg`,
  powerTower:         `${BASE_LOCAL}/powertower.jpg`,
  powerTransmission:  `${BASE_LOCAL}/powertransmissiontower.jpg`,
  damagedTurbine:     `${BASE_LOCAL}/damaged_turbine.jpg`,

  // External photography (base44 CDN)
  heroImage:          `${BASE_B44}/65a98b32e_generated_a74332b5.png`,
  lidar:              `${BASE_B44}/c8d2cb737_generated_7a5a50ca.png`,
  construction:       `${BASE_B44}/38a98ba55_generated_a71edd9a.png`,
  infrastructure:     `${BASE_B44}/04b2da82d_generated_65a9eb1f.png`,
  agriculture:        `${BASE_B44}/81b06a698_generated_69f885a6.png`,
  oilRig:             `${BASE_B44}/f380e9e02_generated_a743b199.png`,
  environment:        `${BASE_B44}/396042db6_generated_7dacdf8c.png`,
  telecom:            `${BASE_B44}/460f7d297_generated_f4efa52d.png`,
  powerLines:         `${BASE_B44}/bea0ea3d1_generated_5b243c29.png`,
  solarPanel:         `${BASE_B44}/861fc5002_generated_b0e7bfe4.png`,
  windTurbine:        `${BASE_B44}/df75bc794_generated_9231243b.png`,
};
