// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, FileText, Map, BarChart2, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const PORTAL_FEATURES = [
  { icon: FileText, title: 'Inspection Reports', desc: 'Access your full library of delivered reports, annotated imagery, and thermal data.' },
  { icon: Map, title: 'Live Mission Tracking', desc: 'Real-time visibility into active mission status, flight logs, and field crew location.' },
  { icon: BarChart2, title: 'Analytics Dashboard', desc: 'Aggregated KPIs across your asset portfolio — defect trends, cost savings, and SLA compliance.' },
];

export default function ClientPortal() {
  return (
    <div>
      <SEO
        title="Client Portal — Aerata B.V."
        description="Access your Aerata inspection reports, mission tracking, and analytics dashboard."
        path="/portal"
        noindex
      />
      {/* Page title — navy brand background */}
      <section className="relative py-32 pt-40 min-h-[80vh] flex items-center overflow-hidden bg-navy-dark">
        {/* Subtle grid */}
        <div className="absolute inset-0 data-trace opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Lock badge */}
              <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Lock className="w-7 h-7 text-lime" />
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-px bg-lime" />
                <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-lime">Secure Access</span>
                <div className="w-10 h-px bg-lime" />
              </div>

              <h1 className="font-barlow font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
                Aerata Client Portal
              </h1>
              <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
                Your dedicated workspace for accessing inspection reports, mission tracking, and asset analytics. Portal access is provisioned upon project onboarding.
              </p>

              {/* CTA block */}
              <div className="rounded-lg border border-border/50 bg-card/40 p-8 mb-10 text-left">
                <p className="text-xs font-mono text-primary/60 mb-4">// PORTAL ACCESS</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-barlow font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Email / Client ID
                    </label>
                    <input
                      type="email"
                      placeholder="your@company.com"
                      disabled
                      className="w-full h-11 px-4 rounded border border-border bg-secondary text-foreground/50 text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-barlow font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      disabled
                      className="w-full h-11 px-4 rounded border border-border bg-secondary text-foreground/50 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 font-barlow font-semibold text-sm tracking-wide bg-primary/40 text-primary-foreground/60 rounded cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  Portal Coming Soon
                </button>
                <p className="text-xs text-muted-foreground/60 text-center mt-4 font-mono">
                  Secure SSO login and provisioning in progress — expected Q3 2025.
                </p>
              </div>

              {/* Contact to request access */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-barlow font-semibold text-sm tracking-wide bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded"
                >
                  <Mail className="w-4 h-4" />
                  Request Portal Access
                </Link>
                <a
                  href="mailto:info@aerata.com"
                  className="inline-flex items-center gap-2 px-6 py-3 font-barlow font-semibold text-sm tracking-wide border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 rounded"
                >
                  info@aerata.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portal Feature Preview */}
      <section className="py-20 bg-secondary/30 border-t border-border/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-barlow font-bold text-2xl text-foreground mb-2">What's Inside the Portal</h2>
            <p className="text-muted-foreground text-sm">A dedicated workspace for every active client.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTAL_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-lg border border-border/50 bg-card/30 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-barlow font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
