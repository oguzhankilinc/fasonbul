"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register, AuthState } from "@/actions/auth";
import { CITIES } from "@/lib/constants";
import TrustBadges from "@/components/ui/TrustBadges";

const initialState: AuthState = {};

// Benefits list
const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    title: "Ücretsiz İlan Yayınlama",
    description: "Sınırsız ilan verin, hiçbir ücret ödemeyin",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Doğru Üreticilere Ulaşın",
    description: "Türkiye genelinde binlerce üreticiyle bağlantı kurun",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Komisyonsuz Bağlantı",
    description: "Aracı yok, kesinti yok, doğrudan iletişim",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Hızlı ve Kolay Kullanım",
    description: "2 dakikada kayıt olun, hemen ilan yayınlayın",
  },
];

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <div className="min-h-[80vh] py-12 px-4">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto items-start">
          {/* Left Side - Benefits & Trust */}
          <div className="lg:sticky lg:top-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Ücretsiz Hesabınızı Oluşturun
              </h1>
              <p className="text-lg text-secondary">
                Türkiye&apos;nin en büyük fason üretim platformuna katılın.
                İş sahipleri ve üreticiler burada buluşuyor.
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

            {/* Reassurance Text */}
            <div className="bg-success-light/50 border border-success/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Kayıt olmak ücretsizdir. Komisyon yoktur.
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Türkiye genelinde fason iş verenler ve üreticiler FasonBul&apos;da buluşuyor.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof - Desktop Only */}
            <div className="hidden lg:block mt-8 pt-8 border-t border-border">
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
                  <span className="font-semibold text-foreground">1000+</span> iş sahibi ve üretici platformumuzu kullanıyor
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div>
            <div className="bg-white rounded-2xl border-2 border-border shadow-lg p-6 md:p-8">
              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Kayıt Formu</h2>
                <p className="text-sm text-secondary mt-1">
                  Tüm alanları doldurun ve hemen başlayın
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

                {/* User Type */}
                <div>
                  <label className="label">Hesap Türü</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="JOB_OWNER"
                        defaultChecked
                        className="peer sr-only"
                      />
                      <div className="p-4 border-2 border-border rounded-xl text-center transition-all peer-checked:border-primary peer-checked:bg-primary-light hover:border-primary/50">
                        <div className="text-2xl mb-1">📋</div>
                        <div className="font-semibold text-sm text-foreground">İş Sahibi</div>
                        <div className="text-xs text-secondary mt-0.5">İlan vermek istiyorum</div>
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="MANUFACTURER"
                        className="peer sr-only"
                      />
                      <div className="p-4 border-2 border-border rounded-xl text-center transition-all peer-checked:border-primary peer-checked:bg-primary-light hover:border-primary/50">
                        <div className="text-2xl mb-1">🏭</div>
                        <div className="font-semibold text-sm text-foreground">Fason Üretici</div>
                        <div className="text-xs text-secondary mt-0.5">İş arıyorum</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Two Column Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="label">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="input"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="companyName" className="label">
                      Firma Adı
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="input"
                      placeholder="Opsiyonel"
                    />
                  </div>
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="label">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="label">
                      Şehir
                    </label>
                    <select id="city" name="city" className="select">
                      <option value="">Şehir seçin</option>
                      {CITIES.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="label">
                      Şifre *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      minLength={6}
                      className="input"
                      placeholder="En az 6 karakter"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="label">
                      Şifre Tekrar *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minLength={6}
                      className="input"
                      placeholder="Tekrar girin"
                    />
                  </div>
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
                        Kayıt yapılıyor...
                      </span>
                    ) : (
                      "Ücretsiz Kayıt Ol"
                    )}
                  </button>
                </div>

                {/* Helper Text */}
                <p className="text-center text-xs text-secondary">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2 dakikada kayıt olun, hemen ilan yayınlamaya başlayın
                  </span>
                </p>
              </form>

              {/* Login Link */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-secondary">
                  Zaten hesabınız var mı?{" "}
                  <Link href="/giris" className="text-primary hover:text-primary-hover font-semibold">
                    Giriş Yap
                  </Link>
                </p>
              </div>
            </div>

            {/* Mobile Social Proof */}
            <div className="lg:hidden mt-6 text-center">
              <p className="text-sm text-secondary">
                <span className="font-semibold text-foreground">1000+</span> iş sahibi ve üretici platformumuzu kullanıyor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
