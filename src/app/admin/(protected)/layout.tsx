import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { adminLogout } from "@/actions/admin-auth";
import Logo from "@/components/ui/Logo";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/bekleyen", label: "Bekleyen İlanlar", icon: "⏳" },
    { href: "/admin/aktif", label: "Aktif İlanlar", icon: "✅" },
    { href: "/admin/pasif", label: "Pasif İlanlar", icon: "⏸️" },
    { href: "/admin/suresi-dolan", label: "Süresi Dolanlar", icon: "⌛" },
    { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Admin Info & Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="mb-3">
            <p className="text-sm font-medium text-white truncate">{admin.name}</p>
            <p className="text-xs text-gray-400 truncate">{admin.email}</p>
          </div>
          <form action={adminLogout}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 bg-red-900/20 hover:bg-red-900/40 hover:text-red-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-white">FasonBul Yönetim Paneli</h1>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Siteyi Görüntüle</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
