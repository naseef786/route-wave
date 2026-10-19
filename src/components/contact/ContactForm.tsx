"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { TurnstileWidget } from "./TurnstileWidget";
import { getActiveServices } from "@/config/site";
import { contactFormSchema, ContactFormData } from "@/lib/validation";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const activeServices = getActiveServices();

  // Find initial service matching query param or default to first active service
  const matchedService = preselectedService
    ? activeServices.find(
        (s) => s.id === preselectedService || s.slug === preselectedService
      )?.id
    : undefined;

  const defaultService = matchedService || activeServices[0]?.id || "";

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: defaultService,
    pickupLocation: "",
    deliveryLocation: "",
    preferredDate: "",
    message: "",
    company_fax_num: "",
    turnstileToken: "",
  });

  const [prevParam, setPrevParam] = useState(preselectedService);
  if (preselectedService !== prevParam) {
    setPrevParam(preselectedService);
    if (matchedService) {
      setFormData((prev) => ({ ...prev, service: matchedService }));
    }
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleTurnstileVerify = (token: string) => {
    setFormData((prev) => ({ ...prev, turnstileToken: token }));
    if (errors.turnstileToken) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.turnstileToken;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setServerMessage("");
    setErrors({});

    // Client-side Zod validation
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitStatus("error");
        setServerMessage(
          data.error || "Unable to dispatch enquiry. Please try again."
        );
        if (data.details) {
          const detailErrors: Record<string, string> = {};
          Object.keys(data.details).forEach((key) => {
            detailErrors[key] = data.details[key][0];
          });
          setErrors(detailErrors);
        }
        return;
      }

      // Success
      setSubmitStatus("success");
      setServerMessage(
        data.message ||
          "Your enquiry has been submitted. Our team will contact you using the details provided."
      );
      // Reset sensitive form fields while keeping status
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: activeServices[0]?.id || "",
        pickupLocation: "",
        deliveryLocation: "",
        preferredDate: "",
        message: "",
        company_fax_num: "",
        turnstileToken: "",
      });
    } catch {
      setSubmitStatus("error");
      setServerMessage(
        "A network communication error occurred. Please verify your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 sm:p-10 text-center shadow-xs">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Enquiry Received
        </h3>
        <p className="text-slate-650 max-w-md mx-auto text-sm leading-relaxed mb-8">
          {serverMessage}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitStatus("idle");
            setServerMessage("");
          }}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200 rounded-lg p-4 sm:p-8 lg:p-10 shadow-xs"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Request a Transport Quotation
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Provide your cargo specification and route details. All fields marked with
          an asterisk (*) are required.
        </p>
      </div>

      {/* Global Error Banner */}
      {submitStatus === "error" && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div>
            <p className="font-semibold">Unable to process enquiry</p>
            <p className="text-xs mt-0.5 text-red-700">{serverMessage}</p>
          </div>
        </div>
      )}

      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_fax_num">Do not fill this field</label>
        <input
          type="text"
          id="company_fax_num"
          name="company_fax_num"
          value={formData.company_fax_num}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-6">
        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Full Name <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Tariq Al Nuaimi"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-md border transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Business Email <span className="text-amber-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={100}
              value={formData.email}
              onChange={handleChange}
              placeholder="tariq@company.ae"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-md border transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Contact Phone <span className="text-amber-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              maxLength={25}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+971 50 123 4567"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-sm rounded-md border transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-xs text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="company"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Company Name <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              maxLength={100}
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Al Manara Contracting"
              className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-slate-900"
            />
          </div>
        </div>

        {/* Transport Specification */}
        <div className="pt-2 border-t border-slate-100">
          <label
            htmlFor="service"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Required Transport Service <span className="text-amber-600">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={`w-full px-3.5 py-2.5 text-sm rounded-md border transition-colors bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
              errors.service
                ? "border-red-400 focus:border-red-500"
                : "border-slate-300 focus:border-slate-900"
            }`}
          >
            <option value="" disabled>
              Select a transport category...
            </option>
            {activeServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="service-error" className="mt-1 text-xs text-red-600">
              {errors.service}
            </p>
          )}
        </div>

        {/* Locations and Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label
              htmlFor="pickupLocation"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Pickup Location <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              maxLength={150}
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="e.g. Jebel Ali Industrial"
              className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="deliveryLocation"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Delivery Location <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="deliveryLocation"
              name="deliveryLocation"
              maxLength={150}
              value={formData.deliveryLocation}
              onChange={handleChange}
              placeholder="e.g. Mussafah, Abu Dhabi"
              className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="preferredDate"
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Preferred Date <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="preferredDate"
              name="preferredDate"
              maxLength={50}
              value={formData.preferredDate}
              onChange={handleChange}
              placeholder="e.g. Next Tuesday or DD/MM/YYYY"
              className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-slate-900"
            />
          </div>
        </div>

        {/* Cargo / Message details */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            Cargo & Transport Details <span className="text-amber-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            maxLength={2000}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please specify estimated weight or tonnage, material type, dimensions, loading/offloading requirements, or any specific route constraints..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full px-3.5 py-2.5 text-sm rounded-md border transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
              errors.message
                ? "border-red-400 focus:border-red-500"
                : "border-slate-300 focus:border-slate-900"
            }`}
          />
          {errors.message ? (
            <p id="message-error" className="mt-1 text-xs text-red-600">
              {errors.message}
            </p>
          ) : (
            <p className="mt-1 text-[11px] text-slate-400">
              Include load size, weight estimates, or special handling notes.
            </p>
          )}
        </div>

        {/* Turnstile Spam Protection */}
        <div>
          <TurnstileWidget
            onVerify={handleTurnstileVerify}
            onError={() => {
              setErrors((prev) => ({
                ...prev,
                turnstileToken: "Security check could not be completed. Please refresh.",
              }));
            }}
          />
          {errors.turnstileToken && (
            <p className="text-xs text-red-600 mt-1">{errors.turnstileToken}</p>
          )}
        </div>

        {/* Privacy Note */}
        <div className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
          Route Wave General Transport respects your privacy. We collect the details
          submitted above strictly to evaluate and respond to your transport request.
          Read our{" "}
          <Link
            href="/privacy"
            className="text-amber-700 hover:text-amber-800 underline underline-offset-2"
          >
            Privacy Policy
          </Link>{" "}
          for details on data handling.
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 py-3 text-sm font-semibold rounded-md bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Transmitting Enquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Quotation Request</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
