import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CITIES, SECTORS, JOB_STATUS, ITEMS_PER_PAGE } from "@/lib/constants";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import Pagination from "@/components/ui/Pagination";

interface CityPageProps {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ sayfa?: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    city: city.value,
  }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = CITIES.find((c) => c.value === city);

  if (!cityData) {
    return { title: "Şehir Bulunamadı" };
  }

  const title = `${cityData.label} Fason İş İlanları 2026 | Fason Üretim ${cityData.label}`;
  const description = `${cityData.label} ilinde güncel fason iş ilanları. Otomotiv, mobilya, tekstil, kimya, baskı, paketleme ve el işi sektörlerinde ${cityData.label} fason üreticileri bulun. Komisyon yok, aracı yok.`;

  return {
    title,
    description,
    keywords: [
      `${cityData.label.toLowerCase()} fason`,
      `${cityData.label.toLowerCase()} fason üretim`,
      `${cityData.label.toLowerCase()} fason iş ilanları`,
      `${cityData.label.toLowerCase()} fason atölye`,
      "fason iş",
      "fason üretici",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://fasonbul.com/sehir/${city}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://fasonbul.com/sehir/${city}`,
    },
  };
}

export default async function CityPage({ params, searchParams }: CityPageProps) {
  const { city } = await params;
  const { sayfa } = await searchParams;
  const cityData = CITIES.find((c) => c.value === city);

  if (!cityData) {
    notFound();
  }

  const page = sayfa ? parseInt(sayfa, 10) : 1;

  const [jobs, total] = await Promise.all([
    prisma.jobRequest.findMany({
      where: {
        status: JOB_STATUS.ACTIVE,
        city,
      },
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
    prisma.jobRequest.count({
      where: {
        status: JOB_STATUS.ACTIVE,
        city,
      },
    }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://fasonbul.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "İlanlar",
        item: "https://fasonbul.com/ilanlar",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityData.label,
        item: `https://fasonbul.com/sehir/${city}`,
      },
    ],
  };

  // ItemList Schema for job listings
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cityData.label} Fason İş İlanları`,
    numberOfItems: total,
    itemListElement: jobs.map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://fasonbul.com/ilan/${job.id}`,
      name: job.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/ilanlar" className="hover:text-primary">İlanlar</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{cityData.label}</span>
        </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {cityData.label} Fason İş İlanları
        </h1>
        <p className="text-secondary max-w-2xl">
          {cityData.label} ilindeki en güncel fason iş ilanlarını keşfedin.
          Otomotiv, mobilya, tekstil ve daha fazlası için yerel fason üreticileri bulun.
        </p>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-24 bg-muted rounded-2xl animate-pulse" />}>
        <JobFilters basePath={`/sehir/${city}`} />
      </Suspense>

      {/* Job Count */}
      <div className="mb-4">
        <p className="text-sm text-secondary">
          <span className="font-semibold text-foreground">{total}</span>{" "}
          ilan {cityData.label} ilinde bulundu
          {page > 1 && ` (Sayfa ${page}/${totalPages})`}
        </p>
      </div>

      {/* Job Listings */}
      <JobList jobs={jobs} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 pt-6 border-t border-border">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/sehir/${city}`}
          />
        </div>
      )}

        {/* SEO Content */}
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {cityData.label} Fason Üretim
          </h2>
          <div className="prose prose-sm max-w-none text-secondary">
            <p>
              {cityData.label}, Türkiye&apos;nin önemli üretim merkezlerinden
              biridir. FasonBul platformu olarak, {cityData.label} ilindeki fason
              iş sahipleri ile fason üreticileri bir araya getiriyoruz.
            </p>
            <p className="mt-4">
              {cityData.label} fason iş ilanlarımız düzenli olarak güncellenir.
              Yerel üreticilerle çalışarak lojistik avantajından faydalanın.
              <strong> Komisyon yok, aracılık yok</strong> – doğrudan iletişim kurun.
            </p>
          </div>

          {/* Internal Links - Sectors */}
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Sektörlere Göre Ara</h3>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((sector) => (
                <Link
                  key={sector.value}
                  href={`/kategori/${sector.value}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted text-secondary hover:bg-primary-light hover:text-primary transition-colors"
                >
                  {sector.icon} {sector.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
