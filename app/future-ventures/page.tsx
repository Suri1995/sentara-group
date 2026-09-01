import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { futureVentures } from "@/lib/data";

export const metadata: Metadata = {
  title: "Future & Proposed Ventures",
  description:
    "Explore Sentara Group's upcoming developments — a green high-rise residential tower in Nagole, a destination resort near Yadadri, and a premium gated plots layout.",
};

export default function FutureVenturesPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="What's Next"
          title="Future & Proposed Ventures"
          description="Ambitious developments in active planning — expanding the Sentara Group footprint across residential towers, destination hospitality and premium gated communities."
          align="center"
        />

        <div className="mt-16 space-y-16">
          {futureVentures.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="card-premium overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
                  <div className="flex flex-col justify-center bg-navy-gradient p-10 text-white sm:p-14">
                    <span className="chip mb-4 w-fit border-white/30 bg-white/10 text-white">
                      Proposed · {v.location}
                    </span>
                    <h3 className="font-display text-3xl">{v.title}</h3>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {v.stats.map((s) => (
                        <div key={s.label}>
                          <p className="font-display text-xl sm:text-2xl">{s.value}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-wide text-white/60">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-10 sm:p-14">
                    <p className="body-lg">{v.description}</p>
                    <ul className="mt-6 space-y-3">
                      {v.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-navy-700">
                          <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green-50 text-green-600">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="body-lg mx-auto max-w-xl">
            Interested in early access or investment opportunities in these
            upcoming developments?
          </p>
          <Link href="/contact" className="btn-dark mt-6 inline-flex">
            Register Your Interest
          </Link>
        </div>
      </div>
    </section>
  );
}
