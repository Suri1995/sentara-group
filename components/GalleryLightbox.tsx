"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryLightbox({
  images,
  columns = 4,
}: {
  images: string[];
  columns?: 3 | 4;
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, images.length]);

  return (
    <>
      <div
        className={`grid grid-cols-2 gap-4 sm:gap-5 ${
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-100"
          >
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-navy-900/0 transition-colors duration-300 group-hover:bg-navy-900/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm sm:p-10"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            ✕
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length));
            }}
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-8"
          >
            ‹
          </button>
          <div
            className="relative h-[70vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`Gallery image ${active + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a === null ? a : (a + 1) % images.length));
            }}
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-8"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
