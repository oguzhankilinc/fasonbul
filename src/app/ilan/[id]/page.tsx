import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {
  getSectorLabel,
  getCityLabel,
  getUrgencyLabel,
  getSectorIcon,
  JOB_STATUS,
} from "@/lib/constants";
import {
  formatDate,
  getRemainingDays,
  formatPhoneNumber,
  generateWhatsAppLink,
} from "@/lib/utils";
import ContactButtons from "./ContactButtons";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getJob(id: string) {
  const job = await prisma.jobRequest.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          companyName: true,
        },
      },
    },
  });

  return job;
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: "İlan Bulunamadı",
    };
  }

  const sectorLabel = getSectorLabel(job.sector);
  const cityLabel = getCityLabel(job.city);
  const title = `${job.title} | ${sectorLabel} Fason İş İlanı - ${cityLabel}`;
  const description = `${cityLabel} ${sectorLabel.toLowerCase()} fason iş ilanı: ${job.description.slice(0, 120)}... FasonBul'da komisyonsuz, doğrudan iletişim.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://fasonbul.com/ilan/${job.id}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://fasonbul.com/ilan/${job.id}`,
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const [job, user] = await Promise.all([getJob(id), getCurrentUser()]);

  if (!job) {
    notFound();
  }

  // Only show active jobs to public, or own jobs to owner, or all to admin
  const isOwner = user?.id === job.ownerId;
  const isAdmin = user?.role === "ADMIN";
  const isManufacturer = user?.role === "MANUFACTURER";

  if (job.status !== JOB_STATUS.ACTIVE && !isOwner && !isAdmin) {
    notFound();
  }

  const remainingDays = getRemainingDays(job.expiresAt);
  const canSeeContact = isOwner || isAdmin || isManufacturer;
  const sectorLabel = getSectorLabel(job.sector);
  const cityLabel = getCityLabel(job.city);

  // JobPosting Schema for SEO
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.createdAt.toISOString(),
    validThrough: job.expiresAt?.toISOString(),
    employmentType: "CONTRACT",
    hiringOrganization: {
      "@type": "Organization",
      name: job.owner?.companyName || job.owner?.name || "FasonBul İş Sahibi",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: cityLabel,
        addressCountry: "TR",
      },
    },
    industry: sectorLabel,
  };

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
        name: sectorLabel,
        item: `https://fasonbul.com/kategori/${job.sector}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: job.title,
        item: `https://fasonbul.com/ilan/${job.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/kategori/${job.sector}`}
          className="hover:text-primary"
        >
          {getSectorLabel(job.sector)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{job.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Job Image */}
            {job.imageUrl ? (
              <div className="relative aspect-[16/9] w-full bg-gray-100">
                <Image
                  src={job.imageUrl}
                  alt={job.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            ) : (
              <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-7xl opacity-40" role="img" aria-label={sectorLabel}>
                    {getSectorIcon(job.sector)}
                  </span>
                  <p className="text-sm text-secondary mt-2 opacity-60">Görsel yok</p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="badge-primary">{getSectorLabel(job.sector)}</span>
                  <span className="badge-secondary">{getCityLabel(job.city)}</span>
                  {job.urgency && job.urgency !== "normal" && (
                    <span
                      className={
                        job.urgency === "cok-acil" ? "badge-error" : "badge-warning"
                      }
                    >
                      {getUrgencyLabel(job.urgency)}
                    </span>
                  )}
                  {job.status !== JOB_STATUS.ACTIVE && (
                    <span className="badge-secondary">
                      {job.status === JOB_STATUS.PENDING_APPROVAL && "Onay Bekliyor"}
                      {job.status === JOB_STATUS.PASSIVE && "Pasif"}
                      {job.status === JOB_STATUS.EXPIRED && "Süresi Doldu"}
                      {job.status === JOB_STATUS.REJECTED && "Reddedildi"}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {job.title}
                </h1>
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  İlan Detayı
                </h2>
                <p className="text-secondary whitespace-pre-wrap">{job.description}</p>
              </div>

              {/* Meta Info */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-secondary">Yayın Tarihi</span>
                    <p className="font-medium text-foreground">
                      {formatDate(job.createdAt)}
                    </p>
                  </div>
                  {job.expiresAt && job.status === JOB_STATUS.ACTIVE && (
                    <div>
                      <span className="text-secondary">Kalan Süre</span>
                      <p
                        className={`font-medium ${
                          remainingDays <= 5 ? "text-error" : "text-foreground"
                        }`}
                      >
                        {remainingDays} gün
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-secondary">Sektör</span>
                    <p className="font-medium text-foreground">
                      {getSectorLabel(job.sector)}
                    </p>
                  </div>
                  <div>
                    <span className="text-secondary">Şehir</span>
                    <p className="font-medium text-foreground">
                      {getCityLabel(job.city)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="font-semibold text-foreground mb-4">İletişim Bilgileri</h2>

            {canSeeContact ? (
              <ContactButtons
                jobId={job.id}
                phone={job.phone}
                whatsapp={job.whatsapp}
                formattedPhone={formatPhoneNumber(job.phone)}
                whatsappLink={generateWhatsAppLink(
                  job.whatsapp,
                  `Merhaba, FasonBul'da "${job.title}" ilanınızı gördüm.`
                )}
              />
            ) : (
              <div className="text-center py-4">
                <p className="text-secondary text-sm mb-4">
                  İletişim bilgilerini görmek için giriş yapmanız gerekiyor.
                </p>
                <Link href="/giris" className="btn-primary w-full inline-block text-center">
                  Giriş Yap
                </Link>
                <p className="text-xs text-secondary mt-3">
                  Hesabınız yok mu?{" "}
                  <Link href="/kayit" className="text-primary hover:underline">
                    Kayıt Ol
                  </Link>
                </p>
              </div>
            )}

            {/* Owner Info */}
            {job.owner && (
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-secondary">İlan Sahibi</p>
                <p className="font-medium text-foreground">
                  {job.owner.companyName || job.owner.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Links for SEO */}
      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Benzer İlanlar
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/kategori/${job.sector}`}
            className="text-sm text-primary hover:text-primary-hover hover:underline"
          >
            {sectorLabel} İlanları
          </Link>
          <span className="text-border">•</span>
          <Link
            href={`/sehir/${job.city}`}
            className="text-sm text-primary hover:text-primary-hover hover:underline"
          >
            {cityLabel} İlanları
          </Link>
          <span className="text-border">•</span>
          <Link
            href="/ilanlar"
            className="text-sm text-primary hover:text-primary-hover hover:underline"
          >
            Tüm İlanlar
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
