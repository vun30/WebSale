import type { MetadataRoute } from "next";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/gioi-thieu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/san-pham`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tin-tuc`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/dang-ky-lai-thu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lien-he`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const productPages: MetadataRoute.Sitemap = getProductSlugs().map((slug) => ({
    url: `${BASE_URL}/san-pham/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const newsPages: MetadataRoute.Sitemap = (newsHyundai as Array<{ id: string }>).map(
    (news) => ({
      url: `${BASE_URL}/tin-tuc/${news.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...productPages, ...newsPages];
}

