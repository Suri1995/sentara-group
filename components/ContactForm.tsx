"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "sent" | "error";
type Field = "fullName" | "phone" | "email" | "propertyType";
type Errors = Partial<Record<Field, string>>;

const PROPERTY_TYPES = [
  {
    value: "Villa",
    title: "Villa",
    hint: "Independent homes with private space",
    icon: (
      <path
        d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10M10 19.5v-5h4v5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    value: "Apartment",
    title: "Apartment",
    hint: "Gated community living",
    icon: (
      <path
        d="M6 20.5V4h12v16.5M3 20.5h18M9.5 8h1m3 0h1m-5 4h1m3 0h1m-5 4h1m3 0h1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const inputBase =
  "w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-[15px] text-navy-900 placeholder:text-navy-500/50 outline-none transition focus:ring-4";
const inputOk =
  "border-navy-200 focus:border-green-500 focus:ring-green-500/15";
const inputBad = "border-red-400 focus:border-red-500 focus:ring-red-500/15";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-500/60"
    >
      {children}
    </svg>
  );
}

function validate(v: Record<Field, string>): Errors {
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Enter your full name.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13)
    e.phone = "Enter a valid phone number, e.g. 98765 43210.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email, e.g. you@example.com.";
  if (!v.propertyType) e.propertyType = "Choose the type of home you want.";
  return e;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<Record<Field, string>>({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
  });
  const [message, setMessage] = useState("");

  const set = (k: Field, val: string) => {
    setValues((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    const website = (e.currentTarget.elements.namedItem("website") as HTMLInputElement)
      ?.value;
    const digits = values.phone.replace(/\D/g, "");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          phone: digits.length === 10 ? `+91 ${digits}` : `+${digits}`,
          email: values.email.trim(),
          propertyType: values.propertyType,
          message: message.trim(),
          website, // honeypot, must stay empty
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to submit enquiry");
      setStatus("sent");
    } catch (err) {
      console.error("Lead submission error:", err);
      setStatus("error");
    }
  };

  const reset = () => {
    setValues({ fullName: "", phone: "", email: "", propertyType: "" });
    setMessage("");
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent") {
    const first = values.fullName.trim().split(" ")[0];
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-3xl border border-green-500/20 bg-white px-8 py-14 text-center shadow-[0_24px_60px_-30px_rgba(10,35,100,0.35)]"
      >
        <style>{`
          @keyframes sentara-draw { to { stroke-dashoffset: 0; } }
          @keyframes sentara-pop { 0% { transform: scale(.7); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
          @media (prefers-reduced-motion: reduce) { .sentara-anim { animation: none !important; stroke-dashoffset: 0 !important; } }
        `}</style>
        <div
          className="sentara-anim mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-white"
          style={{ animation: "sentara-pop .45s ease-out both" }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sentara-anim"
              style={{
                strokeDasharray: 24,
                strokeDashoffset: 24,
                animation: "sentara-draw .5s .25s ease-out forwards",
              }}
            />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-navy-900">
          Thank you, {first}.
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-navy-600">
          We have your enquiry, and a confirmation is on its way to{" "}
          <span className="font-semibold text-navy-900">{values.email}</span>.
          Someone from our team will call you personally.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 text-sm font-semibold text-green-500 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/20"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const label = "mb-2 block text-sm font-semibold text-navy-900";
  const err = (k: Field) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-red-600">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-navy-200/70 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(10,35,100,0.35)] sm:p-9"
    >
      <div className="mb-8">
        <h3 className="font-display text-2xl text-navy-900">
          Tell us what you are looking for
        </h3>
        <p className="mt-1.5 text-sm text-navy-600">
          Takes about a minute. We will call you to take it from there.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Property type */}
        <fieldset className="sm:col-span-2">
          <legend className={label}>I am looking for a</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROPERTY_TYPES.map((p) => (
              <label key={p.value} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name="propertyType"
                  value={p.value}
                  checked={values.propertyType === p.value}
                  onChange={() => set("propertyType", p.value)}
                  className="peer sr-only"
                />
                <div className="flex items-center gap-4 rounded-xl border border-navy-200 bg-white p-4 transition peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:ring-4 peer-checked:ring-green-500/10 peer-focus-visible:ring-4 peer-focus-visible:ring-green-500/30 hover:border-navy-500/40">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      aria-hidden="true"
                    >
                      {p.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-900">{p.title}</span>
                    <span className="block text-[13px] text-navy-600">{p.hint}</span>
                  </span>
                </div>
              </label>
            ))}
          </div>
          {err("propertyType")}
        </fieldset>

        {/* Name */}
        <div className="sm:col-span-1">
          <label htmlFor="fullName" className={label}>Full name</label>
          <div className="relative">
            <Icon>
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" strokeLinecap="round" />
            </Icon>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={`${inputBase} ${errors.fullName ? inputBad : inputOk}`}
            />
          </div>
          {err("fullName")}
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label htmlFor="phone" className={label}>Phone number</label>
          <div className="relative">
            <Icon>
              <path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1Z"
                strokeLinejoin="round"
              />
            </Icon>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="98765 43210"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`${inputBase} ${errors.phone ? inputBad : inputOk}`}
            />
          </div>
          {err("phone")}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className={label}>Email address</label>
          <div className="relative">
            <Icon>
              <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
              <path d="m4 7.5 8 5.5 8-5.5" strokeLinecap="round" strokeLinejoin="round" />
            </Icon>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
            />
          </div>
          {err("email")}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            Anything we should know?{" "}
            <span className="font-normal text-navy-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="Preferred location, budget, timeline, or questions about a project"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-xl border border-navy-200 bg-white px-4 py-3.5 text-[15px] text-navy-900 placeholder:text-navy-500/50 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/15"
          />
        </div>

        {/* Honeypot: hidden from people, bots fill it in */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {status === "error" && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:col-span-2"
          >
            We could not send your enquiry. Check your connection and try again.
          </div>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-navy-900 px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:bg-navy-900/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/40 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Sending
              </>
            ) : (
              "Request a call back"
            )}
          </button>
          <p className="mt-4 text-center text-[13px] text-navy-500">
            Your details stay with Sentara Group and are never shared or sold.
          </p>
        </div>
      </div>
    </form>
  );
}