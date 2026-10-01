"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";

interface VentureStat {
  label: string;
  value: string;
}

interface Venture {
  title: string;
  location: string;
  image?: string;
  description: string;
  stats: VentureStat[];
}

const EASE = "cubic-bezier(.22,1,.36,1)";

const css = `
.fvh-spot{opacity:0;transition:opacity .5s ease;
  background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(217,178,106,.16),transparent 62%)}
.fvh-card:hover .fvh-spot{opacity:1}

/* a thin light travels across the top edge of the image on hover */
.fvh-sweep{transform:translateX(-101%);transition:transform 1.1s ${EASE}}
.fvh-card:hover .fvh-sweep{transform:translateX(101%)}

.fvh-link-line{transform:scaleX(0);transform-origin:left;transition:transform .5s ${EASE}}
.fvh-link:hover .fvh-link-line,.fvh-link:focus-visible .fvh-link-line{transform:scaleX(1)}

@media (prefers-reduced-motion:reduce){
  .fvh-sweep,.fvh-link-line{transition:none}
}
`;

function VentureCard({
  venture,
  delay,
}: {
  venture: Venture;
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isLong = venture.description.length > 140;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  // Measured height lets the description grow and shrink smoothly
  const textMaxHeight = !isLong
    ? undefined
    : expanded
      ? `${textRef.current?.scrollHeight ?? 640}px`
      : "5.25rem";

  return (
    <Reveal delay={delay} className="group relative flex h-full flex-col">
      <div
        onPointerMove={onPointerMove}
        className="fvh-card relative flex flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white p-3 shadow-[0_24px_50px_-38px_rgba(11,31,58,0.45)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-navy/20 hover:shadow-[0_44px_80px_-42px_rgba(11,31,58,0.55)]"
      >
        <span aria-hidden className="fvh-spot pointer-events-none absolute inset-0 z-20" />

        {venture.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] bg-navy-900">
            <Image
              src={venture.image}
              alt={venture.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/5 to-transparent"
            />
            <span
              aria-hidden
              className="fvh-sweep absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
            />

            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
              <MapPin className="size-3 flex-none text-[#D9B26A]" aria-hidden />
              {venture.location.split(",")[0]}
            </span>

            <span
              aria-hidden
              className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 translate-y-2"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
          {!venture.image && (
            <p className="flex items-center gap-1.5 text-[13px] tracking-wide text-muted-foreground">
              <MapPin className="size-3.5 flex-none text-[#8B6B3D]" aria-hidden />
              {venture.location}
            </p>
          )}

          <h3
            className={`max-w-[22ch] text-balance font-display text-2xl leading-[1.15] text-navy sm:text-[1.75rem] ${
              venture.image ? "mt-1" : "mt-3"
            }`}
          >
            {venture.title}
          </h3>
          {venture.image && (
            <p className="mt-1.5 text-[13px] tracking-wide text-muted-foreground">
              {venture.location}
            </p>
          )}

          <div className="mt-4 flex-1 sm:mt-5">
            <div
              className="relative overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ maxHeight: textMaxHeight }}
            >
              <p ref={textRef} className="text-[15px] leading-7 text-muted-foreground">
                {venture.description}
              </p>
              {isLong && (
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent transition-opacity duration-500 ${
                    expanded ? "opacity-0" : "opacity-100"
                  }`}
                />
              )}
            </div>

            {isLong && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3.5 py-1.5 text-[12.5px] font-medium text-navy transition-all duration-300 hover:border-green/40 hover:bg-green/5 hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50 focus-visible:ring-offset-2"
              >
                {expanded ? "Show less" : "Read full brief"}
              </button>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-2.5">
            {venture.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-navy/5 bg-sand-50 px-2.5 py-3.5 text-center transition-colors duration-300 hover:bg-green/5 sm:px-3"
              >
                <strong className="block font-display text-base tabular-nums text-navy sm:text-lg">
                  {s.value}
                </strong>
                <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function FutureVentures({ ventures }: { ventures: Venture[] }) {
  // Two ventures sit in two columns; three or more use the 3-up grid.
  const gridCols =
    ventures.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="relative overflow-hidden bg-sand-50 py-8 sm:py-20">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,31,58,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,31,58,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 85% 0%, rgba(76,175,109,0.06), transparent 65%)",
        }}
      />

      <div className="container-page relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[1.15px] w-3 bg-navy/60 sm:w-5" aria-hidden />
              <p className="text-sm font-medium !text-green">What&apos;s next</p>
            </div>
            <h2 className="heading-lg mt-3 text-balance">Future &amp; proposed ventures.</h2>
            {/* Vanasthali Hills removed from copy:
            <p className="body-lg mt-4 text-pretty sm:mt-5">
              Ambitious developments in planning, from a green high-rise
              tower to a destination resort and a premium gated plots
              community.
            </p>
            */}
            <p className="body-lg mt-4 text-pretty sm:mt-5">
              Ambitious developments in planning, from a hilltop destination
              resort to a premium community of weekend villas.
            </p>
          </div>

          <Link
            href="/future-ventures"
            className="group hidden shrink-0 items-center gap-3 rounded-full border border-navy/15 bg-white py-2 pl-5 pr-2 text-sm font-medium text-navy transition-all duration-300 hover:border-navy/25 hover:shadow-[0_10px_28px_-14px_rgba(11,31,58,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 sm:inline-flex"
          >
            Explore all ventures
            <span className="flex size-8 items-center justify-center rounded-full bg-navy text-white transition-colors duration-300 group-hover:bg-green">
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </div>

        <div className={`mt-12 grid items-stretch gap-6 sm:mt-14 lg:gap-8 ${gridCols}`}>
          {ventures.map((venture, i) => (
            <VentureCard key={venture.title} venture={venture} delay={i * 80} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/future-ventures" className="btn-dark group inline-flex items-center gap-2.5">
            Explore all ventures
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}