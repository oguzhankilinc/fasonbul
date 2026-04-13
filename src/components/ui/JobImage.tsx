"use client";

import { useState } from "react";
import { getSectorIcon } from "@/lib/constants";

interface JobImageProps {
  src: string | null | undefined;
  alt: string;
  sector: string;
  className?: string;
  aspectRatio?: "16/9" | "3/2" | "square";
  priority?: boolean;
}

/**
 * Reliable job image component for user-uploaded images.
 * Uses native <img> for maximum compatibility with local uploads.
 * Falls back to sector icon if image is missing or fails to load.
 */
export default function JobImage({
  src,
  alt,
  sector,
  className = "",
  aspectRatio = "16/9",
}: JobImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!!src);

  const showFallback = !src || hasError;

  const aspectClasses = {
    "16/9": "aspect-[16/9]",
    "3/2": "aspect-[3/2]",
    "square": "aspect-square",
  };

  if (showFallback) {
    return (
      <div
        className={`relative w-full ${aspectClasses[aspectRatio]} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${className}`}
      >
        <span className="text-5xl opacity-50" role="img" aria-label={alt}>
          {getSectorIcon(sector)}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectClasses[aspectRatio]} bg-gray-100 overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
