"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, MessageSquare } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu upon navigation (render-time adjustment)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Logo variant="light" />

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? "text-[#0047b7] bg-blue-50/80 font-bold"
                      : "text-slate-650 hover:text-[#0047b7] hover:bg-slate-50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Configured phone action */}
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0047b7] px-3 py-2 rounded-md hover:bg-blue-50/50 transition-colors"
                aria-label={`Call ${siteConfig.contact.phoneDisplay || siteConfig.contact.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-[#0047b7]" />
                <span>{siteConfig.contact.phoneDisplay || siteConfig.contact.phone}</span>
              </a>
            )}

            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-md text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#0047b7] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed top-20 inset-x-0 bottom-0 z-50 bg-slate-950/70 md:hidden flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white border-b border-slate-200 px-5 pt-4 pb-8 space-y-4 shadow-2xl max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-base font-semibold rounded-md min-h-[48px] ${
                      isActive
                        ? "text-[#0047b7] bg-blue-50 font-bold"
                        : "text-slate-700 hover:text-[#0047b7] hover:bg-slate-50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </nav>

            {/* Configured Contact Actions */}
            {(siteConfig.contact.phone || siteConfig.contact.whatsapp) && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                {siteConfig.contact.phone && (
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 text-[#0047b7]" />
                    <span>{siteConfig.contact.phoneDisplay || siteConfig.contact.phone}</span>
                  </a>
                )}
                {siteConfig.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                )}
              </div>
            )}

            <div className="pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
