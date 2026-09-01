import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";
import { landspaceSpecs, landspaceHighlights } from "@/lib/data";

export const metadata: Metadata = {
  title: "Landspace Elite — Medipally, Hyderabad",
  description:
    "A premium 5-storied deluxe residential apartment complex offering all 3 BHK flats with open natural ventilation in Medipally, Hyderabad. RERA No. REA02200060913.",
};

export default function LandspaceElitePage() {
  return (
    <>
      <section className="relative -mt-20 flex min-h-[70vh] items-end overflow-hidden pt-20">
        <Image
          src="/images/landspace/landspace-elite-building.jpg"
          alt="Landspace Elite"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="container-page relative pb-16 text-white">
          <span className="chip mb-4 border-white/30 bg-white/10 text-white backdrop-blur">
            Completed · Medipally, Hyderabad
          </span>
          <h1 className="heading-xl text-white">Landspace Elite</h1>
          <p className="mt-4 max-w-lg text-white/80">
            An Elegant, Evergreen &amp; Eternal Living — 3 BHK Delux Flats
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Project Overview"
              title="Open, Natural Ventilation on Three Sides"
            />
            <Reveal delay={100} className="mt-6 space-y-5">
              <p className="body-lg">
                A premium 5-storied deluxe residential apartment complex
                offering open, natural ventilation along three sides,
                adjacent to the 56-acre Rachakonda Police Commissionerate
                site and the 230-acre Bhagya Nagar Nandhanavanam urban
                forest.
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {landspaceHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-navy-700">
                    <svg className="mt-0.5 flex-none text-green-600" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={150} className="card-premium p-8">
            <h3 className="font-display text-xl text-navy-900">Specifications</h3>
            <dl className="mt-6 space-y-4">
              {landspaceSpecs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-navy-100 pb-3 text-sm">
                  <dt className="text-navy-500">{s.label}</dt>
                  <dd className="text-right font-semibold text-navy-900">{s.value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/contact" className="btn-primary mt-7 w-full">
              Enquire About Availability
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-gradient py-16 text-white">
        <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatCounter value="600" label="Sq. Yards Plot" dark />
          <StatCounter value="1535" label="Sq. Ft. per Flat" dark />
          <StatCounter value="10" label="Total Flats" dark />
          <StatCounter value="5" label="Residential Floors" dark />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium">
            <Image
              src="/images/landspace/landspace-elite-building.jpg"
              alt="Landspace Elite building facade"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-3">Connectivity</p>
            <h2 className="heading-lg">Well-Connected, Naturally Surrounded</h2>
            <div className="divider-gold my-5" />
            <p className="body-lg">
              Positioned minutes from the Warangal Highway and Uppal Metro
              Station, Landspace Elite offers rare open ventilation on three
              sides in one of Medipally&rsquo;s most naturally green pockets —
              bordered by a reserved forest and a police commissionerate
              green belt that will remain undeveloped.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-900 py-20 text-center text-white">
        <div className="container-page">
          <h3 className="heading-md text-white">Interested in Landspace Elite?</h3>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Reach out to our team for unit availability, pricing and a guided
            tour of the property.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Contact Sales Team
          </Link>
        </div>
      </section>
    </>
  );
}
