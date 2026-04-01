// @ts-nocheck
import React from 'react';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';

const LIDAR_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/c8d2cb737_generated_7a5a50ca.png';
const CONSTRUCTION_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/38a98ba55_generated_a71edd9a.png';
const INFRA_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/04b2da82d_generated_65a9eb1f.png';
const AGRI_IMG = 'https://media.base44.com/images/public/69cc1de864505c2ecdcc6774/81b06a698_generated_69f885a6.png';

export default function Surveying() {
  return (
    <div>
      <ServicePageHero
        title="Aerial Surveying & Mapping"
        subtitle="High Quality | Centimetre Accuracy | Efficient. Precision aerial data collection for surveying, mapping, and 3D modeling applications."
        image={INFRA_IMG}
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
          image={CONSTRUCTION_IMG}
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
          image={LIDAR_IMG}
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
          image={CONSTRUCTION_IMG}
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
          image={AGRI_IMG}
          reversed
        />
      </div>

      <CTABanner title="Need Precision Aerial Mapping?" subtitle="Contact us for a free consultation on your surveying project." />
    </div>
  );
}