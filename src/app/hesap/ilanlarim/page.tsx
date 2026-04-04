import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getSectorLabel, getCityLabel, JOB_STATUS } from "@/lib/constants";
import { formatRelativeDate, getRemainingDays } from "@/lib/utils";
import JobActions from "./JobActions";

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">İlanlarım</h1>
        <Link href="/hesap/ilan-olustur" className="btn-primary">
          Yeni İlan
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Henüz ilan yok
          </h2>
          <p className="text-secondary mb-4">
            İlk ilanınızı oluşturarak başlayın.
          </p>
          <Link href="/hesap/ilan-olustur" className="btn-primary">
            İlan Oluştur
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="card">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={statusColors[job.status]}>
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
                    className="text-lg font-semibold text-foreground hover:text-primary"
                  >
                    {job.title}
                  </Link>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-secondary">
                    <span>Oluşturulma: {formatRelativeDate(job.createdAt)}</span>
                    {job.status === JOB_STATUS.ACTIVE && job.expiresAt && (
                      <span
                        className={
                          getRemainingDays(job.expiresAt) <= 5
                            ? "text-error"
                            : ""
                        }
                      >
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
