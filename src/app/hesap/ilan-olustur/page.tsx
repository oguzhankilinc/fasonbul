"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createJob, JobState } from "@/actions/jobs";
import { SECTORS, CITIES, URGENCY_OPTIONS } from "@/lib/constants";
import ImageUpload from "@/components/ui/ImageUpload";

const initialState: JobState = {};

export default function CreateJobPage() {
  const [state, formAction, pending] = useActionState(createJob, initialState);
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Yeni Fason İş İlanı Oluştur
        </h1>
        <p className="text-secondary">
          İlanınızı oluşturun, doğru üreticiler size ulaşsın
        </p>
      </div>

      {/* Top Info Box */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-800">
            İlanınız yayına girdikten sonra üreticiler sizinle doğrudan iletişime geçer.
            <span className="font-medium"> Komisyon yok, aracı yok.</span>
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border-2 border-border shadow-lg p-6 md:p-8">
        <form action={formAction} className="space-y-6">
          {state.error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
                <select id="sector" name="sector" required className="select">
                  <option value="">Sektör seçin</option>
                  {SECTORS.map((sector) => (
                    <option key={sector.value} value={sector.value}>
                      {sector.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-secondary mt-1">İşinizle ilgili sektörü seçin</p>
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
                <p className="text-xs text-secondary mt-1">Üretim yapılacak şehir</p>
              </div>
            </div>
          </div>

          {/* Section: Job Photo */}
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
              İlan Fotoğrafı
            </h3>
            <input type="hidden" name="imageUrl" value={imageUrl} />
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
                  className="input"
                  placeholder="Örn: 1000 adet tişört dikimi için atölye arıyoruz"
                />
                <p className="text-xs text-secondary mt-1">Kısa ve açıklayıcı bir başlık yazın (en az 10 karakter)</p>
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
                  className="input resize-none"
                  placeholder="İşin detaylarını açıklayın:&#10;• Ürün tipi ve özellikleri&#10;• Miktar ve adet bilgisi&#10;• Kalite beklentisi&#10;• Teslimat süresi&#10;• Özel gereksinimler"
                />
                <p className="text-xs text-secondary mt-1">Detaylı açıklama daha fazla üretici ilgisi çeker (en az 50 karakter)</p>
              </div>

              <div>
                <label htmlFor="urgency" className="label">
                  Aciliyet Durumu
                </label>
                <select id="urgency" name="urgency" className="select">
                  {URGENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-secondary mt-1">Acil işler daha fazla dikkat çeker</p>
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
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="input"
                  placeholder="05XX XXX XX XX"
                />
                <p className="text-xs text-secondary mt-1">Üreticiler sizi bu numaradan arayacak</p>
              </div>

              <div>
                <label htmlFor="whatsapp" className="label">
                  WhatsApp Numarası *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  className="input"
                  placeholder="05XX XXX XX XX"
                />
                <p className="text-xs text-secondary mt-1">Telefon ile aynıysa aynı numarayı girin</p>
              </div>
            </div>
          </div>

          {/* Admin Approval Notice */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-800">Onay Süreci</p>
                <p className="text-sm text-amber-700 mt-0.5">
                  İlanınız admin onayından sonra yayınlanacaktır. Onay süreci genellikle 24 saat içinde tamamlanır.
                </p>
              </div>
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
                  İlan Oluşturuluyor...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  İlanı Yayınla
                </span>
              )}
            </button>
          </div>

          {/* Trust Line */}
          <p className="text-center text-xs text-secondary flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Ücretsiz yayınlanır • Komisyon yok • Doğrudan iletişim
          </p>
        </form>
      </div>
    </div>
  );
}
