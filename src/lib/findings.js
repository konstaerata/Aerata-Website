/**
 * findings.js — third-party figures shown in the "Industry findings" band on
 * each sector page (components/sectors/Findings.jsx).
 *
 * Every figure is quoted as its source states it and was checked against the
 * source page in 2026-11. These are not Aerata results. English only for now.
 *
 * TO REMOVE THE FEATURE: delete the <Findings /> line and its two imports in
 * pages/sectors/SectorPage.jsx, then delete this file and Findings.jsx.
 *
 * Card fields:
 *   eyebrow  short label above the figure
 *   figure   the headline number, as text
 *   finding  one sentence, in the source's terms
 *   context  conditions or caveats that belong with the number
 *   chapter  id of the chapter the card sits in (inline layout)
 *   viz      { type, ... } — rate | race | dial | donut | ratio | overlay | dots | area | years | quote
 *   source   { name, year (null when the source states none), type, url }   type: public | peer | research | institute | industry
 *
 * The first card of a sector is the large one when there are three.
 */

/**
 * Where the findings appear on sector pages:
 *   'inline' — each card inside the chapter it supports
 *   'band'   — one "Industry findings" band after the chapters
 */
export const FINDINGS_LAYOUT = 'inline';

export const FINDINGS_COPY = {
  label: 'Industry findings',
  title: 'What others have measured',
  description: 'Figures as reported by the sources named, from their own projects and conditions. They are not Aerata results.',
  sourceTypes: {
    public: 'Public body',
    peer: 'Peer-reviewed',
    research: 'Research paper',
    institute: 'Research institute',
    industry: 'Industry report',
  },
  drone: 'Drone',
  cardLabel: 'Industry finding',
};

export const FINDINGS = {
  renewables: [
    {
      eyebrow: 'Panels inspected per hour',
      chapter: 'solar-operation',
      figure: '2,000–5,000',
      finding: 'Drone thermal inspection covers 2,000–5,000 panels an hour, against 200–400 with a handheld camera.',
      context: 'Each square is 100 panels. Lighter squares show the top of each range.',
      viz: {
        type: 'rate',
        per: 100,
        rows: [
          { label: 'Handheld IR', low: 200, high: 400, kind: 'manual' },
          { label: 'Drone', low: 2000, high: 5000, kind: 'drone' },
        ],
      },
      source: { name: 'Averroes, drone solar inspection guide', year: 2026, type: 'industry', url: 'https://averroes.ai/blog/drone-solar-panel-inspection-guide' },
    },
    {
      eyebrow: 'Thermal inspection of a 4 MWp plant',
      chapter: 'solar-operation',
      figure: '5–10 h',
      finding: 'A PV plant of 4 MWp nominal power will require approximately 5 to 10 hours of IR inspection with drones.',
      context: 'Under ideal conditions. Dial shows one 24-hour day.',
      viz: { type: 'dial', low: 5, high: 10, max: 24 },
      source: { name: 'IEA PVPS Task 13, Review on IR and EL imaging', year: 2018, type: 'public', url: 'https://iea-pvps.org/key-topics/review-on-ir-and-el-imaging-for-pv-field-applications/' },
    },
    {
      eyebrow: 'Rotor stop per turbine',
      chapter: 'wind-operation',
      figure: '15–45 min',
      finding: 'Rope-access inspection stops the rotor for three to six hours; a drone completes the same job in fifteen to forty-five minutes.',
      context: 'Reported by a drone inspection provider in Ireland.',
      viz: {
        type: 'race',
        unit: 'min',
        rows: [
          { label: 'Rope access', low: 180, high: 360, text: '3–6 h', kind: 'manual' },
          { label: 'Drone', low: 15, high: 45, text: '15–45 min', kind: 'drone' },
        ],
      },
      source: { name: 'Autonomous drone wind turbine inspections in Ireland', year: null, type: 'industry', url: 'https://irelanddroneservic.wixsite.com/aerial-agritech/post/autonomous-drone-wind-turbine-inspections-in-ireland-blade-surveys-without-stopping-the-rotor' },
    },
  ],

  grid: [
    {
      eyebrow: 'Power line inspection, cost per mile',
      chapter: 'high-voltage',
      figure: '$200–300',
      finding: 'Drone inspections typically cost $200 to $300 per mile, against $1,200 to $1,600 per mile for traditional helicopter inspections.',
      context: 'US figures in US dollars. Lighter bar sections show the top of each range.',
      viz: {
        type: 'race',
        rows: [
          { label: 'Helicopter', low: 1200, high: 1600, text: '$1,200–1,600', kind: 'manual' },
          { label: 'Drone', low: 200, high: 300, text: '$200–300', kind: 'drone' },
        ],
      },
      source: { name: 'Drone Launch Academy, drone power line inspection', year: 2026, type: 'industry', url: 'https://dronelaunchacademy.com/resources/drone-power-line-inspection/' },
    },
    {
      eyebrow: 'Why utilities look at drones',
      chapter: 'medium-voltage',
      finding: 'Utilities are exploring drone technologies to deliver the benefits of aerial inspections while enhancing worker safety.',
      context: 'Helicopters reach remote areas and cover more territory, but sending inspectors into the air has safety risks.',
      viz: { type: 'quote' },
      source: { name: 'EPRI Journal, Drones and AI converge for power delivery inspections', year: 2019, type: 'institute', url: 'https://eprijournal.com/drones-and-ai-converge-for-power-delivery-inspections/' },
    },
    {
      eyebrow: 'Communication tower fatalities, US',
      chapter: 'telecom',
      figure: '13',
      finding: 'OSHA recorded 13 communication tower-related fatalities in 2013. Falls from great heights are the first hazard it lists.',
      context: 'Every climb avoided is exposure avoided.',
      viz: { type: 'years', rows: [[2013, 13], [2014, 12], [2015, 3], [2016, 6]] },
      source: { name: 'OSHA, Communication towers', year: null, type: 'public', url: 'https://www.osha.gov/communication-towers' },
    },
  ],

  build: [
    {
      eyebrow: 'Stockpile volume, drone vs GPS survey',
      chapter: 'mining',
      figure: '1.1%',
      finding: 'On a quarry stockpile, the drone volume differed by 1.1% from the GPS ground survey, inside the 3% the study set as its goal.',
      context: 'Open-pit quarry case study. Legislation often requires volumes within ±3%.',
      viz: { type: 'overlay', value: 1.1, target: 3 },
      source: { name: 'ISPRS Archives, Volume computation of a stockpile', year: 2016, type: 'research', url: 'https://isprs-archives.copernicus.org/articles/XLI-B1/999/2016/' },
    },
    {
      eyebrow: 'Surveying a 12-acre site',
      chapter: 'surveying',
      figure: '2 h',
      finding: 'By some estimates, drones can reduce surveying time for a 12-acre property from 100 hours to as little as 2 hours.',
      context: 'An industry estimate, not a measured trial.',
      viz: {
        type: 'race',
        rows: [
          { label: 'Ground survey', low: 100, high: 100, text: '100 h', kind: 'manual' },
          { label: 'Drone', low: 2, high: 2, text: '2 h', kind: 'drone' },
        ],
      },
      source: { name: 'UAV Coach, Drones in construction', year: 2026, type: 'industry', url: 'https://uavcoach.com/drones-in-construction/' },
    },
  ],

  infra: [
    {
      eyebrow: 'Bridge inspection programme',
      chapter: 'bridges-dams-roads-rail',
      figure: '9 : 1',
      finding: 'Oregon DOT estimated average savings of approximately $10,000 per bridge inspection and a benefit-cost ratio of 9 if a drone bridge inspection programme is implemented.',
      context: 'Oregon Department of Transportation research report SPR 787.',
      viz: { type: 'ratio', in: 1, out: 9 },
      source: { name: 'Oregon DOT, Eyes in the Sky (SPR 787)', year: 2018, type: 'public', url: 'https://www.oregon.gov/odot/Programs/ResearchDocuments/SPR787_Eyes_in_the_Sky.pdf' },
    },
    {
      eyebrow: '200-foot refinery flare stack',
      chapter: 'oil-gas-industrial',
      figure: '2 h',
      finding: 'A pre-turnaround flare stack inspection was completed in 2 hours by drone, where the crane and rope approach could take up to 3 days.',
      context: 'Vendor case study, California refinery.',
      viz: {
        type: 'race',
        rows: [
          { label: 'Cranes and rope', low: 72, high: 72, text: 'up to 3 days', kind: 'manual' },
          { label: 'Drone', low: 2, high: 2, text: '2 h', kind: 'drone' },
        ],
      },
      source: { name: 'Voliro, Acuren pre-turnaround stack inspection', year: null, type: 'industry', url: 'https://voliro.com/case-study/acurens-pre-turnaround-stack-inspection-saves-refinery-3-days-and-tens-of-thousands-of-dollars/' },
    },
  ],

  safety: [
    {
      eyebrow: 'Remote video guarding vs a guard',
      chapter: 'site-security',
      figure: '51%',
      finding: 'A contractor recognised a 51% monthly cost saving with remote video guarding compared to hiring a human guard.',
      context: 'Vendor case study, $43M residential project in Philadelphia.',
      viz: { type: 'donut', value: 51 },
      source: { name: 'Kastle Systems, Clemens Construction case study', year: 2016, type: 'industry', url: 'https://www.kastle.com/resource/clemens-construction-case-study' },
    },
    {
      eyebrow: 'People rescued with drones',
      chapter: 'public-safety',
      figure: '1,000+',
      finding: 'DJI recorded more than 1,000 people rescued with the help of drones, in over 600 incidents in 39 countries.',
      context: 'Counted from news and rescuer reports up to July 2023. Each dot is 10 people.',
      viz: { type: 'dots', total: 1000, per: 10 },
      source: { name: 'DJI Drone Rescue Map', year: 2023, type: 'industry', url: 'https://www.dji.com/media-center/announcements/dji-records-more-than-1000-people-rescued-by-drones-globally' },
    },
  ],

  environmental: [
    {
      eyebrow: 'Post-fire survey in Spain',
      chapter: 'monitoring',
      figure: '3,000 ha',
      finding: 'A multispectral drone surveyed 3,000 ha inside the perimeter of a megafire in Spain.',
      context: 'Each square is 1 km² (100 ha).',
      viz: { type: 'area', km2: 30 },
      source: { name: 'Sensors, Postfire vegetation survey campaigns with UAVs', year: 2018, type: 'peer', url: 'https://www.mdpi.com/1424-8220/18/2/586' },
    },
    {
      eyebrow: 'Drone vs satellite',
      chapter: 'monitoring',
      finding: 'The drone orthomosaic provided more information in terms of spatial variability in heterogeneous burned areas in comparison with the WorldView-2 satellite imagery.',
      context: 'Same study, comparing drone and satellite imagery of the burned area.',
      viz: { type: 'quote' },
      source: { name: 'Sensors, Postfire vegetation survey campaigns with UAVs', year: 2018, type: 'peer', url: 'https://www.mdpi.com/1424-8220/18/2/586' },
    },
  ],
};

// ── Greek ────────────────────────────────────────────────────────────────────
// Same order as FINDINGS; numbers, charts and sources are shared. `rows` holds
// the chart row labels (and range text where it contains words).
const COPY_EL = {
  label: 'Ευρήματα κλάδου',
  title: 'Τι έχουν μετρήσει άλλοι',
  description: 'Στοιχεία όπως τα αναφέρουν οι πηγές, από τα δικά τους έργα και συνθήκες. Δεν είναι αποτελέσματα της Aerata.',
  sourceTypes: { public: 'Δημόσιος φορέας', peer: 'Επιστημονική δημοσίευση', research: 'Ερευνητική εργασία', institute: 'Ερευνητικό ινστιτούτο', industry: 'Πηγή του κλάδου' },
  drone: 'Drone',
  cardLabel: 'Εύρημα κλάδου',
  cardLabelPlural: 'Ευρήματα κλάδου',
  cost: 'Κόστος',
  benefit: 'Όφελος',
  droneSurvey: 'Αποτύπωση με drone',
  gpsSurvey: 'Αποτύπωση GPS εδάφους',
  difference: 'Διαφορά',
  goal: 'Στόχος',
};

const FINDINGS_EL = {
  renewables: [
    { eyebrow: 'Πάνελ επιθεωρημένα ανά ώρα', figure: '2.000–5.000', finding: 'Η θερμογραφική επιθεώρηση με drone καλύπτει 2.000–5.000 πάνελ την ώρα, έναντι 200–400 με φορητή κάμερα.', context: 'Κάθε τετράγωνο αντιστοιχεί σε 100 πάνελ. Τα πιο ανοιχτά τετράγωνα δείχνουν το ανώτερο όριο κάθε εύρους.', rows: [{ label: 'Φορητή θερμοκάμερα' }, { label: 'Drone' }] },
    { eyebrow: 'Θερμογραφία σταθμού 4 MWp', figure: '5–10 ώρες', finding: 'Ένας φωτοβολταϊκός σταθμός ονομαστικής ισχύος 4 MWp απαιτεί περίπου 5 έως 10 ώρες θερμογραφικής επιθεώρησης με drone.', context: 'Υπό ιδανικές συνθήκες. Ο δίσκος δείχνει ένα 24ωρο.' },
    { eyebrow: 'Στάση ρότορα ανά ανεμογεννήτρια', figure: '15–45 λεπτά', finding: 'Η επιθεώρηση με σχοινιά σταματά τον ρότορα για τρεις έως έξι ώρες· ένα drone κάνει την ίδια δουλειά σε δεκαπέντε έως σαράντα πέντε λεπτά.', context: 'Σύμφωνα με πάροχο επιθεωρήσεων με drone στην Ιρλανδία.', rows: [{ label: 'Σχοινιά', text: '3–6 ώρες' }, { label: 'Drone', text: '15–45 λεπτά' }] },
  ],
  grid: [
    { eyebrow: 'Επιθεώρηση γραμμών, κόστος ανά μίλι', finding: 'Η επιθεώρηση με drone κοστίζει συνήθως 200 έως 300 δολάρια ανά μίλι, έναντι 1.200 έως 1.600 δολαρίων ανά μίλι για την παραδοσιακή επιθεώρηση με ελικόπτερο.', context: 'Στοιχεία ΗΠΑ σε δολάρια. Τα πιο ανοιχτά τμήματα δείχνουν το ανώτερο όριο κάθε εύρους.', rows: [{ label: 'Ελικόπτερο' }, { label: 'Drone' }] },
    { eyebrow: 'Γιατί οι διαχειριστές δικτύων στρέφονται στα drone', finding: 'Οι διαχειριστές δικτύων εξετάζουν τεχνολογίες drone ώστε να έχουν τα οφέλη της εναέριας επιθεώρησης με μεγαλύτερη ασφάλεια για τους εργαζόμενους.', context: 'Τα ελικόπτερα φτάνουν σε απομακρυσμένες περιοχές και καλύπτουν μεγαλύτερη έκταση, όμως η αποστολή επιθεωρητών στον αέρα ενέχει κινδύνους.' },
    { eyebrow: 'Θάνατοι σε ιστούς τηλεπικοινωνιών, ΗΠΑ', finding: 'Η OSHA κατέγραψε 13 θανάτους σε εργασίες σε ιστούς τηλεπικοινωνιών το 2013. Οι πτώσεις από μεγάλο ύψος είναι ο πρώτος κίνδυνος που αναφέρει.', context: 'Κάθε ανάβαση που αποφεύγεται είναι έκθεση που αποφεύγεται.' },
  ],
  build: [
    { eyebrow: 'Όγκος αποθέματος, drone έναντι GPS', figure: '1,1%', finding: 'Σε απόθεμα λατομείου, ο όγκος από το drone διέφερε κατά 1,1% από την αποτύπωση GPS εδάφους, εντός του 3% που είχε θέσει η μελέτη ως στόχο.', context: 'Μελέτη περίπτωσης σε επιφανειακό λατομείο. Η νομοθεσία συχνά απαιτεί ακρίβεια όγκων ±3%.' },
    { eyebrow: 'Αποτύπωση οικοπέδου περίπου 49 στρεμμάτων', figure: '2 ώρες', finding: 'Σύμφωνα με ορισμένες εκτιμήσεις, τα drone μπορούν να μειώσουν τον χρόνο αποτύπωσης ενός ακινήτου 12 acres (περίπου 49 στρέμματα) από 100 ώρες σε μόλις 2 ώρες.', context: 'Εκτίμηση του κλάδου, όχι μετρημένη δοκιμή.', rows: [{ label: 'Αποτύπωση εδάφους', text: '100 ώρες' }, { label: 'Drone', text: '2 ώρες' }] },
  ],
  infra: [
    { eyebrow: 'Πρόγραμμα επιθεώρησης γεφυρών', finding: 'Το Υπουργείο Μεταφορών του Όρεγκον εκτίμησε μέση εξοικονόμηση περίπου 10.000 δολαρίων ανά επιθεώρηση γέφυρας και λόγο οφέλους-κόστους 9, εφόσον εφαρμοστεί πρόγραμμα επιθεώρησης γεφυρών με drone.', context: 'Ερευνητική αναφορά SPR 787 του Υπουργείου Μεταφορών του Όρεγκον.' },
    { eyebrow: 'Πυρσός διυλιστηρίου 60 μέτρων', figure: '2 ώρες', finding: 'Η επιθεώρηση πυρσού πριν από γενική συντήρηση ολοκληρώθηκε σε 2 ώρες με drone, ενώ με γερανό και σχοινιά θα μπορούσε να διαρκέσει έως 3 ημέρες.', context: 'Μελέτη περίπτωσης προμηθευτή, διυλιστήριο στην Καλιφόρνια.', rows: [{ label: 'Γερανός και σχοινιά', text: 'έως 3 ημέρες' }, { label: 'Drone', text: '2 ώρες' }] },
  ],
  safety: [
    { eyebrow: 'Απομακρυσμένη βιντεοφύλαξη έναντι φύλακα', finding: 'Ένας εργολάβος κατέγραψε 51% μηνιαία εξοικονόμηση κόστους με απομακρυσμένη βιντεοφύλαξη σε σύγκριση με την πρόσληψη φύλακα.', context: 'Μελέτη περίπτωσης προμηθευτή, οικιστικό έργο 43 εκατ. δολαρίων στη Φιλαδέλφεια.' },
    { eyebrow: 'Άνθρωποι που διασώθηκαν με drone', figure: '1.000+', finding: 'Η DJI κατέγραψε περισσότερους από 1.000 ανθρώπους που διασώθηκαν με τη βοήθεια drone, σε πάνω από 600 περιστατικά σε 39 χώρες.', context: 'Καταμέτρηση από ειδήσεις και αναφορές διασωστών έως τον Ιούλιο του 2023. Κάθε κουκκίδα αντιστοιχεί σε 10 ανθρώπους.' },
  ],
  environmental: [
    { eyebrow: 'Αποτύπωση μετά από πυρκαγιά στην Ισπανία', figure: '3.000 εκτάρια', finding: 'Ένα πολυφασματικό drone αποτύπωσε 3.000 εκτάρια εντός της περιμέτρου μιας μεγάλης πυρκαγιάς στην Ισπανία.', context: 'Κάθε τετράγωνο αντιστοιχεί σε 1 km² (100 εκτάρια).' },
    { eyebrow: 'Drone έναντι δορυφόρου', finding: 'Το ορθομωσαϊκό από το drone έδωσε περισσότερη πληροφορία για τη χωρική μεταβλητότητα σε ετερογενείς καμένες εκτάσεις σε σύγκριση με τις δορυφορικές εικόνες WorldView-2.', context: 'Ίδια μελέτη, σύγκριση εικόνων drone και δορυφόρου της καμένης έκτασης.' },
  ],
};

Object.assign(FINDINGS_COPY, {
  cardLabelPlural: 'Industry findings',
  cost: 'Cost',
  benefit: 'Benefit',
  droneSurvey: 'Drone survey',
  gpsSurvey: 'GPS ground survey',
  difference: 'Difference',
  goal: 'Goal',
});

/** Card and chart labels in the page language. */
export function getFindingsCopy(lang) {
  return lang === 'el' ? COPY_EL : FINDINGS_COPY;
}

/**
 * A sector's findings in the page language. `idKey` keeps the English label,
 * so card anchors (#finding-…) are the same in every language.
 */
export function getFindings(key, lang) {
  const base = FINDINGS[key] || [];
  const tr = lang === 'el' ? FINDINGS_EL[key] : null;
  return base.map((f, i) => {
    const t = tr?.[i];
    if (!t) return { ...f, idKey: f.eyebrow };
    const { rows, ...text } = t;
    const viz = rows && f.viz.rows
      ? { ...f.viz, rows: f.viz.rows.map((r, k) => ({ ...r, label: rows[k]?.label ?? r.label, text: rows[k]?.text ?? r.text })) }
      : f.viz;
    return { ...f, ...text, viz, idKey: f.eyebrow };
  });
}
