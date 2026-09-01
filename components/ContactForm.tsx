"use client";

import { useState } from "react";
import { projects } from "@/lib/data";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Wire this up to your API route / CRM / email service of choice.
    setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-green-50 px-8 py-16 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-navy-900">Thank you!</h3>
        <p className="mt-2 max-w-sm text-navy-600">
          Your enquiry has been received. Our team will reach out to you
          shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-500">
          Full Name
        </label>
        <input
          required
          type="text"
          placeholder="Your full name"
          className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-900 outline-none transition-colors focus:border-green-500"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-500">
          Phone Number
        </label>
        <input
          required
          type="tel"
          placeholder="+91"
          className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-900 outline-none transition-colors focus:border-green-500"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-500">
          Email Address
        </label>
        <input
          required
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-900 outline-none transition-colors focus:border-green-500"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-500">
          I&rsquo;m interested in
        </label>
        <select className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-900 outline-none transition-colors focus:border-green-500">
          {projects.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="Future Ventures">Future & Proposed Ventures</option>
          <option value="General Enquiry">General Enquiry</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-navy-500">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Tell us a little about what you're looking for..."
          className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3.5 text-sm text-navy-900 outline-none transition-colors focus:border-green-500"
        />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
          {status === "submitting" ? "Sending..." : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}
