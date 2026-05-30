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
 */

// ── Base paths ─────────────────────────────────────────────────────────────────

/** Cloudflare R2 — all media served from here in both dev and production */
const BASE_LOCAL = 'https://pub-8d398fd9e3a643679e74a0eacc815464.r2.dev';

/** External image CDN (base44) */
const BASE_B44 = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774';

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
  home_hero_video:                     `${BASE_LOCAL}/promovideoforfrontpage.mp4`,
  home_hero_image:                     `${BASE_B44}/65a98b32e_generated_a74332b5.png`,

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
  env_hero_image:                      `${BASE_LOCAL}/environmental.mp4`,
  env_gallery_bird_migration_image:    `${BASE_B44}/396042db6_generated_7dacdf8c.png`,
  env_gallery_crop_health_image:       `${BASE_B44}/81b06a698_generated_69f885a6.png`,
  env_gallery_habitat_mapping_image:   `${BASE_B44}/c8d2cb737_generated_7a5a50ca.png`,
  env_gallery_ecosystem_image:         `${BASE_B44}/396042db6_generated_7dacdf8c.png`,
  env_section_monitoring_image:        `${BASE_LOCAL}/environmentalmonitoring.png`,
  env_section_biodiversity_image:      `${BASE_LOCAL}/ainest.png`,
  env_section_smart_agriculture_image: `${BASE_LOCAL}/smartagriculture.png`,

  // ── Surveying page ───────────────────────────────────────────────────────────
  surveying_hero_video:                `${BASE_LOCAL}/construction_monitoring.MP4`,
  surveying_section_orthophotos_image: `${BASE_LOCAL}/photogrammetry.png`,
  surveying_section_lidar_image:       `${BASE_LOCAL}/lidarsurvey.png`,
  surveying_section_construction_image:`${BASE_LOCAL}/guillherme-schneider-CJK1s0Cd0fU-unsplash.webp`,
  surveying_section_ai_image:          `${BASE_LOCAL}/aidamage.png`,
  surveying_demo_3d_video:             `${BASE_LOCAL}/3D_model_aerial_mapping_stcatherines.mp4`,

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
};
