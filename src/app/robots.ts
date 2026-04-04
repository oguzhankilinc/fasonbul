import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://fasonbul.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/hesap/",
          "/admin/",
          "/api/",
          "/sifre-sifirla",
          "/sifremi-unuttum",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
