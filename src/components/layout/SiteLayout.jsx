import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from '../CookieConsent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function SiteLayout() {
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  const altitude = Math.round(400 - (progress / 100) * 400);

  return (
    <div className="min-h-screen bg-background relative">
      <ScrollToTop />
      <Navbar />
      
      {/* Altitude Scroll Bar */}
      <div className="fixed right-3 top-24 bottom-24 w-px bg-border z-30 hidden xl:block">
        <div className="absolute top-0 w-px transition-all duration-100" style={{ height: `${progress}%`, background: 'hsl(88 48% 52%)' }} />
        <div className="absolute w-8 -left-3.5 text-[9px] font-mono transition-all duration-100" style={{ top: `${progress}%`, color: 'hsl(200 38% 28%)' }}>
          {altitude}ft
        </div>
      </div>

      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}