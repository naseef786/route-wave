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
| `CONTACT_TO_EMAIL` | All | Recipient mailbox (Outlook inbox). | `info@routewave.ae` (Default) |
| **Tasjeel Direct SMTP** | | *(Option A: Direct via Tasjeel Mail)* | |
| `SMTP_HOST` | All | Tasjeel mail server hostname. | `mail.routewave.ae` |
| `SMTP_PORT` | All | Secure SMTP port (465 for SSL, 587 for TLS). | `465` |
| `SMTP_SECURE` | All | Enable SSL/TLS encryption. | `true` |
| `SMTP_USER` | All | Tasjeel mailbox username. | `info@routewave.ae` |
| `SMTP_PASS` | All | Tasjeel mailbox password. | Corporate mailbox password |
| **Resend Cloud API** | | *(Option B: Resend API)* | |
| `RESEND_API_KEY` | All | Resend API key. | `re_xxxxxxxxxxxx` |
| `CONTACT_FROM_EMAIL` | Production | Sender identity. | `Route Wave <info@routewave.ae>` |
| **Spam Protection** | | *(Cloudflare Turnstile)* | |
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

## 4. Email Delivery Configuration (Tasjeel SMTP or Resend)

The contact form endpoint (`/api/contact`) automatically routes all quotation inquiries directly to **`info@routewave.ae`** (received on your Outlook client). You can deliver emails via either method below:

### Option A: Direct Tasjeel SMTP (Recommended — Uses Your Tasjeel Mailbox Directly)
If your corporate mailbox was purchased on Tasjeel and connected to Outlook, you can send emails directly through Tasjeel without requiring any external accounts:
1. In your Tasjeel Client / cPanel area, look up your outgoing mail server settings (typically `mail.routewave.ae`).
2. In your hosting environment variables (e.g., Vercel), set:
   - `SMTP_HOST`: e.g. `mail.routewave.ae`
   - `SMTP_PORT`: `465` (or `587`)
   - `SMTP_USER`: `info@routewave.ae`
   - `SMTP_PASS`: Your Tasjeel mailbox password
   - `CONTACT_TO_EMAIL`: `info@routewave.ae`
3. Any form submission will authenticate with your Tasjeel mail server and land immediately in your Outlook inbox.

### Option B: Cloud API (Resend)
If you prefer using an API delivery service:
1. Log in to [Resend Dashboard](https://resend.com) and navigate to **Domains → Add Domain**.
2. Enter your confirmed sending domain (`routewave.ae` or `notifications.routewave.ae`).
3. Add the DNS records provided by Resend (DKIM, SPF) in your Tasjeel DNS manager.
4. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL=info@routewave.ae`.

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
