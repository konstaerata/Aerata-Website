// @ts-nocheck
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from '@/components/LocalizedLink';
import { Cpu, Wind, Shield, Radar, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/shared/OptimizedImage';
import { Reveal, MaskLines, Scramble, Magnetic, Spotlight, ClipReveal, EASE_OUT } from '../components/motion';
import { MEDIA } from '../lib/media';
import { useLang } from '../lib/LanguageContext';
import { breadcrumbSchema } from '../lib/schemas';
import AutoVideo from '../components/shared/AutoVideo';

const FLEET = [
  {
    name: 'DJI Matrice 300 RTK',
    role: 'Enterprise Workhorse',
    category: 'Aircraft',
    image: MEDIA.fleet_matrice_300_image,
    specs: ['55 min flight time', 'IP45 weather protection', 'Triple-payload capacity', '15 km O3 Enterprise link', '6-directional obstacle sensing', 'Up to 2.7 kg payload'],
    tags: ['Inspections', 'LiDAR', 'Thermal', 'Long-Range'],
    desc: 'The M300 RTK is Aerata\'s primary enterprise platform for critical infrastructure, oil & gas, and long-corridor missions. Its triple-payload architecture lets us simultaneously carry thermal, zoom, and LiDAR sensors in a single flight, while the IP45 rating ensures operation in wind, rain, and extreme temperatures. RTK positioning delivers centimeter-level accuracy for mapping workflows.',
  },
  {
    name: 'DJI Matrice 350 RTK',
    role: 'Next-Gen Survey Platform',
    category: 'Aircraft',
    image: MEDIA.fleet_matrice_350_video,
    specs: ['55 min flight time', 'IP54 all-weather rating', 'Dual operator mode', 'O3 Enterprise 20 km link', 'Upgraded RTK module', 'Hot-swap battery system'],
    tags: ['Mapping', 'Photogrammetry', 'Construction', 'Survey'],
    desc: 'Our newest generation enterprise platform. The M350 RTK builds on the M300\'s proven architecture with an upgraded transmission system, improved IP54 weather sealing, and a redesigned battery system for faster turnarounds. Paired with the Zenmuse P1 or L2, it delivers the highest-accuracy aerial data available for professional surveying and construction monitoring.',
  },
  {
    name: 'DJI Matrice 4E',
    role: 'Enterprise Inspection Platform',
    category: 'Aircraft',
    image: MEDIA.fleet_matrice_4e_image,
    specs: ['42 min flight time', 'IP54 rating', 'Integrated multi-sensor payload', '20 km video transmission', 'GNSS + RTK positioning', 'Omnidirectional obstacle avoidance'],
    tags: ['Inspection', 'Thermal', 'Rapid Deploy', 'Mapping'],
    desc: 'The Matrice 4E is DJI\'s enterprise-class inspection platform in the compact M4 series. It integrates wide, zoom, thermal, and laser-rangefinder sensors in a foldable body built for rapid deployment in demanding field conditions. IP54-rated for all-weather operations, it serves as a versatile platform for infrastructure inspections, environmental surveys, and corridor monitoring missions.',
  },
  {
    name: 'DJI Matrice 4TD',
    role: 'Compact Multi-Mission Drone',
    category: 'Aircraft',
    image: MEDIA.fleet_matrice_4td_image,
    specs: ['42 min flight time', 'IP54 rating', 'Integrated 4-sensor payload', '20 km video transmission', 'GNSS + RTK positioning', 'Obstacle avoidance (omnidirectional)'],
    tags: ['Thermal', 'Inspection', 'Rapid Deploy', 'Infrastructure'],
    desc: 'The Matrice 4TD integrates a quad-sensor payload — wide, zoom, thermal, and laser rangefinder — into a compact, foldable body designed for rapid deployment. It excels in confined-space inspections, pipeline corridor surveys, and scenarios where portability and all-in-one sensing matter. The IP54 rating covers all-weather field operations.',
  },
  {
    name: 'DJI Mavic Air 2S',
    role: 'Compact Visual Documentation Drone',
    category: 'Aircraft',
    image: MEDIA.fleet_air2s_image,
    specs: ['31 min flight time', '1-inch CMOS sensor', '20 MP stills / 5.4K video', '12 km O3 transmission', 'Omnidirectional obstacle sensing', 'Under 600 g takeoff weight'],
    tags: ['Photography', 'Documentation', 'Rapid Deploy', 'Inspection'],
    desc: 'The Mavic Air 2S is a compact, sub-600 g platform carrying a 1-inch CMOS sensor capable of 20 MP stills and 5.4K video. Used for rapid visual documentation, site reconnaissance, and lower-altitude inspection tasks where portability matters. Omnidirectional obstacle sensing and a 12 km O3 link make it a reliable backup and lightweight complement to heavier enterprise platforms.',
  },
  {
    name: 'DJI Air 3S',
    role: 'Agile Aerial Imaging Platform',
    category: 'Aircraft',
    image: MEDIA.fleet_air3s_image,
    specs: ['45 min flight time', '4/3 CMOS main sensor', '3 integrated camera system', '20 km O4 transmission', 'Omnidirectional obstacle sensing', 'Under 600 g takeoff weight'],
    tags: ['Photography', 'Mapping', 'Inspection', 'Survey'],
    desc: 'Compact yet capable, the Air 3S carries a 4/3-inch CMOS sensor with a triple-camera array (wide, medium tele, 1× zoom) in a sub-600 g package. Used for rapid visual documentation, public-safety support, and lower-altitude inspection tasks where agility is essential. Its O4 transmission provides a stable 20 km link for long-range situational awareness.',
  },
  {
    name: 'DJI Neo (×2)',
    role: 'Ultra-Compact Scout Drones',
    category: 'Aircraft',
    image: MEDIA.fleet_neo_image,
    specs: ['18 min flight time', '4K / 60 fps camera', 'Under 135 g', 'FPV and mission modes', 'Obstacle avoidance', 'Propeller-guard protected'],
    tags: ['Close-Range', 'Documentation', 'Indoor', 'Training'],
    desc: 'We operate two DJI Neo units for close-range visual scouting, client demonstrations, and confined-space documentation where larger platforms are impractical. At under 135 g, the Neo falls below EASA open-category weight thresholds and can be deployed rapidly for pre-inspection site surveys or to validate access points before deploying heavier payloads.',
  },
  {
    name: 'DJI Zenmuse H20T',
    role: 'Multi-Sensor Quad-Payload',
    category: 'Camera Payload',
    image: MEDIA.fleet_h20t_image,
    specs: ['20 MP wide-angle camera', '23× hybrid optical zoom', '640×512 thermal at 30 Hz', 'Laser rangefinder (1200 m)', 'Radiometric FLIR sensor', 'IP44 ingress protection'],
    tags: ['Thermal IR', 'Inspection', 'Gas Detection', 'Search & Rescue'],
    desc: 'The H20T combines four sensing modes in a single gimbal: a wide-angle RGB camera, a 23× optical zoom camera, a radiometric thermal imager, and a 1200 m laser rangefinder. Used on the M300 RTK, it is Aerata\'s go-to payload for solar panel thermography, gas leak detection, pipeline anomaly scanning, and industrial facility inspections requiring precise temperature measurement.',
  },
  {
    name: 'DJI Zenmuse P1',
    role: 'Full-Frame Photogrammetry Camera',
    category: 'Camera Payload',
    image: MEDIA.fleet_p1_image,
    specs: ['45 MP full-frame CMOS', 'Interchangeable prime lenses', 'Three-axis stabilisation', 'Smart Oblique Capture', 'RTK geotagging', '0.5 cm/px GSD (80 m AGL)'],
    tags: ['Photogrammetry', 'Orthomosaic', '3D Modelling', 'Survey'],
    desc: 'The Zenmuse P1 is a full-frame 45 MP camera payload engineered for professional photogrammetric mapping. With interchangeable prime lenses (24 mm, 35 mm, 50 mm) and an RTK-integrated georeferencing workflow, it achieves 0.5 cm/pixel ground sampling distance from 80 m altitude. Used on the M350 RTK, the P1 is our primary tool for large-area orthomosaic production, 3D asset reconstruction, and cadastral survey.',
  },
  {
    name: 'DJI Zenmuse L2',
    role: 'LiDAR & RGB Survey Payload',
    category: 'LiDAR Payload',
    image: MEDIA.fleet_l1_image,
    specs: ['Up to 240 m range', '480,000 pts/sec (single return)', 'Point accuracy ≤3 cm (150 m)', 'Integrated 20 MP RGB camera', 'IMU real-time data fusion', '3 returns per laser pulse'],
    tags: ['LiDAR', 'DTM/DSM', 'Forestry', 'Corridor Mapping'],
    desc: 'The Zenmuse L2 integrates a Livox LiDAR module, a high-accuracy IMU, and a 20 MP RGB camera in a single payload for real-time 3D point cloud capture. Mounted on the M350 RTK, it delivers sub-3 cm point accuracy at 150 m range and up to 480,000 points per second. Ideal for vegetation canopy analysis, terrain modelling under forest cover, power-line corridor mapping, and flood-risk assessment.',
  },
  {
    name: 'DJI D-RTK 3 Multifunctional Station (×2)',
    role: 'GNSS RTK Base Station',
    category: 'GNSS Station',
    image: MEDIA.fleet_drtk3_image,
    specs: ['Multi-band GNSS (GPS/GLONASS/BeiDou/Galileo)', 'Base station & rover modes', 'Network RTK support', 'Centimetre-level corrections', 'Works with M350 RTK & M300 RTK', 'Integrated tilt compensation'],
    tags: ['RTK', 'Base Station', 'Surveying', 'Positioning'],
    desc: 'We operate two D-RTK 3 Multifunctional Stations, giving us a dedicated base-and-rover setup for the most demanding survey workflows. Each unit supports multi-constellation GNSS and can function as a base station, network RTK rover, or survey reference point. Pairing both stations enables dual-base configurations on large sites, ensuring continuous centimetre-level RTK corrections across long corridors or multi-zone operations.',
  },
  {
    name: 'DJI D-RTK 2 GNSS Mobile Station',
    role: 'High-Precision GNSS Rover',
    category: 'GNSS Station',
    image: MEDIA.fleet_drtk2_image,
    specs: ['Dual-frequency GNSS', 'RTK accuracy ≤1 cm + 1 ppm', 'Compatible with M300 RTK', 'UHF & Wi-Fi data link', 'Tripod & pole mounting', 'IP67 ingress protection'],
    tags: ['RTK', 'GCP', 'Surveying', 'M300'],
    desc: 'The D-RTK 2 is DJI\'s second-generation high-precision GNSS mobile station, purpose-built as the reference receiver for the Matrice 300 RTK. It provides real-time RTK corrections via UHF or Wi-Fi, achieving centimetre-level horizontal accuracy. Used for placing and verifying ground control points, establishing local coordinate references, and supporting dual-RTK workflows where the aircraft receiver alone is insufficient.',
  },
  {
    name: 'Topcon HiPer V GNSS Receiver',
    role: 'Survey-Grade GNSS Rover',
    category: 'GNSS Station',
    image: MEDIA.fleet_topcon_hiper_image,
    specs: ['226-channel dual-frequency GNSS', 'Integrated digital UHF radio', 'RTK accuracy: 3 mm + 0.5 ppm (H)', 'Bluetooth & Wi-Fi connectivity', 'Tilt-compensated pole measurements', 'IP67 / drop-resistant housing'],
    tags: ['GNSS', 'GCP', 'Survey', 'Ground Truth'],
    desc: 'The Topcon HiPer V is a professional survey-grade GNSS receiver used for ground control point placement, cadastral boundary measurement, and independent position verification. Its integrated digital UHF radio enables long-range RTK corrections from a base station in the field, while the 226-channel dual-frequency engine tracks all major satellite constellations for maximum reliability in challenging environments.',
  },
  {
    name: 'Starlink',
    role: 'Portable Satellite Internet',
    category: 'Ground Support',
    image: MEDIA.fleet_starlink_image,
    specs: ['Low-earth-orbit satellite network', 'Download: up to 200 Mbps', 'Latency: 20–40 ms typical', 'Self-orienting antenna', 'Operational in remote locations', 'Compatible with DJI Cellular Dongle'],
    tags: ['Connectivity', 'Remote Ops', 'Data Upload', 'Mission Planning'],
    desc: 'Starlink provides high-speed broadband connectivity from any field location, eliminating reliance on ground-based mobile networks during remote operations. We use it to upload processed data to the cloud, access live mission-planning platforms, stream real-time situational awareness feeds, and maintain secure communications with clients and project teams during offshore, wilderness, and infrastructure corridor deployments.',
  },
];

// Category dot colours — a quiet key that reads on both photo and card.
const categoryDot = {
  'Aircraft': 'bg-lime',
  'Camera Payload': 'bg-sky-300',
  'LiDAR Payload': 'bg-violet-300',
  'GNSS Station': 'bg-amber-300',
  'Ground Support': 'bg-white/80',
};

const CATEGORIES = ['All', ...Array.from(new Set(FLEET.map((d) => d.category)))];

function FleetCard({ drone }) {
  const [open, setOpen] = useState(false);

  return (
    <Spotlight
      tone="navy"
      className="group h-full rounded-xl border border-border/60 bg-card overflow-hidden flex flex-col transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_hsl(210_35%_12%/0.3)]"
    >
      {/* Media */}
      <ClipReveal className="relative h-56 overflow-hidden bg-obsidian">
        {drone.isVideo ? (
          <AutoVideo
            src={drone.image}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <OptimizedImage
            src={drone.image}
            alt={drone.name}
            width={400}
            height={224}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-full"
            imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent pointer-events-none" />
        <span aria-hidden="true" className="absolute top-3 left-3 w-5 h-5 border-l border-t border-lime/60 transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
        <span aria-hidden="true" className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-lime/60 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian/75 text-[9px] font-display font-bold tracking-[0.15em] uppercase text-white/90">
          <span className={`w-1.5 h-1.5 rounded-full ${categoryDot[drone.category] || 'bg-white/70'}`} />
          {drone.category}
        </span>
        <span className="absolute bottom-3 left-4 text-[10px] font-mono font-semibold text-white/80 tracking-widest uppercase">
          {drone.role}
        </span>
      </ClipReveal>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="font-display font-bold text-foreground text-xl mb-3 tracking-tight leading-snug">{drone.name}</h2>
        <p className={`text-sm text-muted-foreground leading-relaxed ${open ? '' : 'line-clamp-3 md:line-clamp-none'}`}>{drone.desc}</p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="md:hidden self-start mt-2 py-1 text-xs font-display font-semibold tracking-wider uppercase text-primary"
        >
          {open ? 'Less' : 'More'}
        </button>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-5 mb-5">
          {drone.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-display font-semibold border border-primary/20 text-primary/80 rounded bg-primary/5 tracking-wider uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* Specs — HUD readout */}
        <ul className="mt-auto rounded-lg bg-obsidian/[0.03] border border-border/60 divide-y divide-border/50">
          {drone.specs.map((spec, j) => (
            <li key={j} className="flex items-center gap-3 px-3.5 py-2 text-xs text-foreground/80">
              <span aria-hidden="true" className="font-mono text-[10px] text-[hsl(88_55%_24%)] tabular-nums shrink-0">{String(j + 1).padStart(2, '0')}</span>
              <span className="leading-snug">{spec}</span>
            </li>
          ))}
        </ul>
      </div>
    </Spotlight>
  );
}

export default function Fleet() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const [category, setCategory] = useState('All');

  const badges = [
    { icon: Shield, label: t('fleetPage.badgeEasa') },
    { icon: Cpu, label: t('fleetPage.badgeDji') },
    { icon: Radar, label: t('fleetPage.badgeLidar') },
    { icon: Wind, label: t('fleetPage.badgeWeather') },
  ];

  const visible = category === 'All' ? FLEET : FLEET.filter((d) => d.category === category);
  const countFor = (c) => (c === 'All' ? FLEET.length : FLEET.filter((d) => d.category === c).length);

  return (
    <div>
      <SEO
        title="Drone Fleet — DJI Enterprise & LiDAR Equipment"
        description="Explore Aerata's professional drone fleet: DJI Matrice 300/350 RTK, Zenmuse P1 photogrammetry, L2 LiDAR, H20T thermal sensors, and GNSS base stations for survey-grade accuracy."
        path="/fleet"
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Our Fleet' },
        ], lang)}
      />
      {/* Hero — navy brand background */}
      <section className="relative pt-44 pb-28 overflow-hidden bg-navy-dark grain">
        <div aria-hidden="true" className="absolute inset-0 hud-grid" />
        <div aria-hidden="true" className="absolute -right-40 top-10 w-[640px] h-[640px] rounded-full bg-lime/10 blur-3xl" />
        {!reduce && <div className="scanline z-10" aria-hidden="true" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="block w-16 h-px bg-lime origin-left"
            />
            <Scramble text={t('fleetPage.badge')} className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-lime" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl mb-6">
            <MaskLines lines={[t('fleetPage.title'), <span key="h" className="text-lime">{t('fleetPage.titleHighlight')}</span>]} delay={0.15} />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.27, ease: EASE_OUT }}
            className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed"
          >
            {t('fleetPage.description')}
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } } }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={i}
                  variants={reduce ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.39, ease: EASE_OUT } } }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-white/15 bg-white/[0.06] text-sm text-white/85"
                >
                  <Icon className="w-4 h-4 text-lime shrink-0" aria-hidden="true" />
                  <span className="font-display text-xs font-semibold tracking-wide uppercase">{b.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <Reveal className="sticky top-16 z-20 -mx-4 px-4 py-3 mb-10 bg-background/90 backdrop-blur-md sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:static">
            <div role="tablist" aria-label="Filter fleet by category" className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
              {CATEGORIES.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(c)}
                    className={`relative shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-display font-semibold tracking-wider uppercase transition-colors duration-300 ${
                      active ? 'text-white' : 'text-muted-foreground hover:text-primary border border-border bg-card'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="fleet-chip"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c}</span>
                    <span className={`relative font-mono text-[10px] tabular-nums ${active ? 'text-white/90' : 'text-muted-foreground'}`}>{countFor(c)}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <motion.div layout={!reduce} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((drone) => (
                <motion.div
                  key={drone.name}
                  layout={!reduce}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.36, ease: EASE_OUT }}
                >
                  <FleetCard drone={drone} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 bg-secondary/30 border-t border-border/30 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 data-trace opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Reveal className="inline-block text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary mb-5">{t('fleetPage.deployLabel')}</Reveal>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-5 tracking-tight leading-[1.05]">
            <MaskLines lines={[t('fleetPage.ctaTitle')]} onMount={false} />
          </h2>
          <Reveal delay={0.15} className="text-muted-foreground text-lg mb-10 font-light">
            {t('fleetPage.ctaDesc')}
          </Reveal>
          <Reveal delay={0.25}>
            <Magnetic>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 font-display font-semibold text-sm tracking-wide bg-primary text-white hover:bg-primary/90 btn-shine transition-colors duration-300 rounded shadow-[0_12px_30px_-12px_hsl(200_38%_28%/0.6)]"
              >
                {t('fleetPage.ctaButton')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
