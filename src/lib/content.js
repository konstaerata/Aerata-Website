/**
 * content.js — single source of truth for all site text content
 *
 * HOW TO UPDATE (no code knowledge needed)
 * ─────────────────────────────────────────
 * • To change any text on the site, find the relevant section below
 *   and update the value on the right-hand side of the colon.
 *
 * • Keep text inside the quote marks. Example:
 *     value: 'Your new text here',
 *
 * • To add a new team member, copy an existing team object,
 *   paste it at the end of the array, and fill in the details.
 *
 * • To add a news article, copy an existing article object,
 *   paste it at the end of CONTENT.news.articles, and fill in.
 *
 * • For LinkedIn links: paste the full URL inside the quotes.
 *   Example: linkedin: 'https://www.linkedin.com/in/yourname'
 *   Leave as empty string '' to hide the LinkedIn button.
 *
 * • Dates use the format: new Date('YYYY-MM-DD')
 *
 * NOTE: After editing, save the file. Changes appear on next page load.
 * Media (images/videos) are managed separately in media.js.
 */

export const CONTENT = {

  // ─────────────────────────────────────────────────────────────────────────────
  // HOMEPAGE
  // ─────────────────────────────────────────────────────────────────────────────
  home: {
    stats: [
      {
        value: 1000,
        suffix: '+',
        label: 'Hectares Surveyed',
        qualifier: 'across Europe since 2022',
      },
      {
        value: 50,
        suffix: '%',
        label: 'Reduction in Inspection Time',
        qualifier: 'vs. traditional ground methods',
      },
      {
        value: 100,
        suffix: '%',
        label: 'Certified Pilots & Engineers',
        qualifier: 'EASA Specific Category approved',
      },
    ],

    partners: [
      {
        name: 'EYDAP',
        relationship: 'Water infrastructure inspection client',
      },
      {
        name: 'DJI Enterprise',
        relationship: 'Authorised enterprise platform partner',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABOUT PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  about: {
    team: [
      {
        name: 'Konstantinos Konstantinopoulos',
        role: 'Co-Founder',
        linkedin: '',  // Add LinkedIn URL here when available
      },
      {
        name: 'Michalis Michalas',
        role: 'Co-Founder',
        linkedin: '',
      },
      {
        name: 'Spyridon Konstantinopoulos',
        role: 'Director of Operations',
        linkedin: '',
      },
      {
        name: 'Evie Varthi',
        role: 'Team Member',
        linkedin: '',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CONTACT PAGE
  // ─────────────────────────────────────────────────────────────────────────────
  contact: {
    // Link for "Book a 15-Minute Assessment" — set to a Calendly or HubSpot
    // meeting URL for direct scheduling, or leave as '/contact' for the form
    bookingUrl: '/contact',

    offices: [
      {
        city: 'Delft — Headquarters',
        address: 'Van Leeuwenhoekpark 1, 2611 DW Delft, Netherlands',
        phone: '+31 6 38165193',
        email: 'info@aerata.com',
        timezone: 'Europe/Amsterdam',
      },
      {
        city: 'Athens Office',
        address: 'Leoforos Alimou 8, 17455 Alimos, Athens, Greece',
        phone: '+30 697 190 4421',
        email: 'info@aerata.com',
        timezone: 'Europe/Athens',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SOCIAL MEDIA LINKS
  // ─────────────────────────────────────────────────────────────────────────────
  socials: {
    linkedin: 'https://nl.linkedin.com/company/aerata',
    instagram: 'https://www.instagram.com/aerata_bv/',
    youtube: 'https://www.youtube.com/@aerata6588',
    tiktok: '',  // Add TikTok URL when account is live
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────────────────────────────────────────
  footer: {
    tagline: 'Aerial Intelligence for Industry. Professional drone services for industries that demand precision.',
    vatNumber: 'VAT NL865878742B01',
    kvkNumber: 'KVK 93189395',
    rdwNumber: 'RDW OCO-NL-2023-00054',
  },

};
