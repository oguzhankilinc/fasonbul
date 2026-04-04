"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { deactivateJob, activateJob, deleteJob } from "@/actions/jobs";
import { JOB_STATUS } from "@/lib/constants";

interface Job {
  id: string;
  status: string;
}

interface JobActionsProps {
  job: Job;
}

export default function JobActions({ job }: JobActionsProps) {
  const router = useRouter();

  const handleDeactivate = async () => {
    if (confirm("Bu ilanı pasife almak istediğinize emin misiniz?")) {
      await deactivateJob(job.id);
      router.refresh();
    }
  };

  const handleActivate = async () => {
    await activateJob(job.id);
    router.refresh();
  };

  const handleDelete = async () => {
    if (confirm("Bu ilanı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
      await deleteJob(job.id);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/hesap/ilan/${job.id}/duzenle`}
        className="btn-secondary text-sm py-1.5"
      >
        Düzenle
      </Link>

      {job.status === JOB_STATUS.ACTIVE && (
        <button
          onClick={handleDeactivate}
          className="btn-secondary text-sm py-1.5"
        >
          Pasife Al
        </button>
      )}

      {(job.status === JOB_STATUS.PASSIVE || job.status === JOB_STATUS.EXPIRED) && (
        <button
          onClick={handleActivate}
          className="btn-secondary text-sm py-1.5"
        >
          Yeniden Yayınla
        </button>
      )}

      <button
        onClick={handleDelete}
        className="btn-secondary text-sm py-1.5 text-error hover:bg-red-50"
      >
        Sil
      </button>
    </div>
  );
}
