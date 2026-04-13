import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";
import { getCurrentUser } from "@/lib/auth";

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed mime types
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Giriş yapmanız gerekiyor." },
        { status: 401 }
      );
    }

    // Only job owners and admins can upload
    if (user.role !== "JOB_OWNER" && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Bu işlem için yetkiniz yok." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Dosya seçilmedi." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Sadece JPG, PNG veya WebP formatları kabul edilir." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Dosya boyutu 10MB'dan küçük olmalıdır." },
        { status: 400 }
      );
    }

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process and optimize image with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 85,
        progressive: true,
      })
      .toBuffer();

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = `job-${timestamp}-${randomStr}.jpg`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", "jobs");

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, optimizedBuffer);

    // Verify file was saved successfully
    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: "Dosya kaydedilemedi. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }

    // Return the API URL for dynamic serving
    // Using /api/images/ route instead of static /uploads/ path
    // because Next.js doesn't serve files added to public/ at runtime in production
    const imageUrl = `/api/images/uploads/jobs/${filename}`;

    // DEBUG: Log the response
    console.log("[DEBUG Upload API] File saved to:", filepath);
    console.log("[DEBUG Upload API] Returning imageUrl:", imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Dosya yüklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
