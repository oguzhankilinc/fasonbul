"use client";

import { useState } from "react";
import { getSectorIcon } from "@/lib/constants";
import { normalizeImageUrl } from "@/lib/image-utils";

interface JobImageProps {
  imageUrl: string | null | undefined;
  alt: string;
  sector: string;
  size?: "card" | "detail" | "thumbnail";
}

/**
 * Tek iş görseli bileşeni.
 *
 * - imageUrl'i normalize eder (legacy /uploads → /api/images)
 * - Görsel varsa gösterir
 * - Görsel yoksa veya hata olursa fallback gösterir
 * - Basit, anlaşılır, tek kaynak
 */
export default function JobImage({ imageUrl, alt, sector, size = "card" }: JobImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // URL'yi normalize et (legacy path → API path)
  const normalizedUrl = normalizeImageUrl(imageUrl);

  // Görsel gösterilecek mi?
  const showImage = normalizedUrl !== null && !hasError;

  // Fallback görseli
  const Fallback = () => {
    const iconSize = size === "detail" ? "text-7xl" : size === "thumbnail" ? "text-3xl" : "text-5xl";
    const bgClass = size === "thumbnail"
      ? "bg-gray-600"
      : "bg-gradient-to-br from-gray-50 to-gray-100";

    return (
      <div className={`absolute inset-0 flex items-center justify-center ${bgClass}`}>
        <div className="text-center">
          <span className={`${iconSize} opacity-50 block`} role="img" aria-hidden="true">
            {getSectorIcon(sector)}
          </span>
          {size === "detail" && (
            <p className="text-sm text-secondary mt-2 opacity-60">Görsel yok</p>
          )}
        </div>
      </div>
    );
  };

  // Container class
  const containerClass = size === "thumbnail"
    ? "relative w-full h-full"
    : "relative aspect-[16/9] w-full overflow-hidden";

  return (
    <div className={containerClass}>
      {/* Fallback her zaman arka planda */}
      <Fallback />

      {/* Görsel varsa üstüne bindir */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={normalizedUrl}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
