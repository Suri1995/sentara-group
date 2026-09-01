import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { heroStats, projects, chairman, futureVentures, brand } from "@/lib/data";

const heroSlides = [
  {
    image: "/images/parkside/street-view.jpg",
    subcaption: "Anvita Parkside · Ravalkole, Medchal",
    caption: "270 Premium 4 BHK Villas on 50 Acres of Green Living",
  },
  {
    image: "/images/parkside/clubhouse-approach.jpg",
    subcaption: "Resort-Style Clubhouse",
    caption: "Over 75 Amenities Across Five Lifestyle Zones",
  },
  {
    image: "/images/landspace/landspace-elite-building.jpg",
    subcaption: "Landspace Elite · Medipally",
    caption: "Deluxe 3 BHK Residences with Open Natural Ventilation",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20">
        <Carousel slides={heroSlides} aspect="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]" rounded="rounded-none" />
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="container-page">
            <div className="max-w-2xl pt-20">
              <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                {brand.tagline}
              </p>
              <h1 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Building Hyderabad&rsquo;s Skyline with Integrity, Precision &amp; Vision
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
                A professionally managed group delivering premium residential,
                healthcare and hospitality developments across Hyderabad&rsquo;s
                high-growth corridors.
              </p>
              <div className="pointer-events-auto mt-9 flex flex-wrap gap-4">
                <Link href="/projects" className="btn-primary">
                  View Our Projects
                </Link>
                <Link href="/about" className="btn-outline">
                  About Sentara Group
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-navy-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {heroStats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      {/* CORPORATE OVERVIEW */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium">
            <Image
              src="/images/parkside/community-garden-aerial.jpg"
              alt="Sentara Group masterplanned community"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Corporate Overview"
              title="A Legacy Built on Trust, Discipline & Vision"
              description="A distinguished and professionally managed company, established with a visionary commitment to delivering unparalleled civil engineering projects in and around Hyderabad, under the leadership of a seasoned team with a collective experience of 25 years."
            />
            <Reveal delay={100} className="mt-6 space-y-4">
              <p className="body-lg">
                Having successfully executed projects totaling over 8,50,000
                sq. ft. across residences, apartments, commercial buildings,
                hotels, hospitals and open plot layouts, our ongoing portfolio
                of 11,24,000+ sq. ft. represents the next phase of the
                Group&rsquo;s growth — each project executed with a focus on
                structural quality, compliance and timely delivery.
              </p>
              <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                {["Indian Building Congress Compliant", "Quality Construction", "On-Time Delivery"].map(
                  (item) => (
                    <li
                      key={item}
                      className="chip justify-center text-center"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Link href="/about" className="btn-dark mt-4 inline-flex">
                Meet Our Chairman
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Portfolio"
            title="Projects That Define Our Legacy"
            description="From ultra-luxury villa communities to deluxe apartments and essential healthcare infrastructure — every Sentara Group project is built on quality, compliance and timely delivery."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAIRMAN TEASER */}
      <section className="bg-navy-gradient py-20 text-white sm:py-28">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow !text-green-300 mb-3">Leadership</p>
            <h2 className="heading-lg text-white">{chairman.name}</h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-white/60">
              {chairman.title}
            </p>
            <div className="divider-gold my-6" />
            <p className="body-lg text-white/75">{chairman.overview[0]}</p>
            <Link href="/about" className="btn-outline mt-8 inline-flex">
              Read Full Profile
            </Link>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-premium">
            <Image
              src={chairman.photo}
              alt={chairman.name}
              fill
              className="object-cover"
              sizes="400px"
            />
          </Reveal>
        </div>
      </section>

      {/* FUTURE VENTURES TEASER */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's Next"
            title="Future & Proposed Ventures"
            description="Ambitious developments in planning — from a green high-rise tower to a destination resort and a premium gated plots community."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {futureVentures.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 120}
                className="card-premium flex flex-col p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
                  {v.location}
                </p>
                <h3 className="mt-2 font-display text-xl text-navy-900">{v.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
                  {v.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-navy-100 pt-4">
                  {v.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-lg text-navy-900">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-wide text-navy-500">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/future-ventures" className="btn-dark">
              Explore All Ventures
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand-100 py-20">
        <div className="container-page flex flex-col items-center justify-between gap-8 rounded-3xl bg-white p-10 shadow-card sm:flex-row sm:p-14">
          <div className="text-center sm:text-left">
            <h3 className="heading-md">Planning your next investment?</h3>
            <p className="mt-3 max-w-lg body-lg">
              Speak with our team to explore villa availability, pricing and
              site visits across our ongoing developments.
            </p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap">
            Schedule a Site Visit
          </Link>
        </div>
      </section>
    </>
  );
}
