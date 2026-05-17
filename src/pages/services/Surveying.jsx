// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import { MEDIA } from '../../lib/media';

export default function Surveying() {
  return (
    <div>
      <ServicePageHero
        title="Aerial Surveying & Mapping"
        subtitle="High Quality | Centimetre Accuracy | Efficient. Precision aerial data collection for surveying, mapping, and 3D modeling applications."
        video={MEDIA.surveying_hero_video}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceSection
          title="2D Orthophotos & 3D Models"
          description="Using advanced photogrammetry techniques and UAV image stitching, we produce geometrically corrected orthomosaics and detailed 3D models. Our orthophotos provide true-to-scale aerial imagery that can be directly used in GIS and CAD software."
          features={[
            'Geometrically corrected orthomosaics',
            'High-resolution 3D point clouds and mesh models',
            'GIS and CAD compatible outputs',
            'Centimeter-level accuracy with GCPs',
          ]}
          image={MEDIA.surveying_section_orthophotos_image}
        />
        <ServiceSection
          title="Digital Terrain Models & LiDAR Surveys"
          description="Our LiDAR-equipped drones generate precise Digital Elevation Models (DEMs) and Digital Terrain Models (DTMs) for urban planning, flood modeling, and environmental monitoring applications."
          features={[
            'Dense point-cloud data with classification',
            'Sub-centimeter vertical accuracy',
            'Flood risk assessment and modeling',
            'Vegetation canopy analysis',
          ]}
          image={MEDIA.surveying_section_lidar_image}
          reversed
        />
        <ServiceSection
          title="Real-Time Construction Monitoring"
          description="Remote progress tracking with automated change management and error detection. Our drone surveys provide stakeholders with real-time aerial overviews of construction sites, streamlining decision-making workflows."
          features={[
            'Automated progress tracking and reporting',
            'Volume calculations for earthworks',
            'As-built vs. design comparison',
            'Stakeholder-ready visual reports',
          ]}
          image={MEDIA.surveying_section_construction_image}
        />
        <ServiceSection
          title="Remote Monitoring with AI"
          description="Leverage AI-powered anomaly detection algorithms to process aerial data in real-time. Our intelligent monitoring systems enable proactive maintenance and early warning for structural changes."
          features={[
            'AI anomaly detection algorithms',
            'Real-time data processing pipelines',
            'Proactive maintenance alerts',
            'Historical change detection',
          ]}
          image={MEDIA.surveying_section_ai_image}
          reversed
        />
      </div>

      {/* 3D Point Cloud Viewer */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-secondary/30 border-y border-border/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">Live Preview</span>
          </div>
          <h2 className="font-barlow font-bold text-3xl text-foreground mb-2">3D Point Cloud Demo</h2>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Explore a sample aerial mapping output — a fully navigable 3D point cloud generated from drone photogrammetry data over a real survey site.
          </p>
          <div className="relative rounded-lg overflow-hidden border border-border/50 bg-obsidian" style={{ paddingTop: '56.25%' }}>
            {/* Local 3D model flythrough video as primary view */}
            <video
              src={MEDIA.surveying_demo_3d_video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded bg-primary/80 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-[10px] font-mono font-semibold text-white tracking-wider uppercase">3D Point Cloud — St Catherine's Site</span>
            </div>
            <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
              {['PHOTOGRAMMETRY', 'LIDAR FUSION', '2CM ACCURACY'].map(tag => (
                <span key={tag} className="px-2 py-1 text-[9px] font-mono font-semibold border border-white/20 text-white/70 rounded bg-black/40 tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/60 font-mono">
            Outputs delivered as .LAS / .E57 point clouds, Potree web viewer, or integrated GIS layers. Contact us to request an interactive demo of your site.
          </p>
        </div>
      </motion.section>

      <CTABanner title="Need Precision Aerial Mapping?" subtitle="Contact us for a free consultation on your surveying project." />
    </div>
  );
}