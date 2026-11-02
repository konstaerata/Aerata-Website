// @ts-nocheck
import React, { useState, useEffect, useRef, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useLocalePath } from '@/components/LocalizedLink';
import { motion, AnimatePresence, useReducedMotion, animate } from 'framer-motion';
import { TrendingDown, Clock, ArrowRight, ArrowLeft, Sun, Zap, Building2, Check, MapPin } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';
import SectionHeading from '../shared/SectionHeading';
import en from '../../locales/en.json';
import { Reveal, Magnetic, EASE_OUT } from '../motion';

function fmt(n) {
  return new Intl.NumberFormat('en-EU', { maximumFractionDigits: 0 }).format(n);
}

// Tweens the displayed number from whatever is currently shown to the new
// value, writing straight to the DOM so typing never re-renders per frame.
function AnimatedNumber({ value, format, active }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const shown = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) { shown.current = value; node.textContent = format(value); return; }
    if (!active) return;
    const controls = animate(shown.current, value, {
      duration: 0.59,
      ease: EASE_OUT,
      onUpdate: (v) => { shown.current = v; node.textContent = format(v); },
    });
    return () => controls.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, active, reduce]);

  return <span ref={ref} className="tabular-nums">{format(reduce ? value : 0)}</span>;
}

const fmtDays = (v) => String(parseFloat(v.toFixed(1)));

/**
 * Wraps t() so keys from a namespace a language doesn't have yet (the new
 * quote.* strings, English-only for now) fall back to English instead of
 * rendering the raw key.
 */
export function withEnglishFallback(t) {
  return (key) => {
    const v = t(key);
    if (v !== key) return v;
    return key.split('.').reduce((o, p) => (o == null ? o : o[p]), en) ?? key;
  };
}

const SECTOR_ICONS = { solar: Sun, oilgas: Zap, construction: Building2 };
const TIMINGS = ['2w', 'month', 'quarter', 'exploring'];
const TIMING_KEYS = { '2w': 'quote.timing2w', month: 'quote.timingMonth', quarter: 'quote.timingQuarter', exploring: 'quote.timingExploring' };
const STEP_KEYS = ['quote.stepSector', 'quote.stepSize', 'quote.stepTiming'];

/** Same savings model the calculator shows; shared with the Contact plan card. */
export function computeSavings(data, qty) {
  const qtyNum = Math.max(1, Number(qty) || 1);
  const pick = (prefix) => data[Object.keys(data).find((k) => k.startsWith(prefix))];
  const tradDays = parseFloat((pick('traditionalDaysPer') * qtyNum).toFixed(1));
  const droneDays = parseFloat((pick('droneDaysPer') * qtyNum).toFixed(1));
  const tradCost = pick('traditionalCostPer') * qtyNum;
  const droneCost = pick('droneCostPer') * qtyNum;
  return {
    tradDays, droneDays,
    savedDays: parseFloat((tradDays - droneDays).toFixed(1)),
    tradCost, droneCost,
    savedCost: tradCost - droneCost,
    savingPct: Math.round(((tradCost - droneCost) / tradCost) * 100),
  };
}

/** Per-sector rates. Labels/units come from the existing roi.* copy. */
export function getSectorData(t) {
  return {
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
}

export { TIMING_KEYS };

// Direction-aware step slide: forward enters from the right, back from the left.
const stepVariants = (reduce) => ({
  enter: (dir) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * 36 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * -36 }),
});

// In the side panel the planner renders without scroll reveals.
function Block({ panel, delay, className, children }) {
  return panel ? <div className={className}>{children}</div> : <Reveal delay={delay} className={className}>{children}</Reveal>;
}

/**
 * layout="section" — the Home page section (heading, two columns, CTA row).
 * layout="panel"   — the same planner stacked for the site-wide side panel
 *                    (PlanDock): result on top, planner below, no heading.
 */
export default function ROICalculator({ layout = 'section', onSubmit }) {
  const panel = layout === 'panel';
  const uid = useId();
  const prefersReducedMotion = useReducedMotion();
  const { t: rawT } = useLang();
  const t = withEnglishFallback(rawT);
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const [sector, setSector] = useState('solar');
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [timing, setTiming] = useState('');
  const [location, setLocation] = useState('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const panelRef = useRef(null);

  const SECTOR_DATA = getSectorData(t);
  const [qty, setQty] = useState(SECTOR_DATA[sector].defaultQty);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const d = SECTOR_DATA[sector];
  const { tradDays, droneDays, savedDays, tradCost, droneCost, savedCost, savingPct } = computeSavings(d, qty);

  const chooseSector = (s) => {
    setSector(s);
    setQty(SECTOR_DATA[s].defaultQty);
  };

  const goTo = (next) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  // Move focus to the new step's panel so keyboard and screen-reader users
  // land on the content that just changed.
  useEffect(() => {
    if (panelRef.current && document.activeElement && ref.current?.contains(document.activeElement)) {
      panelRef.current.focus({ preventScroll: true });
    }
  }, [step]);

  const planQuery = () => {
    const p = new URLSearchParams({ source: 'quote-builder', sector, qty: String(Math.max(1, Number(qty) || 1)) });
    if (timing) p.set('timing', timing);
    if (location.trim()) p.set('location', location.trim());
    return p.toString();
  };
  const submitPlan = () => { onSubmit?.(); navigate(localePath(`/contact?${planQuery()}`)); };

  const active = inView && !prefersReducedMotion;
  const daysUnit = ` ${t('common.days')}`;
  const results = [
    { icon: Clock, label: t('roi.traditionalTime'), value: tradDays, format: (v) => `${fmtDays(v)}${daysUnit}`, sub: t('roi.manualMethods') },
    { icon: Clock, label: t('roi.droneTime'), value: droneDays, format: (v) => `${fmtDays(v)}${daysUnit}`, sub: `${d.speedupLabel} ${t('roi.faster')}` },
    { icon: TrendingDown, label: t('roi.timeSaved'), value: savedDays, format: (v) => `${fmtDays(v)}${daysUnit}`, sub: `${savingPct}% ${t('roi.reduction')}` },
  ];

  const fieldClass = 'w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground text-sm font-medium transition-[border-color,box-shadow] duration-300 hover:border-primary/40 focus:outline-none focus:border-lime focus:ring-4 focus:ring-lime/15';
  const promptClass = 'font-display font-semibold text-lg text-foreground mb-4';
  const choiceClass = (selected) =>
    `relative w-full text-left rounded-xl border px-4 py-3.5 transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/30 ${
      selected ? 'border-lime bg-lime/10' : 'border-border/70 bg-background/60 hover:border-primary/40 hover:bg-background'
    }`;

  const variants = stepVariants(prefersReducedMotion);

  return (
    <Shell panel={panel} ref={ref}>
        {!panel && <SectionHeading label={t('roi.label')} title={t('roi.title')} description={t('roi.description')} align="left" />}

        <div className={panel ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 lg:grid-cols-12 gap-5'}>
          {/* 3-step planner */}
          <Block panel={panel} className={panel ? 'order-2' : 'lg:col-span-5'}>
            <div className={`h-full rounded-2xl border border-border/70 bg-card flex flex-col ${panel ? 'p-5' : 'p-7 lg:p-8 shadow-[0_20px_40px_-28px_hsl(210_35%_12%/0.3)]'}`}>
              {/* HUD progress */}
              <nav aria-label={t('roi.title')} className="mb-7">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground tabular-nums">
                    {t('quote.step')} {String(step + 1).padStart(2, '0')} {t('quote.of')} 03
                  </p>
                  <p className="text-xs font-display font-semibold uppercase tracking-wider text-primary">{t(STEP_KEYS[step])}</p>
                </div>
                <ol className="grid grid-cols-3 gap-2">
                  {STEP_KEYS.map((key, i) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={i === step ? 'step' : undefined}
                        aria-label={`${t('quote.step')} ${i + 1}: ${t(key)}`}
                        className="group block w-full py-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/30 rounded"
                      >
                        <span className="block h-1 rounded-full bg-border overflow-hidden">
                          <motion.span
                            className="block h-full bg-lime origin-left rounded-full"
                            initial={false}
                            animate={{ scaleX: i <= step ? 1 : 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: EASE_OUT }}
                          />
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>

              <div
                ref={panelRef}
                tabIndex={-1}
                aria-live="polite"
                className="relative flex-1 overflow-hidden -mx-1 px-1 focus:outline-none"
              >
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {step === 0 && (
                      <fieldset>
                        <legend className={promptClass}>{t('quote.sectorPrompt')}</legend>
                        <div className="grid gap-3" role="radiogroup" aria-label={t('roi.inspectionType')}>
                          {Object.entries(SECTOR_DATA).map(([key, val]) => {
                            const Icon = SECTOR_ICONS[key];
                            const selected = sector === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => chooseSector(key)}
                                className={`${choiceClass(selected)} flex items-center gap-4 py-4`}
                              >
                                <span className={`w-11 h-11 shrink-0 rounded-lg flex items-center justify-center border transition-colors duration-200 ${selected ? 'bg-lime border-lime text-obsidian' : 'bg-primary/5 border-primary/15 text-primary'}`}>
                                  <Icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block font-display font-semibold text-foreground">{val.label}</span>
                                  <span className="block text-xs text-muted-foreground mt-0.5">{val.unit}</span>
                                </span>
                                {selected && <Check className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    )}

                    {step === 1 && (
                      <div className="flex flex-col gap-6">
                        <div>
                          <p className={promptClass}>{t('quote.sizePrompt')}</p>
                          <label htmlFor={`${uid}-volume`} className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 block">
                            {t('roi.volume')} ({d.unit})
                          </label>
                          <input id={`${uid}-volume`} type="number" min="1" inputMode="numeric" value={qty} onChange={e => setQty(e.target.value)} className={`${fieldClass} font-mono tabular-nums`} />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {results.map((card, i) => {
                            const Icon = card.icon;
                            return (
                              <div key={i} className={`flex items-center gap-4 rounded-xl px-4 py-3.5 border ${i === 2 ? 'border-primary/30 bg-primary/5' : 'border-border/60 bg-background/60'}`}>
                                <Icon className={`w-[18px] h-[18px] shrink-0 ${i === 2 ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[11px] font-display uppercase tracking-wider text-muted-foreground">{card.label}</p>
                                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                                </div>
                                <p className={`font-display font-bold text-xl whitespace-nowrap ${i === 2 ? 'text-primary' : 'text-foreground'}`}>
                                  <AnimatedNumber value={card.value} format={card.format} active={active} />
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-6">
                        <fieldset>
                          <legend className={promptClass}>{t('quote.timingPrompt')}</legend>
                          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('quote.stepTiming')}>
                            {TIMINGS.map((key) => (
                              <button
                                key={key}
                                type="button"
                                role="radio"
                                aria-checked={timing === key}
                                onClick={() => setTiming(key)}
                                className={`${choiceClass(timing === key)} text-sm font-display font-semibold text-foreground text-center`}
                              >
                                {t(TIMING_KEYS[key])}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                        <div>
                          <label htmlFor={`${uid}-location`} className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 block">
                            {t('quote.location')}
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                            <input
                              id={`${uid}-location`}
                              type="text"
                              autoComplete="country-name"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder={t('quote.locationPlaceholder')}
                              className={`${fieldClass} pl-11`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Back / Next */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-7 pt-6 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-lg text-sm font-display font-semibold text-primary transition-[opacity,background-color] duration-200 hover:bg-primary/5 disabled:opacity-0 disabled:pointer-events-none focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/30"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {t('quote.back')}
                </button>
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => goTo(step + 1)}
                    className="group inline-flex items-center gap-2 h-11 px-5 rounded-lg text-sm font-display font-semibold bg-primary text-white transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/40"
                  >
                    {t('quote.next')}: {t(STEP_KEYS[step + 1])}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitPlan}
                    className="group ml-auto inline-flex items-center justify-center gap-2 h-11 px-5 whitespace-nowrap rounded-lg text-sm font-display font-semibold bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-lime/40"
                  >
                    {t('roi.requestBtn')}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </Block>

          {/* Headline result — live across all steps */}
          <Block panel={panel} delay={0.12} className={panel ? 'order-1' : 'lg:col-span-7'}>
            <div className={`relative h-full rounded-2xl bg-obsidian overflow-hidden grain flex flex-col ${panel ? 'p-6' : 'min-h-[340px] p-8 lg:p-10'}`}>
              <div aria-hidden="true" className="absolute inset-0 hud-grid" />
              <div aria-hidden="true" className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-lime/15 blur-3xl" />
              {['top-5 left-5 border-l border-t', 'top-5 right-5 border-r border-t', 'bottom-5 left-5 border-l border-b', 'bottom-5 right-5 border-r border-b'].map((p) => (
                <span key={p} aria-hidden="true" className={`absolute w-6 h-6 border-lime/40 ${p}`} />
              ))}
              <div className="relative flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-lime" aria-hidden="true" />
                <p className="text-xs font-display font-semibold uppercase tracking-[0.2em] text-lime">{t('quote.resultLabel')}</p>
              </div>

              {/* The saving, stated as a saving: lime figure + "saved" + the % off */}
              <div className={`relative flex flex-wrap items-end gap-x-4 gap-y-2 ${panel ? 'mt-5 mb-6' : 'my-auto py-10'}`}>
                <p className={`font-display font-bold ${panel ? 'text-5xl' : 'text-6xl md:text-7xl'} text-lime tracking-tight leading-none`}>
                  <AnimatedNumber value={savedCost} format={(v) => `€${fmt(v)}`} active={active} />
                </p>
                <p className="flex items-center gap-3 pb-1.5">
                  <span className="font-display font-semibold text-xl md:text-2xl text-white">{t('quote.saved')}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime text-sm font-mono tabular-nums">
                    <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />−{savingPct}%
                  </span>
                </p>
              </div>

              {/* Cost comparison: traditional vs drone, so the figure above reads as the gap between them */}
              <div className="relative grid gap-4">
                {[
                  { label: t('quote.traditional'), cost: tradCost, share: 1, bar: 'bg-white/25', text: 'text-white/70' },
                  { label: t('quote.withAerata'), cost: droneCost, share: tradCost ? droneCost / tradCost : 0, bar: 'bg-lime', text: 'text-white' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between gap-4 mb-1.5">
                      <span className={`text-sm ${row.text}`}>{row.label}</span>
                      <span className={`text-sm font-mono tabular-nums ${row.text}`}>€{fmt(row.cost)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className={`h-full origin-left rounded-full ${row.bar}`}
                        initial={false}
                        animate={{ scaleX: active || prefersReducedMotion ? Math.max(0.02, Math.min(1, row.share)) : 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: EASE_OUT }}
                      />
                    </div>
                  </div>
                ))}
                <p className="mt-2 text-xs text-steelBlue/80 font-mono tabular-nums">
                  {fmtDays(savedDays)} {t('quote.fewerDays')} · {d.label} · {Math.max(1, Number(qty) || 1)} {d.unit}{timing ? ` · ${t(TIMING_KEYS[timing])}` : ''}
                </p>
              </div>
            </div>
          </Block>
        </div>

        {!panel && (
        <Reveal delay={0.15} className="mt-10 flex flex-col sm:flex-row items-center gap-5">
          <Magnetic>
            <Link
              to={`/contact?${planQuery()}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 font-display font-semibold text-sm tracking-wider uppercase bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-300 rounded"
            >
              {t('roi.requestBtn')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Magnetic>
          <p className="text-sm text-muted-foreground">
            {t('roi.or')}{' '}
            <Link to="/#sectors" className="underline underline-offset-4 decoration-primary/30 hover:decoration-primary text-primary transition-colors">
              {t('roi.viewResults')}
            </Link>
          </p>
        </Reveal>
        )}

        <p className={`${panel ? "mt-4" : "mt-6"} text-xs text-muted-foreground font-mono`}>
          {t('roi.disclaimer')}{' '}
          <Link to="/contact" onClick={onSubmit} className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
            {t('roi.contactUs')}
          </Link>{' '}
          {t('roi.forQuote')}
        </p>
    </Shell>
  );
}

const Shell = React.forwardRef(function Shell({ panel, children }, ref) {
  if (panel) return <div ref={ref}>{children}</div>;
  return (
    <section ref={ref} id="roi" className="relative py-28 bg-secondary/30 border-y border-border/30 overflow-hidden scroll-mt-20">
      <div aria-hidden="true" className="absolute inset-0 data-trace opacity-60 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
});
