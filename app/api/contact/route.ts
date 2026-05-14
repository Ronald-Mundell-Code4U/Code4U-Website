import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * In-memory rate limiter — 3 submissions per IP per 10 minutes.
 *
 * Sufficient for a low-traffic personal site on a single Vercel region.
 * For multi-region or higher traffic, swap to Upstash Redis — the schema is:
 *   const { success } = await ratelimit.limit(ip);
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 3;
const rateMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count += 1;
  return true;
}

// Best-effort HTML escape for embedding user content in the notification email
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  // Parse body
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Validate
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, projectType, message, website } = parsed.data;

  // Honeypot — silently succeed so bots don't retry
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  // Send
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "Ronald@code4u.app";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "noreply@code4u.app";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const html = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1A1A1A;">
        <h2 style="color: #2E7D32; margin: 0 0 16px;">New Code4U inquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 120px;">Name</td>
            <td style="padding: 8px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #2E7D32;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Project Type</td>
            <td style="padding: 8px 0;">${safeProjectType}</td>
          </tr>
        </table>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
          <p style="font-weight: 600; margin: 0 0 8px;">Message</p>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
        </div>
      </div>
    `;

    const text = `New Code4U inquiry

Name: ${name}
Email: ${email}
Project Type: ${projectType}

Message:
${message}
`;

    const { error } = await resend.emails.send({
      from: `Code4U Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Code4U] ${projectType} — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
