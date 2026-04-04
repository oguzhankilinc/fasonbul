"use client";

import { useActionState } from "react";
import { changePassword, AuthState } from "@/actions/auth";

interface ChangePasswordFormProps {
  userId: string;
}

const initialState: AuthState = {};

export default function ChangePasswordForm({ userId }: ChangePasswordFormProps) {
  const [state, formAction, pending] = useActionState(changePassword, initialState);

  return (
    <div className="card">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="userId" value={userId} />

        {state.error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">
            Şifreniz başarıyla değiştirildi.
          </div>
        )}

        <div>
          <label htmlFor="currentPassword" className="label">
            Mevcut Şifre
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            required
            className="input"
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="label">
            Yeni Şifre
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
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
          />
        </div>

        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
        </button>
      </form>
    </div>
  );
}
