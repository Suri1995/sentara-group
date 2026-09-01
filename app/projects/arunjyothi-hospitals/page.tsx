import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";

export const metadata: Metadata = {
  title: "Arunjyothi Hospitals — Hayat Nagar, Hyderabad",
  description:
    "A 30-bed multi-speciality healthcare facility in Hayat Nagar, Hyderabad, built to deliver comprehensive, community-focused clinical care.",
};

export default function ArunjyothiHospitalsPage() {
  return (
    <>
      <section className="relative -mt-20 flex min-h-[65vh] items-end overflow-hidden pt-20">
        <Image
          src="/images/arunjyothi/arunjyothi-hospital.jpg"
          alt="Arunjyothi Hospitals"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-scrim" />
        <div className="container-page relative pb-16 text-white">
          <span className="chip mb-4 border-white/30 bg-white/10 text-white backdrop-blur">
            Completed · Hayat Nagar, Hyderabad
          </span>
          <h1 className="heading-xl text-white">Arunjyothi Hospitals</h1>
          <p className="mt-4 max-w-lg text-white/80">
            Multi-Speciality Care — Passion for Caring
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Project Overview"
              title="Comprehensive, Community-Focused Clinical Care"
            />
            <div className="mt-6 space-y-5">
              <p className="body-lg">
                A 30-bed multi-speciality healthcare facility built to
                deliver comprehensive, community-focused clinical care —
                reflecting the Sentara Group&rsquo;s commitment to quality
                infrastructure that extends beyond residential and
                commercial development into essential public healthcare.
              </p>
              <p className="body-lg">
                Housed alongside Pushpa Medical &amp; General Stores for
                everyday convenience, Arunjyothi Hospitals serves as a
                trusted neighbourhood healthcare destination in Hayat Nagar.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-6">
            <div className="card-premium p-8 text-center">
              <StatCounter value="400" label="Sq. Yards Plot Size" />
            </div>
            <div className="card-premium p-8 text-center">
              <StatCounter value="30" label="Bed Multi-Speciality Facility" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy-900 py-20 text-center text-white">
        <div className="container-page">
          <h3 className="heading-md text-white">Learn More About Our Healthcare Ventures</h3>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Sentara Group continues to invest in essential community
            healthcare infrastructure across Hyderabad.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
