"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register, AuthState } from "@/actions/auth";
import { CITIES } from "@/lib/constants";

const initialState: AuthState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Kayıt Ol</h1>
          <p className="text-secondary mt-2">
            Hemen ücretsiz hesap oluşturun
          </p>
        </div>

        <div className="card">
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {state.error}
              </div>
            )}

            {/* User Type */}
            <div>
              <label className="label">Hesap Türü</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative">
                  <input
                    type="radio"
                    name="role"
                    value="JOB_OWNER"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <div className="p-3 border border-border rounded-lg text-center cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary-light">
                    <div className="text-2xl mb-1">📋</div>
                    <div className="font-medium text-sm">İş Sahibi</div>
                    <div className="text-xs text-secondary">İlan vermek istiyorum</div>
                  </div>
                </label>
                <label className="relative">
                  <input
                    type="radio"
                    name="role"
                    value="MANUFACTURER"
                    className="peer sr-only"
                  />
                  <div className="p-3 border border-border rounded-lg text-center cursor-pointer transition-all peer-checked:border-primary peer-checked:bg-primary-light">
                    <div className="text-2xl mb-1">🏭</div>
                    <div className="font-medium text-sm">Fason Üretici</div>
                    <div className="text-xs text-secondary">İş arıyorum</div>
                  </div>
                </label>
              </div>
            </div>

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
                placeholder="Firma adınız (opsiyonel)"
              />
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
                placeholder="Şifrenizi tekrar girin"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="btn-primary w-full"
            >
              {pending ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-secondary">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="text-primary hover:underline">
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
