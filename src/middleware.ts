import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "codeforge-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and auth API through without a check
  if (pathname === "/login" || pathname === "/api/auth") {
    return NextResponse.next();
  }

  // Allow health check through
  if (pathname === "/api/health") {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(AUTH_COOKIE);
  if (authCookie?.value === "authenticated") {
    return NextResponse.next();
  }

  // For API routes, return 401
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // For pages, redirect to login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
