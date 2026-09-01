// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { useLang } from '../lib/LanguageContext';
import { breadcrumbSchema } from '../lib/schemas';

// HubSpot's `css` option forces the form into an iframe and injects this CSS
// into that iframe's <head>. We also import Oxanium here because the parent
// page's fonts are not available inside a cross-origin iframe.
// `cssRequired: ''` strips HubSpot's own default stylesheet so our rules win
// without needing !important.
const HS_BRAND_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  body, form, input, select, textarea, button, label {
    font-family: 'Oxanium', sans-serif;
  }

  /* Field spacing */
  fieldset { max-width: 100%; border: none; padding: 0; margin: 0; }
  .hs-form-field, .field { margin-bottom: 1.25rem; }
  .input { margin-right: 0; }

  /* Labels */
  label {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7a8d;
    margin-bottom: 0.5rem;
    display: block;
  }
  .hs-form-required { color: #7ab648; margin-left: 2px; }

  /* Inputs / selects / textareas */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="phone"],
  input[type="number"],
  select,
  textarea {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    color: #1a2a3a;
    background: #f2f4f6;
    border: 1px solid #ccd3db;
    border-radius: 0.375rem;
    padding: 0.75rem 1rem;
    width: 100%;
    min-height: 2.75rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
    appearance: none;
    box-shadow: none;
  }
  textarea {
    min-height: 8rem;
    resize: vertical;
    line-height: 1.6;
  }
  input::placeholder, textarea::placeholder {
    color: #8fa0b2;
    opacity: 1;
  }

  /* Focus — lime ring */
  input:focus, select:focus, textarea:focus {
    border-color: #7ab648;
    box-shadow: 0 0 0 3px rgba(122, 182, 72, 0.15);
  }

  /* Select chevron */
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23667085' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.875rem center;
    padding-right: 2.5rem;
  }

  /* Validation */
  input.error, select.error, textarea.error, .hs-input.error {
    border-color: #e02d2d;
    box-shadow: none;
  }
  .hs-error-msgs {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    color: #cc2222;
    margin-top: 0.375rem;
    list-style: none;
    padding: 0;
  }

  /* Submit button — brand lime */
  .hs-button {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #7ab648;
    color: #fff;
    border: none;
    border-radius: 0.375rem;
    padding: 0.875rem 2.5rem;
    width: 100%;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .hs-button:hover {
    background: #669d3a;
    box-shadow: 0 4px 16px rgba(122, 182, 72, 0.28);
  }
  .hs-submit { margin-top: 0.5rem; }

  /* Checkbox / radio lists */
  .inputs-list { list-style: none; padding: 0; margin: 0.25rem 0 0; }
  .inputs-list li { margin-bottom: 0.5rem; }
  .inputs-list label {
    font-size: 0.8rem;
    text-transform: none;
    letter-spacing: 0;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: #2a3d52;
  }

  /* GDPR / legal */
  .legal-consent-container,
  .legal-consent-container p {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.7rem;
    color: #6b7a8d;
    line-height: 1.6;
    margin-top: 0.75rem;
  }
  .legal-consent-container a { color: #7ab648; text-decoration: underline; }

  /* Rich text HubSpot injects */
  .hs-richtext, .hs-richtext p {
    font-family: 'Oxanium', sans-serif;
    font-size: 0.8125rem;
    color: #6b7a8d;
    line-height: 1.6;
  }

  /* Success message */
  .submitted-message { font-family: 'Oxanium', sans-serif; text-align: center; padding: 3rem 1.5rem; }
  .submitted-message p { font-size: 0.9375rem; color: #6b7a8d; line-height: 1.7; }
`;

function HubSpotForm() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = 'hs-embed-script';

    const initForm = () => {
      if (window.hbspt && containerRef.current) {
        containerRef.current.innerHTML = '';
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '25483745',
          formId: 'a422dc81-1039-4f10-826b-07d97d32904a',
          target: '#hs-form-container',
          // Strip HubSpot's default stylesheet so our rules are the only ones
          cssRequired: '',
          // Inject our brand CSS into the iframe HubSpot creates
          css: HS_BRAND_CSS,
        });
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.onload = initForm;
      document.head.appendChild(script);
    } else {
      initForm();
    }
  }, []);

  return (
    <div
      id="hs-form-container"
      ref={containerRef}
      className="hs-form-wrapper rounded-lg border border-border/50 bg-card/30 p-8 min-h-[480px]"
    />
  );
}

export default function Contact() {
  const { lang } = useLang();

  return (
    <div>
      <SEO
        title="Contact Aerata — Get a Drone Inspection Quote"
        description="Reach our expert drone team in Delft or Athens. Request a free consultation for thermal, LiDAR, or photogrammetric inspection services across Europe."
        path="/contact"
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact' },
        ], lang)}
      />
      {/* Page title — navy brand background */}
      <section className="relative py-32 pt-40 overflow-hidden bg-navy-dark">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-lime" />
              <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-lime">Contact</span>
            </div>
            <h1 className="font-barlow font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl mb-4">
              Connect With Our<br /><span className="text-lime">Expert Team</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              Ready to explore how drone technology can transform your operations? Get in touch.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* HubSpot Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-4">
                  <span className="text-xs font-mono text-primary/60">// MISSION PARAMETERS</span>
                </div>
                <HubSpotForm />
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-lg border border-border/50 bg-card/30 p-6"
              >
                <h3 className="font-barlow font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">Headquarters — Delft</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" /><span>Aerata B.V., Van Leeuwenhoekpark 1, 2611 DW Delft, Netherlands</span></div>
                  <div className="flex gap-2"><Phone className="w-4 h-4 shrink-0 text-primary/60" /><a href="tel:+31638165193" className="hover:text-primary transition-colors">+31 6 38165193</a></div>
                  <div className="flex gap-2"><Mail className="w-4 h-4 shrink-0 text-primary/60" /><a href="mailto:info@aerata.com" className="hover:text-primary transition-colors">info@aerata.com</a></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-lg border border-border/50 bg-card/30 p-6"
              >
                <h3 className="font-barlow font-semibold text-foreground mb-4 text-sm tracking-wider uppercase">Athens Office</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" /><span>Leoforos Alimou 8, 17455 Alimos, Athens, Greece</span></div>
                  <div className="flex gap-2"><Phone className="w-4 h-4 shrink-0 text-primary/60" /><a href="tel:+306971904421" className="hover:text-primary transition-colors">+30 697 190 4421</a></div>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="rounded-lg overflow-hidden border border-border/50 h-64"
              >
                <iframe
                  title="Aerata HQ Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.234!2d4.3571!3d52.0116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDAwJzQxLjgiTiA0wrAyMScyNS42IkU!5e0!3m2!1sen!2snl!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}