// @ts-nocheck
import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, FileText } from 'lucide-react';
import ServicePageHero from '../../components/shared/ServicePageHero';
import ServiceSection from '../../components/shared/ServiceSection';
import CTABanner from '../../components/shared/CTABanner';
import { MEDIA } from '../../lib/media';

function ThermalSlider() {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (e.buttons !== 1) return;
    updatePos(e.clientX);
  }, [updatePos]);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    updatePos(e.touches[0].clientX);
  }, [updatePos]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-primary" />
          <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">Thermal Imaging</span>
        </div>
        <h2 className="font-barlow font-bold text-3xl text-foreground mb-2">Standard vs. Thermal View</h2>
        <p className="text-muted-foreground mb-8 max-w-xl">
          Drag the divider to compare a standard RGB drone image against thermal imaging, revealing hidden hot spots invisible to the naked eye.
        </p>

        {/* Slider container */}
        <div
          ref={trackRef}
          className="relative w-full aspect-[16/7] max-h-[480px] rounded-lg overflow-hidden border border-border/50 cursor-col-resize select-none"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onTouchStart={(e) => updatePos(e.touches[0].clientX)}
          onMouseDown={(e) => updatePos(e.clientX)}
        >
          {/* AFTER — Thermal (CSS filter simulates thermal palette on same image) */}
          <div className="absolute inset-0">
            <img
              src={MEDIA.solar}
              alt="Thermal view"
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(0) sepia(1) hue-rotate(300deg) saturate(4) brightness(0.85) contrast(1.3)' }}
              draggable={false}
            />
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-[10px] font-mono font-semibold bg-orange-500/80 text-white tracking-wider">
              THERMAL IR
            </div>
          </div>

          {/* BEFORE — Standard RGB clipped by slider position */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={MEDIA.solar}
              alt="Standard view"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute bottom-3 left-3 px-2 py-1 rounded text-[10px] font-mono font-semibold bg-primary/80 text-white tracking-wider">
              STANDARD RGB
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none"
            style={{ left: `${pos}%` }}
          />
          {/* Drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-primary flex items-center justify-center pointer-events-none shadow-lg"
            style={{ left: `${pos}%` }}
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-primary">
              <path d="M6 10H14M6 10L3 7M6 10L3 13M14 10L17 7M14 10L17 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground/60 font-mono">
          Thermal anomalies indicate degraded cells, soiling, and connection faults — identified remotely at scale.
        </p>
      </div>
    </motion.section>
  );
}


const trustPoints = [
  { icon: Shield, title: 'Advanced Technology', desc: 'Enterprise DJI platforms with thermal and multi-spectral sensors.' },
  { icon: Zap, title: 'Unmatched Expertise', desc: 'Certified pilots with deep renewable energy sector experience.' },
  { icon: FileText, title: 'Actionable Reports', desc: 'Comprehensive inspection reports with prioritized recommendations.' },
];

export default function RenewableEnergy() {
  return (
    <div>
      <ServicePageHero
        title="Renewable Energy Inspections"
        subtitle="Maximize efficiency, minimize downtime, and ensure safety. Unlock the power of your renewable energy assets."
        image={MEDIA.solarPanel}
        ctaText="Get a Free Consultation Now"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceSection
          title="Solar Panel Inspections"
          description="Our thermal imaging drone inspections detect hot spots, cell damage, vegetation encroachment, and panel misalignment with up to 50% reduction in cost and inspection time. Each inspection delivers comprehensive reports with actionable insights."
          features={[
            'Thermal hot spot detection and classification',
            'Cell-level damage identification',
            'Vegetation encroachment monitoring',
            'Panel alignment and soiling analysis',
            'Up to 50% reduction in inspection cost and time',
          ]}
          image={MEDIA.solarPanel}
        />
        <ServiceSection
          title="Wind Turbine Inspections"
          description="Advanced drone technology for comprehensive wind turbine inspections, detecting blade damage, structural issues, and lightning strike impacts. In collaboration with Sulzer Schmid Laboratories AG using 3DX technology for proactive maintenance."
          features={[
            'Blade surface defect detection',
            'Lightning strike damage assessment',
            'Structural integrity analysis',
            '3DX technology in collaboration with Sulzer Schmid',
            'Proactive maintenance recommendations',
          ]}
          image={MEDIA.windTurbine}
          reversed
        />
      </div>

      <ThermalSlider />

      {/* Trust Section */}
      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-barlow font-bold text-3xl text-center text-foreground mb-12">
            Advanced Technology, Unmatched Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((tp, i) => {
              const Icon = tp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center p-8 rounded-lg border border-border/50 bg-card/30"
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-barlow font-semibold text-foreground mb-2">{tp.title}</h3>
                  <p className="text-sm text-muted-foreground">{tp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner title="Get a Free Consultation Now" subtitle="Discover how drone inspections can optimize your renewable energy assets." />
    </div>
  );
}