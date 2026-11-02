import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, useLocalePath } from '@/components/LocalizedLink';
import { navigateWithMorph } from '../../lib/viewTransition';
import { Menu, X, ChevronDown, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, LANGUAGES } from '../../lib/LanguageContext';
import { MEDIA, mediaUrl } from '../../lib/media';
import { SECTORS } from '../../lib/sectors';

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://nl.linkedin.com/company/aerata',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aerata_bv/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@aerata6588',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
      </svg>
    ),
  },
  // TikTok placeholder — activate when account is live
  // { label: 'TikTok', href: 'https://www.tiktok.com/@aerata', icon: (...) },
];

// The six sector pages, shown 3 rows x 2 columns in the dropdown.
// Names and one-line descriptions come from sectorPages.* in the locale files.
const sectorLinks = (t) => SECTORS.map((s) => ({
  label: t(`sectorPages.${s.key}.name`),
  description: t(`sectorPages.${s.key}.menu`),
  path: s.path,
  image: s.card,
  preview: s.preview,
}));

/**
 * TRIAL: hover previews. The thumbnail's <video> has no src until the item
 * is first hovered/focused (data-src), then plays muted; leaving pauses and
 * rewinds it. Remove: drop the <video> and these handlers.
 */
const playPreview = (e) => {
  const v = e.currentTarget.querySelector('video[data-src]');
  if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!v.src) v.src = v.dataset.src;
  v.style.opacity = '1';
  v.play().catch(() => {});
};
const SERVICE_NAMES = (t) => (t('servicesPage.list') || []).map((s) => s.title).join(' · ');
const SECTION_ACTIVE = /^\/(sectors|services)(\/|$)/;

const stopPreview = (e) => {
  const v = e.currentTarget.querySelector('video[data-src]');
  if (!v) return;
  v.style.opacity = '0';
  v.pause();
  if (v.src) v.currentTime = 0;
};

const navLinksFor = (t) => [
  { label: t('nav.home'), path: '/' },
  { label: t('nav.about'), path: '/about' },
  { label: t('nav.sectors'), path: '#', children: sectorLinks(t) },
  { label: t('nav.training'), path: '/training' },
  { label: t('nav.news'), path: '/news' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const servicesCloseTimer = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { lang, switchLang, t } = useLang();
  const navLinks = navLinksFor(t);
  // Path without the /nl or /el prefix, for active-link matching.
  const currentPath = location.pathname.replace(/^\/(nl|el)(?=\/|$)/, '') || '/';

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // "Scrolled past 40px" via a 1px sentinel and an IntersectionObserver, not a
  // scroll listener: reading scrollY on every scroll event forced a layout
  // per event and was the single biggest cost while scrolling.
  useEffect(() => {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:40px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.appendChild(sentinel);
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(sentinel);
    return () => { io.disconnect(); sentinel.remove(); };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Mobile menu focus trap + Escape to close
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    const focusable = menu.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    // Freeze the page behind the menu and hide the floating Plan button.
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    root.dataset.menuOpen = '';
    window.__lenis?.stop();

    const handler = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      root.style.overflow = '';
      delete root.dataset.menuOpen;
      window.__lenis?.start();
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        // No backdrop blur: re-blurring the moving page (and the hero video)
        // behind the bar every frame was the main cause of scroll jank.
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,height] duration-500 ${
          scrolled
            ? 'bg-white border-b border-border shadow-sm h-16'
            : 'bg-transparent h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              className="flex items-center"
              aria-label="Aerata — back to homepage"
            >
              <img
                src={mediaUrl(MEDIA.navbar_logo, { width: 240 })}
                alt="Aerata"
                className="h-12 w-auto object-contain transition-all duration-500"
                onError={(e) => { e.currentTarget.src = MEDIA.navbar_logo_fallback; }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onKeyDown={link.children ? (e) => {
                    if (e.key === 'Escape' && servicesOpen) { setServicesOpen(false); e.currentTarget.querySelector('button')?.focus(); }
                  } : undefined}
                  onBlur={link.children ? (e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
                  } : undefined}
                  onMouseEnter={() => {
                    if (link.children) {
                      clearTimeout(servicesCloseTimer.current);
                      setServicesOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.children) {
                      servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 150);
                    }
                  }}
                >
                  {link.children ? (
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="sectors-panel"
                      // Keyboard (detail 0) toggles; a mouse click keeps the hover-opened panel open.
                      onClick={(e) => setServicesOpen((o) => (e.detail === 0 ? !o : true))}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                        SECTION_ACTIVE.test(currentPath)
                          ? 'text-lime'
                          : scrolled
                          ? 'text-muted-foreground hover:text-foreground'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown aria-hidden="true" className={`w-3 h-3 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                      {SECTION_ACTIVE.test(currentPath) && (
                        <motion.span layoutId="nav-active" className="absolute left-4 right-4 -bottom-0.5 h-px bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`relative block px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        currentPath === link.path
                          ? 'text-lime'
                          : scrolled
                          ? 'text-muted-foreground hover:text-foreground'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                      {currentPath === link.path && (
                        <motion.span layoutId="nav-active" className="absolute left-4 right-4 -bottom-0.5 h-px bg-lime" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                    </Link>
                  )}

                  <AnimatePresence>
                  {link.children && servicesOpen && (
                    <motion.div
                      id="sectors-panel"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.14 } }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'top left' }}
                      className="absolute top-full -left-24 pt-3 w-[560px]"
                      onMouseEnter={() => clearTimeout(servicesCloseTimer.current)}
                      onMouseLeave={() => { servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 150); }}
                    >
                      <div className="grid grid-cols-2 gap-1 p-2 bg-white border border-border rounded-xl shadow-[0_24px_60px_-12px_hsl(210_35%_12%/0.25)]">
                        {link.children.map((child, i) => (
                          <motion.div
                            key={child.path}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.02 * i, ease: [0.16, 1, 0.3, 1] }}
                            className={i === link.children.length - 1 && link.children.length % 2 ? 'col-span-2' : ''}
                          >
                            <Link
                              to={child.path}
                              onPointerEnter={playPreview}
                              onFocus={playPreview}
                              onPointerLeave={stopPreview}
                              onBlur={stopPreview}
                              // Same card → hero morph as the Home sectors: the thumbnail grows into the service page's hero.
                              onClick={(e) => navigateWithMorph(e, { navigate, to: localePath(child.path), sourceEl: e.currentTarget.querySelector('[data-vt-source]') })}
                              className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary/5 transition-colors"
                            >
                              <span data-vt-source className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-obsidian">
                                <img src={mediaUrl(child.image, { width: 160 })} alt="" loading="lazy" className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110" />
                                {child.preview && (
                                  <video
                                    data-src={child.preview}
                                    muted
                                    loop
                                    playsInline
                                    preload="none"
                                    aria-hidden="true"
                                    style={{ opacity: 0 }}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                  />
                                )}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-display font-semibold text-foreground group-hover:text-primary transition-colors">{child.label}</span>
                                <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{child.description}</span>
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                        <Link
                          to="/services"
                          className="group col-span-2 mt-1 flex items-center justify-between gap-3 px-3 py-3 rounded-lg border-t border-border/60 hover:bg-primary/5 transition-colors"
                        >
                          <span className="min-w-0">
                            <span className="block text-[11px] font-display font-semibold tracking-[0.2em] uppercase text-[hsl(88_55%_24%)]">{t('nav.allServices')}</span>
                            <span className="block text-xs text-muted-foreground mt-0.5 truncate">{SERVICE_NAMES(t)}</span>
                          </span>
                          <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-display font-semibold text-primary">
                            {t('nav.allServicesCta')}
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA + Social + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Social icons — desktop only */}
              <div className="hidden lg:flex items-center gap-2 mr-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Aerata on ${s.label}`}
                    className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                      scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/60 hover:text-lime'
                    }`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="relative hidden lg:block" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  aria-label={`${t('nav.language')}: ${lang.toUpperCase()}`}
                  aria-expanded={langOpen}
                  aria-controls="lang-panel"
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-display font-semibold tracking-wider uppercase rounded transition-colors ${
                    scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  {lang.toUpperCase()}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      id="lang-panel"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-1 w-36 bg-white border border-border rounded-lg overflow-hidden shadow-xl z-50"
                    >
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          aria-current={lang === l.code ? 'true' : undefined}
                          lang={l.code}
                          onClick={() => { switchLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all ${
                            lang === l.code
                              ? 'bg-primary/8 text-primary font-semibold'
                              : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          <span className="font-display font-bold text-xs tracking-wider">{l.label}</span>
                          <span className="text-xs">{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/portal"
                className={`hidden lg:inline-flex items-center px-4 py-2.5 text-sm font-semibold font-display tracking-wide border transition-all duration-300 rounded ${
                  scrolled
                    ? 'border-primary/40 text-primary hover:bg-primary/5'
                    : 'border-white/30 text-white/80 hover:text-white hover:border-white/60'
                }`}
              >
                {t('nav.clientLogin')}
              </Link>
              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-semibold font-display tracking-wide bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-all duration-300 rounded"
              >
                {t('nav.getInTouch')}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className={`lg:hidden p-2.5 -mr-2.5 transition-colors ${scrolled || mobileOpen ? 'text-foreground' : 'text-white'}`}
              >
                {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
            data-lenis-prevent
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto lg:hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.26, delay: 0.03 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-expanded={mobileServicesOpen}
                        className="w-full flex items-center justify-between py-4 text-lg font-display font-semibold text-foreground border-b border-border/30"
                      >
                        {link.label}
                        <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden pl-4"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="block py-3 text-muted-foreground hover:text-primary transition-colors border-b border-border/20"
                              >
                                {child.label}
                              </Link>
                            ))}
                            <Link
                              to="/services"
                              className="block py-3 font-display font-semibold text-primary hover:text-lime transition-colors"
                            >
                              {t('nav.allServices')}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="block py-4 text-lg font-display font-semibold text-foreground border-b border-border/30 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Social icons */}
              <div className="pt-4 flex gap-3 justify-center pb-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Aerata on ${s.label}`}
                    className="w-11 h-11 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Mobile Language Switcher */}
              <div className="pt-2 pb-4">
                <p className="text-[10px] font-display font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">{t('nav.language')}</p>
                <div className="flex gap-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      aria-pressed={lang === l.code}
                      className={`flex-1 py-2.5 text-xs font-display font-bold tracking-wider uppercase rounded border transition-all ${
                        lang === l.code
                          ? 'bg-primary text-white border-primary'
                          : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pb-2">
                <Link
                  to="/portal"
                  className="block w-full text-center px-6 py-4 font-display font-semibold border border-primary/40 text-primary hover:bg-primary/5 transition-all rounded"
                >
                  {t('nav.clientLogin')}
                </Link>
              </div>
              <div className="pb-6">
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-4 font-display font-semibold bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-all rounded"
                >
                  {t('nav.connectTeam')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
