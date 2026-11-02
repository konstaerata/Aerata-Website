// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, ExternalLink, Award, BookOpen, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { Reveal, Stagger, Item, MaskLines, Scramble, Magnetic, Spotlight, EASE_OUT } from '../components/motion';
import { breadcrumbSchema } from '../lib/schemas';

const POINTS = [
  { icon: Award, title: 'EU Certified', desc: 'Training aligned with EASA regulations for commercial drone operations across Europe.' },
  { icon: BookOpen, title: 'Comprehensive Curriculum', desc: 'From theory to practical flight training covering all aspects of professional drone piloting.' },
  { icon: Users, title: 'Expert Instructors', desc: 'Learn from experienced commercial pilots with thousands of flight hours.' },
];

export default function Training() {
  const reduce = useReducedMotion();

  return (
    <div>
      <SEO
        title="Drone Pilot Training & EASA Licensing — Aerata"
        description="Get EU-certified drone pilot training through Aerata's partnership with DroneLicense.eu. EASA-compliant courses from beginner to advanced commercial operations."
        path="/training"
        noindex
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Training' },
        ])}
      />
      {/* Page title — navy brand background */}
      <section className="relative pt-44 pb-32 overflow-hidden bg-navy-dark grain">
        <div aria-hidden="true" className="absolute inset-0 hud-grid" />
        <div aria-hidden="true" className="absolute -left-40 -bottom-40 w-[620px] h-[620px] rounded-full bg-lime/10 blur-3xl" />
        {!reduce && <div className="scanline z-10" aria-hidden="true" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="block w-16 h-px bg-lime origin-left"
            />
            <Scramble text="Training" className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-lime" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl mb-8">
            <MaskLines lines={['Drone Pilot', <span key="h" className="text-lime">Training & Licensing</span>]} delay={0.15} />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.27, ease: EASE_OUT }}
            className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
          >
            Get certified to fly commercially with EU-compliant drone pilot training.
            Our partnership with DroneLicense.eu provides comprehensive courses from
            beginner to advanced operations.
          </motion.p>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-28">
            {POINTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Item key={i}>
                  <Spotlight
                    tone="navy"
                    className="group h-full p-8 rounded-xl border border-border/60 bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_hsl(210_35%_12%/0.28)]"
                  >
                    <span className="relative w-14 h-14 mb-7 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center transition-colors duration-500 group-hover:bg-primary group-hover:border-primary">
                      <Icon className="w-6 h-6 text-primary transition-colors duration-500 group-hover:text-lime" aria-hidden="true" />
                    </span>
                    <h2 className="font-display font-semibold text-foreground text-xl mb-2">{item.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </Spotlight>
                </Item>
              );
            })}
          </Stagger>

          <div className="relative rounded-2xl bg-obsidian overflow-hidden px-6 py-20 text-center grain">
            <div aria-hidden="true" className="absolute inset-0 hud-grid" />
            <div className="relative">
              <Reveal>
                <span className="relative inline-flex w-20 h-20 mb-8 rounded-full border border-lime/30 items-center justify-center">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full border border-lime/20 animate-ping [animation-duration:3s] motion-reduce:hidden" />
                  <GraduationCap className="w-9 h-9 text-lime" aria-hidden="true" />
                </span>
              </Reveal>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-5 tracking-tight leading-[1.05]">
                <MaskLines lines={['Start Your Drone Career Today']} onMount={false} />
              </h2>
              <Reveal delay={0.15} className="text-steelBlue text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Visit our training partner DroneLicense.eu to explore available courses,
                schedules, and certification pathways.
              </Reveal>
              <Reveal delay={0.25}>
                <Magnetic>
                  <a href="https://www.dronelicense.eu/?ref=AERATA" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-9 py-4 font-display font-semibold text-sm tracking-wide bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-300 rounded"
                  >
                    Visit DroneLicense.eu <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </Magnetic>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
