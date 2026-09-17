"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import StatCounter from "@/components/StatCounter";

interface VentureStat {
  value: string;
  label: string;
}

interface Venture {
  title: string;
  location: string;
  image?: string;
  description: string;
  stats: VentureStat[];
  highlights: string[];
}

/**
 * Horizontal, snap-scrolling carousel showing exactly one venture card
 * at a time, at every viewport width from 360px up to 1920px — each
 * slide is always w-full, so there's no breakpoint at which more than
 * one becomes visible. Prev/next buttons, a slide counter and dot
 * navigation sit below.
 *
 * Each slide is a two-column editorial spread on md+: a full-bleed
 * concept render on the left (with a bottom gradient for legible
 * overlaid title/location) and a content panel on the right carrying
 * the description, a spec-sheet stat strip and a labelled highlights
 * list. On mobile the image sits on top and the content stacks below.
 * Ventures without an `image` (e.g. very early-stage concepts) fall
 * back to the original dark navy panel so the component still renders
 * cleanly either way.
 *
 * This is a client component specifically so it can own scroll position
 * and button state; the page that renders it (future-ventures-page.tsx)
 * stays a server component so it can keep exporting `metadata` — Next.js
 * doesn't allow a "use client" page to do that.
 */
export default function FutureVenturesCarousel({
  ventures,
}: {
  ventures: Venture[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(ventures.length > 1);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    const step = el.clientWidth;
    if (step > 0) setActiveIndex(Math.round(el.scrollLeft / step));
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ventures.length]);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const step = (direction: 1 | -1) => {
    goTo(Math.max(0, Math.min(ventures.length - 1, activeIndex + direction)));
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="
          flex snap-x snap-mandatory overflow-x-auto scroll-smooth
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {ventures.map((v, i) => (
          <div key={v.title} className="w-full flex-none snap-center px-0.5">
            {/* perspective ancestor for the card's 3D hover tilt */}
            <div style={{ perspective: "1600px" }}>
              <div className="venture-card group relative card-premium overflow-hidden">
                <span aria-hidden className="venture-border-glow pointer-events-none" />
                <span aria-hidden className="venture-sheen pointer-events-none" />

                <div className="relative grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
                  {/* ---------------- Image panel ---------------- */}
                  <div className="relative min-h-[280px] overflow-hidden bg-navy-gradient sm:min-h-[340px] md:min-h-0">
                    {v.image ? (
                      <>
                        <Image
                          src={v.image}
                          alt={v.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                          priority={i === 0}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/15 to-navy-950/10"
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-r from-navy-950/10 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-navy-950/25"
                        />
                      </>
                    ) : (
                      <div
                        aria-hidden
                        className="venture-panel-glow pointer-events-none absolute inset-0"
                      />
                    )}

                    <div className="relative flex h-full flex-col justify-end p-8 text-white sm:p-10 lg:p-12">
                      <span
                        className="venture-chip chip mb-4 inline-flex w-fit items-center gap-1.5 border-white/30 bg-white/10 text-white backdrop-blur-sm"
                        style={{ ["--v-delay" as any]: `${0.2 + i * 0.06}s` }}
                      >
                        Proposed · {v.location.split(",")[0]}
                      </span>

                      <h3 className="font-display text-2xl sm:text-3xl">
                        {v.title}
                      </h3>

                      <p className="mt-2 flex items-start gap-1.5 text-[13px] text-white/70">
                        <MapPin className="mt-0.5 size-3.5 flex-none text-[#D9B26A]" aria-hidden />
                        {v.location}
                      </p>
                    </div>
                  </div>

                  {/* ---------------- Content panel ---------------- */}
                  <div className="relative p-8 sm:p-10 lg:p-12">
                    <p className="body-lg">{v.description}</p>

                    <div className="mt-7 grid grid-cols-3 divide-x divide-navy-900/10 border-y border-navy-900/10 py-5">
                      {v.stats.map((s, si) => (
                        <div
                          key={s.label}
                          className="venture-stat px-3 text-center first:pl-0 last:pr-0"
                          style={{
                            ["--v-delay" as any]: `${0.35 + i * 0.06 + si * 0.06}s`,
                          }}
                        >
                          <StatCounter value={s.value} label={s.label} />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8B6B3D]">
                        Highlights
                      </span>
                      <span className="h-px flex-1 bg-navy-900/10" aria-hidden />
                    </div>

                    <ul className="mt-5 space-y-3">
                      {v.highlights.map((h, hi) => (
                        <li
                          key={h}
                          className="venture-row flex items-start gap-3 text-sm text-navy-700 transition-transform duration-300 group-hover:translate-x-0.5"
                          style={{
                            ["--v-delay" as any]: `${0.3 + i * 0.06 + hi * 0.07}s`,
                          }}
                        >
                          <span className="venture-row-check mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green-50 text-green-600">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M5 13l4 4L19 7"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev/next + slide counter + dots — only shown when there's more
          than one slide */}
      {ventures.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5 sm:mt-10">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Previous venture"
            className="flex size-11 flex-none items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 shadow-sm transition-all duration-300 hover:border-navy-900/0 hover:bg-navy-900 hover:text-white hover:shadow-[0_10px_24px_-12px_rgba(11,31,58,0.5)] disabled:pointer-events-none disabled:opacity-30 disabled:shadow-none"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="flex items-center gap-4">
            <span className="hidden font-display text-xs tabular-nums tracking-wide text-navy-900/50 sm:inline">
              {pad(activeIndex + 1)}
              <span className="mx-1 text-navy-900/25">/</span>
              {pad(ventures.length)}
            </span>

            <div className="flex items-center gap-2">
              {ventures.map((v, i) => (
                <button
                  key={v.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${v.title}`}
                  aria-current={i === activeIndex}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-7 bg-[#8B6B3D]"
                      : "w-1.5 bg-navy-900/20 hover:bg-navy-900/35"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Next venture"
            className="flex size-11 flex-none items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 shadow-sm transition-all duration-300 hover:border-navy-900/0 hover:bg-navy-900 hover:text-white hover:shadow-[0_10px_24px_-12px_rgba(11,31,58,0.5)] disabled:pointer-events-none disabled:opacity-30 disabled:shadow-none"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}