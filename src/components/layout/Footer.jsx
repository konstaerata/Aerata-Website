import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

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

function LiveClock({ timezone, label }) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [timezone]);
  return (
    <div className="flex items-center gap-2 text-xs text-white/60">
      <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
      <span>{label}</span>
      <span className="font-mono text-lime">{time}</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-rajdhani text-3xl md:text-4xl font-bold text-white mb-4">
            Reduce Costs, Increase Efficiency.
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Schedule your drone inspection now and discover how aerial intelligence can transform your operations.
          </p>
          <Link to="/contact"
            className="inline-flex items-center px-8 py-3 font-rajdhani font-semibold text-sm tracking-wide bg-lime text-primary hover:bg-lime/90 transition-all duration-300 rounded glow-pulse cursor-pointer"
          >
            Schedule Your Drone Inspection Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="hsl(88 48% 52%)" opacity="0.15"/>
                <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke="hsl(88 48% 52%)" strokeWidth="1.5"/>
                <circle cx="16" cy="16" r="4" fill="white" opacity="0.9"/>
                <line x1="16" y1="8" x2="16" y2="12" stroke="hsl(88 48% 52%)" strokeWidth="1.5"/>
                <line x1="16" y1="20" x2="16" y2="24" stroke="hsl(88 48% 52%)" strokeWidth="1.5"/>
                <line x1="8" y1="16" x2="12" y2="16" stroke="hsl(88 48% 52%)" strokeWidth="1.5"/>
                <line x1="20" y1="16" x2="24" y2="16" stroke="hsl(88 48% 52%)" strokeWidth="1.5"/>
              </svg>
              <span className="font-oxanium font-bold text-xl tracking-[0.15em] uppercase text-white">AERATA</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Where Expertise Takes Flight. Professional drone services for industries that demand precision.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center text-white/60 hover:text-lime hover:border-lime/50 transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* HQ */}
          <div>
            <h4 className="font-rajdhani font-semibold text-white text-sm tracking-wider uppercase mb-4">Headquarters — Delft</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-lime/80" /><span>Van Leeuwenhoekpark 1, 2611 DW Delft, Netherlands</span></div>
              <div className="flex gap-2"><Phone className="w-4 h-4 shrink-0 text-lime/80" /><a href="tel:+31638165193" className="hover:text-white transition-colors">+31 6 38165193</a></div>
              <div className="flex gap-2"><Mail className="w-4 h-4 shrink-0 text-lime/80" /><a href="mailto:info@aerata.com" className="hover:text-white transition-colors">info@aerata.com</a></div>
            </div>
            <div className="mt-4">
              <LiveClock timezone="Europe/Amsterdam" label="Delft" />
            </div>
          </div>

          {/* Athens */}
          <div>
            <h4 className="font-rajdhani font-semibold text-white text-sm tracking-wider uppercase mb-4">Athens Office</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-lime/80" /><span>Leoforos Alimou 8, 17455 Alimos, Athens, Greece</span></div>
              <div className="flex gap-2"><Phone className="w-4 h-4 shrink-0 text-lime/80" /><a href="tel:+306971904421" className="hover:text-white transition-colors">+30 697 190 4421</a></div>
            </div>
            <div className="mt-4">
              <LiveClock timezone="Europe/Athens" label="Athens" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-rajdhani font-semibold text-white text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <div className="space-y-3 text-sm">
              <Link to="/" className="block text-white/70 hover:text-lime transition-colors">Home</Link>
              <Link to="/about" className="block text-white/70 hover:text-lime transition-colors">Our Company</Link>
              <Link to="/news" className="block text-white/70 hover:text-lime transition-colors">News</Link>
              <Link to="/contact" className="block text-white/70 hover:text-lime transition-colors">Contact Us</Link>
              <Link to="/privacy" className="block text-white/70 hover:text-lime transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            Copyright 2026 – Aerata.com
          </p>
          <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
            <span>52.0116° N, 4.3571° E</span>
            <span>—</span>
            <span>37.9838° N, 23.7275° E</span>
          </div>
        </div>
      </div>
    </footer>
  );
}