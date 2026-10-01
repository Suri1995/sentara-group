"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

const statusStyles: Record<string, string> = {
  ongoing: "bg-green-50 text-green-700",
  completed: "bg-navy-50 text-navy-700",
  future: "bg-amber-50 text-amber-700",
};

const AUTOPLAY_MS = 6000;
const MAX_VISIBLE_OFFSET = 2; // cards further than this from center aren't rendered
const EASE = "cubic-bezier(.22,1,.36,1)";

/** Shortest signed distance from `active` to `i` around a ring of `count` items. */
function ringOffset(i: number, active: number, count: number) {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

/**
 * Motion layer — plain CSS, every rule `lp-` prefixed.
 *
 * The orchestrated moment is the change of project: the fan re-arranges,
 * the ambient glow behind the panel crossfades to the new project's
 * colours, and the detail copy rises in line by line. Tilt, sheen and
 * dragging answer the person's input; the progress bar marks autoplay time.
 * Everything is disabled under reduced motion.
 */
const css = `
.lp-card{transition:transform .8s ${EASE},opacity .8s ease,filter .8s ease,box-shadow .5s ease}
.lp-tilt{transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;
  transition:transform .5s ${EASE}}
.lp-sheen{opacity:0;transition:opacity .4s ease;
  background:radial-gradient(240px circle at var(--mx,50%) var(--my,30%),rgba(255,255,255,.35),transparent 60%)}
.lp-card[aria-current="true"]:hover .lp-sheen{opacity:1}

.lp-ambient{transition:opacity 1.2s ease}

.lp-arrow{transition:transform .3s ${EASE},background-color .3s ease,color .3s ease,box-shadow .3s ease}
.lp-arrow:hover{background-color:#12213a;color:#fff;box-shadow:0 14px 28px -12px rgba(18,33,58,.5)}
.lp-arrow-l:hover{transform:translate(-3px,-50%)}
.lp-arrow-r:hover{transform:translate(3px,-50%)}

.lp-dot{transition:width .5s ${EASE},background-color .3s ease}
.lp-fill{transform-origin:left;animation:lp-fill ${AUTOPLAY_MS}ms linear forwards}
@keyframes lp-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}

@keyframes lp-rise{from{opacity:0;transform:translateY(16px);filter:blur(5px)}to{opacity:1;transform:none;filter:none}}
.lp-rise{opacity:0;animation:lp-rise .8s ${EASE} forwards;animation-delay:var(--d,0s)}

.lp-cta .lp-sheen2{transform:translateX(-120%) skewX(-18deg);transition:transform .9s ${EASE}}
.lp-cta:hover .lp-sheen2,.lp-cta:focus-visible .lp-sheen2{transform:translateX(220%) skewX(-18deg)}

@media (prefers-reduced-motion:reduce){
  .lp-card{transition:opacity .3s ease}
  .lp-tilt{transform:none!important;transition:none}
  .lp-ambient,.lp-arrow,.lp-dot{transition:none}
  .lp-fill{animation:none;transform:scaleX(1)}
  .lp-rise{animation:none;opacity:1}
  .lp-cta .lp-sheen2{transition:none}
}
`;

/**
 * The Group's built legacy, drawn from the same `projects` data used on
 * the /projects page. A fanned, draggable gallery: one large card centred
 * with the rest receding either side, while the panel's ambient glow and
 * the detail copy below follow whichever project is in focus.
 */
export default function LegacyPortfolio() {
  const count = projects.length;
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count]
  );
  const next = useCallback(() => setActive((a) => (a + 1) % count), [count]);
  const prev = useCallback(
    () => setActive((a) => (a - 1 + count) % count),
    [count]
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Drag / swipe on the stage (mouse, touch and pen)
  const onStageDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragged.current = false;
  };
  const onStageUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 48) {
      dragged.current = true;
      delta > 0 ? prev() : next();
    }
    dragStartX.current = null;
  };

  // Active-card tilt + moving sheen
  const onCardMove = (e: React.PointerEvent<HTMLButtonElement>, isActive: boolean) => {
    if (e.pointerType !== "mouse" || !isActive) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const el = e.currentTarget;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
  };
  const onCardLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  const activeProject = projects[active];

  return (
    <section className="relative overflow-hidden bg-[#F5F6F8] py-16 sm:py-24">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(18,33,58,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-page relative">
        <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-navy-900/5 bg-white px-5 py-12 shadow-[0_40px_80px_-40px_rgba(18,33,58,0.25)] sm:px-10 sm:py-16">
          {/* Ambient glow: every project's image, blurred, crossfading with the active one */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] overflow-hidden"
          >
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className="lp-ambient absolute inset-0"
                style={{ opacity: i === active ? 0.22 : 0 }}
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="320px"
                  className="scale-150 object-cover"
                  style={{ filter: "blur(60px) saturate(1.3)" }}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white" />
          </div>

          {/* Header */}
          <div className="relative mx-auto max-w-xl text-center">
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

          {/* Fanned stage */}
          <div
            className="relative mt-14 touch-pan-y select-none sm:mt-16"
            style={{ perspective: "1400px" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onPointerDown={onStageDown}
            onPointerUp={onStageUp}
            onPointerCancel={() => (dragStartX.current = null)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              if (e.key === "ArrowRight") next();
            }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            tabIndex={0}
          >
            <div className="relative mx-auto flex h-[250px] items-center justify-center sm:h-[340px] md:h-[400px]">
              {/* ground shadow */}
              <span
                aria-hidden
                className="absolute bottom-0 left-1/2 h-8 w-[55%] -translate-x-1/2 rounded-full bg-navy-900/25 blur-2xl"
              />

              {projects.map((p, i) => {
                const offset = ringOffset(i, active, count);
                const abs = Math.abs(offset);
                if (abs > MAX_VISIBLE_OFFSET) return null;
                const isActive = offset === 0;

                const spacing = isMobile ? 62 : 108;
                const rotate = offset * (isMobile ? 10 : 13);
                const translateX = offset * spacing;
                const translateY = abs * (isMobile ? 10 : 16);
                const scale = isActive ? 1 : 1 - abs * 0.14;

                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => {
                      if (dragged.current) {
                        dragged.current = false;
                        return;
                      }
                      goTo(i);
                    }}
                    onPointerMove={(e) => onCardMove(e, isActive)}
                    onPointerLeave={onCardLeave}
                    aria-label={`Show ${p.name}`}
                    aria-current={isActive}
                    className="lp-card absolute w-[clamp(130px,28vw,240px)] cursor-pointer rounded-2xl shadow-[0_30px_60px_-30px_rgba(18,33,58,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B3D]/60 focus-visible:ring-offset-2"
                    style={{
                      aspectRatio: "3 / 4",
                      transform: `translate(${translateX}%, ${translateY}%) rotate(${rotate}deg) scale(${scale})`,
                      zIndex: 10 - abs,
                      opacity: isActive ? 1 : 1 - abs * 0.25,
                      filter: isActive ? "none" : "saturate(.75) brightness(.92)",
                    }}
                  >
                    <span className="lp-tilt relative block h-full w-full overflow-hidden rounded-2xl bg-navy-900">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        draggable={false}
                        className="object-cover"
                        sizes="(min-width: 640px) 240px, 130px"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent"
                      />
                      <span aria-hidden className="lp-sheen absolute inset-0" />

                      {isActive && (
                        <>
                          <span
                            className={`absolute left-3 top-3 w-fit rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm ${statusStyles[p.status]}`}
                          >
                            {p.statusLabel}
                          </span>
                          <span className="lp-rise absolute inset-x-3 bottom-3 text-left font-display text-sm leading-tight text-white sm:text-base">
                            {p.name}
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous project"
                  className="lp-arrow lp-arrow-l absolute left-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-md ring-1 ring-navy-900/10 sm:size-12"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next project"
                  className="lp-arrow lp-arrow-r absolute right-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-md ring-1 ring-navy-900/10 sm:size-12"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
          </div>

          {/* Active project detail — rises in line by line on every change */}
          <div
            key={activeProject.slug}
            className="relative mx-auto mt-12 max-w-xl text-center sm:mt-14"
          >
            <h3
              className="lp-rise font-display text-2xl text-navy-900 sm:text-3xl"
              style={{ ["--d" as any]: "0s" }}
            >
              {activeProject.name}
            </h3>
            <p
              className="lp-rise mt-1.5 text-sm text-navy-600"
              style={{ ["--d" as any]: "0.08s" }}
            >
              {activeProject.location}
            </p>
            <p
              className="lp-rise mx-auto mt-4 max-w-lg text-[15px] leading-7 text-navy-600"
              style={{ ["--d" as any]: "0.16s" }}
            >
              {activeProject.description}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {activeProject.stats.map((s, si) => (
                <div
                  key={s.label}
                  className="lp-rise min-w-[104px] rounded-2xl border border-navy-900/5 bg-[#F5F6F8] px-5 py-3.5"
                  style={{ ["--d" as any]: `${0.26 + si * 0.08}s` }}
                >
                  <strong className="block font-display text-lg tabular-nums text-navy-900">
                    {s.value}
                  </strong>
                  <span className="text-[11px] text-navy-600">{s.label}</span>
                </div>
              ))}
            </div>

            {/* {activeProject.accolade && (
              <p
                className="lp-rise mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-[#8B6B3D]/10 px-4 py-1.5 text-xs font-medium text-[#8B6B3D]"
                style={{ ["--d" as any]: "0.5s" }}
              >
                <Award className="size-3.5" aria-hidden />
                {activeProject.accolade}
              </p>
            )} */}

            <div className="lp-rise mt-7" style={{ ["--d" as any]: "0.58s" }}>
              <Link
                href={`/projects/${activeProject.slug}`}
                className="lp-cta group/cta relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full bg-navy-900 py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-shadow duration-500 hover:shadow-[0_18px_40px_-18px_rgba(11,31,58,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B3D]/60 focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden
                  className="lp-sheen2 pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/20"
                />
                <span className="relative">View project</span>
                <span className="relative flex size-9 items-center justify-center rounded-full bg-[#D9B26A] text-navy-950 transition-transform duration-500 group-hover/cta:rotate-45">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </Link>
            </div>
          </div>

          {/* Pagination: the active dot stretches into the autoplay progress bar */}
          {count > 1 && (
            <div className="relative mt-10 flex justify-center gap-2">
              {projects.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${p.name}`}
                    aria-current={isActive}
                    className={`lp-dot relative h-1.5 overflow-hidden rounded-full ${
                      isActive ? "w-12 bg-navy-900/15" : "w-1.5 bg-navy-900/20 hover:bg-navy-900/40"
                    }`}
                  >
                    {isActive && (
                      <span
                        key={active}
                        aria-hidden
                        className="lp-fill absolute inset-0 bg-navy-900"
                        style={{ animationPlayState: paused ? "paused" : "running" }}
                        onAnimationEnd={next}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}