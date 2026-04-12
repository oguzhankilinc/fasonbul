import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-production"
);

interface AdminJWTPayload {
  adminId: string;
  email: string;
  role: string;
  name: string;
}

interface UserJWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

async function verifyAdminToken(token: string): Promise<AdminJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // Check if it's an admin token (has adminId)
    if (payload.adminId && payload.role === "ADMIN") {
      return payload as unknown as AdminJWTPayload;
    }
    return null;
  } catch {
    return null;
  }
}

async function verifyUserToken(token: string): Promise<UserJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserJWTPayload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get both tokens
  const adminToken = request.cookies.get("admin-token")?.value;
  const userToken = request.cookies.get("fasonbul-auth")?.value;

  // =====================
  // ADMIN ROUTES
  // =====================
  if (pathname.startsWith("/admin")) {
    // Allow /admin/login without auth
    if (pathname === "/admin/login") {
      // If already logged in as admin, redirect to dashboard
      if (adminToken) {
        const payload = await verifyAdminToken(adminToken);
        if (payload) {
          console.log("ADMIN ALREADY LOGGED IN - Redirecting to /admin");
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      }
      return NextResponse.next();
    }

    // All other /admin/* routes require admin-token
    console.log("ADMIN ROUTE ACCESS - Path:", pathname);
    console.log("ADMIN TOKEN EXISTS:", !!adminToken);

    if (!adminToken) {
      console.log("NO ADMIN TOKEN - Redirecting to /admin/login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = await verifyAdminToken(adminToken);
    console.log("ADMIN TOKEN VALID:", !!payload);
    console.log("ADMIN PAYLOAD:", payload);

    if (!payload) {
      console.log("INVALID ADMIN TOKEN - Redirecting to /admin/login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    console.log("ADMIN ACCESS GRANTED - Email:", payload.email);
    return NextResponse.next();
  }

  // =====================
  // USER ROUTES (/hesap)
  // =====================
  if (pathname.startsWith("/hesap")) {
    if (!userToken) {
      const loginUrl = new URL("/giris", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyUserToken(userToken);
    if (!payload) {
      const loginUrl = new URL("/giris", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // =====================
  // AUTH ROUTES (login/register)
  // =====================
  const authRoutes = ["/giris", "/kayit"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (isAuthRoute && userToken) {
    const payload = await verifyUserToken(userToken);
    if (payload) {
      return NextResponse.redirect(new URL("/hesap", request.url));
    }
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
