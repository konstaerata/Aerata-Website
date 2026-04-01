// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const serviceOptions = [
  'Aerial Surveying & Mapping',
  'Renewable Energy Inspections',
  'Critical Infrastructure Inspections',
  'Oil & Gas Inspections',
  'Environmental Monitoring',
  'Smart Agriculture',
  'Drone Training',
  'Other',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', service: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // HubSpot Form Submission
      const HUBSPOT_PORTAL_ID = '25483745';
      const HUBSPOT_FORM_ID = 'a422dc81-1039-4f10-826b-07d97d32904a';

      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

      const fields = [
        { name: 'firstname', value: formData.name.split(' ')[0] },
        { name: 'lastname', value: formData.name.split(' ').slice(1).join(' ') || '' },
        { name: 'company', value: formData.company },
        { name: 'email', value: formData.email },
        { name: 'phone', value: formData.phone },
        { name: 'message', value: formData.message },
        { name: 'service_of_interest', value: formData.service },
      ];

      const response = await fetch(hubspotUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: fields,
          context: {
            pageUri: window.location.href,
            pageName: 'Contact Form',
          },
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', company: '', email: '', phone: '', service: '', message: '' });
      } else {
        console.error('HubSpot submission failed:', response.status);
        alert('There was an issue submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-px bg-primary" />
              <span className="text-xs font-barlow font-semibold tracking-[0.25em] uppercase text-primary">Contact</span>
            </div>
            <h1 className="font-barlow font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-3xl mb-4">
              Connect With Our<br /><span className="text-primary">Expert Team</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Ready to explore how drone technology can transform your operations? Get in touch.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 rounded-lg border border-primary/30 bg-primary/5"
                >
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="font-barlow font-bold text-2xl text-foreground mb-2">Mission Confirmed</h2>
                  <p className="text-muted-foreground">Your message has been received. Our team will be in touch shortly.</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="rounded-lg border border-border/50 bg-card/30 p-8"
                >
                  <div className="mb-6">
                    <span className="text-xs font-mono text-primary/60">// MISSION PARAMETERS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">Name *</Label>
                      <Input value={formData.name} onChange={e => handleChange('name', e.target.value)} required className="bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">Company</Label>
                      <Input value={formData.company} onChange={e => handleChange('company', e.target.value)} className="bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">Email *</Label>
                      <Input type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} required className="bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">Phone</Label>
                      <Input type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} className="bg-secondary border-border" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">Service of Interest</Label>
                    <Select value={formData.service} onValueChange={v => handleChange('service', v)}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-8">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">Message *</Label>
                    <Textarea value={formData.message} onChange={e => handleChange('message', e.target.value)} required rows={5} className="bg-secondary border-border" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-3.5 font-barlow font-semibold text-sm tracking-wide border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        Uploading Mission Data...
                      </span>
                    ) : (
                      <>Submit <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </motion.form>
              )}
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