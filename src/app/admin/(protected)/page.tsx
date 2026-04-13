import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JOB_STATUS, USER_ROLE } from "@/lib/constants";
import { formatRelativeDate } from "@/lib/utils";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [
    pendingJobs,
    activeJobs,
    passiveJobs,
    expiredJobs,
    featuredJobs,
    totalUsers,
    jobOwners,
    manufacturers,
    recentUsers,
    recentJobs,
  ] = await Promise.all([
    prisma.jobRequest.count({ where: { status: JOB_STATUS.PENDING_APPROVAL } }),
    prisma.jobRequest.count({ where: { status: JOB_STATUS.ACTIVE } }),
    prisma.jobRequest.count({ where: { status: JOB_STATUS.PASSIVE } }),
    prisma.jobRequest.count({ where: { status: JOB_STATUS.EXPIRED } }),
    prisma.jobRequest.count({ where: { status: JOB_STATUS.ACTIVE, isFeatured: true } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: USER_ROLE.JOB_OWNER } }),
    prisma.user.count({ where: { role: USER_ROLE.MANUFACTURER } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        role: true,
        companyName: true,
        createdAt: true,
      },
    }),
    prisma.jobRequest.findMany({
      where: { status: JOB_STATUS.ACTIVE },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        isFeatured: true,
        createdAt: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Bekleyen İlanlar",
      value: pendingJobs,
      href: "/admin/bekleyen",
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
    },
    {
      label: "Aktif İlanlar",
      value: activeJobs,
      href: "/admin/aktif",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      label: "Pasif İlanlar",
      value: passiveJobs,
      href: "/admin/pasif",
      color: "text-gray-400",
      bgColor: "bg-gray-500/20",
      borderColor: "border-gray-500/30",
    },
    {
      label: "Süresi Dolanlar",
      value: expiredJobs,
      href: "/admin/suresi-dolan",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Job Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className={`p-4 rounded-xl ${stat.bgColor} border ${stat.borderColor} hover:border-opacity-60 transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
            </div>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Featured/Vitrin Stats - Prominent */}
      <Link
        href="/admin/aktif"
        className="block p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 hover:border-amber-400/60 transition-all mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-300 mb-1">Vitrin İlanları</p>
            <p className="text-3xl font-bold text-amber-400">{featuredJobs}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Aktif ilanların</p>
            <p className="text-lg font-semibold text-amber-300">
              %{activeJobs > 0 ? Math.round((featuredJobs / activeJobs) * 100) : 0} vitrinde
            </p>
          </div>
          <svg className="w-12 h-12 text-amber-500/40" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </Link>

      {/* Two Column Layout: Users + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Stats */}
        <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Kullanıcılar</h2>
            <Link href="/admin/kullanicilar" className="text-xs text-primary hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
              <p className="text-xs text-gray-400">Toplam</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">{jobOwners}</p>
              <p className="text-xs text-gray-400">İş Sahibi</p>
            </div>
            <div className="text-center p-3 bg-gray-800/50 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">{manufacturers}</p>
              <p className="text-xs text-gray-400">Üretici</p>
            </div>
          </div>

          {/* Recent Users */}
          <div className="border-t border-gray-600 pt-4">
            <p className="text-xs text-gray-500 mb-3">Son Kayıtlar</p>
            <div className="space-y-2">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${user.role === USER_ROLE.JOB_OWNER ? 'bg-blue-400' : 'bg-purple-400'}`} />
                    <span className="text-gray-300 truncate max-w-[140px]">
                      {user.companyName || user.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{formatRelativeDate(user.createdAt)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Son Aktif İlanlar</h2>
            <Link href="/admin/aktif" className="text-xs text-primary hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <Link
                key={job.id}
                href={`/ilan/${job.id}`}
                target="_blank"
                className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-gray-300 line-clamp-1 flex-1">{job.title}</p>
                  {job.isFeatured && (
                    <span className="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium rounded bg-amber-500/20 text-amber-400">
                      Vitrin
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{formatRelativeDate(job.createdAt)}</p>
              </Link>
            ))}
            {recentJobs.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">Henüz aktif ilan yok</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Hızlı İşlemler</h2>
        <div className="flex flex-wrap gap-3">
          {pendingJobs > 0 && (
            <Link
              href="/admin/bekleyen"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {pendingJobs} Bekleyen İlan
            </Link>
          )}
          <Link
            href="/admin/aktif"
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors"
          >
            Vitrin Yönetimi
          </Link>
          <Link
            href="/admin/kullanicilar"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
          >
            Kullanıcılar
          </Link>
        </div>
      </div>
    </div>
  );
}
