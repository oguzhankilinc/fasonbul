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

export default function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const startsWithPath = (path: string) => pathname.startsWith(path);

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo size="md" />
          </Link>

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
