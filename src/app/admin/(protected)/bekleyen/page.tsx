import { prisma } from "@/lib/prisma";
import { JOB_STATUS } from "@/lib/constants";
import AdminJobList from "../../components/AdminJobList";

export const dynamic = "force-dynamic";

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
