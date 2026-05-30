// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLang } from '../../lib/LanguageContext';

const partners = [
  { name: 'iSOLAR',                         relationship: 'Solar farm maintenance company' },
  { name: 'Voltalia',                        relationship: 'Renewable energy producer' },
  { name: 'EDF Renewables',                 relationship: 'Global energy company' },
  { name: 'Sulzer Schmid Laboratories AG',   relationship: 'Wind turbine inspection technology' },
  { name: 'VITO',                            relationship: 'Flemish research institute' },
  { name: 'EYDAP',                           relationship: 'Water utility provider' },
  { name: 'Sitemark',                        relationship: 'Solar construction management platform' },
  { name: 'Elicas Group',                    relationship: 'Wind energy developer' },
  { name: 'Sunel',                           relationship: 'Solar energy company' },
  { name: 'ABO WIND',                        relationship: 'Renewable energy developer' },
  { name: 'HELIKA S.A.',                     relationship: 'Renewable energy construction & development' },
  { name: 'VALOREM',                         relationship: 'Renewable energy developer' },
  { name: 'STR Power Group',                 relationship: 'Solar EPC contractor' },
  { name: 'DJI Enterprise',                  relationship: 'Drone technology manufacturer' },
];

const ITEM_W = 176;
const INTERVAL = 3800;

export default function PartnersSection() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();
  const containerRef = useRef(null);
  const nextId = useRef(3);
  const [slotW, setSlotW] = useState(280);

  const [items, setItems] = useState(() => [
    { id: 0, pi: 0 },
    { id: 1, pi: 1 },
    { id: 2, pi: 2 },
  ]);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setSlotW(Math.min(300, Math.max(150, w / 3.4)));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const advance = useCallback(() => {
    setItems(prev => {
      const nextPi = (prev[prev.length - 1].pi + 1) % partners.length;
      return [...prev.slice(1), { id: nextId.current++, pi: nextPi }];
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance, prefersReducedMotion]);

  const getX = (slot) => -(ITEM_W / 2) + (slot - 1) * slotW;

  return (
    <section className="relative py-14 overflow-hidden border-y border-border/40" style={{ backgroundColor: 'hsl(210, 22%, 96%)' }}>
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, hsl(88, 48%, 52%) 40%, hsl(88, 48%, 52%) 60%, transparent)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(31,50,65,0.10) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex-1 max-w-[140px] h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(31,50,65,0.2))' }} />
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(88, 48%, 52%)' }} />
            <p className="text-[11px] font-display font-bold tracking-[0.3em] uppercase" style={{ color: 'hsl(200, 38%, 28%)' }}>
              {t('partners.label')}
            </p>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'hsl(88, 48%, 52%)' }} />
          </div>
          <div className="flex-1 max-w-[140px] h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(31,50,65,0.2))' }} />
        </div>

        <div className="relative">
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-60 rounded-2xl pointer-events-none"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 2px 20px rgba(31,50,65,0.08)',
              border: '1px solid rgba(31,50,65,0.08)',
            }}
          />
          <div
            className="absolute inset-y-0 left-0 w-28 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, hsl(210, 22%, 96%), transparent)' }}
          />
          <div
            className="absolute inset-y-0 right-0 w-28 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to left, hsl(210, 22%, 96%), transparent)' }}
          />

          <div ref={containerRef} className="relative h-[84px] overflow-hidden">
            <AnimatePresence initial={false}>
              {items.map(({ id, pi }, slot) => {
                const partner = partners[pi];
                const isCenter = slot === 1;
                return (
                  <motion.div
                    key={id}
                    className="absolute top-0 left-1/2 w-44 text-center flex flex-col items-center justify-center h-full px-3"
                    initial={{ x: getX(3), opacity: 0 }}
                    animate={{ x: getX(slot), opacity: isCenter ? 1 : 0.28 }}
                    exit={{ x: getX(-1), opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span
                      className="block font-display font-semibold tracking-wide leading-tight transition-all duration-500"
                      style={{
                        fontSize: isCenter ? '15px' : '13px',
                        color: isCenter ? 'hsl(200, 38%, 22%)' : 'hsl(200, 38%, 40%)',
                      }}
                    >
                      {partner.name}
                    </span>
                    <span
                      className="block text-[11px] mt-1 font-display transition-all duration-500"
                      style={{
                        color: 'hsl(200, 20%, 50%)',
                        opacity: isCenter ? 1 : 0,
                      }}
                    >
                      {partner.relationship}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <p
          className="text-center text-[10px] font-display font-semibold tracking-[0.25em] uppercase mt-8"
          style={{ color: 'hsl(200, 38%, 55%)' }}
        >
          {partners.length} {t('partners.count')}
        </p>
      </div>
    </section>
  );
}
