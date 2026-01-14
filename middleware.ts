import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 🔐 Read token (real usage)
  // const token = req.cookies.get("token")?.value;
  const token = true; // ✅ test logged-in

  const { pathname } = req.nextUrl;

  // 🔁 Clone URL ONCE
  const url = req.nextUrl.clone();

  // 🔒 Define routes
  const protectedRoutes = ["/", "/about"];
  const authRoutes = ["/login", "/register"];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 1️⃣ NOT authenticated → block protected routes
  if (!token && isProtectedRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 2️⃣ Authenticated → block auth routes
  if (token && isAuthRoute) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 3️⃣ Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/about/:path*", "/login", "/register"],
};
