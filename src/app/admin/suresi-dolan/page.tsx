import { prisma } from "@/lib/prisma";
import { JOB_STATUS } from "@/lib/constants";
import AdminJobList from "../components/AdminJobList";

export const metadata = {
  title: "Süresi Dolan İlanlar",
};

export default async function ExpiredJobsPage() {
  const jobs = await prisma.jobRequest.findMany({
    where: { status: JOB_STATUS.EXPIRED },
    orderBy: { expiresAt: "desc" },
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
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Süresi Dolan İlanlar ({jobs.length})
      </h1>

      {jobs.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-secondary">Süresi dolmuş ilan bulunmuyor.</p>
        </div>
      ) : (
        <AdminJobList jobs={jobs} showSetActive />
      )}
    </div>
  );
}
