"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
} from "lucide-react";
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
  /** Optional path to a downloadable file, e.g. "/downloads/deck.pptx" */
  brochure?: string;
}

const AUTOPLAY_MS = 8000;
const EASE = "cubic-bezier(.22,1,.36,1)";

/**
 * Motion layer — plain CSS, no extra dependencies, all rules `fv-` prefixed.
 *
 * The one orchestrated moment: when a slide becomes active the image
 * settles from a slow zoom, the glass title card rises, and the content
 * cascades in. Tilt, spotlight, parallax and the autoplay fill respond to
 * the person's input or mark time. Everything is off under reduced-motion.
 */
const css = `
.fv-slide .fv-item{opacity:0;transform:translateY(24px);filter:blur(6px);
  transition:opacity .9s ${EASE} var(--d,0s),transform .9s ${EASE} var(--d,0s),filter .9s ${EASE} var(--d,0s)}
.fv-slide[data-active="true"] .fv-item{opacity:1;transform:none;filter:none}

.fv-slide .fv-img{transform:scale(1.14);transition:transform 2.4s ${EASE}}
.fv-slide[data-active="true"] .fv-img{transform:scale(1)}
.fv-slide[data-active="true"] .fv-card:hover .fv-img{transform:scale(1.04);transition-duration:1.4s}

.fv-slide .fv-tick{stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .7s ${EASE} var(--d,0s)}
.fv-slide[data-active="true"] .fv-tick{stroke-dashoffset:0}

.fv-card{transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transition:transform .6s ${EASE},box-shadow .6s ${EASE};transform-style:preserve-3d}
.fv-card:hover{box-shadow:0 50px 90px -45px rgba(11,31,58,.5)}
.fv-spot{opacity:0;transition:opacity .5s ease;
  background:radial-gradient(560px circle at var(--mx,50%) var(--my,50%),rgba(217,178,106,.14),transparent 60%)}
.fv-card:hover .fv-spot{opacity:1}

.fv-cta .fv-sheen{transform:translateX(-120%) skewX(-18deg);transition:transform .9s ${EASE}}
.fv-cta:hover .fv-sheen,.fv-cta:focus-visible .fv-sheen{transform:translateX(220%) skewX(-18deg)}

.fv-fill{transform-origin:left;animation:fv-fill ${AUTOPLAY_MS}ms linear forwards}
@keyframes fv-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.fv-pulse{animation:fv-pulse 2.4s ease-out infinite}
@keyframes fv-pulse{0%{box-shadow:0 0 0 0 rgba(217,178,106,.7)}100%{box-shadow:0 0 0 10px rgba(217,178,106,0)}}

@media (prefers-reduced-motion:reduce){
  .fv-slide .fv-item,.fv-slide .fv-img,.fv-slide .fv-tick{
    opacity:1;transform:none;filter:none;stroke-dashoffset:0;transition:none}
  .fv-card{transform:none!important}
  .fv-fill,.fv-pulse{animation:none}
  .fv-fill{transform:scaleX(1)}
  .fv-cta .fv-sheen{transition:none}
}
`;

export default function FutureVenturesCarousel({
  ventures,
}: {
  ventures: Venture[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = ventures.length;

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const w = el.clientWidth;
    setActiveIndex(Math.round(el.scrollLeft / w));
    // Image drifts slower than the slide — a subtle depth cue while swiping
    parallaxRefs.current.forEach((node, i) => {
      if (node) node.style.transform = `translate3d(${(el.scrollLeft - i * w) * 0.06}px,0,0)`;
    });
  };

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = (index + count) % count;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.setProperty("--ry", `${(x - 0.5) * 3}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 2}deg`);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
    if (e.key === "ArrowLeft") goTo(activeIndex - 1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Future ventures"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B3D]/50 focus-visible:ring-offset-4"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ventures.map((v, i) => {
          const active = i === activeIndex;
          return (
            <div
              key={v.title}
              data-active={active}
              aria-hidden={!active}
              className="fv-slide w-full flex-none snap-center px-1 py-8"
            >
              <div style={{ perspective: "1800px" }}>
                <div
                  onPointerMove={onPointerMove}
                  onPointerLeave={onPointerLeave}
                  className="fv-card group relative overflow-hidden rounded-[2rem] border border-navy-900/10 bg-white p-3 shadow-[0_30px_70px_-45px_rgba(11,31,58,0.45)] sm:p-4"
                >
                  <span aria-hidden className="fv-spot pointer-events-none absolute inset-0 z-20" />

                  <div className="relative grid grid-cols-1 gap-3 md:grid-cols-[1.08fr_1fr] md:gap-5">
                    {/* ---------- Framed image ---------- */}
                    <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] bg-navy-900 sm:min-h-[440px] md:min-h-[620px]">
                      {v.image && (
                        <div
                          ref={(n) => {
                            parallaxRefs.current[i] = n;
                          }}
                          className="absolute inset-y-0 -inset-x-[12%] will-change-transform"
                        >
                          <Image
                            src={v.image}
                            alt={v.title}
                            fill
                            sizes="(min-width: 768px) 55vw, 100vw"
                            className="fv-img object-cover"
                            priority={i === 0}
                          />
                        </div>
                      )}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/20"
                      />

                      <span
                        className="fv-item absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md"
                        style={{ ["--d" as any]: "0.15s" }}
                      >
                        <span className="fv-pulse size-1.5 rounded-full bg-[#D9B26A]" aria-hidden />
                        Proposed development
                      </span>

                      {/* glass title card */}
                      <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-5 sm:bottom-5">
                        <div
                          className="fv-item rounded-2xl border border-white/20 bg-navy-950/35 p-5 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6"
                          style={{ ["--d" as any]: "0.3s" }}
                        >
                          <h3 className="max-w-[20ch] text-balance font-display text-2xl leading-[1.12] sm:text-3xl">
                            {v.title}
                          </h3>
                          <p className="mt-2.5 flex items-start gap-1.5 text-[13px] text-white/80">
                            <MapPin className="mt-0.5 size-3.5 flex-none text-[#D9B26A]" aria-hidden />
                            {v.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ---------- Content ---------- */}
                    <div className="relative flex flex-col p-4 sm:p-6 lg:p-8">
                      <div
                        className="fv-item flex items-center gap-3"
                        style={{ ["--d" as any]: "0.25s" }}
                      >
                        <span className="h-px w-8 bg-[#8B6B3D]" aria-hidden />
                        <span className="text-sm font-medium text-[#8B6B3D]">The vision</span>
                      </div>

                      <p
                        className="fv-item mt-5 text-[17px] leading-8 text-navy-700"
                        style={{ ["--d" as any]: "0.35s" }}
                      >
                        {v.description}
                      </p>

                      <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3">
                        {v.stats.map((s, si) => (
                          <div
                            key={s.label}
                            className="fv-item rounded-2xl border border-navy-900/5 bg-sand-50 px-2 py-4 text-center transition-colors duration-300 hover:bg-[#8B6B3D]/10 sm:px-3"
                            style={{ ["--d" as any]: `${0.45 + si * 0.08}s` }}
                          >
                            <StatCounter value={s.value} label={s.label} />
                          </div>
                        ))}
                      </div>

                      <p
                        className="fv-item mt-8 text-sm font-medium text-navy-900"
                        style={{ ["--d" as any]: "0.6s" }}
                      >
                        Highlights
                      </p>

                      <ul className="mt-4 space-y-3.5">
                        {v.highlights.map((h, hi) => (
                          <li
                            key={h}
                            className="fv-item flex items-start gap-3.5 text-sm leading-6 text-navy-700"
                            style={{ ["--d" as any]: `${0.65 + hi * 0.08}s` }}
                          >
                            <span className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-[#8B6B3D]/10 text-[#8B6B3D]">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path
                                  className="fv-tick"
                                  style={{ ["--d" as any]: `${0.8 + hi * 0.08}s` }}
                                  d="M5 13l4 4L19 7"
                                  stroke="currentColor"
                                  strokeWidth="2.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div
                        className="fv-item mt-auto flex flex-wrap items-center gap-3 pt-9"
                        style={{ ["--d" as any]: `${0.75 + v.highlights.length * 0.08}s` }}
                      >
                        <Link
                          href="/contact"
                          tabIndex={active ? 0 : -1}
                          className="fv-cta group/cta relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full bg-navy-900 py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-shadow duration-500 hover:shadow-[0_18px_40px_-18px_rgba(11,31,58,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B3D]/60 focus-visible:ring-offset-2"
                        >
                          <span
                            aria-hidden
                            className="fv-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/20"
                          />
                          <span className="relative">Enquire about this venture</span>
                          <span className="relative flex size-9 items-center justify-center rounded-full bg-[#D9B26A] text-navy-950 transition-transform duration-500 group-hover/cta:rotate-45">
                            <ArrowUpRight className="size-4" aria-hidden />
                          </span>
                        </Link>

                        {v.brochure && (
  <a
    href={v.brochure}
    download
    tabIndex={active ? 0 : -1}
    className="group/dl relative inline-flex min-h-12 items-center gap-3 rounded-full bg-[#D9B26A] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-navy-950 shadow-[0_14px_34px_-12px_rgba(217,178,106,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E6C686] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B3D]/60 focus-visible:ring-offset-2"
  >
    Download presentation
    <span className="relative flex size-9 items-center justify-center">
      <span
        aria-hidden
        className="absolute inset-0 animate-ping rounded-full bg-navy-900/40 motion-reduce:animate-none"
      />
      <span className="relative flex size-9 items-center justify-center rounded-full bg-navy-900 text-white">
        <Download
          className="size-4 transition-transform duration-300 group-hover/dl:translate-y-0.5"
          aria-hidden
        />
      </span>
    </span>
  </a>
)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Controls: arrows + pill tabs, active tab fills as autoplay progress ---------- */}
      {count > 1 && (
        <div className="mt-4 flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous venture"
            className="flex size-12 flex-none items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-900 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:bg-navy-900 hover:text-white"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="flex flex-1 gap-1.5 rounded-full border border-navy-900/10 bg-white p-1.5 shadow-sm">
            {ventures.map((v, i) => {
              const active = i === activeIndex;
              return (
                <button
                  key={v.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${v.title}`}
                  aria-current={active}
                  className={`relative flex-1 overflow-hidden rounded-full px-3 py-3 text-center text-[13px] transition-colors duration-300 sm:px-5 sm:text-sm ${
                    active
                      ? "bg-sand-50 font-medium text-navy-900"
                      : "text-navy-900/50 hover:text-navy-900"
                  }`}
                >
                  {active && (
                    <span
                      key={activeIndex}
                      aria-hidden
                      className="fv-fill absolute inset-0 bg-[#8B6B3D]/15"
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                      onAnimationEnd={() => goTo(activeIndex + 1)}
                    />
                  )}
                  <span className="relative block truncate">{v.title}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next venture"
            className="flex size-12 flex-none items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-900 shadow-sm transition-all duration-300 hover:translate-x-0.5 hover:bg-navy-900 hover:text-white"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}