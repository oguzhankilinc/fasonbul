import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatRelativeDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Bugün";
  } else if (diffInDays === 1) {
    return "Dün";
  } else if (diffInDays < 7) {
    return `${diffInDays} gün önce`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} hafta önce`;
  } else {
    return formatDate(date);
  }
}

export function getRemainingDays(expiresAt: Date | string | null): number {
  if (!expiresAt) return 0;
  const expiry = new Date(expiresAt);
  const now = new Date();
  const diffInMs = expiry.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffInMs / (1000 * 60 * 60 * 24)));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const phoneWithCountry = cleanPhone.startsWith("90")
    ? cleanPhone
    : `90${cleanPhone}`;
  const baseUrl = `https://wa.me/${phoneWithCountry}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `0${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
}
