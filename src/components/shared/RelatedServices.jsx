// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { relatedServices } from '../../lib/services';

/**
 * In-body cross-links to the other service pages. Nav/footer already link
 * every service from every page, but contextual in-body links pass more
 * topical relevance signal and give users a next step beyond the CTA.
 */
export default function RelatedServices({ current }) {
  const services = relatedServices(current);
  if (services.length === 0) return null;

  return (
    <section className="py-20 bg-secondary/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-px bg-primary" />
          <span className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-primary">Explore More</span>
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-10">Related Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={service.path}
                className="group block h-full p-6 rounded-xl border border-border/50 bg-card/40 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  Learn more <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
