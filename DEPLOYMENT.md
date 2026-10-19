# Deployment & Hosting Guide: Route Wave General Transport

This guide outlines the production deployment procedure for the **Route Wave General Transport** web application.

---

## 1. Hosting Architecture & Plan Requirements

- **Hosting Platform:** [Vercel](https://vercel.com) (or any Node.js container/serverless environment supporting the Next.js App Router).
- **Runtime Requirement:** The application utilizes Next.js Server Components and a server-side route handler for the contact form endpoint (`/api/contact`). It must **not** be deployed with `output: "export"`.
- **Important Licensing Notice:**
  > [!IMPORTANT]
  > **Commercial Hosting Plan:** Vercel's *Hobby* tier is strictly for personal and non-commercial projects. Because Route Wave General Transport is a commercial corporate entity, the client must deploy using an appropriate **Vercel Pro** or commercial enterprise team account.

---

## 2. Environment Variables Configuration

In your Vercel Project Settings under **Settings → Environment Variables**, configure the following keys:

| Variable Name | Environment | Value Description | Example / Test Value |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Production | Confirmed canonical domain. | `https://routewave.ae` |
| `NEXT_PUBLIC_SITE_URL` | Preview | Vercel deployment preview URL or left dynamic. | `https://preview.routewave.ae` |
| `RESEND_API_KEY` | All | Resend API key for email notifications. | `re_xxxxxxxxxxxx` |
| `CONTACT_TO_EMAIL` | All | Internal corporate mailbox receiving quotation requests. | `info@routewave.ae` |
| `CONTACT_FROM_EMAIL` | Production | Sender identity verified in Resend. | `Route Wave Notifications <notifications@routewave.ae>` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Production | Cloudflare Turnstile public site key. | Client-generated key |
| `TURNSTILE_SECRET_KEY` | Production | Cloudflare Turnstile secret key. | Client-generated key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Preview / Dev | Cloudflare test site key. | `1x00000000000000000000AA` |
| `TURNSTILE_SECRET_KEY` | Preview / Dev | Cloudflare test secret key. | `1x00000000000000000000000000000000AA` |

### Optional Approved Public Channels
Only add these once the business approves public display on the website:
- `NEXT_PUBLIC_CONTACT_EMAIL` (e.g. `info@routewave.ae`)
- `NEXT_PUBLIC_CONTACT_PHONE` (e.g. `+971501234567`)
- `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY` (e.g. `+971 50 123 4567`)
- `NEXT_PUBLIC_CONTACT_WHATSAPP` (e.g. `+971501234567`)
- `NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY` (e.g. `+971 50 123 4567`)

---

## 3. Custom Domain & DNS Configuration (`routewave.ae`)

When adding the candidate production domain (`routewave.ae`) in Vercel:

1. In the Vercel Dashboard, go to **Settings → Domains**.
2. Add both `routewave.ae` and `www.routewave.ae`.
3. Set `www.routewave.ae` to automatically redirect to the root `routewave.ae` (or vice versa according to company preference).

### DNS Record Setup (Domain Registrar / DNS Provider)

> [!CAUTION]
> **Preserve Existing Email Records:** When editing DNS, **NEVER** modify or delete existing `MX` records. Route Wave mailboxes (e.g. Google Workspace, Microsoft 365, or local cPanel mail) depend on those records to receive regular business emails.

Add the following DNS records for web traffic:

| Type | Name / Host | Value / Target | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `A` | `@` (root) | `76.76.21.21` | Auto / 3600 | Directs apex domain to Vercel edge |
| `CNAME` | `www` | `cname.vercel-dns.com.` | Auto / 3600 | Directs www subdomain to Vercel |

Vercel will automatically provision and renew a free Let's Encrypt SSL/TLS certificate for both records.

---

## 4. Email Sending Verification (Resend & DNS)

Resend handles automated notifications when a customer submits a quotation enquiry.

1. Log in to [Resend Dashboard](https://resend.com) and navigate to **Domains → Add Domain**.
2. Enter your confirmed sending domain (recommended: `notifications.routewave.ae` or apex `routewave.ae`).
3. Add the DNS records provided by Resend to your domain's DNS manager:
   - **DKIM (CNAME / TXT):** Authorizes Resend to sign emails on behalf of the domain.
   - **SPF (TXT):** Verifies authorized sending IP addresses.
   - **DMARC (TXT):** Sets domain policy (e.g., `v=DMARC1; p=none;`).
4. Wait for Resend status to show **Verified** before switching `CONTACT_FROM_EMAIL` to the production domain.

---

## 5. Spam Protection Configuration (Cloudflare Turnstile)

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com) and open **Turnstile**.
2. Create a new widget:
   - **Domain:** Add `routewave.ae` and any preview domains (e.g. `*.vercel.app`).
   - **Mode:** Managed (invisible or interactive fallback).
3. Copy the generated **Site Key** to `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
4. Copy the **Secret Key** to `TURNSTILE_SECRET_KEY`.

---

## 6. Pre-Launch Verification Checklist

Before public announcement:
- [ ] Deploy preview build and confirm SSL status.
- [ ] Test the contact form with a controlled test enquiry.
- [ ] Confirm email arrives in `CONTACT_TO_EMAIL` with correct reply-to headers.
- [ ] Verify phone numbers, WhatsApp, and office address (only if supplied).
- [ ] Verify search engines are permitted only on the production domain (preview deployments disallow indexing via `robots.ts`).
