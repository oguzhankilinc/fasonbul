"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createAdminToken,
  setAdminCookie,
  removeAdminCookie,
} from "@/lib/admin-auth";

export type AdminAuthState = {
  error?: string;
  success?: boolean;
};

export async function adminLogin(
  prevState: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("ADMIN LOGIN ATTEMPT - Email:", email);

  if (!email || !password) {
    return { error: "E-posta ve şifre gereklidir." };
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: email.toLowerCase() },
  });

  console.log("ADMIN FOUND:", admin ? "Yes" : "No");

  if (!admin) {
    return { error: "E-posta veya şifre hatalı." };
  }

  const isValid = await verifyPassword(password, admin.passwordHash);

  console.log("PASSWORD VALID:", isValid);

  if (!isValid) {
    return { error: "E-posta veya şifre hatalı." };
  }

  const token = await createAdminToken({
    adminId: admin.id,
    email: admin.email,
    role: admin.role,
    name: admin.name,
  });

  await setAdminCookie(token);

  console.log("ADMIN LOGIN SUCCESS - Redirecting to /admin");

  redirect("/admin");
}

export async function adminLogout(): Promise<void> {
  await removeAdminCookie();
  redirect("/admin/login");
}
