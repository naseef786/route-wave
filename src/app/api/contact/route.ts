import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/validation";
import { siteConfig, getServiceById } from "@/config/site";

// Simple HTML escaping helper to prevent injection in generated emails
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string | null
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const isProduction = process.env.NODE_ENV === "production";

  // Automatically permit in local development, or if Turnstile keys are omitted / using test keys
  if (!isProduction || !secretKey || secretKey === "1x00000000000000000000000000000000AA") {
    return { success: true };
  }

  // If client provided no token in production with live keys
  if (!token) {
    return {
      success: false,
      error: "Spam verification failed. Please complete the security check.",
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await response.json();
    if (!data.success) {
      return {
        success: false,
        error: "Spam verification failed. Please refresh and try again.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Could not verify security token with authentication service.",
    };
  }
}

// Origin / Same-Origin validation
function validateRequestOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  // If no origin header (e.g. some direct requests or older clients), check referer
  if (!origin) {
    const referer = request.headers.get("referer");
    if (!referer) return true; // allow if neither is set (or strict same-origin policy)
    try {
      const refererUrl = new URL(referer);
      return refererUrl.host === host;
    } catch {
      return false;
    }
  }

  try {
    const originUrl = new URL(origin);
    if (host && originUrl.host === host) {
      return true;
    }

    // Also match against NEXT_PUBLIC_SITE_URL if configured
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      if (originUrl.host === siteUrl.host) {
        return true;
      }
    }

    // Allow localhost in development
    if (
      process.env.NODE_ENV !== "production" &&
      (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1")
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // 1. Same-origin security check
  if (!validateRequestOrigin(request)) {
    return NextResponse.json(
      { success: false, error: "Invalid request origin." },
      { status: 403 }
    );
  }

  // 2. Body parsing and size check
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Malformed request payload." },
      { status: 400 }
    );
  }

  // 3. Schema validation
  const validationResult = contactFormSchema.safeParse(body);
  if (!validationResult.success) {
    const firstError =
      validationResult.error.issues[0]?.message || "Validation failed";
    return NextResponse.json(
      {
        success: false,
        error: firstError,
        details: validationResult.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = validationResult.data;

  // 4. Honeypot check (hidden spam field)
  if (data.company_fax_num && data.company_fax_num.length > 0) {
    // Return generic rejection without disclosing detection mechanism
    return NextResponse.json(
      { success: false, error: "Unable to process submission." },
      { status: 400 }
    );
  }

  // 5. Cloudflare Turnstile token verification
  const clientIp =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    null;

  const turnstileResult = await verifyTurnstileToken(
    data.turnstileToken,
    clientIp
  );

  if (!turnstileResult.success) {
    return NextResponse.json(
      { success: false, error: turnstileResult.error || "Security check failed." },
      { status: 400 }
    );
  }

  // 6. Check email delivery configuration (Tasjeel SMTP or Resend API)
  const contactToEmail = process.env.CONTACT_TO_EMAIL || "info@routewave.ae";
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER || "info@routewave.ae";
  const smtpPass = process.env.SMTP_PASS;
  const hasSmtp = Boolean(smtpHost && smtpPass);

  const resendApiKey = process.env.RESEND_API_KEY;
  const hasResend = Boolean(resendApiKey);

  if (!hasSmtp && !hasResend) {
    // Documented requirement: return clear service-unavailable response, never fake success
    return NextResponse.json(
      {
        success: false,
        error:
          "Email delivery service is currently unconfigured. Please configure Tasjeel SMTP (SMTP_HOST, SMTP_PASS) or RESEND_API_KEY.",
      },
      { status: 503 }
    );
  }

  // 7. Look up service title for subject and email body
  const serviceItem = getServiceById(data.service);
  const serviceTitle = serviceItem ? serviceItem.title : data.service;

  // 8. Construct formatted plain-text and escaped HTML emails
  const plainTextEmail = `
New Transport Enquiry received via ${siteConfig.brandName} Website

Customer Details:
---------------------------------------------
Name:    ${data.name}
Email:   ${data.email}
Phone:   ${data.phone}
Company: ${data.company || "Not provided"}

Transport Requirements:
---------------------------------------------
Service:            ${serviceTitle}
Pickup Location:    ${data.pickupLocation || "Not provided"}
Delivery Location:  ${data.deliveryLocation || "Not provided"}
Preferred Date:     ${data.preferredDate || "Not provided"}

Cargo Details & Notes:
---------------------------------------------
${data.message}

---------------------------------------------
Received at: ${new Date().toISOString()}
Origin: ${siteConfig.siteUrl}
`.trim();

  const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; margin: 0; padding: 24px; background: #f8fafc; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: #0f172a; padding: 24px; color: #ffffff; }
    .header h2 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 24px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #d97706; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
    .row { margin-bottom: 8px; font-size: 14px; }
    .label { font-weight: 600; color: #475569; width: 140px; display: inline-block; }
    .value { color: #0f172a; }
    .message-box { background: #f1f5f9; padding: 16px; border-radius: 6px; font-size: 14px; white-space: pre-wrap; color: #0f172a; margin-top: 8px; }
    .footer { padding: 16px 24px; background: #f8fafc; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${escapeHtml(siteConfig.brandName)}</h2>
      <p>New Commercial Transport Quotation Enquiry</p>
    </div>
    <div class="content">
      <div class="section-title">Customer Details</div>
      <div class="row"><span class="label">Name:</span> <span class="value">${escapeHtml(data.name)}</span></div>
      <div class="row"><span class="label">Email:</span> <span class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></span></div>
      <div class="row"><span class="label">Phone:</span> <span class="value">${escapeHtml(data.phone)}</span></div>
      <div class="row"><span class="label">Company:</span> <span class="value">${escapeHtml(data.company || "Not provided")}</span></div>

      <div class="section-title">Transport Requirements</div>
      <div class="row"><span class="label">Service:</span> <span class="value"><strong>${escapeHtml(serviceTitle)}</strong></span></div>
      <div class="row"><span class="label">Pickup Location:</span> <span class="value">${escapeHtml(data.pickupLocation || "Not provided")}</span></div>
      <div class="row"><span class="label">Delivery Location:</span> <span class="value">${escapeHtml(data.deliveryLocation || "Not provided")}</span></div>
      <div class="row"><span class="label">Preferred Date:</span> <span class="value">${escapeHtml(data.preferredDate || "Not provided")}</span></div>

      <div class="section-title">Consignment Notes & Details</div>
      <div class="message-box">${escapeHtml(data.message)}</div>
    </div>
    <div class="footer">
      Sent from quotation enquiry form on ${escapeHtml(siteConfig.siteUrl)}
    </div>
  </div>
</body>
</html>
`.trim();

  // 9. Dispatch email via Tasjeel SMTP or Resend API
  if (hasSmtp) {
    try {
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const isSecure =
        process.env.SMTP_SECURE !== undefined
          ? process.env.SMTP_SECURE === "true"
          : smtpPort === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          // Allow shared hosting / Tasjeel cPanel server certificates (e.g. dallah.tasjeel.ae)
          rejectUnauthorized: false,
        },
      });

      const fromAddress =
        process.env.CONTACT_FROM_EMAIL ||
        `"Route Wave Transport Enquiry" <${smtpUser}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to: contactToEmail,
        replyTo: data.email,
        subject: `New website enquiry — ${serviceItem?.shortTitle || serviceTitle}`,
        text: plainTextEmail,
        html: htmlEmail,
      });

      return NextResponse.json(
        {
          success: true,
          message:
            "Your enquiry has been submitted. Our team will contact you using the details provided.",
          referenceId: info.messageId,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error(
        "[Email Dispatch Error - SMTP]:",
        err instanceof Error ? err.message : "Unknown error"
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "The email delivery server could not dispatch your enquiry at this time. Please try again later or contact us directly.",
        },
        { status: 502 }
      );
    }
  }

  // Fallback to Resend API
  try {
    const resend = new Resend(resendApiKey);
    const fromAddress =
      process.env.CONTACT_FROM_EMAIL ||
      "Route Wave Notifications <notifications@routewave.ae>";

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromAddress,
      to: [contactToEmail],
      replyTo: data.email,
      subject: `New website enquiry — ${serviceItem?.shortTitle || serviceTitle}`,
      text: plainTextEmail,
      html: htmlEmail,
    });

    if (resendError) {
      console.error("[Email Dispatch Error - Resend]:", resendError.message);
      return NextResponse.json(
        {
          success: false,
          error:
            "The email delivery provider could not accept this enquiry at this time. Please try again later or contact us directly.",
        },
        { status: 502 }
      );
    }

    // Note: Do not log customer PII (phone, email, message body) to system logs
    return NextResponse.json(
      {
        success: true,
        message:
          "Your enquiry has been submitted. Our team will contact you using the details provided.",
        referenceId: resendData?.id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "[Email Dispatch Error - Resend]:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while dispatching your enquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
