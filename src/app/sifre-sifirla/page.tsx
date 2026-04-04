"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword, AuthState } from "@/actions/auth";
import { Suspense } from "react";

const initialState: AuthState = {};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, formAction, pending] = useActionState(resetPassword, initialState);

  if (!token) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Geçersiz Bağlantı
        </h2>
        <p className="text-secondary text-sm mb-4">
          Bu şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.
        </p>
        <Link href="/sifremi-unuttum" className="btn-primary inline-block">
          Yeni Bağlantı İste
        </Link>
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Şifre Değiştirildi
        </h2>
        <p className="text-secondary text-sm mb-4">
          Şifreniz başarıyla değiştirildi. Yeni şifrenizle giriş yapabilirsiniz.
        </p>
        <Link href="/giris" className="btn-primary inline-block">
          Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />

      {state.error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="password" className="label">
          Yeni Şifre
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
          Yeni Şifre Tekrar
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
        {pending ? "Şifre değiştiriliyor..." : "Şifreyi Değiştir"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Şifre Sıfırla</h1>
          <p className="text-secondary mt-2">
            Yeni şifrenizi belirleyin
          </p>
        </div>

        <div className="card">
          <Suspense fallback={<div className="animate-pulse h-40 bg-muted rounded" />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
