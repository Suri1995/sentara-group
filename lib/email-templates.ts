// Email templates for Sentara Group lead notifications.
// Email clients ignore most modern CSS, so these use tables and inline styles only.

const NAVY = "#0A2364";
const GREEN = "#147D3C";
const INK = "#1E2A4A";
const MUTED = "#5B6684";
const SAND = "#F4F1EA";
const LINE = "#E6E1D6";
const FONT = "'Plus Jakarta Sans','Segoe UI',Helvetica,Arial,sans-serif";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sentaragroup.in").replace(/\/$/, "");
const LOGO = `${siteUrl}/email/sentara-logo.png`;

export type Lead = {
  id: string | number;
  createdAt: string | Date;
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  message?: string;
};

// Never put user input into HTML without escaping it.
export const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const istTime = (d: string | Date) =>
  new Date(d).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) + " IST";

const button = (href: string, text: string, bg: string, color = "#ffffff", border = bg) => `
  <a href="${esc(href)}" target="_blank" style="display:inline-block;background:${bg};color:${color};border:1px solid ${border};font-family:${FONT};font-size:14px;font-weight:700;line-height:1;text-decoration:none;padding:14px 22px;border-radius:10px;">${esc(text)}</a>`;

const shell = (preheader: string, inner: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Sentara Group</title>
</head>
<body style="margin:0;padding:0;background:${SAND};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${SAND};font-size:1px;line-height:1px;">${esc(preheader)}&#8199;&zwnj;&#8199;&zwnj;&#8199;&zwnj;&#8199;&zwnj;&#8199;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND};">
  <tr><td align="center" style="padding:32px 14px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid ${LINE};">
      <tr>
        <td height="6" style="height:6px;font-size:0;line-height:0;background:${GREEN};background-image:linear-gradient(90deg,${GREEN} 0%,${NAVY} 100%);">&nbsp;</td>
      </tr>
      <tr><td align="left" style="padding:34px 40px 8px;">
        <img src="${LOGO}" width="210" alt="Sentara Group" style="display:block;width:210px;max-width:100%;height:auto;border:0;">
      </td></tr>
      ${inner}
      <tr><td style="padding:0 40px;"><div style="border-top:1px solid ${LINE};font-size:0;line-height:0;">&nbsp;</div></td></tr>
      <tr><td style="padding:24px 40px 34px;font-family:${FONT};font-size:12px;line-height:1.7;color:${MUTED};">
        <strong style="color:${NAVY};">Sentara Group</strong> &nbsp;|&nbsp; Where Land Meets Legacy<br>
        Hyderabad, Telangana, India<br>
        <a href="${siteUrl}" style="color:${GREEN};text-decoration:none;font-weight:600;">${siteUrl.replace(/^https?:\/\//, "")}</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;

/* ---------- 1. Thank-you email to the customer ---------- */

export function customerEmail(lead: Lead) {
  const first = esc(lead.fullName.trim().split(/\s+/)[0]);

  const detail = (k: string, v: string) => `
    <tr>
      <td style="padding:10px 0;font-family:${FONT};font-size:13px;color:${MUTED};width:120px;vertical-align:top;">${k}</td>
      <td style="padding:10px 0;font-family:${FONT};font-size:14px;color:${INK};font-weight:600;vertical-align:top;">${v}</td>
    </tr>`;

  const step = (n: number, title: string, body: string) => `
    <tr>
      <td width="40" valign="top" style="padding:0 0 18px;">
        <div style="width:28px;height:28px;border-radius:14px;background:${NAVY};color:#ffffff;font-family:${FONT};font-size:13px;font-weight:700;line-height:28px;text-align:center;">${n}</div>
      </td>
      <td valign="top" style="padding:0 0 18px;font-family:${FONT};">
        <div style="font-size:14px;font-weight:700;color:${INK};">${title}</div>
        <div style="font-size:13px;line-height:1.6;color:${MUTED};margin-top:2px;">${body}</div>
      </td>
    </tr>`;

  const html = shell(
    `Thank you, ${lead.fullName.split(" ")[0]}. We have your enquiry and our team will call you shortly.`,
    `
    <tr><td style="padding:22px 40px 0;font-family:${FONT};">
      <h1 style="margin:0;font-size:28px;line-height:1.25;font-weight:800;color:${NAVY};">Thank you, ${first}.</h1>
      <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:${INK};">
        We have received your enquiry about a <strong>${esc(lead.propertyType.toLowerCase())}</strong>. A member of our team will call you personally to understand what you are looking for and walk you through what is available.
      </p>
    </td></tr>

    <tr><td style="padding:26px 40px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND};border-radius:14px;">
        <tr><td style="padding:18px 24px 14px;">
          <div style="font-family:${FONT};font-size:12px;font-weight:700;color:${GREEN};margin-bottom:4px;">Your enquiry</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${detail("Looking for", esc(lead.propertyType))}
            ${detail("Phone", esc(lead.phone))}
            ${lead.message ? detail("Your note", `<span style="font-weight:400;line-height:1.6;">${esc(lead.message).replace(/\n/g, "<br>")}</span>`) : ""}
          </table>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:32px 40px 0;font-family:${FONT};">
      <h2 style="margin:0 0 18px;font-size:17px;font-weight:800;color:${NAVY};">What happens next</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${step(1, "We review your requirements", "Our advisor reads your enquiry and matches it to the right project.")}
        ${step(2, "You get a personal call", "We call the number you shared to answer your questions.")}
        ${step(3, "We arrange a site visit", "See the project in person at a time that suits you.")}
      </table>
    </td></tr>

    <tr><td style="padding:10px 40px 34px;font-family:${FONT};">
      ${button(siteUrl, "Explore our projects", NAVY)}
      <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:${MUTED};">
        Need to add something? Reply to this email and it will reach our team directly.
      </p>
    </td></tr>`
  );

  const text = [
    `Thank you, ${lead.fullName.trim().split(/\s+/)[0]}.`,
    ``,
    `We have received your enquiry about a ${lead.propertyType.toLowerCase()}. A member of our team will call you personally.`,
    ``,
    `Your enquiry`,
    `Looking for: ${lead.propertyType}`,
    `Phone: ${lead.phone}`,
    lead.message ? `Your note: ${lead.message}` : "",
    ``,
    `What happens next`,
    `1. We review your requirements`,
    `2. You get a personal call`,
    `3. We arrange a site visit`,
    ``,
    `Reply to this email to reach our team directly.`,
    ``,
    `Sentara Group | Where Land Meets Legacy`,
    siteUrl,
  ]
    .filter((l) => l !== "")
    .join("\n");

  return { subject: "Thank you for your enquiry | Sentara Group", html, text };
}

/* ---------- 2. Alert email to the sales team ---------- */

export function teamEmail(lead: Lead) {
  const digits = lead.phone.replace(/\D/g, "");
  const wa = `https://wa.me/${digits.length === 10 ? "91" + digits : digits}?text=${encodeURIComponent(
    `Hello ${lead.fullName.split(" ")[0]}, this is Sentara Group. Thank you for your enquiry about a ${lead.propertyType.toLowerCase()}.`
  )}`;

  const row = (k: string, v: string) => `
    <tr>
      <td style="padding:13px 0;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:13px;color:${MUTED};width:110px;vertical-align:top;">${k}</td>
      <td style="padding:13px 0;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:15px;color:${INK};font-weight:600;vertical-align:top;">${v}</td>
    </tr>`;

  const html = shell(
    `New ${lead.propertyType.toLowerCase()} enquiry from ${lead.fullName}, ${lead.phone}`,
    `
    <tr><td style="padding:22px 40px 0;font-family:${FONT};">
      <span style="display:inline-block;background:#E7F4EC;color:${GREEN};font-size:12px;font-weight:700;padding:6px 12px;border-radius:20px;">New website enquiry</span>
      <h1 style="margin:14px 0 0;font-size:26px;line-height:1.25;font-weight:800;color:${NAVY};">${esc(lead.fullName)}</h1>
      <p style="margin:6px 0 0;font-size:14px;color:${MUTED};">Interested in a ${esc(lead.propertyType.toLowerCase())}. Received ${esc(istTime(lead.createdAt))}.</p>
    </td></tr>

    <tr><td style="padding:22px 40px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="padding:0 10px 10px 0;">${button(`tel:+${digits.length === 10 ? "91" + digits : digits}`, "Call now", NAVY)}</td>
        <td style="padding:0 0 10px 0;">${button(`mailto:${lead.email}`, "Email", "#ffffff", NAVY, NAVY)}</td>
      </tr></table>
    </td></tr>

    <tr><td style="padding:14px 40px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${LINE};">
        ${row("Phone", `<a href="tel:+${digits.length === 10 ? "91" + digits : digits}" style="color:${INK};text-decoration:none;">${esc(lead.phone)}</a>`)}
        ${row("Email", `<a href="mailto:${esc(lead.email)}" style="color:${INK};text-decoration:none;">${esc(lead.email)}</a>`)}
        ${row("Looking for", esc(lead.propertyType))}
        ${row("Message", lead.message ? `<span style="font-weight:400;line-height:1.7;">${esc(lead.message).replace(/\n/g, "<br>")}</span>` : `<span style="font-weight:400;color:${MUTED};">No message provided</span>`)}
      </table>
    </td></tr>

    <tr><td style="padding:18px 40px 30px;font-family:${FONT};font-size:12px;color:${MUTED};">
      Lead ID ${esc(lead.id)}. Reply to this email to write to the customer directly.
    </td></tr>`
  );

  const text = [
    `New website enquiry`,
    `Name: ${lead.fullName}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Looking for: ${lead.propertyType}`,
    `Message: ${lead.message || "No message provided"}`,
    `Received: ${istTime(lead.createdAt)}`,
    `Lead ID: ${lead.id}`,
  ].join("\n");

  return {
    subject: `New ${lead.propertyType} enquiry: ${lead.fullName}`,
    html,
    text,
  };
}