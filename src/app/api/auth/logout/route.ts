import { NextResponse } from "next/server";
import { removeAuthCookie } from "@/lib/auth";

export async function POST() {
  await removeAuthCookie();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}

export async function GET() {
  await removeAuthCookie();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}
