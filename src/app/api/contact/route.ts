import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO_EMAIL ?? "";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ── Rate limit: max 3 submissions per IP per minute ──────────────────────────
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  }

  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, {count: 1, resetAt: now + WINDOW_MS});
    return {ok: true as const};
  }
  if (entry.count >= MAX_REQUESTS) {
    return {ok: false as const, retryAfter: Math.ceil((entry.resetAt - now) / 1000)};
  }
  entry.count += 1;
  return {ok: true as const};
}

// ── Branded HTML email ───────────────────────────────────────────────────────
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function renderEmail(
  name: string,
  email: string,
  message: string
) {
  const n = esc(name);
  const e = esc(email);
  const m = esc(message).replace(/\n/g, "<br/>");
  return `
  <div style="background:#0e0e11;padding:32px 0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
    <div style="max-width:520px;margin:0 auto;background:#17171b;border:1px solid #2a2a30;border-radius:12px;overflow:hidden">
      <div style="height:4px;background:#8b5cf6"></div>
      <div style="padding:28px 32px">
        <p style="margin:0 0 4px;color:#8b5cf6;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700">New message</p>
        <h1 style="margin:0 0 20px;color:#f4f4f5;font-size:20px;font-weight:600">From ${n}</h1>
        <p style="margin:0 0 16px;color:#a1a1aa;font-size:14px">
          <strong style="color:#f4f4f5">Email:</strong>
          <a href="mailto:${e}" style="color:#8b5cf6;text-decoration:none">${e}</a>
        </p>
        <div style="background:#0e0e11;border:1px solid #2a2a30;border-radius:8px;padding:16px;color:#e4e4e7;font-size:14px;line-height:1.6">${m}</div>
        <p style="margin:20px 0 0;color:#71717a;font-size:12px">Sent from your portfolio contact form · just reply to respond.</p>
      </div>
    </div>
  </div>`;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const limit = rateLimit(ip);
    if (!limit.ok) {
      return Response.json(
        {ok: false, error: "Too many messages — please wait a minute and try again."},
        {status: 429, headers: {"Retry-After": String(limit.retryAfter)}}
      );
    }

    const {name, email, message, company} = await req.json();

    // Honeypot: hidden field only bots fill. Fake success so they move on.
    if (typeof company === "string" && company.trim() !== "") {
      return Response.json({ok: true});
    }

    if (
      typeof name !== "string" || !name.trim() || name.length > 100 ||
      typeof email !== "string" || !isEmail(email) || email.length > 200 ||
      typeof message !== "string" || !message.trim() || message.length > 5000
    ) {
      return Response.json({ok: false, error: "Please check your details."}, {status: 400});
    }

    if (!TO) {
      return Response.json({ok: false, error: "Server not configured."}, {status: 500});
    }

    const {error} = await resend.emails.send({
                                               from: `Portfolio <${FROM}>`,
                                               to: [TO],
                                               replyTo: email,
                                               subject: `New portfolio message from ${name}`,
                                               html: renderEmail(name, email, message),
                                               text: `From: ${name} <${email}>\n\n${message}`, // plain-text fallback
                                             });

    if (error) {
      return Response.json({ok: false, error: "Couldn't send. Try again."}, {status: 502});
    }
    return Response.json({ok: true});
  } catch {
    return Response.json({ok: false, error: "Bad request."}, {status: 400});
  }
}