import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SECTORS, CITIES, JOB_STATUS } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://fasonbul.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Static pages
  routes.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  });

  routes.push({
    url: `${BASE_URL}/giris`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  });

  routes.push({
    url: `${BASE_URL}/kayit`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  });

  routes.push({
    url: `${BASE_URL}/ilanlar`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.9,
  });

  // Sector pages
  for (const sector of SECTORS) {
    routes.push({
      url: `${BASE_URL}/kategori/${sector.value}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // City pages
  for (const city of CITIES) {
    routes.push({
      url: `${BASE_URL}/sehir/${city.value}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // Combined sector-city pages (popular ones)
  const popularSectors = SECTORS.slice(0, 6);
  const popularCities = CITIES.filter((c) =>
    ["istanbul", "izmir", "bursa", "denizli", "gaziantep", "ankara"].includes(
      c.value
    )
  );

  for (const sector of popularSectors) {
    for (const city of popularCities) {
      routes.push({
        url: `${BASE_URL}/${sector.value}/${city.value}-fason-is-ilanlari`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
  }

  // Active job pages
  const jobs = await prisma.jobRequest.findMany({
    where: { status: JOB_STATUS.ACTIVE },
    select: { id: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
    take: 1000, // Limit to prevent too large sitemap
  });

  for (const job of jobs) {
    routes.push({
      url: `${BASE_URL}/ilan/${job.id}`,
      lastModified: job.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return routes;
}
