"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { SECTORS, CITIES } from "@/lib/constants";

interface JobFiltersProps {
  basePath?: string;
}

export default function JobFilters({ basePath = "/ilanlar" }: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSector = searchParams.get("sector") || "";
  const currentCity = searchParams.get("city") || "";

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // Reset to page 1 when filters change
      params.delete("sayfa");

      const targetPath = pathname === "/" ? basePath : pathname;
      router.push(`${targetPath}?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, pathname, basePath]
  );

  const clearFilters = useCallback(() => {
    const targetPath = pathname === "/" ? basePath : pathname;
    router.push(targetPath, { scroll: false });
  }, [router, pathname, basePath]);

  const hasFilters = currentSector || currentCity;

  return (
    <div className="filter-box mb-8">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-bold text-foreground">İlanları Filtrele</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-secondary hover:text-error font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Filtreleri Temizle
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sector Filter */}
        <div className="flex-1">
          <label htmlFor="sector" className="label flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Sektör Seçin
          </label>
          <select
            id="sector"
            value={currentSector}
            onChange={(e) => updateFilters("sector", e.target.value)}
            className="filter-select"
          >
            <option value="">Tüm Sektörler</option>
            {SECTORS.map((sector) => (
              <option key={sector.value} value={sector.value}>
                {sector.icon} {sector.label}
              </option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div className="flex-1">
          <label htmlFor="city" className="label flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Şehir Seçin
          </label>
          <select
            id="city"
            value={currentCity}
            onChange={(e) => updateFilters("city", e.target.value)}
            className="filter-select"
          >
            <option value="">Tüm Şehirler (81 il)</option>
            {CITIES.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="mt-5 pt-5 border-t border-border/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-secondary font-medium">Aktif Filtreler:</span>
            {currentSector && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light text-primary rounded-full text-xs font-semibold">
                {SECTORS.find(s => s.value === currentSector)?.icon}{" "}
                {SECTORS.find(s => s.value === currentSector)?.label}
                <button
                  onClick={() => updateFilters("sector", "")}
                  className="hover:text-primary-hover"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {currentCity && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light text-primary rounded-full text-xs font-semibold">
                {CITIES.find(c => c.value === currentCity)?.label}
                <button
                  onClick={() => updateFilters("city", "")}
                  className="hover:text-primary-hover"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
