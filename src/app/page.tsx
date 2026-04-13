import Link from "next/link";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import { SECTORS, CITIES, JOB_STATUS, FEATURED_PER_SECTOR, MAX_FEATURED_TOTAL } from "@/lib/constants";
import JobCard from "@/components/jobs/JobCard";
import TestimonialSection from "@/components/home/TestimonialSection";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

// Force dynamic rendering to always get fresh job data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "FasonBul - Türkiye'nin Fason Üretim Platformu | Fason İş İlanları 2026",
  description:
    "Türkiye'nin en kapsamlı fason iş ilanları platformu. Otomotiv, mobilya, tekstil, kimya, baskı, paketleme ve el işi sektörlerinde fason üretici ve iş sahiplerini buluşturuyoruz. Komisyon yok, aracı yok, sonsuza kadar ücretsiz. Hemen ücretsiz kayıt olun!",
  keywords: [
    "fason",
    "fason iş ilanları",
    "fason üretim",
    "fason üretici",
    "fason iş",
    "fason atölye",
    "fason imalat",
    "fason üretim talepleri",
    "otomotiv fason",
    "mobilya fason",
    "tekstil fason",
    "kimya fason",
    "paketleme fason",
    "baskı fason",
    "el işi fason",
    "fason iş ilanları 2026",
    "ücretsiz fason ilan",
  ],
  openGraph: {
    title: "FasonBul - Türkiye'nin Fason Üretim Platformu",
    description:
      "Fason iş ilanları verin veya arayın. 7 sektörde fason üretici ve iş sahiplerini buluşturuyoruz. Komisyon yok, aracı yok, sonsuza kadar ücretsiz!",
    type: "website",
    locale: "tr_TR",
    url: "https://fasonbul.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "FasonBul - Türkiye'nin Fason Üretim Platformu",
    description: "Fason iş ilanları platformu. 7 sektörde komisyonsuz, aracısız fason üretim buluşması.",
  },
  alternates: {
    canonical: "https://fasonbul.com",
  },
};

interface FeaturedJob {
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

async function getFeaturedJobs(): Promise<FeaturedJob[]> {
  // Opt out of caching to always get fresh data
  noStore();

  // Single deterministic query: featured jobs first, then recent active jobs
  // This ensures consistent ordering on every page load
  const jobs = await prisma.jobRequest.findMany({
    where: {
      status: JOB_STATUS.ACTIVE,
    },
    orderBy: [
      { isFeatured: "desc" },  // Featured first
      { createdAt: "desc" },   // Then by creation date
    ],
    take: MAX_FEATURED_TOTAL,
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
  });

  return jobs;
}

async function getStats() {
  const [totalJobs, totalCities, totalSectors] = await Promise.all([
    prisma.jobRequest.count({ where: { status: JOB_STATUS.ACTIVE } }),
    prisma.jobRequest.groupBy({
      by: ["city"],
      where: { status: JOB_STATUS.ACTIVE },
    }),
    prisma.jobRequest.groupBy({
      by: ["sector"],
      where: { status: JOB_STATUS.ACTIVE },
    }),
  ]);

  return {
    totalJobs,
    totalCities: totalCities.length,
    totalSectors: totalSectors.length,
  };
}

// Trust indicators for the trust block
const trustItems = [
  {
    icon: "💰",
    title: "Komisyon Yok",
    description: "Hiçbir işlemden kesinti yapılmaz",
  },
  {
    icon: "✨",
    title: "%100 Ücretsiz",
    description: "İlan vermek tamamen ücretsiz",
  },
  {
    icon: "🇹🇷",
    title: "Türkiye Geneli Ağ",
    description: "81 ilde üretici ağı",
  },
  {
    icon: "⚡",
    title: "Hızlı Eşleşme",
    description: "Dakikalar içinde ulaşın",
  },
];

// Popular cities for internal linking
const popularCities = CITIES.filter((c) =>
  ["istanbul", "izmir", "bursa", "ankara", "kocaeli", "gaziantep", "denizli", "konya"].includes(c.value)
);

export default async function HomePage() {
  const [jobs, stats] = await Promise.all([getFeaturedJobs(), getStats()]);

  const jobsBySector: Record<string, FeaturedJob[]> = {};
  for (const job of jobs) {
    if (!jobsBySector[job.sector]) {
      jobsBySector[job.sector] = [];
    }
    if (jobsBySector[job.sector].length < FEATURED_PER_SECTOR) {
      jobsBySector[job.sector].push(job);
    }
  }

  return (
    <div>
      {/* Hero Section - Conversion Focused */}
      <section className="hero-gradient py-16 md:py-24 border-b border-border">
        <div className="container-custom">
          {/* Main Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Fason İşlerinizi{" "}
              <span className="text-primary">Doğru Üreticiyle</span>{" "}
              Buluşturun
            </h1>
            <p className="text-lg md:text-xl text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
              Türkiye&apos;nin en hızlı büyüyen fason üretim platformu.{" "}
              <strong className="text-foreground">Ücretsiz ilan verin</strong>, doğru atölyeye ulaşın.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link href="/kayit" className="cta-primary group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ücretsiz İlan Ver
                <svg className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/ilanlar" className="cta-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                İlanları Keşfet
              </Link>
            </div>

            {/* Helper Text */}
            <p className="text-sm text-secondary">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                2 dakikada ilan oluştur
              </span>
            </p>
          </div>

          {/* Trust Block - 4 Column */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-16">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-5 text-center hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl md:text-4xl mb-3 block">{item.icon}</span>
                <h3 className="font-bold text-foreground text-sm md:text-base mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm text-secondary">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto">
            <div className="stat-card">
              <div className="stat-value text-primary">{stats.totalJobs}+</div>
              <div className="stat-label">Aktif İlan</div>
            </div>
            <div className="stat-card">
              <div className="stat-value text-primary">{stats.totalCities || 81}</div>
              <div className="stat-label">Şehir</div>
            </div>
            <div className="stat-card">
              <div className="stat-value text-primary">7</div>
              <div className="stat-label">Sektör</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings - Öne Çıkan İlanlar */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Öne Çıkan İlanlar
              </h2>
              <p className="text-secondary">
                En güncel ve aktif fason iş ilanları
              </p>
            </div>
            <Link href="/ilanlar" className="btn-primary hidden sm:inline-flex">
              Tüm İlanlar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Empty State or Job Listings */}
          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-br from-muted via-white to-primary-light/20 rounded-3xl border-2 border-dashed border-border">
              <div className="text-7xl mb-6">📭</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Henüz ilan yok
              </h3>
              <p className="text-secondary mb-8 max-w-md mx-auto text-lg">
                İlk ilanı sen ver, üreticiler sana ulaşsın.
              </p>
              <Link href="/kayit" className="cta-primary inline-flex">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ücretsiz İlan Ver
              </Link>
              <p className="text-sm text-secondary mt-4">
                Kayıt ol ve 2 dakikada ilanını oluştur
              </p>
            </div>
          ) : (
            <>
              {SECTORS.map((sector) => {
                const sectorJobs = jobsBySector[sector.value] || [];
                if (sectorJobs.length === 0) return null;

                return (
                  <div key={sector.value} className="mb-14">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                        <span className="text-3xl">{sector.icon}</span>
                        <span>{sector.label}</span>
                        <span className="text-sm font-medium text-secondary bg-muted px-3 py-1 rounded-full">
                          {sectorJobs.length} ilan
                        </span>
                      </h3>
                      <Link
                        href={`/kategori/${sector.value}`}
                        className="text-sm text-primary hover:text-primary-hover font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Tümünü Gör
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {sectorJobs.slice(0, 4).map((job) => (
                        <JobCard key={job.id} job={job} featured={job.isFeatured} />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="sm:hidden text-center mt-10">
                <Link href="/ilanlar" className="cta-primary w-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Tüm İlanları Keşfet
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Sector Quick Links */}
      <section className="py-16 md:py-20 bg-muted border-t border-b border-border">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Sektörlere Göre Fason İş İlanları
            </h2>
            <p className="text-secondary">
              İlgilendiğiniz sektörü seçin ve fırsatları keşfedin
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {SECTORS.map((sector) => (
              <Link
                key={sector.value}
                href={`/kategori/${sector.value}`}
                className="sector-card"
              >
                <span className="sector-icon block">{sector.icon}</span>
                <span className="sector-label">{sector.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities - Internal Linking */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Şehirlere Göre Fason İş İlanları
            </h2>
            <p className="text-secondary">
              Türkiye&apos;nin önemli üretim merkezlerinde fason iş fırsatları
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {popularCities.map((city) => (
              <Link
                key={city.value}
                href={`/sehir/${city.value}`}
                className="text-center p-4 rounded-xl border border-border bg-white hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  {city.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/ilanlar" className="text-primary hover:text-primary-hover font-semibold inline-flex items-center gap-2">
              Tüm Şehirleri Gör
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Nasıl Çalışır?
            </h2>
            <p className="text-secondary">
              3 adımda fason üreticinizi bulun
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Ücretsiz Kayıt Ol</h3>
              <p className="text-secondary text-sm">
                E-posta adresinizle hızlıca hesap oluşturun
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">İlanınızı Oluşturun</h3>
              <p className="text-secondary text-sm">
                Fason iş talebinizi detaylıca açıklayın
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">Üreticilerle Buluşun</h3>
              <p className="text-secondary text-sm">
                Doğru üreticiler sizinle iletişime geçsin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Why FasonBul - Trust Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-light/50 via-white to-orange-50/50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Neden FasonBul?
            </h2>
            <p className="text-secondary mb-12 max-w-2xl mx-auto">
              Türkiye&apos;nin en güvenilir fason iş platformu olarak, iş sahipleri ve üreticileri
              doğrudan buluşturuyoruz.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-success-light rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">%100 Ücretsiz</h3>
                <p className="text-secondary text-sm">
                  İlan vermek ve görüntülemek tamamen ücretsiz. Gizli ücret veya komisyon yok.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">Hızlı Eşleşme</h3>
                <p className="text-secondary text-sm">
                  İlanınız anında yayına girer, doğru üreticilerle hızlıca buluşursunuz.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-warning-light rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground mb-3">Güvenli İletişim</h3>
                <p className="text-secondary text-sm">
                  Doğrudan iletişim kurun, aracı veya komisyoncu olmadan anlaşmanızı yapın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Fason Üretim Nedir?
            </h2>
            <div className="prose prose-lg max-w-none text-secondary space-y-5">
              <p>
                <strong className="text-foreground">Fason üretim</strong>, bir firmanın kendi markası
                altında satacağı ürünleri başka bir üreticiye yaptırmasıdır. Bu model, iş sahiplerinin
                üretim altyapısına yatırım yapmadan ürün çıkarmasını; üreticilerin ise kapasitelerini
                değerlendirmesini sağlar.
              </p>
              <p>
                <strong className="text-foreground">FasonBul</strong> olarak, Türkiye&apos;nin dört bir
                yanındaki fason iş sahipleri ile fason üreticileri tek bir platformda buluşturuyoruz.
                <strong className="text-foreground"> Otomotiv parçalarından mobilya imalatına</strong>,
                <strong className="text-foreground"> tekstil üretiminden kimya sanayiine</strong> kadar
                geniş bir yelpazede hizmet veriyoruz.
              </p>
              <p>
                İster fason iş arayan bir üretici olun, ister güvenilir fason üretici arayan bir iş
                sahibi; FasonBul ile doğru iş ortağınızı bulabilirsiniz.
                <strong className="text-primary"> Komisyon yok, aracılık yok, sonsuza kadar ücretsiz</strong> –
                doğrudan iletişim kurarak anlaşmanızı yapın.
              </p>
            </div>

            {/* Internal Links for SEO - Sectors */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-bold text-foreground mb-5">
                Popüler Fason İş Kategorileri
              </h3>
              <div className="flex flex-wrap gap-3">
                {SECTORS.map((sector) => (
                  <Link
                    key={sector.value}
                    href={`/kategori/${sector.value}`}
                    className="text-sm px-5 py-2.5 bg-white border border-border rounded-full text-foreground font-medium hover:text-primary hover:border-primary/40 hover:bg-primary-light transition-all"
                  >
                    {sector.icon} {sector.label} Fason İlanları
                  </Link>
                ))}
              </div>
            </div>

            {/* Internal Links for SEO - Cities */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-bold text-foreground mb-5">
                Şehirlere Göre Fason İş İlanları
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularCities.map((city) => (
                  <Link
                    key={city.value}
                    href={`/sehir/${city.value}`}
                    className="text-sm px-4 py-2 bg-muted rounded-full text-secondary hover:text-primary hover:bg-primary-light transition-colors font-medium"
                  >
                    {city.label} Fason İlanları
                  </Link>
                ))}
                <Link
                  href="/ilanlar"
                  className="text-sm px-4 py-2 bg-primary-light rounded-full text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Tüm Şehirler →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary-hover text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Fason Üretim Ortağınızı Bugün Bulun
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Türkiye&apos;nin en büyük fason iş ilanları platformuna ücretsiz katılın.
            Komisyon yok, aracı yok!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kayit"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all"
            >
              Ücretsiz İlan Ver
            </Link>
            <Link
              href="/ilanlar"
              className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border-2 border-white/40 px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-colors"
            >
              İlanları İncele
            </Link>
          </div>
          <p className="text-white/70 text-sm mt-6">
            2 dakikada kayıt ol, hemen ilan ver
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
