"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, AuthState } from "@/actions/auth";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Giriş Yap</h1>
          <p className="text-secondary mt-2">
            Hesabınıza giriş yaparak devam edin
          </p>
        </div>

        <div className="card">
          <form action={formAction} className="space-y-4">
            {state.error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {state.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="label">
                E-posta
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
                Şifre
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

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/sifremi-unuttum"
                className="text-primary hover:underline"
              >
                Şifremi Unuttum
              </Link>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="btn-primary w-full"
            >
              {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-secondary">
            Hesabınız yok mu?{" "}
            <Link href="/kayit" className="text-primary hover:underline">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
