"use client";

import React from "react";
import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  const rawNumber = siteConfig.contact.whatsapp || "+971505447771";
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");

  const message = encodeURIComponent(
    "Hello Route Wave General Transport, I would like to enquire about transport services."
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center group select-none"
    >
      {/* Tooltip on hover (desktop) */}
      <span
        className="hidden md:inline-flex items-center px-3 py-1.5 mr-3 text-xs font-semibold text-slate-800 bg-white/95 backdrop-blur-xs rounded-full shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
        Chat with us on WhatsApp
      </span>

      {/* Button with animated ripple pulse */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Route Wave General Transport on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Soft pulsing ripple ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp Official SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          className="relative z-10 drop-shadow-xs"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.46C16.32 14.33 15.1 13.73 14.87 13.65C14.65 13.56 14.48 13.52 14.32 13.77C14.15 14.02 13.67 14.59 13.52 14.76C13.38 14.93 13.23 14.95 12.98 14.83C12.73 14.7 11.93 14.44 10.98 13.6C10.25 12.94 9.75 12.13 9.61 11.89C9.46 11.64 9.6 11.5 9.72 11.38C9.83 11.27 9.97 11.09 10.1 10.94C10.22 10.79 10.26 10.68 10.35 10.51C10.43 10.35 10.39 10.2 10.33 10.08C10.26 9.95 9.77 8.74 9.56 8.24C9.36 7.76 9.16 7.82 9.01 7.81C8.87 7.8 8.7 7.8 8.54 7.8C8.37 7.8 8.1 7.86 7.87 8.11C7.65 8.36 7.02 8.95 7.02 10.15C7.02 11.36 7.9 12.52 8.02 12.69C8.15 12.85 9.76 15.33 12.21 16.39C12.8 16.64 13.25 16.79 13.61 16.91C14.2 17.1 14.74 17.07 15.17 17.01C15.64 16.94 16.63 16.41 16.84 15.83C17.04 15.25 17.04 14.75 16.98 14.65C16.92 14.54 16.77 14.48 16.57 14.46Z" />
        </svg>
      </a>
    </aside>
  );
}
