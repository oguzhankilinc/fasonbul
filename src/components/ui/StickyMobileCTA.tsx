"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyMobileCTA() {
  // TEMPORARY: Disabled for Safari isolation test
  return null;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Gradient fade effect */}
      <div className="h-4 bg-gradient-to-t from-white to-transparent" />

      {/* CTA Bar */}
      <div className="bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 pb-[env(safe-area-inset-bottom)] pt-3">
        <Link
          href="/kayit"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-primary-hover text-white py-3.5 rounded-xl font-bold text-base shadow-lg active:scale-[0.98] transition-transform"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Ücretsiz İlan Ver
        </Link>
        <p className="text-center text-xs text-secondary mt-2">
          Kayıt ol, 2 dakikada ilan oluştur
        </p>
      </div>
    </div>
  );
}
