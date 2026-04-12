import { prisma } from "@/lib/prisma";
import { JOB_STATUS } from "@/lib/constants";
import AdminJobList from "../../components/AdminJobList";

export const metadata = {
  title: "Pasif İlanlar",
};

export default async function PassiveJobsPage() {
  const jobs = await prisma.jobRequest.findMany({
    where: { status: JOB_STATUS.PASSIVE },
    orderBy: { createdAt: "desc" },
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
        Pasif İlanlar ({jobs.length})
      </h1>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Pasif ilan bulunmuyor.</p>
        </div>
      ) : (
        <AdminJobList jobs={jobs} showSetActive />
      )}
    </div>
  );
}
