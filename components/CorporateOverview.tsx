import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";

const trustPoints = ["IBC compliant", "Quality construction", "On-time delivery"];

export default function CorporateOverview() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Faint brand-colored texture behind the whole section — reuses the
          existing .luxury-gradient utility, so this adds no new CSS/JS. */}
      <div aria-hidden className="luxury-gradient pointer-events-none absolute inset-0" />

      <div className="container-page relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        {/* Image column gets extra bottom room (pb-12) to make space for
            the floating stat card without it colliding with content below */}
        <Reveal className="relative pb-12 sm:pb-14">
          {/* Offset backdrop frame — a quiet layer of depth behind the
              photo instead of the image sitting flat on the page */}
          <div
            aria-hidden
            className="absolute -inset-3 -z-10 rounded-[2.25rem] border border-navy-100 bg-white/50"
          />

          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] shadow-premium ring-1 ring-navy-900/[0.06]">
            <Image
              src="/images/parkside/community-garden-aerial.jpg"
              alt="Sentara Group masterplanned community"
              fill
              className="object-cover image-lift"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            {/* Soft cinematic toning so the badge and card both sit on
                consistent, legible ground regardless of the photo underneath */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-navy-950/0 to-transparent"
            />
            <div className="absolute bottom-5 left-5 rounded-xl bg-navy/85 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white backdrop-blur">
              Built for long-term value
            </div>
          </div>

          {/* Floating stat card — the editorial overlap that gives this
              composition depth instead of a flat photo + text split */}
          <div className="absolute bottom-0 right-6 flex items-center gap-4 rounded-2xl border border-navy-100 bg-white px-5 py-4 shadow-premium sm:right-10">
            <span className="font-display text-3xl leading-none text-navy-900">
              25+
            </span>
            <span className="max-w-[7rem] text-[11px] font-semibold uppercase leading-snug tracking-widest text-navy-500">
              Years combined leadership
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="eyebrow ">Corporate overview</p>
          <span aria-hidden className="divider-gold mt-2 block" />
          <h2 className="heading-lg font-semibold mt-6 max-w-xl">
            A legacy built on trust, discipline &amp; vision.
          </h2>
          <p className="body-lg mt-7">
            A distinguished and professionally managed company, established
            with a visionary commitment to delivering unparalleled civil
            engineering projects in and around Hyderabad, under the
            leadership of a seasoned team with a collective experience of 25
            years.
          </p>
          <p className="body-lg mt-5">
            Having successfully executed projects totaling over 8,50,000 sq.
            ft., our ongoing portfolio of 11,24,000+ sq. ft. represents the
            next phase of the Group&apos;s growth — each project executed
            with a focus on structural quality, compliance and timely
            delivery.
          </p>

          {/* Trust points upgraded from plain-text chips to icon-led pills
              on a raised white surface, reading more like credentials than
              tags */}
          <ul className="mt-8 flex flex-wrap gap-3">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-navy-700 shadow-sm"
              >
                <CheckCircle2 className="size-3.5 text-green-600" aria-hidden />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/about" className="btn-dark">
              Meet our chairman
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-700 transition-colors duration-300 hover:text-navy-900"
            >
              View our track record
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}