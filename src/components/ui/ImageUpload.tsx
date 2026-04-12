"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  onUploadingChange?: (isUploading: boolean) => void;
  currentImage?: string | null;
}

/**
 * Reliable image upload component for job photos.
 * Uses native <img> for preview to ensure compatibility with data URLs and server URLs.
 */
export default function ImageUpload({ onImageUploaded, onUploadingChange, currentImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Sadece JPG, PNG veya WebP formatları kabul edilir.");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Dosya boyutu 10MB'dan küçük olmalıdır.");
      return;
    }

    setError(null);
    setImageError(false);
    setUploading(true);
    onUploadingChange?.(true);

    // Show preview immediately using data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file to server
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Yükleme başarısız");
      }

      // Update preview to the server URL and notify parent
      setPreview(data.imageUrl);
      onImageUploaded(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yükleme başarısız");
      setPreview(null);
      onImageUploaded("");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setImageError(false);
    setError(null);
    onImageUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        id="job-image-upload"
      />

      {preview && !imageError ? (
        <div className="relative">
          <div className="relative aspect-[3/2] w-full max-w-md rounded-xl overflow-hidden border border-border bg-gray-100">
            {/* Native img for reliable preview of both data URLs and server URLs */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="İlan görseli önizleme"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm font-medium">Yükleniyor...</span>
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            disabled={uploading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : preview && imageError ? (
        <div className="relative">
          <div className="relative aspect-[3/2] w-full max-w-md rounded-xl overflow-hidden border-2 border-dashed border-amber-300 bg-amber-50 flex items-center justify-center">
            <div className="text-center p-4">
              <svg className="w-10 h-10 text-amber-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm font-medium text-amber-700">Görsel yüklenemedi</p>
              <p className="text-xs text-amber-600 mt-1">Lütfen tekrar deneyin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <label
          htmlFor="job-image-upload"
          className="flex flex-col items-center justify-center w-full max-w-md aspect-[3/2] border-2 border-dashed border-border hover:border-primary/50 rounded-xl bg-gray-50 hover:bg-primary-light/30 cursor-pointer transition-all"
        >
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Fotoğraf Ekle
            </p>
            <p className="text-xs text-secondary">
              Tıklayın veya sürükleyin
            </p>
            <p className="text-xs text-secondary mt-2">
              JPG, PNG veya WebP • Maks. 10MB
            </p>
          </div>
        </label>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <p className="text-xs text-secondary">
        Ürün veya iş örneği fotoğrafı ekleyin. Görsel, ilanınızın dikkat çekmesini sağlar.
      </p>
    </div>
  );
}
