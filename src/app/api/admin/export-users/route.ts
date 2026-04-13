"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { getCityLabel, USER_ROLE } from "@/lib/constants";

export async function GET(request: NextRequest) {
  // Auth check
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get role filter from query params
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  // Build where clause
  const where = role ? { role } : {};

  // Fetch users
  const users = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      name: true,
      email: true,
      companyName: true,
      phone: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          jobRequests: true,
        },
      },
    },
  });

  // Build CSV content with BOM for Turkish character support in Excel
  const BOM = "\uFEFF";
  const headers = ["Ad Soyad", "E-posta", "Firma Adı", "Telefon", "Şehir", "Rol", "Kayıt Tarihi", "İlan Sayısı"];

  const rows = users.map((user) => [
    user.name,
    user.email,
    user.companyName || "",
    user.phone || "",
    user.city ? getCityLabel(user.city) : "",
    user.role === USER_ROLE.JOB_OWNER ? "İş Sahibi" : user.role === USER_ROLE.MANUFACTURER ? "Fason Üretici" : user.role,
    new Date(user.createdAt).toLocaleDateString("tr-TR"),
    user._count.jobRequests.toString(),
  ]);

  // Escape CSV values (handle commas, quotes, newlines)
  const escapeCSV = (value: string) => {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const csvContent = BOM + [
    headers.join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  // Determine filename based on role
  let filename = "tum-kullanicilar";
  if (role === USER_ROLE.JOB_OWNER) {
    filename = "ilan-veren-firmalar";
  } else if (role === USER_ROLE.MANUFACTURER) {
    filename = "fason-ureticiler";
  }

  const date = new Date().toISOString().split("T")[0];

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}-${date}.csv"`,
    },
  });
}
