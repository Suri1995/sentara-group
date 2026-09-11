"use client";

import { useEffect, useRef, useState } from "react";

function parseTarget(value: string) {
  const numeric = value.replace(/[^0-9]/g, "");
  return numeric ? parseInt(numeric, 10) : null;
}

export default function StatCounter({
  value,
  label,
  dark = false,
}: {
  value: string;
  label: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<string>(
    parseTarget(value) !== null ? value.replace(/[0-9,]+/, "0") : value
  );
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const target = parseTarget(value);
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          const duration = 1600;
          const start = performance.now();
          const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
          const suffix = value.match(/[^0-9]*$/)?.[0] ?? "";

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            setDisplay(`${prefix}${current.toLocaleString("en-IN")}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    // min-w-0 is the key fix: grid items default to min-width:auto, which
    // stops a cell from shrinking below its content's intrinsic width. A
    // wide number like "11,24,000+" was overflowing straight past its
    // column boundary into the next stat instead of wrapping or shrinking.
    <div ref={ref} className="min-w-0 text-center sm:text-left">
      <p
        className={`break-words font-display text-2xl leading-tight [font-variant-numeric:tabular-nums] sm:text-3xl lg:text-4xl xl:text-5xl ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {display}
      </p>
      <p
        className={`mt-2 text-xs font-semibold uppercase tracking-widest sm:text-sm ${
          dark ? "text-white/60" : "text-navy-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}