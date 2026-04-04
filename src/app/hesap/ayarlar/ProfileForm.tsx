"use client";

import { useActionState } from "react";
import { updateProfile, AuthState } from "@/actions/auth";
import { CITIES } from "@/lib/constants";

interface User {
  id: string;
  name: string;
  companyName: string | null;
  phone: string | null;
  city: string | null;
}

interface ProfileFormProps {
  user: User;
}

const initialState: AuthState = {};

export default function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <div className="card">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="userId" value={user.id} />

        {state.error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">
            Profil bilgileriniz güncellendi.
          </div>
        )}

        <div>
          <label htmlFor="name" className="label">
            Ad Soyad *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={user.name}
            className="input"
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
            defaultValue={user.companyName || ""}
            className="input"
            placeholder="Opsiyonel"
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
            defaultValue={user.phone || ""}
            className="input"
            placeholder="05XX XXX XX XX"
          />
        </div>

        <div>
          <label htmlFor="city" className="label">
            Şehir
          </label>
          <select
            id="city"
            name="city"
            defaultValue={user.city || ""}
            className="select"
          >
            <option value="">Şehir seçin</option>
            {CITIES.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </button>
      </form>
    </div>
  );
}
