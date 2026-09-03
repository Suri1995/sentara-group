import Link from "next/link";
import Reveal from "@/components/Reveal";

interface VentureStat {
  label: string;
  value: string;
}

interface Venture {
  title: string;
  location: string;
  description: string;
  stats: VentureStat[];
}

function VentureCard({ venture, delay }: { venture: Venture; delay: number }) {
  return (
    <Reveal delay={delay} className="card-premium group flex flex-col p-7">
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-green">
        {venture.location}
      </p>
      <h3 className="mt-3 font-display text-2xl text-navy">
        {venture.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">
        {venture.description}
      </p>
      <div className="mt-7 flex flex-wrap gap-5 border-t border-border pt-5">
        {venture.stats.map((s) => (
          <div key={s.label}>
            <strong className="block font-display text-xl text-navy">
              {s.value}
            </strong>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export default function FutureVentures({
  ventures,
}: {
  ventures: Venture[];
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <div className="text-center">
          <p className="eyebrow">What&apos;s next</p>
          <h2 className="heading-xl mt-4">Future &amp; proposed ventures.</h2>
          <p className="body-lg mx-auto mt-5 max-w-2xl">
            Ambitious developments in planning — from a green high-rise tower
            to a destination resort and a premium gated plots community.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {ventures.map((venture, i) => (
            <VentureCard key={venture.title} venture={venture} delay={i * 100} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/future-ventures" className="btn-dark">
            Explore all ventures →
          </Link>
        </div>
      </div>
    </section>
  );
}