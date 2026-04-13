"use client";

import JobImage from "@/components/ui/JobImage";

interface AdminJobThumbnailProps {
  imageUrl: string | null | undefined;
  title: string;
  sector: string;
}

/**
 * Admin job thumbnail - uses unified JobImage component.
 */
export default function AdminJobThumbnail({ imageUrl, title, sector }: AdminJobThumbnailProps) {
  return (
    <JobImage
      imageUrl={imageUrl}
      alt={title}
      sector={sector}
      variant="thumbnail"
    />
  );
}
