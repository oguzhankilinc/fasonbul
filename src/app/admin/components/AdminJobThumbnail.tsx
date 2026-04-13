"use client";

import JobImage from "@/components/ui/JobImage";

interface AdminJobThumbnailProps {
  imageUrl: string | null | undefined;
  title: string;
  sector: string;
}

/**
 * Admin panelinde iş görseli thumbnail'ı.
 * JobImage bileşenini kullanır.
 */
export default function AdminJobThumbnail({ imageUrl, title, sector }: AdminJobThumbnailProps) {
  return (
    <JobImage
      imageUrl={imageUrl}
      alt={title}
      sector={sector}
      size="thumbnail"
    />
  );
}
