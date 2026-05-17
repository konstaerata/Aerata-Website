// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Clock, DollarSign } from 'lucide-react';

// Sources: thefuture3d.com, thedronelifenj.com, structionsolutions.com, robota.us, datumate.com
const SECTOR_DATA = {
  solar: {
    label: 'Solar / Wind Inspection',
    // Traditional: 2-person crew covers 1–2 MW/day (25 hrs/MW at €32–35/hr, Aerospec benchmark)
    // Drone: 50–100 MW/day thermal coverage (DJI Matrice 350 RTK, industry standard)
    traditionalDaysPerMW: 0.6,       // ~30 days for 50 MW
    droneDaysPerMW: 0.02,            // ~1 day for 50 MW
    traditionalCostPerMW: 900,       // ~€900/MW total (labour + equipment + overhead)
    droneCostPerMW: 320,             // ~€320/MW (mid-range of $300–$500/MW industry quotes)
    unit: 'MW of capacity',
    defaultQty: 50,
    speedupLabel: 'up to 30×',
  },
  oilgas: {
    label: 'Oil & Gas / Pipeline',
    // Traditional ground patrol: ~7 km/day (Texas case study: 80 km in 12 days)
    // Drone: ~40 km/day (same Texas study: 80 km in 2 days)
    traditionalDaysPerKm: 0.15,      // ~3 days for 20 km
    droneDaysPerKm: 0.025,           // ~0.5 day for 20 km
    traditionalCostPerKm: 800,       // ~€800/km (crew $2,000–$3,000/day, equipment, vehicles, safety)
    droneCostPerKm: 250,             // ~€250/km (2-person team, $500–$800/day operational)
    unit: 'km of pipeline / asset',
    defaultQty: 20,
    speedupLabel: 'up to 6×',
  },
  construction: {
    label: 'Construction / Mapping',
    // Traditional RTK/total-station crew: ~8 ha/day (industry: "10 acres/day" benchmark)
    // Drone photogrammetry: 100+ ha in under an hour (40× faster per industry sources)
    traditionalDaysPerHa: 0.12,      // ~12 days for 100 ha
    droneDaysPerHa: 0.003,           // ~0.3 days (~2–3 hrs) for 100 ha
    traditionalCostPerHa: 300,       // ~€300/ha (survey crew; traditional avg ~$517/acre)
    droneCostPerHa: 30,              // ~€30/ha (photogrammetry incl. processing; $5–$120/acre range)
    unit: 'hectares surveyed',
    defaultQty: 100,
    speedupLabel: 'up to 40×',
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
