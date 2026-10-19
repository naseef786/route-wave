import React from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, getActiveServices } from "@/config/site";

export function Footer() {
  const currentYear = 2026;
  const activeServices = getActiveServices();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Legal */}
          <div className="space-y-4">
            <Logo variant="dark" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Commercial materials transport using light and heavy trucks across
              designated UAE logistics routes and commercial corridors.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block mb-1">
                Registered Commercial Entity
              </span>
              <p className="text-xs text-slate-300 font-mono tracking-tight break-words">
                {siteConfig.legalName}
              </p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors inline-block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-400 transition-colors inline-block py-1"
                >
                  About Route Wave
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-400 transition-colors inline-block py-1"
                >
                  Transport Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-400 transition-colors inline-block py-1"
                >
                  Request a Quotation
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-amber-400 transition-colors inline-block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Active Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Approved Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {activeServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="hover:text-amber-400 transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span>{service.shortTitle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Transport Inquiries */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Transport Enquiries
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit your cargo specifications, route origin, and destination for a
              formal transport quotation.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              {siteConfig.contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              )}

              {siteConfig.contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {siteConfig.contact.phoneDisplay || siteConfig.contact.phone}
                  </a>
                </div>
              )}

              {siteConfig.contact.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors"
              >
                <span>Submit Transport Requirements</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {siteConfig.brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-800">•</span>
            <span className="text-slate-400">United Arab Emirates</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
