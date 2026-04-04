-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "urgency" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING_APPROVAL',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "approvedAt" DATETIME,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JobRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JobRequest" ("approvedAt", "city", "createdAt", "description", "expiresAt", "id", "ownerId", "phone", "sector", "status", "title", "updatedAt", "urgency", "whatsapp") SELECT "approvedAt", "city", "createdAt", "description", "expiresAt", "id", "ownerId", "phone", "sector", "status", "title", "updatedAt", "urgency", "whatsapp" FROM "JobRequest";
DROP TABLE "JobRequest";
ALTER TABLE "new_JobRequest" RENAME TO "JobRequest";
CREATE INDEX "JobRequest_status_idx" ON "JobRequest"("status");
CREATE INDEX "JobRequest_sector_idx" ON "JobRequest"("sector");
CREATE INDEX "JobRequest_city_idx" ON "JobRequest"("city");
CREATE INDEX "JobRequest_ownerId_idx" ON "JobRequest"("ownerId");
CREATE INDEX "JobRequest_isFeatured_idx" ON "JobRequest"("isFeatured");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
