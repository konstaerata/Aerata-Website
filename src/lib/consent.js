/**
 * consent.js — cookie consent for the whole site.
 *
 * Nothing that sets non-essential cookies loads until the visitor chooses:
 *   analytics  → Google Analytics 4 + HubSpot tracking
 *   marketing  → advertising signals (Google Ads via Consent Mode, HubSpot ads)
 * Google Consent Mode v2 starts "denied"; HubSpot is told the choice through
 * its consent API before its script loads.
 *
 * The choice is stored as { v, ts, analytics, marketing } and asked again
 * after 12 months or when CONSENT_VERSION changes. The old
 * `aerata_cookies_accepted` flag is kept in sync for existing readers.
 */

const KEY = 'aerata_consent';
const LEGACY_KEY = 'aerata_cookies_accepted';
export const CONSENT_VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
const GA_ID = 'G-M55H84G01Q';
const HUBSPOT_ID = '25483745';
const EVENT = 'aerata:consent';
const OPEN_EVENT = 'aerata:consent-open';

/** The stored choice, or null when the visitor hasn't chosen (or it expired). */
export function getConsent() {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!c || c.v !== CONSENT_VERSION || Date.now() - c.ts > MAX_AGE_MS) return null;
    return c;
  } catch {
    return null;
  }
}

let loaded = { ga: false, hubspot: false };

function addScript(id, src) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function gtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    // Same shape as Google's snippet: gtag queues arguments onto dataLayer.
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
  }
  return window.gtag;
}

function consentModeFields(c) {
  const ads = c.marketing ? 'granted' : 'denied';
  return {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

/** Loads (or updates) the tools the visitor agreed to. Safe to call repeatedly. */
function apply(c) {
  if (!c) return;
  const gtag = gtagStub();
  if (!loaded.ga) {
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', functionality_storage: 'granted', security_storage: 'granted' });
    gtag('set', 'ads_data_redaction', true);
  }
  gtag('consent', 'update', consentModeFields(c));

  if (c.analytics && !loaded.ga) {
    loaded.ga = true;
    gtag('js', new Date());
    // Page views are sent per route by useGA4Tracking (SPA); send this one now.
    gtag('config', GA_ID, { send_page_view: false });
    addScript('ga4-loader', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    gtag('event', 'page_view', { page_path: location.pathname + location.search, page_location: location.href, page_title: document.title });
  }

  // HubSpot honours this before its script sets any cookie.
  const hsp = (window._hsp = window._hsp || []);
  hsp.push(['setHubSpotConsent', { analytics: !!c.analytics, advertisement: !!c.marketing, functionality: true }]);
  if (c.analytics && !loaded.hubspot) {
    loaded.hubspot = true;
    addScript('hs-script-loader', `https://js-eu1.hs-scripts.com/${HUBSPOT_ID}.js`);
  }
}

const TRACKING_COOKIE = /^(_ga|_ga_.*|_gid|_gcl_.*|__hstc|__hssc|__hssrc|hubspotutk|__hs_.*|messagesUtk)$/;

function clearTrackingCookies() {
  const host = location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim();
    if (!TRACKING_COOKIE.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}

/** Saves the visitor's choice and applies it. */
export function setConsent({ analytics, marketing }) {
  const prev = getConsent();
  const c = { v: CONSENT_VERSION, ts: Date.now(), analytics: !!analytics, marketing: !!marketing };
  localStorage.setItem(KEY, JSON.stringify(c));
  localStorage.setItem(LEGACY_KEY, c.analytics || c.marketing ? 'true' : 'false');
  window.dispatchEvent(new CustomEvent(EVENT, { detail: c }));

  const withdrawn = (prev?.analytics && !c.analytics) || (prev?.marketing && !c.marketing) || ((loaded.ga || loaded.hubspot) && !c.analytics);
  if (withdrawn) {
    // Already-loaded scripts can't be unloaded: tell them, clear their cookies, reload clean.
    gtagStub()('consent', 'update', consentModeFields(c));
    (window._hsp = window._hsp || []).push(['revokeCookieConsent']);
    clearTrackingCookies();
    location.reload();
    return;
  }
  apply(c);
}

/** Applies a previously stored choice on page load. Call once at startup. */
export function initConsent() {
  if (typeof window === 'undefined') return;
  apply(getConsent());
}

/** Reopens the consent banner (footer "Cookie settings" link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export const CONSENT_EVENTS = { change: EVENT, open: OPEN_EVENT };
