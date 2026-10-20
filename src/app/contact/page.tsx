import React, { Suspense } from "react";
import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Request a commercial transport quotation from Route Wave General Transport. Provide cargo dimensions, weight, pickup, and delivery destinations in the UAE.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const hasDirectContactChannels =
    siteConfig.contact.email ||
    siteConfig.contact.phone ||
    siteConfig.contact.whatsapp ||
    siteConfig.contact.address ||
    siteConfig.contact.workingHours;

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-slate-950 text-white py-14 sm:py-18 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-2">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Request a Transport Quotation
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
              Submit your consignment specifications, route origin, and destination.
              Our operations desk will review vehicle suitability and reply directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Operational Context & Confirmed Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-3">
                  How Enquiries Are Handled
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-slate-650 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0047b7] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      1
                    </div>
                    <p>
                      <strong>Load Evaluation:</strong> We evaluate load volume, tonnage,
                      and physical properties to verify legal limits and vehicle category.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0047b7] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      2
                    </div>
                    <p>
                      <strong>Route & Access Check:</strong> We review destination access
                      constraints, loading docks, and site handling equipment requirements.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0047b7] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      3
                    </div>
                    <p>
                      <strong>Commercial Quotation:</strong> You receive a transparent
                      quotation detailing haulage rates and agreed dispatch terms.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Enquiry submissions do not create an automatic or immediate booking.</span>
                </div>
              </div>

              {/* Direct Channels Card (Rendered only if values are configured) */}
              {hasDirectContactChannels ? (
                <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Direct Contact Channels
                  </h3>
                  <div className="space-y-3 text-sm">
                    {siteConfig.contact.email && (
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-[#0047b7] mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Email Address</p>
                          <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="font-medium text-slate-900 hover:text-[#0047b7] transition-colors"
                          >
                            {siteConfig.contact.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {siteConfig.contact.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-[#0047b7] mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Telephone</p>
                          <a
                            href={`tel:${siteConfig.contact.phone}`}
                            className="font-medium text-slate-900 hover:text-[#0047b7] transition-colors"
                          >
                            {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {siteConfig.contact.whatsapp && (
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">WhatsApp</p>
                          <a
                            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                          >
                            {siteConfig.contact.whatsappDisplay || "Chat on WhatsApp"}
                          </a>
                        </div>
                      </div>
                    )}

                    {siteConfig.contact.workingHours && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Operating Schedule</p>
                          <p className="text-slate-800">{siteConfig.contact.workingHours}</p>
                        </div>
                      </div>
                    )}

                    {siteConfig.contact.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Operational Location</p>
                          <p className="text-slate-800">{siteConfig.contact.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100/80 border border-slate-200 rounded-lg p-5 text-xs text-slate-600 space-y-1.5">
                  <p className="font-semibold text-slate-800">
                    Centralized Quotation Desk
                  </p>
                  <p className="leading-relaxed">
                    To maintain strict record keeping and accurate vehicle scheduling, all initial
                    quotation inquiries are managed through the online enquiry form.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="bg-white border border-slate-200 rounded-lg p-10 flex flex-col items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
                    <p className="text-sm text-slate-500 font-medium">
                      Loading quotation request form...
                    </p>
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
