"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500";

const css = `
@keyframes ic-ping {
  0%   { transform: scale(1); opacity: 0.6; }
  80%, 100% { transform: scale(2.2); opacity: 0; }
}
.ic-card:hover .ic-ping { animation: ic-ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite; }

@media (prefers-reduced-motion: reduce) {
  .ic-card:hover .ic-ping { animation: none !important; }
}
`;

type InfoCardProps = {
  label: string;
  value: string;
  Icon: LucideIcon;
  href: string;
  /** Short hint shown under the value, e.g. "Open in Google Maps" */
  hint?: string;
  /** Open the link in a new tab (use for maps, not tel: or mailto:) */
  external?: boolean;
  /** Show a copy-to-clipboard button */
  copyable?: boolean;
  /** Stagger delay for the reveal, in ms */
  delay?: number;
};

export default function InfoCard({
  label,
  value,
  Icon,
  href,
  hint,
  external = false,
  copyable = false,
  delay = 0,
}: InfoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    // Max ~4deg tilt
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${(0.5 - y / r.height) * 8}deg`);
  }, []);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — fail silently */
    }
  };

  return (
    <Reveal delay={delay} className="ic-card group relative overflow-hidden card-premium">
      <style>{css}</style>

      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{
          transform:
            "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        }}
        className="relative p-6 transition-transform duration-300 ease-out will-change-transform"
      >
        {/* Cursor spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgba(34,197,94,0.14),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Top accent bar */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-green-500 to-navy-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />

        {/* Left accent line */}
        <span
          aria-hidden
          className="absolute inset-y-6 left-0 w-[3px] origin-top scale-y-0 rounded-r-full bg-green-500 transition-transform duration-500 ease-out group-hover:scale-y-100"
        />

        <div className="relative flex items-start gap-4">
          {/* Icon with pulse ring */}
          <span className="relative flex-none">
            <span
              aria-hidden
              className="ic-ping absolute inset-0 rounded-xl bg-green-500/30 opacity-0"
            />
            <span className="relative flex size-12 items-center justify-center rounded-xl bg-green-50 text-green-600 shadow-sm transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-navy-900 group-hover:text-white group-hover:shadow-lg">
              <Icon className="size-5" strokeWidth={1.6} aria-hidden />
            </span>
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
              {label}
            </p>

            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group/link mt-1.5 inline-flex items-start gap-1 text-navy-900 transition-colors duration-200 hover:text-green-600 ${focusRing}`}
            >
              <span className="break-words font-medium">{value}</span>
              <ArrowUpRight
                className="mt-1 size-3.5 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:opacity-100"
                aria-hidden
              />
            </a>

            {hint && (
              <p className="mt-1.5 text-xs text-navy-500/70 transition-colors duration-300 group-hover:text-navy-500">
                {hint}
              </p>
            )}
          </div>

          {copyable && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? `${label} copied` : `Copy ${label}`}
              className={`flex-none rounded-lg border border-navy-900/10 bg-white/70 p-2 text-navy-500 backdrop-blur transition-all duration-300 hover:border-green-500/40 hover:text-green-600 active:scale-90 sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100 ${focusRing} ${
                copied ? "!border-green-500/50 !bg-green-50 !text-green-600" : ""
              }`}
            >
              {copied ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <Copy className="size-4" aria-hidden />
              )}
            </button>
          )}
        </div>

        <span className="sr-only" role="status" aria-live="polite">
          {copied ? `${label} copied to clipboard` : ""}
        </span>
      </div>
    </Reveal>
  );
}