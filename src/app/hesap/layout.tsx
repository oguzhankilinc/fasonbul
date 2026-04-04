import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris");
  }

  const navItems = [
    { href: "/hesap", label: "Dashboard", icon: "📊" },
    ...(user.role === "JOB_OWNER"
      ? [
          { href: "/hesap/ilanlarim", label: "İlanlarım", icon: "📋" },
          { href: "/hesap/ilan-olustur", label: "Yeni İlan", icon: "➕" },
        ]
      : []),
    { href: "/hesap/ayarlar", label: "Ayarlar", icon: "⚙️" },
    { href: "/hesap/sifre-degistir", label: "Şifre Değiştir", icon: "🔒" },
  ];

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card">
            <div className="mb-4 pb-4 border-b border-border">
              <p className="font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-secondary">{user.email}</p>
              <span className="badge-primary mt-2 inline-block">
                {user.role === "JOB_OWNER" && "İş Sahibi"}
                {user.role === "MANUFACTURER" && "Üretici"}
                {user.role === "ADMIN" && "Admin"}
              </span>
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  );
}
