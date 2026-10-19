import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const isProductionDomain =
  process.env.VERCEL_ENV === "production" ||
  process.env.NODE_ENV === "production";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} | UAE Commercial Road Transport`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.supportingCopy,
  keywords: [
    "Route Wave",
    "Route Wave General Transport",
    "UAE transport company",
    "general materials transport",
    "light truck transport UAE",
    "heavy truck transport UAE",
    "commercial road freight UAE",
    "Dubai truck transport",
    "Abu Dhabi road transport",
  ],
  authors: [{ name: siteConfig.brandName }],
  creator: siteConfig.brandName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | Commercial Road Transport in the UAE`,
    description: siteConfig.supportingCopy,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 675,
        alt: `${siteConfig.brandName} commercial road transport corridor in the UAE`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | UAE Commercial Transport`,
    description: siteConfig.supportingCopy,
    images: ["/images/og-image.jpg"],
  },
  robots: isProductionDomain
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/logo-symbol.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Organization data with verified business information
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo-symbol.svg`,
    description: siteConfig.supportingCopy,
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    ...(siteConfig.contact.email
      ? { email: siteConfig.contact.email }
      : {}),
    ...(siteConfig.contact.phone
      ? { telephone: siteConfig.contact.phone }
      : {}),
  };

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="font-sans min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
