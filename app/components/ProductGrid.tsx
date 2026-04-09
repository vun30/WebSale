"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ProductItem = {
  name: string;
  image: string;
  price: string;
  slug?: string;
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
    <section className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12">
      <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-slate-600 sm:text-3xl lg:text-4xl">
        Các dòng xe ô tô Hyundai
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <article key={product.image} className="text-center">
            <Link
              href={`/san-pham/${product.slug ?? ""}`}
              className="block rounded-xl p-2 transition hover:bg-zinc-50"
            >
              <div className="relative mx-auto h-[130px] w-full max-w-[230px] sm:h-[140px] sm:max-w-[240px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-zinc-800 sm:mt-4 sm:text-[18px]">
                {product.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-zinc-700">{product.price}</p>
            </Link>
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
