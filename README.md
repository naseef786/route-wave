# Route Wave General Transport - Corporate Website

A modern, fast, production-ready corporate website for **Route Wave General Transport** (`ROUTE WAVE GENERAL TRANSPORT - L.L.C - S.P.C`), a commercial materials road transport provider operating in the United Arab Emirates.

---

## 1. Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript (strict mode).
- **Styling:** Tailwind CSS v4 with custom corporate design tokens (deep navy, slate grey, restrained amber accent).
- **Typography:** Self-hosted `Inter` via `next/font/google` (zero layout shift, zero third-party font calls).
- **Form Handling & Validation:** Zod shared schema validation on client and server.
- **Email Delivery:** Resend transactional email notification API.
- **Bot Protection:** Cloudflare Turnstile token validation and honeypot field.
- **Icons:** `lucide-react` (tree-shaken SVGs).

---

## 2. Directory Structure

```text
├── public/
│   ├── images/                # Optimized UAE commercial transport photography
│   │   ├── light-truck-transport.jpg
│   │   ├── heavy-truck-transport.jpg
│   │   ├── loading-dock-operations.jpg
│   │   ├── uae-transport-corridor.jpg
│   │   └── og-image.jpg
│   ├── logo-symbol.svg        # Standalone vector brand mark
│   ├── logo-horizontal-light.svg  # Horizontal logo for light backgrounds
│   └── logo-horizontal-dark.svg   # Horizontal logo for dark backgrounds
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts   # Secure contact form API endpoint
│   │   ├── about/page.tsx         # Honest company introduction & approach
│   │   ├── contact/page.tsx       # Dedicated quotation enquiry page
│   │   ├── services/page.tsx      # Comprehensive transport services catalog
│   │   ├── privacy/page.tsx       # Plain-language data handling policy
│   │   ├── globals.css            # Base design system & Tailwind setup
│   │   ├── icon.svg               # App Router dynamic SVG favicon
│   │   ├── layout.tsx             # Root layout with SEO & Organization JSON-LD
│   │   ├── not-found.tsx          # Branded custom 404 page
│   │   ├── page.tsx               # Homepage with hero, services & 3-step process
│   │   ├── robots.ts              # Dynamic robots.txt with preview indexing block
│   │   └── sitemap.ts             # Dynamic XML sitemap
│   ├── components/
│   │   ├── contact/               # Contact form and Turnstile widget
│   │   ├── layout/                # Responsive Header, mobile menu & Footer
│   │   └── ui/                    # Logo and Button primitives
│   ├── config/
│   │   └── site.ts                # Central typed business details & service flags
│   └── lib/
│       └── validation.ts          # Zod validation schema
├── scripts/
│   └── test-validation.mjs        # Focused validation unit tests
├── .env.example                   # Environment configuration template
├── ASSETS.md                      # Asset catalog, image sources, and usage terms
└── DEPLOYMENT.md                  # Comprehensive Vercel & DNS deployment guide
```

---

## 3. Quick Start (Local Setup)

### Prerequisites
- Node.js `20.x` or `22.x` (tested on Node v22.21.1)
- npm `10.x` or later

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 4. Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server with Turbopack. |
| `npm run build` | Compiles the production build, runs TypeScript checks, and prerenders pages. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Runs ESLint with Next.js core web vitals and strict TypeScript rules. |
| `npm test` | Runs the focused Zod validation test suite using Node's native test runner. |

---

## 5. Centralized Configuration (`src/config/site.ts`)

All public brand details, contact channels, and transport services are managed centrally in [`src/config/site.ts`](file:///d:/Projects/Route%20Wave/src/config/site.ts):

- **Service Gating:** Construction and Demolition Concrete Waste Transportation is configured with `enabled: false`. It remains in the codebase but will not appear on the public website until regulatory approval is confirmed. To enable, flip the flag:
  ```typescript
  // src/config/site.ts
  {
    id: "concrete-waste",
    enabled: true, // Flip to true once trade license condition is approved
  }
  ```
- **Optional Channels:** Public phone numbers, email addresses, WhatsApp buttons, and physical locations are omitted automatically unless confirmed and configured in `src/config/site.ts` or via environment variables.

---

## 6. Deployment & Handover

Refer to the dedicated documentation files:
- [Deployment & DNS Setup Guide](file:///d:/Projects/Route%20Wave/DEPLOYMENT.md)
- [Asset Sources & License Records](file:///d:/Projects/Route%20Wave/ASSETS.md)
