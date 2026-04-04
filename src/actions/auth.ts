"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  verifyPassword,
  createToken,
  setAuthCookie,
  removeAuthCookie,
  generateResetToken,
} from "@/lib/auth";

export type AuthState = {
  error?: string;
  success?: boolean;
};

export async function register(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const role = formData.get("role") as string;
  const companyName = formData.get("companyName") as string;
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;

  // Validation
  if (!name || !email || !password || !role) {
    return { error: "Tüm zorunlu alanları doldurun." };
  }

  if (password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalıdır." };
  }

  if (password !== confirmPassword) {
    return { error: "Şifreler eşleşmiyor." };
  }

  if (!["JOB_OWNER", "MANUFACTURER"].includes(role)) {
    return { error: "Geçersiz kullanıcı tipi." };
  }

  // Check if email exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    return { error: "Bu e-posta adresi zaten kayıtlı." };
  }

  // Create user
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      companyName: companyName || null,
      phone: phone || null,
      city: city || null,
    },
  });

  // Create token and set cookie
  const token = await createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  await setAuthCookie(token);

  redirect("/hesap");
}

export async function login(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "E-posta ve şifre gereklidir." };
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return { error: "E-posta veya şifre hatalı." };
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return { error: "E-posta veya şifre hatalı." };
  }

  const token = await createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  await setAuthCookie(token);

  // Redirect based on role
  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  redirect("/hesap");
}

export async function logout(): Promise<void> {
  await removeAuthCookie();
  redirect("/");
}

export async function forgotPassword(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "E-posta adresi gereklidir." };
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  // Always show success message for security (don't reveal if email exists)
  if (!user) {
    return {
      success: true,
    };
  }

  // Generate reset token
  const resetToken = generateResetToken();
  const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  // In production, send email with reset link
  // For MVP, we'll just log it
  console.log(`Password reset link: /sifre-sifirla?token=${resetToken}`);

  return {
    success: true,
  };
}

export async function resetPassword(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token || !password) {
    return { error: "Geçersiz istek." };
  }

  if (password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalıdır." };
  }

  if (password !== confirmPassword) {
    return { error: "Şifreler eşleşmiyor." };
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return { error: "Geçersiz veya süresi dolmuş bağlantı." };
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return { success: true };
}

export async function changePassword(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const userId = formData.get("userId") as string;
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!userId || !currentPassword || !newPassword) {
    return { error: "Tüm alanları doldurun." };
  }

  if (newPassword.length < 6) {
    return { error: "Yeni şifre en az 6 karakter olmalıdır." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Yeni şifreler eşleşmiyor." };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: "Kullanıcı bulunamadı." };
  }

  const isValid = await verifyPassword(currentPassword, user.passwordHash);

  if (!isValid) {
    return { error: "Mevcut şifre hatalı." };
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  return { success: true };
}

export async function updateProfile(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const companyName = formData.get("companyName") as string;
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;

  if (!userId || !name) {
    return { error: "İsim zorunludur." };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      companyName: companyName || null,
      phone: phone || null,
      city: city || null,
    },
  });

  return { success: true };
}
