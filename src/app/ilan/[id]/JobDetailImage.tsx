"use client";

import JobImage from "@/components/ui/JobImage";

interface JobDetailImageProps {
  imageUrl: string | null;
  title: string;
  sector: string;
  sectorLabel: string;
}

/**
 * Job detail page image - uses unified JobImage component.
 */
export default function JobDetailImage({ imageUrl, title, sector }: JobDetailImageProps) {
  return (
    <JobImage
      imageUrl={imageUrl}
      alt={title}
      sector={sector}
      variant="detail"
    />
  );
}
