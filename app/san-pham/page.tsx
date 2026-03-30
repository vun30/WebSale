import { readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

type ProductType = "all" | "sedan" | "suv" | "mpv" | "electric";

const productNameMap: Record<string, string> = {
  accent: "Accent",
  creta: "Creta",
  custin: "Custin",
  elentra: "Elantra",
  "i10-hatchback": "Grand i10 Hatchback",
  i10: "Grand i10 Sedan",
  ioniq5: "IONIQ 5",
  palisade: "Palisade",
  santafe: "SantaFe",
  stargazer: "Stargazer X",
  tucson: "Tucson",
  venue: "Venue",
};

const productTypeMap: Record<string, Exclude<ProductType, "all">> = {
  accent: "sedan",
  elentra: "sedan",
  i10: "sedan",
  "i10-hatchback": "sedan",

  tucson: "suv",
  santafe: "suv",
  palisade: "suv",
  creta: "suv",
  venue: "suv",

  stargazer: "mpv",
  custin: "mpv",

  ioniq5: "electric",
};

const tabs: Array<{ label: string; type: ProductType }> = [
  { label: "Tất cả", type: "all" },
  { label: "Sedan", type: "sedan" },
  { label: "SUV", type: "suv" },
  { label: "MPV", type: "mpv" },
  { label: "Electric", type: "electric" },
];

function toTitleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function getProducts() {
  const productsDir = path.join(process.cwd(), "public", "product");

  try {
    const files = await readdir(productsDir, { withFileTypes: true });

    return files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => {
        const slug = path.basename(fileName, path.extname(fileName)).toLowerCase();
        const type = productTypeMap[slug] ?? "suv";

        return {
          slug,
          type,
          image: `/product/${encodeURIComponent(fileName)}`,
          name: productNameMap[slug] ?? toTitleCase(slug),
        };
      });
  } catch {
    return [];
  }
}

function isProductType(value: unknown): value is ProductType {
  return value === "all" || value === "sedan" || value === "suv" || value === "mpv" || value === "electric";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const typeParam = Array.isArray(sp.type) ? sp.type[0] : sp.type;
  const activeType: ProductType = isProductType(typeParam) ? typeParam : "all";

  const products = await getProducts();
  const filtered =
    activeType === "all" ? products : products.filter((p) => p.type === activeType);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-10">
      <div className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-700">
          Trang chủ
        </Link>{" "}
        <span className="px-1">›</span>
        <span className="font-medium text-zinc-700">Sản phẩm</span>
      </div>

      <div className="mt-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-800">Sản phẩm</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Khám phá các dòng xe Hyundai mới nhất tại Việt Nam
        </p>
      </div>

      <div className="mt-10 border-b border-zinc-200">
        <div className="mx-auto flex max-w-[920px] items-center justify-between">
          {tabs.map((tab) => {
            const isActive = tab.type === activeType;
            const href = tab.type === "all" ? "/san-pham" : `/san-pham?type=${tab.type}`;

            return (
              <Link
                key={tab.type}
                href={href}
                className={`flex-1 px-2 py-3 text-center text-sm font-semibold transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <article key={product.slug} className="text-center">
            <div className="relative mx-auto h-[170px] w-full max-w-[260px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-sm font-semibold text-zinc-700">
              {product.name}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

