"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSectorLabel, getCityLabel } from "@/lib/constants";
import { formatRelativeDate, truncateText } from "@/lib/utils";
import {
  approveJob,
  rejectJob,
  setJobPassive,
  setJobActive,
  deleteJobAdmin,
  toggleFeatured,
} from "@/actions/admin";

interface Job {
  id: string;
  title: string;
  description: string;
  sector: string;
  city: string;
  phone: string;
  createdAt: Date;
  isFeatured?: boolean;
  owner: {
    name: string;
    email: string;
    companyName: string | null;
  };
}

interface AdminJobListProps {
  jobs: Job[];
  showApproveReject?: boolean;
  showSetPassive?: boolean;
  showSetActive?: boolean;
  showFeaturedToggle?: boolean;
}

export default function AdminJobList({
  jobs,
  showApproveReject,
  showSetPassive,
  showSetActive,
  showFeaturedToggle,
}: AdminJobListProps) {
  const router = useRouter();

  const handleApprove = async (jobId: string) => {
    if (confirm("Bu ilanı onaylamak istediğinize emin misiniz?")) {
      await approveJob(jobId);
      router.refresh();
    }
  };

  const handleReject = async (jobId: string) => {
    if (confirm("Bu ilanı reddetmek istediğinize emin misiniz?")) {
      await rejectJob(jobId);
      router.refresh();
    }
  };

  const handleSetPassive = async (jobId: string) => {
    if (confirm("Bu ilanı pasife almak istediğinize emin misiniz?")) {
      await setJobPassive(jobId);
      router.refresh();
    }
  };

  const handleSetActive = async (jobId: string) => {
    if (confirm("Bu ilanı aktif etmek istediğinize emin misiniz?")) {
      await setJobActive(jobId);
      router.refresh();
    }
  };

  const handleDelete = async (jobId: string) => {
    if (confirm("Bu ilanı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
      await deleteJobAdmin(jobId);
      router.refresh();
    }
  };

  const handleToggleFeatured = async (jobId: string) => {
    await toggleFeatured(jobId);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className={`card ${job.isFeatured ? 'border-primary/30 bg-gradient-to-br from-white to-primary-light/20' : ''}`}>
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="badge-primary">{getSectorLabel(job.sector)}</span>
                  <span className="badge-secondary">{getCityLabel(job.city)}</span>
                  {job.isFeatured && (
                    <span className="badge-warning">Vitrin</span>
                  )}
                </div>
                <Link
                  href={`/ilan/${job.id}`}
                  className="text-lg font-semibold text-foreground hover:text-primary"
                >
                  {job.title}
                </Link>
                <p className="text-sm text-secondary mt-1">
                  {truncateText(job.description, 200)}
                </p>
              </div>
            </div>

            {/* Owner Info */}
            <div className="flex flex-wrap gap-4 text-sm text-secondary border-t border-border pt-4">
              <span>
                <strong>İlan Sahibi:</strong>{" "}
                {job.owner.companyName || job.owner.name}
              </span>
              <span>
                <strong>E-posta:</strong> {job.owner.email}
              </span>
              <span>
                <strong>Telefon:</strong> {job.phone}
              </span>
              <span>
                <strong>Tarih:</strong> {formatRelativeDate(job.createdAt)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {showApproveReject && (
                <>
                  <button
                    onClick={() => handleApprove(job.id)}
                    className="btn-primary text-sm py-1.5"
                  >
                    Onayla
                  </button>
                  <button
                    onClick={() => handleReject(job.id)}
                    className="btn-secondary text-sm py-1.5 text-error"
                  >
                    Reddet
                  </button>
                </>
              )}

              {showFeaturedToggle && (
                <button
                  onClick={() => handleToggleFeatured(job.id)}
                  className={`btn-secondary text-sm py-1.5 ${
                    job.isFeatured
                      ? "text-warning border-warning hover:bg-warning-light"
                      : "text-primary border-primary hover:bg-primary-light"
                  }`}
                >
                  {job.isFeatured ? (
                    <>
                      <svg className="w-4 h-4 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Vitrinden Kaldır
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Vitrine Ekle
                    </>
                  )}
                </button>
              )}

              {showSetPassive && (
                <button
                  onClick={() => handleSetPassive(job.id)}
                  className="btn-secondary text-sm py-1.5"
                >
                  Pasife Al
                </button>
              )}

              {showSetActive && (
                <button
                  onClick={() => handleSetActive(job.id)}
                  className="btn-secondary text-sm py-1.5"
                >
                  Aktif Et
                </button>
              )}

              <Link
                href={`/ilan/${job.id}`}
                className="btn-secondary text-sm py-1.5"
              >
                Görüntüle
              </Link>

              <button
                onClick={() => handleDelete(job.id)}
                className="btn-secondary text-sm py-1.5 text-error hover:bg-red-50"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
