import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  SECTORS,
  CITIES,
  JOB_STATUS,
  getSectorLabel,
  getCityLabel,
} from "@/lib/constants";
import JobFilters from "@/components/jobs/JobFilters";
import JobList from "@/components/jobs/JobList";
import { Suspense } from "react";

interface CombinedPageProps {
  params: Promise<{ sector: string; "city": string }>;
}

function extractCity(slug: string): string | null {
  // slug format: "istanbul-fason-is-ilanlari" -> "istanbul"
  const match = slug.match(/^(.+)-fason-is-ilanlari$/);
  return match ? match[1] : null;
}

export async function generateStaticParams() {
  const params: { sector: string; "city": string }[] = [];

  // Generate only for popular combinations to avoid too many pages
  const popularSectors = SECTORS.slice(0, 6);
  const popularCities = CITIES.filter((c) =>
    ["istanbul", "izmir", "bursa", "denizli", "gaziantep", "ankara"].includes(
      c.value
    )
  );

  for (const sector of popularSectors) {
    for (const city of popularCities) {
      params.push({
        sector: sector.value,
        "city": `${city.value}-fason-is-ilanlari`,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: CombinedPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const sectorData = SECTORS.find((s) => s.value === resolvedParams.sector);
  const citySlug = extractCity(resolvedParams["city"]);
  const cityData = citySlug ? CITIES.find((c) => c.value === citySlug) : null;

  if (!sectorData || !cityData) {
    return { title: "Sayfa Bulunamadı" };
  }

  const title = `${cityData.label} ${sectorData.label} Fason İş İlanları 2026 | FasonBul`;
  const description = `${cityData.label} ilinde ${sectorData.label.toLowerCase()} fason iş ilanları. ${cityData.label} ${sectorData.label.toLowerCase()} fason üretim yapan atölyeler ve iş sahiplerini bulun. Komisyon yok, aracı yok, doğrudan iletişim.`;
  const canonicalUrl = `https://fasonbul.com/${sectorData.value}/${cityData.value}-fason-is-ilanlari`;

  return {
    title,
    description,
    keywords: [
      `${cityData.label.toLowerCase()} ${sectorData.label.toLowerCase()} fason`,
      `${cityData.label.toLowerCase()} fason üretim`,
      `${sectorData.label.toLowerCase()} fason iş`,
      `${cityData.label.toLowerCase()} fason atölye`,
      "fason iş ilanları",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CombinedPage({ params }: CombinedPageProps) {
  const resolvedParams = await params;
  const sectorData = SECTORS.find((s) => s.value === resolvedParams.sector);
  const citySlug = extractCity(resolvedParams["city"]);
  const cityData = citySlug ? CITIES.find((c) => c.value === citySlug) : null;

  if (!sectorData || !cityData) {
    notFound();
  }

  const jobs = await prisma.jobRequest.findMany({
    where: {
      status: JOB_STATUS.ACTIVE,
      sector: sectorData.value,
      city: cityData.value,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      sector: true,
      city: true,
      urgency: true,
      createdAt: true,
      expiresAt: true,
    },
  });

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
        name: sectorData.label,
        item: `https://fasonbul.com/kategori/${sectorData.value}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityData.label,
        item: `https://fasonbul.com/sehir/${cityData.value}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${cityData.label} ${sectorData.label} İlanları`,
        item: `https://fasonbul.com/${sectorData.value}/${cityData.value}-fason-is-ilanlari`,
      },
    ],
  };

  // ItemList Schema for job listings
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cityData.label} ${sectorData.label} Fason İş İlanları`,
    numberOfItems: jobs.length,
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
          <Link href={`/kategori/${sectorData.value}`} className="hover:text-primary">{sectorData.label}</Link>
          <span className="mx-2">/</span>
          <Link href={`/sehir/${cityData.value}`} className="hover:text-primary">{cityData.label}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{sectorData.label} İlanları</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{sectorData.icon}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {cityData.label} {sectorData.label} Fason İş İlanları
            </h1>
          </div>
          <p className="text-secondary max-w-2xl">
            {cityData.label} ilinde {sectorData.label.toLowerCase()} sektöründeki
            en güncel fason iş ilanlarını keşfedin. Komisyon yok, aracı yok.
          </p>
        </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-24 bg-muted rounded-xl animate-pulse" />}>
        <JobFilters />
      </Suspense>

      {/* Job Count */}
      <div className="mb-4">
        <p className="text-sm text-secondary">
          <span className="font-semibold text-foreground">{jobs.length}</span>{" "}
          {sectorData.label.toLowerCase()} ilanı {cityData.label} ilinde bulundu
        </p>
      </div>

      {/* Job Listings */}
      <JobList jobs={jobs} />

        {/* SEO Content */}
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {cityData.label} {sectorData.label} Fason Üretim
          </h2>
          <div className="prose prose-sm max-w-none text-secondary">
            <p>
              {cityData.label} ili, {sectorData.label.toLowerCase()} sektöründe
              önemli bir üretim merkezidir. FasonBul platformu olarak,{" "}
              {cityData.label} ilindeki {sectorData.label.toLowerCase()} fason iş
              arayanları ve üreticileri bir araya getiriyoruz.
            </p>
            <p className="mt-4">
              {cityData.label} {sectorData.label.toLowerCase()} fason iş
              ilanlarımız düzenli olarak güncellenir. Yerel üreticilerle çalışarak
              hem kaliteli hem de uygun maliyetli üretim çözümleri bulun.
              <strong> Komisyon yok, aracılık yok</strong> – doğrudan iletişim kurun.
            </p>
          </div>

          {/* Related Links */}
          <div className="mt-6 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">{cityData.label} Diğer Sektörler</h3>
              <div className="flex flex-wrap gap-2">
                {SECTORS.filter(s => s.value !== sectorData.value).slice(0, 4).map((s) => (
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
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">{sectorData.label} Diğer Şehirler</h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.filter(c => c.value !== cityData.value && ["istanbul", "izmir", "bursa", "ankara", "kocaeli"].includes(c.value)).map((c) => (
                  <Link
                    key={c.value}
                    href={`/sehir/${c.value}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted text-secondary hover:bg-primary-light hover:text-primary transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
