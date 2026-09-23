import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  /** Venture titles, used for the dot labels */
  labels: string[];
  activeIndex: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

const arrowButton =
  "flex size-11 flex-none items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-900 shadow-sm transition-all duration-300 hover:border-navy-900/0 hover:bg-navy-900 hover:text-white hover:shadow-[0_10px_24px_-12px_rgba(11,31,58,0.5)] disabled:pointer-events-none disabled:opacity-30 disabled:shadow-none";

/** Prev / next buttons, slide counter and dots. */
export default function CarouselNav({
  labels,
  activeIndex,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onSelect,
}: Props) {
  return (
    <div className="mt-8 flex items-center justify-center gap-5 sm:mt-10">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous venture"
        className={arrowButton}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>

      <div className="flex items-center gap-4">
        <span className="hidden font-display text-xs tabular-nums tracking-wide text-navy-900/50 sm:inline">
          {pad(activeIndex + 1)}
          <span className="mx-1 text-navy-900/25">/</span>
          {pad(labels.length)}
        </span>

        <div className="flex items-center gap-2">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Go to ${label}`}
              aria-current={i === activeIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-7 bg-[#8B6B3D]"
                  : "w-1.5 bg-navy-900/20 hover:bg-navy-900/35"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next venture"
        className={arrowButton}
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </div>
  );
}