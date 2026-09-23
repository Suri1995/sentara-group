import Image from "next/image";
import { MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { Venture } from "@/lib/types";
import VentureContentPanel from "./ventureContentPanel";

type Props = {
  venture: Venture;
  index: number;
  active: boolean;
};

/**
 * One venture card, exactly 70% of the viewport height.
 *  - md and up: image on the left, text on the right.
 *  - Below md: image on top (2/5 of the card), text below (3/5).
 * The image panel is fixed; only the text panel scrolls.
 *
 * The card never gets shorter than 480px, so it stays usable on very short
 * screens. Remove `min-h-[480px]` if you want a strict 70vh everywhere.
 */
export default function VentureSlide({ venture: v, index: i, active }: Props) {
  return (
    // perspective ancestor for the card's 3D hover tilt
    <div style={{ perspective: "1600px" }}>
      <div className="venture-card group relative card-premium h-[70vh] min-h-[480px] overflow-hidden supports-[height:1dvh]:h-[70dvh]">
        <span aria-hidden className="venture-border-glow pointer-events-none" />
        <span aria-hidden className="venture-sheen pointer-events-none" />

        <div className="relative grid h-full grid-cols-1 grid-rows-[minmax(0,2fr)_minmax(0,3fr)] md:grid-cols-[1.05fr_1fr] md:grid-rows-1">
          {/* ---------------- Image panel (does not scroll) ---------------- */}
          <div className="relative min-h-0 overflow-hidden bg-navy-gradient">
            {v.image ? (
              <>
                <Image
                  src={v.image}
                  alt={v.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  priority={i === 0}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/15 to-navy-950/10"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-navy-950/10 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-navy-950/25"
                />
              </>
            ) : (
              <div
                aria-hidden
                className="venture-panel-glow pointer-events-none absolute inset-0"
              />
            )}

            <div className="relative flex h-full flex-col justify-end p-5 text-white sm:p-10 lg:p-12">
              <span
                className="venture-chip chip mb-3 inline-flex w-fit items-center gap-1.5 border-white/30 bg-white/10 text-white backdrop-blur-sm sm:mb-4"
                style={{ "--v-delay": `${0.2 + i * 0.06}s` } as CSSProperties}
              >
                Proposed · {v.location.split(",")[0]}
              </span>

              <h3 className="font-display text-2xl sm:text-3xl">{v.title}</h3>

              <p className="mt-2 flex items-start gap-1.5 text-[13px] text-white/70">
                <MapPin
                  className="mt-0.5 size-3.5 flex-none text-[#D9B26A]"
                  aria-hidden
                />
                {v.location}
              </p>
            </div>
          </div>

          {/* ---------------- Text panel (scrolls) ---------------- */}
          <VentureContentPanel venture={v} index={i} active={active} />
        </div>
      </div>
    </div>
  );
}