import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SECTORS, JOB_STATUS, ITEMS_PER_PAGE } from "@/lib/constants";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import Pagination from "@/components/ui/Pagination";

interface SectorPageProps {
  params: Promise<{ sector: string }>;
  searchParams: Promise<{ sayfa?: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((sector) => ({
    sector: sector.value,
  }));
}

export async function generateMetadata({
  params,
}: SectorPageProps): Promise<Metadata> {
  const { sector } = await params;
  const sectorData = SECTORS.find((s) => s.value === sector);

  if (!sectorData) {
    return { title: "Sektör Bulunamadı" };
  }

  const title = `${sectorData.label} Fason İş İlanları 2026 | Türkiye Fason Üretim`;
  const description = `${sectorData.label} sektöründe güncel fason iş ilanları. ${sectorData.label} fason üretim yapan atölyeler ve fason üreticileri bulun. Komisyon yok, aracı yok, doğrudan iletişim. FasonBul ile fason üretimin adresi.`;

  return {
    title,
    description,
    keywords: [
      `${sectorData.label.toLowerCase()} fason`,
      `${sectorData.label.toLowerCase()} fason üretim`,
      `${sectorData.label.toLowerCase()} fason iş ilanları`,
      `${sectorData.label.toLowerCase()} fason atölye`,
      "fason iş",
      "fason üretici",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://fasonbul.com/kategori/${sector}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://fasonbul.com/kategori/${sector}`,
    },
  };
}

export default async function SectorPage({ params, searchParams }: SectorPageProps) {
  const { sector } = await params;
  const { sayfa } = await searchParams;
  const sectorData = SECTORS.find((s) => s.value === sector);

  if (!sectorData) {
    notFound();
  }

  const page = sayfa ? parseInt(sayfa, 10) : 1;

  const [jobs, total] = await Promise.all([
    prisma.jobRequest.findMany({
      where: {
        status: JOB_STATUS.ACTIVE,
        sector,
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
      },
    }),
    prisma.jobRequest.count({
      where: {
        status: JOB_STATUS.ACTIVE,
        sector,
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
        name: sectorData.label,
        item: `https://fasonbul.com/kategori/${sector}`,
      },
    ],
  };

  // ItemList Schema for job listings
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${sectorData.label} Fason İş İlanları`,
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
          <span className="text-foreground">{sectorData.label}</span>
        </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{sectorData.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {sectorData.label} Fason İş İlanları
          </h1>
        </div>
        <p className="text-secondary max-w-2xl">
          {sectorData.label} sektöründe en güncel fason iş ilanlarını keşfedin.
          Türkiye genelinde {sectorData.label.toLowerCase()} fason üretim yapan
          fason üreticileri ve iş sahiplerini bulun.
        </p>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-24 bg-muted rounded-2xl animate-pulse" />}>
        <JobFilters basePath={`/kategori/${sector}`} />
      </Suspense>

      {/* Job Count */}
      <div className="mb-4">
        <p className="text-sm text-secondary">
          <span className="font-semibold text-foreground">{total}</span>{" "}
          {sectorData.label.toLowerCase()} ilanı bulundu
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
            basePath={`/kategori/${sector}`}
          />
        </div>
      )}

        {/* SEO Content */}
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {sectorData.label} Fason Üretim
          </h2>
          <div className="prose prose-sm max-w-none text-secondary">
            <p>
              {sectorData.label} sektöründe fason üretim, işletmelerin üretim
              kapasitelerini esnek bir şekilde yönetmelerine olanak tanır.
              FasonBul platformu olarak, {sectorData.label.toLowerCase()} alanında
              fason iş sahipleri ile fason üreticileri bir araya getiriyoruz.
            </p>
            <p className="mt-4">
              {sectorData.label} fason iş ilanlarımız düzenli olarak güncellenir.
              İster iş verin ister iş alın, FasonBul ile doğru iş ortağınızı
              kolayca bulabilirsiniz. <strong>Komisyon yok, aracılık yok</strong> –
              doğrudan iletişim kurarak anlaşmanızı yapın.
            </p>
          </div>

          {/* Internal Links */}
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Diğer Sektörler</h3>
            <div className="flex flex-wrap gap-2">
              {SECTORS.filter(s => s.value !== sector).slice(0, 6).map((s) => (
                <Link
                  key={s.value}
                  href={`/kategori/${s.value}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted text-secondary hover:bg-primary-light hover:text-primary transition-colors"
                >
                  {s.icon} {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
