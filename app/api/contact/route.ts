import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── Email templates ───────────────────────────────────────────────────────────

function buildNotificationHtml(
  safeName: string,
  safeEmail: string,
  safeProjectType: string,
  safeMessage: string,
): string {
  return `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1A1A1A;">
      <h2 style="color: #2E7D32; margin: 0 0 16px;">New Code4U inquiry</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; width: 120px;">Name</td>
          <td style="padding: 8px 0;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Email</td>
          <td style="padding: 8px 0;">
            <a href="mailto:${safeEmail}" style="color: #2E7D32;">${safeEmail}</a>
          </td>
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
}

function buildAutoReplyHtml(safeName: string, safeProjectType: string): string {
  return `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1A1A1A;">
      <h2 style="color: #2E7D32; margin: 0 0 16px;">Thanks for reaching out, ${safeName}!</h2>
      <p style="line-height: 1.7; margin: 0 0 16px;">
        We've received your enquiry about a <strong>${safeProjectType}</strong> and will
        get back to you <strong>within 24 hours</strong>.
      </p>
      <p style="line-height: 1.7; margin: 0 0 32px;">
        In the meantime, feel free to browse our work at
        <a href="https://code4u.app" style="color: #2E7D32;">code4u.app</a>
      </p>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 13px; color: #6b7280;">
        <p style="margin: 0 0 4px; font-weight: 600; color: #374151;">Code4U</p>
        <a href="https://code4u.app" style="color: #6b7280; text-decoration: none;">code4u.app</a>
      </div>
    </div>
  `;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, projectType, message, website } = parsed.data;

  // Honeypot — silently succeed so bots don't retry
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProjectType = escapeHtml(projectType);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const resend = new Resend(apiKey);

  try {
    // Fire both emails concurrently
    const [notification, autoReply] = await Promise.allSettled([
      resend.emails.send({
        from: `Code4U Contact Form <${fromEmail}>`,
        to: [toEmail],
        replyTo: email,
        subject: `[Code4U] ${projectType} — ${name}`,
        html: buildNotificationHtml(safeName, safeEmail, safeProjectType, safeMessage),
        text: `New Code4U inquiry\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`,
      }),
      resend.emails.send({
        from: `Code4U <${fromEmail}>`,
        to: [email],
        subject: `Got your message, ${name}!`,
        html: buildAutoReplyHtml(safeName, safeProjectType),
        text: `Thanks for reaching out, ${name}!\n\nWe received your enquiry about a ${projectType} and will get back to you within 24 hours.\n\n— Code4U\nhttps://code4u.app`,
      }),
    ]);

    // The notification to you is critical — fail the request if it didn't send
    if (notification.status === "rejected" || notification.value.error) {
      const err =
        notification.status === "rejected"
          ? notification.reason
          : notification.value.error;
      console.error("Resend notification error:", err);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    // Auto-reply failure is non-critical — log it but still return success
    if (autoReply.status === "rejected" || autoReply.value.error) {
      const err =
        autoReply.status === "rejected"
          ? autoReply.reason
          : autoReply.value.error;
      console.warn("Auto-reply failed (non-critical):", err);
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