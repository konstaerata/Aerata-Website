import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang, LANGUAGES } from '../../lib/LanguageContext';
import { MEDIA } from '../../lib/media';

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

const services = [
  { label: 'Aerial Surveying & Mapping', path: '/services/surveying' },
  { label: 'Renewable Energy', path: '/services/renewable-energy' },
  { label: 'Environmental Monitoring', path: '/services/environmental' },
  { label: 'Critical Infrastructure', path: '/services/infrastructure' },
  { label: 'Oil & Gas', path: '/services/oil-gas' },
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '#', children: services },
  { label: 'Our Fleet', path: '/fleet' },
  { label: 'Training', path: '/training' },
  { label: 'News', path: '/news' },
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
  const { lang, switchLang, t } = useLang();

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              className="flex items-center"
            >
              <img
                src={MEDIA.navbar_logo}
                alt="Aerata logo"
                className="h-14 w-auto object-contain"
                onError={(e) => { e.currentTarget.src = MEDIA.navbar_logo_fallback; }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative"
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
                    <button className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                      location.pathname.startsWith('/services') ? 'text-lime' : scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
                    }`}>
                      {link.label}
                      <ChevronDown className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link to={link.path} className={`px-4 py-2 text-sm font-medium transition-colors ${
                      location.pathname === link.path ? 'text-lime' : scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
                    }`}>
                      {link.label}
                    </Link>
                  )}

                  {link.children && servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 pt-2 w-72"
                      onMouseEnter={() => clearTimeout(servicesCloseTimer.current)}
                      onMouseLeave={() => { servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 150); }}
                    >
                    <div className="bg-white backdrop-blur-xl border border-border rounded-lg overflow-hidden shadow-xl">
                      {link.children.map((child) => (
                        <Link key={child.path} to={child.path}
                          className="block px-5 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all border-b border-border/50 last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + Social + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Social icons — desktop only */}
              <div className="hidden lg:flex items-center gap-2 mr-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
                      scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/60 hover:text-lime'
                    }`}>
                    {s.icon}
                  </a>
                ))}
              </div>
              {/* Language Switcher */}
              <div className="relative hidden lg:block" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-oxanium font-semibold tracking-wider uppercase rounded transition-colors ${
                    scrolled ? 'text-muted-foreground hover:text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  {lang.toUpperCase()}
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute top-full right-0 mt-1 w-36 bg-white border border-border rounded-lg overflow-hidden shadow-xl z-50"
                    >
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { switchLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-all ${
                            lang === l.code
                              ? 'bg-primary/8 text-primary font-semibold'
                              : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          <span className="font-oxanium font-bold text-xs tracking-wider">{l.label}</span>
                          <span className="text-xs">{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/portal"
                className={`hidden lg:inline-flex items-center px-4 py-2.5 text-sm font-semibold font-exo tracking-wide border transition-all duration-300 rounded ${
                  scrolled ? 'border-primary/40 text-primary hover:bg-primary/5' : 'border-white/30 text-white/80 hover:text-white hover:border-white/60'
                }`}
              >
                {t('nav.clientLogin')}
              </Link>
              <Link to="/contact"
                className="hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-semibold font-exo tracking-wide bg-lime text-white hover:bg-lime/90 transition-all duration-300 rounded"
              >
                {t('nav.getInTouch')}
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground p-2">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 overflow-y-auto lg:hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between py-4 text-lg font-exo font-semibold text-foreground border-b border-border/30"
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {link.children.map((child) => (
                              <Link key={child.path} to={child.path}
                                className="block py-3 text-muted-foreground hover:text-primary transition-colors border-b border-border/20"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={link.path}
                      className="block py-4 text-lg font-exo font-semibold text-foreground border-b border-border/30 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex gap-3 justify-center pb-4">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
              {/* Mobile Language Switcher */}
              <div className="pt-2 pb-4">
                <p className="text-[10px] font-oxanium font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">Language</p>
                <div className="flex gap-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      className={`flex-1 py-2.5 text-xs font-oxanium font-bold tracking-wider uppercase rounded border transition-all ${
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
                <Link to="/portal"
                  className="block w-full text-center px-6 py-4 font-exo font-semibold border border-primary/40 text-primary hover:bg-primary/5 transition-all rounded"
                >
                  {t('nav.clientLogin')}
                </Link>
              </div>
              <div className="pb-6">
                <Link to="/contact"
                  className="block w-full text-center px-6 py-4 font-exo font-semibold bg-lime text-white hover:bg-lime/90 transition-all rounded"
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