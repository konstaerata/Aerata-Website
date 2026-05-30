// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Clock, Shield, Zap } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';

function useCountUp(target, duration = 1200, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(target); return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active]);
  return val;
}

function StatItem({ stat, active, prefersReducedMotion, delay }) {
  const count = useCountUp(stat.value, 1200, active && !prefersReducedMotion);
  const Icon = stat.icon;
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex items-center gap-5 justify-center py-4 md:py-0"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
      </div>
      <div>
        <span className="block font-display font-bold text-4xl text-primary tracking-tight">
          {count}{stat.suffix}
        </span>
        <span className="text-sm text-foreground font-medium">{stat.label}</span>
        <span className="block text-xs text-muted-foreground mt-0.5">{stat.qualifier}</span>
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { icon: Layers, value: 1000, suffix: '+', label: t('statsBar.hectares.label'), qualifier: t('statsBar.hectares.sub') },
    { icon: Clock, value: 50, suffix: '%', label: t('statsBar.time.label'), qualifier: t('statsBar.time.sub') },
    { icon: Zap, value: 2, suffix: '.3+ GW', label: t('statsBar.energy.label'), qualifier: t('statsBar.energy.sub') },
    { icon: Shield, value: 100, suffix: '%', label: t('statsBar.pilots.label'), qualifier: t('statsBar.pilots.sub') },
  ];

  return (
    <section ref={ref} className="py-16 border-y border-border/60 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              stat={stat}
              active={inView}
              prefersReducedMotion={prefersReducedMotion}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
