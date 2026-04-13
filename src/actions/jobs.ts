"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { JOB_STATUS } from "@/lib/constants";
import { sendJobSubmittedEmail } from "@/lib/mail";

export type JobState = {
  error?: string;
  success?: boolean;
};

/**
 * Create a new job request.
 * imageUrl is passed as bound parameter (not from formData) to ensure reliability.
 */
export async function createJob(
  imageUrl: string | null,
  prevState: JobState,
  formData: FormData
): Promise<JobState> {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Giriş yapmanız gerekiyor." };
  }

  if (user.role !== "JOB_OWNER" && user.role !== "ADMIN") {
    return { error: "Bu işlem için yetkiniz yok." };
  }

  const sector = formData.get("sector") as string;
  const city = formData.get("city") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const urgency = formData.get("urgency") as string;

  // Validation
  if (!sector || !city || !title || !description || !phone || !whatsapp) {
    return { error: "Tüm zorunlu alanları doldurun." };
  }

  if (title.length < 10) {
    return { error: "Başlık en az 10 karakter olmalıdır." };
  }

  if (description.length < 50) {
    return { error: "Açıklama en az 50 karakter olmalıdır." };
  }

  // Normalize imageUrl: empty string becomes null
  const finalImageUrl = imageUrl && imageUrl.trim() ? imageUrl.trim() : null;

  await prisma.jobRequest.create({
    data: {
      ownerId: user.id,
      sector,
      city,
      title,
      description,
      phone,
      whatsapp,
      urgency: urgency || null,
      imageUrl: finalImageUrl,
      status: JOB_STATUS.PENDING_APPROVAL,
    },
  });

  // Send job submitted email (non-blocking)
  sendJobSubmittedEmail(user.email, user.name, title).catch((err) => {
    console.error("[JOBS] Job submitted email failed:", err);
  });

  redirect("/hesap/ilanlarim?created=true");
}

/**
 * Update an existing job request.
 * imageUrl and jobId are passed as bound parameters to ensure reliability.
 */
export async function updateJob(
  imageUrl: string | null,
  jobId: string,
  prevState: JobState,
  formData: FormData
): Promise<JobState> {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Giriş yapmanız gerekiyor." };
  }

  if (!jobId) {
    return { error: "Geçersiz ilan." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  // Check ownership (admin can edit any)
  if (job.ownerId !== user.id && user.role !== "ADMIN") {
    return { error: "Bu ilana erişim yetkiniz yok." };
  }

  const sector = formData.get("sector") as string;
  const city = formData.get("city") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const phone = formData.get("phone") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const urgency = formData.get("urgency") as string;

  // Validation
  if (!sector || !city || !title || !description || !phone || !whatsapp) {
    return { error: "Tüm zorunlu alanları doldurun." };
  }

  if (title.length < 10) {
    return { error: "Başlık en az 10 karakter olmalıdır." };
  }

  if (description.length < 50) {
    return { error: "Açıklama en az 50 karakter olmalıdır." };
  }

  // If job was active and is being edited, set to pending again
  const newStatus =
    job.status === JOB_STATUS.ACTIVE || job.status === JOB_STATUS.REJECTED
      ? JOB_STATUS.PENDING_APPROVAL
      : job.status;

  // Normalize imageUrl: empty string becomes null
  const finalImageUrl = imageUrl && imageUrl.trim() ? imageUrl.trim() : null;

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      sector,
      city,
      title,
      description,
      phone,
      whatsapp,
      urgency: urgency || null,
      imageUrl: finalImageUrl,
      status: newStatus,
      approvedAt: newStatus === JOB_STATUS.PENDING_APPROVAL ? null : job.approvedAt,
      expiresAt: newStatus === JOB_STATUS.PENDING_APPROVAL ? null : job.expiresAt,
    },
  });

  revalidatePath("/hesap/ilanlarim");
  revalidatePath(`/ilan/${jobId}`);

  return { success: true };
}

export async function deactivateJob(jobId: string): Promise<JobState> {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Giriş yapmanız gerekiyor." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  if (job.ownerId !== user.id && user.role !== "ADMIN") {
    return { error: "Bu ilana erişim yetkiniz yok." };
  }

  await prisma.jobRequest.update({
    where: { id: jobId },
    data: { status: JOB_STATUS.PASSIVE },
  });

  revalidatePath("/hesap/ilanlarim");
  revalidatePath("/");

  return { success: true };
}

export async function activateJob(jobId: string): Promise<JobState> {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Giriş yapmanız gerekiyor." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  if (job.ownerId !== user.id && user.role !== "ADMIN") {
    return { error: "Bu ilana erişim yetkiniz yok." };
  }

  // Can only activate if it was passive or expired
  if (job.status !== JOB_STATUS.PASSIVE && job.status !== JOB_STATUS.EXPIRED) {
    return { error: "Bu ilan aktif edilemez." };
  }

  // Set to pending for re-approval
  await prisma.jobRequest.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.PENDING_APPROVAL,
      approvedAt: null,
      expiresAt: null,
    },
  });

  revalidatePath("/hesap/ilanlarim");

  return { success: true };
}

export async function deleteJob(jobId: string): Promise<JobState> {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Giriş yapmanız gerekiyor." };
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    return { error: "İlan bulunamadı." };
  }

  // Only owner or admin can delete
  if (job.ownerId !== user.id && user.role !== "ADMIN") {
    return { error: "Bu ilana erişim yetkiniz yok." };
  }

  await prisma.jobRequest.delete({
    where: { id: jobId },
  });

  revalidatePath("/hesap/ilanlarim");
  revalidatePath("/");

  return { success: true };
}

export async function recordContactView(
  jobId: string,
  actionType: "PHONE_VIEW" | "WHATSAPP_CLICK"
): Promise<void> {
  const user = await getCurrentUser();

  if (!user) return;

  // Don't record if user is viewing their own job
  const job = await prisma.jobRequest.findUnique({
    where: { id: jobId },
    select: { ownerId: true },
  });

  if (!job || job.ownerId === user.id) return;

  await prisma.contactView.create({
    data: {
      jobRequestId: jobId,
      userId: user.id,
      actionType,
    },
  });
}
