import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("fasonbul-auth")?.value;

  // Protected routes that require authentication
  const protectedRoutes = ["/hesap", "/admin"];

  // Check if the current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/giris", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
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
