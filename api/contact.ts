import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// In-memory rate limit cache
const rateLimitMap = new Map<string, number[]>();
// In-memory duplicate request cache
const lastRequestMap = new Map<string, { bodyHash: string; timestamp: number }>();

// Helper to escape HTML tags to prevent XSS/injection in emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 1. HTTP Method Validation (POST only)
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed. Only POST is accepted.`,
    });
  }

  try {
    const { name, email, message, honey } = req.body || {};

    // 2. Honeypot check for spam bots
    // If the hidden field 'honey' is filled, quietly succeed to deceive the bot.
    if (honey && honey.trim() !== "") {
      console.warn("[SPAM DETECTED] Honeypot field filled.");
      return res.status(200).json({
        success: true,
        message: "Thanks for contacting me.",
      });
    }

    // 3. Client IP retrieval
    const ip =
      (req.headers["x-real-ip"] as string) ||
      (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
      "unknown";

    const now = Date.now();

    // 4. Rate Limiting: Max 3 requests per 10 minutes per IP
    const windowMs = 10 * 60 * 1000;
    const limit = 3;

    // Clean old expired entries first to prevent memory leak
    for (const [key, value] of rateLimitMap.entries()) {
      const active = value.filter((t) => now - t < windowMs);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, active);
      }
    }

    const clientRequests = rateLimitMap.get(ip) || [];
    const activeRequests = clientRequests.filter((t) => now - t < windowMs);

    if (activeRequests.length >= limit) {
      return res.status(429).json({
        success: false,
        error: "Too many contact requests. Please try again in 10 minutes.",
      });
    }

    // 5. Duplicate Submission Prevention: Cooldown of 15s for the same body from the same IP
    const cooldownMs = 15 * 1000;
    const bodyHash = JSON.stringify({ name, email, message });
    const lastRequest = lastRequestMap.get(ip);

    if (
      lastRequest &&
      now - lastRequest.timestamp < cooldownMs &&
      lastRequest.bodyHash === bodyHash
    ) {
      return res.status(400).json({
        success: false,
        error: "Duplicate request detected. Please wait a moment before sending another message.",
      });
    }

    // Update caches
    activeRequests.push(now);
    rateLimitMap.set(ip, activeRequests);
    lastRequestMap.set(ip, { bodyHash, timestamp: now });

    // 6. Input Validation
    if (!name || typeof name !== "string") {
      return res.status(400).json({ success: false, error: "Name field is required." });
    }
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        error: "Name must be between 2 and 100 characters.",
      });
    }

    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, error: "Email field is required." });
    }
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }

    if (!message || typeof message !== "string") {
      return res.status(400).json({ success: false, error: "Message field is required." });
    }
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        error: "Message must be between 10 and 2000 characters.",
      });
    }

    // 7. Input Sanitization
    const escapedName = escapeHtml(trimmedName);
    const escapedEmail = escapeHtml(trimmedEmail);
    const escapedMessage = escapeHtml(trimmedMessage);

    // 8. Resend configuration check
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not defined in environment variables.");
      return res.status(500).json({
        success: false,
        error: "Backend contact service is misconfigured. Please check environment variables.",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    let fromEmail = (process.env.SENDER_EMAIL || "").trim();
    const emailRegexSimple = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fromEmail || !emailRegexSimple.test(fromEmail)) {
      if (fromEmail) {
        console.warn(`[WARNING] SENDER_EMAIL environment variable "${fromEmail}" is invalid. Falling back to "onboarding@resend.dev".`);
      }
      fromEmail = "onboarding@resend.dev";
    }

    const toEmail = process.env.RECEIVER_EMAIL || "ashish2772006@gmail.com";
    console.log(`[DEBUG] Dispatching contact email. From: Ashish Portfolio <${fromEmail}>, To: ${toEmail}`);

    // 9. Prepare Email HTML Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Contact</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #d1d5db;
            background-color: #050816;
            margin: 0;
            padding: 0;
          }
          .wrapper {
            background-color: #050816;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #090d25;
            border: 1px solid #1f2937;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
          }
          .header {
            background: linear-gradient(135deg, #1f1f2e, #0b0b13);
            padding: 30px 24px;
            text-align: center;
            border-bottom: 2px solid #915ecc;
          }
          .header h2 {
            margin: 0;
            font-size: 22px;
            color: #ffffff;
            letter-spacing: 0.5px;
            font-weight: 800;
          }
          .content {
            padding: 32px 24px;
          }
          .section {
            margin-bottom: 24px;
          }
          .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #915ecc;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .value {
            font-size: 15px;
            color: #f3f4f6;
            background-color: #10132e;
            padding: 14px 18px;
            border-radius: 8px;
            white-space: pre-wrap;
            border: 1px solid #1f2937;
          }
          .footer {
            background-color: #070a1f;
            padding: 24px;
            text-align: center;
            font-size: 13px;
            color: #9ca3af;
            border-top: 1px solid #1f2937;
          }
          .footer p {
            margin: 0 0 12px 0;
          }
          .footer a {
            color: #915ecc;
            text-decoration: none;
            font-weight: 600;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h2>🚀 New Portfolio Contact</h2>
            </div>
            <div class="content">
              <div class="section">
                <div class="label">👤 Name</div>
                <div class="value">${escapedName}</div>
              </div>
              <div class="section">
                <div class="label">📧 Email</div>
                <div class="value">${escapedEmail}</div>
              </div>
              <div class="section">
                <div class="label">💬 Message</div>
                <div class="value">${escapedMessage}</div>
              </div>
            </div>
            <div class="footer">
              <p>Reply directly to this email to contact the sender.</p>
              <a href="mailto:${escapedEmail}">Reply to ${escapedName}</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 10. Send via Resend
    const emailResult = await resend.emails.send({
      from: `Ashish Portfolio <${fromEmail}>`,
      to: toEmail,
      subject: `🚀 New Portfolio Contact - ${trimmedName}`,
      html: htmlTemplate,
      replyTo: trimmedEmail,
    });

    if (emailResult.error) {
      console.error("[RESEND_ERROR]: ", emailResult.error);
      return res.status(500).json({
        success: false,
        error: "Failed to dispatch email via Resend service.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thanks for contacting me. I will get back to you soon!",
    });
  } catch (error: any) {
    console.error("[API_CONTACT_ERROR]: ", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected internal server error occurred while processing your request.",
    });
  }
}
