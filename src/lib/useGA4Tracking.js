import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Sends a GA4 page_view on every client-side route change. gtag's automatic
 * page_view (config's default send_page_view) only fires once on initial
 * script load, which in a client-side-routed SPA means every subsequent
 * route change would otherwise go untracked — so it's disabled in index.html
 * (send_page_view: false) and sent manually here instead, mirroring the
 * existing useHubSpotTracking hook.
 */
export function useGA4Tracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);
}

/**
 * Sitewide click tracking for the conversion-relevant link types the
 * business cares about: phone, email, and outbound (off-site) links.
 * Delegated to a single document-level listener rather than instrumenting
 * every tel:/mailto: link individually across Navbar/Footer/Contact/etc,
 * so newly added links are tracked automatically without extra wiring.
 * Mount once at the app root.
 */
export function useGA4ClickTracking() {
  useEffect(() => {
    function handleClick(event) {
      if (typeof window.gtag !== 'function') return;
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href.startsWith('tel:')) {
        window.gtag('event', 'phone_click', { phone_number: href.replace('tel:', '') });
      } else if (href.startsWith('mailto:')) {
        window.gtag('event', 'email_click', { email: href.replace('mailto:', '') });
      } else if (/^https?:\/\//.test(href) && !href.includes(window.location.hostname)) {
        window.gtag('event', 'outbound_click', { link_url: href, link_text: link.textContent?.trim().slice(0, 100) });
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
