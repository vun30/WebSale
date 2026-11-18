import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import HeroSlider from "./components/HeroSlider";
import ProductGrid from "./components/ProductGrid";
import PromoBar from "./components/PromoBar";
import LocationSection from "./components/LocationSection";
import HomeNewsSection from "./components/HomeNewsSection";
import HomeServiceSection from "./components/HomeServiceSection";

const homeUrl = "https://www.hyundaigialaiofficial.com.vn/";
const siteName = "Hyundai Gia Lai";
const homeTitle = `${siteName} | Đại lý Hyundai Chính Hãng`;

export const metadata: Metadata = {
  title: homeTitle,
  description:
    "Hyundai Gia Lai – Đại lý xe Hyundai, cập nhật bảng giá, giá lăn bánh, chương trình ưu đãi và hỗ trợ mua xe trả góp.",
  alternates: {
    canonical: homeUrl,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName,
    title: homeTitle,
    description:
      "Khám phá các dòng xe Hyundai, ưu đãi mới nhất và đăng ký lái thử tại Hyundai Gia Lai.",
    url: homeUrl,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: "Hyundai Gia Lai Chính Hãng",
  url: homeUrl,
  publisher: {
    "@type": "Organization",
    name: siteName,
  },
};

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const productNameMap: Record<string, string> = {
  accent: "All New Accent",
  creta: "Creta",
  custin: "Custin",
  elentra: "Elantra",
  "i10-hatchback": "Grand i10 Hatchback",
  i10: "Grand i10 Sedan",
  ioniq5: "IONIQ 5",
  palisade: "Palisade",
  santafe: "Santa Fe",
  stargazer: "Stargazer X",
  tucson: "Tucson",
  venue: "Venue",
};

const productPriceMap: Record<string, string> = {
  accent: "Giá: từ 455 triệu",
  creta: "Giá: từ 599 triệu",
  custin: "Giá: từ 1,19 tỷ",
  elentra: "Giá: từ 769 triệu",
  "i10-hatchback": "Giá: từ 360 triệu",
  i10: "Giá: từ 380 triệu",
  ioniq5: "Giá: từ 1,3 tỷ",
  palisade: "Giá: từ 1,589 tỷ",
  santafe: "Giá: từ 1,056 tỷ",
  stargazer: "Giá: từ 620 triệu",
  tucson: "Giá: từ 825 triệu",
  venue: "Giá: từ 499 triệu",
};

async function getSlideImages() {
  const slidesDir = path.join(process.cwd(), "public", "slides");

  try {
    const files = await readdir(slidesDir, { withFileTypes: true });

    return files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => `/slides/${encodeURIComponent(fileName)}`);
  } catch {
    return [];
  }
}

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

        return {
          slug,
          image: `/product/${encodeURIComponent(fileName)}`,
          name: productNameMap[slug] ?? toTitleCase(slug),
          price: productPriceMap[slug] ?? "Giá: Liên hệ",
        };
      });
  } catch {
    return [];
  }
}

async function getPictures() {
  const picturesDir = path.join(process.cwd(), "public", "picture");

  try {
    const files = await readdir(picturesDir, { withFileTypes: true });

    return files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => `/picture/${encodeURIComponent(fileName)}`);
  } catch {
    return [];
  }
}

export default async function Home() {
  const images = await getSlideImages();
  const products = await getProducts();
  const pictures = await getPictures();
  const address = "278 Lê Duẩn, An Phú, Pleiku, Gia Lai 600000, Việt Nam";

  return (
    <section className="pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="sr-only">{siteName}</h1>
      <HeroSlider images={images} />
      <PromoBar />
      <ProductGrid products={products} />
      <HomeNewsSection />
      <HomeServiceSection />
      <LocationSection address={address} images={pictures} />
    </section>
  );
}
