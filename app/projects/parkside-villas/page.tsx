import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import GalleryLightbox from "@/components/GalleryLightbox";
import StatCounter from "@/components/StatCounter";
import {
  parksideAmenityZones,
  parksideVillaTypes,
  parksideClubhouseFacilities,
  parksideGallery,
  parksideSpecs,
  parksideLocationHighlights,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Anvita Parkside Villas — Ravalkole, Medchal",
  description:
    "270 premium 4 BHK triplex villas on 50 acres in Ravalkole, Medchal. 75% open spaces, resort-style clubhouse and over 75 lifestyle amenities. TG RERA No. P02200009326.",
};

const heroSlides = [
  { image: "/images/parkside/street-view.jpg", subcaption: "Anvita Parkside", caption: "Nestle in Nature" },
  { image: "/images/parkside/entrance-road.jpg", subcaption: "Grand Entrance", caption: "A Masterplanned 50-Acre Eco-Neighbourhood" },
  { image: "/images/parkside/hero-couple.jpg", subcaption: "Villa Living", caption: "Imagine Anvita Parkside" },
];

export default function ParksideVillasPage() {
  return (
    <>
      <section className="relative -mt-20">
        <Carousel slides={heroSlides} aspect="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]" rounded="rounded-none" />
      </section>

      {/* INTRO + SPECS */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Ongoing & Under Execution · Medchal, Hyderabad"
              title="Experience the Difference You Only Get with Parkside"
            />
            <Reveal delay={100} className="mt-6 space-y-5">
              <p className="body-lg">
                Step into a world of opulence, while still being cocooned in
                nature. With meticulously designed villas that reflect your
                taste, Anvita Parkside ensures maximum privacy, unparalleled
                luxury, allowing you to immerse yourself in the idyllic
                surroundings.
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Eco-friendly community with 75% open spaces",
                  "Only 270 unique villas spread over 50 acres",
                  "Every villa has a 20 ft front yard and backyard",
                  "2.5-acre resort-like clubhouse with abundant parking",
                  "Holistic, self-sustaining, health-centric community",
                  "3.2 acres reserved for community farming",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-navy-700">
                    <svg className="mt-0.5 flex-none text-green-600" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="chip">TG RERA No. P02200009326</span>
                <span className="chip bg-green-50 text-green-700">
                  ★ Best Green Building Project — CREDAI Hyderabad
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="card-premium p-8">
            <h3 className="font-display text-xl text-navy-900">Project Specifications</h3>
            <dl className="mt-6 space-y-4">
              {parksideSpecs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-navy-100 pb-3 text-sm">
                  <dt className="text-navy-500">{s.label}</dt>
                  <dd className="text-right font-semibold text-navy-900">{s.value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/contact" className="btn-primary mt-7 w-full">
              Request Full Brochure
            </Link>
          </Reveal>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-navy-gradient py-16 text-white">
        <div className="container-page grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatCounter value="50" label="Acres Project Area" dark />
          <StatCounter value="270" label="Premium 4 BHK Villas" dark />
          <StatCounter value="75%" label="Open Spaces" dark />
          <StatCounter value="35" label="Acres Natural Open Space" dark />
        </div>
      </section>

      {/* MASTER PLAN */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Master Plan"
            title="A Masterplanned 50-Acre Eco-Neighbourhood"
            description="75% open spaces across the layout, anchored by a central clubhouse and multi-sport zone, with dedicated pools, courts, forests and farming beds threaded through a 60' wide landscaped road network."
            align="center"
          />
          <Reveal delay={100} className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-3xl shadow-premium">
            <Image
              src="/images/parkside/master-plan.jpg"
              alt="Anvita Parkside master plan"
              fill
              className="object-contain bg-white"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </Reveal>
        </div>
      </section>

      {/* VILLA TYPES */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Villa Typologies"
            title="4-BHK Triplex Villas — East, West & North Facing"
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {parksideVillaTypes.map((v, i) => (
              <Reveal key={v.name} delay={i * 120} className="card-premium overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={v.image} alt={v.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 400px" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-navy-900">{v.name}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-navy-600">
                    <span>Ground Floor</span><span className="text-right font-semibold text-navy-900">{v.ground} Sft.</span>
                    <span>First Floor</span><span className="text-right font-semibold text-navy-900">{v.first} Sft.</span>
                    <span>Second Floor</span><span className="text-right font-semibold text-navy-900">{v.second} Sft.</span>
                    <span className="border-t border-navy-100 pt-2 font-semibold text-navy-800">Total Area</span>
                    <span className="border-t border-navy-100 pt-2 text-right font-display text-lg text-green-700">{v.total} Sft.</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITY ZONES */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Over 35 Acres of Natural Open Space"
            title="Find Bliss in Every Corner"
            description="An array of lavish features, categorised into five zones — Greenery, Community, Health, Sports and Leisure — give something for everyone in the family."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {parksideAmenityZones.map((zone, i) => (
              <Reveal key={zone.zone} delay={i * 100} className="card-premium flex flex-col p-6">
                <span
                  className="mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
                  style={{ backgroundColor: zone.color }}
                >
                  {zone.zone}
                </span>
                <ul className="space-y-2 text-sm text-navy-600">
                  {zone.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-navy-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLUBHOUSE FACILITIES */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Resort-Like Clubhouse"
            title="From Embracing Nature to Refined Modern Lifestyle"
            description="A resort-like clubhouse spread over 2.5 acres — where life-enhancing amenities and the sights, sounds and smells of nature refresh your everyday life."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {parksideClubhouseFacilities.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="card-premium overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={f.image} alt={f.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 300px" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-navy-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Visual Tour" title="Life at Anvita Parkside" align="center" />
          <div className="mt-14">
            <GalleryLightbox images={parksideGallery} />
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow mb-3">Location</p>
            <h2 className="heading-lg">
              Medchal — A Vibrant, Green &amp; Thriving Neighbourhood
            </h2>
            <div className="divider-gold my-5" />
            <p className="body-lg">
              Discover the enchanting allure of Ravalkole, located near
              Medchal, and indulge in the exquisite &lsquo;luxury of
              nature&rsquo;. Here, pristine natural surroundings meet a
              vibrant, thriving neighbourhood — all well connected by
              exceptional infrastructure.
            </p>
            <ul className="mt-6 space-y-3">
              {parksideLocationHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-700">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green-50 text-green-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150} className="relative aspect-square overflow-hidden rounded-3xl shadow-premium">
            <Image
              src="/images/parkside/sports-aerial.jpg"
              alt="Anvita Parkside surroundings"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-20 text-center text-white">
        <div className="container-page">
          <h3 className="heading-md text-white">Reserve Your Villa at Anvita Parkside</h3>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Connect with our sales team for pricing, floor plans and a
            personal site visit to Ravalkole, Medchal.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Enquire Now
          </Link>
        </div>
      </section>
    </>
  );
}
