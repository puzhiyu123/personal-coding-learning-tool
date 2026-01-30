import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "codeforge-auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const appPassword = process.env.APP_PASSWORD;
  if (!appPassword) {
    return NextResponse.json(
      { error: "APP_PASSWORD not configured on server" },
      { status: 500 }
    );
  }

  if (password !== appPassword) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE, "authenticated", {
    httpOnly: true,
    secure: false, // allow plain HTTP for IP-based access
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return response;
}
