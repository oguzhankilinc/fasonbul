import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-production"
);

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

async function verifyTokenInMiddleware(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("fasonbul-auth")?.value;

  // Protected routes that require authentication
  const protectedRoutes = ["/hesap", "/admin"];
  const adminRoutes = ["/admin"];

  // Check if the current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/giris", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing admin route, verify the token and check role
  if (isAdminRoute && token) {
    const payload = await verifyTokenInMiddleware(token);

    // Debug logging
    console.log("ADMIN ROUTE ACCESS - Path:", pathname);
    console.log("USER ROLE:", payload?.role);

    if (!payload) {
      // Invalid token - redirect to login
      const loginUrl = new URL("/giris", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (payload.role !== "ADMIN") {
      // User is not admin - redirect to /hesap
      console.log("ACCESS DENIED - User role is:", payload.role, "- Redirecting to /hesap");
      return NextResponse.redirect(new URL("/hesap", request.url));
    }

    // User is admin - allow access
    console.log("ACCESS GRANTED - Admin user:", payload.email);
  }

  // If logged in and trying to access auth pages, redirect to account
  const authRoutes = ["/giris", "/kayit"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/hesap", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo|.*\\..*|_next).*)",
  ],
};
