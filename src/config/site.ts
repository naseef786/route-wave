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
  services: ServiceItem[];
}

export const siteConfig: SiteConfig = {
  brandName: "Route Wave General Transport",
  legalName: "ROUTE WAVE GENERAL TRANSPORT - L.L.C - S.P.C",
  tagline: "Reliable Commercial Road Transport in the UAE",
  headline: "Reliable Transport for Your Business",
  supportingCopy:
    "General materials transport with light and heavy trucks. Contact Route Wave to discuss your load, route, and transport requirements.",
  candidateDomain: "routewave.ae",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://routewave.ae",
  contact: {
    // Verified production values must be provided by the client prior to public launch.
    // Kept null during development to prevent shipping placeholder data.
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || null,
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || null,
    whatsappDisplay: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY || null,
    address: null, // Omitted until physical office/yard address is formally confirmed
    workingHours: null, // Omitted until operating schedule is formally confirmed
    serviceAreas: null, // Omitted until exact coverage boundaries are confirmed
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
