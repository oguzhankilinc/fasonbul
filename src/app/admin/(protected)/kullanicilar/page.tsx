import { prisma } from "@/lib/prisma";
import UserTable from "./UserTable";

export const metadata = {
  title: "Kullanıcılar",
};

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      companyName: true,
      phone: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          jobRequests: true,
        },
      },
    },
  });

  const jobOwners = users.filter((u) => u.role === "JOB_OWNER");
  const manufacturers = users.filter((u) => u.role === "MANUFACTURER");

  return (
    <div className="space-y-10">
      {/* İlan Veren Firmalar Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">
              İlan Veren Firmalar
            </h2>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-500/20 text-blue-400">
              {jobOwners.length}
            </span>
          </div>
          <a
            href="/api/admin/export-users?role=JOB_OWNER"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel İndir
          </a>
        </div>

        {jobOwners.length === 0 ? (
          <div className="text-center py-8 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400">Henüz ilan veren firma bulunmuyor.</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <UserTable users={jobOwners} showJobCount />
          </div>
        )}
      </section>

      {/* Fason Üreticiler / Atölyeler Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">
              Fason Üreticiler / Atölyeler
            </h2>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-400">
              {manufacturers.length}
            </span>
          </div>
          <a
            href="/api/admin/export-users?role=MANUFACTURER"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Excel İndir
          </a>
        </div>

        {manufacturers.length === 0 ? (
          <div className="text-center py-8 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400">Henüz fason üretici bulunmuyor.</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <UserTable users={manufacturers} />
          </div>
        )}
      </section>
    </div>
  );
}
