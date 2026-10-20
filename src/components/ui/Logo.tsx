import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface LogoProps {
  variant?: "light" | "dark" | "symbol";
  className?: string;
  showDescriptor?: boolean;
  priority?: boolean;
}

export function Logo({
  variant = "light",
  className = "",
  priority = true,
}: LogoProps) {
  if (variant === "symbol") {
    return (
      <Link
        href="/"
        className={`inline-flex items-center group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047b7] rounded-md ${className}`}
        aria-label={`${siteConfig.brandName} Home`}
      >
        <Image
          src="/logo-symbol.png"
          alt={siteConfig.brandName}
          width={78}
          height={60}
          priority={priority}
          className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
        />
      </Link>
    );
  }

  const isDark = variant === "dark";
  const logoSrc = isDark
    ? "/logo-horizontal-dark.png"
    : "/logo-horizontal-light.png";

  return (
    <Link
      href="/"
      className={`inline-flex items-center group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047b7] rounded-md ${className}`}
      aria-label={`${siteConfig.brandName} Home`}
    >
      <Image
        src={logoSrc}
        alt={`${siteConfig.brandName} - Commercial Transport`}
        width={265}
        height={80}
        priority={priority}
        className="h-11 sm:h-12 md:h-13 w-auto object-contain transition-transform group-hover:scale-[1.02] duration-200"
      />
    </Link>
  );
}
