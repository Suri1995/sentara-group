"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import StatCounter from "@/components/StatCounter";
import { Venture } from "@/lib/types";

type Props = {
  venture: Venture;
  /** Position of this slide, used to stagger the entrance animations */
  index: number;
  /** Whether this slide is the one currently in view */
  active: boolean;
};

/**
 * The text side of a slide. It fills the height its parent gives it and
 * scrolls on its own when the text doesn't fit. A soft fade at the bottom
 * edge shows there is more to read, and disappears once you reach the end.
 */
export default function VentureContentPanel({ venture: v, index: i, active }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(false);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setHasMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
  }, []);

  // Re-check whenever the panel or its content changes size
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, [update]);

  return (
    <div className="relative min-h-0">
      <div
        ref={scrollRef}
        onScroll={update}
        // Only the visible slide is reachable with the Tab key
        tabIndex={active ? 0 : -1}
        role="region"
        aria-label={`${v.title} details`}
        className="h-full overflow-y-auto p-6 [scrollbar-width:thin] sm:p-10 lg:p-12"
      >
        <div>
          <p className="body-lg">{v.description}</p>

          <div className="mt-7 grid grid-cols-3 divide-x divide-navy-900/10 border-y border-navy-900/10 py-5">
            {v.stats.map((s, si) => (
              <div
                key={s.label}
                className="venture-stat px-3 text-center first:pl-0 last:pr-0"
                style={
                  { "--v-delay": `${0.35 + i * 0.06 + si * 0.06}s` } as CSSProperties
                }
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
                style={
                  { "--v-delay": `${0.3 + i * 0.06 + hi * 0.07}s` } as CSSProperties
                }
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

      {/* Bottom fade, shown only while there is more to scroll */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 ${
          hasMore ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}