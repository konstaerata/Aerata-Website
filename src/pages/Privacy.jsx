// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-16 h-px bg-primary" />
            <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">Legal</span>
          </div>
          <h1 className="font-barlow font-bold text-4xl md:text-5xl text-foreground mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: March 2026</p>
        </motion.div>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">1. Introduction</h2>
            <p>Aerata B.V. ("we," "us," or "our"), registered at Van Leeuwenhoekpark 1, 2611 DW Delft, Netherlands, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website or use our services, in compliance with the General Data Protection Regulation (GDPR).</p>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">2. Data We Collect</h2>
            <p>We may collect the following types of personal data:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Contact information (name, email address, phone number, company name)</li>
              <li>Technical data (IP address, browser type, device information)</li>
              <li>Usage data (pages visited, time spent, interactions)</li>
              <li>Communication data (messages sent through our contact form)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">3. How We Use Your Data</h2>
            <p>We process your personal data for the following purposes:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>To respond to your inquiries and provide our services</li>
              <li>To improve our website and user experience</li>
              <li>To send relevant communications about our services (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">4. Legal Basis</h2>
            <p>We process personal data based on: consent, contractual necessity, legitimate interest, and legal obligations under GDPR Article 6.</p>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">5. Data Sharing</h2>
            <p>We do not sell your personal data. We may share data with trusted service providers who assist in operating our website and delivering our services, all under appropriate data processing agreements.</p>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">6. Cookies</h2>
            <p>Our website uses cookies and similar technologies. You can manage your cookie preferences through the cookie consent banner displayed on your first visit. For more details, please refer to our cookie settings.</p>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">7. Your Rights</h2>
            <p>Under the GDPR, you have the right to access, rectify, erase, restrict, and port your personal data, as well as to object to processing. To exercise these rights, contact us at info@aerata.com.</p>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">8. Data Retention</h2>
            <p>We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.</p>
          </section>

          <section>
            <h2 className="font-barlow font-semibold text-xl text-foreground mb-3">9. Contact</h2>
            <p>For any questions about this Privacy Policy or our data practices, contact us at:</p>
            <p className="mt-2">Aerata B.V.<br />Van Leeuwenhoekpark 1, 2611 DW Delft, Netherlands<br />Email: info@aerata.com<br />Phone: +31 6 38165193</p>
          </section>
        </div>
      </div>
    </div>
  );
}