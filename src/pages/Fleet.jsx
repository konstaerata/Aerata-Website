// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Wind, Shield, Radar } from 'lucide-react';
import SEO from '../components/SEO';
import OptimizedImage from '../components/shared/OptimizedImage';
import { MEDIA } from '../lib/media';
import { useLang } from '../lib/LanguageContext';
import { breadcrumbSchema } from '../lib/schemas';

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

const badges = [
  { icon: Shield, label: 'EASA Specific Category' },
  { icon: Cpu, label: 'Enterprise DJI Partner' },
  { icon: Radar, label: 'LiDAR Certified' },
  { icon: Wind, label: 'All-Weather Ops' },
];

const categoryColors = {
  'Aircraft': 'border-primary/30 text-primary bg-primary/8',
  'Camera Payload': 'border-lime/30 text-lime bg-lime/8',
  'LiDAR Payload': 'border-navy-light/40 text-navy-light bg-navy-light/8',
  'GNSS Station': 'border-amber-400/30 text-amber-400 bg-amber-400/8',
  'Ground Support': 'border-violet-400/30 text-violet-400 bg-violet-400/8',
};

export default function Fleet() {
  const { t } = useLang();

  const badges = [
    { icon: Shield, label: t('fleetPage.badgeEasa') },
    { icon: Cpu, label: t('fleetPage.badgeDji') },
    { icon: Radar, label: t('fleetPage.badgeLidar') },
    { icon: Wind, label: t('fleetPage.badgeWeather') },
  ];

  return (
    <div>
      <SEO
        title="Drone Fleet — DJI Enterprise & LiDAR Equipment"
        description="Explore Aerata's professional drone fleet: DJI Matrice 300/350 RTK, Zenmuse P1 photogrammetry, L2 LiDAR, H20T thermal sensors, and GNSS base stations for survey-grade accuracy."
        path="/fleet"
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Our Fleet' },
        ])}
      />
      {/* Hero — navy brand background */}
      <section className="relative py-32 pt-40 overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 data-trace opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-lime" />
              <span className="text-xs font-oxanium font-semibold tracking-[0.3em] uppercase text-lime">{t('fleetPage.badge')}</span>
            </div>
            <h1 className="font-oxanium font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-3xl mb-4">
              {t('fleetPage.title')}<br /><span className="text-lime">{t('fleetPage.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
              {t('fleetPage.description')}
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-sm text-white/80 shadow-sm">
                  <Icon className="w-4 h-4 text-lime shrink-0" />
                  <span className="font-oxanium text-xs font-semibold tracking-wide uppercase">{b.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLEET.map((drone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group rounded-xl border border-border/50 bg-card/40 overflow-hidden hover:border-primary/30 hover:shadow-[0_8px_32px_hsl(200_38%_28%/0.10)] transition-all duration-300 flex flex-col"
              >
                {/* Media */}
                <div className="relative h-52 overflow-hidden bg-secondary/40">
                  {drone.isVideo ? (
                    <video
                      src={drone.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <OptimizedImage
                      src={drone.image}
                      alt={drone.name}
                      width={400}
                      height={208}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-obsidian/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-[9px] font-oxanium font-bold tracking-[0.15em] uppercase rounded border ${categoryColors[drone.category] || 'border-border/60 text-muted-foreground bg-white/10'}`}>
                      {drone.category}
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono font-semibold text-white/75 tracking-widest uppercase">
                    {drone.role}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-oxanium font-bold text-foreground text-lg mb-2 tracking-wide">{drone.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{drone.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {drone.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-oxanium font-semibold border border-primary/20 text-primary/80 rounded bg-primary/5 tracking-wider uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Specs */}
                  <div className="border-t border-border/40 pt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {drone.specs.map((spec, j) => (
                      <div key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-lime/70 shrink-0 mt-1.5" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block text-xs font-oxanium font-semibold tracking-[0.25em] uppercase text-primary mb-4">{t('fleetPage.deployLabel')}</div>
          <h2 className="font-oxanium font-bold text-3xl md:text-4xl text-foreground mb-4 tracking-tight">{t('fleetPage.ctaTitle')}</h2>
          <p className="text-muted-foreground mb-8 font-light">
            {t('fleetPage.ctaDesc')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 font-oxanium font-semibold text-sm tracking-wide bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded shadow-md hover:shadow-[0_4px_20px_hsl(200_38%_28%/0.3)]"
          >
            {t('fleetPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
