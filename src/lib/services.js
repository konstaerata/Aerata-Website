/**
 * services.js — registry of the sector pages (keys kept for news category links), used to build "related
 * services" cross-links without duplicating titles/paths/descriptions
 * across every service page file.
 */
export const SERVICES = [
  {
    key: 'surveying',
    path: '/sectors/construction-surveying',
    name: 'Construction, Surveying & Mining',
    description: 'Progress, volumes, LiDAR and survey-grade maps for sites that change.',
  },
  {
    key: 'renewable-energy',
    path: '/sectors/renewable-energy',
    name: 'Renewable Energy',
    description: 'PV thermal inspection, blade inspection and construction monitoring.',
  },
  {
    key: 'infrastructure',
    path: '/sectors/power-grids-telecom',
    name: 'Power Grids & Telecom',
    description: 'Medium- and high-voltage lines, substations and telecom masts.',
  },
  {
    key: 'environmental',
    path: '/sectors/environmental-monitoring',
    name: 'Environmental Monitoring',
    description: 'Multispectral crop health, habitat, and ecosystem monitoring.',
  },
  {
    key: 'oil-gas',
    path: '/sectors/infrastructure-industry',
    name: 'Infrastructure & Industry',
    description: 'Bridges, dams, plants, ports and ski lifts, inspected from a distance.',
  },
];

export function relatedServices(currentKey, count = 3) {
  return SERVICES.filter((s) => s.key !== currentKey).slice(0, count);
}
