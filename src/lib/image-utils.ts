/**
 * Validates if an imageUrl is potentially valid for rendering.
 * Returns false for null, undefined, empty, whitespace, or obviously invalid paths.
 */
export function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== "string") return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  // Must be a path or full URL
  if (!trimmed.startsWith("/") && !trimmed.startsWith("http")) return false;

  // Local paths must have a file extension
  if (trimmed.startsWith("/") && !trimmed.match(/\.\w{2,5}$/)) return false;

  return true;
}
