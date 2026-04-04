-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL DEFAULT 'JOB_OWNER',
    "name" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "passwordHash" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "JobRequest" (
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
    "approvedAt" DATETIME,
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "JobRequest_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobRequestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContactView_jobRequestId_fkey" FOREIGN KEY ("jobRequestId") REFERENCES "JobRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ContactView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "JobRequest_status_idx" ON "JobRequest"("status");

-- CreateIndex
CREATE INDEX "JobRequest_sector_idx" ON "JobRequest"("sector");

-- CreateIndex
CREATE INDEX "JobRequest_city_idx" ON "JobRequest"("city");

-- CreateIndex
CREATE INDEX "JobRequest_ownerId_idx" ON "JobRequest"("ownerId");

-- CreateIndex
CREATE INDEX "ContactView_jobRequestId_idx" ON "ContactView"("jobRequestId");

-- CreateIndex
CREATE INDEX "ContactView_userId_idx" ON "ContactView"("userId");
