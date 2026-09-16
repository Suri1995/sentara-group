import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { brand, chairman } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sentara Group for project enquiries, site visits and investment opportunities across Hyderabad.",
};

const infoCards = [
  {
    label: "Head Office",
    value: brand.addressHQ,
    icon: (
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z M12 11.3a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6z" stroke="currentColor" strokeWidth="1.6" />
    ),
  },
  {
    label: "Call Us",
    value: brand.phone,
    href: `tel:${brand.phoneRaw}`,
    icon: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8.1 9.7a16 16 0 006.2 6.2l1.2-1.2a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6A2 2 0 0122 16.9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: "Email Us",
    value: brand.email,
    href: `mailto:${brand.email}`,
    icon: <path d="M4 4h16v16H4V4z M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy-gradient py-24 pt-40 text-center text-white sm:py-28">
        {/* Ambient grid + dual glow — already defined in globals.css but
            unused elsewhere; reusing them here instead of hand-rolling a
            one-off gradient keeps this page on the same visual language
            as the rest of the site with zero new CSS. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 editorial-grid" />
        <div aria-hidden className="pointer-events-none absolute inset-0 luxury-gradient" />

        <div className="container-page relative">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-green-300/60 sm:w-10" aria-hidden />
              <p className="eyebrow !text-green-300">Get in Touch</p>
              <span className="h-px w-8 bg-green-300/60 sm:w-10" aria-hidden />
            </div>
            <h1 className="heading-xl mt-4 text-white">
              We&rsquo;d Love to Hear From You
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Whether you&rsquo;re exploring a villa at Anvita Parkside, a home
              at Landspace Elite, or an investment opportunity in our future
              ventures — our team is here to help.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Info + Form ---------------- */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Faint textured backdrop, same restrained language as other
            light sections across the site */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11,36,82,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,36,82,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-page relative grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="space-y-5 lg:col-span-1">
            {infoCards.map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 100}
                className="group relative overflow-hidden card-premium p-6"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-green-500 to-navy-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-white">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      {c.icon}
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                      {c.label}
                    </p>
                    {"href" in c && c.href ? (
                      <a
                        href={c.href}
                        className="group/link mt-1 inline-flex items-start gap-1 text-navy-900 transition-colors duration-200 hover:text-green-600"
                      >
                        <span className="break-words">{c.value}</span>
                        <ArrowUpRight
                          className="mt-0.5 size-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                          aria-hidden
                        />
                      </a>
                    ) : (
                      <p className="mt-1 text-navy-900">{c.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={100}
            className="relative overflow-hidden card-premium p-8 lg:col-span-2 sm:p-12"
          >
            {/* Same dual-glow utility as the hero, heavily dimmed — ties
                the form panel back to the page's opening visual without
                competing with the form itself */}
            <div
              aria-hidden
              className="luxury-gradient pointer-events-none absolute inset-0 opacity-40"
            />
            <div className="relative">
              <SectionHeading
                title="Send Us an Enquiry"
                description="Fill in your details and our sales team will get back to you within 24 hours."
              />
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}