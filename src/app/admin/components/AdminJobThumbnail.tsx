"use client";

import { useState } from "react";
import { getSectorIcon } from "@/lib/constants";
import { isValidImageUrl } from "@/lib/image-utils";

interface AdminJobThumbnailProps {
  imageUrl: string | null | undefined;
  title: string;
  sector: string;
}

export default function AdminJobThumbnail({ imageUrl, title, sector }: AdminJobThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  // Show fallback if URL is invalid or image failed to load
  if (!isValidImageUrl(imageUrl) || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-600">
        <span className="text-3xl opacity-50">{getSectorIcon(sector)}</span>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={imageUrl}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setHasError(true)}
    />
  );
}
