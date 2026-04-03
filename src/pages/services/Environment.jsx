// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';

const ENV_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/396042db6_generated_7dacdf8c.png';
const AGRI_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/81b06a698_generated_69f885a6.png';
const LIDAR_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/c8d2cb737_generated_7a5a50ca.png';

export default function Environmental() {
  return (
    <div>
      <ServicePageHero
        title="Environmental Monitoring & Smart Agriculture"
        subtitle="Revolutionizing environmental monitoring with cutting-edge drone technology and AI-powered data analysis. Elevate your environmental insights."
        image={ENV_IMG}
      />

      {/* Image Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { img: ENV_IMG, label: 'Bird Migration Tracking' },
              { img: AGRI_IMG, label: 'Crop Health Monitoring' },
              { img: LIDAR_IMG, label: 'Habitat Mapping' },
              { img: ENV_IMG, label: 'Ecosystem Assessment' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-lg aspect-square"
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-barlow font-semibold text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceSection
          title="Precise Environmental Monitoring"
          description="Our drone-based environmental monitoring services provide accurate habitat mapping, pollution detection, and comprehensive ecosystem assessments. Using multi-spectral and thermal sensors, we deliver data that enables informed conservation decisions."
          features={[
            'Multi-spectral habitat mapping',
            'Water quality and pollution detection',
            'Coastal erosion monitoring',
            'Wetland and forest ecosystem assessments',
          ]}
          image={ENV_IMG}
        />
        <ServiceSection
          title="Biodiversity Assessment"
          description="Advanced AI-driven analytics for species identification, population counting, and change detection. Our drone surveys provide detailed reports and maps that support biodiversity conservation efforts."
          features={[
            'AI-powered species identification',
            'Population density estimation',
            'Change detection over time',
            'Detailed conservation reports and maps',
          ]}
          image={LIDAR_IMG}
          reversed
        />
        <ServiceSection
          title="Smart Agriculture"
          description="Optimize crop health, irrigation, and nutrient management with AI-powered drone analytics. Our targeted intervention recommendations help maximize yields while minimizing resource usage."
          features={[
            'NDVI crop health analysis',
            'Irrigation efficiency mapping',
            'Nutrient deficiency detection',
            'AI-powered targeted intervention plans',
          ]}
          image={AGRI_IMG}
        />
      </div>

      {/* Recent Field Reports */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">Mission Logs</span>
          </div>
          <h2 className="font-barlow font-bold text-3xl text-foreground mb-8">Recent Field Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                tag: 'Coastal Monitoring',
                title: 'Shoreline Erosion Survey — Lesvos Island, Greece',
                date: 'April 2025',
                excerpt: 'Multi-temporal drone survey across 18 km of coastline. Orthomosaic overlays from 2023 and 2025 quantified up to 2.4 m of shoreline retreat per year in three critical zones, informing a regional coastal management plan.',
                img: null,
              },
              {
                tag: 'Smart Agriculture',
                title: 'NDVI Crop Health Analysis — 320 ha, Thessaly Plain',
                date: 'June 2024',
                excerpt: 'Multi-spectral drone survey identified nitrogen deficiency in 12% of cultivated area. Targeted fertilisation plans generated from AI analytics, reducing total fertiliser application by 18% while maintaining yield.',
                img: null,
              },
            ].map((report, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-lg border border-border/50 bg-card/30 overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden bg-secondary/50 flex items-center justify-center">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Field Imagery Classified</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-mono font-semibold border border-primary/40 bg-primary/20 text-white rounded tracking-widest uppercase">
                    {report.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-mono text-muted-foreground mb-2">{report.date}</p>
                  <h3 className="font-barlow font-semibold text-foreground mb-3 leading-snug">{report.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{report.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner title="Elevate Your Environmental Insights" subtitle="Contact us for a consultation on environmental monitoring solutions." />
    </div>
  );
}