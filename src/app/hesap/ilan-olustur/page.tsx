"use client";

import { useActionState } from "react";
import { createJob, JobState } from "@/actions/jobs";
import { SECTORS, CITIES, URGENCY_OPTIONS } from "@/lib/constants";

const initialState: JobState = {};

export default function CreateJobPage() {
  const [state, formAction, pending] = useActionState(createJob, initialState);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Yeni İlan Oluştur</h1>

      <div className="card">
        <form action={formAction} className="space-y-6">
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
              <select id="sector" name="sector" required className="select">
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
              <select id="city" name="city" required className="select">
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
              className="input"
              placeholder="Örn: 1000 adet tişört dikimi için atölye arıyoruz"
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
              className="input resize-none"
              placeholder="İşin detaylarını açıklayın. Ürün tipi, miktar, kalite beklentisi, teslimat süresi gibi bilgileri ekleyin."
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
                className="input"
                placeholder="05XX XXX XX XX"
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
                className="input"
                placeholder="05XX XXX XX XX"
              />
              <p className="text-xs text-secondary mt-1">
                Telefon ile aynıysa aynı numarayı girin
              </p>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label htmlFor="urgency" className="label">
              Aciliyet
            </label>
            <select id="urgency" name="urgency" className="select">
              {URGENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-primary-light rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Not:</strong> İlanınız admin onayından sonra yayınlanacaktır.
              Onay süreci genellikle 24 saat içinde tamamlanır.
            </p>
          </div>

          {/* Submit */}
          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? "Gönderiliyor..." : "İlan Oluştur"}
          </button>
        </form>
      </div>
    </div>
  );
}
