"use client";

import { useState, useRef, useEffect } from "react";
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
 * Aspect Ratio'lar:
 * - card: 16/9 (standart kart görseli)
 * - detail: 2/1 (detay sayfası - daha geniş ve etkileyici)
 * - thumbnail: 4/3 (admin panel - kompakt)
 *
 * Özellikler:
 * - imageUrl'i normalize eder (legacy /uploads → /api/images)
 * - Görsel varsa gösterir, yoksa/hata olursa fallback
 * - Hard refresh'te de kararlı (hydration sonrası img.complete kontrolü)
 * - object-position: center top (ürün/yüz odaklı kırpma)
 */
export default function JobImage({ imageUrl, alt, sector, size = "card" }: JobImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // URL'yi normalize et (legacy path → API path)
  const normalizedUrl = normalizeImageUrl(imageUrl);

  // Hydration sonrası: görsel zaten yüklenmişse state'i güncelle
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Görsel zaten yüklendiyse (cache'den veya hızlı yükleme)
    if (img.complete) {
      if (img.naturalWidth > 0) {
        setIsLoaded(true);
      } else {
        // complete ama naturalWidth=0 → yükleme hatası
        setHasError(true);
      }
    }
  }, [normalizedUrl]);

  // Görsel gösterilecek mi?
  const showImage = normalizedUrl !== null && !hasError;

  // Size'a göre ayarlar
  // Not: Card ve detail rounded'ları parent container tarafından yönetiliyor
  const sizeConfig = {
    card: {
      aspect: "aspect-[16/9]",
      iconSize: "text-5xl",
      bgClass: "bg-gradient-to-br from-gray-50 to-gray-100",
      showLabel: false,
      rounded: "", // Parent (JobCard article) overflow-hidden ile kırpılıyor
    },
    detail: {
      aspect: "aspect-[2/1]",
      iconSize: "text-7xl",
      bgClass: "bg-gradient-to-br from-gray-50 to-gray-100",
      showLabel: true,
      rounded: "", // Parent (detail article) overflow-hidden ile kırpılıyor
    },
    thumbnail: {
      aspect: "aspect-[4/3]",
      iconSize: "text-3xl",
      bgClass: "bg-gray-600",
      showLabel: false,
      rounded: "rounded-lg", // Admin panel - kendi rounded'ını kullanıyor
    },
  };

  const config = sizeConfig[size];

  return (
    <div className={`relative ${config.aspect} w-full overflow-hidden ${config.rounded}`}>
      {/* Fallback - her zaman arka planda */}
      <div className={`absolute inset-0 flex items-center justify-center ${config.bgClass}`}>
        <div className="text-center">
          <span className={`${config.iconSize} opacity-50 block`} role="img" aria-hidden="true">
            {getSectorIcon(sector)}
          </span>
          {config.showLabel && (
            <p className="text-sm text-secondary mt-2 opacity-60">Görsel yok</p>
          )}
        </div>
      </div>

      {/* Görsel - varsa üstüne bindir */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={normalizedUrl}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
