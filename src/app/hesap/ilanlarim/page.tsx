import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getSectorLabel, getCityLabel, JOB_STATUS } from "@/lib/constants";
import { formatRelativeDate, getRemainingDays } from "@/lib/utils";
import JobActions from "./JobActions";
import SuccessToast from "./SuccessToast";

export const metadata = {
  title: "İlanlarım",
};

export default async function MyJobsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "JOB_OWNER") {
    return (
      <div className="text-center py-12">
        <p className="text-secondary">Bu sayfaya erişim yetkiniz yok.</p>
      </div>
    );
  }

  const jobs = await prisma.jobRequest.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const statusLabels: Record<string, string> = {
    DRAFT: "Taslak",
    PENDING_APPROVAL: "Onay Bekliyor",
    ACTIVE: "Aktif",
    PASSIVE: "Pasif",
    EXPIRED: "Süresi Doldu",
    REJECTED: "Reddedildi",
  };

  const statusColors: Record<string, string> = {
    DRAFT: "badge-secondary",
    PENDING_APPROVAL: "badge-warning",
    ACTIVE: "badge-success",
    PASSIVE: "badge-secondary",
    EXPIRED: "badge-secondary",
    REJECTED: "badge-error",
  };

  return (
    <div>
      <Suspense fallback={null}>
        <SuccessToast />
      </Suspense>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">İlanlarım</h1>
        <Link
          href="/hesap/ilan-olustur"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Yeni İlan
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-gradient-to-br from-primary-light via-orange-50 to-white rounded-2xl border-2 border-primary/20 p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-sm mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Henüz İlanınız Yok
          </h2>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            İlk fason iş ilanınızı oluşturun, Türkiye genelindeki üreticiler sizinle iletişime geçsin.
            <span className="block mt-1 font-medium text-foreground">Ücretsiz ve komisyonsuz.</span>
          </p>
          <Link
            href="/hesap/ilan-olustur"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            İlk İlanımı Oluştur
          </Link>
          <p className="mt-4 text-xs text-secondary flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            2 dakikada ilan oluşturun
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-sm transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1.5 ${statusColors[job.status]}`}>
                      {job.status === JOB_STATUS.ACTIVE && (
                        <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                      )}
                      {statusLabels[job.status]}
                    </span>
                    <span className="badge-primary">
                      {getSectorLabel(job.sector)}
                    </span>
                    <span className="badge-secondary">
                      {getCityLabel(job.city)}
                    </span>
                  </div>
                  <Link
                    href={`/ilan/${job.id}`}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {job.title}
                  </Link>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-secondary">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatRelativeDate(job.createdAt)}
                    </span>
                    {job.status === JOB_STATUS.ACTIVE && job.expiresAt && (
                      <span
                        className={`flex items-center gap-1 ${
                          getRemainingDays(job.expiresAt) <= 5
                            ? "text-error font-medium"
                            : ""
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {getRemainingDays(job.expiresAt)} gün kaldı
                      </span>
                    )}
                  </div>
                </div>
                <JobActions job={job} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
