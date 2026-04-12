"use client";

import { useState } from "react";
import { getSectorIcon } from "@/lib/constants";
import { normalizeImageUrl } from "@/lib/image-utils";

interface AdminJobThumbnailProps {
  imageUrl: string | null | undefined;
  title: string;
  sector: string;
}

function FallbackThumbnail({ sector }: { sector: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-600">
      <span className="text-3xl opacity-50">{getSectorIcon(sector)}</span>
    </div>
  );
}

export default function AdminJobThumbnail({ imageUrl, title, sector }: AdminJobThumbnailProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Normalize legacy paths to API paths
  const normalizedUrl = normalizeImageUrl(imageUrl);

  // Show fallback if URL is invalid
  if (!normalizedUrl) {
    return <FallbackThumbnail sector={sector} />;
  }

  // Show fallback if image failed to load
  if (hasError) {
    return <FallbackThumbnail sector={sector} />;
  }

  return (
    <>
      {/* Show fallback while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-600">
          <span className="text-3xl opacity-50">{getSectorIcon(sector)}</span>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={normalizedUrl}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </>
  );
}
