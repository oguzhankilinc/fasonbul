"use client";

import { useState, useMemo } from "react";
import { getSectorIcon } from "@/lib/constants";

/**
 * UNIFIED job image component - single source of truth for all job images.
 *
 * Used by:
 * - JobCard (homepage, listings)
 * - AdminJobThumbnail (admin pages)
 * - JobDetailImage (detail page)
 * - ImageUpload preview
 *
 * Handles:
 * - Legacy URLs (/uploads/...) → converts to /api/images/uploads/...
 * - New API URLs (/api/images/...) → uses as-is
 * - External URLs (http/https) → uses as-is
 * - Data URLs (data:...) → uses as-is (for upload preview)
 * - Null/undefined/empty → shows fallback
 * - Load errors → shows fallback
 */

interface JobImageProps {
  imageUrl: string | null | undefined;
  alt: string;
  sector: string;
  className?: string;
  /**
   * Size variant:
   * - "card": Standard job card (16:9)
   * - "detail": Detail page hero (16:9, larger fallback text)
   * - "thumbnail": Admin thumbnail (fills parent container)
   */
  variant?: "card" | "detail" | "thumbnail";
}

/**
 * Resolves any image URL format to a renderable URL.
 * This is the SINGLE place where URL normalization happens.
 */
function resolveImageUrl(url: string | null | undefined): string | null {
  // Null, undefined, or non-string
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Data URLs (for local preview) - return as-is
  if (trimmed.startsWith("data:")) {
    return trimmed;
  }

  // External URLs - return as-is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Must start with / for local paths
  if (!trimmed.startsWith("/")) return null;

  // Already using API route - return as-is
  if (trimmed.startsWith("/api/images/")) {
    // Validate it has an image extension
    if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(trimmed)) return null;
    return trimmed;
  }

  // Legacy static path - convert to API route
  if (trimmed.startsWith("/uploads/")) {
    // Validate it has an image extension
    if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(trimmed)) return null;
    return `/api/images${trimmed}`;
  }

  // Unknown local path format - invalid
  return null;
}

function Fallback({ sector, variant }: { sector: string; variant: string }) {
  const isDetail = variant === "detail";
  const isThumbnail = variant === "thumbnail";

  const bgClass = isThumbnail
    ? "bg-gray-600"
    : "bg-gradient-to-br from-gray-50 to-gray-100";

  const iconClass = isThumbnail
    ? "text-3xl"
    : isDetail
    ? "text-7xl"
    : "text-5xl";

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${bgClass}`}>
      <div className="text-center">
        <span className={`${iconClass} opacity-50 block`} role="img" aria-hidden="true">
          {getSectorIcon(sector)}
        </span>
        {isDetail && (
          <p className="text-sm text-secondary mt-2 opacity-60">Görsel yok</p>
        )}
      </div>
    </div>
  );
}

export default function JobImage({
  imageUrl,
  alt,
  sector,
  className = "",
  variant = "card",
}: JobImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Resolve URL once using memoization
  const resolvedUrl = useMemo(() => resolveImageUrl(imageUrl), [imageUrl]);

  // Determine if we should show image or fallback
  const showImage = resolvedUrl !== null && !hasError;

  // Container classes based on variant
  const containerClass = variant === "thumbnail"
    ? "relative w-full h-full"
    : "relative aspect-[16/9] w-full overflow-hidden";

  return (
    <div className={`${containerClass} ${className}`}>
      {/* Always render fallback as background - simplifies logic */}
      <Fallback sector={sector} variant={variant} />

      {/* Image overlays fallback when loaded */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedUrl}
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

/**
 * Export the resolver for use in other contexts (e.g., server-side validation)
 */
export { resolveImageUrl };
