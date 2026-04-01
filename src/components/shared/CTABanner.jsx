// @ts-nocheck
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTABanner({ title = "Get a Free Consultation Now", subtitle, link = "/contact", buttonText = "Get in Touch" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-20 bg-background border-y border-border relative overflow-hidden"
    >
      {/* Lime accent bar on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime" />
      <div className="absolute inset-0 data-trace opacity-50 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-block text-xs font-oxanium font-semibold tracking-[0.25em] uppercase text-lime mb-4">[ Get Started ]</div>
        <h2 className="font-oxanium font-bold text-3xl md:text-4xl text-foreground mb-4">{title}</h2>
        {subtitle && <p className="text-muted-foreground mb-8 leading-relaxed">{subtitle}</p>}
        <Link to={link}
          className="inline-flex items-center px-8 py-3.5 font-oxanium font-semibold text-sm tracking-wide bg-primary text-white hover:bg-primary/90 transition-all duration-300 rounded"
        >
          {buttonText}
        </Link>
      </div>
    </motion.section>
  );
}