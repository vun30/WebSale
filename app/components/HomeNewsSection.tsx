import { readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

import newsHyundai from "../data/newsHyundai";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function parseDateDDMMYYYY(value: string): number {
  const [dd, mm, yyyy] = value.split("/").map((v) => Number(v));
  if (!dd || !mm || !yyyy) return 0;
  return new Date(yyyy, mm - 1, dd).getTime();
}

async function getCoverImage(newsNo: number): Promise<string | null> {
  const dir = path.join(process.cwd(), "public", "news", `new${newsNo}`);
  try {
    const files = await readdir(dir, { withFileTypes: true });
    const first = files
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))[0];
    if (!first) return null;
    return `/news/new${newsNo}/${encodeURIComponent(first)}`;
  } catch {
    return null;
  }
}

export default async function HomeNewsSection() {
  const items = [...newsHyundai]
    .sort((a: any, b: any) => parseDateDDMMYYYY(b.date) - parseDateDDMMYYYY(a.date))
    .slice(0, 6);

  const covers = await Promise.all(items.map((n: any) => getCoverImage(Number(n.newsNo))));

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-slate-600 sm:text-left sm:text-3xl lg:text-4xl">
          Tin tức
        </h2>
        <Link
          href="/tin-tuc"
          className="text-sm font-semibold text-blue-900 hover:text-blue-800"
        >
          Xem tất cả →
        </Link>
      </div>

      <div className="mt-8 sm:mt-10">
        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
          <div className="flex snap-x snap-mandatory gap-4">
        {items.map((n: any, idx: number) => {
          const cover = covers[idx];
          return (
            <article
              key={n.id}
              className="w-[280px] flex-none snap-start overflow-hidden  border border-zinc-100 bg-white shadow-sm transition hover:shadow-md sm:w-[320px] lg:w-[360px]"
            >
              <Link href={`/tin-tuc/${n.id}`} className="block">
                <div className="relative h-44 w-full bg-zinc-100">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={n.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-xs text-zinc-500">
                    <span className="rounded-full bg-zinc-100 px-2 py-1 font-semibold text-zinc-600">
                      {n.category}
                    </span>
                    <span className="whitespace-nowrap">{n.date}</span>
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-base font-extrabold text-zinc-800">
                    {n.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm text-zinc-600">
                    {n.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          );
        })}
          </div>
        </div>
      </div>
    </section>
  );
}

