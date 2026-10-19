import { z } from "zod";
import { siteConfig } from "@/config/site";

// Allowed service IDs based on configured services
const allowedServiceIds = siteConfig.services.map((s) => s.id) as [
  string,
  ...string[]
];

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .max(25, "Phone number must not exceed 25 characters")
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please provide a valid international or local phone number"
    ),
  company: z
    .string()
    .trim()
    .max(100, "Company name must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .min(1, "Please select a transport service")
    .refine((val) => allowedServiceIds.includes(val), {
      message: "Please select a valid transport service",
    }),
  pickupLocation: z
    .string()
    .trim()
    .max(150, "Pickup location must not exceed 150 characters")
    .optional()
    .or(z.literal("")),
  deliveryLocation: z
    .string()
    .trim()
    .max(150, "Delivery location must not exceed 150 characters")
    .optional()
    .or(z.literal("")),
  preferredDate: z
    .string()
    .trim()
    .max(50, "Preferred date must not exceed 50 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please provide more details regarding your cargo or route (at least 10 characters)")
    .max(2000, "Message must not exceed 2000 characters"),
  // Honeypot field - must be empty
  company_fax_num: z.string().max(0, "Invalid form submission").optional().or(z.literal("")),
  // Cloudflare Turnstile token
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
