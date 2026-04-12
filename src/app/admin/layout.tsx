import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { adminLogout } from "@/actions/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  // Middleware handles the redirect, but double-check here
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
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card">
            <div className="mb-4 pb-4 border-b border-border">
              <p className="font-semibold text-foreground">Admin Panel</p>
              <p className="text-sm text-secondary">{admin.name}</p>
              <p className="text-xs text-secondary">{admin.email}</p>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-secondary hover:bg-muted hover:text-foreground transition-colors"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* Logout Button */}
            <div className="mt-4 pt-4 border-t border-border">
              <form action={adminLogout}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span>🚪</span>
                  Çıkış Yap
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  );
}
