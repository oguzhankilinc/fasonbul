import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SECTORS, CITIES, JOB_STATUS, ITEMS_PER_PAGE, getSectorLabel, getCityLabel } from "@/lib/constants";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "Tüm Fason İş İlanları 2026 | Türkiye Geneli Fason Üretim Fırsatları",
  description:
    "Türkiye genelinde tüm fason iş ilanlarını keşfedin. Otomotiv, mobilya, tekstil, kimya, baskı, paketleme ve el işi sektörlerinde fason üretim fırsatları. Komisyonsuz, aracısız, ücretsiz fason iş platformu.",
  keywords: [
    "fason iş ilanları",
    "fason üretim",
    "fason iş",
    "fason atölye",
    "fason üretici",
    "fason imalat",
    "türkiye fason",
    "ücretsiz fason ilan",
  ],
  openGraph: {
    title: "Tüm Fason İş İlanları | FasonBul",
    description:
      "Türkiye genelinde tüm fason iş ilanlarını keşfedin. 7 sektörde komisyonsuz fason üretim fırsatları.",
    type: "website",
    url: "https://fasonbul.com/ilanlar",
  },
  twitter: {
    card: "summary",
    title: "Tüm Fason İş İlanları | FasonBul",
    description: "Türkiye genelinde fason iş ilanları. Komisyon yok, aracı yok!",
  },
  alternates: {
    canonical: "https://fasonbul.com/ilanlar",
  },
};

interface ListingsPageProps {
  searchParams: Promise<{
    sector?: string;
    city?: string;
    sayfa?: string;
  }>;
}

interface Job {
  id: string;
  title: string;
  description: string;
  sector: string;
  city: string;
  urgency: string | null;
  imageUrl: string | null;
  createdAt: Date;
  expiresAt: Date | null;
  isFeatured: boolean;
}

// Popular cities for internal linking
const popularCities = CITIES.filter((c) =>
  ["istanbul", "izmir", "bursa", "ankara", "kocaeli", "gaziantep", "denizli", "konya"].includes(c.value)
);

async function getJobs(
  sector?: string,
  city?: string,
  page: number = 1
): Promise<{ jobs: Job[]; total: number; totalPages: number }> {
  const where: {
    status: string;
    sector?: string;
    city?: string;
  } = {
    status: JOB_STATUS.ACTIVE,
  };

  if (sector) {
    where.sector = sector;
  }

  if (city) {
    where.city = city;
  }

  const [jobs, total] = await Promise.all([
    prisma.jobRequest.findMany({
      where,
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      select: {
        id: true,
        title: true,
        description: true,
        sector: true,
        city: true,
        urgency: true,
        imageUrl: true,
        createdAt: true,
        expiresAt: true,
        isFeatured: true,
      },
    }),
    prisma.jobRequest.count({ where }),
  ]);

  return {
    jobs,
    total,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
  };
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const page = params.sayfa ? parseInt(params.sayfa, 10) : 1;
  const { jobs, total, totalPages } = await getJobs(params.sector, params.city, page);

  // Build title based on filters
  let pageTitle = "Tüm Fason İş İlanları";
  const filterParts: string[] = [];

  if (params.sector) {
    filterParts.push(getSectorLabel(params.sector));
  }
  if (params.city) {
    filterParts.push(getCityLabel(params.city));
  }

  if (filterParts.length > 0) {
    pageTitle = `${filterParts.join(" - ")} Fason İş İlanları`;
  }

  // Build search params object for pagination
  const paginationParams: Record<string, string> = {};
  if (params.sector) paginationParams.sector = params.sector;
  if (params.city) paginationParams.city = params.city;

  // ItemList Schema for SEO
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageTitle,
    numberOfItems: total,
    itemListElement: jobs.map((job, index) => ({
      "@type": "ListItem",
      position: (page - 1) * ITEMS_PER_PAGE + index + 1,
      url: `https://fasonbul.com/ilan/${job.id}`,
      name: job.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container-custom py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-secondary text-lg">
            {total > 0 ? (
              <>
                <span className="font-bold text-foreground">{total}</span> fason iş ilanı bulundu
                {page > 1 && (
                  <span className="text-secondary-light"> (Sayfa {page}/{totalPages})</span>
                )}
              </>
            ) : (
              "Aradığınız kriterlere uygun ilan bulunamadı"
            )}
          </p>
        </div>

        {/* Filters */}
        <Suspense fallback={<div className="h-28 bg-muted rounded-2xl animate-pulse" />}>
          <JobFilters basePath="/ilanlar" />
        </Suspense>

        {/* Job Listings */}
        {jobs.length > 0 ? (
          <JobList jobs={jobs} />
        ) : (
          <div className="text-center py-16 card">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              İlan bulunamadı
            </h3>
            <p className="text-secondary mb-8 max-w-md mx-auto">
              Filtreleri değiştirerek farklı kriterlerde arama yapabilir veya tüm ilanları görüntüleyebilirsiniz.
            </p>
            <Link href="/ilanlar" className="btn-primary">
              Tüm İlanları Gör
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 pt-8 border-t border-border">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/ilanlar"
              searchParams={paginationParams}
            />
          </div>
        )}

        {/* Internal Links - Sectors */}
        <section className="mt-14 pt-10 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Sektörlere Göre Fason İş İlanları
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {SECTORS.map((sector) => (
              <Link
                key={sector.value}
                href={`/kategori/${sector.value}`}
                className="flex flex-col items-center p-4 rounded-xl border border-border bg-white hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {sector.icon}
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center">
                  {sector.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Internal Links - Cities */}
        <section className="mt-10 pt-8 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Popüler Şehirlerde Fason İş İlanları
          </h2>
          <div className="flex flex-wrap gap-3">
            {popularCities.map((city) => (
              <Link
                key={city.value}
                href={`/sehir/${city.value}`}
                className="px-5 py-2.5 rounded-full border border-border bg-white text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary hover:bg-primary-light transition-all"
              >
                {city.label}
              </Link>
            ))}
            <span className="px-5 py-2.5 rounded-full bg-muted text-sm text-secondary">
              ve 73 şehir daha...
            </span>
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-14 pt-10 border-t border-border">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Fason İş İlanları Hakkında
            </h2>
            <div className="prose prose-sm max-w-none text-secondary space-y-4">
              <p>
                <strong className="text-foreground">FasonBul</strong>, Türkiye&apos;nin en kapsamlı fason iş
                ilanları platformudur. 7 farklı sektörde (otomotiv, mobilya, tekstil, kimya, baskı, paketleme,
                el işi) fason üretim taleplerini ve fırsatlarını tek bir çatı altında topluyoruz.
              </p>
              <p>
                İster fason iş vermek isteyen bir iş sahibi, ister fason üretim kapasitesi arayan bir
                üretici olun; <strong className="text-foreground">komisyon ödemeden, aracı kullanmadan</strong>,
                doğrudan iletişim kurarak iş ortağınızı bulabilirsiniz.
              </p>
              <p>
                Platformumuz <strong className="text-primary">sonsuza kadar ücretsizdir</strong>. İlan vermek,
                ilan görüntülemek ve iletişim kurmak için hiçbir ücret ödemeniz gerekmez.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
