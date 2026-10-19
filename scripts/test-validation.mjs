import { test } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Test schema matching src/lib/validation.ts
const allowedServiceIds = ["light-trucks", "heavy-trucks", "concrete-waste"];

const contactFormSchema = z.object({
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
  company_fax_num: z.string().max(0, "Invalid form submission").optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

test("Valid submission for Light Trucks succeeds", () => {
  const input = {
    name: "Ahmed Al Mansoori",
    email: "ahmed@example.ae",
    phone: "+971 50 123 4567",
    company: "Al Mansoori Logistics",
    service: "light-trucks",
    pickupLocation: "Dubai Industrial City",
    deliveryLocation: "Abu Dhabi Port",
    preferredDate: "2026-11-01",
    message: "Transporting 2 pallets of commercial equipment, total approx 1200kg.",
    company_fax_num: "",
    turnstileToken: "dummy-test-token",
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, true);
});

test("Valid submission for Heavy Trucks succeeds", () => {
  const input = {
    name: "Khalid Trading",
    email: "khalid@trading.ae",
    phone: "04-1234567",
    company: "Khalid General Trading LLC",
    service: "heavy-trucks",
    pickupLocation: "Sharjah Industrial 4",
    deliveryLocation: "Jebel Ali Free Zone",
    preferredDate: "Immediate",
    message: "25 tons of structural steel beams, crane offloading available on delivery.",
    company_fax_num: "",
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, true);
});

test("Rejects missing or too short name", () => {
  const input = {
    name: "A",
    email: "valid@email.ae",
    phone: "+971501112233",
    service: "light-trucks",
    message: "Valid message describing the cargo requirements in full detail.",
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /Name must be at least 2 characters/);
});

test("Rejects malformed email", () => {
  const input = {
    name: "Valid Name",
    email: "invalid-email-string",
    phone: "+971501112233",
    service: "light-trucks",
    message: "Valid message describing the cargo requirements in full detail.",
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /valid email address/);
});

test("Rejects invalid phone format", () => {
  const input = {
    name: "Valid Name",
    email: "valid@email.ae",
    phone: "abcdefg",
    service: "light-trucks",
    message: "Valid message describing the cargo requirements in full detail.",
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /valid international or local phone number/);
});

test("Rejects unsupported service", () => {
  const input = {
    name: "Valid Name",
    email: "valid@email.ae",
    phone: "+971501112233",
    service: "passenger-transport", // Unsupported service!
    message: "Valid message describing the cargo requirements in full detail.",
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /valid transport service/);
});

test("Rejects submission when honeypot is filled", () => {
  const input = {
    name: "Spam Bot",
    email: "spambot@example.com",
    phone: "+1234567890",
    service: "light-trucks",
    message: "Buy cheap backlinks now from our marketing service.",
    company_fax_num: "555-0199", // Bot filled honeypot field
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, false);
});

test("Rejects message under 10 characters", () => {
  const input = {
    name: "Valid Name",
    email: "valid@email.ae",
    phone: "+971501112233",
    service: "light-trucks",
    message: "Too short", // 9 chars
  };

  const result = contactFormSchema.safeParse(input);
  assert.equal(result.success, false);
  assert.match(result.error.issues[0].message, /at least 10 characters/);
});
