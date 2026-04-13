"use client";

import JobImage from "@/components/ui/JobImage";

interface JobDetailImageProps {
  imageUrl: string | null;
  title: string;
  sector: string;
}

/**
 * İlan detay sayfasında görsel.
 * JobImage bileşenini kullanır.
 */
export default function JobDetailImage({ imageUrl, title, sector }: JobDetailImageProps) {
  return (
    <JobImage
      imageUrl={imageUrl}
      alt={title}
      sector={sector}
      size="detail"
    />
  );
}
