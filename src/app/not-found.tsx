import React from "react";
import { Home, Truck, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 py-16 bg-slate-50 text-center">
      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-200 text-slate-700 font-extrabold text-xl mb-6">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          The road or page you are looking for does not exist or has been moved.
          Please use the links below to return to our transport services.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
          <Button href="/services" variant="outline" size="md" icon={<Truck className="w-4 h-4" />}>
            View Services
          </Button>
          <Button href="/contact" variant="outline" size="md" icon={<Mail className="w-4 h-4" />}>
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
