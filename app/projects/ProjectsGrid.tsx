"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import type { ProjectSummary } from "@/lib/data";

const EASE = "cubic-bezier(.22,1,.36,1)";

const filters = [
  { key: "all", label: "All projects" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

/**
 * Motion layer — plain CSS, every rule `pg-` prefixed.
 * The filter indicator glides between options, the counts tick over, and
 * the grid re-enters card by card whenever the filter changes (the grid is
 * keyed by filter, so each card's reveal plays again).
 */
const css = `
.pg-thumb{transition:transform .6s ${EASE}}
.pg-count{transition:background-color .3s ease,color .3s ease}
@keyframes pg-fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.pg-note{animation:pg-fade .5s ${EASE} both}
@media (prefers-reduced-motion:reduce){
  .pg-thumb,.pg-count{transition:none}
  .pg-note{animation:none}
}
`;

export default function ProjectsGrid({ projects }: { projects: ProjectSummary[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const countFor = (key: FilterKey) =>
    key === "all" ? projects.length : projects.filter((p) => p.status === key).length;

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  const activeIndex = filters.findIndex((f) => f.key === filter);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ---------- Segmented filter with sliding indicator ---------- */}
      <div className="mb-4 flex justify-center">
        <div
          role="group"
          aria-label="Filter projects"
          className="relative grid w-full max-w-lg grid-cols-3 rounded-full border border-navy-900/10 bg-white p-1.5 shadow-[0_14px_34px_-24px_rgba(18,33,58,0.5)]"
        >
          <span
            aria-hidden
            className="pg-thumb absolute inset-y-1.5 left-1.5 rounded-full bg-navy-900 shadow-[0_10px_24px_-10px_rgba(18,33,58,0.7)]"
            style={{
              width: `calc((100% - 0.75rem) / ${filters.length})`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-3 py-3 text-[13px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 sm:px-5 sm:text-sm ${
                  active ? "text-white" : "text-navy-600 hover:text-navy-900"
                }`}
              >
                {f.label}
                <span
                  className={`pg-count rounded-full px-1.5 py-0.5 text-[10.5px] tabular-nums leading-none ${
                    active ? "bg-white/20 text-white" : "bg-navy-900/5 text-navy-600"
                  }`}
                >
                  {countFor(f.key)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- Grid (keyed so cards re-enter on every filter change) ---------- */}
      {visible.length > 0 ? (
        <div
          key={filter}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {visible.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="pg-note mx-auto max-w-md rounded-[1.75rem] border border-dashed border-navy-900/15 bg-white/60 px-8 py-14 text-center">
          <p className="font-display text-xl text-navy-900">Nothing here yet</p>
          <p className="mt-2 text-sm text-navy-600">
            There are no projects in this category at the moment.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-navy-900 px-6 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 focus-visible:ring-offset-2"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}