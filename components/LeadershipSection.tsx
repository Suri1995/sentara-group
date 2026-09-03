import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

interface Chairman {
  name: string;
  title: string;
  photo: string;
  overview: string[];
}

export default function LeadershipSection({
  chairman,
}: {
  chairman: Chairman;
}) {
  return (
    <section className="bg-navy py-24 text-white sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem]">
          <Image
            src={chairman.photo}
            alt={chairman.name}
            fill
            className="object-cover image-lift"
            sizes="420px"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="eyebrow !text-green-300">Leadership</p>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">
            A steady hand for ambitious growth.
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
            {chairman.overview[0]}
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
            {chairman.name}
            <br />
            <span className="font-normal">{chairman.title}</span>
          </p>
          <Link href="/about" className="btn-outline mt-9">
            Read full profile →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}