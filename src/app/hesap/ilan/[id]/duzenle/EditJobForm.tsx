"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateJob, JobState } from "@/actions/jobs";
import { SECTORS, CITIES, URGENCY_OPTIONS } from "@/lib/constants";
import ImageUpload from "@/components/ui/ImageUpload";

interface Job {
  id: string;
  sector: string;
  city: string;
  title: string;
  description: string;
  phone: string;
  whatsapp: string;
  urgency: string | null;
  imageUrl: string | null;
}

interface EditJobFormProps {
  job: Job;
}

const initialState: JobState = {};

export default function EditJobForm({ job }: EditJobFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateJob, initialState);
  const [imageUrl, setImageUrl] = useState<string>(job.imageUrl || "");

  if (state.success) {
    router.push("/hesap/ilanlarim");
    return null;
  }

  return (
    <div className="card">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="jobId" value={job.id} />
        <input type="hidden" name="imageUrl" value={imageUrl} />

        {state.error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {state.error}
          </div>
        )}

        {/* Section: Basic Info */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Temel Bilgiler
          </h3>
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
        </div>

        {/* Section: Job Photo */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
            İlan Fotoğrafı
          </h3>
          <ImageUpload
            onImageUploaded={(url) => setImageUrl(url)}
            currentImage={imageUrl || null}
          />
        </div>

        {/* Section: Job Details */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-xs font-bold">3</span>
            İlan Detayları
          </h3>

          <div className="space-y-4">
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

            <div>
              <label htmlFor="urgency" className="label">
                Aciliyet Durumu
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
          </div>
        </div>

        {/* Section: Contact Info */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-xs font-bold">4</span>
            İletişim Bilgileri
          </h3>

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
        </div>

        {/* Info Box */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-amber-800">Onay Süreci</p>
              <p className="text-sm text-amber-700 mt-0.5">
                Aktif bir ilanı düzenlerseniz, tekrar admin onayına gönderilecektir.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 bg-gradient-to-r from-primary to-primary-hover text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {pending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Kaydediliyor...
              </span>
            ) : (
              "Değişiklikleri Kaydet"
            )}
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
