// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Stagger, Item, MaskLines, Scramble, Spotlight, Magnetic, Reveal, EASE_OUT } from '../components/motion';
import { Link } from '@/components/LocalizedLink';
import { Lock, FileText, Map, BarChart2, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const PORTAL_FEATURES = [
  { icon: FileText, title: 'Inspection Reports', desc: 'Access your full library of delivered reports, annotated imagery, and thermal data.' },
  { icon: Map, title: 'Live Mission Tracking', desc: 'Real-time visibility into active mission status, flight logs, and field crew location.' },
  { icon: BarChart2, title: 'Analytics Dashboard', desc: 'Aggregated KPIs across your asset portfolio — defect trends, cost savings, and SLA compliance.' },
];

export default function ClientPortal() {
  const reduce = useReducedMotion();
  return (
    <div>
      <SEO
        title="Client Portal — Aerata B.V."
        description="Access your Aerata inspection reports, mission tracking, and analytics dashboard."
        path="/portal"
        noindex
      />
      {/* Page title — navy brand background */}
      <section className="relative py-32 pt-44 min-h-[86vh] flex items-center overflow-hidden bg-navy-dark grain">
        {/* Subtle grid */}
        <div aria-hidden="true" className="absolute inset-0 hud-grid" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[760px] h-[480px] rounded-full bg-lime/10 blur-3xl" />
        {!reduce && <div className="scanline z-10" aria-hidden="true" />}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <div>
              {/* Lock badge */}
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="relative w-20 h-20 mx-auto mb-9 rounded-full bg-white/[0.06] border border-lime/30 flex items-center justify-center"
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-full border border-lime/25 animate-ping [animation-duration:3s] motion-reduce:hidden" />
                <Lock className="w-8 h-8 text-lime" />
              </motion.div>

              <div className="flex items-center justify-center gap-3 mb-7">
                <motion.span initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.45, ease: EASE_OUT }} className="block w-10 h-px bg-lime origin-right" />
                <Scramble text="Secure Access" className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-lime" />
                <motion.span initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.45, ease: EASE_OUT }} className="block w-10 h-px bg-lime origin-left" />
              </div>

              <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6">
                <MaskLines lines={['Aerata Client Portal']} delay={0.15} />
              </h1>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.24, ease: EASE_OUT }}
                className="text-lg text-white/70 max-w-xl mx-auto mb-12"
              >
                Your dedicated workspace for accessing inspection reports, mission tracking, and asset analytics. Portal access is provisioned upon project onboarding.
              </motion.p>

              {/* CTA block */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.59, delay: 0.33, ease: EASE_OUT }}
                className="relative rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-8 mb-10 text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
              >
                <span aria-hidden="true" className="absolute top-3 left-3 w-4 h-4 border-l border-t border-lime/50" />
                <span aria-hidden="true" className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-lime/50" />
                <p className="text-xs font-mono text-lime/70 mb-5">// PORTAL ACCESS</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-display font-semibold uppercase tracking-wider text-steelBlue mb-1.5 block">
                      Email / Client ID
                    </label>
                    <input
                      type="email"
                      placeholder="your@company.com"
                      disabled
                      className="w-full h-11 px-4 rounded-md border border-white/10 bg-white/[0.05] text-white/40 placeholder:text-white/30 text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-display font-semibold uppercase tracking-wider text-steelBlue mb-1.5 block">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      disabled
                      className="w-full h-11 px-4 rounded-md border border-white/10 bg-white/[0.05] text-white/40 placeholder:text-white/30 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 font-display font-semibold text-sm tracking-wide bg-white/10 text-white/55 rounded-md cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  Portal Coming Soon
                </button>
                <p className="text-xs text-steelBlue/70 text-center mt-4 font-mono">
                  Secure SSO login and provisioning in progress — expected Q3 2025.
                </p>
              </motion.div>

              {/* Contact to request access */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.42, ease: EASE_OUT }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-sm tracking-wide bg-lime text-obsidian hover:bg-lime/90 btn-shine transition-colors duration-300 rounded"
                >
                  <Mail className="w-4 h-4" />
                  Request Portal Access
                </Link>
                </Magnetic>
                <a
                  href="mailto:info@aerata.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-sm tracking-wide border border-white/30 text-white/75 hover:text-white hover:border-white/60 transition-colors duration-300 rounded"
                >
                  info@aerata.com
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Feature Preview */}
      <section className="py-28 bg-secondary/30 border-t border-border/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-primary tracking-tight mb-3"><MaskLines lines={["What's Inside the Portal"]} onMount={false} /></h2>
            <Reveal delay={0.15} className="text-muted-foreground">A dedicated workspace for every active client.</Reveal>
          </div>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PORTAL_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Item key={i}>
                  <Spotlight tone="navy" className="group h-full p-8 rounded-xl border border-border/60 bg-card text-center transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_hsl(210_35%_12%/0.28)]">
                    <div className="w-14 h-14 mx-auto mb-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center transition-colors duration-500 group-hover:bg-primary group-hover:border-primary">
                      <Icon className="w-5 h-5 text-primary transition-colors duration-500 group-hover:text-lime" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </Spotlight>
                </Item>
              );
            })}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
