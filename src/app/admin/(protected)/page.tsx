import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JOB_STATUS, USER_ROLE } from "@/lib/constants";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [
    pendingJobs,
    activeJobs,
    passiveJobs,
    expiredJobs,
    totalUsers,
    jobOwners,
    manufacturers,
  ] = await Promise.all([
    prisma.jobRequest.count({ where: { status: JOB_STATUS.PENDING_APPROVAL } }),
    prisma.jobRequest.count({ where: { status: JOB_STATUS.ACTIVE } }),
    prisma.jobRequest.count({ where: { status: JOB_STATUS.PASSIVE } }),
    prisma.jobRequest.count({ where: { status: JOB_STATUS.EXPIRED } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: USER_ROLE.JOB_OWNER } }),
    prisma.user.count({ where: { role: USER_ROLE.MANUFACTURER } }),
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      {/* User Stats */}
      <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Kullanıcılar</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <p className="text-3xl font-bold text-white">{totalUsers}</p>
            <p className="text-sm text-gray-400">Toplam</p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <p className="text-3xl font-bold text-blue-400">{jobOwners}</p>
            <p className="text-sm text-gray-400">İş Sahibi</p>
          </div>
          <div className="text-center p-4 bg-gray-800/50 rounded-lg">
            <p className="text-3xl font-bold text-purple-400">{manufacturers}</p>
            <p className="text-sm text-gray-400">Üretici</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Hızlı İşlemler</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/bekleyen"
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors"
          >
            Bekleyen İlanları Görüntüle
          </Link>
          <Link
            href="/admin/kullanicilar"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
          >
            Kullanıcıları Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}
