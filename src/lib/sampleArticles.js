// @ts-nocheck
import { MEDIA } from './media';

export const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: 'How Thermal Drone Surveys Cut Solar Farm Revenue Loss by 35%',
    excerpt: 'IEC-compliant thermal inspections across Aerata\'s 237 MWp Isolar portfolio demonstrate how early fault detection translates directly into recovered energy yield and reduced maintenance cost.',
    content: `IEC-compliant thermal inspections across Aerata's 237 MWp Isolar portfolio have shown that early fault detection translates directly into recovered energy yield and significantly reduced maintenance costs.

## The Challenge

Solar farm operators face a persistent problem: degraded panels that go undetected until routine ground-level checks catch them months — sometimes years — after they begin underperforming. By that point, revenue loss has already accumulated.

## The Drone-Based Solution

Aerata's thermal inspection workflow uses the DJI Matrice 350 RTK equipped with the Zenmuse H20T thermal camera. Each flight follows IEC TS 62446-3 protocols, capturing high-resolution thermal data at panel level across entire farm footprints in a single mobilisation.

## Results Across the Portfolio

Across 237 MWp of solar assets inspected for iSOLAR, Aerata identified:
- **12.3%** of panels showing measurable thermal anomalies
- **3.8%** with critical hotspot defects requiring immediate replacement
- **Average revenue recovery per farm**: 4.2% of annual yield

Inspections that previously required 3–5 days of ground crew work are now completed in a single flight day, with reports delivered within 48 hours.

## Why IEC Compliance Matters

IEC TS 62446-3 compliance ensures that thermal data is collected under consistent irradiance and temperature conditions, making results directly comparable across inspection cycles and acceptable for insurance and warranty claims.

Contact Aerata to schedule a thermal inspection for your solar portfolio.`,
    category: 'renewable_energy',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2025-04-12'),
    published: true,
  },
  {
    id: 2,
    title: 'Reducing Powerline Inspection Time by 60% Without Rope Access',
    excerpt: 'A 120 km transmission corridor in mountainous Greece — surveyed in days, not weeks. How LiDAR and RGB sensors are transforming linear infrastructure inspection across Europe.',
    content: `A 120 km transmission corridor in mountainous northern Greece was surveyed in four flight days — work that previously required three weeks of rope access teams and significantly higher mobilisation costs.

## The Project

The corridor ran through remote terrain with elevation changes exceeding 800 m, making ground access impractical for large sections. Traditional inspection methods required helicopter access or specialist rope access teams at each tower.

## The Approach

Aerata deployed the DJI Matrice 300 RTK with both the Zenmuse L1 LiDAR and H20T thermal-RGB payload. The LiDAR provided centimetre-accurate 3D point clouds of each tower and conductor span, while the H20T thermal camera flagged electrical anomalies and corrosion hotspots.

## Outcomes

- Full corridor surveyed in **4 flight days**
- **Zero rope access** or helicopter mobilisation required
- **LiDAR deliverables**: tower tilt measurements, conductor sag analysis, vegetation encroachment maps
- **Thermal deliverables**: 23 hotspot anomalies identified across 312 towers
- Total cost **60% lower** than the previous ground-based inspection cycle

The GIS-ready data was integrated directly into the client's asset management system, with all findings geolocated at sub-metre accuracy.`,
    category: 'infrastructure',
    featured_image: MEDIA.news_article_infrastructure_image,
    created_date: new Date('2025-03-28'),
    published: true,
  },
  {
    id: 3,
    title: 'LiDAR vs Photogrammetry: Choosing the Right Survey Method for Your Project',
    excerpt: 'Both technologies deliver engineering-grade spatial data — but the right choice depends on terrain, deliverable format, and budget. A practical guide for project managers and surveyors.',
    content: `Both LiDAR and photogrammetry deliver engineering-grade spatial data, but the right choice depends on terrain, required deliverables, timeline, and budget. Here's a practical breakdown.

## What Each Technology Delivers

**Photogrammetry** uses overlapping RGB images to reconstruct 3D geometry via Structure-from-Motion processing. Outputs include orthomosaics, dense point clouds, and textured 3D models.

**LiDAR** uses laser pulses to measure distances directly, producing highly accurate point clouds regardless of surface texture. It can penetrate vegetation to capture the ground beneath.

## When to Use Photogrammetry

- Open terrain with good texture (construction sites, archaeological sites, agricultural land)
- When you need high-resolution imagery alongside 3D data
- Budget-sensitive projects — photogrammetry processing is faster and cheaper
- Deliverables: orthomosaics, DSMs, 3D models

## When to Use LiDAR

- Forested or vegetated terrain where ground truth is needed beneath the canopy
- Infrastructure assets (powerlines, pipelines) requiring precise geometric measurement
- Projects requiring DTMs (Digital Terrain Models) not just DSMs
- When millimetre-level accuracy is specified in the contract

## Hybrid Approaches

For most infrastructure projects, Aerata deploys the DJI Zenmuse L1 — a combined LiDAR and RGB camera payload — delivering both datasets simultaneously. This eliminates the need to choose and provides redundant verification.

Speak to our survey team to determine the right approach for your project.`,
    category: 'technology',
    featured_image: MEDIA.news_article_ai_analytics_image,
    created_date: new Date('2025-03-14'),
    published: true,
  },
  {
    id: 4,
    title: 'Centimetre-Accurate Archaeological Mapping in the Peloponnese',
    excerpt: 'Sub-centimetre GSD orthomosaics and 3D point clouds of a 12-hectare dig site gave archaeologists GIS-ready data for excavation planning — delivered in under two days.',
    content: `A 12-hectare archaeological site in the Peloponnese was mapped to sub-centimetre ground sampling distance in a single flight day, with GIS-ready deliverables handed over within 48 hours.

## The Site

The excavation site included several distinct areas of interest spanning uneven terrain with significant elevation variation. The archaeology team needed precise 3D data to plan new excavation trenches and document existing finds in spatial context.

## Survey Specifications

- Platform: DJI Matrice 350 RTK with Zenmuse P1 45MP camera
- GCP network: 12 ground control points surveyed with RTK GNSS
- Flight altitude: 50 m AGL
- Achieved GSD: 0.8 cm/pixel
- Overlap: 85% forward, 75% side

## Deliverables

- Orthomsaic at 1 cm/pixel resolution
- Dense point cloud (800+ points/m²)
- Digital Elevation Model at 2 cm resolution
- 3D textured mesh for presentation and publication

## Impact

The team was able to identify previously unmapped structural features from the aerial orthomosaic, adjust their excavation plan accordingly, and use the point cloud as a permanent spatial record of the site's pre-excavation condition — all before a single trench was opened.`,
    category: 'surveying',
    featured_image: MEDIA.news_article_surveying_image,
    created_date: new Date('2025-02-24'),
    published: true,
  },
  {
    id: 5,
    title: 'EASA Specific Category: What It Means for Your Inspection Project',
    excerpt: 'Not all drone operators are equal. Understanding the EASA Specific Category authorisation — and why it matters for high-risk commercial operations over infrastructure and energy assets.',
    content: `Not all drone operators are equal. Understanding the EASA Specific Category authorisation is essential before commissioning any commercial drone operation over critical infrastructure, populated areas, or complex airspace.

## The EASA Drone Regulation Framework

Since January 2021, EASA regulations have divided commercial drone operations into three categories:

- **Open Category**: Low-risk operations with standard consumer drones, no permit required
- **Specific Category**: Higher-risk operations requiring a risk assessment (SORA) and authorisation from the national aviation authority
- **Certified Category**: Highest-risk operations equivalent to manned aviation

Most commercial inspection work — powerlines, solar farms, oil & gas facilities — falls under the **Specific Category**.

## What Specific Category Authorisation Requires

To obtain a Specific Category authorisation, an operator must:
1. Complete a Specific Operations Risk Assessment (SORA)
2. Demonstrate technical competence of the platform and crew
3. Hold appropriate insurance coverage
4. Receive written authorisation from their national CAA (in Aerata's case, both RCF Netherlands and HCAA Greece)

## Why This Matters for Your Project

Operating in the Specific Category without authorisation is illegal and voids your insurance coverage. For asset owners and energy companies, this means any incident involving an unauthorised operator creates significant liability.

Aerata holds active Specific Category authorisations in both the Netherlands and Greece, covering the full range of inspection operations we perform. All authorisations are available for review upon request.`,
    category: 'company_news',
    featured_image: MEDIA.news_article_company_news_image,
    created_date: new Date('2025-02-10'),
    published: true,
  },
  {
    id: 6,
    title: 'Offshore Platform Inspections: Eliminating Rope Access Risk in the North Sea',
    excerpt: 'Scaffold-free structural inspection of offshore assets using close-visual drone workflows. How Aerata delivered a complete corrosion mapping report with zero platform downtime.',
    content: `Scaffold-free structural inspection of an offshore platform in the North Sea was completed in three operational days, producing a complete corrosion mapping report with zero platform downtime and no personnel working at height.

## The Challenge

Traditional rope access or scaffold inspection of offshore platforms is expensive, slow, and carries significant safety risk. For a mid-sized platform, a traditional inspection can require 15–20 personnel over 2–3 weeks.

## The Drone Workflow

Aerata deployed the DJI Matrice 350 RTK with the Zenmuse H20T thermal-RGB payload. Flights were planned to achieve consistent standoff distances at every structural element, enabling photogrammetric reconstruction of corrosion maps across the entire platform exterior.

Key protocol elements:
- Close-visual inspection at 3–5 m standoff from structural elements
- Thermal overlay to identify active corrosion and structural anomalies
- Photogrammetric 3D model for baseline documentation

## Results

- **Zero** personnel required to work at height
- **Zero** platform downtime — inspection conducted during normal operations
- Full corrosion map delivered in 5 business days
- 3D model integrated into client's asset management system for future cycle comparison

The inspection identified 14 areas requiring intervention, enabling the maintenance team to prioritise high-risk areas and plan targeted repairs — compared to the typical approach of blanket surface preparation across entire sections.`,
    category: 'oil_gas',
    featured_image: MEDIA.news_article_oil_gas_image,
    created_date: new Date('2025-01-30'),
    published: true,
  },
  {
    id: 7,
    title: 'Wetland Habitat Mapping: 200 Hectares Surveyed in Two Flights',
    excerpt: 'Multi-spectral and RGB drone surveys captured vegetation density, water quality indicators, and biodiversity zones across a protected delta reserve — producing compliance-ready reports.',
    content: `200 hectares of protected wetland at a delta reserve were mapped in two flight operations, producing multi-spectral vegetation density maps, water quality indicators, and biodiversity zone classifications — all from drone data alone.

## The Survey

The site is a Natura 2000 protected area requiring annual monitoring reports for compliance with EU Habitats Directive obligations. Previous surveys required teams of field ecologists spending weeks on site with ground-level sampling.

## Methodology

Aerata deployed the DJI Matrice 350 RTK with the DJI Multispectral payload, capturing RGB and five-band multi-spectral imagery simultaneously across the entire reserve.

Processing produced:
- NDVI (Normalised Difference Vegetation Index) maps for vegetation health
- NDWI (Normalised Difference Water Index) for water body delineation
- Classified habitat maps across 7 vegetation types
- Change detection layer versus the previous year's baseline

## Deliverables

All outputs were delivered as georeferenced GeoTIFFs and SHP files compatible with the client's GIS platform, along with a compliance-ready monitoring report structured to the Habitats Directive reporting format.

The entire survey — including processing and report — was completed in 12 days, compared to the previous 6-week field campaign.`,
    category: 'environmental',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2025-01-15'),
    published: true,
  },
  {
    id: 8,
    title: 'Drone Inspection ROI: Real Numbers from the Field',
    excerpt: 'Solar: 30× faster at 65% lower cost. Pipelines: 6× faster at 69% savings. Construction surveys: 40× faster at 90% cost reduction. The business case for drone-first inspection is now indisputable.',
    content: `The ROI case for drone inspections has moved from theoretical to proven. Here are the numbers from Aerata's completed project portfolio.

## Solar Thermal Inspections

| Metric | Traditional | Drone-Based |
|--------|-------------|-------------|
| Time per MW | 0.5 days | 0.075 days |
| Cost per MW | €300 | €100 |
| Speed | — | **6.5× faster** |
| Cost saving | — | **67%** |

## Pipeline & Linear Infrastructure

| Metric | Traditional | Drone-Based |
|--------|-------------|-------------|
| Time per km | 2.5 days | 0.35 days |
| Cost per km | €2,500 | €450 |
| Speed | — | **7× faster** |
| Cost saving | — | **82%** |

## Construction & Topographic Surveys

| Metric | Traditional | Drone-Based |
|--------|-------------|-------------|
| Time per hectare | 0.8 days | 0.08 days |
| Cost per hectare | €450 | €65 |
| Speed | — | **10× faster** |
| Cost saving | — | **86%** |

## The Hidden Costs

These figures capture direct inspection costs and time. They do not include the indirect benefits: zero working-at-height incidents, reduced scaffolding and access equipment hire, and the value of higher-frequency inspection cycles that catch defects earlier.

For a 50 MW solar farm inspected annually, the cost differential over a 10-year period exceeds €1 million in favour of drone-based inspection.`,
    category: 'infrastructure',
    featured_image: MEDIA.news_article_infrastructure_image,
    created_date: new Date('2025-01-05'),
    published: true,
  },
  {
    id: 9,
    title: 'Night Operations and Beyond Visual Line of Sight: What Is Now Possible in Europe',
    excerpt: 'BVLOS and night-ops authorisations are changing what\'s achievable for infrastructure and energy operators. An overview of the current regulatory landscape and what Aerata\'s authorisations enable.',
    content: `BVLOS (Beyond Visual Line of Sight) and night operations authorisations are reshaping what commercial drone operations can deliver — and Aerata holds active authorisations for both in multiple jurisdictions.

## The Regulatory Path to BVLOS

Operating beyond visual line of sight requires a more detailed SORA (Specific Operations Risk Assessment) than standard Specific Category work. Key requirements include:

- Detect-and-Avoid (DAA) capability or airspace deconfliction coordination with the relevant ANSP
- Enhanced C2 (Command and Control) link reliability across the operational volume
- Demonstrated crew competence in BVLOS-specific emergency procedures
- Written authorisation from the national CAA specifying the operational area

## Night Operations

Night operations require all of the above plus:
- Anti-collision lighting visible from 1 km in clear conditions
- Lighting of any ground crew and equipment
- Enhanced pre-flight site assessment

## What This Enables

With BVLOS authorisation, a single drone can inspect a 50 km pipeline corridor in a single flight, rather than requiring multiple re-positioning operations with visual observers at each segment.

Night operations enable thermal inspections of solar farms during low-irradiance winter months, where daytime surveys are constrained by sun angle limitations.

Contact Aerata to discuss how BVLOS or night operations authorisations apply to your project requirements.`,
    category: 'technology',
    featured_image: MEDIA.news_article_ai_analytics_image,
    created_date: new Date('2024-12-18'),
    published: true,
  },
  {
    id: 10,
    title: 'Construction Site Monitoring: How Weekly Drone Surveys Reduced Rework by 30%',
    excerpt: 'Automated volume calculations and as-built vs. design comparisons delivered weekly across an 18-month residential development in Delft. The measurable impact on project delivery timelines.',
    content: `Automated volume calculations and as-built versus design comparisons, delivered weekly across an 18-month residential development in Delft, contributed to a 30% reduction in rework and kept the project on schedule.

## The Project

A 4.2-hectare residential development comprising 180 units required ongoing site monitoring to track earthwork volumes, structural progress, and compliance with the approved design model.

## The Monitoring Programme

Aerata flew weekly surveys throughout the construction programme using the DJI Matrice 350 RTK with Zenmuse P1 camera. Each survey took approximately 90 minutes and produced:

- Updated orthomosaic and point cloud
- Automated earthwork volume report (cut/fill calculations)
- As-built vs. design alignment comparison (1:500 design overlaid on survey data)
- Progress photography for client reporting

## Impact on the Project

The weekly data surfaced three significant as-built deviations from the design model before they had progressed to the point of requiring demolition. In each case, early identification and correction cost a fraction of what would have been required after further construction.

The project manager estimated that the drone monitoring programme paid for itself within the first six months through avoided rework costs alone.`,
    category: 'surveying',
    featured_image: MEDIA.news_article_surveying_image,
    created_date: new Date('2024-12-05'),
    published: true,
  },
  {
    id: 11,
    title: 'Aerata Partners with DroneLicense.eu for EU Drone Pilot Certification',
    excerpt: 'Aerata has formalised its training partnership with DroneLicense.eu to support EU-wide pilot certification. Together we provide end-to-end pathways from A1/A3 Open category to Specific category operations.',
    content: `Aerata has formalised a training partnership with DroneLicense.eu to support EU-wide drone pilot certification — providing end-to-end pathways from A1/A3 Open category to full Specific Category operations.

## The Partnership

DroneLicense.eu is an accredited training provider offering EASA-compliant drone certification programmes across the EU. The partnership with Aerata combines DroneLicense.eu's structured training curriculum with Aerata's operational expertise in commercial inspection environments.

## What the Partnership Offers

Participants can progress through:

1. **Open Category (A1/A3)** — The entry-level EASA certification required for all commercial drone use
2. **Open Category (A2)** — Advanced certificate enabling closer operation to people
3. **Specific Category Transition** — Practical training for operators seeking authorisation for higher-risk commercial work

Aerata contributes real-world case studies, operational procedures, and practical mentoring for candidates targeting Specific Category operations in energy, infrastructure, and surveying sectors.

## Why This Matters

The EU drone market is growing rapidly, but the supply of competent, certified operators has not kept pace with demand. This partnership aims to increase the pool of qualified commercial pilots across Europe, raising industry standards and safety.

Enquire through DroneLicense.eu or contact Aerata directly to discuss training pathways relevant to your sector.`,
    category: 'company_news',
    featured_image: MEDIA.news_article_company_news_image,
    created_date: new Date('2024-11-22'),
    published: true,
  },
  {
    id: 12,
    title: 'Wind Turbine Blade Inspections: From Hours to Minutes Per Turbine',
    excerpt: 'Working alongside Sulzer Schmid Laboratories, Aerata\'s drone-based blade inspection workflow identifies surface defects, lightning strike damage, and erosion at a fraction of traditional inspection time.',
    content: `Working alongside Sulzer Schmid Laboratories AG, Aerata has developed a drone-based blade inspection workflow that cuts per-turbine inspection time from hours to minutes while delivering higher-resolution defect data than traditional rope access.

## The Challenge with Traditional Blade Inspection

Conventional blade inspection requires either:
- Rope access technicians absailing from the nacelle (weather-dependent, high cost, significant HSE risk)
- Suspended cradle platforms (limited to turbines with access infrastructure)
- Ground-level binoculars (inadequate resolution for early defect detection)

## The Drone Workflow

Aerata's blade inspection workflow uses the DJI Matrice 350 RTK with the Zenmuse H20T payload, flying automated orbits around each blade face at 3–5 m standoff. The workflow captures:

- Full RGB photo sets of leading edge, pressure face, and suction face for each blade
- Thermal overlay for subsurface defect identification
- Automated defect marking in post-processing

## Partnership with Sulzer Schmid

Sulzer Schmid Laboratories AG provides the WT-Inspect software platform used to structure inspection data, classify defects by severity, and track defect progression across inspection cycles. The combination of Aerata's flight operations and Sulzer Schmid's analysis platform delivers bankable inspection reports acceptable to turbine OEMs and asset owners.

Per-turbine inspection time with this workflow: **12–18 minutes**, versus 4–6 hours for rope access. For a 50-turbine wind farm, this means a full fleet inspection in 3–4 days rather than 6–8 weeks.`,
    category: 'renewable_energy',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2024-11-08'),
    published: true,
  },
  {
    id: 13,
    title: 'AI Anomaly Detection in Solar Thermography: How It Works',
    excerpt: 'Machine learning models trained on thousands of IEC thermal datasets now flag cell-level defects, soiling patterns, and bypass diode failures with greater consistency than manual review.',
    content: `Machine learning models trained on large IEC-compliant thermal datasets now identify cell-level defects, soiling patterns, and bypass diode failures with greater consistency and speed than manual analyst review.

## The Problem with Manual Review

A thermal survey of a 10 MW solar farm produces thousands of thermal images. Manual review by a trained analyst takes days and introduces reviewer fatigue and inconsistency — different analysts may classify the same anomaly differently.

## How AI Anomaly Detection Works

Aerata's post-processing pipeline applies computer vision models trained on a proprietary dataset of IEC-classified thermal anomalies. The pipeline:

1. **Geo-registers** each thermal image to the farm layout
2. **Identifies panels** within each frame using object detection
3. **Flags temperature differentials** exceeding IEC threshold criteria
4. **Classifies defect type** — hotspot, bypass diode, soiling, string fault, etc.
5. **Generates panel-level reports** with GPS coordinates and severity scoring

## Accuracy vs Manual Review

In comparative testing on a 15 MW dataset, the AI pipeline achieved:
- **98.3% detection rate** for Class A (critical) defects
- **94.7% detection rate** for Class B (significant) defects
- **False positive rate**: 2.1%

These results exceeded manual review performance on Class A defects by 3.4 percentage points.

## Delivery Speed

AI-assisted processing reduces analysis time by 80% compared to manual review, enabling Aerata to deliver 48-hour reports for farms up to 50 MW.`,
    category: 'technology',
    featured_image: MEDIA.news_article_ai_analytics_image,
    created_date: new Date('2024-10-25'),
    published: true,
  },
  {
    id: 14,
    title: 'Lake Marathon Multispectral Survey: Monitoring Drinking Water from Above',
    excerpt: 'Commissioned by VITO and EYDAP, Aerata\'s multispectral drone surveys of Lake Marathon provided early indicators of algal bloom risk and turbidity changes in one of Athens\' primary water sources.',
    content: `Commissioned jointly by VITO (Flemish Institute for Technological Research) and EYDAP (Athens Water Supply and Sewerage Company), Aerata's multispectral surveys of Lake Marathon provided early-warning indicators of algal bloom risk and turbidity changes across one of Athens' primary drinking water reservoirs.

## The Survey Context

Lake Marathon supplies approximately 10% of Athens' drinking water. Seasonal algal blooms — driven by temperature, nutrient loading, and reduced circulation — pose a water quality risk requiring early intervention to prevent treatment cost spikes.

Previous monitoring relied on a network of fixed sensors providing point measurements. The drone survey programme supplemented this with spatially continuous data across the entire 2.4 km² reservoir surface.

## The Survey Programme

Aerata flew quarterly surveys using the DJI Matrice 350 RTK with DJI Multispectral payload, capturing:

- **Chlorophyll-a concentration proxy** (NDCI index) — indicator of algal biomass
- **Turbidity mapping** (NDWI and custom band ratios)
- **Surface temperature distribution** (Zenmuse H20T thermal band)

Each survey covered the full reservoir in two flight missions, with georeferenced outputs delivered within 72 hours.

## Outcomes

Two of the four quarterly surveys identified developing algal bloom conditions approximately 3–4 weeks before they would have been detectable by the fixed sensor network. This advance warning enabled the treatment plant to adjust chemical dosing proactively, avoiding a reactive response scenario.`,
    category: 'environmental',
    featured_image: MEDIA.news_article_lidar_tech_image,
    created_date: new Date('2024-10-10'),
    published: true,
  },
  {
    id: 15,
    title: 'Aerata Opens Athens Office to Serve Mediterranean and Southeast European Markets',
    excerpt: 'With a growing project pipeline across Greece and the broader Mediterranean region, Aerata has established a permanent operational base in Alimos, Athens, enabling faster mobilisation for regional projects.',
    content: `With a growing project pipeline across Greece and the broader Mediterranean region, Aerata has established a permanent operational base in Alimos, Athens — enabling faster mobilisation for regional projects and expanding our capacity to serve Southeast European clients.

## Why Athens

Greece has emerged as a significant market for professional drone services across three sectors:

1. **Renewable Energy**: Greece is on track to install over 10 GW of solar capacity by 2030. Each solar farm requires periodic thermal inspection, and the pipeline of new installations drives consistent demand.

2. **Archaeological and Cultural Heritage**: Greece's density of archaeological sites creates sustained demand for high-accuracy photogrammetric mapping in support of excavation, conservation, and documentation projects.

3. **Environmental Monitoring**: Greece's extensive coastline, wetlands, and protected Natura 2000 areas require regular monitoring under EU Habitats Directive obligations.

## The Athens Team

The Athens office is led by Aerata co-founder Spyridon Konstantinopoulos, who has managed operations across the Greek market since 2022. The team includes three EASA-certified pilots and a dedicated post-processing analyst.

## Operational Coverage

From Alimos, Aerata can mobilise to any mainland Greek location within 4 hours and to island locations within 24 hours via pre-arranged logistics. The office maintains a full complement of DJI Enterprise platforms and sensor payloads.

For project enquiries in Greece or the broader Mediterranean region, contact the Athens office directly.`,
    category: 'company_news',
    featured_image: MEDIA.news_article_company_news_image,
    created_date: new Date('2024-09-20'),
    published: true,
  },
];
