import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="bg-green py-20 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="eyebrow !text-white/70">Let&apos;s build what lasts</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            Planning your next investment?
          </h2>
          <p className="mt-4 max-w-xl text-white/75">
            Speak with our team to explore villa availability, pricing and
            site visits across our ongoing developments.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-transform hover:-translate-y-1"
        >
          Schedule a site visit →
        </Link>
      </div>
    </section>
  );
}