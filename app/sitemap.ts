import type { MetadataRoute } from "next";
import { stat } from "node:fs/promises";

import newsHyundai from "./data/newsHyundai";
import { products } from "./data/productData";

const BASE_URL = "https://www.hyundaigialaiofficial.com.vn";

function getProductSlugs() {
  const dataKeyToSlug: Record<string, string> = {
    i10hatchback: "i10-hatchback",
    i10sedan: "i10",
  };

  return Object.keys(products).map((key) => dataKeyToSlug[key] ?? key);
}

async function getLastModifiedFromAbsolute(absolutePath: string) {
  try {
    const fileStat = await stat(absolutePath);
    return fileStat.mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const root = process.cwd();
  const [
    homeLastModified,
    aboutLastModified,
    productsLastModified,
    newsLastModified,
    contactLastModified,
    testDriveLastModified,
  ] = await Promise.all([
    getLastModifiedFromAbsolute(`${root}/app/page.tsx`),
    getLastModifiedFromAbsolute(`${root}/app/gioi-thieu/page.tsx`),
    getLastModifiedFromAbsolute(`${root}/app/data/productData.js`),
    getLastModifiedFromAbsolute(`${root}/app/data/newsHyundai.js`),
    getLastModifiedFromAbsolute(`${root}/app/lien-he/page.tsx`),
    getLastModifiedFromAbsolute(`${root}/app/dang-ky-lai-thu/page.tsx`),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: homeLastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/gioi-thieu`,
      lastModified: aboutLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/san-pham`,
      lastModified: productsLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tin-tuc`,
      lastModified: newsLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dang-ky-lai-thu`,
      lastModified: testDriveLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lien-he`,
      lastModified: contactLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const productPages: MetadataRoute.Sitemap = getProductSlugs().map((slug) => ({
    url: `${BASE_URL}/san-pham/${slug}`,
    lastModified: productsLastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const newsPages: MetadataRoute.Sitemap = (newsHyundai as Array<{ id: string }>).map(
    (news) => ({
      url: `${BASE_URL}/tin-tuc/${news.id}`,
      lastModified: newsLastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...productPages, ...newsPages];
}

