// @ts-nocheck
import React from 'react';
import { useLang } from '../../lib/LanguageContext';
import { Marquee, Reveal, Scramble, CountUp } from '../motion';

const partners = [
  { name: 'iSOLAR',                         relationship: 'Solar farm maintenance company' },
  { name: 'Voltalia',                        relationship: 'Renewable energy producer' },
  { name: 'EDF Renewables',                 relationship: 'Global energy company' },
  { name: 'VITO',                            relationship: 'Flemish research institute' },
  { name: 'EYDAP',                           relationship: 'Water utility provider' },
  { name: 'Elicas Group',                    relationship: 'Wind energy developer' },
  { name: 'Sunel',                           relationship: 'Solar energy company' },
  { name: 'ABO WIND',                        relationship: 'Renewable energy developer' },
  { name: 'Metlen',                           relationship: 'Renewable energy company' },
  { name: 'VALOREM',                         relationship: 'Renewable energy developer' },
  { name: 'STR Power Group',                 relationship: 'Solar EPC contractor' },
  { name: 'DJI Enterprise',                  relationship: 'Drone technology manufacturer' },
];

const rows = [partners.slice(0, 6), partners.slice(6)];

/** Greek partner descriptions (names stay as they are). */
const RELATIONSHIP_EL = {
  'Solar farm maintenance company': 'Εταιρεία συντήρησης φωτοβολταϊκών',
  'Renewable energy producer': 'Παραγωγός ανανεώσιμης ενέργειας',
  'Global energy company': 'Διεθνής εταιρεία ενέργειας',
  'Flemish research institute': 'Φλαμανδικό ερευνητικό ινστιτούτο',
  'Water utility provider': 'Εταιρεία ύδρευσης',
  'Wind energy developer': 'Εταιρεία ανάπτυξης αιολικών',
  'Solar energy company': 'Εταιρεία ηλιακής ενέργειας',
  'Renewable energy developer': 'Εταιρεία ανάπτυξης ΑΠΕ',
  'Renewable energy company': 'Εταιρεία ανανεώσιμης ενέργειας',
  'Solar EPC contractor': 'Εργολάβος EPC φωτοβολταϊκών',
  'Drone technology manufacturer': 'Κατασκευαστής τεχνολογίας drone',
};

function PartnerChip({ partner }) {
  const { lang } = useLang();
  return (
    <div className="group shrink-0 flex items-center gap-4 h-[76px] pl-5 pr-7 rounded-xl border border-border/70 bg-card transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-lime/50 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-16px_hsl(210_35%_12%/0.3)]">
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary/30 transition-colors duration-500 group-hover:bg-lime" />
      <div>
        <span className="block font-display font-semibold text-[15px] tracking-wide text-primary leading-tight whitespace-nowrap">
          {partner.name}
        </span>
        <span className="block text-xs text-muted-foreground mt-0.5 whitespace-nowrap">
          {lang === 'el' ? RELATIONSHIP_EL[partner.relationship] || partner.relationship : partner.relationship}
        </span>
      </div>
    </div>
  );
}

export default function PartnersSection() {
  const { t } = useLang();

  return (
    <section className="relative py-20 overflow-hidden border-y border-border/40" style={{ backgroundColor: 'hsl(210, 22%, 96%)' }}>
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, hsl(88, 48%, 52%) 40%, hsl(88, 48%, 52%) 60%, transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(31,50,65,0.10) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          opacity: 0.5,
        }}
      />

      <div className="relative">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[hsl(88_55%_34%)]" aria-hidden="true" />
            <Scramble
              text={t('partners.label')}
              className="text-[11px] font-display font-bold tracking-[0.3em] uppercase text-primary"
            />
          </div>
          <p className="text-[11px] font-display font-semibold tracking-[0.25em] uppercase text-primary/70">
            <CountUp value={String(partners.length)} duration={1.2} /> {t('partners.count')}
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Marquee speed={48}>
            {rows[0].map((p) => <PartnerChip key={p.name} partner={p} />)}
          </Marquee>
          <div className="[&_.marquee__track]:[animation-direction:reverse]">
            <Marquee speed={54}>
              {rows[1].map((p) => <PartnerChip key={p.name} partner={p} />)}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
