"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSliderProps = {
  images: string[];
  intervalMs?: number;
};

export default function HeroSlider({ images, intervalMs = 4000 }: HeroSliderProps) {
  const total = images.length;
  const [index, setIndex] = useState(0);

  const hasImages = total > 0;
  const hasMany = total > 1;
  const safeIndex = hasImages ? index % total : 0;

  useEffect(() => {
    if (!hasMany) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [hasMany, intervalMs, total]);

  const activeImage = hasImages ? images[safeIndex] : null;

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  if (!hasImages || !activeImage) {
    return (
      <section className="w-full">
        <div className="flex h-[240px] items-center justify-center bg-zinc-100 px-4 text-center text-zinc-500 sm:h-[320px] lg:h-[420px]">
          Chua co anh trong thu muc public/slides
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="relative overflow-hidden bg-zinc-100">
        <div className="relative h-[240px] w-full sm:h-[320px] lg:h-[420px]">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${safeIndex * 100}%)` }}
          >
            {images.map((imageSrc, imageIdx) => (
              <div key={imageSrc} className="relative h-full w-full flex-none">
                <Image
                  src={imageSrc}
                  alt={`Slide ${imageIdx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={imageIdx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Slide truoc"
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-zinc-700 shadow transition hover:bg-white sm:left-4 sm:h-11 sm:w-11 sm:text-2xl"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Slide tiep theo"
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-zinc-700 shadow transition hover:bg-white sm:right-4 sm:h-11 sm:w-11 sm:text-2xl"
            >
              ›
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
              {images.map((_, dotIdx) => (
                <button
                  key={`dot-${dotIdx}`}
                  type="button"
                  onClick={() => setIndex(dotIdx)}
                  aria-label={`Den slide ${dotIdx + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    dotIdx === safeIndex ? "bg-blue-600" : "bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
