"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import type { ProjectSummary } from "@/lib/data";

export default function FeaturedProjectTile({
  project,
  delay = 0,
  featured = false,
}: {
  project: ProjectSummary;
  delay?: number;
  featured?: boolean;
}) {
  const borderRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const border = borderRef.current;

    if (!border) return;

    const rect = border.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const angle = Math.atan2(y, x);

    border.style.setProperty("--rotation", `${angle}rad`);
  };

  const resetRotation = () => {
    borderRef.current?.style.setProperty("--rotation", "0deg");
  };

  return (
    <Reveal delay={delay}>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.name} project`}
        className="group block outline-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          resetRotation();
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => {
          setHovered(false);
          resetRotation();
        }}
      >
        {/* Animated Border — width comes from the grid track, height is derived
            from the 3/5 aspect ratio, so every card in the row matches exactly
            regardless of viewport width. */}
        <div
          ref={borderRef}
          className={[
            "relative aspect-[3/4] w-full overflow-hidden",
            "rounded-[1.75rem]",
            "border-[3px] border-transparent",
            "bg-[linear-gradient(var(--card-bg),var(--card-bg)),conic-gradient(from_var(--rotation,0deg),var(--accent)_0deg,var(--accent)_90deg,var(--border-bg)_90deg,var(--border-bg)_360deg)]",
            "bg-origin-border",
            "bg-clip-padding",
            "transition-shadow duration-300",
            "motion-safe:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]",
            "focus-visible:ring-2",
            "focus-visible:ring-offset-4",
          ].join(" ")}
          style={
            {
              "--rotation": "0deg",
              "--accent": "#DAFF3E",
              "--card-bg": "#000",
              "--border-bg": "#242424",
            } as React.CSSProperties
          }
        >
          {/* Card — fills the aspect-boxed parent, so its own h-full is a definite
              100% of a definite height, which lets the 65%/35% child splits below
              resolve correctly. */}
          <div
            className={[
              "relative flex h-full w-full flex-col",
              "overflow-hidden rounded-[1.5rem]",
              "bg-[#071632]",
              "bg-[linear-gradient(45deg,rgba(230,230,230,0.05)_25%,transparent_25%,transparent_75%,rgba(240,240,240,0.05)_75%),linear-gradient(-45deg,rgba(240,240,240,0.05)_25%,transparent_25%,transparent_75%,rgba(230,230,230,0.05)_75%)]",
              "bg-[length:20.84px_20.84px]",
            ].join(" ")}
          >
            {/* Image — exactly 65% of the card's height. */}
            <div className="relative h-[55%] w-full shrink-0 overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.name} project`}
                fill
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                sizes="(max-width: 767px) 100vw, 33vw"
                priority={featured}
              />
            </div>

            {/* Content — exactly 35% of the card's height. */}
            <div className="flex h-[45%] w-full flex-col justify-between overflow-hidden p-5 sm:p-6">
              <div className="min-h-0">
                {/* Status */}
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                    {project.statusLabel}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xl text-white transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </div>

                {/* Project Name */}
                <div className="relative mt-3 overflow-hidden">
                  <h3
                    className={[
                      "relative z-10 px-1 py-1",
                      "font-display text-lg sm:text-xl lg:text-2xl",
                      "tracking-tight",
                      "line-clamp-1",
                      "transition-colors duration-300",
                      hovered ? "text-white" : "text-white",
                    ].join(" ")}
                  >
                    {project.name}
                  </h3>

                  {/* Hover Highlight */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-0 z-0 bg-[#0f7a3c]",
                      "transition-[clip-path] duration-400",
                      hovered
                        ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
                        : "[clip-path:polygon(0_50%,100%_50%,100%_50%,0_50%)]",
                    ].join(" ")}
                  />
                </div>

                {/* Description */}
                <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-white/70">
                  {project.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-6 gap-y-1 border-t border-white/20 pt-3">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong className="font-display text-base text-white sm:text-lg">
                      {stat.value}
                    </strong>

                    <span className="ml-2 text-[10px] uppercase tracking-widest text-white/55">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}