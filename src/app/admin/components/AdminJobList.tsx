"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSectorLabel, getCityLabel, getSectorIcon } from "@/lib/constants";
import { formatRelativeDate, truncateText, getRemainingDays } from "@/lib/utils";
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
          <div key={job.id} className={`card ${job.isFeatured ? 'border-primary/30 bg-gradient-to-br from-white to-primary-light/20' : ''}`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image Thumbnail */}
              <div className="flex-shrink-0">
                <div className="relative w-full md:w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                  {job.imageUrl ? (
                    <Image
                      src={job.imageUrl}
                      alt={job.title}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-100"><span class="text-3xl opacity-50">${getSectorIcon(job.sector)}</span></div>`;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl opacity-50">{getSectorIcon(job.sector)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="badge-primary text-xs">{getSectorLabel(job.sector)}</span>
                  <span className="badge-secondary text-xs">{getCityLabel(job.city)}</span>
                  {job.isFeatured && (
                    <span className="badge-warning text-xs">Vitrin</span>
                  )}
                  {remainingDays !== null && remainingDays <= 7 && remainingDays > 0 && (
                    <span className="badge-error text-xs">{remainingDays} gün kaldı</span>
                  )}
                  {remainingDays !== null && remainingDays <= 0 && (
                    <span className="badge-error text-xs">Süresi doldu</span>
                  )}
                </div>

                <Link
                  href={`/ilan/${job.id}`}
                  className="text-base font-semibold text-foreground hover:text-primary block truncate"
                  target="_blank"
                >
                  {job.title}
                </Link>

                <p className="text-sm text-secondary mt-1 line-clamp-2">
                  {truncateText(job.description, 150)}
                </p>

                {/* Owner Info - Compact */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-secondary mt-2">
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
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => handleReject(job.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
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
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          : "bg-primary-light text-primary hover:bg-primary/20"
                      }`}
                    >
                      {job.isFeatured ? "Vitrinden Çıkar" : "Vitrine Ekle"}
                    </button>
                  )}

                  {showSetPassive && (
                    <button
                      onClick={() => handleSetPassive(job.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    >
                      Pasife Al
                    </button>
                  )}

                  {showSetActive && (
                    <button
                      onClick={() => handleSetActive(job.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition-colors"
                    >
                      Aktif Et
                    </button>
                  )}

                  {showExtendDuration && (
                    <button
                      onClick={() => handleExtendDuration(job.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                    >
                      +30 Gün Uzat
                    </button>
                  )}

                  <Link
                    href={`/ilan/${job.id}`}
                    target="_blank"
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    Görüntüle
                  </Link>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
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
