export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  description: string;
  capabilities: string[];
  enquiryGuidelines: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  enabled: boolean; // Controls public visibility (e.g. license approval gate)
  approvalNote?: string; // Internal record for handover documentation
}

export interface FleetVehicleItem {
  id: string;
  title: string;
  badge: string;
  category: string;
  vehicleModel: string;
  orientation: "portrait-tall" | "portrait-standard";
  aspectRatioDisplay: string;
  image: string;
  imageAlt: string;
  caption: string;
  summary: string;
  specs: {
    label: string;
    value: string;
  }[];
  capabilities: string[];
}

export interface SiteConfig {
  brandName: string;
  legalName: string;
  tagline: string;
  headline: string;
  supportingCopy: string;
  candidateDomain: string;
  siteUrl: string;
  contact: {
    // Only published when confirmed by business; if null or empty, UI omits safely.
    email: string | null;
    phone: string | null;
    phoneDisplay: string | null;
    whatsapp: string | null;
    whatsappDisplay: string | null;
    address: string | null;
    workingHours: string | null;
    serviceAreas: string | null;
  };
  social: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    x?: string;
  };
  services: ServiceItem[];
  fleetVehicles: FleetVehicleItem[];
}

export const siteConfig: SiteConfig = {
  brandName: "Route Wave General Transport",
  legalName: "ROUTE WAVE GENERAL TRANSPORT - L.L.C - S.P.C",
  tagline: "Commercial Transport & Logistics Solutions",
  headline: "Safe Transport | On Time | Every Time",
  supportingCopy:
    "Commercial materials transport with light and heavy trucks across Abu Dhabi, Dubai, and UAE trade routes. Contact Route Wave to discuss your consignment requirements.",
  candidateDomain: "routewave.ae",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.routewave.ae",
  contact: {
    // Verified production values extracted from official letterhead documentation:
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@routewave.ae",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+971505447771",
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "+971 50 544 7771",
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "+971505447771",
    whatsappDisplay: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY || "+971 50 544 7771",
    address: "Plot 0.4, Mussafah West, MW4, Al Aaji 5th St, Abu Dhabi, United Arab Emirates",
    workingHours: "Saturday – Thursday: 7:00 AM – 7:00 PM",
    serviceAreas: "Abu Dhabi, Dubai, Sharjah, Mussafah, and all UAE industrial transport corridors",
  },
  social: {
    linkedin: "https://www.linkedin.com",
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    x: "https://x.com",
  },
  services: [
    {
      id: "light-trucks",
      slug: "light-trucks",
      title: "General Materials Transport — Light Trucks",
      shortTitle: "Light Truck Transport",
      headline: "Commercial Light Truck Haulage for Time-Sensitive and Flexible Cargo",
      description:
        "Dedicated point-to-point road transport for commercial supplies, boxed cargo, packaged goods, and smaller commercial consignments across UAE industrial and commercial zones.",
      capabilities: [
        "Palletized freight and boxed commercial consignments",
        "Point-to-point urban and industrial road transport",
        "Direct delivery to commercial premises and job sites",
        "Scheduled pickups and dedicated vehicle dispatch",
      ],
      enquiryGuidelines: [
        "Estimated cargo weight and overall consignment dimensions",
        "Specific pickup and delivery locations within the UAE",
        "Target date and loading dock access conditions",
      ],
      image: "/images/light-truck-transport.jpg",
      imageAlt: "Commercial light truck operating on a modern UAE highway corridor",
      imageCaption: "Representative light commercial vehicle operating on a UAE transport route.",
      enabled: true,
    },
    {
      id: "heavy-trucks",
      slug: "heavy-trucks",
      title: "General Materials Transport — Heavy Trucks",
      shortTitle: "Heavy Truck Transport",
      headline: "Robust Heavy Truck Transport for Bulk Industrial & Construction Materials",
      description:
        "Heavy-duty transport for industrial raw materials, structural steel, precast elements, construction supplies, and high-tonnage consignments requiring heavy road freight.",
      capabilities: [
        "Heavy industrial materials and construction components",
        "Open flatbed and heavy commercial transport options",
        "Secured cargo strapping and transport safety compliance",
        "Coordinated transit between supply yards, ports, and project sites",
      ],
      enquiryGuidelines: [
        "Description of cargo, total tonnage, and physical dimensions",
        "Site loading and offloading equipment available (crane, forklift)",
        "Origin and destination route points, plus desired transit date",
      ],
      image: "/images/heavy-truck-transport.jpg",
      imageAlt: "Commercial heavy truck transporting industrial materials on a UAE road",
      imageCaption: "Representative heavy transport vehicle carrying secured industrial cargo.",
      enabled: true,
    },
    {
      id: "concrete-waste",
      slug: "concrete-waste",
      title: "Construction and Demolition Concrete Waste Transportation",
      shortTitle: "Concrete Waste Transport",
      headline: "Compliant Removal and Haulage of Concrete and Demolition Debris",
      description:
        "Specialized transportation of inert construction debris, crushed concrete, and demolition rubble from active sites to authorized processing and disposal locations.",
      capabilities: [
        "Bulk inert construction rubble and concrete debris haulage",
        "Site clearing support for demolition and excavation contractors",
        "Transit to authorized UAE recycling or disposal facilities",
      ],
      enquiryGuidelines: [
        "Estimated volume or tonnage of concrete waste",
        "Site access conditions for heavy tippers or loading machinery",
        "Project location and planned timeline",
      ],
      image: "/images/loading-dock-operations.jpg",
      imageAlt: "Transport operations and material handling in a UAE logistics setting",
      imageCaption: "Representative material handling and site transit operations.",
      // Gated by trade license approval condition: must not be publicly advertised
      // until confirmed operational and approved by regulatory authority.
      enabled: false,
      approvalNote:
        "Subject to additional trade license approval condition. Retained in codebase and configuration, but set to enabled: false. Flip to true only after client obtains statutory approval and gives operational authorization.",
    },
  ],
  fleetVehicles: [
    {
      id: "heavy-tipper-quarry",
      title: "Heavy Semi-Tipper Bulk Haulage",
      badge: "Quarry & Excavation Operations",
      category: "High-Capacity Bulk Haulage",
      vehicleModel: "Volvo Globetrotter Heavy Tractor + Tri-Axle Semi-Tipper Trailer",
      orientation: "portrait-tall",
      aspectRatioDisplay: "9:19 Vertical Orientation",
      image: "/images/heavy-tipper-quarry-operations.jpg",
      imageAlt: "Volvo Globetrotter heavy tipper semi-trailer loading sand aggregate in a UAE quarry excavation pit",
      caption: "High-capacity heavy tipper unit active in bulk sand, gravel, and earthworks excavation haulage.",
      summary:
        "Engineered for deep-pit quarry excavation and massive aggregate transfer. Combines high-payload tri-axle tipper trailers with high-torque tractor units for dependable bulk haulage.",
      specs: [
        { label: "Axle Setup", value: "Multi-Axle Tractor + Tri-Axle Semi-Tipper" },
        { label: "Payload Capacity", value: "Up to 45–50 Metric Tonnes" },
        { label: "Primary Cargo", value: "Sand, Gravel, Aggregates & Excavation Fill" },
        { label: "Terrain Capability", value: "Quarry Pits, Desert Sites & Highway Corridors" },
        { label: "Discharge Method", value: "High-Angle Rear Hydraulic Tipping" },
        { label: "Route Scope", value: "All UAE Industrial Corridors & Extraction Zones" },
      ],
      capabilities: [
        "Continuous high-tonnage aggregate transit from extraction quarries to batching plants",
        "Deep quarry pit accessibility with high-torque multi-axle traction",
        "Fast hydraulic discharge reducing turnaround times at destination yards",
        "Strict compliance with UAE road axle weight and cargo containment regulations",
      ],
    },
    {
      id: "mercedes-actros-tipper-fleet",
      title: "All-Terrain Heavy Tipper Fleet",
      badge: "Multi-Axle Desert & Site Fleet",
      category: "Heavy-Duty All-Terrain Tippers",
      vehicleModel: "Mercedes-Benz Actros Multi-Axle Heavy-Duty Dump Trucks",
      orientation: "portrait-standard",
      aspectRatioDisplay: "4:5 Portrait Orientation",
      image: "/images/mercedes-actros-tipper-fleet.jpg",
      imageAlt: "Fleet of Mercedes-Benz Actros heavy tipper trucks deployed in UAE desert and construction terrain",
      caption: "Rugged multi-axle all-terrain tippers equipped for desert sand tracks and demanding infrastructure projects.",
      summary:
        "Built for severe off-road construction sites, unpaved sand tracks, and heavy infrastructure developments across Abu Dhabi, Dubai, and UAE desert corridors.",
      specs: [
        { label: "Chassis Series", value: "Mercedes-Benz Actros Heavy Duty" },
        { label: "Tire Configuration", value: "Deep-Tread Heavy-Lug Off-Road Tires" },
        { label: "Drive Configuration", value: "Multi-Axle All-Wheel Site Drive" },
        { label: "Site Readiness", value: "Soft Sand, Graded Tracks & Rough Terrains" },
        { label: "Deployment Scope", value: "Earthworks, Land Reclamation & Infrastructure" },
        { label: "Operating Capacity", value: "High-Volume Repeated Site Shuttle Cycles" },
      ],
      capabilities: [
        "Superior tractive effort across loose sand and uncompacted construction surfaces",
        "Heavy-gauge reinforced steel tipper bodies resistant to abrasive rock and fill",
        "High ground clearance engineered for rough terrain and active excavation access",
        "Reliable fleet coordination for major infrastructure and land development projects",
      ],
    },
  ],
};

// Helper to retrieve only publicly active services
export function getActiveServices(): ServiceItem[] {
  return siteConfig.services.filter((s) => s.enabled);
}

// Helper to look up service by ID or slug (including inactive for validation purposes if needed)
export function getServiceById(idOrSlug: string): ServiceItem | undefined {
  return siteConfig.services.find(
    (s) => s.id === idOrSlug || s.slug === idOrSlug
  );
}

// Helper to retrieve fleet vehicles
export function getFleetVehicles(): FleetVehicleItem[] {
  return siteConfig.fleetVehicles;
}

