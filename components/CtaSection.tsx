import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-green py-8 text-white sm:py-20">
      {/* Ambient depth — soft glow + faint grid texture for a richer, less flat field of color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 70% at 85% 20%, rgba(255,255,255,0.14), transparent 60%), radial-gradient(ellipse 45% 55% at 5% 100%, rgba(11,31,58,0.18), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container-page relative">
        {/* Floating panel — gives the block structure against the textured
            field instead of the copy and button sitting directly on flat
            color, echoing the bordered panel treatment used elsewhere on
            the site */}
        <div
          className="
            relative flex flex-col items-start gap-8 rounded-[2rem] border
            border-white/15 bg-white/[0.06] p-7 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.45)]
            backdrop-blur-sm
            sm:gap-9 sm:p-10
            md:flex-row md:items-center md:justify-between md:gap-10 md:p-12
            lg:gap-14 lg:p-14
          "
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/50 sm:w-10" aria-hidden />
              <p className="text-sm font-medium text-white/80">
                Let&apos;s build what lasts
              </p>
            </div>

            <h2
              className="
                mt-4 text-balance font-display text-3xl leading-[1.15] tracking-tight
                sm:mt-5 sm:text-4xl
                lg:text-5xl
              "
            >
              Planning your next investment?
            </h2>
            <p
              className="
                mt-4 max-w-xl text-pretty text-sm leading-6 text-white/75
                sm:mt-5 sm:text-base sm:leading-7
                lg:text-[17px]
              "
            >
              Speak with our team to explore villa availability, pricing and
              site visits across our ongoing developments.
            </p>
          </div>

          <Link
            href="/contact"
            className="
              group inline-flex w-full shrink-0 items-center justify-center gap-3
              rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-navy
              shadow-lg shadow-navy/15 transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/25
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
              focus-visible:ring-offset-2 focus-visible:ring-offset-green
              sm:w-auto sm:py-2.5 sm:pl-7 sm:text-base
              md:w-auto
            "
          >
            Schedule a site visit
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors duration-300 group-hover:bg-green sm:size-10">
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}