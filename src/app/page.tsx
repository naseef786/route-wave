import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Weight,
  CheckCircle,
  FileText,
  MessageSquareCheck,
  CalendarCheck,
  MapPin,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig, getActiveServices } from "@/config/site";
import { FleetOrientationShowcase } from "@/components/fleet/FleetOrientationShowcase";

export default function HomePage() {
  const activeServices = getActiveServices();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* Ambient background subtle tint */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/uae-transport-corridor.jpg"
            alt="UAE commercial transport highway corridor with transport trucks"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-amber-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-6 max-w-full flex-wrap leading-normal">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span>Commercial Road Haulage • United Arab Emirates</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
              {siteConfig.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              {siteConfig.supportingCopy}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request a Quote
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                className="text-white border-slate-700 hover:bg-slate-900/60"
              >
                View Services
              </Button>
            </div>

            {/* Credibility anchors (fact-based, no invented stats) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 mt-8 sm:pt-12 sm:mt-12 border-t border-slate-800/80">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Fleet Scope
                </p>
                <p className="text-sm font-semibold text-white mt-1">
                  Light & Heavy Trucks
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Cargo Focus
                </p>
                <p className="text-sm font-semibold text-white mt-1">
                  General Materials
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Operations
                </p>
                <p className="text-sm font-semibold text-white mt-1">
                  UAE Road Corridors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Short Company Introduction */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
                <span>About Route Wave</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Practical, Dependable Road Transport for Commercial Operations
              </h2>
              <p className="text-slate-650 text-base leading-relaxed">
                Route Wave General Transport provides dedicated road transport services
                across the United Arab Emirates. We operate commercial light and heavy
                trucks to move materials, industrial components, packaged supplies, and
                commercial goods between suppliers, project sites, and distribution facilities.
              </p>
              <p className="text-slate-650 text-base leading-relaxed">
                Our approach is grounded in direct communication, practical route planning,
                and respect for project schedules. Every enquiry is assessed on specific
                load parameters to ensure the right vehicle is deployed for the job.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-md bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Load-Specific Planning
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Assessing weight, dimensions, and securing requirements for safe transit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-md bg-slate-50 border border-slate-200">
                  <Building2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Direct Route Haulage
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Point-to-point transit connecting commercial yards, warehouses, and sites.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md">
                <div className="relative aspect-video sm:aspect-[4/3] min-h-[220px] sm:min-h-[280px]">
                  <Image
                    src="/images/loading-dock-operations.jpg"
                    alt="Commercial transport vehicle at modern industrial loading dock in the UAE"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">
                    Industrial Logistics Bay Transit
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Coordinating pickups and offloading with facility loading docks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Confirmed Services Overview */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Transport Services
            </h2>
            <p className="text-slate-650 text-sm sm:text-base mt-3 leading-relaxed">
              We provide road transport tailored to commercial consignments across two
              primary vehicle categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="relative aspect-video w-full min-h-[200px] sm:min-h-[240px] bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-5 sm:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    {service.id === "light-trucks" ? (
                      <Truck className="w-5 h-5 text-amber-600" />
                    ) : (
                      <Weight className="w-5 h-5 text-amber-600" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {service.shortTitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-slate-650 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-8 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Highlights:
                    </p>
                    {service.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Link
                      href={`/services#${service.id}`}
                      className="text-xs font-bold text-slate-800 hover:text-amber-700 transition-colors inline-flex items-center justify-center sm:justify-start gap-1.5 py-1"
                    >
                      <span>Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Button
                      href={`/contact?service=${service.id}`}
                      variant="amber"
                      size="sm"
                      className="w-full sm:w-auto text-center"
                    >
                      Request a Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Real-World Field Operations & Heavy Tipper Fleet (Portrait Orientation Showcase) */}
      <FleetOrientationShowcase variant="home" />

      {/* 5. Three-Step Enquiry Process */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Simple & Straightforward
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Three-Step Quotation Process
            </h2>
            <p className="text-slate-650 text-sm sm:text-base mt-3 leading-relaxed">
              We keep booking transport straightforward. Provide your shipment details,
              and our operations team will evaluate vehicle requirements and route logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col">
              <div className="w-10 h-10 rounded-md bg-slate-900 text-white font-bold text-base flex items-center justify-center mb-5">
                01
              </div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Share Your Requirements
                </h3>
              </div>
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                Submit details about your cargo, approximate weight, dimensions, origin,
                destination, and preferred transport timing using our enquiry form.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col">
              <div className="w-10 h-10 rounded-md bg-slate-900 text-white font-bold text-base flex items-center justify-center mb-5">
                02
              </div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquareCheck className="w-4 h-4 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Discuss Transport Details
                </h3>
              </div>
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                Our team reviews vehicle capacity, loading dock accessibility, and route
                conditions, contacting you if any specific details need clarification.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col">
              <div className="w-10 h-10 rounded-md bg-slate-900 text-white font-bold text-base flex items-center justify-center mb-5">
                03
              </div>
              <div className="flex items-center gap-2 mb-2">
                <CalendarCheck className="w-4 h-4 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Receive a Quotation
                </h3>
              </div>
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                Receive a transparent, competitive commercial quote tailored to your load
                and schedule, with clear terms for haulage and dispatch.
              </p>
            </div>
          </div>

          {/* Important honest disclaimer */}
          <div className="mt-8 p-4 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <span className="font-bold shrink-0 uppercase tracking-wide">Notice:</span>
            <p>
              Submitting an enquiry allows our operations team to evaluate vehicle suitability
              and prepare an accurate quotation. It does not constitute a confirmed booking.
              Transit is confirmed once terms and schedules are agreed upon directly with our team.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Useful Information Customers Should Provide */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Enquiry Preparation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Information to Include in Your Transport Request
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Providing comprehensive consignment details up front helps our dispatchers
                quickly determine vehicle type, calculate required load securing, and return
                an accurate quotation.
              </p>
              <div className="pt-2">
                <Button
                  href="/contact"
                  variant="amber"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start an Enquiry
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Weight className="w-4 h-4" />
                    <h3 className="text-sm font-bold text-white">Cargo Specifics</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Estimated weight, package count, pallet dimensions, and material type
                    (e.g., steel, precast, crated goods, or boxed stock).
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <MapPin className="w-4 h-4" />
                    <h3 className="text-sm font-bold text-white">Route Locations</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Accurate pickup origin and delivery destination within the UAE, noting
                    any specific industrial zone or access checkpoints.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <CalendarCheck className="w-4 h-4" />
                    <h3 className="text-sm font-bold text-white">Preferred Schedule</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Target pickup date and delivery window, including any site-specific
                    receiving hours or entry restrictions.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Truck className="w-4 h-4" />
                    <h3 className="text-sm font-bold text-white">Site Access & Handling</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Loading method available at both ends (e.g., forklift, overhead crane,
                    tail lift requirement, or flat ground loading).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Call to Action */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Ready to Discuss Your Transport Requirements?
          </h2>
          <p className="text-slate-650 text-base leading-relaxed max-w-xl mx-auto mb-8">
            Contact Route Wave General Transport with your consignment parameters.
            Our team will review your route and provide a commercial quotation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Request a Quote
            </Button>
            <Button
              href="/services"
              variant="outline"
              size="lg"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
