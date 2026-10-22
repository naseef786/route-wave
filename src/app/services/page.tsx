import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  Truck,
  Weight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getActiveServices } from "@/config/site";
import { FleetOrientationShowcase } from "@/components/fleet/FleetOrientationShowcase";

export const metadata: Metadata = {
  title: "Commercial Road Transport Services",
  description:
    "Explore Route Wave General Transport services in the UAE: General Materials Transport with Light Trucks and Heavy Trucks. View capabilities and quotation guidelines.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const activeServices = getActiveServices();

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
              Commercial Haulage Services
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Road Transport Services in the UAE
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              We provide dedicated general materials transport tailored to commercial,
              industrial, and trade clients across the United Arab Emirates.
            </p>
          </div>
        </div>
      </section>

      {/* Services List on Single Page */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {activeServices.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28 border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image column */}
                <div
                  className={`lg:col-span-5 relative bg-slate-100 min-h-[280px] lg:min-h-full ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content column */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div>
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

                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      {service.title}
                    </h2>

                    <p className="text-amber-800 text-sm font-semibold mb-4">
                      {service.headline}
                    </p>

                    <p className="text-slate-650 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Capabilities */}
                    <div className="mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Core Service Capabilities</span>
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {service.capabilities.map((cap, cIdx) => (
                          <li
                            key={cIdx}
                            className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-md border border-slate-100"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to include in enquiry */}
                    <div className="mb-8 p-4 rounded-md bg-amber-50/70 border border-amber-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                        <ClipboardList className="w-4 h-4 text-amber-700" />
                        <span>What to Provide in Your Enquiry</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-amber-950">
                        {service.enquiryGuidelines.map((guide, gIdx) => (
                          <li key={gIdx} className="flex items-start gap-2">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{guide}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {service.id === "heavy-trucks" && (
                      <div className="mb-6 p-3.5 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                          <span className="text-xs font-semibold text-slate-200">
                            Active Heavy Tipper & Bulk Quarry Haulage Units Available
                          </span>
                        </div>
                        <a
                          href="#field-operations-showcase"
                          className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 shrink-0 transition-colors"
                        >
                          <span>View Field Showcase</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Service CTA */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Representative vehicle imagery shown.
                    </p>
                    <Button
                      href={`/contact?service=${service.id}`}
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto text-center"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      <span>Request a Quote</span>
                      <span className="hidden sm:inline"> for {service.shortTitle}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heavy Tipper & Bulk Materials Transport Spotlight (Portrait Orientation Showcase) */}
      <FleetOrientationShowcase variant="services" />

      {/* General Transport Enquiry Guidance */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-lg bg-white border border-slate-200 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Unsure which vehicle category fits your consignment?
                </h3>
                <p className="text-sm text-slate-650 leading-relaxed">
                  If your load falls between standard light truck capacity and heavy haulage,
                  simply submit your estimated weight, cargo physical dimensions, and
                  pickup location in our enquiry form. Our dispatch team will recommend
                  the most appropriate vehicle configuration for your requirements.
                </p>
                <div className="pt-2">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Contact Dispatch Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
