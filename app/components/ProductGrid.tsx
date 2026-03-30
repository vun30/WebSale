"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProductItem = {
  name: string;
  image: string;
  price: string;
};

type ProductGridProps = {
  products: ProductItem[];
};

const INITIAL_VISIBLE_COUNT = 8;

export default function ProductGrid({ products }: ProductGridProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = useMemo(() => {
    if (showAll) return products;
    return products.slice(0, INITIAL_VISIBLE_COUNT);
  }, [products, showAll]);

  const hasMore = products.length > INITIAL_VISIBLE_COUNT;

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-12">
      <h2 className="text-center text-4xl font-extrabold uppercase tracking-wide text-slate-600">
        Các dòng xe ô tô Hyundai
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <article key={product.image} className="text-center">
            <div className="relative mx-auto h-[140px] w-full max-w-[240px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
            <h3 className="mt-4 text-[18px] font-semibold text-zinc-800">{product.name}</h3>
            <p className="mt-1 text-sm font-semibold text-zinc-700">{product.price}</p>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-blue-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-900"
          >
            {showAll ? "Thu gọn" : "Xem tất cả"}
          </button>
        </div>
      )}
    </section>
  );
}
