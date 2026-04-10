import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import newsHyundai from "../../data/newsHyundai";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

async function getNewsImages(newsNo: number): Promise<string[]> {
  const dir = path.join(process.cwd(), "public", "news", `new${newsNo}`);
  try {
    const files = await readdir(dir, { withFileTypes: true });
    return files
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/news/new${newsNo}/${encodeURIComponent(name)}`);
  } catch {
    return [];
  }
}

function isHeading(line: string) {
  const t = line.trim();
  if (!t) return false;
  if (t.length > 90) return false;
  if (t.endsWith(".")) return false;
  if (t === t.toUpperCase()) return true;
  if (t.endsWith(":")) return true;
  return false;
}

function toIsoDate(date: string) {
  const [dd, mm, yyyy] = date.split("/").map(Number);
  if (!dd || !mm || !yyyy) return new Date().toISOString();
  return new Date(Date.UTC(yyyy, mm - 1, dd)).toISOString();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = (newsHyundai as any[]).find((n) => n.id === id);
  if (!item) {
    return {
      title: "Tin tức",
      description: "Bài viết tin tức Hyundai.",
    };
  }

  return {
    title: item.title,
    description: item.excerpt ?? "Bài viết tin tức Hyundai.",
    alternates: {
      canonical: `/tin-tuc/${item.id}`,
    },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt ?? "Bài viết tin tức Hyundai.",
      url: `/tin-tuc/${item.id}`,
      publishedTime: toIsoDate(item.date),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = (newsHyundai as any[]).find((n) => n.id === id);
  if (!item) notFound();

  const images = await getNewsImages(Number(item.newsNo));
  const hero = images[0] ?? null;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt ?? "",
    datePublished: toIsoDate(item.date),
    dateModified: toIsoDate(item.date),
    author: {
      "@type": "Organization",
      name: item.source || "Hyundai Gia Lai",
    },
    publisher: {
      "@type": "Organization",
      name: "Hyundai Gia Lai",
    },
    image: hero
      ? [`https://www.hyundaigialaiofficial.com.vn${hero}`]
      : undefined,
    mainEntityOfPage: `https://www.hyundaigialaiofficial.com.vn/tin-tuc/${item.id}`,
  };

  return (
    <section className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-700">
          Trang chủ
        </Link>{" "}
        <span className="px-1">›</span>
        <Link href="/tin-tuc" className="hover:text-zinc-700">
          Tin tức
        </Link>{" "}
        <span className="px-1">›</span>
        <span className="font-medium text-zinc-700">Chi tiết</span>
      </div>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <span className="rounded-full bg-zinc-100 px-2 py-1 font-semibold text-zinc-600">
            {item.category}
          </span>
          <span>•</span>
          <span>{item.date}</span>
          {item.source ? (
            <>
              <span>•</span>
              <span>{item.source}</span>
            </>
          ) : null}
        </div>

        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
          {item.title}
        </h1>

        {item.byline ? (
          <div className="mt-2 text-sm font-semibold text-zinc-500">
            {item.byline}
          </div>
        ) : null}
      </header>

      {hero ? (
        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100">
          <Image
            src={hero}
            alt={item.title}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <article className="prose prose-zinc mt-8 max-w-none prose-headings:tracking-tight">
        {Array.isArray(item.content)
          ? item.content.map((line: string, idx: number) => {
              if (!line) return <div key={idx} className="h-3" />;

              if (isHeading(line)) {
                return (
                  <h2 key={idx} className="mt-6 text-lg font-extrabold">
                    {line}
                  </h2>
                );
              }

              return (
                <p key={idx} className="my-3 leading-7">
                  {line}
                </p>
              );
            })
          : null}
      </article>

      {images.length > 1 ? (
        <section className="mt-10">
          <h2 className="text-lg font-extrabold text-zinc-900">Hình ảnh</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {images.slice(1).map((src) => (
              <div
                key={src}
                className="relative aspect-16/10 overflow-hidden rounded-xl bg-zinc-100"
              >
                <Image
                  src={src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}

