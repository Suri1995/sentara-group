"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

const statusStyles: Record<string, string> = {
  ongoing: "bg-green-50 text-green-700",
  completed: "bg-navy-50 text-navy-700",
  future: "bg-amber-50 text-amber-700",
};

const AUTOPLAY_MS = 4500;
const MAX_VISIBLE_OFFSET = 2; // cards further than this from center aren't rendered

/** Shortest signed distance from `active` to `i` around a ring of `count` items. */
function ringOffset(i: number, active: number, count: number) {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

/**
 * The Group's built legacy, drawn from the same `projects` data used on
 * the /projects page. Presented as a fanned, carousel-driven gallery —
 * one large "hero" card centered with the rest receding on either side —
 * so the section reads as a curated showcase rather than a grid, while
 * still surfacing each project's real detail (status, stats, accolade,
 * link) as the active card changes.
 */
export default function LegacyPortfolio() {
  const count = projects.length;
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pausedRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );
  const next = useCallback(() => setActive((a) => (a + 1) % count), [count]);
  const prev = useCallback(
    () => setActive((a) => (a - 1 + count) % count),
    [count]
  );

  // Track viewport size and reduced-motion preference so the fan spacing
  // and autoplay behavior can adapt without relying on CSS alone.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSize = () => setIsMobile(mq.matches);
    const updateMotion = () => setReduceMotion(rmq.matches);
    updateSize();
    updateMotion();
    mq.addEventListener("change", updateSize);
    rmq.addEventListener("change", updateMotion);
    return () => {
      mq.removeEventListener("change", updateSize);
      rmq.removeEventListener("change", updateMotion);
    };
  }, []);

  // Autoplay, paused on hover/focus and disabled under reduced motion.
  useEffect(() => {
    if (reduceMotion || count <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, reduceMotion, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? prev() : next();
    }
    touchStartX.current = null;
  };

  const activeProject = projects[active];

  return (
    <section className="relative overflow-hidden bg-[#F5F6F8] py-16 sm:py-24">
      {/* Faint dotted backdrop, consistent with the grid textures used
          elsewhere on the site, kept very subtle behind the white panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(18,33,58,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <style>{`
        .gallery-card {
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), opacity 0.6s ease, box-shadow 0.4s ease;
        }
        .gallery-card:hover {
          box-shadow: 0 30px 60px -24px rgba(18, 33, 58, 0.35);
        }
        .gallery-arrow {
          transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
        }
        .gallery-arrow:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -12px rgba(18, 33, 58, 0.35);
        }
        .gallery-dot {
          transition: width 0.35s ease, background-color 0.35s ease;
        }
        @keyframes galleryDetailIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gallery-detail {
          animation: galleryDetailIn 0.45s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-card { transition: opacity 0.3s ease; }
          .gallery-arrow, .gallery-dot { transition: none; }
          .gallery-detail { animation: none; }
        }
      `}</style>

      <div className="container-page relative">
        <Reveal className="relative mx-auto max-w-5xl rounded-[2rem] border border-navy-900/5 bg-white px-5 py-12 shadow-[0_40px_80px_-40px_rgba(18,33,58,0.25)] sm:px-10 sm:py-16">
          {/* Header */}
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow !text-[#8B6B3D]">Our Legacy</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-[1.1] tracking-tight text-navy-900 sm:text-4xl md:text-[2.75rem]">
              Built work across
              <br />
              the portfolio
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-navy-600 sm:text-base">
              A track record spanning premium residential, healthcare and
              hospitality developments.
            </p>
            <Link
              href="/projects"
              className="btn-dark mt-7 inline-flex min-h-11 items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2"
            >
              View all projects
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>

          {/* Fanned carousel */}
          <div
            className="relative mt-14 select-none sm:mt-16"
            style={{ perspective: "1400px" }}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            onFocus={() => (pausedRef.current = true)}
            onBlur={() => (pausedRef.current = false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              if (e.key === "ArrowRight") next();
            }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            tabIndex={0}
          >
            <div className="relative mx-auto flex h-[210px] items-center justify-center sm:h-[280px] md:h-[320px]">
              {projects.map((p, i) => {
                const offset = ringOffset(i, active, count);
                const abs = Math.abs(offset);
                if (abs > MAX_VISIBLE_OFFSET) return null;

                const spacing = isMobile ? 62 : 108;
                const rotate = offset * (isMobile ? 10 : 13);
                const translateX = offset * spacing;
                const translateY = abs * (isMobile ? 10 : 16);
                const scale = offset === 0 ? 1 : 1 - abs * 0.14;
                const zIndex = 10 - abs;
                const opacity = offset === 0 ? 1 : 1 - abs * 0.28;

                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${p.name}`}
                    aria-current={offset === 0}
                    className="gallery-card absolute w-[clamp(108px,26vw,190px)] overflow-hidden rounded-2xl bg-navy-50 shadow-xl"
                    style={{
                      aspectRatio: "3 / 4",
                      transform: `translate(${translateX}%, ${translateY}%) rotate(${rotate}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 190px, 108px"
                    />
                    {offset === 0 && (
                      <span
                        className={`absolute left-2.5 top-2.5 w-fit rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[p.status]}`}
                      >
                        {p.statusLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Prev / next arrows */}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous project"
                  className="gallery-arrow absolute left-0 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-md ring-1 ring-navy-900/10 sm:size-11"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next project"
                  className="gallery-arrow absolute right-0 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-md ring-1 ring-navy-900/10 sm:size-11"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
          </div>

          {/* Active project detail — refreshes as the carousel advances */}
          <div
            key={activeProject.slug}
            className="gallery-detail mx-auto mt-10 max-w-lg text-center sm:mt-12"
          >
            <h3 className="font-display text-xl text-navy-900 sm:text-2xl">
              {activeProject.name}
            </h3>
            <p className="mt-1 text-sm text-navy-600">
              {activeProject.location}
            </p>
            <p className="mx-auto mt-3 line-clamp-2 max-w-md text-sm leading-relaxed text-navy-600">
              {activeProject.description}
            </p>

            <div className="mt-6 flex justify-center gap-6 border-t border-border pt-5 sm:gap-8">
              {activeProject.stats.map((s) => (
                <div key={s.label}>
                  <strong className="block font-display text-base text-navy-900 sm:text-lg">
                    {s.value}
                  </strong>
                  <span className="text-[10px] text-navy-600">{s.label}</span>
                </div>
              ))}
            </div>

            {activeProject.accolade && (
              <p className="mt-4 text-xs font-medium text-green-700">
                {activeProject.accolade}
              </p>
            )}

            <Link
              href={`/projects/${activeProject.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900 transition-colors duration-200 hover:text-green-700"
            >
              View project
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          {/* Dot pagination */}
          {count > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${p.name}`}
                  aria-current={i === active}
                  className={`gallery-dot h-1.5 rounded-full ${
                    i === active
                      ? "w-6 bg-navy-900"
                      : "w-1.5 bg-navy-900/20 hover:bg-navy-900/40"
                  }`}
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}