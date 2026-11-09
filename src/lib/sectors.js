/**
 * sectors.js — registry of the six sector pages.
 *
 * Copy lives in the locale files under `sectorPages.<key>` (sections, items,
 * deliverables, card outcomes). This file holds the parts that are not
 * translated: routes, icons, project lists and image slots.
 *
 * IMAGE SLOTS
 * ───────────
 * Every image on a sector page is a slot: `{ id, desc, src? }`. Without a
 * `src` the slot renders a placeholder box showing its id and what photo it
 * wants (see components/shared/MediaSlot.jsx). To fill a slot, upload the
 * photo to R2, add it to MEDIA in lib/media.js and set `src` here.
 * `compare` slots are before/after pairs for the comparison slider.
 */
import { Sun, Zap, HardHat, Factory, ShieldCheck, Leaf } from 'lucide-react';
import { MEDIA, SERVICE_PREVIEW_VIDEOS, mediaUrl, mediaSrcSet } from './media';
import { solarProjects, windProjects, lidarProjects, constructionProjects, environmentalProjects, specialistProjects } from './projects';

export const SECTORS = [
  {
    key: 'renewables',
    path: '/sectors/renewable-energy',
    legacyPath: '/services/renewable-energy',
    icon: Sun,
    card: MEDIA.sector_card_renewable_image,
    preview: SERVICE_PREVIEW_VIDEOS['/services/renewable-energy'],
    hero: { src: MEDIA.renewable_hero_image },
    services: ['pv-thermal', 'wind', 'mapping', 'lidar', 'security'],
    projects: [...solarProjects.filter((p) => p.featured), ...windProjects, ...constructionProjects.filter((p) => /solar|pv/i.test(p.name))].slice(0, 10),
    sections: {
      solarOperation: {
        media: [
          { id: 'SOL-01', desc: 'Thermal image of PV modules with defective cells.', src: MEDIA.photo_sol_01 },
          { id: 'SOL-02', desc: 'Aerata thermographer checking an open combiner box at a solar plant.', src: MEDIA.photo_sol_02 },
        ],
      },
      solarConstruction: {
        media: [
          { id: 'SOL-03', desc: 'PV plant under construction from the air, inverter station and module rows.', src: MEDIA.photo_sol_03 },
          { id: 'SOL-04', desc: 'Progress map of a PV plant under construction, by plant area.', src: MEDIA.photo_sol_04 },
        ],
      },
      windOperation: {
        media: [
          { id: 'WND-05', desc: 'Drone close-up of a turbine hub and blade root.', src: MEDIA.photo_srv_02 },
          { id: 'WND-07', desc: 'Wind turbine inspection from the air.', src: MEDIA.renewable_section_wind_image },
        ],
      },
      windConstruction: {
        media: [
          { id: 'WND-03', desc: 'Wind turbine foundation under construction, from the air.', src: MEDIA.photo_wnd_03 },
          { id: 'WND-04', desc: 'Turbine erection with crane on a hilltop wind farm.', src: MEDIA.photo_wnd_04 },
        ],
      },
    },
  },
  {
    key: 'grid',
    path: '/sectors/power-grids-telecom',
    legacyPath: '/services/infrastructure',
    icon: Zap,
    card: MEDIA.sector_card_infrastructure_image,
    preview: SERVICE_PREVIEW_VIDEOS['/services/infrastructure'],
    hero: { src: MEDIA.infra_section_powerlines_image },
    services: ['power-line', 'lidar', 'mapping', 'security'],
    projects: [],
    sections: {
      mv: {
        media: [
          { id: 'GRD-01', desc: 'Medium-voltage pole line running through trees.', src: MEDIA.photo_grd_01 },
          { id: 'GRD-02', desc: 'Classified LiDAR point cloud of a medium-voltage line corridor.', src: MEDIA.photo_grd_02 },
          { id: 'GRD-07', desc: 'Close-up of medium-voltage insulators and fittings.', src: MEDIA.photo_grd_card },
        ],
      },
      hv: {
        media: [
          { id: 'GRD-03', desc: 'High-voltage pylon from the air.', src: MEDIA.infra_report_transmission_image },
          { id: 'GRD-04', desc: 'Close-up of a high-voltage insulator and fittings.', src: MEDIA.photo_grd_04 },
        ],
      },
      telecom: {
        media: [
          { id: 'GRD-05', desc: 'Telecom mast with antennas and radio units.', src: MEDIA.photo_grd_05 },
          { id: 'GRD-06', desc: '3D model of a radio mast, structure coloured by member.', src: MEDIA.photo_grd_06 },
        ],
      },
    },
  },
  {
    key: 'build',
    path: '/sectors/construction-surveying',
    legacyPath: '/services/surveying',
    icon: HardHat,
    card: MEDIA.sector_card_surveying_image,
    preview: SERVICE_PREVIEW_VIDEOS['/services/surveying'],
    hero: { video: MEDIA.surveying_hero_video, poster: MEDIA.surveying_hero_poster },
    services: ['mapping', 'lidar', 'security'],
    projects: [...constructionProjects.filter((p) => !/solar|pv/i.test(p.name)), ...lidarProjects].slice(0, 8),
    sections: {
      building: {
        media: [
          { id: 'BLD-01', desc: 'Construction progress from above at three stages.', src: MEDIA.photo_bld_01 },
          { id: 'BLD-02', desc: 'Thermal analysis of a building roof with findings marked.', src: MEDIA.photo_bld_02 },
        ],
      },
      surveying: {
        media: [
          { id: 'BLD-03', desc: 'Orthophoto and 3D site model.', src: MEDIA.surveying_section_orthophotos_image },
          { id: 'BLD-04', desc: 'LiDAR survey point cloud.', src: MEDIA.surveying_section_lidar_image },
        ],
      },
      mining: {
        media: [
          { id: 'BLD-05', desc: '3D model of a quarry with cut and fill volumes.', src: MEDIA.photo_bld_05 },
          { id: 'BLD-06', desc: 'Stockpile volume report from a drone survey.', src: MEDIA.photo_bld_06 },
        ],
      },
    },
  },
  {
    key: 'infra',
    path: '/sectors/infrastructure-industry',
    legacyPath: '/services/oil-gas',
    icon: Factory,
    card: MEDIA.photo_inf_h,
    hero: { src: MEDIA.photo_inf_h },
    services: ['mapping', 'lidar', 'security'],
    projects: [],
    sections: {
      infrastructure: {
        media: [
          { id: 'INF-01', desc: 'Close-up of a crack in a concrete bridge beam.', src: MEDIA.photo_inf_01 },
          { id: 'INF-02', desc: '3D digital twin of an arch bridge.', src: MEDIA.photo_inf_02 },
        ],
      },
      industrial: {
        media: [
          { id: 'INF-03', desc: 'Pipeline and industrial pipework from the air.', src: MEDIA.oilgas_section_cost_image },
          { id: 'INF-04', desc: 'Thermal image of industrial pipework showing heat loss.', src: MEDIA.photo_inf_03 },
        ],
      },
      maritime: {
        media: [
          { id: 'INF-05', desc: 'Inspection drone over a container port.', src: MEDIA.photo_inf_05 },
          { id: 'INF-06', desc: 'Drone inspecting a ship hull and quay in an industrial harbour.', src: MEDIA.photo_inf_card },
        ],
      },
      ski: {
        media: [
          { id: 'INF-07', desc: 'Chairlift sheave train and rope, close drone view.', src: MEDIA.photo_inf_07 },
          { id: 'INF-08', desc: 'Terrain contour model of a ski area with lift lines.', src: MEDIA.photo_inf_08 },
        ],
      },
    },
  },
  {
    key: 'safety',
    path: '/sectors/security-public-safety',
    icon: ShieldCheck,
    card: MEDIA.photo_saf_h,
    hero: { src: MEDIA.photo_saf_h },
    services: ['security', 'mapping'],
    projects: specialistProjects.filter((p) => /search|rescue/i.test(p.name)),
    sections: {
      security: {
        media: [
          { id: 'SAF-01', desc: 'Kooi mobile camera unit on a rail construction site.', src: MEDIA.photo_saf_01 },
          { id: 'SAF-02', desc: 'AI-generated illustration of a Kooi camera unit with a DJI drone on a site.', src: MEDIA.photo_saf_02, ai: true, aiBadge: false },
        ],
      },
      publicSafety: {
        media: [
          { id: 'SAF-03', desc: 'Drone over an active wildfire front.', src: MEDIA.photo_saf_03 },
          { id: 'SAF-04', desc: 'Drone team and rescue helicopter at a mountain staging area.', src: MEDIA.photo_saf_04 },
        ],
      },
    },
  },
  {
    key: 'environmental',
    path: '/sectors/environmental-monitoring',
    legacyPath: '/services/environmental',
    icon: Leaf,
    card: MEDIA.env_section_smart_agriculture_image,
    preview: SERVICE_PREVIEW_VIDEOS['/services/environmental'],
    hero: { video: MEDIA.env_hero_image, poster: MEDIA.env_hero_poster },
    services: ['mapping', 'lidar'],
    projects: environmentalProjects,
    sections: {
      monitoring: {
        media: [
          { id: 'ENV-01', desc: 'Multispectral and thermal environmental monitoring outputs.', src: MEDIA.env_section_monitoring_image },
          { id: 'ENV-02', desc: 'Water body mapped from the air, coloured by index.', src: MEDIA.photo_env_01 },
        ],
      },
      biodiversity: {
        media: [
          { id: 'ENV-03', desc: 'Biodiversity survey from the air.', src: MEDIA.env_section_biodiversity_image },
          { id: 'ENV-04', desc: 'Water birds counted from the air on open water.', src: MEDIA.photo_env_card },
        ],
      },
      agriculture: {
        media: [
          { id: 'ENV-05', desc: 'Smart agriculture survey with NDVI crop health maps.', src: MEDIA.env_section_smart_agriculture_image },
          { id: 'ENV-06', desc: 'Prescription map of a field split into treatment zones.', src: MEDIA.photo_env_05 },
        ],
      },
    },
  },
];

/** Languages the sector and services pages are translated into (others stay noindex). */
export const CONTENT_LANGUAGES = ['en', 'el'];

export const SECTOR_BY_PATH = Object.fromEntries(SECTORS.map((s) => [s.path, s]));

const warmedHeroes = new Set();
/**
 * Downloads and decodes a sector page's hero picture (or video poster) ahead
 * of a click, with the same srcset the hero uses, so the card -> page morph
 * doesn't sit frozen waiting for it.
 */
export function warmSectorHero(path) {
  const hero = SECTOR_BY_PATH[path]?.hero;
  if (!hero || warmedHeroes.has(path) || typeof Image === 'undefined') return;
  warmedHeroes.add(path);
  const img = new Image();
  img.decoding = 'async';
  if (hero.src) {
    const set = mediaSrcSet(hero.src);
    if (set) { img.srcset = set; img.sizes = '100vw'; }
    img.src = mediaUrl(hero.src, { width: 1920 });
  } else if (hero.poster) {
    img.src = hero.poster;
  } else return;
  img.decode?.().catch(() => {});
}

/** Old /services/* URLs and the sector page that replaces each. */
export const LEGACY_REDIRECTS = SECTORS.filter((s) => s.legacyPath).map((s) => ({ from: s.legacyPath, to: s.path }));

/** The other sectors, starting after the current one so each page links onward. */
export function relatedSectors(currentKey, count = 3) {
  const i = SECTORS.findIndex((s) => s.key === currentKey);
  return Array.from({ length: Math.min(count, SECTORS.length - 1) }, (_, k) => SECTORS[(i + 1 + k) % SECTORS.length]);
}
