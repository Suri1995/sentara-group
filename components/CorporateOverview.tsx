import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CorporateOverview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-muted">
          <Image
            src="/images/parkside/community-garden-aerial.jpg"
            alt="Sentara Group masterplanned community"
            fill
            className="object-cover image-lift"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute bottom-5 left-5 rounded-xl bg-navy/85 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white backdrop-blur">
            Built for long-term value
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="eyebrow">Corporate overview</p>
          <h2 className="heading-xl mt-5 max-w-xl">
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
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="chip">IBC compliant</span>
            <span className="chip">Quality construction</span>
            <span className="chip">On-time delivery</span>
          </div>
          <Link href="/about" className="btn-dark mt-9">
            Meet our chairman →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}