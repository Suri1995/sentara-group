import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import StatCounter from "@/components/StatCounter";
import Reveal from "@/components/Reveal";
import { heroStats, projects, chairman, futureVentures, brand } from "@/lib/data";

const heroSlides = [
  { image: "/images/parkside/street-view.jpg", subcaption: "Anvita Parkside · Ravalkole, Medchal", caption: "270 premium 4 BHK villas on 50 acres of green living" },
  { image: "/images/parkside/clubhouse-approach.jpg", subcaption: "Resort-style clubhouse", caption: "Over 75 amenities across five lifestyle zones" },
  { image: "/images/landspace/landspace-elite-building.jpg", subcaption: "Landspace Elite · Medipally", caption: "Deluxe 3 BHK residences with open natural ventilation" },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[min(820px,100vh)] bg-navy pt-20 text-white">
        <div className="absolute inset-0 opacity-20 editorial-grid" />
        <div className="container-page relative grid min-h-[min(740px,calc(100vh-80px))] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <Reveal className="relative z-10 max-w-xl">
            <p className="eyebrow !text-green-300">{brand.tagline}</p>
            <h1 className="mt-6 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">Building Hyderabad&apos;s skyline with integrity, precision &amp; vision.</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/70 sm:text-lg">A professionally managed group delivering premium residential, healthcare and hospitality developments across Hyderabad&apos;s high-growth corridors.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/projects" className="btn-primary">Explore our work →</Link><Link href="/contact" className="btn-outline">Start a conversation</Link></div>
            <div className="mt-14 flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.22em] text-white/45"><span>Hyderabad · Telangana · India</span><a href="#portfolio" className="group flex items-center gap-3 text-white/60 transition hover:text-white"><span className="h-8 w-px bg-green" /><span>Scroll to discover</span><span className="transition-transform group-hover:translate-y-1">↓</span></a></div>
          </Reveal>
          <Reveal delay={150} className="relative lg:-mr-24">
            <div className="absolute -left-4 -top-4 z-10 rounded-full border border-white/20 bg-navy/70 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-green-200 backdrop-blur">25+ years of leadership</div>
            <Carousel slides={heroSlides} aspect="aspect-[4/5] sm:aspect-[16/10]" rounded="rounded-[2rem]" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-background"><div className="container-page grid grid-cols-2 divide-x divide-border py-8 sm:grid-cols-4">{heroStats.map((s) => <StatCounter key={s.label} value={s.value} label={s.label} />)}</div></section>

      <section className="py-24 sm:py-32"><div className="container-page grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-muted"><Image src="/images/parkside/community-garden-aerial.jpg" alt="Sentara Group masterplanned community" fill className="object-cover image-lift" sizes="(max-width: 1024px) 100vw, 55vw" /><div className="absolute bottom-5 left-5 rounded-xl bg-navy/85 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white backdrop-blur">Built for long-term value</div></Reveal>
        <Reveal delay={100}><p className="eyebrow">Corporate overview</p><h2 className="heading-xl mt-5 max-w-xl">A legacy built on trust, discipline &amp; vision.</h2><p className="body-lg mt-7">A distinguished and professionally managed company, established with a visionary commitment to delivering unparalleled civil engineering projects in and around Hyderabad, under the leadership of a seasoned team with a collective experience of 25 years.</p><p className="body-lg mt-5">Having successfully executed projects totaling over 8,50,000 sq. ft., our ongoing portfolio of 11,24,000+ sq. ft. represents the next phase of the Group&apos;s growth — each project executed with a focus on structural quality, compliance and timely delivery.</p><div className="mt-8 flex flex-wrap gap-3"><span className="chip">IBC compliant</span><span className="chip">Quality construction</span><span className="chip">On-time delivery</span></div><Link href="/about" className="btn-dark mt-9">Meet our chairman →</Link></Reveal>
      </div></section>

      <section className="bg-muted py-24 sm:py-32"><div className="container-page"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Our portfolio</p><h2 className="heading-xl mt-4 max-w-2xl">Projects that define our legacy.</h2></div><Link href="/projects" className="btn-dark">View all projects →</Link></div><div className="mt-12 grid gap-5 lg:grid-cols-12">{projects.map((p, i) => <Reveal key={p.slug} delay={i * 100} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}><Link href={`/projects/${p.slug}`} className="group relative block min-h-[390px] overflow-hidden rounded-[1.75rem] bg-navy"><Image src={p.image} alt={p.name} fill className="object-cover opacity-85 image-lift" sizes="(max-width: 1024px) 100vw, 60vw" /><div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"><div className="flex items-center justify-between gap-4"><span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur">{p.statusLabel}</span><span aria-hidden="true">↗</span></div><h3 className="mt-5 font-display text-3xl sm:text-4xl">{p.name}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/70">{p.description}</p><div className="mt-6 flex flex-wrap gap-6 border-t border-white/20 pt-4">{p.stats.map((s) => <div key={s.label}><strong className="font-display text-xl">{s.value}</strong><span className="ml-2 text-[10px] uppercase tracking-widest text-white/55">{s.label}</span></div>)}</div></div></Link></Reveal>)}</div></div></section>

      <section className="bg-navy py-24 text-white sm:py-32"><div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><Reveal className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem]"><Image src={chairman.photo} alt={chairman.name} fill className="object-cover image-lift" sizes="420px" /></Reveal><Reveal delay={100}><p className="eyebrow !text-green-300">Leadership</p><h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">A steady hand for ambitious growth.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">{chairman.overview[0]}</p><p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">{chairman.name}<br /><span className="font-normal">{chairman.title}</span></p><Link href="/about" className="btn-outline mt-9">Read full profile →</Link></Reveal></div></section>

      <section className="py-24 sm:py-32"><div className="container-page"><div className="text-center"><p className="eyebrow">What&apos;s next</p><h2 className="heading-xl mt-4">Future &amp; proposed ventures.</h2><p className="body-lg mx-auto mt-5 max-w-2xl">Ambitious developments in planning — from a green high-rise tower to a destination resort and a premium gated plots community.</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{futureVentures.map((v, i) => <Reveal key={v.title} delay={i * 100} className="card-premium group flex flex-col p-7"><p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">{v.location}</p><h3 className="mt-3 font-display text-2xl text-navy">{v.title}</h3><p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{v.description}</p><div className="mt-7 flex flex-wrap gap-5 border-t border-border pt-5">{v.stats.map((s) => <div key={s.label}><strong className="block font-display text-xl text-navy">{s.value}</strong><span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span></div>)}</div></Reveal>)}</div><div className="mt-10 text-center"><Link href="/future-ventures" className="btn-dark">Explore all ventures →</Link></div></div></section>

      <section className="bg-green py-20 text-white"><div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow !text-white/70">Let&apos;s build what lasts</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">Planning your next investment?</h2><p className="mt-4 max-w-xl text-white/75">Speak with our team to explore villa availability, pricing and site visits across our ongoing developments.</p></div><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-transform hover:-translate-y-1">Schedule a site visit →</Link></div></section>
    </div>
  );
}
