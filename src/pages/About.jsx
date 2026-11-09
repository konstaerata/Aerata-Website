// @ts-nocheck
import React from 'react';
import SEO from '../components/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import FlyoverHero from '../components/about/FlyoverHero';
import { Reveal, Stagger, Item, Spotlight, CountUp } from '../components/motion';
import { MEDIA } from '../lib/media';
import { useLang } from '../lib/LanguageContext';
import { breadcrumbSchema } from '../lib/schemas';
import { PARTNERS as partners, partnerText } from '../lib/partners';

const team = [
  { name: 'Spyridon Konstantinopoulos',     role: 'Founder',                photo: '/team/spyridon-konstantinopoulos.webp', linkedin: 'https://www.linkedin.com/in/spyridon-konstantinopoulos-195ab734/' },
  { name: 'Konstantinos Konstantinopoulos', role: 'Co-Founder',             photo: '/team/konstantinos-konstantinopoulos.webp', linkedin: 'https://www.linkedin.com/in/konstantinos-konstantinopoulos-92067a28a/' },
  { name: 'Markos Foros',                   role: 'Client Relations',       photo: '/team/markos-foros.webp', linkedin: 'https://www.linkedin.com/in/markosforos/' },
  { name: 'Alexandros Lapokonstantakis',    role: 'Operations',             photo: '/team/alexandros-lapokonstantakis.webp', linkedin: 'https://www.linkedin.com/in/alexander-lapokonstantakis-805b30414/' },
  { name: 'Spyros Karapanagiotis',          role: 'Compliance',             photo: '/team/spyros-karapanagiotis.webp', linkedin: 'https://www.linkedin.com/in/spyros-karapanagiotis-833ba3412/' },
];

const initials = (name) => name.split(' ').map((n) => n[0]).join('');

const LinkedInIcon = ({ className = '' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/** All partners at once, in a grid with sector tags. */
function PartnersWall() {
  const { lang } = useLang();
  return (
    <>
      <Stagger gap={0.04} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p) => (
          <Item key={p.name}>
            <Spotlight
              tone="navy"
              className="group h-full flex flex-col justify-between gap-6 p-6 rounded-xl border border-border/60 bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_hsl(210_35%_12%/0.25)]"
            >
              <span className="self-start inline-flex items-center px-2.5 py-1 rounded text-[10px] font-display font-bold tracking-[0.2em] uppercase text-[hsl(88_55%_24%)] bg-lime/10 border border-lime/30">
                {partnerText(p.sector, lang)}
              </span>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground leading-tight group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5">{partnerText(p.rel, lang)}</p>
              </div>
            </Spotlight>
          </Item>
        ))}
      </Stagger>
    </>
  );
}

function TeamCard({ member }) {
  const body = (
    <>
      <span className="relative w-20 h-20 shrink-0 rounded-lg bg-obsidian overflow-hidden flex items-center justify-center">
        <span aria-hidden="true" className="absolute inset-0 hud-grid opacity-80" />
        {member.photo
          ? <img src={member.photo} alt="" width={80} height={80} loading="lazy" decoding="async" className="relative w-full h-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0" />
          : <span className="relative font-display font-bold text-2xl text-lime tracking-tight">{initials(member.name)}</span>}
        <span aria-hidden="true" className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-l border-t border-lime/60" />
        <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-r border-b border-lime/60" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display font-semibold text-foreground text-base leading-snug">{member.name}</span>
        <span className="block text-xs font-display font-semibold tracking-[0.18em] uppercase text-[hsl(88_55%_24%)] mt-1.5">{member.role}</span>
      </span>
      {member.linkedin && (
        <span className="w-9 h-9 shrink-0 rounded-full border border-border flex items-center justify-center text-primary/40 transition-all duration-300 group-hover:text-white group-hover:bg-primary group-hover:border-primary">
          <LinkedInIcon className="w-3.5 h-3.5" />
        </span>
      )}
    </>
  );
  const cls = 'group flex items-center gap-5 p-5 rounded-xl border border-border/60 bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]';

  return member.linkedin ? (
    <Spotlight
      as="a"
      tone="navy"
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${member.name} on LinkedIn`}
      className={`${cls} hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_hsl(210_35%_12%/0.25)]`}
    >
      {body}
    </Spotlight>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function About() {
  const { t, lang } = useLang();

  const aboutJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us' },
  ], lang);

  return (
    <div>
      <SEO
        title="About Aerata B.V. — Drone Inspection Team & Partners"
        description="Meet the Aerata team and partners. Based in Delft, Netherlands, we deliver certified drone inspections for renewable energy, infrastructure, and industrial clients across Europe."
        path="/about"
        jsonLd={aboutJsonLd}
      />
      <FlyoverHero
        video={MEDIA.about_hero_video}
        poster={MEDIA.about_hero_poster}
        badge={t('about.badge')}
        title={t('about.title')}
        highlight={t('about.titleHighlight')}
        description={t('about.description')}
      />

      <section className="py-28 bg-secondary/30 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label={t('about.teamLabel')}
            title={t('about.teamTitle')}
            description={t('about.teamDesc')}
          />
          <Stagger gap={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member) => (
              <Item key={member.name}>
                <TeamCard member={member} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-28 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading
              label={t('about.trustedBy')}
              title={t('about.clientsTitle')}
              description={t('about.clientsDesc')}
              align="left"
            />
            <Reveal className="mb-14 shrink-0 flex items-baseline gap-2 font-display text-muted-foreground">
              <CountUp value={String(partners.length)} className="font-bold text-5xl text-primary tracking-tight" />
              <span className="text-sm">{t('partners.count')}</span>
            </Reveal>
          </div>
          <PartnersWall />
        </div>
      </section>
    </div>
  );
}
