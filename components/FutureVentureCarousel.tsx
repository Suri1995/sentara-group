"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StatCounter from "@/components/StatCounter";

interface VentureStat {
  value: string;
  label: string;
}

interface Venture {
  title: string;
  location: string;
  description: string;
  stats: VentureStat[];
  highlights: string[];
}

/**
 * Horizontal, snap-scrolling carousel showing exactly one venture card
 * at a time, at every viewport width from 360px up to 1920px — each
 * slide is always w-full, so there's no breakpoint at which more than
 * one becomes visible. Prev/next buttons and dot navigation sit below.
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

                <div className="relative grid grid-cols-1">
                  <div className="relative flex flex-col justify-center overflow-hidden bg-navy-gradient p-8 text-white sm:p-10 lg:p-14">
                    <div
                      aria-hidden
                      className="venture-panel-glow pointer-events-none absolute inset-0"
                    />

                    <div className="relative">
                      <span
                        className="venture-chip chip mb-4 w-fit border-white/30 bg-white/10 text-white"
                        style={{ ["--v-delay" as any]: `${0.2 + i * 0.06}s` }}
                      >
                        Proposed · {v.location}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl">
                        {v.title}
                      </h3>
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        {v.stats.map((s, si) => (
                          <div
                            key={s.label}
                            className="venture-stat"
                            style={{
                              ["--v-delay" as any]: `${0.35 + i * 0.06 + si * 0.06}s`,
                            }}
                          >
                            <StatCounter value={s.value} label={s.label} dark />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 sm:p-10 lg:p-14">
                    <p className="body-lg">{v.description}</p>
                    <ul className="mt-6 space-y-3">
                      {v.highlights.map((h, hi) => (
                        <li
                          key={h}
                          className="venture-row flex items-start gap-3 text-sm text-navy-700"
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

      {/* Prev/next + dots — only shown when there's more than one slide */}
      {ventures.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5 sm:mt-10">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Previous venture"
            className="flex size-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-all duration-300 hover:border-navy-900/30 hover:bg-navy-900/5 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="flex items-center gap-2">
            {ventures.map((v, i) => (
              <button
                key={v.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${v.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-[#8B6B3D]"
                    : "w-1.5 bg-navy-900/20 hover:bg-navy-900/35"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Next venture"
            className="flex size-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-all duration-300 hover:border-navy-900/30 hover:bg-navy-900/5 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}