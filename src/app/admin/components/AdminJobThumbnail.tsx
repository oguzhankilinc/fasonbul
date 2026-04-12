"use client";

import { useState } from "react";
import { getSectorIcon } from "@/lib/constants";

interface AdminJobThumbnailProps {
  imageUrl: string | null | undefined;
  title: string;
  sector: string;
}

export default function AdminJobThumbnail({ imageUrl, title, sector }: AdminJobThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <span className="text-3xl opacity-50">{getSectorIcon(sector)}</span>
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </>
  );
}
