"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PictureCarouselProps = {
  images: string[];
  alt: string;
  intervalMs?: number;
};

export default function PictureCarousel({
  images,
  alt,
  intervalMs = 3500,
}: PictureCarouselProps) {
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

  if (!hasImages) {
    return (
      <div className="flex h-full w-full items-center justify-center text-zinc-500">
        Chưa có ảnh trong thư mục public/picture
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${safeIndex * 100}%)` }}
      >
        {images.map((src) => (
          <div key={src} className="relative h-full w-full flex-none">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={src === images[0]}
            />
          </div>
        ))}
      </div>

      {hasMany && (
        <>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
            aria-label="Ảnh trước"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-zinc-700 shadow transition hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % total)}
            aria-label="Ảnh tiếp theo"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-zinc-700 shadow transition hover:bg-white"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {images.map((_, dotIdx) => (
              <button
                key={`pic-dot-${dotIdx}`}
                type="button"
                onClick={() => setIndex(dotIdx)}
                aria-label={`Chuyển đến ảnh ${dotIdx + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  dotIdx === safeIndex ? "bg-blue-600" : "bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

