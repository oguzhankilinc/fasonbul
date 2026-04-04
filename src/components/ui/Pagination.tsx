import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("sayfa", page.toString());
    } else {
      params.delete("sayfa");
    }
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show with ellipsis
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Sayfalama">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="pagination-btn"
          aria-label="Önceki sayfa"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <span className="pagination-btn opacity-50 cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-secondary">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={buildUrl(page)}
            className={page === currentPage ? "pagination-btn-active" : "pagination-btn"}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="pagination-btn"
          aria-label="Sonraki sayfa"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span className="pagination-btn opacity-50 cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </nav>
  );
}
