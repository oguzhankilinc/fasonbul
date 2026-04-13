"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

interface User {
  id: string;
  name: string;
  role: string;
}

interface HeaderProps {
  user: User | null;
}

// Slogan badges for trust
const sloganBadges = [
  { text: "Her Zaman Ücretsiz", icon: "gift" },
  { text: "Komisyon Yok", icon: "check" },
  { text: "Senin İçin", icon: "star" },
];

export default function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const startsWithPath = (path: string) => pathname.startsWith(path);

  const BadgeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "gift":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        );
      case "check":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "star":
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Slogan Badges */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0">
              <Logo size="lg" />
            </Link>

            {/* Desktop Slogan Badges */}
            <div className="hidden lg:flex items-center gap-2">
              {sloganBadges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-primary-light to-orange-50 border border-primary/20 rounded-full text-xs font-medium text-primary"
                >
                  <BadgeIcon type={badge.icon} />
                  {badge.text}
                </span>
              ))}
            </div>

            {/* Tablet: Show 2 badges */}
            <div className="hidden md:flex lg:hidden items-center gap-1.5">
              {sloganBadges.slice(0, 2).map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-light border border-primary/10 rounded-full text-xs font-medium text-primary"
                >
                  <BadgeIcon type={badge.icon} />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive("/")
                  ? "bg-primary-light text-primary"
                  : "text-secondary hover:text-foreground hover:bg-muted"
              }`}
            >
              Vitrin
            </Link>
            <Link
              href="/ilanlar"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                startsWithPath("/ilanlar")
                  ? "bg-primary-light text-primary"
                  : "text-secondary hover:text-foreground hover:bg-muted"
              }`}
            >
              Tüm İlanlar
            </Link>

            <div className="w-px h-6 bg-border mx-2" />

            {user ? (
              <>
                {user.role === "JOB_OWNER" && (
                  <Link
                    href="/hesap/ilan-olustur"
                    className="btn-primary text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    İlan Ver
                  </Link>
                )}
                <Link
                  href="/hesap"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    startsWithPath("/hesap")
                      ? "bg-primary-light text-primary"
                      : "text-secondary hover:text-foreground hover:bg-muted"
                  }`}
                >
                  Hesabım
                </Link>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      startsWithPath("/admin")
                        ? "bg-primary-light text-primary"
                        : "text-secondary hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-secondary hover:text-foreground hover:bg-muted transition-all duration-200"
                  >
                    Çıkış
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/giris"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-secondary hover:text-foreground hover:bg-muted transition-all duration-200"
                >
                  Giriş Yap
                </Link>
                <Link href="/kayit" className="btn-primary text-sm">
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü aç"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {/* Mobile Slogan Badges */}
            <div className="flex flex-wrap gap-1.5 px-4 mb-4">
              {sloganBadges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary-light border border-primary/10 rounded-full text-xs font-medium text-primary"
                >
                  <BadgeIcon type={badge.icon} />
                  {badge.text}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className={`px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive("/")
                    ? "bg-primary-light text-primary"
                    : "text-secondary hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Vitrin
              </Link>
              <Link
                href="/ilanlar"
                className={`px-4 py-3 rounded-xl text-sm font-medium ${
                  startsWithPath("/ilanlar")
                    ? "bg-primary-light text-primary"
                    : "text-secondary hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tüm İlanlar
              </Link>

              <div className="border-t border-border my-2" />

              {user ? (
                <>
                  {user.role === "JOB_OWNER" && (
                    <Link
                      href="/hesap/ilan-olustur"
                      className="px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-white text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      İlan Ver
                    </Link>
                  )}
                  <Link
                    href="/hesap"
                    className={`px-4 py-3 rounded-xl text-sm font-medium ${
                      startsWithPath("/hesap")
                        ? "bg-primary-light text-primary"
                        : "text-secondary hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Hesabım
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className={`px-4 py-3 rounded-xl text-sm font-medium ${
                        startsWithPath("/admin")
                          ? "bg-primary-light text-primary"
                          : "text-secondary hover:bg-muted"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <form action="/api/auth/logout" method="POST">
                    <button
                      type="submit"
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-secondary hover:bg-muted"
                    >
                      Çıkış Yap
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/giris"
                    className="px-4 py-3 rounded-xl text-sm font-medium text-secondary hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/kayit"
                    className="px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-white text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
