/**
 * Validates if an imageUrl is potentially valid for rendering.
 * Returns false for null, undefined, empty, whitespace, or obviously invalid paths.
 *
 * Accepts:
 * - /uploads/jobs/xxx.jpg (legacy static paths)
 * - /api/images/uploads/jobs/xxx.jpg (dynamic API paths)
 * - https://... (external URLs)
 */
export function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== "string") return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  // Must be a path or full URL
  if (!trimmed.startsWith("/") && !trimmed.startsWith("http")) return false;

  // For local paths (not http), must have a file extension
  if (trimmed.startsWith("/") && !trimmed.startsWith("http")) {
    // Must end with image extension
    if (!trimmed.match(/\.(jpg|jpeg|png|webp|gif)$/i)) return false;
  }

  return true;
}

/**
 * Normalizes an image URL to use the dynamic API route.
 *
 * Converts legacy static paths to API paths:
 * - /uploads/jobs/xxx.jpg -> /api/images/uploads/jobs/xxx.jpg
 *
 * Leaves already-normalized paths and external URLs unchanged:
 * - /api/images/uploads/jobs/xxx.jpg -> unchanged
 * - https://example.com/image.jpg -> unchanged
 *
 * Returns null for invalid URLs.
 */
export function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!isValidImageUrl(url)) return null;

  const trimmed = url.trim();

  // External URLs - return as-is
  if (trimmed.startsWith("http")) {
    return trimmed;
  }

  // Already using API route - return as-is
  if (trimmed.startsWith("/api/images/")) {
    return trimmed;
  }

  // Legacy static path - convert to API route
  // /uploads/jobs/xxx.jpg -> /api/images/uploads/jobs/xxx.jpg
  if (trimmed.startsWith("/uploads/")) {
    return `/api/images${trimmed}`;
  }

  // Unknown local path format - return as-is (shouldn't happen with valid URLs)
  return trimmed;
}
