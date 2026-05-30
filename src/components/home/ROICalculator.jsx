// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Calculator, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';

function fmt(n) {
  return new Intl.NumberFormat('en-EU', { maximumFractionDigits: 0 }).format(n);
}

function useCountUp(target, duration = 1200, active = true) {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (!active) { setValue(target); return; }
    const start = prevTarget.current === target ? 0 : value;
    prevTarget.current = target;
    const startTime = performance.now();
    const diff = target - start;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + diff * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, active]);

  return value;
}

export default function ROICalculator() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();
  const [sector, setSector] = useState('solar');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  const SECTOR_DATA = {
    solar: {
      label: t('roi.solarLabel'),
      traditionalDaysPerMW: 0.5,
      droneDaysPerMW: 0.075,
      traditionalCostPerMW: 300,
      droneCostPerMW: 100,
      unit: t('roi.solarUnit'),
      defaultQty: 50,
      speedupLabel: 'up to 6.5×',
    },
    oilgas: {
      label: t('roi.oilgasLabel'),
      traditionalDaysPerKm: 2.5,
      droneDaysPerKm: 0.35,
      traditionalCostPerKm: 2500,
      droneCostPerKm: 450,
      unit: t('roi.oilgasUnit'),
      defaultQty: 20,
      speedupLabel: 'up to 7×',
    },
    construction: {
      label: t('roi.constructionLabel'),
      traditionalDaysPerHa: 0.8,
      droneDaysPerHa: 0.08,
      traditionalCostPerHa: 450,
      droneCostPerHa: 65,
      unit: t('roi.constructionUnit'),
      defaultQty: 100,
      speedupLabel: 'up to 10×',
    },
  };

  const [qty, setQty] = useState(SECTOR_DATA[sector].defaultQty);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const d = SECTOR_DATA[sector];
  const qtyNum = Math.max(1, Number(qty) || 1);

  const perUnitKey = Object.keys(d).find(k => k.startsWith('traditionalDaysPer') && !k.includes('Cost'));
  const perUnitCostKey = Object.keys(d).find(k => k.startsWith('traditionalCostPer'));
  const droneTimeKey = Object.keys(d).find(k => k.startsWith('droneDaysPer'));
  const droneCostKey = Object.keys(d).find(k => k.startsWith('droneCostPer'));

  const tradDays = parseFloat((d[perUnitKey] * qtyNum).toFixed(1));
  const droneDays = parseFloat((d[droneTimeKey] * qtyNum).toFixed(1));
  const savedDays = parseFloat((tradDays - droneDays).toFixed(1));
  const tradCost = d[perUnitCostKey] * qtyNum;
  const droneCost = d[droneCostKey] * qtyNum;
  const savedCost = tradCost - droneCost;
  const savingPct = Math.round((savedCost / tradCost) * 100);

  const animatedSavedCost = useCountUp(savedCost, 900, inView && !prefersReducedMotion);

  const handleSectorChange = (e) => {
    const s = e.target.value;
    setSector(s);
    setQty(SECTOR_DATA[s].defaultQty);
  };

  return (
    <section ref={ref} className="py-20 bg-secondary/30 border-y border-border/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">{t('roi.label')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            {t('roi.title')}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            {t('roi.description')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div>
              <label htmlFor="roi-sector" className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                {t('roi.inspectionType')}
              </label>
              <select
                id="roi-sector"
                value={sector}
                onChange={handleSectorChange}
                className="w-full h-11 px-4 rounded border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
              >
                {Object.entries(SECTOR_DATA).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="roi-volume" className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                {t('roi.volume')} ({d.unit})
              </label>
              <input
                id="roi-volume"
                type="number"
                min="1"
                value={qty}
                onChange={e => setQty(e.target.value)}
                className="w-full h-11 px-4 rounded border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: t('roi.traditionalTime'), value: `${tradDays} ${t('common.days')}`, sub: t('roi.manualMethods'), accent: false },
              { icon: Clock, label: t('roi.droneTime'), value: `${droneDays} ${t('common.days')}`, sub: `${d.speedupLabel} ${t('roi.faster')}`, accent: false },
              { icon: TrendingDown, label: t('roi.timeSaved'), value: `${savedDays} ${t('common.days')}`, sub: `${savingPct}% ${t('roi.reduction')}`, accent: true },
              { icon: DollarSign, label: t('roi.costSaved'), value: `€${fmt(animatedSavedCost)}`, sub: `from €${fmt(tradCost)} → €${fmt(droneCost)}`, accent: true },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
                  className={`p-5 rounded-lg border ${
                    card.accent
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/50 bg-card/30'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-3 ${card.accent ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                  <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-1">{card.label}</p>
                  <p className={`font-display font-bold text-2xl mb-1 ${card.accent ? 'text-primary' : 'text-foreground'}`}>
                    {card.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/contact?source=roi-calculator"
              className="inline-flex items-center justify-center px-7 py-3.5 font-display font-semibold text-sm tracking-wider uppercase bg-lime text-white hover:bg-lime/90 transition-all duration-300 rounded glow-pulse"
            >
              {t('roi.requestBtn')}
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('roi.or')}{' '}
              <Link to="/about#projects" className="underline underline-offset-2 text-primary hover:text-primary/80 transition-colors">
                {t('roi.viewResults')}
              </Link>
            </p>
          </div>

          <p className="mt-5 text-xs text-muted-foreground/70 font-mono">
            {t('roi.disclaimer')}{' '}
            <Link to="/contact" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
              {t('roi.contactUs')}
            </Link>{' '}
            {t('roi.forQuote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
