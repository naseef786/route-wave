"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize2,
  X,
  Truck,
  ShieldCheck,
  Compass,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";
import { getFleetVehicles, FleetVehicleItem } from "@/config/site";
import { Button } from "@/components/ui/Button";

interface FleetOrientationShowcaseProps {
  variant?: "home" | "services" | "about";
  className?: string;
}

export function FleetOrientationShowcase({
  variant = "home",
  className = "",
}: FleetOrientationShowcaseProps) {
  const vehicles = getFleetVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicleItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVehicle(null);
      }
    };
    if (selectedVehicle) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVehicle]);

  const filteredVehicles =
    activeTab === "all"
      ? vehicles
      : vehicles.filter((v) => v.id === activeTab);

  const sectionHeaders = {
    home: {
      badge: "Real-World Field Operations",
      title: "Heavy Tipper Fleet & Quarry Haulage",
      subtitle:
        "High-tonnage aggregate transit, deep-pit quarry extraction, and desert infrastructure logistics engineered for the UAE's demanding terrain.",
    },
    services: {
      badge: "Field Equipment & Capabilities",
      title: "Heavy Tipper & Bulk Materials Transport Spotlight",
      subtitle:
        "Specialized high-capacity tippers and all-terrain multi-axle trucks supporting bulk sand, gravel, and civil earthworks operations across the Emirates.",
    },
    about: {
      badge: "Equipment & Operational Readiness",
      title: "Field Deployment & Commercial Equipment",
      subtitle:
        "A closer look at Route Wave's heavy road haulage equipment active in major quarries, desert corridors, and demanding industrial transport sectors.",
    },
  }[variant];

  return (
    <section
      id="field-operations-showcase"
      className={`py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden ${className}`}
    >
      {/* Background ambient decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{sectionHeaders.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {sectionHeaders.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              {sectionHeaders.subtitle}
            </p>
          </div>

          {/* Orientation Filter / View Toggle */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All Field Units
            </button>
            <button
              onClick={() => setActiveTab("heavy-tipper-quarry")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === "heavy-tipper-quarry"
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Quarry Semi-Tipper (9:19)
            </button>
            <button
              onClick={() => setActiveTab("mercedes-actros-tipper-fleet")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeTab === "mercedes-actros-tipper-fleet"
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All-Terrain Fleet (4:5)
            </button>
          </div>
        </div>

        {/* Orientation-Optimized Showcase Cards Grid */}
        <div
          className={`grid gap-8 ${
            filteredVehicles.length === 1
              ? "grid-cols-1 max-w-4xl mx-auto"
              : "grid-cols-1 lg:grid-cols-12"
          }`}
        >
          {filteredVehicles.map((vehicle) => {
            const isTall = vehicle.orientation === "portrait-tall";
            const colSpan =
              filteredVehicles.length === 1
                ? "lg:col-span-12"
                : isTall
                ? "lg:col-span-5"
                : "lg:col-span-7";

            return (
              <div
                key={vehicle.id}
                className={`${colSpan} group flex flex-col bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300`}
              >
                {/* Visual Image Container with Native Portrait Orientation Placement */}
                <div className="relative bg-slate-950 overflow-hidden flex items-center justify-center">
                  {/* Subtle ambient glow behind the portrait frame */}
                  <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                  {/* Orientation Tag Badge */}
                  <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700 text-amber-400 text-[11px] font-semibold tracking-wide shadow-md">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      {vehicle.badge}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[10px] font-mono">
                      {vehicle.aspectRatioDisplay}
                    </span>
                  </div>

                  {/* Full Size Preview Trigger Button */}
                  <button
                    onClick={() => setSelectedVehicle(vehicle)}
                    aria-label={`View ${vehicle.title} in full screen`}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer shadow-lg group/btn"
                    title="Click to view full uncropped orientation in high-res"
                  >
                    <Maximize2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  </button>

                  {/* Portrait Image Frame - Respects Natural Portrait Aspect Ratio */}
                  <div
                    onClick={() => setSelectedVehicle(vehicle)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedVehicle(vehicle);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${vehicle.title} in full resolution`}
                    className={`relative w-full cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      isTall
                        ? "aspect-[9/18] sm:aspect-[9/16] max-h-[640px]"
                        : "aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5] max-h-[640px]"
                    }`}
                  >
                    <Image
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover ${
                        isTall ? "object-[center_55%]" : "object-center"
                      } group-hover:scale-105 transition-transform duration-700 ease-out`}
                    />

                    {/* Gradient Overlay for bottom readability without obscuring truck */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Tap to expand hint */}
                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] text-slate-300 font-medium border border-slate-800/80 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
                      <Maximize2 className="w-3 h-3 text-amber-400" />
                      <span>Inspect Full High-Res</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                      <Truck className="w-4 h-4" />
                      <span>{vehicle.category}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {vehicle.title}
                    </h3>

                    <p className="text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-slate-800">
                      {vehicle.vehicleModel}
                    </p>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                      {vehicle.summary}
                    </p>

                    {/* Operational Specifications Grid */}
                    <div className="mb-6">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        <span>Technical Operational Parameters</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        {vehicle.specs.slice(0, 4).map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800"
                          >
                            <p className="text-[10px] uppercase font-semibold text-slate-400">
                              {spec.label}
                            </p>
                            <p className="text-xs font-bold text-white mt-0.5 truncate">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capability Bullets */}
                    <div className="space-y-2 mb-6">
                      {vehicle.capabilities.slice(0, 3).map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-start gap-2 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 py-1.5 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Vehicle & Route Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <Button
                      href="/contact?service=heavy-trucks"
                      variant="amber"
                      size="sm"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Request Tipper Haulage
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Scope Credibility Footer */}
        <div className="mt-12 p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Comprehensive UAE Haulage Coverage
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Active in Abu Dhabi, Mussafah, Al Dhafra, Dubai industrial zones, Ras Al Khaimah aggregate corridors, and regional project sites.
              </p>
            </div>
          </div>

          <Link
            href="/services#heavy-trucks"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 shrink-0 transition-colors"
          >
            <span>Explore Heavy Haulage Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Full-Screen High-Res Orientation Lightbox Modal */}
      {selectedVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedVehicle(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVehicle(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-Resolution Uncropped Portrait Image Container */}
            <div className="lg:w-1/2 relative bg-slate-950 flex items-center justify-center p-3 sm:p-6 min-h-[360px] sm:min-h-[460px] lg:min-h-full">
              <div
                className={`relative w-full h-full flex items-center justify-center ${
                  selectedVehicle.orientation === "portrait-tall"
                    ? "aspect-[9/19] max-h-[80vh]"
                    : "aspect-[4/5] max-h-[80vh]"
                }`}
              >
                <Image
                  src={selectedVehicle.image}
                  alt={selectedVehicle.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Aspect Ratio & Orientation Watermark */}
              <div className="absolute bottom-3 left-4 z-10 px-3 py-1 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-amber-400">
                {selectedVehicle.aspectRatioDisplay}
              </div>
            </div>

            {/* Vehicle Details & Specs Sidebar */}
            <div className="lg:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[50vh] lg:max-h-[85vh] space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{selectedVehicle.badge}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  {selectedVehicle.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {selectedVehicle.vehicleModel}
                </p>
                <p className="text-xs text-slate-300 mt-3 italic leading-relaxed">
                  {selectedVehicle.caption}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Operational Context
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedVehicle.summary}
                </p>
              </div>

              {/* Complete Specs */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Vehicle Specifications
                </h4>
                <div className="space-y-2">
                  {selectedVehicle.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-2 px-3 rounded-md bg-slate-950/60 border border-slate-800"
                    >
                      <span className="text-slate-400 font-medium">{spec.label}</span>
                      <span className="text-white font-bold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Operational Capabilities
                </h4>
                <ul className="space-y-2">
                  {selectedVehicle.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  href="/contact?service=heavy-trucks"
                  variant="amber"
                  size="md"
                  className="w-full text-center"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Quotation
                </Button>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
