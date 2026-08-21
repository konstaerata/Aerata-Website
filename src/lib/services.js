/**
 * services.js — registry of the 5 service pages, used to build "related
 * services" cross-links without duplicating titles/paths/descriptions
 * across every service page file.
 */
export const SERVICES = [
  {
    key: 'surveying',
    path: '/services/surveying',
    name: 'Surveying & Mapping',
    description: 'LiDAR surveys, orthophotos, and 3D photogrammetric mapping.',
  },
  {
    key: 'renewable-energy',
    path: '/services/renewable-energy',
    name: 'Renewable Energy',
    description: 'Thermal inspections for solar farms and wind turbine blades.',
  },
  {
    key: 'infrastructure',
    path: '/services/infrastructure',
    name: 'Infrastructure',
    description: 'Power line, tower, and telecom asset inspections.',
  },
  {
    key: 'environmental',
    path: '/services/environmental',
    name: 'Environmental Monitoring',
    description: 'Multispectral crop health, habitat, and ecosystem monitoring.',
  },
  {
    key: 'oil-gas',
    path: '/services/oil-gas',
    name: 'Oil & Gas',
    description: 'Pipeline corridor and flare stack inspections.',
  },
];

export function relatedServices(currentKey, count = 3) {
  return SERVICES.filter((s) => s.key !== currentKey).slice(0, count);
}
