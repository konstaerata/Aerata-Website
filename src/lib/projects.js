/**
 * projects.js — centralized project database
 *
 * Used across service pages to showcase real completed work.
 * To add a project, add an entry to the relevant service array below.
 * Each entry is displayed as a card in the ServiceProjects section.
 *
 * Fields:
 *   name    — project/client title (shown as card heading)
 *   desc    — 1-2 sentence generated description
 *   spec    — optional key metric (MW, km, ha, etc.) shown as a badge
 *   year    — optional year string
 *   country — optional country/region for context
 *   tag     — short category label for the badge
 *   featured — if true, card gets a lime accent border
 */

// ── Renewable Energy (Solar) ─────────────────────────────────────────────────
export const solarProjects = [
  {
    name: 'Isolar PV Portfolio',
    desc: 'IEC 62446-3 compliant aerial thermographic and RGB inspection across a multi-site solar portfolio in Greece. Anomaly reports delivered per site within 48 hours.',
    spec: '237 MWp',
    year: '2024',
    country: 'Greece',
    tag: 'Thermography',
    featured: true,
  },
  {
    name: 'Kopaida Solar Park — AI Anomaly Detection',
    desc: 'Thermographic inspection with AI-powered fault classification. Over 500 anomalies categorised by type and revenue impact for maintenance prioritisation.',
    spec: '71.3 MW',
    year: '2024',
    country: 'Greece',
    tag: 'AI + Thermal',
    featured: true,
  },
  {
    name: 'Tichero PV Thermal Inspection',
    desc: 'IEC-compliant thermal data acquisition and defect reporting for a utility-scale solar park in central Greece.',
    spec: '45.6 MW',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Sitemark PV Thermal Inspection',
    desc: 'High-resolution thermal data acquisition and structured defect report delivered in IEC 62446-3 format.',
    spec: '75 MW',
    year: '2023',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: '35 MWp Solar — Thiva',
    desc: 'IEC-compliant thermal and RGB inspection with automated anomaly detection and severity classification.',
    spec: '35 MWp',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'EDF Renewables Hellas — IEC Inspection',
    desc: 'Thermal mapping and AI-based anomaly detection for EDF Renewables solar assets in Greece.',
    year: '2023',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Voltalia Greece — RGB & Thermal Mapping',
    desc: 'Aerial thermal and visual mapping across multiple Voltalia solar assets. Anomaly detection with structured reporting.',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'RGB & Thermal Mapping — Finland',
    desc: 'Aerial thermal and RGB inspection for solar assets in Finland, demonstrating northern European operational capability.',
    year: '2023',
    country: 'Finland',
    tag: 'Thermography',
  },
  {
    name: 'RGB & Thermal Mapping — Czech Republic',
    desc: 'Cross-border thermal inspection and anomaly mapping for solar assets in the Czech Republic.',
    year: '2023',
    country: 'Czech Republic',
    tag: 'Thermography',
  },
  {
    name: 'Isolar Kilkis',
    desc: 'Thermal inspection for fault identification and panel performance monitoring.',
    spec: '2 MW',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'EDF Skala Korinis',
    desc: 'Thermal mapping and anomaly detection for EDF solar energy assets in Greece.',
    year: '2023',
    country: 'Greece',
    tag: 'Thermography',
  },
  {
    name: 'IEC Thermography — Anthili & Kanalaki',
    desc: 'IEC-compliant thermographic data acquisition across two sites simultaneously.',
    spec: 'IEC 3 cm GSD',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Delfini No. 451 — Thermal Series',
    desc: 'Multiple IEC-compliant thermal data acquisition campaigns at various GSDs for solar park optimisation.',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'Alexandroupoli PV — Solar Thermography',
    desc: 'Thermal mapping and IEC-compliant data acquisition for solar assets in north-eastern Greece.',
    year: '2024',
    country: 'Greece',
    tag: 'IEC Thermal',
  },
  {
    name: 'STR Power Group — Delfini Project',
    desc: 'IEC-compliant thermal mapping and anomaly detection for solar energy assets.',
    year: '2024',
    country: 'Greece',
    tag: 'Thermography',
  },
];

// ── Wind Energy ───────────────────────────────────────────────────────────────
export const windProjects = [
  {
    name: 'Sulzer & Schmid Laboratories — Turbine Inspections',
    desc: 'Collaborative blade inspection programme with Sulzer Schmid Laboratories AG using 3DX photogrammetric reconstruction. Full-surface defect cataloguing and condition reports for multiple wind parks.',
    year: '2023',
    country: 'Greece',
    tag: '3DX / Blades',
    featured: true,
  },
  {
    name: 'Wind Parks of Crete — Elica Group',
    desc: 'Aerial mapping and topographical modelling for wind farm access routes, site planning, and regulatory documentation in Crete.',
    year: '2024',
    country: 'Greece',
    tag: 'Survey',
  },
  {
    name: 'Wind Parks of Crete — HELIKA S.A.',
    desc: 'Aerial photogrammetric survey and terrain modelling for wind farm access routes and installation planning in Crete.',
    year: '2024',
    country: 'Greece',
    tag: 'Survey',
  },
  {
    name: 'VALOREM — Mount Ipatio Wind Park',
    desc: 'Aerial photography and topographical surveying for a wind park installation in central Greece.',
    year: '2023',
    country: 'Greece',
    tag: 'Survey',
  },
  {
    name: 'Elica Group Sitia 2026',
    desc: 'Route planning and terrain modelling for next-generation wind farm development in eastern Crete.',
    year: '2025',
    country: 'Greece',
    tag: 'Planning',
  },
];

// ── LiDAR & Surveying ─────────────────────────────────────────────────────────
export const lidarProjects = [
  {
    name: 'Zagori LiDAR Survey',
    desc: 'High-density aerial LiDAR survey across remote mountainous terrain in Epirus. Sub-centimetre DTMs and classified water stream networks for hydraulic study and flood risk assessment.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Hydrology',
    featured: true,
  },
  {
    name: 'Messinia – Oichalia LiDAR Survey',
    desc: 'High-density LiDAR and terrain modelling for water stream classification and infrastructure planning in the Peloponnese.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Hydrology',
  },
  {
    name: 'Livadia — Drone Survey for Hydraulic Study',
    desc: 'Aerial LiDAR survey and topographical modelling for water streams and flood risk assessment in central Greece.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Hydrology',
  },
  {
    name: 'FARSALA Project',
    desc: 'Aerial mapping using LiDAR and photogrammetry for large-scale land development and infrastructure planning.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Survey',
  },
  {
    name: 'Drama LiDAR Survey (Sitemark)',
    desc: 'Aerial LiDAR data acquisition and 3D point cloud classification for solar construction site planning.',
    year: '2024',
    country: 'Greece',
    tag: 'LiDAR / Construction',
  },
  {
    name: 'Aerial Scan — Wastewater Treatment Plant',
    desc: 'Precision LiDAR scanning and 3D modelling for wastewater treatment facility condition assessment and expansion planning.',
    year: '2023',
    country: 'Greece',
    tag: 'LiDAR / Industrial',
    featured: true,
  },
  {
    name: 'SSSC-9 — Topographical Mapping',
    desc: 'Topographical contour mapping for land boundaries and solar park development.',
    spec: '2.73 MW',
    year: '2024',
    country: 'Greece',
    tag: 'Topography',
  },
  {
    name: 'Survey Projects — Kalamaki, Pyrgaki, Agios Nikolaos',
    desc: 'A series of aerial surveying and topographical mapping projects for land development and planning approvals across the Peloponnese.',
    year: '2023',
    country: 'Greece',
    tag: 'Survey',
  },
];

// ── Construction Monitoring ───────────────────────────────────────────────────
export const constructionProjects = [
  {
    name: 'Infinity Project — Advanced Construction Monitoring',
    desc: 'Continuous drone-powered monitoring with automated progress tracking, 3D modelling, and as-built versus design comparison for a large-scale solar construction project.',
    year: '2024',
    country: 'Greece',
    tag: 'Progress Tracking',
    featured: true,
  },
  {
    name: 'Alexandroupoli PV — Construction Monitoring',
    desc: 'Aerial data acquisition and orthomosaic mapping for ongoing progress monitoring at a utility-scale solar construction site.',
    year: '2024',
    country: 'Greece',
    tag: 'SCM',
  },
  {
    name: 'Pteleonas Solar (Sitemark)',
    desc: 'Regular aerial surveys and Sitemark-integrated reporting for solar construction progress tracking.',
    spec: '15 MW',
    year: '2024',
    country: 'Greece',
    tag: 'SCM / Sitemark',
  },
  {
    name: 'Tichero — Solar Construction (Sitemark)',
    desc: 'Automated aerial progress monitoring integrated with Sitemark project management platform.',
    year: '2024',
    country: 'Greece',
    tag: 'SCM / Sitemark',
  },
  {
    name: 'Solar Construction Monitoring — 160 ha',
    desc: 'Large-footprint construction monitoring covering 160 hectares. Volume calculations and change detection delivered on weekly survey cycles.',
    spec: '160 ha',
    year: '2023',
    country: 'Greece',
    tag: 'Large-Scale SCM',
  },
  {
    name: 'Solar Construction Monitoring — 100 ha',
    desc: 'Aerial progress monitoring across a 100-hectare solar construction site with automated change detection.',
    spec: '100 ha',
    year: '2023',
    country: 'Greece',
    tag: 'SCM',
  },
  {
    name: 'Embiria Consultancy — Anthili',
    desc: 'Aerial data acquisition and ground surveys for civil works monitoring at a major solar construction project.',
    year: '2024',
    country: 'Greece',
    tag: 'SCM',
  },
];

// ── Environmental & Water ────────────────────────────────────────────────────
export const environmentalProjects = [
  {
    name: 'Lake Marathon Multispectral Survey — VITO × EYDAP',
    desc: 'Multispectral drone monitoring of the primary drinking water reservoir for Athens. NDWI and chlorophyll indices established a water quality baseline in collaboration with VITO (Belgium) and EYDAP.',
    year: '2023',
    country: 'Greece',
    tag: 'Water Quality',
    featured: true,
  },
  {
    name: 'Aerial Scan — Wastewater Treatment Plant',
    desc: 'Precision LiDAR scanning and 3D modelling for a wastewater treatment facility, enabling condition assessment and upgrade planning.',
    year: '2023',
    country: 'Greece',
    tag: 'Industrial',
  },
  {
    name: 'Koewacht Air Watchtower',
    desc: 'Aerial RGB photography supporting structural inspection and aerial surveillance operations in the Netherlands.',
    year: '2023',
    country: 'Netherlands',
    tag: 'Structural',
  },
];

// ── Training & Specialist Ops ────────────────────────────────────────────────
export const specialistProjects = [
  {
    name: 'Thermography Training Programme — Greece',
    desc: 'On-site thermography training sessions for local drone operators, covering flight protocols, thermal sensor calibration, and IEC-compliant data capture workflows.',
    year: '2023',
    country: 'Greece',
    tag: 'Training',
    featured: true,
  },
  {
    name: 'Search and Rescue — Johann Williams',
    desc: 'Drone software and equipment support for a live search and rescue operation, demonstrating Aerata\'s capability in time-critical specialist deployments.',
    year: '2023',
    tag: 'SAR',
    featured: true,
  },
  {
    name: 'ABO WIND Thesprotia — 3D Renderings',
    desc: 'Photorealistic 3D aerial renderings for wind park development planning and stakeholder communication in north-western Greece.',
    year: '2024',
    country: 'Greece',
    tag: '3D Visualisation',
  },
];

// ── Greek ────────────────────────────────────────────────────────────────────
// Descriptions and tag labels for the project cards, keyed by project name
// (names are proper names and stay as they are).
const DESC_EL = {
  'Isolar PV Portfolio': 'Αεροθερμογραφική και RGB επιθεώρηση κατά IEC 62446-3 σε χαρτοφυλάκιο φωτοβολταϊκών σταθμών στην Ελλάδα. Αναφορές ανωμαλιών ανά σταθμό μέσα σε 48 ώρες.',
  'Kopaida Solar Park — AI Anomaly Detection': 'Θερμογραφική επιθεώρηση με ταξινόμηση βλαβών μέσω AI. Πάνω από 500 ανωμαλίες κατηγοριοποιημένες ανά τύπο και επίπτωση στα έσοδα, για την ιεράρχηση της συντήρησης.',
  'Tichero PV Thermal Inspection': 'Συλλογή θερμικών δεδομένων και αναφορά βλαβών κατά IEC για μεγάλο φωτοβολταϊκό σταθμό στην κεντρική Ελλάδα.',
  'Sitemark PV Thermal Inspection': 'Συλλογή θερμικών δεδομένων υψηλής ανάλυσης και δομημένη αναφορά βλαβών σε μορφή IEC 62446-3.',
  '35 MWp Solar — Thiva': 'Θερμική και RGB επιθεώρηση κατά IEC με αυτόματο εντοπισμό ανωμαλιών και ταξινόμηση σοβαρότητας.',
  'EDF Renewables Hellas — IEC Inspection': 'Θερμική χαρτογράφηση και εντοπισμός ανωμαλιών με AI για τα φωτοβολταϊκά της EDF Renewables στην Ελλάδα.',
  'Voltalia Greece — RGB & Thermal Mapping': 'Εναέρια θερμική και οπτική χαρτογράφηση σε πολλούς φωτοβολταϊκούς σταθμούς της Voltalia, με εντοπισμό ανωμαλιών και δομημένες αναφορές.',
  'RGB & Thermal Mapping — Finland': 'Εναέρια θερμική και RGB επιθεώρηση φωτοβολταϊκών στη Φινλανδία, με επιχειρησιακή ικανότητα και στη βόρεια Ευρώπη.',
  'RGB & Thermal Mapping — Czech Republic': 'Διασυνοριακή θερμογραφική επιθεώρηση και χαρτογράφηση ανωμαλιών φωτοβολταϊκών στην Τσεχία.',
  'Isolar Kilkis': 'Θερμογραφική επιθεώρηση για τον εντοπισμό βλαβών και την παρακολούθηση της απόδοσης των πάνελ.',
  'EDF Skala Korinis': 'Θερμική χαρτογράφηση και εντοπισμός ανωμαλιών στα φωτοβολταϊκά της EDF στην Ελλάδα.',
  'IEC Thermography — Anthili & Kanalaki': 'Συλλογή θερμογραφικών δεδομένων κατά IEC σε δύο σταθμούς ταυτόχρονα.',
  'Delfini No. 451 — Thermal Series': 'Πολλαπλές καμπάνιες συλλογής θερμικών δεδομένων κατά IEC σε διαφορετικά GSD, για τη βελτιστοποίηση του σταθμού.',
  'Alexandroupoli PV — Solar Thermography': 'Θερμική χαρτογράφηση και συλλογή δεδομένων κατά IEC για φωτοβολταϊκά στη βορειοανατολική Ελλάδα.',
  'STR Power Group — Delfini Project': 'Θερμική χαρτογράφηση κατά IEC και εντοπισμός ανωμαλιών σε φωτοβολταϊκούς σταθμούς.',
  'Sulzer & Schmid Laboratories — Turbine Inspections': 'Πρόγραμμα επιθεώρησης πτερυγίων σε συνεργασία με τη Sulzer Schmid Laboratories AG, με φωτογραμμετρική ανακατασκευή 3DX. Πλήρης καταγραφή φθορών της επιφάνειας και αναφορές κατάστασης για πολλά αιολικά πάρκα.',
  'Wind Parks of Crete — Elica Group': 'Εναέρια χαρτογράφηση και τοπογραφική μοντελοποίηση για δρόμους πρόσβασης, χωροθέτηση και αδειοδότηση αιολικών πάρκων στην Κρήτη.',
  'Wind Parks of Crete — HELIKA S.A.': 'Εναέρια φωτογραμμετρική αποτύπωση και μοντελοποίηση εδάφους για δρόμους πρόσβασης και τον σχεδιασμό εγκατάστασης αιολικών πάρκων στην Κρήτη.',
  'VALOREM — Mount Ipatio Wind Park': 'Αεροφωτογράφιση και τοπογραφική αποτύπωση για την εγκατάσταση αιολικού πάρκου στην κεντρική Ελλάδα.',
  'Elica Group Sitia 2026': 'Σχεδιασμός διαδρομών και μοντελοποίηση εδάφους για νέα αιολικά πάρκα στην ανατολική Κρήτη.',
  'Zagori LiDAR Survey': 'Αποτύπωση LiDAR υψηλής πυκνότητας σε απομακρυσμένο ορεινό έδαφος στην Ήπειρο. Μοντέλα εδάφους υψηλής ακρίβειας και ταξινομημένο υδρογραφικό δίκτυο για υδραυλική μελέτη και εκτίμηση κινδύνου πλημμύρας.',
  'Messinia – Oichalia LiDAR Survey': 'LiDAR υψηλής πυκνότητας και μοντελοποίηση εδάφους για ταξινόμηση ρεμάτων και σχεδιασμό υποδομών στην Πελοπόννησο.',
  'Livadia — Drone Survey for Hydraulic Study': 'Εναέρια αποτύπωση LiDAR και τοπογραφική μοντελοποίηση ρεμάτων για εκτίμηση κινδύνου πλημμύρας στην κεντρική Ελλάδα.',
  'FARSALA Project': 'Εναέρια χαρτογράφηση με LiDAR και φωτογραμμετρία για μεγάλης κλίμακας ανάπτυξη γης και σχεδιασμό υποδομών.',
  'Drama LiDAR Survey (Sitemark)': 'Εναέρια συλλογή δεδομένων LiDAR και ταξινόμηση τρισδιάστατου νέφους σημείων για τον σχεδιασμό εργοταξίου φωτοβολταϊκού σταθμού.',
  'Aerial Scan — Wastewater Treatment Plant': 'Σάρωση LiDAR ακριβείας και τρισδιάστατη μοντελοποίηση εγκατάστασης επεξεργασίας λυμάτων, για αξιολόγηση κατάστασης και σχεδιασμό αναβάθμισης.',
  'SSSC-9 — Topographical Mapping': 'Τοπογραφική χαρτογράφηση με ισοϋψείς για όρια ιδιοκτησίας και την ανάπτυξη φωτοβολταϊκού σταθμού.',
  'Survey Projects — Kalamaki, Pyrgaki, Agios Nikolaos': 'Σειρά εναέριων αποτυπώσεων και τοπογραφικών χαρτογραφήσεων για ανάπτυξη γης και αδειοδοτήσεις στην Πελοπόννησο.',
  'Infinity Project — Advanced Construction Monitoring': 'Συνεχής παρακολούθηση με drone, με αυτόματη καταγραφή προόδου, τρισδιάστατη μοντελοποίηση και σύγκριση κατασκευής με τη μελέτη, για μεγάλο έργο κατασκευής φωτοβολταϊκού σταθμού.',
  'Alexandroupoli PV — Construction Monitoring': 'Εναέρια συλλογή δεδομένων και ορθομωσαϊκή χαρτογράφηση για τη συνεχή παρακολούθηση προόδου σε εργοτάξιο μεγάλου φωτοβολταϊκού σταθμού.',
  'Pteleonas Solar (Sitemark)': 'Τακτικές εναέριες αποτυπώσεις και αναφορές ενσωματωμένες στο Sitemark για την παρακολούθηση της προόδου κατασκευής φωτοβολταϊκού.',
  'Tichero — Solar Construction (Sitemark)': 'Αυτοματοποιημένη εναέρια παρακολούθηση προόδου, ενσωματωμένη στην πλατφόρμα διαχείρισης έργων Sitemark.',
  'Solar Construction Monitoring — 160 ha': 'Παρακολούθηση κατασκευής σε έκταση 160 εκταρίων. Υπολογισμοί όγκων και εντοπισμός μεταβολών σε εβδομαδιαίο κύκλο αποτυπώσεων.',
  'Solar Construction Monitoring — 100 ha': 'Εναέρια παρακολούθηση προόδου σε εργοτάξιο φωτοβολταϊκού 100 εκταρίων, με αυτόματο εντοπισμό μεταβολών.',
  'Embiria Consultancy — Anthili': 'Εναέρια συλλογή δεδομένων και αποτυπώσεις εδάφους για την παρακολούθηση έργων πολιτικού μηχανικού σε μεγάλο εργοτάξιο φωτοβολταϊκού.',
  'Lake Marathon Multispectral Survey — VITO × EYDAP': 'Πολυφασματική παρακολούθηση με drone του κύριου ταμιευτήρα πόσιμου νερού της Αθήνας. Οι δείκτες NDWI και χλωροφύλλης έθεσαν βάση αναφοράς για την ποιότητα του νερού, σε συνεργασία με το VITO (Βέλγιο) και την ΕΥΔΑΠ.',
  'Koewacht Air Watchtower': 'Εναέρια RGB φωτογράφιση για δομοστατική επιθεώρηση και εναέρια επιτήρηση στην Ολλανδία.',
  'Thermography Training Programme — Greece': 'Επιτόπια εκπαίδευση θερμογραφίας για χειριστές drone, με πρωτόκολλα πτήσης, βαθμονόμηση θερμικών αισθητήρων και διαδικασίες συλλογής δεδομένων κατά IEC.',
  'Search and Rescue — Johann Williams': 'Υποστήριξη με λογισμικό και εξοπλισμό drone σε επιχείρηση έρευνας και διάσωσης σε εξέλιξη, σε αποστολή όπου ο χρόνος ήταν κρίσιμος.',
  'ABO WIND Thesprotia — 3D Renderings': 'Φωτορεαλιστικές εναέριες τρισδιάστατες απεικονίσεις για τον σχεδιασμό αιολικού πάρκου και την ενημέρωση των ενδιαφερομένων στη βορειοδυτική Ελλάδα.',
};

const TAG_EL = {
  Thermography: 'Θερμογραφία',
  'AI + Thermal': 'AI + θερμογραφία',
  'IEC Thermal': 'Θερμογραφία IEC',
  '3DX / Blades': '3DX / Πτερύγια',
  Survey: 'Αποτύπωση',
  Planning: 'Σχεδιασμός',
  'LiDAR / Hydrology': 'LiDAR / Υδρολογία',
  'LiDAR / Survey': 'LiDAR / Αποτύπωση',
  'LiDAR / Construction': 'LiDAR / Κατασκευή',
  'LiDAR / Industrial': 'LiDAR / Βιομηχανία',
  Topography: 'Τοπογραφία',
  'Progress Tracking': 'Παρακολούθηση προόδου',
  SCM: 'Παρακολούθηση κατασκευής',
  'SCM / Sitemark': 'Παρακολούθηση / Sitemark',
  'Large-Scale SCM': 'Παρακολούθηση μεγάλης κλίμακας',
  'Water Quality': 'Ποιότητα νερού',
  Industrial: 'Βιομηχανία',
  Structural: 'Δομοστατικά',
  Training: 'Εκπαίδευση',
  SAR: 'Έρευνα & διάσωση',
  '3D Visualisation': '3D απεικόνιση',
};

/** A project card in the page language (description and tag; name unchanged). */
export function localizeProject(p, lang) {
  if (lang !== 'el') return p;
  return { ...p, desc: DESC_EL[p.name] || p.desc, tag: TAG_EL[p.tag] || p.tag };
}
