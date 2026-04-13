import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Dynamic image serving route.
 *
 * Next.js doesn't serve files added to public/ at runtime in production.
 * This route dynamically serves uploaded images from public/uploads/.
 *
 * Usage: /api/images/uploads/jobs/job-123.jpg
 * Maps to: public/uploads/jobs/job-123.jpg
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;

    // Security: Only allow serving from uploads directory
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Only allow uploads path
    if (pathSegments[0] !== "uploads") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Prevent directory traversal
    const relativePath = pathSegments.join("/");
    if (relativePath.includes("..") || relativePath.includes("//")) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Only allow image extensions
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const ext = path.extname(relativePath).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Build absolute path
    const filePath = path.join(process.cwd(), "public", relativePath);

    // DEBUG: Log file path check
    console.log("[DEBUG Image Serve] process.cwd():", process.cwd());
    console.log("[DEBUG Image Serve] relativePath:", relativePath);
    console.log("[DEBUG Image Serve] filePath:", filePath);
    console.log("[DEBUG Image Serve] existsSync:", existsSync(filePath));

    // Check file exists
    if (!existsSync(filePath)) {
      console.log("[DEBUG Image Serve] FILE NOT FOUND:", filePath);
      return new NextResponse("Not found", { status: 404 });
    }

    // Read and serve file
    const fileBuffer = await readFile(filePath);

    // Determine content type
    const contentTypes: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
    };
    const contentType = contentTypes[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image serve error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
