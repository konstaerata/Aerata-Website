// @ts-nocheck
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { relatedServices } from '../../lib/services';
import { Stagger, Item, Spotlight } from '../motion';
import SectionHeading from './SectionHeading';

/**
 * In-body cross-links to the other service pages. Nav/footer already link
 * every service from every page, but contextual in-body links pass more
 * topical relevance signal and give users a next step beyond the CTA.
 */
export default function RelatedServices({ current }) {
  const services = relatedServices(current);
  if (services.length === 0) return null;

  return (
    <section className="py-24 bg-secondary/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading label="Explore More" title="Related Services" align="left" />
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <Item key={service.key}>
              <Spotlight as={Link} tone="navy" to={service.path} className="group block h-full p-7 rounded-xl border border-border/60 bg-card transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_hsl(210_35%_12%/0.25)]">
                <span className="block font-mono text-[11px] tracking-[0.2em] text-muted-foreground mb-6 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-xs font-display font-semibold tracking-wider uppercase text-primary">
                  Learn more <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Spotlight>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
