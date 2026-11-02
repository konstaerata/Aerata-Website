/**
 * privacyContent.js — the privacy & cookie policy in each language, rendered
 * by pages/Privacy.jsx. Blocks: p (paragraph), ul (list), table ({ head, rows }).
 *
 * Keep in step with what the site actually does (lib/consent.js, the HubSpot
 * form, hosting). Retention periods are proposals awaiting the owner's
 * confirmation (2026-11-02).
 */

export const PRIVACY_VERSION = '2026-11-02';

const COOKIE_ROWS = {
  en: [
    ['aerata_consent', 'Aerata', 'Stores your cookie choice', '12 months', 'Necessary'],
    ['_ga, _ga_M55H84G01Q', 'Google', 'Google Analytics: distinguishes visits', 'up to 2 years', 'Analytics'],
    ['__hstc, hubspotutk, __hssc, __hssrc', 'HubSpot', 'Site statistics and recognising form submissions', '30 minutes to 6 months', 'Analytics'],
    ['_gcl_au', 'Google', 'Google Ads: measuring campaign results', '90 days', 'Marketing'],
    ['__cf_bm', 'Cloudflare (via HubSpot)', 'Bot protection for HubSpot services', '30 minutes', 'Necessary when HubSpot is loaded'],
    ['_GRECAPTCHA', 'Google', 'reCAPTCHA spam protection on the contact form', '6 months', 'Necessary for the form'],
  ],
  nl: [
    ['aerata_consent', 'Aerata', 'Slaat uw cookiekeuze op', '12 maanden', 'Noodzakelijk'],
    ['_ga, _ga_M55H84G01Q', 'Google', 'Google Analytics: onderscheidt bezoeken', 'tot 2 jaar', 'Analytisch'],
    ['__hstc, hubspotutk, __hssc, __hssrc', 'HubSpot', 'Sitestatistieken en herkennen van formulierinzendingen', '30 minuten tot 6 maanden', 'Analytisch'],
    ['_gcl_au', 'Google', 'Google Ads: meten van campagneresultaten', '90 dagen', 'Marketing'],
    ['__cf_bm', 'Cloudflare (via HubSpot)', 'Botbescherming voor HubSpot-diensten', '30 minuten', 'Noodzakelijk wanneer HubSpot geladen is'],
    ['_GRECAPTCHA', 'Google', 'reCAPTCHA-spambescherming op het contactformulier', '6 maanden', 'Noodzakelijk voor het formulier'],
  ],
  el: [
    ['aerata_consent', 'Aerata', 'Αποθηκεύει την επιλογή σας για τα cookies', '12 μήνες', 'Απαραίτητο'],
    ['_ga, _ga_M55H84G01Q', 'Google', 'Google Analytics: διάκριση επισκέψεων', 'έως 2 έτη', 'Ανάλυση'],
    ['__hstc, hubspotutk, __hssc, __hssrc', 'HubSpot', 'Στατιστικά ιστότοπου και αναγνώριση υποβολών φόρμας', '30 λεπτά έως 6 μήνες', 'Ανάλυση'],
    ['_gcl_au', 'Google', 'Google Ads: μέτρηση αποτελεσμάτων καμπανιών', '90 ημέρες', 'Μάρκετινγκ'],
    ['__cf_bm', 'Cloudflare (μέσω HubSpot)', 'Προστασία από bots για τις υπηρεσίες HubSpot', '30 λεπτά', 'Απαραίτητο όταν φορτώνεται το HubSpot'],
    ['_GRECAPTCHA', 'Google', 'Προστασία reCAPTCHA από spam στη φόρμα επικοινωνίας', '6 μήνες', 'Απαραίτητο για τη φόρμα'],
  ],
};

export const PRIVACY = {
  en: {
    seoTitle: 'Privacy & Cookie Policy | Aerata B.V.',
    seoDesc: 'How Aerata B.V. collects, uses and protects personal data on its website and in its services, which cookies it uses, and your rights under the GDPR.',
    eyebrow: 'Legal',
    title: 'Privacy & cookie policy',
    updated: 'Version of 2 November 2026',
    sections: [
      { title: 'Who we are', blocks: [
        { p: 'Aerata B.V. ("Aerata", "we") is responsible for the processing of personal data described in this policy. Aerata B.V., Van Leeuwenhoekpark 1, 2611 DW Delft, the Netherlands. Chamber of Commerce (KvK) 84696060. Greek office: Leoforos Alimou 8, 17455 Alimos, Athens.' },
        { p: 'For privacy questions, contact info@aerata.com or +31 6 38165193. We have not appointed a Data Protection Officer, as this is not required for our activities.' },
      ] },
      { title: 'What we use your data for, and why we may', blocks: [
        { table: { head: ['Purpose', 'Data', 'Legal basis (GDPR)'], rows: [
          ['Answering enquiries and preparing quotes (contact form, email, phone)', 'Name, company, email, phone, message, project details', 'Steps at your request before a contract (art. 6(1)(b)), or our legitimate interest in answering business enquiries (art. 6(1)(f))'],
          ['Carrying out projects and invoicing', 'Contact details of client staff, project and site data, invoices', 'Performance of the contract (art. 6(1)(b)); legal obligation to keep records (art. 6(1)(c))'],
          ['Occasional news about our services', 'Name, email', 'Your consent (art. 6(1)(a)), or for existing clients our legitimate interest in similar services; you can unsubscribe at any time'],
          ['Website statistics (Google Analytics, HubSpot)', 'Pages visited, device and browser data, approximate location, cookie IDs', 'Your consent (art. 6(1)(a)), given in the cookie banner'],
          ['Measuring advertising campaigns (Google Ads, HubSpot)', 'Cookie IDs, campaign and conversion data', 'Your consent (art. 6(1)(a)), given in the cookie banner'],
          ['Spam protection on the contact form (reCAPTCHA)', 'Interaction and device data', 'Our legitimate interest in protecting the form (art. 6(1)(f))'],
          ['Hosting and security of the website', 'IP address, technical logs', 'Our legitimate interest in a secure, working website (art. 6(1)(f))'],
        ] } },
        { p: 'Fields marked with * in the contact form are needed to answer your enquiry. We do not use automated decision-making or profiling with legal or similarly significant effects.' },
      ] },
      { title: 'Drone images', blocks: [
        { p: 'During inspections and surveys our drones record sites, structures and land. People can appear in these images by chance. We plan flights to avoid recording people where possible, use the images only for the client\'s project, and blur or remove recognisable people and vehicles where they are not needed. For client projects we usually process these images on behalf of the client, under a data processing agreement.' },
      ] },
      { title: 'Who receives your data', blocks: [
        { p: 'We do not sell personal data. We use these service providers, who process data on our behalf under a data processing agreement:' },
        { ul: [
          'HubSpot (HubSpot Ireland Ltd. / HubSpot Inc.): CRM, contact form, website statistics. Data is stored in HubSpot\'s EU data centre.',
          'Google (Google Ireland Ltd. / Google LLC): Google Analytics, Google Ads, reCAPTCHA and, if you choose to load it, Google Maps.',
          'Netlify Inc.: website hosting.',
          'Cloudflare Inc.: storage and delivery of the website\'s images and videos.',
          'Our accountant and IT service providers, as far as needed for their work.',
        ] },
        { p: 'Where a project requires it, we share project information with partners working on that project, such as Kooi B.V. for site security. We may also share data when the law requires it.' },
      ] },
      { title: 'Transfers outside the EU', blocks: [
        { p: 'Some of these providers, or their parent companies, are based in the United States. Transfers to US companies certified under the EU-US Data Privacy Framework rely on the European Commission\'s adequacy decision of 10 July 2023; otherwise they rely on the European Commission\'s Standard Contractual Clauses.' },
      ] },
      { title: 'How long we keep data', blocks: [
        { ul: [
          'Enquiries that do not lead to a contract: up to 24 months after our last contact.',
          'Client and project records: 7 years, as required by Dutch tax law.',
          'News mailing list: until you unsubscribe, or after 24 months without any interaction.',
          'Google Analytics data: 14 months.',
          'Cookies: see the table below.',
        ] },
      ] },
      { title: 'Cookies', blocks: [
        { p: 'Necessary storage runs without consent. Analytics and marketing cookies are only set after you agree in the cookie banner. You can change or withdraw your choice at any time via "Cookie settings" at the bottom of every page; withdrawing does not affect processing before it.' },
        { table: { head: ['Cookie', 'Provider', 'Purpose', 'Lifetime', 'Category'], rows: COOKIE_ROWS.en } },
      ] },
      { title: 'Your rights', blocks: [
        { p: 'You may ask us for access to, correction or deletion of your personal data, restriction of its processing, or a copy in a portable format. You may object at any time to processing based on our legitimate interest and to direct marketing, and you may withdraw consent at any time. Send your request to info@aerata.com; we reply within one month.' },
        { p: 'You also have the right to complain to a data protection authority: the Autoriteit Persoonsgegevens in the Netherlands (autoriteitpersoonsgegevens.nl, PO Box 93374, 2509 AJ The Hague), or, for our activities in Greece, the Hellenic Data Protection Authority (dpa.gr, Kifisias 1-3, 11523 Athens).' },
      ] },
      { title: 'Security', blocks: [
        { p: 'We protect personal data with appropriate technical and organisational measures, including encrypted connections (HTTPS), access controls and agreements with our service providers.' },
      ] },
      { title: 'Changes', blocks: [
        { p: 'We update this policy when our processing changes. The version date at the top shows when it last changed.' },
      ] },
    ],
  },

  nl: {
    seoTitle: 'Privacy- en cookiebeleid | Aerata B.V.',
    seoDesc: 'Hoe Aerata B.V. persoonsgegevens op de website en in haar diensten verzamelt, gebruikt en beschermt, welke cookies we gebruiken en uw rechten onder de AVG.',
    eyebrow: 'Juridisch',
    title: 'Privacy- en cookiebeleid',
    updated: 'Versie van 2 november 2026',
    sections: [
      { title: 'Wie wij zijn', blocks: [
        { p: 'Aerata B.V. ("Aerata", "wij") is verantwoordelijk voor de verwerking van persoonsgegevens die in dit beleid wordt beschreven. Aerata B.V., Van Leeuwenhoekpark 1, 2611 DW Delft, Nederland. KvK 84696060. Kantoor in Griekenland: Leoforos Alimou 8, 17455 Alimos, Athene.' },
        { p: 'Voor vragen over privacy: info@aerata.com of +31 6 38165193. We hebben geen functionaris gegevensbescherming aangesteld, omdat dat voor onze activiteiten niet verplicht is.' },
      ] },
      { title: 'Waarvoor we uw gegevens gebruiken, en op welke grond', blocks: [
        { table: { head: ['Doel', 'Gegevens', 'Grondslag (AVG)'], rows: [
          ['Beantwoorden van vragen en opstellen van offertes (contactformulier, e-mail, telefoon)', 'Naam, bedrijf, e-mail, telefoon, bericht, projectgegevens', 'Maatregelen op uw verzoek vóór een overeenkomst (art. 6 lid 1 sub b), of ons gerechtvaardigd belang bij het beantwoorden van zakelijke vragen (art. 6 lid 1 sub f)'],
          ['Uitvoeren van projecten en facturatie', 'Contactgegevens van medewerkers van de klant, project- en locatiegegevens, facturen', 'Uitvoering van de overeenkomst (art. 6 lid 1 sub b); wettelijke bewaarplicht (art. 6 lid 1 sub c)'],
          ['Af en toe nieuws over onze diensten', 'Naam, e-mail', 'Uw toestemming (art. 6 lid 1 sub a), of voor bestaande klanten ons gerechtvaardigd belang bij vergelijkbare diensten; afmelden kan altijd'],
          ['Websitestatistieken (Google Analytics, HubSpot)', 'Bezochte pagina\'s, apparaat- en browsergegevens, globale locatie, cookie-ID\'s', 'Uw toestemming (art. 6 lid 1 sub a), gegeven in de cookiebanner'],
          ['Meten van advertentiecampagnes (Google Ads, HubSpot)', 'Cookie-ID\'s, campagne- en conversiegegevens', 'Uw toestemming (art. 6 lid 1 sub a), gegeven in de cookiebanner'],
          ['Spambescherming op het contactformulier (reCAPTCHA)', 'Interactie- en apparaatgegevens', 'Ons gerechtvaardigd belang bij het beschermen van het formulier (art. 6 lid 1 sub f)'],
          ['Hosting en beveiliging van de website', 'IP-adres, technische logbestanden', 'Ons gerechtvaardigd belang bij een veilige, werkende website (art. 6 lid 1 sub f)'],
        ] } },
        { p: 'Velden met een * in het contactformulier zijn nodig om uw vraag te beantwoorden. We gebruiken geen geautomatiseerde besluitvorming of profilering met rechtsgevolgen of vergelijkbare gevolgen.' },
      ] },
      { title: 'Dronebeelden', blocks: [
        { p: 'Tijdens inspecties en metingen leggen onze drones locaties, constructies en terrein vast. Daarbij kunnen toevallig mensen in beeld komen. We plannen vluchten zo dat we waar mogelijk geen mensen vastleggen, gebruiken de beelden alleen voor het project van de klant en maken herkenbare personen en voertuigen onherkenbaar of verwijderen ze als ze niet nodig zijn. Bij klantprojecten verwerken we deze beelden meestal namens de klant, onder een verwerkersovereenkomst.' },
      ] },
      { title: 'Wie uw gegevens ontvangt', blocks: [
        { p: 'We verkopen geen persoonsgegevens. We werken met deze dienstverleners, die gegevens in onze opdracht verwerken onder een verwerkersovereenkomst:' },
        { ul: [
          'HubSpot (HubSpot Ireland Ltd. / HubSpot Inc.): CRM, contactformulier, websitestatistieken. Gegevens worden opgeslagen in het EU-datacenter van HubSpot.',
          'Google (Google Ireland Ltd. / Google LLC): Google Analytics, Google Ads, reCAPTCHA en, als u ervoor kiest die te laden, Google Maps.',
          'Netlify Inc.: hosting van de website.',
          'Cloudflare Inc.: opslag en levering van de afbeeldingen en video\'s van de website.',
          'Onze accountant en IT-dienstverleners, voor zover nodig voor hun werk.',
        ] },
        { p: 'Waar een project dat vereist, delen we projectinformatie met partners die aan dat project werken, zoals Kooi B.V. voor beveiliging van locaties. We kunnen gegevens ook delen als de wet dat verplicht.' },
      ] },
      { title: 'Doorgifte buiten de EU', blocks: [
        { p: 'Sommige van deze dienstverleners, of hun moederbedrijven, zijn gevestigd in de Verenigde Staten. Doorgifte aan Amerikaanse bedrijven die gecertificeerd zijn onder het EU-VS Data Privacy Framework is gebaseerd op het adequaatheidsbesluit van de Europese Commissie van 10 juli 2023; in andere gevallen op de standaardcontractbepalingen van de Europese Commissie.' },
      ] },
      { title: 'Hoe lang we gegevens bewaren', blocks: [
        { ul: [
          'Vragen die niet tot een overeenkomst leiden: tot 24 maanden na ons laatste contact.',
          'Klant- en projectadministratie: 7 jaar, zoals de fiscale bewaarplicht vereist.',
          'Nieuwsbrieflijst: tot u zich afmeldt, of na 24 maanden zonder enige interactie.',
          'Google Analytics-gegevens: 14 maanden.',
          'Cookies: zie de tabel hieronder.',
        ] },
      ] },
      { title: 'Cookies', blocks: [
        { p: 'Noodzakelijke opslag werkt zonder toestemming. Analytische en marketingcookies worden pas geplaatst nadat u daarmee instemt in de cookiebanner. U kunt uw keuze altijd wijzigen of intrekken via "Cookie-instellingen" onderaan elke pagina; intrekken heeft geen gevolgen voor verwerking daarvóór.' },
        { table: { head: ['Cookie', 'Aanbieder', 'Doel', 'Bewaartermijn', 'Categorie'], rows: COOKIE_ROWS.nl } },
      ] },
      { title: 'Uw rechten', blocks: [
        { p: 'U kunt ons vragen om inzage in, correctie of verwijdering van uw persoonsgegevens, beperking van de verwerking, of een kopie in een overdraagbaar formaat. U kunt altijd bezwaar maken tegen verwerking op grond van ons gerechtvaardigd belang en tegen direct marketing, en u kunt uw toestemming altijd intrekken. Stuur uw verzoek naar info@aerata.com; we reageren binnen een maand.' },
        { p: 'U hebt ook het recht een klacht in te dienen bij een toezichthouder: de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl, Postbus 93374, 2509 AJ Den Haag), of, voor onze activiteiten in Griekenland, de Griekse toezichthouder (dpa.gr, Kifisias 1-3, 11523 Athene).' },
      ] },
      { title: 'Beveiliging', blocks: [
        { p: 'We beschermen persoonsgegevens met passende technische en organisatorische maatregelen, waaronder versleutelde verbindingen (HTTPS), toegangsbeheer en afspraken met onze dienstverleners.' },
      ] },
      { title: 'Wijzigingen', blocks: [
        { p: 'We passen dit beleid aan wanneer onze verwerkingen veranderen. De versiedatum bovenaan laat zien wanneer het voor het laatst is gewijzigd.' },
      ] },
    ],
  },

  el: {
    seoTitle: 'Πολιτική απορρήτου & cookies | Aerata B.V.',
    seoDesc: 'Πώς η Aerata B.V. συλλέγει, χρησιμοποιεί και προστατεύει δεδομένα προσωπικού χαρακτήρα, ποια cookies χρησιμοποιεί και ποια είναι τα δικαιώματά σας βάσει του ΓΚΠΔ.',
    eyebrow: 'Νομικά',
    title: 'Πολιτική απορρήτου & cookies',
    updated: 'Έκδοση της 2ας Νοεμβρίου 2026',
    sections: [
      { title: 'Ποιοι είμαστε', blocks: [
        { p: 'Υπεύθυνη επεξεργασίας για τα δεδομένα προσωπικού χαρακτήρα που περιγράφονται στην παρούσα πολιτική είναι η Aerata B.V. («Aerata», «εμείς»), Van Leeuwenhoekpark 1, 2611 DW Delft, Ολλανδία, αριθμός Εμπορικού Επιμελητηρίου (KvK) 84696060. Γραφείο στην Ελλάδα: Λεωφόρος Αλίμου 8, 17455 Άλιμος, Αθήνα.' },
        { p: 'Για ερωτήματα σχετικά με την προστασία δεδομένων: info@aerata.com ή +31 6 38165193. Δεν έχουμε ορίσει Υπεύθυνο Προστασίας Δεδομένων, καθώς δεν απαιτείται για τις δραστηριότητές μας.' },
      ] },
      { title: 'Για ποιον σκοπό χρησιμοποιούμε τα δεδομένα σας και με ποια νομική βάση', blocks: [
        { table: { head: ['Σκοπός', 'Δεδομένα', 'Νομική βάση (ΓΚΠΔ)'], rows: [
          ['Απάντηση σε ερωτήματα και σύνταξη προσφορών (φόρμα επικοινωνίας, email, τηλέφωνο)', 'Όνομα, εταιρεία, email, τηλέφωνο, μήνυμα, στοιχεία έργου', 'Ενέργειες κατόπιν αιτήματός σας πριν από τη σύναψη σύμβασης (άρθρο 6 παρ. 1 β), ή έννομο συμφέρον μας να απαντάμε σε επαγγελματικά ερωτήματα (άρθρο 6 παρ. 1 στ)'],
          ['Εκτέλεση έργων και τιμολόγηση', 'Στοιχεία επικοινωνίας στελεχών του πελάτη, δεδομένα έργου και τοποθεσίας, τιμολόγια', 'Εκτέλεση σύμβασης (άρθρο 6 παρ. 1 β)· νομική υποχρέωση τήρησης αρχείων (άρθρο 6 παρ. 1 γ)'],
          ['Περιστασιακά νέα για τις υπηρεσίες μας', 'Όνομα, email', 'Η συγκατάθεσή σας (άρθρο 6 παρ. 1 α), ή για υφιστάμενους πελάτες έννομο συμφέρον μας για παρόμοιες υπηρεσίες· μπορείτε να διαγραφείτε ανά πάσα στιγμή'],
          ['Στατιστικά ιστότοπου (Google Analytics, HubSpot)', 'Σελίδες που επισκεφθήκατε, στοιχεία συσκευής και φυλλομετρητή, κατά προσέγγιση τοποθεσία, αναγνωριστικά cookies', 'Η συγκατάθεσή σας (άρθρο 6 παρ. 1 α), μέσω του banner cookies'],
          ['Μέτρηση διαφημιστικών καμπανιών (Google Ads, HubSpot)', 'Αναγνωριστικά cookies, δεδομένα καμπανιών και μετατροπών', 'Η συγκατάθεσή σας (άρθρο 6 παρ. 1 α), μέσω του banner cookies'],
          ['Προστασία της φόρμας επικοινωνίας από spam (reCAPTCHA)', 'Δεδομένα αλληλεπίδρασης και συσκευής', 'Έννομο συμφέρον μας για την προστασία της φόρμας (άρθρο 6 παρ. 1 στ)'],
          ['Φιλοξενία και ασφάλεια του ιστότοπου', 'Διεύθυνση IP, τεχνικά αρχεία καταγραφής', 'Έννομο συμφέρον μας για έναν ασφαλή ιστότοπο που λειτουργεί (άρθρο 6 παρ. 1 στ)'],
        ] } },
        { p: 'Τα πεδία με * στη φόρμα επικοινωνίας είναι απαραίτητα για να απαντήσουμε στο ερώτημά σας. Δεν χρησιμοποιούμε αυτοματοποιημένη λήψη αποφάσεων ή κατάρτιση προφίλ με έννομα ή ανάλογα σημαντικά αποτελέσματα.' },
      ] },
      { title: 'Εικόνες από drone', blocks: [
        { p: 'Κατά τις επιθεωρήσεις και αποτυπώσεις, τα drone μας καταγράφουν χώρους, κατασκευές και εκτάσεις. Σε αυτές τις εικόνες μπορεί να εμφανιστούν τυχαία άνθρωποι. Σχεδιάζουμε τις πτήσεις ώστε, όπου είναι δυνατό, να μην καταγράφονται άνθρωποι, χρησιμοποιούμε τις εικόνες μόνο για το έργο του πελάτη και θολώνουμε ή αφαιρούμε αναγνωρίσιμα πρόσωπα και οχήματα όταν δεν χρειάζονται. Στα έργα πελατών επεξεργαζόμαστε συνήθως αυτές τις εικόνες για λογαριασμό του πελάτη, βάσει σύμβασης επεξεργασίας δεδομένων.' },
      ] },
      { title: 'Ποιοι λαμβάνουν τα δεδομένα σας', blocks: [
        { p: 'Δεν πουλάμε δεδομένα προσωπικού χαρακτήρα. Συνεργαζόμαστε με τους παρακάτω παρόχους, που επεξεργάζονται δεδομένα για λογαριασμό μας βάσει σύμβασης επεξεργασίας:' },
        { ul: [
          'HubSpot (HubSpot Ireland Ltd. / HubSpot Inc.): CRM, φόρμα επικοινωνίας, στατιστικά ιστότοπου. Τα δεδομένα αποθηκεύονται στο κέντρο δεδομένων της HubSpot στην ΕΕ.',
          'Google (Google Ireland Ltd. / Google LLC): Google Analytics, Google Ads, reCAPTCHA και, αν επιλέξετε να τον φορτώσετε, Google Maps.',
          'Netlify Inc.: φιλοξενία του ιστότοπου.',
          'Cloudflare Inc.: αποθήκευση και διανομή των εικόνων και των βίντεο του ιστότοπου.',
          'Ο λογιστής μας και πάροχοι υπηρεσιών πληροφορικής, στο μέτρο που απαιτείται για το έργο τους.',
        ] },
        { p: 'Όπου το απαιτεί ένα έργο, μοιραζόμαστε πληροφορίες του έργου με συνεργάτες που εργάζονται σε αυτό, όπως η Kooi B.V. για τη φύλαξη χώρων. Μπορεί επίσης να διαβιβάσουμε δεδομένα όταν το επιβάλλει ο νόμος.' },
      ] },
      { title: 'Διαβιβάσεις εκτός ΕΕ', blocks: [
        { p: 'Ορισμένοι από τους παρόχους αυτούς, ή οι μητρικές τους εταιρείες, έχουν έδρα στις Ηνωμένες Πολιτείες. Οι διαβιβάσεις προς εταιρείες των ΗΠΑ που είναι πιστοποιημένες στο Πλαίσιο Προστασίας Δεδομένων ΕΕ-ΗΠΑ στηρίζονται στην απόφαση επάρκειας της Ευρωπαϊκής Επιτροπής της 10ης Ιουλίου 2023· σε άλλες περιπτώσεις, στις Τυποποιημένες Συμβατικές Ρήτρες της Ευρωπαϊκής Επιτροπής.' },
      ] },
      { title: 'Πόσο διάστημα διατηρούμε τα δεδομένα', blocks: [
        { ul: [
          'Ερωτήματα που δεν καταλήγουν σε σύμβαση: έως 24 μήνες από την τελευταία επικοινωνία μας.',
          'Αρχεία πελατών και έργων: 7 έτη, όπως απαιτεί η φορολογική νομοθεσία.',
          'Λίστα ενημερωτικών μηνυμάτων: έως ότου διαγραφείτε, ή μετά από 24 μήνες χωρίς καμία αλληλεπίδραση.',
          'Δεδομένα Google Analytics: 14 μήνες.',
          'Cookies: βλ. τον πίνακα παρακάτω.',
        ] },
      ] },
      { title: 'Cookies', blocks: [
        { p: 'Η απαραίτητη αποθήκευση λειτουργεί χωρίς συγκατάθεση. Τα cookies ανάλυσης και μάρκετινγκ ορίζονται μόνο αφού συμφωνήσετε στο banner cookies. Μπορείτε να αλλάξετε ή να ανακαλέσετε την επιλογή σας ανά πάσα στιγμή από τις «Ρυθμίσεις cookies» στο κάτω μέρος κάθε σελίδας· η ανάκληση δεν επηρεάζει την επεξεργασία που έγινε πριν από αυτήν.' },
        { table: { head: ['Cookie', 'Πάροχος', 'Σκοπός', 'Διάρκεια', 'Κατηγορία'], rows: COOKIE_ROWS.el } },
      ] },
      { title: 'Τα δικαιώματά σας', blocks: [
        { p: 'Μπορείτε να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή των δεδομένων σας, περιορισμό της επεξεργασίας ή αντίγραφο σε φορητή μορφή. Μπορείτε να αντιταχθείτε ανά πάσα στιγμή στην επεξεργασία που βασίζεται στο έννομο συμφέρον μας και στην απευθείας εμπορική προώθηση, και να ανακαλέσετε τη συγκατάθεσή σας ανά πάσα στιγμή. Στείλτε το αίτημά σας στο info@aerata.com· απαντάμε εντός ενός μήνα.' },
        { p: 'Έχετε επίσης δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα (dpa.gr, Κηφισίας 1-3, 11523 Αθήνα) ή στην ολλανδική αρχή Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).' },
      ] },
      { title: 'Ασφάλεια', blocks: [
        { p: 'Προστατεύουμε τα δεδομένα προσωπικού χαρακτήρα με κατάλληλα τεχνικά και οργανωτικά μέτρα, όπως κρυπτογραφημένες συνδέσεις (HTTPS), έλεγχο πρόσβασης και συμβάσεις με τους παρόχους μας.' },
      ] },
      { title: 'Αλλαγές', blocks: [
        { p: 'Ενημερώνουμε την παρούσα πολιτική όταν αλλάζει η επεξεργασία που κάνουμε. Η ημερομηνία έκδοσης στην κορυφή δείχνει πότε άλλαξε τελευταία φορά.' },
      ] },
    ],
  },
};
