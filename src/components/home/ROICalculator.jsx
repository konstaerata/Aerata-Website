// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Clock, DollarSign } from 'lucide-react';

const SECTOR_DATA = {
  solar: {
    label: 'Solar / Wind Inspection',
    traditionalDaysPerMW: 1.2,       // days per MW with traditional methods
    droneDaysPerMW: 0.18,             // days per MW with drones
    traditionalCostPerMW: 1800,       // € per MW traditional
    droneCostPerMW: 280,              // € per MW drone
    unit: 'MW of capacity',
    defaultQty: 50,
    speedupLabel: 'up to 6.5×',
  },
  oilgas: {
    label: 'Oil & Gas / Pipeline',
    traditionalDaysPerKm: 2.5,
    droneDaysPerKm: 0.35,
    traditionalCostPerKm: 4200,
    droneCostPerKm: 600,
    unit: 'km of pipeline / asset',
    defaultQty: 20,
    speedupLabel: 'up to 7×',
  },
  construction: {
    label: 'Construction / Mapping',
    traditionalDaysPerHa: 0.8,
    droneDaysPerHa: 0.08,
    traditionalCostPerHa: 950,
    droneCostPerHa: 95,
    unit: 'hectares surveyed',
    defaultQty: 100,
    speedupLabel: 'up to 10×',
  },
};

function fmt(n) {
  return new Intl.NumberFormat('en-EU', { maximumFractionDigits: 0 }).format(n);
}

export default function ROICalculator() {
  const [sector, setSector] = useState('solar');
  const [qty, setQty] = useState(SECTOR_DATA.solar.defaultQty);

  const d = SECTOR_DATA[sector];
  const qtyNum = Math.max(1, Number(qty) || 1);

  // Pick the right keys dynamically
  const perUnitKey = Object.keys(d).find(k => k.startsWith('traditionalDaysPer') && !k.includes('Cost'));
  const perUnitCostKey = Object.keys(d).find(k => k.startsWith('traditionalCostPer'));
  const droneTimeKey = Object.keys(d).find(k => k.startsWith('droneDaysPer'));
  const droneCostKey = Object.keys(d).find(k => k.startsWith('droneCostPer'));

  const tradDays = (d[perUnitKey] * qtyNum).toFixed(1);
  const droneDays = (d[droneTimeKey] * qtyNum).toFixed(1);
  const savedDays = (d[perUnitKey] * qtyNum - d[droneTimeKey] * qtyNum).toFixed(1);
  const tradCost = d[perUnitCostKey] * qtyNum;
  const droneCost = d[droneCostKey] * qtyNum;
  const savedCost = tradCost - droneCost;
  const savingPct = Math.round((savedCost / tradCost) * 100);

  const handleSectorChange = (e) => {
    const s = e.target.value;
    setSector(s);
    setQty(SECTOR_DATA[s].defaultQty);
  };

  return (
    <section className="py-20 bg-secondary/30 border-y border-border/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-px bg-primary" />
            <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">ROI Tool</span>
          </div>
          <h2 className="font-barlow font-bold text-3xl md:text-4xl text-foreground mb-2">
            Sector ROI Calculator
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            Estimate how much time and money drone operations save versus traditional inspection methods.
          </p>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="text-xs font-barlow font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Inspection Type
              </label>
              <select
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
              <label className="text-xs font-barlow font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Volume ({d.unit})
              </label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={e => setQty(e.target.value)}
                className="w-full h-11 px-4 rounded border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
              />
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Clock,
                label: 'Traditional Time',
                value: `${tradDays} days`,
                sub: 'manual methods',
                accent: false,
              },
              {
                icon: Clock,
                label: 'Drone Time',
                value: `${droneDays} days`,
                sub: d.speedupLabel + ' faster',
                accent: false,
              },
              {
                icon: TrendingDown,
                label: 'Time Saved',
                value: `${savedDays} days`,
                sub: `${savingPct}% reduction`,
                accent: true,
              },
              {
                icon: DollarSign,
                label: 'Cost Saved',
                value: `€${fmt(savedCost)}`,
                sub: `from €${fmt(tradCost)} → €${fmt(droneCost)}`,
                accent: true,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`p-5 rounded-lg border ${
                    card.accent
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-border/50 bg-card/30'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-3 ${card.accent ? 'text-primary' : 'text-muted-foreground'}`} />
                  <p className="text-xs font-barlow uppercase tracking-wider text-muted-foreground mb-1">{card.label}</p>
                  <p className={`font-barlow font-bold text-2xl mb-1 ${card.accent ? 'text-primary' : 'text-foreground'}`}>
                    {card.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-muted-foreground/60 font-mono">
            * Estimates based on industry averages. Actual savings depend on site conditions, fleet type, and scope. Contact us for a precise quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
