"use client";

import { useState } from "react";
import { getSectorIcon } from "@/lib/constants";
import { isValidImageUrl } from "@/lib/image-utils";

interface JobDetailImageProps {
  imageUrl: string | null;
  title: string;
  sector: string;
  sectorLabel: string;
}

export default function JobDetailImage({ imageUrl, title, sector, sectorLabel }: JobDetailImageProps) {
  const [hasError, setHasError] = useState(false);

  // Show fallback if URL is invalid or image failed to load
  if (!isValidImageUrl(imageUrl) || hasError) {
    return (
      <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-7xl opacity-40" role="img" aria-label={sectorLabel}>
            {getSectorIcon(sector)}
          </span>
          <p className="text-sm text-secondary mt-2 opacity-60">Görsel yok</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
