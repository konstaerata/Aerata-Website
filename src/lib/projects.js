/**
 * projects.js — centralized project database
 *
 * Used across service pages to showcase real completed work.
 * To add a project, add an entry to the relevant service array below.
 * Each entry is displayed as a card in the ServiceProjects section.
 *
 * Fields:
 *   name    — project/client title (shown as card heading)
 *   desc    — 1-2 sentence generated description
 *   spec    — optional key metric (MW, km, ha, etc.) shown as a badge
 *   year    — optional year string
 *   country — optional country/region for context
 *   tag     — short category label for the badge
 *   featured — if true, card gets a lime accent border
 */

// ── Renewable Energy (Solar) ─────────────────────────────────────────────────
export const solarProjects = [
  {
    name: 'Isolar PV Portfolio',
    desc: 'IEC 62446-3 compliant aerial thermographic and RGB inspection across a multi-site solar portfolio in Greece. Anomaly reports delivered per site within 48 hours.',
    spec: '237 MWp',
    year: '2024',
    country: 'Greece',
    tag: 'Thermography',
    featured: true,
  },
  {
    name: 'Kopaida Solar Park — AI Anomaly Detection',
    desc: 'Thermographic inspection with AI-powered fault classification. Over 500 anomalies categorised by type and revenue impact for maintenance prioritisation.',
    spec: '71.3 MW',
    year: '2024',
    country: 'Greece',
    tag: 'AI + Thermal',
    featured: true,
  },
  {
    name: 'Tichero PV Thermal Inspection',
    desc: 'IEC-compliant thermal data acquisition and defect reporting for a utility-scale solar park in central Greece.',
    spec: '45.6 MW',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Sitemark PV Thermal Inspection',
    desc: 'High-resolution thermal data acquisition and structured defect report delivered in IEC 62446-3 format.',
    spec: '75 MW',
    year: '2023',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: '35 MWp Solar — Thiva',
    desc: 'IEC-compliant thermal and RGB inspection with automated anomaly detection and severity classification.',
    spec: '35 MWp',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'EDF Renewables Hellas — IEC Inspection',
    desc: 'Thermal mapping and AI-based anomaly detection for EDF Renewables solar assets in Greece.',
    year: '2023',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Voltalia Greece — RGB & Thermal Mapping',
    desc: 'Aerial thermal and visual mapping across multiple Voltalia solar assets. Anomaly detection with structured reporting.',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'RGB & Thermal Mapping — Finland',
    desc: 'Aerial thermal and RGB inspection for solar assets in Finland, demonstrating northern European operational capability.',
    year: '2023',
    country: 'Finland',
    tag: 'Thermography',
  },
  {
    name: 'RGB & Thermal Mapping — Czech Republic',
    desc: 'Cross-border thermal inspection and anomaly mapping for solar assets in the Czech Republic.',
    year: '2023',
    country: 'Czech Republic',
    tag: 'Thermography',
  },
  {
    name: 'Isolar Kilkis',
    desc: 'Thermal inspection for fault identification and panel performance monitoring.',
    spec: '2 MW',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'EDF Skala Korinis',
    desc: 'Thermal mapping and anomaly detection for EDF solar energy assets in Greece.',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'IEC Thermography — Anthili & Kanalaki',
    desc: 'IEC-compliant thermographic data acquisition across two sites simultaneously.',
    spec: 'IEC 3 cm GSD',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Delfini No. 451 — Thermal Series',
    desc: 'Multiple IEC-compliant thermal data acquisition campaigns at various GSDs for solar park optimisation.',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Alexandroupoli PV — Solar Thermography',
    desc: 'Thermal mapping and IEC-compliant data acquisition for solar assets in north-eastern Greece.',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'STR Power Group — Delfini Project',
    desc: 'IEC-compliant thermal mapping and anomaly detection for solar energy assets.',
    year: '2024',
    country: 'Greece',
    tag: 'Thermography',
  },
];

// ── Wind Energy ───────────────────────────────────────────────────────────────
export const windProjects = [
  {
    name: 'Sulzer & Schmid Laboratories — Turbine Inspections',
    desc: 'Collaborative blade inspection programme with Sulzer Schmid Laboratories AG using 3DX photogrammetric reconstruction. Full-surface defect cataloguing and condition reports for multiple wind parks.',
    year: '2023',
    country: 'Greece',
    tag: '3DX / Blades',
    featured: true,
  },
  {
    name: 'Wind Parks of Crete — Elicas Group',
    desc: 'Aerial mapping and topographical modelling for wind farm access routes, site planning, and regulatory documentation in Crete.',
    year: '2024',
    country: 'Greece',
    tag: 'Survey',
  },
  {
    name: 'Wind Parks of Crete — HELIKA S.A.',
    desc: 'Aerial photogrammetric survey and terrain modelling for wind farm access routes and installation planning in Crete.',
    year: '2024',
    country: 'Greece',
    tag: 'Survey',
  },
  {
    name: 'VALOREM — Mount Ipatio Wind Park',
    desc: 'Aerial photography and topographical surveying for a wind park installation in central Greece.',
    year: '2023',
    country: 'Greece',
    tag: 'Survey',
  },
  {
    name: 'Elicas Group Sitia 2026',
    desc: 'Route planning and terrain modelling for next-generation wind farm development in eastern Crete.',
    year: '2025',
    country: 'Greece',
    tag: 'Planning',
  },
];

// ── LiDAR & Surveying ─────────────────────────────────────────────────────────
export const lidarProjects = [
  {
    name: 'Zagori LiDAR Survey',
    desc: 'High-density aerial LiDAR survey across remote mountainous terrain in Epirus. Sub-centimetre DTMs and classified water stream networks for hydraulic study and flood risk assessment.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Hydrology',
    featured: true,
  },
  {
    name: 'Messinia – Oichalia LiDAR Survey',
    desc: 'High-density LiDAR and terrain modelling for water stream classification and infrastructure planning in the Peloponnese.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Hydrology',
  },
  {
    name: 'Livadia — Drone Survey for Hydraulic Study',
    desc: 'Aerial LiDAR survey and topographical modelling for water streams and flood risk assessment in central Greece.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Hydrology',
  },
  {
    name: 'FARSALA Project',
    desc: 'Aerial mapping using LiDAR and photogrammetry for large-scale land development and infrastructure planning.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Survey',
  },
  {
    name: 'Drama LiDAR Survey (Sitemark)',
    desc: 'Aerial LiDAR data acquisition and 3D point cloud classification for solar construction site planning.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Construction',
  },
  {
    name: 'Aerial Scan — Wastewater Treatment Plant',
    desc: 'Precision LiDAR scanning and 3D modelling for wastewater treatment facility condition assessment and expansion planning.',
    year: '2023',
    country: 'Greece',
    tag: 'LiDAR / Industrial',
    featured: true,
  },
  {
    name: 'SSSC-9 — Topographical Mapping',
    desc: 'Topographical contour mapping for land boundaries and solar park development.',
    spec: '2.73 MW',
    year: '2024',
    country: 'Greece',
    tag: 'Topography',
  },
  {
    name: 'Survey Projects — Kalamaki, Pyrgaki, Agios Nikolaos',
    desc: 'A series of aerial surveying and topographical mapping projects for land development and planning approvals across the Peloponnese.',
    year: '2023',
    country: 'Greece',
    tag: 'Survey',
  },
];

// ── Construction Monitoring ───────────────────────────────────────────────────
export const constructionProjects = [
  {
    name: 'Infinity Project — Advanced Construction Monitoring',
    desc: 'Continuous drone-powered monitoring with automated progress tracking, 3D modelling, and as-built versus design comparison for a large-scale solar construction project.',
    year: '2024',
    country: 'Greece',
    tag: 'Progress Tracking',
    featured: true,
  },
  {
    name: 'Alexandroupoli PV — Construction Monitoring',
    desc: 'Aerial data acquisition and orthomosaic mapping for ongoing progress monitoring at a utility-scale solar construction site.',
    year: '2024',
    country: 'Greece',
    tag: 'SCM',
  },
  {
    name: 'Pteleonas Solar (Sitemark)',
    desc: 'Regular aerial surveys and Sitemark-integrated reporting for solar construction progress tracking.',
    spec: '15 MW',
    year: '2024',
    country: 'Greece',
    tag: 'SCM / Sitemark',
  },
  {
    name: 'Tichero — Solar Construction (Sitemark)',
    desc: 'Automated aerial progress monitoring integrated with Sitemark project management platform.',
    year: '2024',
    country: 'Greece',
    tag: 'SCM / Sitemark',
  },
  {
    name: 'Solar Construction Monitoring — 160 ha',
    desc: 'Large-footprint construction monitoring covering 160 hectares. Volume calculations and change detection delivered on weekly survey cycles.',
    spec: '160 ha',
    year: '2023',
    country: 'Greece',
    tag: 'Large-Scale SCM',
  },
  {
    name: 'Solar Construction Monitoring — 100 ha',
    desc: 'Aerial progress monitoring across a 100-hectare solar construction site with automated change detection.',
    spec: '100 ha',
    year: '2023',
    country: 'Greece',
    tag: 'SCM',
  },
  {
    name: 'Embiria Consultancy — Anthili',
    desc: 'Aerial data acquisition and ground surveys for civil works monitoring at a major solar construction project.',
    year: '2024',
    country: 'Greece',
    tag: 'SCM',
  },
];

// ── Environmental & Water ────────────────────────────────────────────────────
export const environmentalProjects = [
  {
    name: 'Lake Marathon Multispectral Survey — VITO × EYDAP',
    desc: 'Multispectral drone monitoring of the primary drinking water reservoir for Athens. NDWI and chlorophyll indices established a water quality baseline in collaboration with VITO (Belgium) and EYDAP.',
    year: '2023',
    country: 'Greece',
    tag: 'Water Quality',
    featured: true,
  },
  {
    name: 'Aerial Scan — Wastewater Treatment Plant',
    desc: 'Precision LiDAR scanning and 3D modelling for a wastewater treatment facility, enabling condition assessment and upgrade planning.',
    year: '2023',
    country: 'Greece',
    tag: 'Industrial',
  },
  {
    name: 'Koewacht Air Watchtower',
    desc: 'Aerial RGB photography supporting structural inspection and aerial surveillance operations in the Netherlands.',
    year: '2023',
    country: 'Netherlands',
    tag: 'Structural',
  },
];

// ── Training & Specialist Ops ────────────────────────────────────────────────
export const specialistProjects = [
  {
    name: 'Thermography Training Programme — Greece',
    desc: 'On-site thermography training sessions for local drone operators, covering flight protocols, thermal sensor calibration, and IEC-compliant data capture workflows.',
    year: '2023',
    country: 'Greece',
    tag: 'Training',
    featured: true,
  },
  {
    name: 'Search and Rescue — Johann Williams',
    desc: 'Drone software and equipment support for a live search and rescue operation, demonstrating Aerata\'s capability in time-critical specialist deployments.',
    year: '2023',
    tag: 'SAR',
    featured: true,
  },
  {
    name: 'ABO WIND Thesprotia — 3D Renderings',
    desc: 'Photorealistic 3D aerial renderings for wind park development planning and stakeholder communication in north-western Greece.',
    year: '2024',
    country: 'Greece',
    tag: '3D Visualisation',
  },
];
