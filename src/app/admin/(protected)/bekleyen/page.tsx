import { prisma } from "@/lib/prisma";
import { JOB_STATUS } from "@/lib/constants";
import AdminJobList from "../../components/AdminJobList";

export const metadata = {
  title: "Bekleyen İlanlar",
};

export default async function PendingJobsPage() {
  const jobs = await prisma.jobRequest.findMany({
    where: { status: JOB_STATUS.PENDING_APPROVAL },
    orderBy: { createdAt: "asc" },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          companyName: true,
        },
      },
    },
  });

  // DEBUG: Log jobs and their imageUrls
  console.log("[DEBUG Admin Pending] Jobs count:", jobs.length);
  jobs.forEach((job, i) => {
    console.log(`[DEBUG Admin Pending] Job ${i}: id=${job.id}, imageUrl=${JSON.stringify(job.imageUrl)}`);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Bekleyen İlanlar ({jobs.length})
      </h1>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-gray-400">Onay bekleyen ilan bulunmuyor.</p>
        </div>
      ) : (
        <AdminJobList jobs={jobs} showApproveReject />
      )}
    </div>
  );
}
