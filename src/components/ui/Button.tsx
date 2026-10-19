import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "amber" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 min-h-[36px] gap-1.5",
    md: "text-sm px-5 py-2.5 min-h-[44px] gap-2",
    lg: "text-base px-6 py-3 min-h-[48px] gap-2.5 font-semibold",
  }[size];

  const variantStyles = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus-visible:outline-slate-900 border border-slate-900 shadow-sm",
    amber:
      "bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 focus-visible:outline-amber-600 border border-amber-600 shadow-sm",
    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 focus-visible:outline-slate-600 border border-slate-200",
    outline:
      "bg-transparent text-slate-800 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-slate-600 border border-slate-300",
    white:
      "bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-white border border-transparent shadow-sm",
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
