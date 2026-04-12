"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AccountSidebarProps {
  user: User;
}

const navIcons = {
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  jobs: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  create: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  password: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
};

export default function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/hesap", label: "Dashboard", icon: navIcons.dashboard, exact: true },
    ...(user.role === "JOB_OWNER"
      ? [
          { href: "/hesap/ilanlarim", label: "İlanlarım", icon: navIcons.jobs, exact: false },
          { href: "/hesap/ilan-olustur", label: "Yeni İlan", icon: navIcons.create, exact: false, highlight: true },
        ]
      : []),
    { href: "/hesap/ayarlar", label: "Ayarlar", icon: navIcons.settings, exact: false },
    { href: "/hesap/sifre-degistir", label: "Şifre Değiştir", icon: navIcons.password, exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const roleLabels: Record<string, string> = {
    JOB_OWNER: "İş Sahibi",
    MANUFACTURER: "Üretici",
    ADMIN: "Admin",
  };

  const roleColors: Record<string, string> = {
    JOB_OWNER: "bg-primary-light text-primary",
    MANUFACTURER: "bg-blue-50 text-blue-600",
    ADMIN: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* User Info */}
      <div className="p-5 bg-gradient-to-br from-gray-50 to-white border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-secondary truncate">{user.email}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[user.role] || "bg-gray-100 text-gray-600"}`}>
          {user.role === "JOB_OWNER" && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
          {user.role === "MANUFACTURER" && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )}
          {roleLabels[user.role] || user.role}
        </span>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact || false);
          const highlight = (item as { highlight?: boolean }).highlight;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-primary-light text-primary"
                  : highlight
                  ? "bg-gradient-to-r from-primary to-primary-hover text-white hover:shadow-md"
                  : "text-secondary hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className={active ? "text-primary" : highlight ? "text-white" : ""}>
                {item.icon}
              </span>
              {item.label}
              {highlight && !active && (
                <span className="ml-auto text-xs bg-white/20 px-1.5 py-0.5 rounded">
                  +
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Help Link */}
      <div className="p-3 border-t border-border">
        <Link
          href="/iletisim"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-secondary hover:text-foreground hover:bg-muted transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Yardım ve Destek
        </Link>
      </div>
    </div>
  );
}
