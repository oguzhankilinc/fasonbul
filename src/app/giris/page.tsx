"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, AuthState } from "@/actions/auth";
import TrustBadges from "@/components/ui/TrustBadges";

const initialState: AuthState = {};

// Benefits list for login page
const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Yeni İş Fırsatlarını Keşfedin",
    description: "En güncel fason iş ilanlarına anında erişin",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Üreticilerle Doğrudan İletişim",
    description: "Aracı olmadan, doğrudan iletişim kurun",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Komisyonsuz İş Modeli",
    description: "Kesinti yok, tüm kazanç sizin",
  },
];

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-[80vh] py-12 px-4">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto items-start">
          {/* Left Side - Benefits & Trust */}
          <div className="lg:sticky lg:top-8 hidden lg:block">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Tekrar Hoş Geldiniz
              </h1>
              <p className="text-lg text-secondary">
                Hesabınıza giriş yapın, fason üretim fırsatlarına ulaşın.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {benefit.title}
                    </h3>
                    <p className="text-secondary text-sm mt-0.5">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mb-8">
              <TrustBadges variant="horizontal" size="sm" />
            </div>

            {/* Social Proof */}
            <div className="pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-xs font-bold">
                    M
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                    K
                  </div>
                </div>
                <p className="text-sm text-secondary">
                  <span className="font-semibold text-foreground">1000+</span> aktif kullanıcı FasonBul ile iş buluyor
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Tekrar Hoş Geldiniz
              </h1>
              <p className="text-secondary">
                Hesabınıza giriş yapın
              </p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-border shadow-lg p-6 md:p-8">
              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Giriş Yap</h2>
                <p className="text-sm text-secondary mt-1">
                  E-posta ve şifrenizle devam edin
                </p>
              </div>

              <form action={formAction} className="space-y-4">
                {state.error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {state.error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="label">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="input"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="label">
                    Şifre *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="input"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <Link
                    href="/sifremi-unuttum"
                    className="text-sm text-primary hover:text-primary-hover font-medium"
                  >
                    Şifremi Unuttum
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-gradient-to-r from-primary to-primary-hover text-white py-4 rounded-xl font-bold text-base hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {pending ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Giriş yapılıyor...
                      </span>
                    ) : (
                      "Giriş Yap"
                    )}
                  </button>
                </div>

                {/* Helper Text */}
                <p className="text-center text-xs text-secondary">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Giriş yaparak iş fırsatlarına hemen ulaşabilirsiniz
                  </span>
                </p>
              </form>

              {/* Register Link */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-secondary">
                  Hesabınız yok mu?{" "}
                  <Link href="/kayit" className="text-primary hover:text-primary-hover font-semibold">
                    Ücretsiz Kayıt Ol
                  </Link>
                </p>
              </div>
            </div>

            {/* Mobile Trust Badges */}
            <div className="lg:hidden mt-6">
              <TrustBadges variant="horizontal" size="sm" />
            </div>

            {/* Mobile Social Proof */}
            <div className="lg:hidden mt-4 text-center">
              <p className="text-sm text-secondary">
                <span className="font-semibold text-foreground">1000+</span> aktif kullanıcı platformumuzu kullanıyor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
