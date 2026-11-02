import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/LocalizedLink';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Stagger, Item, MaskLines, Reveal, Magnetic } from '../motion';

// Links: an underline that draws in from the left on hover/focus.
const LINK = 'footer-link inline-block py-1.5 md:py-0.5 text-white/70 hover:text-lime transition-colors duration-300';
import { SECTORS } from '../../lib/sectors';
import { openConsentSettings } from '../../lib/consent';
import { useLang } from '../../lib/LanguageContext';
import { MEDIA, mediaUrl } from '../../lib/media';

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aerata', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  )},
  { label: 'Instagram', href: 'https://www.instagram.com/aerata_bv', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )},
  { label: 'TikTok', href: 'https://www.tiktok.com/@aerata', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z"/></svg>
  )},
  { label: 'YouTube', href: 'https://www.youtube.com/@aerata', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
  )},
];

function isOfficeOpen(timezone) {
  const now = new Date();
  const hour = parseInt(
    new Intl.DateTimeFormat('en-GB', { timeZone: timezone, hour: 'numeric', hour12: false }).format(now),
    10
  );
  return hour >= 9 && hour < 18;
}

function LiveClock({ timezone, label, openLabel = 'Open', closedLabel = 'Closed' }) {
  const [time, setTime] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  // Ticks only while the footer is on screen.
  const onScreen = useInView(ref);
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setOpen(isOfficeOpen(timezone));
    };
    update();
    if (!onScreen) return undefined;
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [timezone, onScreen]);
  return (
    <div ref={ref} className="flex items-center gap-2 text-xs text-white/70">
      <span className={`w-2 h-2 rounded-full ${open ? 'bg-lime animate-pulse' : 'bg-red-400'}`} />
      <span>{label}</span>
      <span className="font-mono text-lime tabular-nums">{time}</span>
      <span className={`text-[10px] font-mono uppercase tracking-wide ${open ? 'text-lime/70' : 'text-red-400/70'}`}>
        {open ? openLabel : closedLabel}
      </span>
    </div>
  );
}

const FOOTER_CSS = `.footer-link{background-image:linear-gradient(currentColor,currentColor);background-size:0% 1px;background-position:0 100%;background-repeat:no-repeat;transition:background-size .45s cubic-bezier(.16,1,.3,1),color .3s}.footer-link:hover,.footer-link:focus-visible{background-size:100% 1px}`;

export default function Footer() {
  const { t } = useLang();
  const { pathname } = useLocation();
  // Service pages close with their own consultation CTA (CTABanner) right
  // above the footer; skip the generic one there so two CTAs don't stack.
  const pageHasOwnCta = /^(\/(nl|el))?\/(services|sectors)(\/|$)/.test(pathname);
  return (
    <footer className="relative bg-primary text-primary-foreground border-t border-primary/20 overflow-hidden">
      <style>{FOOTER_CSS}</style>
      <div aria-hidden="true" className="absolute inset-0 hud-grid opacity-70 pointer-events-none" />
      {/* CTA Banner */}
      {!pageHasOwnCta && (
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-oxanium text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.05] [text-wrap:balance]">
            <MaskLines lines={[t('footer.ctaTitle')]} onMount={false} />
          </h2>
          <Reveal delay={0.15} as="p" className="text-white/70 mb-9 max-w-xl mx-auto font-light text-lg">
            {t('footer.ctaDesc')}
          </Reveal>
          <Reveal delay={0.25}>
            <Magnetic>
              <Link to="/contact"
                className="group inline-flex items-center gap-3 px-9 py-4 font-oxanium font-semibold text-sm tracking-wide bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-300 rounded cursor-pointer"
              >
                {t('footer.ctaButton')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Stagger gap={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <Item>
            <div className="mb-6">
              <img
                src={mediaUrl(MEDIA.footer_logo, { width: 240 })}
                alt="Aerata"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6 font-light">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} aria-label={`Aerata on ${s.label}`}
                  className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white/60 hover:text-lime hover:border-lime/50 hover:-translate-y-0.5 transition-[color,border-color,transform] duration-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </Item>

          {/* HQ */}
          <Item>
            <h2 className="font-oxanium font-semibold text-white text-sm tracking-wider uppercase mb-4">{t('footer.hqTitle')}</h2>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-lime/80" /><span>Van Leeuwenhoekpark 1, 2611 DW Delft, Netherlands</span></div>
              <div className="flex gap-2"><Phone className="w-4 h-4 shrink-0 text-lime/80" /><a href="tel:+31638165193" className="footer-link inline-block py-1.5 md:py-0.5 hover:text-white transition-colors duration-300">+31 6 38165193</a></div>
              <div className="flex gap-2"><Mail className="w-4 h-4 shrink-0 text-lime/80" /><a href="mailto:info@aerata.com" className="footer-link inline-block py-1.5 md:py-0.5 hover:text-white transition-colors duration-300">info@aerata.com</a></div>
            </div>
            <div className="mt-4">
              <LiveClock timezone="Europe/Amsterdam" label="Delft" openLabel={t('footer.open')} closedLabel={t('footer.closed')} />
            </div>
          </Item>

          {/* Athens */}
          <Item>
            <h2 className="font-oxanium font-semibold text-white text-sm tracking-wider uppercase mb-4">{t('footer.athensTitle')}</h2>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-lime/80" /><span>Leoforos Alimou 8, 17455 Alimos, Athens, Greece</span></div>
              <div className="flex gap-2"><Phone className="w-4 h-4 shrink-0 text-lime/80" /><a href="tel:+306971904421" className="footer-link inline-block py-1.5 md:py-0.5 hover:text-white transition-colors duration-300">+30 697 190 4421</a></div>
            </div>
            <div className="mt-4">
              <LiveClock timezone="Europe/Athens" label="Athens" openLabel={t('footer.open')} closedLabel={t('footer.closed')} />
            </div>
          </Item>

          {/* Quick Links */}
          <Item>
            <h2 className="font-oxanium font-semibold text-white text-sm tracking-wider uppercase mb-4">{t('footer.quickLinks')}</h2>
            <div className="flex flex-col items-start gap-1.5 md:gap-2.5 text-sm">
              <Link to="/" className={LINK}>{t('footer.home')}</Link>
              <Link to="/about" className={LINK}>{t('footer.company')}</Link>
              <Link to="/fleet" className={LINK}>{t('nav.fleet')}</Link>
              <Link to="/news" className={LINK}>{t('footer.news')}</Link>
              <Link to="/training" className={LINK}>{t('nav.training')}</Link>
              <Link to="/contact" className={LINK}>{t('footer.contact')}</Link>
              <Link to="/privacy" className={LINK}>{t('footer.privacy')}</Link>
            </div>
            <h2 className="font-oxanium font-semibold text-white text-sm tracking-wider uppercase mt-6 mb-3">{t('nav.sectors')}</h2>
            <div className="flex flex-col items-start gap-1.5 md:gap-2 text-sm">
              {SECTORS.map((sec) => (
                <Link key={sec.key} to={sec.path} className={LINK}>{t(`sectorPages.${sec.key}.name`)}</Link>
              ))}
              <Link to="/services" className={LINK}>{t('nav.allServices')}</Link>
            </div>
          </Item>
        </Stagger>

        {/* Bottom Bar */}
        <div className="relative mt-14 pt-8 border-t border-white/10 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-white/70">
              <p>© {new Date().getFullYear()} Aerata B.V. {t('footer.rights')}</p>
              <Link to="/privacy" className={`${LINK} text-white/70`}>{t('footer.privacy')}</Link>
              <button type="button" onClick={openConsentSettings} className="footer-link inline-block py-1.5 md:py-0.5 text-white/70 hover:text-white transition-colors duration-300">{t('cookies.footerLink')}</button>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70 font-mono">
              <span>52.0116° N, 4.3571° E</span>
              <span>—</span>
              <span>37.9838° N, 23.7275° E</span>
            </div>
          </div>
          {/* Company details (Dutch BW 3:15d / e-Commerce Directive art. 5). Add the RDW
              operator number here once it is issued. */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-white/70 font-mono">
            <span>Aerata B.V.</span>
            <span aria-hidden="true" className="hidden sm:inline text-white/40">|</span>
            <span>KvK 84696060</span>
            <span aria-hidden="true" className="hidden sm:inline text-white/40">|</span>
            <span>{t('footer.vat')} NL863319932B01</span>
            <span aria-hidden="true" className="hidden sm:inline text-white/40">|</span>
            <a href="mailto:info@aerata.com" className="footer-link hover:text-white">info@aerata.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}