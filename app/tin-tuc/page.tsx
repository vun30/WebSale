import { readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

import newsHyundai from "../data/newsHyundai";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function parseDateDDMMYYYY(value: string): number {
  // "dd/mm/yyyy"
  const [dd, mm, yyyy] = value.split("/").map((v) => Number(v));
  if (!dd || !mm || !yyyy) return 0;
  return new Date(yyyy, mm - 1, dd).getTime();
}

async function getNewsCoverImage(newsNo: number): Promise<string | null> {
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

export default async function Page() {
  const items = [...newsHyundai].sort(
    (a: any, b: any) => parseDateDDMMYYYY(b.date) - parseDateDDMMYYYY(a.date),
  );

  const covers = await Promise.all(
    items.map((n: any) => getNewsCoverImage(Number(n.newsNo))),
  );

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10">
      <div className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-700">
          Trang chủ
        </Link>{" "}
        <span className="px-1">›</span>
        <span className="font-medium text-zinc-700">Tin tức</span>
      </div>

      <div className="mt-8 text-center sm:mt-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-800 sm:text-4xl lg:text-5xl">
          Tin tức
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          Cập nhật 6 tin mới nhất từ Hyundai
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n: any, idx: number) => {
          const cover = covers[idx];
          return (
            <article
              key={n.id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link href={`/tin-tuc/${n.id}`} className="block">
                <div className="relative h-48 w-full bg-zinc-100">
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

                  <h2 className="mt-3 line-clamp-2 text-base font-extrabold text-zinc-800">
                    {n.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm text-zinc-600">
                    {n.excerpt}
                  </p>

                  <div className="mt-4 text-sm font-semibold text-blue-900">
                    Xem chi tiết →
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

