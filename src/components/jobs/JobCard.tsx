import Link from "next/link";
import {
  getSectorLabel,
  getCityLabel,
  getUrgencyLabel,
  getSectorIcon,
} from "@/lib/constants";
import { formatRelativeDate, getRemainingDays, truncateText } from "@/lib/utils";

interface Job {
  id: string;
  title: string;
  description: string;
  sector: string;
  city: string;
  urgency: string | null;
  createdAt: Date;
  expiresAt: Date | null;
  isFeatured?: boolean;
}

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  const remainingDays = getRemainingDays(job.expiresAt);
  const isUrgent = job.urgency && job.urgency !== "normal";

  return (
    <Link href={`/ilan/${job.id}`} className="block group">
      <article
        className={`h-full flex flex-col rounded-2xl p-6 transition-all duration-300 ${
          featured
            ? "bg-gradient-to-br from-white via-primary-light/20 to-primary-light/40 border-2 border-primary/25 shadow-md hover:shadow-xl hover:border-primary/40"
            : "bg-white border border-border shadow-sm hover:shadow-lg hover:border-primary/30"
        } hover:-translate-y-1`}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-white">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Öne Çıkan
            </span>
          </div>
        )}

        {/* Header with Sector & Urgency */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span
              className="text-2xl flex-shrink-0"
              role="img"
              aria-label={getSectorLabel(job.sector)}
            >
              {getSectorIcon(job.sector)}
            </span>
            <span className="badge-primary text-xs font-semibold">
              {getSectorLabel(job.sector)}
            </span>
          </div>
          {isUrgent && (
            <span
              className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                job.urgency === "cok-acil"
                  ? "bg-error-light text-red-700 border border-error/20"
                  : "bg-warning-light text-amber-700 border border-warning/20"
              }`}
            >
              {getUrgencyLabel(job.urgency!)}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-bold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-3">
          {job.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-secondary leading-relaxed line-clamp-2 flex-grow mb-5">
          {truncateText(job.description, 100)}
        </p>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <div className="flex items-center gap-1.5 text-xs text-secondary">
            <svg
              className="w-4 h-4 text-primary/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="font-semibold text-foreground">
              {getCityLabel(job.city)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-secondary">{formatRelativeDate(job.createdAt)}</span>
            {job.expiresAt && remainingDays > 0 && (
              <span
                className={`font-semibold px-2 py-0.5 rounded ${
                  remainingDays <= 5
                    ? "text-error bg-error-light"
                    : "text-secondary bg-muted"
                }`}
              >
                {remainingDays}g
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-border/60">
          <span className="text-sm font-semibold text-primary group-hover:text-primary-hover transition-colors inline-flex items-center gap-1.5">
            İlanı İncele
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
