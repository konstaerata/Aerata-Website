// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Clock, Shield, Zap } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';
import { Stagger, Item, CountUp, EASE_OUT } from '../motion';

const VIEWPORT = { once: true, margin: '0px 0px -6% 0px' };

function StatItem({ stat, index }) {
  const reduce = useReducedMotion();
  const Icon = stat.icon;
  return (
    <Item className="relative px-4 sm:px-6 lg:px-10 py-9 lg:py-14 group">
      {/* Dividers draw in: 4-up on desktop, 2x2 on mobile */}
      {index > 0 && (
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.59, delay: 0.12 + index * 0.06, ease: EASE_OUT }}
          className={`absolute left-0 top-8 bottom-8 w-px bg-white/10 origin-top ${index % 2 ? 'block' : 'hidden md:block'}`}
        />
      )}
      {index > 1 && (
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.59, ease: EASE_OUT }}
          className="md:hidden absolute top-0 left-4 right-4 h-px bg-white/10 origin-left"
        />
      )}
      <div className="flex items-center gap-3 mb-6">
        <span className="relative w-10 h-10 rounded-lg border border-lime/25 bg-lime/5 flex items-center justify-center transition-colors duration-500 group-hover:border-lime/60 group-hover:bg-lime/10">
          <Icon className="w-[18px] h-[18px] text-lime" aria-hidden="true" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/35 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none mb-4">
        <CountUp value={`${stat.value}${stat.suffix}`} duration={1.8} />
      </p>
      <p className="text-sm font-medium text-white/90 mb-1">{stat.label}</p>
      <p className="text-xs text-steelBlue/70">{stat.qualifier}</p>
    </Item>
  );
}

export default function StatsBar() {
  const { t } = useLang();

  const stats = [
    { icon: Layers, value: 1000, suffix: '+', label: t('statsBar.hectares.label'), qualifier: t('statsBar.hectares.sub') },
    { icon: Clock, value: 50, suffix: '%', label: t('statsBar.time.label'), qualifier: t('statsBar.time.sub') },
    { icon: Zap, value: 2, suffix: '.3+ GW', label: t('statsBar.energy.label'), qualifier: t('statsBar.energy.sub') },
    { icon: Shield, value: 100, suffix: '%', label: t('statsBar.pilots.label'), qualifier: t('statsBar.pilots.sub') },
  ];

  return (
    <section className="relative bg-obsidian overflow-hidden grain border-t border-white/5">
      <div aria-hidden="true" className="absolute inset-0 hud-grid" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stagger gap={0.1} className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
