import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { futureVentures } from "@/lib/data";
import FutureVenturesCarousel from "@/components/FutureVentureCarousel";

export const metadata: Metadata = {
  title: "Future & Proposed Ventures",
  // Vanasthali Hills removed from copy:
  // description:
  //   "Explore Sentara Group's upcoming developments — a green high-rise residential tower in Nagole, a destination resort near Yadadri, and a premium gated plots layout.",
  description:
    "Explore Sentara Group's upcoming developments — Kakatiya by Sentara, a 150-acre hilltop resort and weekend-villa masterplan near Yadadri.",
};

const PRESENTATION_URL = "/images/downloads/Kakatiya-Weekend-Villas-Presentation.pptx";

export default function FutureVenturesPage() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(18,33,58,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,33,58,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 45% at 90% 0%, rgba(139,107,61,0.07), transparent 60%)",
        }}
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="What's Next"
          title="Future & Proposed Ventures"
          // Vanasthali Hills removed from copy:
          // description="Ambitious developments in active planning — expanding the Sentara Group footprint across residential towers, destination hospitality and premium gated communities."
          description="Ambitious developments in active planning — expanding the Sentara Group footprint across destination hospitality and premium weekend-villa communities."
          align="center"
        />

        <Reveal delay={140} className="mt-12 sm:mt-14">
          <FutureVenturesCarousel ventures={futureVentures} />
        </Reveal>

        <Reveal delay={futureVentures.length * 60 + 200}>
          <div className="card-premium mt-16 overflow-hidden p-10 text-center sm:p-14">
            <p className="eyebrow !text-[#8B6B3D]">Get In Touch</p>
            <p className="body-lg mx-auto mt-3 max-w-xl text-navy-900">
              Interested in early access or investment opportunities in
              these upcoming developments?
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="venture-cta btn-dark inline-flex min-h-11 items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2"
              >
                Register your interest
                <ArrowUpRight className="venture-cta-arrow size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}