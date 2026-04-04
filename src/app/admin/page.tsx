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
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Aktif İlanlar",
      value: activeJobs,
      href: "/admin/aktif",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Pasif İlanlar",
      value: passiveJobs,
      href: "/admin/pasif",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      label: "Süresi Dolanlar",
      value: expiredJobs,
      href: "/admin/suresi-dolan",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

      {/* Job Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href} className="card hover:shadow-md transition-shadow">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bgColor} mb-3`}>
              <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
            </div>
            <p className="text-sm text-secondary">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* User Stats */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Kullanıcılar</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
            <p className="text-sm text-secondary">Toplam</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{jobOwners}</p>
            <p className="text-sm text-secondary">İş Sahibi</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{manufacturers}</p>
            <p className="text-sm text-secondary">Üretici</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Hızlı İşlemler</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/bekleyen" className="btn-primary">
            Bekleyen İlanları Görüntüle
          </Link>
          <Link href="/admin/kullanicilar" className="btn-secondary">
            Kullanıcıları Görüntüle
          </Link>
        </div>
      </div>
    </div>
  );
}
