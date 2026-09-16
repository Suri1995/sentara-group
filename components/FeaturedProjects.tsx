"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectSummary } from "@/lib/data";

// NOTE: field names assumed from ProjectSummary — adjust here if yours differ.
function getFields(p: ProjectSummary) {
  const anyP = p as any;
  return {
    title: anyP.title ?? anyP.name ?? "Untitled project",
    image: anyP.image ?? anyP.coverImage ?? anyP.thumbnail ?? "",
    location: anyP.location ?? anyP.city ?? "Hyderabad",
    category: anyP.category ?? anyP.type ?? "",
    statValue: Number(anyP.area ?? anyP.sqft ?? anyP.units ?? 0),
    statLabel: anyP.area ?? anyP.sqft ? "sq. ft." : anyP.units ? "units" : "",
  };
}

type Fields = ReturnType<typeof getFields>;

/**
 * Cycles a bento pattern every 6 tiles: one hero, two mediums, two thirds,
 * one wide banner. Each tier below (sm / md / lg) has its OWN column-span
 * values, so the pattern degrades gracefully instead of jumping straight
 * from 1 column (mobile) to the full 6-column desktop layout.
 *
 *   <640      : 1 column, everything full width, auto height
 *   640–767   : 2 columns  (sm)
 *   768–1023  : 4 columns  (md)  — the previously "dead" tablet zone
 *   1024–1279 : 6 columns  (lg)
 *   1280+     : 6 columns, taller rows (xl)
 */
function tileSpan(i: number) {
  const pattern = [
    // 0 — hero
    "sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-4 lg:row-span-2",
    // 1 — medium
    "sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1",
    // 2 — medium
    "sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-1",
    // 3 — third
    "sm:col-span-2 sm:row-span-1 md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1",
    // 4 — third
    "sm:col-span-2 sm:row-span-1 md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1",
    // 5 — wide banner
    "sm:col-span-2 sm:row-span-1 md:col-span-4 md:row-span-1 lg:col-span-6 lg:row-span-1",
  ];
  return pattern[i % pattern.length];
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current || target <= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      startedRef.current = true;
      return;
    }
    startedRef.current = true;

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function ProjectTile({
  project,
  fields,
  spanClass,
  large,
}: {
  project: ProjectSummary;
  fields: Fields;
  spanClass: string;
  large: boolean;
}) {
  const tileRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = tileRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(fields.statValue, visible);

  return (
    <Link
      ref={tileRef}
      href={`/projects/${project.slug}`}
      className={`group relative block h-[260px] w-full overflow-hidden rounded-2xl shadow-soft ring-1 ring-navy-900/[0.05] transition-shadow duration-300 hover:shadow-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:h-auto sm:w-auto ${spanClass}`}
    >
      {fields.image && (
        <Image
          src={fields.image}
          alt={fields.title}
          fill
          className="object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.06]"
          sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 45vw, (min-width: 768px) 50vw, (min-width: 640px) 50vw, 100vw"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent"
      />

      {fields.statValue > 0 && (
        <div className="absolute right-3 top-3 flex items-baseline gap-1 rounded-lg border border-white/20 bg-navy-950/35 px-2.5 py-1.5 backdrop-blur-sm sm:right-4 sm:top-4 sm:gap-1.5 sm:px-3 sm:py-2">
          <span className="text-xs font-semibold tabular-nums text-white sm:text-sm">
            {count.toLocaleString()}
          </span>
          {fields.statLabel && (
            <span className="text-[10px] text-sand-100/75 sm:text-[11px]">
              {fields.statLabel}
            </span>
          )}
        </div>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 p-4 sm:p-5 ${
          large ? "md:p-6 lg:p-8" : ""
        }`}
      >
        {fields.category && (
          <span className="text-[11px] text-sand-100/70 sm:text-xs">
            {fields.category}
          </span>
        )}
        <h3
          className={`mt-1 font-semibold leading-snug tracking-tight text-white ${
            large
              ? "text-xl sm:text-xl md:text-2xl lg:text-3xl"
              : "text-base sm:text-lg"
          }`}
        >
          {fields.title}
        </h3>
        <span className="mt-1 flex items-center gap-1.5 text-[11px] text-sand-100/75 sm:text-xs">
          {fields.location}
          <ArrowUpRight
            className="size-3.5 shrink-0 opacity-0 transition-all duration-300 motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

export default function FeaturedProjects({
  projects,
}: {
  projects: ProjectSummary[];
}) {
  const fields = useMemo(() => projects.map(getFields), [projects]);

  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-sand-50 to-navy-50 py-8 md:py-20"
    >
      {/* Ambient navy + green glows — soft, light-toned so the dark headings
          and card text stay fully legible against it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 8% 0%, rgba(16,185,129,0.16), transparent 60%), radial-gradient(ellipse 55% 60% at 100% 100%, rgba(11,31,58,0.14), transparent 60%), radial-gradient(ellipse 40% 40% at 60% 35%, rgba(16,185,129,0.07), transparent 65%)",
        }}
      />
      {/* Graph-paper grid texture, edge-to-edge, very faint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,31,58,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,31,58,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container-page relative">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-emerald-600" aria-hidden />
              <span className="text-sm font-medium text-navy-500">
                Projects overview
              </span>
            </div>
            <h2
              id="featured-projects-heading"
              className="heading-lg text-navy-900"
            >
              Projects that define our legacy.
            </h2>
            <p className="mt-3 text-sm text-navy-500 sm:mt-4 sm:text-base">
              A closer look at {projects.length}{" "}
              {projects.length === 1 ? "development" : "developments"} from
              our portfolio.
            </p>
          </div>

          <Link
            href="/projects"
            className="btn-dark inline-flex min-h-11 w-full items-center justify-center gap-2 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 sm:w-auto sm:self-auto"
          >
            View all projects
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {/* ---------------------------------------------------------
            Bento grid — asymmetric tile sizes, dense packing.
            Column count and row height are tuned per breakpoint so the
            768–1279px tablet/small-laptop range gets its own layout
            instead of inheriting the 640px pattern unchanged.
            --------------------------------------------------------- */}
        <div
          className="
            mt-10 grid grid-cols-1 gap-4
            sm:mt-12 sm:grid-cols-2 sm:auto-rows-[190px] sm:gap-5 sm:[grid-auto-flow:dense]
            md:grid-cols-4 md:auto-rows-[200px]
            lg:mt-16 lg:grid-cols-6 lg:auto-rows-[210px]
            xl:auto-rows-[230px]
          "
        >
          {projects.map((project, i) => (
            <ProjectTile
              key={project.slug}
              project={project}
              fields={fields[i]}
              spanClass={tileSpan(i)}
              large={i % 6 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}