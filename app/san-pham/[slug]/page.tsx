import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/app/data/productData";

const BASE_URL = "https://www.hyundaigialaiofficial.com.vn";

const productBannerMap: Record<string, string> = {
  accent: "/product-banner/accent-hero.jpg",
  creta: "/product-banner/creta-hero.jpg",
  custin: "/product-banner/custin.jpg",
  elentra: "/product-banner/elentra-hero.jpg",
  "i10-hatchback": "/product-banner/i10-hero.jpg",
  i10: "/product-banner/i10sedan-hero.jpg",
  palisade: "/product-banner/palisade-hero.jpg",
  santafe: "/product-banner/santafe-hero.jpg",
  stargazer: "/product-banner/star-hero.jpg",
  tucson: "/product-banner/tucson-hero.jpg",
  venue: "/product-banner/venue-hero.jpg",
  ioniq5: "/product-banner/ioniq.jpg",
};

const sectionMeta: Record<string, { label: string }> = {
  highlights: {
    label: "Nổi bật",
  },
  ngoaithat: {
    label: "Ngoại thất",
  },
  noithat: {
    label: "Nội thất",
  },
  vanhanh: {
    label: "Vận hành",
  },
  antoan: {
    label: "An toàn",
  },
  tiennghi: {
    label: "Tiện nghi",
  },
  thongso: {
    label: "Thông số xe",
  },
};

type DetailSection = {
  key: string;
  label: string;
  title: string;
  summary: string;
  images: Array<{ src: string; caption: string }>;
};

type ProductRecord = Record<string, unknown> & {
  name?: string;
  price?: string;
  variants?: Array<{ name?: string; price?: string }>;
  specs?: Record<string, string>;
  highlight?: {
    videoId?: string | null;
  };
};

function normalizeImagePath(src?: string | null) {
  if (!src) return null;
  if (src.startsWith("/images/")) return src.replace("/images", "");
  return src;
}

function collectSectionImages(
  sectionData: Record<string, unknown> | undefined,
) {
  if (!sectionData || typeof sectionData !== "object") return [];

  const images: Array<{ src: string; caption: string }> = [];
  const add = (value?: string | null, caption?: string | null) => {
    const normalized = normalizeImagePath(value);
    if (!normalized) return;
    if (images.some((item) => item.src === normalized)) return;
    images.push({
      src: normalized,
      caption: caption?.trim() || "Hình ảnh chi tiết sản phẩm",
    });
  };

  const lead = sectionData.lead as
    | { image?: string; caption?: string; title?: string }
    | Array<{ image?: string; caption?: string; title?: string }>
    | undefined;
  if (Array.isArray(lead)) {
    lead.forEach((item) => add(item?.image, item?.caption ?? item?.title));
  } else {
    add(lead?.image, lead?.caption ?? lead?.title);
  }

  const cards = sectionData.cards as
    | Array<{ img?: string; caption?: string }>
    | undefined;
  cards?.forEach((item) => add(item?.img, item?.caption));

  const grid4 = sectionData.grid4 as
    | Array<{ img?: string; caption?: string }>
    | undefined;
  grid4?.forEach((item) => add(item?.img, item?.caption));

  const twoCards = sectionData.twoCards as
    | Array<{ img?: string; caption?: string }>
    | undefined;
  twoCards?.forEach((item) => add(item?.img, item?.caption));

  const midBlock = sectionData.midBlock as
    | { image?: string; title?: string; thumbs?: string[] }
    | undefined;
  add(midBlock?.image, midBlock?.title);
  midBlock?.thumbs?.forEach((thumb) => add(thumb, midBlock?.title));

  const tailBlock = sectionData.tailBlock as
    | { hero?: string; title?: string; thumbs?: string[] }
    | undefined;
  add(tailBlock?.hero, tailBlock?.title);
  tailBlock?.thumbs?.forEach((thumb) => add(thumb, tailBlock?.title));

  const hero = sectionData.hero as string | undefined;
  add(hero, "Hình ảnh nổi bật");

  return images;
}

function mapDataKey(slug: string) {
  const slugToDataKey: Record<string, string> = {
    "i10-hatchback": "i10hatchback",
    i10: "i10sedan",
    stargazer: "stargazer",
    ioniq5: "ioniq5",
  };
  return slugToDataKey[slug] ?? slug;
}

function getDetailData(slug: string) {
  const dataKey = mapDataKey(slug);
  const product = (products as Record<string, ProductRecord | undefined>)[
    dataKey
  ];
  if (!product) return null;

  const sectionConfigs: Array<{ key: string; sourceKey: string }> = [
    { key: "highlights", sourceKey: "highlight" },
    { key: "ngoaithat", sourceKey: "exterior" },
    { key: "noithat", sourceKey: "interior" },
    { key: "vanhanh", sourceKey: "performance" },
    { key: "antoan", sourceKey: "safety" },
    { key: "tiennghi", sourceKey: "comfort" },
    { key: "thongso", sourceKey: "specBlock" },
  ];

  const sections: DetailSection[] = sectionConfigs
    .map(({ key, sourceKey }) => {
      const source = product[sourceKey] as Record<string, unknown> | undefined;
      if (!source) return null;

      const header = source.header as
        | { title?: string; body?: string }
        | undefined;
      const intro = source.intro as
        | { title?: string; body?: string }
        | undefined;
      const images = collectSectionImages(source);

      if (images.length === 0 && !header?.body && !intro?.body) return null;

      return {
        key,
        label: sectionMeta[key]?.label ?? key,
        title: header?.title ?? intro?.title ?? sectionMeta[key]?.label ?? key,
        summary: header?.body ?? intro?.body ?? "",
        images,
      };
    })
    .filter(Boolean) as DetailSection[];

  return {
    dataKey,
    product,
    sections,
  };
}

export async function generateStaticParams() {
  const dataKeyToSlug: Record<string, string> = {
    i10hatchback: "i10-hatchback",
    i10sedan: "i10",
  };
  return Object.keys(products).map((key) => ({
    slug: dataKeyToSlug[key] ?? key,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detailData = getDetailData(slug);
  const name = detailData?.product?.name ?? slug;
  const description = `Chi tiết mẫu xe ${name} tại Hyundai Gia Lai`;
  const highlightImg =
    detailData?.sections.find((section) => section.key === "highlights")
      ?.images[0] ?? detailData?.sections[0]?.images[0];
  const image =
    productBannerMap[slug] ?? highlightImg?.src;

  return {
    title: name,
    description,
    alternates: {
      canonical: `/san-pham/${slug}`,
    },
    openGraph: {
      type: "website",
      title: `${name} | Hyundai Gia Lai`,
      description,
      url: `/san-pham/${slug}`,
      images: image ? [`${BASE_URL}${image}`] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Hyundai Gia Lai`,
      description,
      images: image ? [`${BASE_URL}${image}`] : undefined,
    },
  };
}

export default async function CarDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const detailData = getDetailData(slug);
  if (!detailData) notFound();

  const carName = detailData.product.name;
  const sections = detailData.sections;
  const heroImage =
    sections.find((section) => section.key === "highlights")?.images[0] ??
    sections[0]?.images[0];
  const bannerImage = productBannerMap[slug] ?? heroImage?.src;
  const visibleTabs = sections.map((section) => ({
    key: section.key,
    label: sectionMeta[section.key]?.label ?? section.label,
  }));
  const videoId = detailData.product.highlight?.videoId;
  const youtubeUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : null;
  const youtubeEmbedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    : null;
  const tabParam = Array.isArray(sp.tab) ? sp.tab[0] : sp.tab;
  const activeSection =
    sections.find((section) => section.key === tabParam) ?? sections[0];
  const variants = (detailData.product.variants ?? []) as Array<{
    name?: string;
    price?: string;
  }>;
  const specs = (detailData.product.specs ?? {}) as Record<string, string>;
  const price =
    variants.find((variant) => variant.price)?.price ??
    detailData.product.price;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: carName,
    description: activeSection?.summary || `Thông tin chi tiết ${carName}`,
    image: bannerImage ? [`${BASE_URL}${bannerImage}`] : undefined,
    brand: {
      "@type": "Brand",
      name: "Hyundai",
    },
    offers: price
      ? {
          "@type": "Offer",
          priceCurrency: "VND",
          price: String(price).replace(/[^\d]/g, "") || undefined,
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/san-pham/${slug}`,
        }
      : undefined,
  };

  return (
    <section className="w-full bg-zinc-100 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto w-full max-w-[1280px] px-4 py-4 sm:px-6 sm:py-5">
        <div className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-700">
            Trang chủ
          </Link>{" "}
          <span className="px-1">›</span>
          <Link href="/san-pham" className="hover:text-zinc-700">
            Sản phẩm
          </Link>{" "}
          <span className="px-1">›</span>
          <span className="font-semibold text-zinc-700">{carName}</span>
        </div>
      </div>

      {bannerImage && (
        <div className="relative h-[210px] w-full overflow-hidden sm:h-[300px] lg:h-[460px]">
          <Image
            src={bannerImage}
            alt={`${carName} banner`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="w-full bg-[#0f3167] text-white">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-45">
            <div>
              <h1 className="text-4xl font-extrabold text-white">{carName}</h1>
            </div>

            <nav
              aria-label="Chi tiết xe"
              className="flex items-center gap-4 overflow-x-auto sm:gap-6"
            >
              {visibleTabs.map((tab) => (
                <Link
                  key={tab.key}
                  href={`/san-pham/${slug}?tab=${tab.key}`}
                  className={`whitespace-nowrap border-b-2 pb-2 text-base font-semibold transition ${
                    tab.key === activeSection?.key
                      ? "border-cyan-300 text-cyan-200"
                      : "border-transparent text-white/90 hover:text-white"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}

              <a
                href="/lien-he"
                className="ml-2 inline-flex whitespace-nowrap rounded-md bg-white px-5 py-2.5 text-base font-semibold text-[#0f3167] transition hover:bg-zinc-100"
              >
                Liên hệ đặt hàng
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6">
        <div className="mt-6 space-y-6">
          {variants.length > 0 && (
            <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 sm:p-6">
              <h2 className="text-2xl font-extrabold text-zinc-900">
                Phiên bản & giá
              </h2>
              <div className="mt-4 space-y-2">
                {variants.map((variant) => (
                  <div
                    key={`${variant.name}-${variant.price}`}
                    className="flex flex-col justify-between rounded-lg bg-zinc-50 px-4 py-3 text-sm text-zinc-700 sm:flex-row sm:items-center"
                  >
                    <span className="font-semibold">{variant.name}</span>
                    <span className="text-blue-900">{variant.price}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {activeSection && (
            <article
              key={activeSection.key}
              id={activeSection.key}
              className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 sm:p-6"
            >
              <h2 className="text-2xl font-extrabold text-zinc-900">
                {activeSection.title}
              </h2>
              {activeSection.summary && (
                <p className="mt-2 w-full text-sm leading-relaxed text-zinc-600">
                  {activeSection.summary}
                </p>
              )}

              {activeSection.images.length > 0 && (
                <div
                  className={`mt-5 grid gap-4 ${
                    activeSection.key === "thongso"
                      ? "grid-cols-1"
                      : activeSection.images.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {activeSection.images.map((imageItem) => (
                    <figure
                      key={imageItem.src}
                      className="overflow-hidden rounded-xl bg-zinc-100"
                    >
                      {activeSection.key === "thongso" ? (
                        <Image
                          src={imageItem.src}
                          alt={`${carName} ${activeSection.label}`}
                          width={1600}
                          height={2400}
                          sizes="100vw"
                          className="h-auto w-full object-contain"
                        />
                      ) : (
                        <div
                          className={`relative ${
                            activeSection.images.length === 1
                              ? "h-[260px] sm:h-[380px] lg:h-[520px]"
                              : "h-[220px]"
                          }`}
                        >
                          <Image
                            src={imageItem.src}
                            alt={`${carName} ${activeSection.label}`}
                            fill
                            sizes={
                              activeSection.images.length === 1
                                ? "100vw"
                                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            }
                            className="object-cover"
                          />
                        </div>
                      )}
                      <figcaption className="border-t border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
                        {imageItem.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </article>
          )}

          {activeSection?.key === "thongso" &&
            Object.keys(specs).length > 0 && (
              <article
                id="thong-so-ky-thuat"
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 sm:p-6"
              >
                <h2 className="text-2xl font-extrabold text-zinc-900">
                  Thông số kỹ thuật
                </h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200">
                  {Object.entries(specs).map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-1 border-b border-zinc-200 bg-white px-4 py-3 text-sm last:border-b-0 sm:grid-cols-2"
                    >
                      <span className="font-semibold text-zinc-700">
                        {label}
                      </span>
                      <span className="text-zinc-600">{value}</span>
                    </div>
                  ))}
                </div>
              </article>
            )}

          {youtubeUrl && (
            <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 sm:p-6">
              <h2 className="text-2xl font-extrabold text-zinc-900">
                Video giới thiệu
              </h2>

              {youtubeEmbedUrl && (
                <div className="mt-4 overflow-hidden rounded-xl bg-black">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={youtubeEmbedUrl}
                      title={`Video giới thiệu ${carName}`}
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
