// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Stagger, Item, MaskLines, Scramble, Spotlight, EASE_OUT } from '../components/motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { useLang } from '../lib/LanguageContext';
import { breadcrumbSchema } from '../lib/schemas';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/LocalizedLink';
import { ClipboardList, PencilLine } from 'lucide-react';
import oxaniumUrl from '@fontsource-variable/oxanium/files/oxanium-latin-wght-normal.woff2?url';
import { getSectorData, computeSavings, TIMING_KEYS, withEnglishFallback } from '../components/home/ROICalculator';

// HubSpot's `css` option forces the form into an iframe and injects this CSS
// into that iframe's <head>. The iframe doesn't share the page's fonts, so the
// self-hosted Oxanium file is declared here too (no Google Fonts request).
// `cssRequired: ''` strips HubSpot's own default stylesheet so our rules win
// without needing !important.
const HS_BRAND_CSS = `
  @font-face { font-family: 'Oxanium'; font-style: normal; font-weight: 200 800; font-display: swap; src: url('__OXANIUM_URL__') format('woff2'); }

  *, *::before, *::after { box-sizing: border-box; }

  body, form, input, select, textarea, button, label {
    font-family: 'Oxanium', sans-serif;
  }

  /* Field spacing */
  fieldset { max-width: 100%; border: none; padding: 0; margin: 0; }
  .hs-form-field, .field { margin-bottom: 1.25rem; }
  .input { margin-right: 0; }

  /* Labels */
  label {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7a8d;
    margin-bottom: 0.5rem;
    display: block;
  }
  .hs-form-required { color: #7ab648; margin-left: 2px; }

  /* Inputs / selects / textareas */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="phone"],
  input[type="number"],
  select,
  textarea {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    color: #1a2a3a;
    background: #f2f4f6;
    border: 1px solid #ccd3db;
    border-radius: 0.375rem;
    padding: 0.75rem 1rem;
    width: 100%;
    min-height: 2.75rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
    appearance: none;
    box-shadow: none;
  }
  textarea {
    min-height: 8rem;
    resize: vertical;
    line-height: 1.6;
  }
  input::placeholder, textarea::placeholder {
    color: #8fa0b2;
    opacity: 1;
  }

  /* Focus — lime ring */
  input:focus, select:focus, textarea:focus {
    border-color: #7ab648;
    box-shadow: 0 0 0 3px rgba(122, 182, 72, 0.15);
  }

  /* Select chevron */
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23667085' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.875rem center;
    padding-right: 2.5rem;
  }

  /* Validation */
  input.error, select.error, textarea.error, .hs-input.error {
    border-color: #e02d2d;
    box-shadow: none;
  }
  .hs-error-msgs {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    color: #cc2222;
    margin-top: 0.375rem;
    list-style: none;
    padding: 0;
  }

  /* Submit button — brand lime */
  .hs-button {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #7ab648;
    color: #1B2025;
    border: none;
    border-radius: 0.375rem;
    padding: 0.875rem 2.5rem;
    width: 100%;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .hs-button:hover {
    background: #669d3a;
    box-shadow: 0 4px 16px rgba(122, 182, 72, 0.28);
  }
  .hs-submit { margin-top: 0.5rem; }

  /* Checkbox / radio lists */
  .inputs-list { list-style: none; padding: 0; margin: 0.25rem 0 0; }
  .inputs-list li { margin-bottom: 0.5rem; }
  .inputs-list label {
    font-size: 0.8rem;
    text-transform: none;
    letter-spacing: 0;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: #2a3d52;
  }

  /* GDPR / legal */
  .legal-consent-container,
  .legal-consent-container p {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.7rem;
    color: #6b7a8d;
    line-height: 1.6;
    margin-top: 0.75rem;
  }
  .legal-consent-container a { color: #7ab648; text-decoration: underline; }

  /* Rich text HubSpot injects */
  .hs-richtext, .hs-richtext p {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.8125rem;
    color: #6b7a8d;
    line-height: 1.6;
  }

  /* Success message */
  .submitted-message { font-family: 'Oxanium', sans-serif; text-align: center; padding: 3rem 1.5rem; }
  .submitted-message p { font-size: 0.9375rem; color: #6b7a8d; line-height: 1.7; }
`;

// Planner sector → option value of the HubSpot `sector` select.
const HS_SECTOR = { solar: 'Renewable Energy', oilgas: 'Oil & Gas', construction: 'Construction' };

/**
 * Fills HubSpot fields from the inspection plan once the form exists.
 * `$form` is a jQuery object or a plain form element depending on the
 * embed version; the form lives in a same-origin iframe because of `css`.
 * Values are set through the native setter and announced with input/change
 * events so HubSpot's own state picks them up.
 */
function applyPrefill($form, prefill) {
  if (!prefill) return;
  const form = $form && $form.jquery ? $form[0] : $form;
  if (!form || !form.querySelector) return;
  const setValue = (el, value) => {
    if (!el || value == null) return;
    const proto = el.tagName === 'SELECT' ? HTMLSelectElement : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement;
    const win = el.ownerDocument.defaultView || window;
    const setter = Object.getOwnPropertyDescriptor((win[proto.name] || proto).prototype, 'value')?.set;
    if (setter) setter.call(el, value); else el.value = value;
    el.dispatchEvent(new win.Event('input', { bubbles: true }));
    el.dispatchEvent(new win.Event('change', { bubbles: true }));
  };
  const select = form.querySelector('select[name="sector"]');
  const option = select && [...select.options].find((o) => o.value === HS_SECTOR[prefill.sector]);
  if (option) setValue(select, option.value);
  const description = form.querySelector('textarea[name$="description"]');
  if (description && !description.value) setValue(description, prefill.summary);
}

function HubSpotForm({ prefill }) {
  const containerRef = useRef(null);
  // Latest prefill, read when HubSpot reports the form ready.
  const prefillRef = useRef(prefill);
  prefillRef.current = prefill;

  useEffect(() => {
    const scriptId = 'hs-embed-script';

    const initForm = () => {
      if (window.hbspt && containerRef.current) {
        containerRef.current.innerHTML = '';
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '25483745',
          formId: 'a422dc81-1039-4f10-826b-07d97d32904a',
          target: '#hs-form-container',
          // Strip HubSpot's default stylesheet so our rules are the only ones
          cssRequired: '',
          // Inject our brand CSS into the iframe HubSpot creates
          css: HS_BRAND_CSS.replace('__OXANIUM_URL__', new URL(oxaniumUrl, window.location.href).href),
          onFormReady: ($form) => applyPrefill($form, prefillRef.current),
        });
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.onload = initForm;
      document.head.appendChild(script);
    } else {
      initForm();
    }

    // Leaving the page: tear down the form and reCAPTCHA iframes, which
    // otherwise stay in memory (about 6 MB per visit).
    const container = containerRef.current;
    return () => {
      const frames = [...(container?.querySelectorAll('iframe') || []), ...document.querySelectorAll('iframe[src*="recaptcha"]')];
      frames.forEach((f) => { try { f.src = 'about:blank'; } catch { /* cross-origin */ } f.remove(); });
      document.querySelectorAll('.grecaptcha-badge').forEach((el) => {
        const wrapper = el.parentElement && el.parentElement !== document.body ? el.parentElement : el;
        wrapper.remove();
      });
      if (container) container.innerHTML = '';
    };
  }, []);


  // Branded loading state until HubSpot has injected its form iframe.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = () => { if (el.querySelector('iframe, form')) setReady(true); };
    check();
    const mo = new MutationObserver(check);
    mo.observe(el, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return (
    <div className="relative rounded-xl border border-border/60 bg-card shadow-[0_30px_60px_-30px_hsl(210_35%_12%/0.25)] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lime/70 to-transparent" aria-hidden="true" />
      <div
        id="hs-form-container"
        ref={containerRef}
        className="hs-form-wrapper p-8 md:p-10 min-h-[480px]"
      />
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="hs-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.26 } }}
            className="absolute inset-0 p-8 md:p-10 bg-card pointer-events-none"
            aria-hidden="true"
          >
            <div className="space-y-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-2.5">
                  <div className="h-2.5 w-24 rounded bg-secondary animate-pulse" />
                  <div className="h-11 w-full rounded-md bg-secondary/70 animate-pulse" style={{ animationDelay: `${i * 120}ms` }} />
                </div>
              ))}
              <div className="h-28 w-full rounded-md bg-secondary/70 animate-pulse" />
              <div className="h-12 w-full rounded-md bg-lime/30 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OfficeCard({ title, children, live }) {
  return (
    <Spotlight
      tone="navy"
      className="group rounded-xl border border-border/60 bg-card p-6 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-18px_hsl(210_35%_12%/0.25)]"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-foreground text-sm tracking-wider uppercase">{title}</h3>
        {live && (
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-60 animate-ping [animation-duration:2.4s] motion-reduce:hidden" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-lime" />
          </span>
        )}
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">{children}</div>
    </Spotlight>
  );
}

const rowCls = 'flex items-start gap-3 -mx-2 px-2 py-2 rounded-md';
const linkRowCls = `${rowCls} hover:bg-primary/5 hover:text-primary transition-colors`;
const IconTile = ({ icon: Icon }) => (
  <span className="w-8 h-8 shrink-0 rounded-md bg-primary/8 border border-primary/15 flex items-center justify-center transition-colors duration-300 group-hover/row:bg-primary group-hover/row:border-primary">
    <Icon className="w-3.5 h-3.5 text-primary transition-colors duration-300 group-hover/row:text-lime" aria-hidden="true" />
  </span>
);

/** Reads a quote-builder plan from the URL (?source=quote-builder&sector=…). */
function usePlan(t) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  if (params.get('source') !== 'quote-builder') return null;
  const data = getSectorData(t);
  const sector = data[params.get('sector')] ? params.get('sector') : 'solar';
  const d = data[sector];
  const qty = Math.max(1, Number(params.get('qty')) || d.defaultQty);
  const timingKey = TIMING_KEYS[params.get('timing')];
  const location = (params.get('location') || '').slice(0, 120);
  const { savedCost, savedDays } = computeSavings(d, qty);
  const fmt = (n) => new Intl.NumberFormat('en-EU', { maximumFractionDigits: 0 }).format(n);
  const plan = {
    sector,
    sectorLabel: d.label,
    size: `${qty} ${d.unit}`,
    timing: timingKey ? t(timingKey) : '',
    location,
    savings: `€${fmt(savedCost)} · ${savedDays} ${t('common.days')}`,
  };
  plan.summary = [
    t('quote.prefillIntro'),
    `- ${t('quote.planSector')}: ${plan.sectorLabel}`,
    `- ${t('quote.planSize')}: ${plan.size}`,
    plan.timing && `- ${t('quote.planTiming')}: ${plan.timing}`,
    plan.location && `- ${t('quote.planLocation')}: ${plan.location}`,
    `- ${t('quote.planSavings')}: ${plan.savings}`,
  ].filter(Boolean).join('\n');
  return plan;
}

function PlanCard({ plan, t }) {
  const rows = [
    [t('quote.planSector'), plan.sectorLabel],
    [t('quote.planSize'), plan.size],
    plan.timing && [t('quote.planTiming'), plan.timing],
    plan.location && [t('quote.planLocation'), plan.location],
  ].filter(Boolean);
  return (
    <div className="relative mb-5 rounded-xl bg-obsidian text-white overflow-hidden grain p-6 md:p-7">
      <div aria-hidden="true" className="absolute inset-0 hud-grid" />
      {['top-3 left-3 border-l border-t', 'bottom-3 right-3 border-r border-b'].map((p) => (
        <span key={p} aria-hidden="true" className={`absolute w-5 h-5 border-lime/40 ${p}`} />
      ))}
      <div className="relative flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-lime" aria-hidden="true" />
          <h2 className="font-display font-semibold text-lg">{t('quote.planTitle')}</h2>
        </div>
        <Link
          to="/#roi"
          className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-lime hover:text-white transition-colors"
        >
          <PencilLine className="w-3.5 h-3.5" aria-hidden="true" /> {t('quote.planEdit')}
        </Link>
      </div>
      <dl className="relative grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4">
        {rows.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="text-[11px] font-display uppercase tracking-wider text-steelBlue">{k}</dt>
            <dd className="text-sm font-semibold text-white mt-1 break-words">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="relative mt-5 pt-4 border-t border-white/10 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-[11px] font-display uppercase tracking-wider text-steelBlue">{t('quote.planSavings')}</span>
        <span className="font-display font-bold text-2xl text-lime tabular-nums">{plan.savings}</span>
      </div>
      <p className="relative mt-3 text-xs text-steelBlue">{t('quote.planNote')}</p>
    </div>
  );
}

export default function Contact() {
  const { lang, t: rawT } = useLang();
  const t = withEnglishFallback(rawT);
  const reduce = useReducedMotion();
  const plan = usePlan(t);
  const [mapOn, setMapOn] = useState(false);

  return (
    <div>
      <SEO
        title="Contact Aerata — Get a Drone Inspection Quote"
        description="Talk to Aerata in Delft or Athens about your site. We reply with a technical proposal, followed by a formal quote once the scope is agreed."
        path="/contact"
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact' },
        ], lang)}
      />
      {/* Page title — navy brand background */}
      <section className="relative pt-44 pb-32 overflow-hidden bg-navy-dark grain">
        <div aria-hidden="true" className="absolute inset-0 hud-grid" />
        <div aria-hidden="true" className="absolute -right-40 -top-24 w-[620px] h-[620px] rounded-full bg-lime/10 blur-3xl" />
        {!reduce && <div className="scanline z-10" aria-hidden="true" />}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-7">
            <motion.span
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="block w-16 h-px bg-lime origin-left"
            />
            <Scramble text="Contact" className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-lime" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight max-w-4xl mb-6">
            <MaskLines lines={[t('contactPage.titleA'), <span key="h" className="text-lime">{t('contactPage.titleB')}</span>]} delay={0.15} />
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.27, ease: EASE_OUT }}
            className="text-lg md:text-xl text-white/70 max-w-xl"
          >
            {t('contactPage.intro')}
          </motion.p>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* HubSpot Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.59, delay: 0.21, ease: EASE_OUT }}
              >
                {plan && <PlanCard plan={plan} t={t} />}
                <HubSpotForm prefill={plan} />
                <div className="mt-4">
                  <span className="text-xs font-mono text-muted-foreground">{t('contactPage.formLabel')}</span>
                </div>
              </motion.div>
            </div>

            {/* Contact Info */}
            <Stagger delay={0.45} className="lg:col-span-2 space-y-5 lg:pt-20">
              <Item>
                <OfficeCard title={t('footer.hqTitle')} live>
                  <div className={rowCls}><IconTile icon={MapPin} /><span className="pt-1.5">Aerata B.V., Van Leeuwenhoekpark 1, 2611 DW Delft, Netherlands</span></div>
                  <a href="tel:+31638165193" className={`group/row ${linkRowCls} items-center`}><IconTile icon={Phone} /><span className="tabular-nums">+31 6 38165193</span></a>
                  <a href="mailto:info@aerata.com" className={`group/row ${linkRowCls} items-center`}><IconTile icon={Mail} /><span>info@aerata.com</span></a>
                </OfficeCard>
              </Item>

              <Item>
                <OfficeCard title={t('footer.athensTitle')} live>
                  <div className={rowCls}><IconTile icon={MapPin} /><span className="pt-1.5">Leoforos Alimou 8, 17455 Alimos, Athens, Greece</span></div>
                  <a href="tel:+306971904421" className={`group/row ${linkRowCls} items-center`}><IconTile icon={Phone} /><span className="tabular-nums">+30 697 190 4421</span></a>
                </OfficeCard>
              </Item>

              {/* Map */}
              <Item>
                <div className="relative rounded-xl overflow-hidden border border-border/60 h-64 shadow-[0_18px_36px_-18px_hsl(210_35%_12%/0.25)]">
                  {/* Google Maps loads only on request: it contacts Google and may set cookies. */}
                  {mapOn ? (
                    <iframe
                      title="Aerata HQ Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.234!2d4.3571!3d52.0116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDAwJzQxLjgiTiA0wrAyMScyNS42IkU!5e0!3m2!1sen!2snl!4v1700000000000"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-obsidian hud-grid">
                      <button type="button" onClick={() => setMapOn(true)} className="min-h-11 px-5 py-2.5 rounded bg-lime text-obsidian font-display font-semibold text-sm hover:bg-lime/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime">
                        {t('contactPage.mapLoad')}
                      </button>
                      <p className="max-w-xs text-xs text-white/70 leading-relaxed">{t('contactPage.mapNote')}</p>
                      <a href="https://www.google.com/maps/search/?api=1&query=Van+Leeuwenhoekpark+1+2611+DW+Delft" target="_blank" rel="noopener noreferrer" className="text-xs text-lime underline underline-offset-2">{t('contactPage.mapOpen')}</a>
                    </div>
                  )}
                  <span aria-hidden="true" className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-l border-t border-lime/70" />
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-r border-b border-lime/70" />
                  <span className="pointer-events-none absolute bottom-3 left-3 px-2 py-1 rounded bg-obsidian/80 font-mono text-[10px] tracking-widest text-white/80 tabular-nums">52.0116° N, 4.3571° E</span>
                </div>
              </Item>
            </Stagger>
          </div>
        </div>
      </section>
    </div>
  );
}
