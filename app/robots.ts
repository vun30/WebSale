import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/favicon.ico", "/*?tab="],
    },
    sitemap: "https://www.hyundaigialaiofficial.com.vn/sitemap.xml",
  };
}
