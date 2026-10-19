import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface LogoProps {
  variant?: "light" | "dark" | "symbol";
  className?: string;
  showDescriptor?: boolean;
}

export function Logo({
  variant = "light",
  className = "",
  showDescriptor = true,
}: LogoProps) {
  const isDark = variant === "dark";

  if (variant === "symbol") {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded-md ${className}`}
        aria-label={`${siteConfig.brandName} Home`}
      >
        <svg
          viewBox="0 0 48 48"
          width="40"
          height="40"
          fill="none"
          className="shrink-0 transition-transform group-hover:scale-105 duration-200"
          aria-hidden="true"
        >
          <rect
            width="48"
            height="48"
            rx="10"
            fill={isDark ? "#1E293B" : "#0F172A"}
            stroke={isDark ? "#334155" : "none"}
            strokeWidth="1"
          />
          <path
            d="M12 36V14C12 12.3431 13.3431 11 15 11H23C26.866 11 30 14.134 30 18C30 21.4421 27.518 24.3052 24.238 24.872L31 36H24.5L18.5 25H17V36H12Z"
            fill="#FFFFFF"
          />
          <path
            d="M17 16V20.5H22.5C23.8807 20.5 25 19.3807 25 18C25 16.6193 23.8807 15.5 22.5 15.5H17.5C17.2239 15.5 17 15.7239 17 16Z"
            fill={isDark ? "#1E293B" : "#0F172A"}
          />
          <path d="M25 24L31.5 36H36.5L28.5 21.5L25 24Z" fill="#D97706" />
          <circle cx="34" cy="15" r="2.5" fill="#F59E0B" />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded-md ${className}`}
      aria-label={`${siteConfig.brandName} Home`}
    >
      {/* Mark */}
      <div className="shrink-0">
        <svg
          viewBox="0 0 44 44"
          width="40"
          height="40"
          fill="none"
          className="transition-transform group-hover:scale-105 duration-200"
          aria-hidden="true"
        >
          <rect
            width="44"
            height="44"
            rx="10"
            fill={isDark ? "#1E293B" : "#0F172A"}
            stroke={isDark ? "#334155" : "none"}
            strokeWidth="1"
          />
          <path
            d="M11 33V13C11 11.8954 11.8954 11 13 11H20.5C24.0899 11 27 13.9101 27 17.5C27 20.6559 24.751 23.2878 21.75 23.856L28 33H22L16.5 24H15V33H11Z"
            fill="#FFFFFF"
          />
          <path
            d="M15 15V19.5H20C21.1046 19.5 22 18.6046 22 17.5C22 16.3954 21.1046 15.5 20 15.5H15.5C15.2239 15.5 15 15.7239 15 16V15Z"
            fill={isDark ? "#1E293B" : "#0F172A"}
          />
          <path d="M22.5 23.5L28.5 33H33L25.5 21L22.5 23.5Z" fill="#D97706" />
          <circle cx="31" cy="14" r="2.5" fill="#F59E0B" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-extrabold text-lg tracking-wider transition-colors ${
            isDark ? "text-white" : "text-slate-900 group-hover:text-slate-800"
          }`}
        >
          ROUTE WAVE
        </span>
        {showDescriptor && (
          <span
            className={`text-[9px] font-bold tracking-[0.22em] uppercase ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            GENERAL TRANSPORT
          </span>
        )}
      </div>
    </Link>
  );
}
