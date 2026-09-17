"use client";

import { useState } from "react";
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

function VentureCard({
  venture,
  index,
  delay,
}: {
  venture: Venture;
  index: number;
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const order = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      delay={delay}
      className="group relative flex h-full flex-col self-start bg-sand-50 transition-transform duration-500 ease-out will-change-transform hover:-translate-y-[3px]"
    >
      {/* Drafting-pen corners — short brackets that extend along both
          edges on hover, as if the plan is being outlined. A single
          orchestrated hover moment rather than a stock shadow-lift. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 border-l border-t border-white/40 transition-all duration-500 ease-out group-hover:h-8 group-hover:w-8 group-hover:border-green sm:h-5 sm:w-5 sm:group-hover:h-9 sm:group-hover:w-9"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-navy/20 transition-all duration-500 ease-out group-hover:h-8 group-hover:w-8 group-hover:border-green sm:h-5 sm:w-5 sm:group-hover:h-9 sm:group-hover:w-9"
      />

      <div className="flex flex-1 flex-col border border-navy/10 transition-colors duration-500 group-hover:border-navy/20">
        {/* Image strip — concept render with a bottom gradient so the
            order badge and location chip stay legible over any photo */}
        {venture.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900">
            <Image
              src={venture.image}
              alt={venture.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/5 to-transparent"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <MapPin className="size-3 flex-none text-[#D9B26A]" aria-hidden />
              {venture.location.split(",")[0]}
            </span>
            <span
              aria-hidden
              className="absolute bottom-3 right-4 font-display text-xs tabular-nums text-white/70"
            >
              {order}
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
          {!venture.image && (
            <div className="flex items-start justify-between gap-4">
              <p className="flex items-center gap-1.5 text-[13px] tracking-wide text-muted-foreground">
                <MapPin className="size-3.5 flex-none text-[#8B6B3D]" aria-hidden />
                {venture.location}
              </p>
              <span
                aria-hidden
                className="font-display text-xs tabular-nums text-navy/25 transition-colors duration-500 group-hover:text-green/70"
              >
                {order}
              </span>
            </div>
          )}

          <h3
            className={`max-w-[22ch] text-balance font-display text-2xl leading-[1.15] text-navy sm:text-[1.75rem] ${
              venture.image ? "" : "mt-3"
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
            <p
              className={`text-[15px] leading-7 text-muted-foreground ${
                expanded ? "" : "line-clamp-3"
              }`}
            >
              {venture.description}
            </p>

            {venture.description.length > 140 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3.5 py-1.5 text-[12.5px] font-medium text-navy transition-all duration-300 hover:border-green/40 hover:bg-green/5 hover:text-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50"
              >
                {expanded ? "Show less" : "Read full brief"}
              </button>
            )}
          </div>

          {/* Stats rendered as a spec-sheet strip — hairline dividers instead
              of wrapped chips, with tabular figures for a drafted, precise feel */}
          <div className="mt-7 flex divide-x divide-navy/10 border-t border-navy/10 pt-5 sm:mt-8">
            {venture.stats.map((s) => (
              <div key={s.label} className="flex-1 px-4 first:pl-0 last:pr-0">
                <strong className="block font-display text-lg tabular-nums text-navy sm:text-xl">
                  {s.value}
                </strong>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
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

export default function FutureVentures({
  ventures,
}: {
  ventures: Venture[];
}) {
  return (
    <section className="relative overflow-hidden bg-sand-50 py-8 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,31,58,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,31,58,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Soft directional light easing the flat grid — kept faint so the
          hairline layout stays the dominant texture */}
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
            <h2 className="heading-lg mt-3 text-balance">
              Future &amp; proposed ventures.
            </h2>
            <p className="body-lg mt-4 text-pretty sm:mt-5">
              Ambitious developments in planning, from a green high-rise
              tower to a destination resort and a premium gated plots
              community.
            </p>
          </div>

          <Link
            href="/future-ventures"
            className="group hidden shrink-0 items-center gap-3 rounded-full border border-navy/15 bg-white py-2 pl-5 pr-2 text-sm font-medium text-navy transition-all duration-300 hover:border-navy/25 hover:shadow-[0_10px_28px_-14px_rgba(11,31,58,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 sm:inline-flex"
          >
            Explore all ventures
            <span className="flex size-8 items-center justify-center rounded-full bg-navy text-white transition-colors duration-300 group-hover:bg-green">
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </div>

        <div className="mt-12 grid items-stretch gap-px overflow-hidden bg-navy/10 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {ventures.map((venture, i) => (
            <VentureCard
              key={venture.title}
              venture={venture}
              index={i}
              delay={i * 80}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/future-ventures"
            className="btn-dark group inline-flex items-center gap-2.5"
          >
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