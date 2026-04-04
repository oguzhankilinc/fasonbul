"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateJob, JobState } from "@/actions/jobs";
import { SECTORS, CITIES, URGENCY_OPTIONS } from "@/lib/constants";

interface Job {
  id: string;
  sector: string;
  city: string;
  title: string;
  description: string;
  phone: string;
  whatsapp: string;
  urgency: string | null;
}

interface EditJobFormProps {
  job: Job;
}

const initialState: JobState = {};

export default function EditJobForm({ job }: EditJobFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateJob, initialState);

  if (state.success) {
    router.push("/hesap/ilanlarim");
    return null;
  }

  return (
    <div className="card">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="jobId" value={job.id} />

        {state.error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {state.error}
          </div>
        )}

        {/* Sector & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sector" className="label">
              Sektör *
            </label>
            <select
              id="sector"
              name="sector"
              required
              defaultValue={job.sector}
              className="select"
            >
              <option value="">Sektör seçin</option>
              {SECTORS.map((sector) => (
                <option key={sector.value} value={sector.value}>
                  {sector.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city" className="label">
              Şehir *
            </label>
            <select
              id="city"
              name="city"
              required
              defaultValue={job.city}
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
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="label">
            İlan Başlığı *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            minLength={10}
            defaultValue={job.title}
            className="input"
          />
          <p className="text-xs text-secondary mt-1">En az 10 karakter</p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="label">
            İlan Açıklaması *
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={50}
            rows={6}
            defaultValue={job.description}
            className="input resize-none"
          />
          <p className="text-xs text-secondary mt-1">En az 50 karakter</p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="label">
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              defaultValue={job.phone}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="label">
              WhatsApp *
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              required
              defaultValue={job.whatsapp}
              className="input"
            />
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label htmlFor="urgency" className="label">
            Aciliyet
          </label>
          <select
            id="urgency"
            name="urgency"
            defaultValue={job.urgency || "normal"}
            className="select"
          >
            {URGENCY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Not:</strong> Aktif bir ilanı düzenlerseniz, tekrar admin
            onayına gönderilecektir.
          </p>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button type="submit" disabled={pending} className="btn-primary flex-1">
            {pending ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
}
