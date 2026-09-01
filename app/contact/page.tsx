import type { Metadata } from "next";
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
      <section className="bg-navy-gradient py-24 pt-40 text-center text-white sm:py-28">
        <div className="container-page">
          <p className="eyebrow !text-green-300 mb-3">Get in Touch</p>
          <h1 className="heading-xl text-white">We&rsquo;d Love to Hear From You</h1>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Whether you&rsquo;re exploring a villa at Anvita Parkside, a home
            at Landspace Elite, or an investment opportunity in our future
            ventures — our team is here to help.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            {infoCards.map((c) => (
              <Reveal key={c.label} className="card-premium flex items-start gap-4 p-6">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    {c.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                    {c.label}
                  </p>
                  {"href" in c && c.href ? (
                    <a href={c.href} className="mt-1 block text-navy-900 hover:text-green-600">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-navy-900">{c.value}</p>
                  )}
                </div>
              </Reveal>
            ))}

            <Reveal delay={150} className="card-premium p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-500">
                Chairman&rsquo;s Office
              </p>
              <p className="mt-1 font-display text-lg text-navy-900">{chairman.name}</p>
              <p className="text-sm text-navy-600">{chairman.title}</p>
            </Reveal>
          </div>

          <Reveal delay={100} className="card-premium p-8 lg:col-span-2 sm:p-12">
            <SectionHeading title="Send Us an Enquiry" description="Fill in your details and our sales team will get back to you within 24 hours." />
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
