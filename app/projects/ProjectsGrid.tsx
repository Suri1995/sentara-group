"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import type { ProjectSummary } from "@/lib/data";

const filters = [
  { key: "all", label: "All Projects" },
  { key: "ongoing", label: "Ongoing" },
  { key: "completed", label: "Completed" },
] as const;

export default function ProjectsGrid({ projects }: { projects: ProjectSummary[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === f.key
                ? "bg-navy text-white shadow-card"
                : "bg-white text-navy-600 hover:bg-navy-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={i * 90}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
