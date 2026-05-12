import type { Context } from "@netlify/functions";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_ELAPSED_MS = 3_000; // reject submissions faster than 3 seconds

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ── Origin check — only accept requests from this domain ──────────────────
  const origin = req.headers.get("origin") ?? "";
  const allowed = [
    process.env.URL,           // Netlify sets this automatically
    "http://localhost:3000",
  ].filter(Boolean);
  if (allowed.length && !allowed.some(o => origin.startsWith(o!))) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await req.json();
  const { name, email, projectType, message, honeypot, loadTime } = body;

  // ── Honeypot — bots fill this; humans never see it ────────────────────────
  if (honeypot) {
    // Silent success: don't reveal to the bot that we caught it
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Timing check — under 3 s almost certainly a bot ──────────────────────
  if (!loadTime || Date.now() - loadTime < MIN_ELAPSED_MS) {
    return new Response(JSON.stringify({ error: "Submission too fast." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Server-side field validation ──────────────────────────────────────────
  if (
    typeof name    !== "string" || name.trim().length    < 2  ||
    typeof email   !== "string" || !emailRe.test(email.trim()) ||
    typeof message !== "string" || message.trim().length < 20
  ) {
    return new Response(JSON.stringify({ error: "Invalid fields." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Send via Resend ───────────────────────────────────────────────────────
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:     "Sean Corey Portfolio <sean@seancorey.net>",
      to:       [process.env.CONTACT_EMAIL],
      reply_to: email.trim(),
      subject:  `New enquiry from ${name.trim()}`,
      html: `
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
        ${projectType ? `<p><strong>Project type:</strong> ${projectType}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.trim().replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response(JSON.stringify({ error: "Failed to send." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
