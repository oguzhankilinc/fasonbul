"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSectorLabel, getCityLabel } from "@/lib/constants";
import { formatRelativeDate, truncateText, getRemainingDays } from "@/lib/utils";
import AdminJobThumbnail from "./AdminJobThumbnail";
import {
  approveJob,
  rejectJob,
  setJobPassive,
  setJobActive,
  deleteJobAdmin,
  toggleFeatured,
  extendJobDuration,
} from "@/actions/admin";

interface Job {
  id: string;
  title: string;
  description: string;
  sector: string;
  city: string;
  phone: string;
  imageUrl?: string | null;
  createdAt: Date;
  expiresAt?: Date | null;
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
  showExtendDuration?: boolean;
}

export default function AdminJobList({
  jobs,
  showApproveReject,
  showSetPassive,
  showSetActive,
  showFeaturedToggle,
  showExtendDuration,
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

  const handleExtendDuration = async (jobId: string) => {
    if (confirm("Bu ilanın süresini 30 gün uzatmak istediğinize emin misiniz?")) {
      await extendJobDuration(jobId, 30);
      router.refresh();
    }
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const remainingDays = job.expiresAt ? getRemainingDays(job.expiresAt) : null;

        return (
          <div
            key={job.id}
            className={`p-4 rounded-xl border ${
              job.isFeatured
                ? "border-primary/40 bg-primary/10"
                : "border-gray-600 bg-gray-700/50"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image Thumbnail */}
              <div className="flex-shrink-0 w-full md:w-36">
                <AdminJobThumbnail
                  imageUrl={job.imageUrl}
                  title={job.title}
                  sector={job.sector}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-primary/20 text-primary">
                    {getSectorLabel(job.sector)}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-gray-600 text-gray-300">
                    {getCityLabel(job.city)}
                  </span>
                  {job.isFeatured && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-500/20 text-amber-400">
                      Vitrin
                    </span>
                  )}
                  {remainingDays !== null && remainingDays <= 7 && remainingDays > 0 && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-red-500/20 text-red-400">
                      {remainingDays} gün kaldı
                    </span>
                  )}
                  {remainingDays !== null && remainingDays <= 0 && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-red-500/20 text-red-400">
                      Süresi doldu
                    </span>
                  )}
                </div>

                <Link
                  href={`/ilan/${job.id}`}
                  className="text-base font-semibold text-white hover:text-primary block truncate"
                  target="_blank"
                >
                  {job.title}
                </Link>

                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {truncateText(job.description, 150)}
                </p>

                {/* Owner Info */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
                  <span>{job.owner.companyName || job.owner.name}</span>
                  <span>{job.phone}</span>
                  <span>{formatRelativeDate(job.createdAt)}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {showApproveReject && (
                    <>
                      <button
                        onClick={() => handleApprove(job.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-600 hover:bg-green-500 text-white transition-colors"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => handleReject(job.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
                      >
                        Reddet
                      </button>
                    </>
                  )}

                  {showFeaturedToggle && (
                    <button
                      onClick={() => handleToggleFeatured(job.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        job.isFeatured
                          ? "bg-amber-600 hover:bg-amber-500 text-white"
                          : "bg-amber-600/20 hover:bg-amber-600/30 text-amber-400"
                      }`}
                    >
                      {job.isFeatured ? "Vitrinden Çıkar" : "Vitrine Ekle"}
                    </button>
                  )}

                  {showSetPassive && (
                    <button
                      onClick={() => handleSetPassive(job.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                    >
                      Pasife Al
                    </button>
                  )}

                  {showSetActive && (
                    <button
                      onClick={() => handleSetActive(job.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 transition-colors"
                    >
                      Aktif Et
                    </button>
                  )}

                  {showExtendDuration && (
                    <button
                      onClick={() => handleExtendDuration(job.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 transition-colors"
                    >
                      +30 Gün Uzat
                    </button>
                  )}

                  <Link
                    href={`/ilan/${job.id}`}
                    target="_blank"
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-600 hover:bg-gray-500 text-gray-300 transition-colors"
                  >
                    Görüntüle
                  </Link>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
