import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Truck, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FleetOrientationShowcase } from "@/components/fleet/FleetOrientationShowcase";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Route Wave General Transport, our focus on UAE commercial road haulage, and our practical approach to general materials transportation.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
              Company Overview
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              About Route Wave General Transport
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              A UAE-based road transport entity dedicated to dependable general materials
              movement using commercial light and heavy vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Approach */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Our Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Focused on Commercial General Materials Transport
              </h2>
              <div className="prose prose-slate text-slate-650 text-base leading-relaxed space-y-4">
                <p>
                  Route Wave General Transport is established in the United Arab Emirates
                  to meet commercial demand for direct, point-to-point materials haulage.
                  We connect supply hubs, industrial facilities, and project work sites
                  with light and heavy transport solutions.
                </p>
                <p>
                  Rather than making inflated marketing claims, our business is built
                  on clear operational principles: understanding exactly what our customers
                  need transported, verifying route feasibility, selecting appropriate
                  vehicle configurations, and coordinating directly with site teams.
                </p>
                <p>
                  Our commercial transport activities focus specifically on general materials
                  transport via light trucks and heavy trucks, providing reliable road
                  transit for industrial cargo, boxed consignments, and site materials.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-slate-50 border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Commercial Fleet Scope</span>
                  </h3>
                  <p className="text-xs text-slate-650 leading-relaxed">
                    Light commercial trucks for flexible, urgent consignments and heavy
                    trucks for high-tonnage industrial freight.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-slate-50 border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>UAE Road Corridors</span>
                  </h3>
                  <p className="text-xs text-slate-650 leading-relaxed">
                    Transit planned across established UAE commercial corridors, industrial
                    zones, and logistics parks.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-slate-200 shadow-md">
                <div className="relative aspect-video sm:aspect-[4/3] min-h-[220px] sm:min-h-[280px] w-full">
                  <Image
                    src="/images/heavy-truck-transport.jpg"
                    alt="Representative commercial heavy truck on UAE highway carrying industrial cargo"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-800">
                    Commercial Materials Haulage
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Representative heavy transport vehicle transporting secured construction materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Principles */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              How We Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Our Approach to Transport Requirements
            </h2>
            <p className="text-slate-650 text-sm sm:text-base mt-3 leading-relaxed">
              We treat each consignment with disciplined operational care. Here is how
              we evaluate and manage customer transport requests:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-xs">
              <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                1. Requirement Analysis
              </h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                We review dimensions, weight, and handling specifics before offering a
                quote. Understanding cargo physical properties guarantees vehicle compatibility.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-xs">
              <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                2. Cargo Securing & Safety
              </h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                Safety on the road is paramount. Every consignment is evaluated for load
                distribution, lashing requirements, and safe transit conditions.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-xs">
              <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                3. Direct Point-to-Point Routes
              </h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                We schedule direct routes between pickup and delivery destinations,
                avoiding unnecessary cargo transfers or multi-handling delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Field Equipment & Heavy Fleet Operational Readiness (Portrait Orientation Showcase) */}
      <FleetOrientationShowcase variant="about" />

      {/* Quick Links & CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Discuss Your Cargo & Transport Route
          </h2>
          <p className="text-slate-650 text-base leading-relaxed max-w-xl mx-auto mb-8">
            Review our active transport services or submit your shipment parameters
            to receive a tailored quotation from Route Wave.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/services"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Transport Services
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
            >
              Contact Our Operations Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
