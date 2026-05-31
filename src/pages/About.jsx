// @ts-nocheck
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/shared/SectionHeading';
import { MEDIA } from '../lib/media';
import { useLang } from '../lib/LanguageContext';

const partners = [
  { name: 'iSOLAR',                        sector: 'Solar Energy',          rel: 'Solar farm maintenance company' },
  { name: 'Voltalia',                       sector: 'Renewable Energy',      rel: 'Renewable energy producer' },
  { name: 'EDF Renewables',                sector: 'Renewable Energy',      rel: 'Global energy company' },
  { name: 'Sulzer Schmid Laboratories AG',  sector: 'Wind Energy',           rel: 'Wind turbine inspection technology' },
  { name: 'VITO',                           sector: 'Research',              rel: 'Flemish research institute' },
  { name: 'EYDAP',                          sector: 'Water Infrastructure',  rel: 'Water utility provider' },
  { name: 'Sitemark',                       sector: 'Platform Partner',      rel: 'Solar construction management platform' },
  { name: 'Elicas Group',                   sector: 'Wind Energy',           rel: 'Wind energy developer' },
  { name: 'Sunel',                          sector: 'Solar Energy',          rel: 'Solar energy company' },
  { name: 'ABO WIND',                       sector: 'Wind & Solar',          rel: 'Renewable energy developer' },
  { name: 'Metlen',                          sector: 'Renewable Energy',      rel: 'Renewable energy company' },
  { name: 'VALOREM',                        sector: 'Renewable Energy',      rel: 'Renewable energy developer' },
  { name: 'STR Power Group',               sector: 'Solar Energy',          rel: 'Solar EPC contractor' },
  { name: 'Embiria Consultancy',            sector: 'Construction',          rel: 'Engineering consultancy' },
  { name: 'DJI Enterprise',                sector: 'Technology',            rel: 'Drone technology manufacturer' },
];

const INTERVAL = 4500;

const team = [
  { name: 'Konstantinos Konstantinopoulos', role: 'Co-Founder',             photo: null, linkedin: 'https://www.linkedin.com/in/konstantinos-konstantinopoulos-92067a28a/' },
  { name: 'Michalis Michalas',              role: 'Research & Development', photo: null, linkedin: 'https://www.linkedin.com/in/michalis-michalas-b37aa3177/' },
  { name: 'Spyridon Konstantinopoulos',     role: 'Founder',                photo: null, linkedin: 'https://www.linkedin.com/in/spyridon-konstantinopoulos-195ab734/' },
  { name: 'Markos Foros',                   role: 'Client Relations',       photo: null, linkedin: 'https://www.linkedin.com/in/markosforos/' },
  { name: 'Spyros Karapanagiotis',          role: 'Compliance',             photo: null, linkedin: 'https://www.linkedin.com/in/spiros-karapanagiotis-640695412/' },
  { name: 'Alexandros Lapokonstantakis',    role: 'Operations',             photo: null, linkedin: null },
];

function PartnersCarousel({ prefersReducedMotion, light = false }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const advance = useCallback((next) => {
    setIndex(i => next !== undefined ? next : (i + 1) % partners.length);
    setProgress(0);
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    startTimeRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(elapsed / INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        setIndex(i => (i + 1) % partners.length);
        setProgress(0);
        startTimeRef.current = performance.now();
        progressRef.current = requestAnimationFrame(tick);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [prefersReducedMotion]);

  const partner = partners[index];
  const pad = (n) => String(n + 1).padStart(2, '0');

  const nameColor      = light ? 'hsl(200,38%,20%)'           : '#ffffff';
  const descColor      = light ? 'hsl(210,20%,45%)'           : 'rgba(154,168,162,0.75)';
  const counterColor   = light ? 'hsl(210,20%,65%)'           : 'rgba(154,168,162,0.4)';
  const trackColor     = light ? 'rgba(31,50,65,0.1)'         : 'rgba(255,255,255,0.08)';
  const dotInactiveColor = light ? 'rgba(31,50,65,0.15)'      : 'rgba(255,255,255,0.15)';

  return (
    <div className="relative">
      <div className="relative min-h-[220px] flex flex-col items-center justify-center text-center px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center"
          >
            <span
              className="inline-block px-3 py-1 text-[10px] font-display font-bold tracking-[0.25em] uppercase rounded mb-5"
              style={{
                color: 'hsl(88,48%,52%)',
                border: '1px solid hsl(88,48%,52%,0.3)',
                backgroundColor: 'hsl(88,48%,52%,0.08)',
              }}
            >
              {partner.sector}
            </span>
            <h3
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', letterSpacing: '-0.01em', lineHeight: 1.1, color: nameColor }}
            >
              {partner.name}
            </h3>
            <p className="text-sm max-w-sm" style={{ color: descColor }}>
              {partner.rel}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-5 px-6 pb-6">
        <span className="font-display text-xs tabular-nums shrink-0" style={{ color: counterColor }}>
          {pad(index)} / {pad(partners.length - 1)}
        </span>
        <div className="flex-1 h-px rounded-full overflow-hidden" style={{ backgroundColor: trackColor }}>
          <motion.div
            className="h-full rounded-full origin-left"
            style={{ backgroundColor: 'hsl(88,48%,52%)', scaleX: progress }}
          />
        </div>
        <div className="flex gap-1.5 shrink-0">
          {partners.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i)}
              className="rounded-full transition-all duration-300 focus:outline-none"
              style={{
                width: i === index ? '16px' : '5px',
                height: '5px',
                backgroundColor: i === index ? 'hsl(88,48%,52%)' : dotInactiveColor,
              }}
              aria-label={`Go to partner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  return (
    <div>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <video
            src={MEDIA.about_hero_image}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2025] via-[#1B2025]/85 to-[#1B2025]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2025]/60 via-transparent to-[#1B2025]/30" />
        </div>
        <div aria-hidden="true" className="absolute top-24 left-6 md:left-12 w-10 h-10 border-l-2 border-t-2 border-lime/30" />
        <div aria-hidden="true" className="absolute bottom-8 right-6 md:right-12 w-10 h-10 border-r-2 border-b-2 border-lime/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-lime" />
              <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-lime">{t('about.badge')}</span>
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl mb-8">
              {t('about.title')}<br />
              <span className="text-lime">{t('about.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-[#9AA8A2] leading-relaxed max-w-2xl">
              {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('about.trustedBy')}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                {t('about.clientsTitle')}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
                {t('about.clientsDesc')}
              </p>
            </div>
            <span className="text-muted-foreground/50 font-display text-sm shrink-0">
              {partners.length} {t('partners.count')}
            </span>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-card/60">
            <PartnersCarousel prefersReducedMotion={prefersReducedMotion} light />
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={t('about.teamLabel')}
            title={t('about.teamTitle')}
            description={t('about.teamDesc')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => {
              const inner = (
                <>
                  <div className="w-14 h-14 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 overflow-hidden">
                    {member.photo
                      ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      : <span className="font-display font-bold text-lg text-primary/60">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-semibold text-foreground text-sm leading-snug">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
                  </div>
                  {member.linkedin && (
                    <svg className="w-4 h-4 text-primary/30 group-hover:text-primary/70 transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                </>
              );

              return (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? false : { opacity: 0.3, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.3), ease: 'easeOut' }}
                  whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
                >
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/40 hover:bg-card transition-colors duration-200 cursor-pointer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/50">
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
