// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('aerata_cookies_accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('aerata_cookies_accepted', 'true');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('aerata_cookies_accepted', 'false');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white border border-border rounded-lg p-6 shadow-2xl"
        >
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            We use cookies to enhance your browsing experience and analyze site traffic. 
            By continuing, you agree to our use of cookies in accordance with our{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
          <div className="flex gap-3">
            <button onClick={accept}
              className="flex-1 px-4 py-2 text-sm font-semibold bg-lime text-white rounded hover:bg-lime/90 transition-colors"
            >
              Accept All
            </button>
            <button onClick={decline}
              className="flex-1 px-4 py-2 text-sm font-semibold border border-border text-muted-foreground rounded hover:border-primary/50 hover:text-foreground transition-colors"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}