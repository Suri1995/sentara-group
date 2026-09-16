import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const credentials = [
  { label: "IBC compliant" },
  { label: "Quality construction" },
  { label: "On-time delivery" },
];

export default function CorporateOverview() {
  return (
    <section className="relative overflow-hidden bg-sand-50 py-8 sm:py-20">
      <div className="container-page relative">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
          {/* ---------------------------------------------------------
              Image column — a plan-sheet figure: quiet blueprint grid
              behind it, a fine keyline frame, and a drafting-style
              annotation tag that sits on the border rather than
              floating over it.
              --------------------------------------------------------- */}
          <Reveal className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 hidden rounded-[1.5rem] opacity-[0.06] sm:block"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(11,36,82,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(11,36,82,0.4) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] shadow-premium ring-1 ring-navy-900/[0.08] sm:min-h-[400px] lg:min-h-[460px]">
              <Image
                src="/images/parkside/community-garden-aerial.jpg"
                alt="Sentara Group masterplanned community"
                fill
                className="object-cover image-lift"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority={false}
              />
              {/* soft inset vignette so the frame reads intentional, not cropped */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]"
              />
            </div>

            {/* Location tag — overlaps the frame on larger screens like a
                plan annotation; becomes a plain caption row on mobile
                so nothing clips or overlaps the image edge. */}
            <div className="mt-4 flex items-center gap-3 text-xs text-navy-600 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 sm:rounded-md sm:border sm:border-navy-200 sm:bg-sand-50 sm:py-2 sm:pl-3 sm:pr-4 sm:shadow-soft">
              <span className="font-medium text-navy-800">Parkside masterplan</span>
              <span className="h-3.5 w-px bg-navy-200" aria-hidden />
              <span>Hyderabad</span>
            </div>

            {/* Experience stat — its own quiet line, kept separate from
                the location tag rather than crowding one badge with
                two different kinds of information. */}
            <div className="mt-8 flex items-baseline gap-3 sm:mt-10">
              <span className="font-serif text-4xl font-semibold text-navy-900 sm:text-5xl">
                25
              </span>
              <span className="max-w-[9rem] text-sm leading-snug text-navy-500">
                years of combined leadership experience
              </span>
            </div>
          </Reveal>

          {/* ---------------------------------------------------------
              Content column
              --------------------------------------------------------- */}
          <Reveal delay={100} className="lg:pt-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-600" aria-hidden />
              <span className="text-sm font-medium text-navy-500">
                Corporate overview
              </span>
            </div>

            <h2 className="heading-lg mt-5 max-w-xl font-semibold text-navy-900">
              A legacy built on trust, discipline and vision.
            </h2>

            <p className="body-lg mt-7 max-w-lg">
              A distinguished and professionally managed company, established
              with a visionary commitment to delivering unparalleled civil
              engineering projects in and around Hyderabad, under the
              leadership of a seasoned team with a collective experience of
              25 years.
            </p>
            <p className="body-lg mt-5 max-w-lg">
              Having successfully executed projects totaling over 8,50,000
              sq. ft., our ongoing portfolio of 11,24,000+ sq. ft. represents
              the next phase of the Group&apos;s growth — each project
              executed with a focus on structural quality, compliance and
              timely delivery.
            </p>

            {/* Credentials — hairline-divided line, numerals implied by
                order rather than decorated with pills or icons */}
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-navy-100 pt-5">
              {credentials.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
                  <span className="text-sm font-medium text-navy-700">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
              <Link
                href="/about"
                className="btn-dark inline-flex items-center justify-center gap-2"
              >
                Meet our chairman
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 text-sm font-semibold text-navy-700 transition-colors duration-300 hover:text-navy-900"
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
      </div>
    </section>
  );
}