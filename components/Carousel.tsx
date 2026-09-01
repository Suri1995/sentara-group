"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface Slide {
  image: string;
  caption?: string;
  subcaption?: string;
}

export default function Carousel({
  slides,
  autoPlayMs = 5500,
  aspect = "aspect-[16/9]",
  rounded = "rounded-3xl",
}: {
  slides: Slide[];
  autoPlayMs?: number;
  aspect?: string;
  rounded?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => go(index + 1), autoPlayMs);
    return () => clearInterval(t);
  }, [index, paused, autoPlayMs, go, slides.length]);

  return (
    <div
      className={`group relative w-full overflow-hidden ${rounded} ${aspect} bg-navy-900 shadow-premium`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) go(index - 1);
        if (delta < -50) go(index + 1);
        touchStartX.current = null;
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image + i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.caption ?? "Sentara Group"}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-hero-scrim" />
          {(slide.caption || slide.subcaption) && (
            <div className="absolute bottom-8 left-8 right-8 text-white sm:bottom-12 sm:left-12">
              {slide.subcaption && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-green-300">
                  {slide.subcaption}
                </p>
              )}
              {slide.caption && (
                <p className="font-display text-2xl sm:text-3xl">{slide.caption}</p>
              )}
            </div>
          )}
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-navy group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-navy group-hover:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-green-400" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
