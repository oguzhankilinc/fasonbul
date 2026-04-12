"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { JOB_STATUS } from "@/lib/constants";

export type AdminState = {
  error?: string;
  success?: boolean;
};

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function approveJob(jobId: string): Promise<AdminState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  if (job.status !== JOB_STATUS.PENDING_APPROVAL) {
    return { error: "Bu ilan onay bekleyen durumda değil." };
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.ACTIVE,
      approvedAt: now,
      expiresAt,
    },
  });

  revalidatePath("/admin/bekleyen");
  revalidatePath("/admin/aktif");
  revalidatePath("/");
  revalidatePath(`/ilan/${jobId}`);

  return { success: true };
}

export async function rejectJob(jobId: string): Promise<AdminState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.REJECTED,
    },
  });

  revalidatePath("/admin/bekleyen");
  revalidatePath("/admin");

  return { success: true };
}

export async function setJobPassive(jobId: string): Promise<AdminState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.PASSIVE,
    },
  });

  revalidatePath("/admin/aktif");
  revalidatePath("/admin/pasif");
  revalidatePath("/");

  return { success: true };
}

export async function setJobActive(jobId: string): Promise<AdminState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.ACTIVE,
      approvedAt: now,
      expiresAt,
    },
  });

  revalidatePath("/admin/pasif");
  revalidatePath("/admin/aktif");
  revalidatePath("/");

  return { success: true };
}

export async function deleteJobAdmin(jobId: string): Promise<AdminState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  await prisma.jobRequest.delete({
    where: { id: jobId },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/bekleyen");
  revalidatePath("/admin/aktif");
  revalidatePath("/admin/pasif");
  revalidatePath("/");

  return { success: true };
}

export async function expireOldJobs(): Promise<{ expired: number }> {
  const now = new Date();

  const result = await prisma.jobRequest.updateMany({
    where: {
      status: JOB_STATUS.ACTIVE,
      expiresAt: {
        lt: now,
      },
    },
    data: {
      status: JOB_STATUS.EXPIRED,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return { expired: result.count };
}

export async function toggleFeatured(jobId: string): Promise<AdminState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      isFeatured: !job.isFeatured,
    },
  });

  revalidatePath("/admin/aktif");
  revalidatePath("/");
  revalidatePath("/ilanlar");

  return { success: true };
}

export async function extendJobDuration(jobId: string, days: number = 30): Promise<AdminState> {
  try {
    await requireAdmin();
  } catch {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  // Calculate new expiry date
  const now = new Date();
  const currentExpiry = job.expiresAt || now;
  const baseDate = currentExpiry > now ? currentExpiry : now;
  const newExpiresAt = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      expiresAt: newExpiresAt,
      // If expired, reactivate it
      status: job.status === JOB_STATUS.EXPIRED ? JOB_STATUS.ACTIVE : job.status,
    },
  });

  revalidatePath("/admin/aktif");
  revalidatePath("/admin/suresi-dolan");
  revalidatePath("/");
  revalidatePath(`/ilan/${jobId}`);

  return { success: true };
}
