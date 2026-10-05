import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";
import { customerEmail, teamEmail } from "@/lib/email-templates";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

const PROPERTY_TYPES = ["Villa", "Apartment"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: real visitors never fill this hidden field.
    // Pretend success so bots don't learn they were blocked.
    if (clean(body.website, 100)) {
      return NextResponse.json({ success: true });
    }

    const fullName = clean(body.fullName, 100);
    const phone = clean(body.phone, 20);
    const email = clean(body.email, 150).toLowerCase();
    const propertyType = clean(body.propertyType, 30);
    const message = clean(body.message, 1000);

    const phoneDigits = phone.replace(/\D/g, "");

    if (
      !fullName ||
      !EMAIL_RE.test(email) ||
      phoneDigits.length < 10 ||
      phoneDigits.length > 13 ||
      !PROPERTY_TYPES.includes(propertyType)
    ) {
      return NextResponse.json(
        { success: false, error: "Please fill all required fields correctly." },
        { status: 400 }
      );
    }

    // 1. Save the lead first, so it is never lost if email fails
    const result = await sql`
      INSERT INTO leads (full_name, phone, email, property_type, message)
      VALUES (${fullName}, ${phone}, ${email}, ${propertyType}, ${message})
      RETURNING id, created_at
    `;
    const lead = result[0];

    const data = {
      id: lead.id,
      createdAt: lead.created_at,
      fullName,
      phone,
      email,
      propertyType,
      message,
    };

    // 2. Send both emails. One failing must not fail the enquiry.
    const team = teamEmail(data);
    const customer = customerEmail(data);

    const [teamResult, customerResult] = await Promise.allSettled([
      resend.emails.send({
        from: process.env.LEAD_FROM_EMAIL!,
        to: process.env.LEAD_TO_EMAIL!,
        replyTo: email,
        subject: team.subject,
        html: team.html,
        text: team.text,
      }),
      resend.emails.send({
        from: process.env.LEAD_FROM_EMAIL!,
        to: email,
        replyTo: process.env.LEAD_TO_EMAIL!,
        subject: customer.subject,
        html: customer.html,
        text: customer.text,
      }),
    ]);

    for (const [name, r] of [
      ["team", teamResult],
      ["customer", customerResult],
    ] as const) {
      if (r.status === "rejected") console.error(`${name} email failed:`, r.reason);
      else if (r.value.error) console.error(`${name} email failed:`, r.value.error);
    }

    console.log("Lead saved:", lead.id);
    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit enquiry." },
      { status: 500 }
    );
  }
}