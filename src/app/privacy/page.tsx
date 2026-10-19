import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Info, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Plain-language explanation of how Route Wave General Transport collects, processes, and protects information submitted via our quotation enquiry form.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-950 text-white py-14 sm:py-18 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Privacy Policy & Data Handling
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Draft Policy Prepared for {siteConfig.legalName}
          </p>
        </div>
      </section>

      {/* Draft Disclaimer Notice */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-5 flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold">Handover Notice:</strong> This privacy document
            accurately reflects the technical data flow implemented across the website
            infrastructure (Vercel hosting, Cloudflare Turnstile, and Resend email transmission).
            Prior to final public launch, this draft must be reviewed and formally approved
            by the management of Route Wave General Transport.
          </div>
        </div>
      </section>

      {/* Main Privacy Body */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                <span>1. Scope and Entity Identification</span>
              </h2>
              <p>
                This policy explains how <strong>{siteConfig.brandName}</strong> (registered
                commercially as <em>{siteConfig.legalName}</em> in the United Arab Emirates)
                handles information collected through this website.
              </p>
              <p className="mt-2">
                We respect your business confidentiality and only collect information
                necessary to understand your transport requirements and prepare commercial
                quotations.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                2. Information Collected by the Enquiry Form
              </h2>
              <p>When you submit a transport quotation request, we collect:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>
                  <strong>Contact details:</strong> Your full name, business email address,
                  and contact telephone number.
                </li>
                <li>
                  <strong>Company information:</strong> Your company or trading name (if provided).
                </li>
                <li>
                  <strong>Transport specifications:</strong> The requested vehicle/service
                  category (Light Truck or Heavy Truck), pickup origin, delivery destination,
                  preferred transit date, and cargo description (dimensions, weight, packaging).
                </li>
                <li>
                  <strong>Security verification data:</strong> A transient browser token
                  issued by Cloudflare Turnstile to verify that the request originates from a human visitor.
                </li>
              </ul>
              <p className="mt-2 text-xs text-slate-500">
                Note: We do not collect credit card data, bank information, or sensitive identity documents via this website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                3. Purpose of Collection
              </h2>
              <p>The information submitted is used solely for legitimate business purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Evaluating consignment physical properties against fleet capabilities and road transport safety standards.</li>
                <li>Checking route access, travel distances, and loading requirements across UAE corridors.</li>
                <li>Preparing and issuing an accurate commercial transport quotation.</li>
                <li>Contacting you by telephone or email to clarify shipment details or respond to your enquiry.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                4. Data Delivery and Technical Processors
              </h2>
              <p>
                When you click &ldquo;Submit Quotation Request&rdquo;, your information is processed through the following technical flow:
              </p>
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                <li>
                  <strong>Secure Transmission:</strong> Form inputs are transmitted over an encrypted HTTPS connection to our serverless backend application.
                </li>
                <li>
                  <strong>Anti-Spam Verification:</strong> The submission token is verified against the Cloudflare Turnstile API. Cloudflare does not store visitor personal profiles or use tracking cookies for this purpose.
                </li>
                <li>
                  <strong>Notification Dispatch:</strong> Once validated, the enquiry is converted into an email notification and securely transmitted via <strong>Resend</strong> to the official Route Wave operations mailbox.
                </li>
                <li>
                  <strong>Internal Handling:</strong> The enquiry details reside in the Route Wave corporate mailbox, accessible only to dispatchers and management handling customer quotations. No visitor details are sold, rented, or distributed to third-party marketers.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                5. Third-Party Infrastructure Providers
              </h2>
              <p>Our website utilizes selected infrastructure providers to operate securely:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div className="p-3 rounded-md bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 text-xs">Vercel Inc.</h3>
                  <p className="text-[11px] text-slate-650 mt-1">
                    Application hosting and edge compute infrastructure.
                  </p>
                </div>
                <div className="p-3 rounded-md bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 text-xs">Cloudflare, Inc.</h3>
                  <p className="text-[11px] text-slate-650 mt-1">
                    Turnstile bot protection and anti-spam token verification.
                  </p>
                </div>
                <div className="p-3 rounded-md bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 text-xs">Resend, Inc.</h3>
                  <p className="text-[11px] text-slate-650 mt-1">
                    Transactional email delivery from backend to corporate mailbox.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                6. Cookies & Tracking
              </h2>
              <p>
                This website does not use tracking cookies, advertising pixels, or invasive behavioral profiling tools. Standard functional session headers may be used by the hosting provider strictly to maintain security and delivery.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                7. Business Privacy Inquiries
              </h2>
              <p>
                If you have questions regarding the information submitted through this website, or wish to update or request the removal of details provided during an enquiry, please contact Route Wave General Transport using our official contact channels:
              </p>
              <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-md text-xs space-y-1">
                <p>
                  <strong>Entity:</strong> {siteConfig.legalName}
                </p>
                <p>
                  <strong>Commercial Brand:</strong> {siteConfig.brandName}
                </p>
                <p>
                  <strong>Country:</strong> United Arab Emirates
                </p>
                {siteConfig.contact.email && (
                  <p>
                    <strong>Email:</strong> {siteConfig.contact.email}
                  </p>
                )}
                <p className="text-slate-500 pt-1">
                  Enquiries can also be submitted directly via our{" "}
                  <Link href="/contact" className="text-amber-700 underline font-medium">
                    online quotation form
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
