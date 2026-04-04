"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPassword, AuthState } from "@/actions/auth";

const initialState: AuthState = {};

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPassword, initialState);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Şifremi Unuttum</h1>
          <p className="text-secondary mt-2">
            E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
          </p>
        </div>

        <div className="card">
          {state.success ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">✉️</div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                E-posta Gönderildi
              </h2>
              <p className="text-secondary text-sm mb-4">
                Eğer bu e-posta adresiyle kayıtlı bir hesap varsa, şifre sıfırlama
                bağlantısı gönderildi. Lütfen gelen kutunuzu kontrol edin.
              </p>
              <Link href="/giris" className="btn-primary inline-block">
                Giriş Sayfasına Dön
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                disabled={pending}
                className="btn-primary w-full"
              >
                {pending ? "Gönderiliyor..." : "Şifre Sıfırlama Bağlantısı Gönder"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-secondary">
            <Link href="/giris" className="text-primary hover:underline">
              Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
