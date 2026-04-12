import { prisma } from "@/lib/prisma";
import { JOB_STATUS } from "@/lib/constants";
import AdminJobList from "../../components/AdminJobList";

export const metadata = {
  title: "Aktif İlanlar",
};

export default async function ActiveJobsPage() {
  const jobs = await prisma.jobRequest.findMany({
    where: { status: JOB_STATUS.ACTIVE },
    orderBy: [
      { isFeatured: "desc" },
      { createdAt: "desc" },
    ],
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

  const featuredCount = jobs.filter(j => j.isFeatured).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Aktif İlanlar ({jobs.length})
        </h1>
        <span className="badge-warning">
          {featuredCount} vitrin ilanı
        </span>
      </div>

      {jobs.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-secondary">Aktif ilan bulunmuyor.</p>
        </div>
      ) : (
        <AdminJobList jobs={jobs} showSetPassive showFeaturedToggle showExtendDuration />
      )}
    </div>
  );
}
