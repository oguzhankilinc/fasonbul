import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { JOB_STATUS } from "@/lib/constants";

export const metadata = {
  title: "Hesabım | FasonBul",
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

  const hasNoJobs = stats?.total === 0;
  const isJobOwner = user.role === "JOB_OWNER";
  const isManufacturer = user.role === "MANUFACTURER";

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Hoş Geldin, {user.name}!
        </h1>
        <p className="text-secondary">
          {isJobOwner && "İlanlarınızı yönetin ve yeni fırsatlar yaratın."}
          {isManufacturer && "Fason iş fırsatlarını keşfedin ve iş sahipleriyle bağlantı kurun."}
        </p>
      </div>

      {/* First Job Encouragement - Job Owner with no jobs */}
      {isJobOwner && hasNoJobs && (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary-light to-orange-50 border-2 border-primary/20 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground mb-1">
                İlk İlanınızı Oluşturun
              </h2>
              <p className="text-secondary mb-4">
                Henüz ilanınız yok. İlk ilanınızı oluşturun, Türkiye genelindeki üreticiler size ulaşsın.
                <span className="font-medium text-foreground"> Ücretsiz ve komisyonsuz.</span>
              </p>
              <Link
                href="/hesap/ilan-olustur"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                İlk İlanımı Oluştur
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Stats for Job Owner */}
      {stats && !hasNoJobs && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-border p-4 text-center hover:border-primary/30 hover:shadow-sm transition-all">
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-secondary">Toplam İlan</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center hover:border-success/30 hover:shadow-sm transition-all">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <p className="text-3xl font-bold text-success">{stats.active}</p>
            </div>
            <p className="text-sm text-secondary">Aktif</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center hover:border-primary/30 hover:shadow-sm transition-all">
            <p className="text-3xl font-bold text-primary">{stats.pending}</p>
            <p className="text-sm text-secondary">Onay Bekliyor</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 text-center hover:border-border transition-all">
            <p className="text-3xl font-bold text-gray-400">{stats.expired}</p>
            <p className="text-sm text-secondary">Süresi Dolmuş</p>
          </div>
        </div>
      )}

      {/* Stats for Manufacturer */}
      {isManufacturer && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-border p-6 text-center">
            <p className="text-4xl font-bold text-foreground">{contactViews || 0}</p>
            <p className="text-sm text-secondary mt-1">Görüntülediğiniz İlanlar</p>
          </div>
          <div className="bg-gradient-to-r from-primary-light to-orange-50 rounded-xl border border-primary/20 p-6">
            <h3 className="font-semibold text-foreground mb-2">Yeni Fırsatlar Bekliyor</h3>
            <p className="text-sm text-secondary mb-4">
              Güncel fason iş ilanlarını inceleyin ve iş sahipleriyle iletişime geçin.
            </p>
            <Link
              href="/ilanlar"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              İlanları İncele
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions - Job Owner with jobs */}
      {isJobOwner && !hasNoJobs && (
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Hızlı İşlemler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Primary CTA */}
            <Link
              href="/hesap/ilan-olustur"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary to-primary-hover rounded-xl text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Yeni İlan</p>
                <p className="text-xs text-white/80">İlan oluştur</p>
              </div>
            </Link>

            {/* Secondary CTAs */}
            <Link
              href="/hesap/ilanlarim"
              className="flex items-center gap-4 p-4 bg-white border-2 border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">İlanlarım</p>
                <p className="text-xs text-secondary">Tümünü gör</p>
              </div>
            </Link>

            <Link
              href="/hesap/ayarlar"
              className="flex items-center gap-4 p-4 bg-white border-2 border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Ayarlar</p>
                <p className="text-xs text-secondary">Profili düzenle</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions - Manufacturer */}
      {isManufacturer && (
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Hesap İşlemleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/hesap/ayarlar"
              className="flex items-center gap-4 p-4 bg-white border-2 border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Profil Ayarları</p>
                <p className="text-xs text-secondary">Bilgilerinizi güncelleyin</p>
              </div>
            </Link>

            <Link
              href="/hesap/sifre-degistir"
              className="flex items-center gap-4 p-4 bg-white border-2 border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Şifre Değiştir</p>
                <p className="text-xs text-secondary">Güvenlik ayarları</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Trust Footer */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-secondary">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Güvenli Hesap
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Komisyon Yok
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            %100 Ücretsiz
          </span>
        </div>
      </div>
    </div>
  );
}
