// @ts-nocheck
/**
 * Trusted partners, shown in the Home strip (PartnersSection) and the About
 * page wall. Labels follow each company's own public description (checked
 * 2026-11-09). `home: false` keeps a partner off the Home strip.
 */
export const PARTNERS = [
  { name: 'iSOLAR',                       sector: 'Solar Energy',        rel: 'Solar EPC contractor' },
  { name: 'Voltalia',                     sector: 'Renewable Energy',    rel: 'Renewable energy producer & service provider' },
  { name: 'EDF power solutions',          sector: 'Renewable Energy',    rel: 'Renewable energy developer & operator' },
  { name: 'VITO',                         sector: 'Research',            rel: 'Flemish research institute for sustainable technology' },
  { name: 'EYDAP',                        sector: 'Water Infrastructure', rel: 'Athens water & sewerage utility' },
  { name: 'Elica Group',                  sector: 'Wind & Solar',        rel: 'Wind & solar park operator' },
  { name: 'Sunel',                        sector: 'Solar Energy',        rel: 'Solar EPC contractor & developer' },
  { name: 'ABO Energy',                   sector: 'Wind & Solar',        rel: 'Renewable energy developer' },
  { name: 'Metlen',                       sector: 'Energy',              rel: 'Energy & metals group' },
  { name: 'VALOREM',                      sector: 'Renewable Energy',    rel: 'Renewable energy developer & operator' },
  { name: 'STR Power Group',              sector: 'Solar & Rail',        rel: 'Solar & railway electromechanical contractor' },
  { name: 'EMBIRIA Consulting Engineers', sector: 'Engineering',         rel: 'Electromechanical engineering consultancy', home: false },
  { name: 'DJI Enterprise',               sector: 'Technology',          rel: 'Drone technology manufacturer' },
];

/** Greek labels (company names stay as they are). */
const EL = {
  'Solar EPC contractor': 'Εργολάβος EPC φωτοβολταϊκών',
  'Renewable energy producer & service provider': 'Παραγωγός ΑΠΕ και πάροχος υπηρεσιών',
  'Renewable energy developer & operator': 'Εταιρεία ανάπτυξης και λειτουργίας ΑΠΕ',
  'Flemish research institute for sustainable technology': 'Φλαμανδικό ερευνητικό ινστιτούτο βιώσιμης τεχνολογίας',
  'Athens water & sewerage utility': 'Εταιρεία ύδρευσης και αποχέτευσης Αθηνών',
  'Wind & solar park operator': 'Φορέας αιολικών και φωτοβολταϊκών πάρκων',
  'Solar EPC contractor & developer': 'Εργολάβος EPC και εταιρεία ανάπτυξης φωτοβολταϊκών',
  'Renewable energy developer': 'Εταιρεία ανάπτυξης ΑΠΕ',
  'Energy & metals group': 'Όμιλος ενέργειας και μετάλλων',
  'Solar & railway electromechanical contractor': 'Ηλεκτρομηχανολογικός εργολάβος φωτοβολταϊκών και σιδηροδρόμων',
  'Electromechanical engineering consultancy': 'Σύμβουλοι ηλεκτρομηχανολόγοι μηχανικοί',
  'Drone technology manufacturer': 'Κατασκευαστής τεχνολογίας drone',
  'Solar Energy': 'Ηλιακή ενέργεια',
  'Renewable Energy': 'Ανανεώσιμη ενέργεια',
  'Research': 'Έρευνα',
  'Water Infrastructure': 'Υποδομές ύδρευσης',
  'Wind & Solar': 'Αιολικά & φωτοβολταϊκά',
  'Energy': 'Ενέργεια',
  'Solar & Rail': 'Φωτοβολταϊκά & σιδηρόδρομος',
  'Engineering': 'Μηχανική',
  'Technology': 'Τεχνολογία',
};

/** A partner label (rel or sector) in the page language. */
export const partnerText = (text, lang) => (lang === 'el' && EL[text]) || text;
