import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { JOB_STATUS } from "@/lib/constants";

export const metadata = {
  title: "Dashboard",
};

export default async function AccountDashboardPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  // Get stats for job owner
  let stats = null;
  if (user.role === "JOB_OWNER") {
    const [total, active, pending, expired] = await Promise.all([
      prisma.jobRequest.count({ where: { ownerId: user.id } }),
      prisma.jobRequest.count({
        where: { ownerId: user.id, status: JOB_STATUS.ACTIVE },
      }),
      prisma.jobRequest.count({
        where: { ownerId: user.id, status: JOB_STATUS.PENDING_APPROVAL },
      }),
      prisma.jobRequest.count({
        where: { ownerId: user.id, status: JOB_STATUS.EXPIRED },
      }),
    ]);
    stats = { total, active, pending, expired };
  }

  // Get contact views for manufacturer
  let contactViews = null;
  if (user.role === "MANUFACTURER") {
    contactViews = await prisma.contactView.count({
      where: { userId: user.id },
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>

      {/* Welcome */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Hoş geldin, {user.name}!
        </h2>
        <p className="text-secondary">
          {user.role === "JOB_OWNER" &&
            "Buradan ilanlarınızı yönetebilir ve yeni ilanlar oluşturabilirsiniz."}
          {user.role === "MANUFACTURER" &&
            "Buradan fason iş ilanlarına göz atabilir ve iletişime geçebilirsiniz."}
        </p>
      </div>

      {/* Stats for Job Owner */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="card text-center">
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-secondary">Toplam İlan</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-success">{stats.active}</p>
            <p className="text-sm text-secondary">Aktif</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-primary">{stats.pending}</p>
            <p className="text-sm text-secondary">Onay Bekliyor</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-secondary">{stats.expired}</p>
            <p className="text-sm text-secondary">Süresi Dolmuş</p>
          </div>
        </div>
      )}

      {/* Stats for Manufacturer */}
      {contactViews !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="card text-center">
            <p className="text-3xl font-bold text-foreground">{contactViews}</p>
            <p className="text-sm text-secondary">Görüntülediğiniz İlanlar</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card">
        <h3 className="font-semibold text-foreground mb-4">Hızlı İşlemler</h3>
        <div className="flex flex-wrap gap-3">
          {user.role === "JOB_OWNER" && (
            <>
              <Link href="/hesap/ilan-olustur" className="btn-primary">
                Yeni İlan Oluştur
              </Link>
              <Link href="/hesap/ilanlarim" className="btn-secondary">
                İlanlarımı Görüntüle
              </Link>
            </>
          )}
          {user.role === "MANUFACTURER" && (
            <Link href="/" className="btn-primary">
              İlanları Görüntüle
            </Link>
          )}
          <Link href="/hesap/ayarlar" className="btn-secondary">
            Profili Düzenle
          </Link>
        </div>
      </div>
    </div>
  );
}
