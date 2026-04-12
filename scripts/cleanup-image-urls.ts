/**
 * Cleanup script for invalid imageUrl values in JobRequest table.
 *
 * This script:
 * 1. Finds all JobRequest records with non-null imageUrl
 * 2. Checks if the imageUrl is valid (has proper format and file extension)
 * 3. Sets invalid imageUrl values to null
 * 4. Reports what was changed
 *
 * Run with: npx tsx scripts/cleanup-image-urls.ts
 */

import { PrismaClient } from "@prisma/client";
import { existsSync } from "fs";
import path from "path";

const prisma = new PrismaClient();

function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  // Must be a path or full URL
  if (!trimmed.startsWith("/") && !trimmed.startsWith("http")) return false;

  // Local paths must have a file extension
  if (trimmed.startsWith("/") && !trimmed.match(/\.\w{2,5}$/)) return false;

  return true;
}

async function main() {
  console.log("🔍 Scanning JobRequest records for invalid imageUrl values...\n");

  // Get all records with non-null imageUrl
  const jobs = await prisma.jobRequest.findMany({
    where: {
      imageUrl: { not: null },
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  });

  console.log(`Found ${jobs.length} records with non-null imageUrl\n`);

  const toFix: { id: string; title: string; imageUrl: string; reason: string }[] = [];

  for (const job of jobs) {
    const imageUrl = job.imageUrl!;
    let reason = "";

    // Check if URL format is valid
    if (!isValidImageUrl(imageUrl)) {
      reason = "Invalid URL format";
    }
    // For local paths, check if file exists
    else if (imageUrl.startsWith("/")) {
      const filePath = path.join(process.cwd(), "public", imageUrl);
      if (!existsSync(filePath)) {
        reason = "File does not exist";
      }
    }

    if (reason) {
      toFix.push({
        id: job.id,
        title: job.title,
        imageUrl,
        reason,
      });
    }
  }

  if (toFix.length === 0) {
    console.log("✅ No invalid imageUrl values found. Database is clean.\n");
    return;
  }

  console.log(`Found ${toFix.length} invalid imageUrl values:\n`);
  console.log("─".repeat(80));

  for (const item of toFix) {
    console.log(`ID:       ${item.id}`);
    console.log(`Title:    ${item.title}`);
    console.log(`ImageUrl: "${item.imageUrl}"`);
    console.log(`Reason:   ${item.reason}`);
    console.log("─".repeat(80));
  }

  console.log("\n🔧 Fixing invalid records...\n");

  for (const item of toFix) {
    await prisma.jobRequest.update({
      where: { id: item.id },
      data: { imageUrl: null },
    });
    console.log(`✓ Set imageUrl to null for: ${item.id}`);
  }

  console.log(`\n✅ Fixed ${toFix.length} records.\n`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
