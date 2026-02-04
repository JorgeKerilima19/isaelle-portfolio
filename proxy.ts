// proxy.ts
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n";

const intlMiddleware = createIntlMiddleware({ locales, defaultLocale });
const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip for static assets
  if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth")) {
    return intlMiddleware(req);
  }

  // Public routes: no auth required
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }

  // ✅ Admin routes: NO i18n, always at /admin
  if (pathname.startsWith("/admin")) {
    const sessionToken = (await cookies()).get(
      "next-auth.session-token",
    )?.value;

    let isAdmin = false;
    if (sessionToken) {
      try {
        const { payload } = await jwtVerify(sessionToken, secret);
        isAdmin = payload.role === "admin";
      } catch (error) {
        isAdmin = false;
      }
    }

    if (!isAdmin) {
      const url = new URL("/login", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(es|pt)/:path*", "/admin/:path*", "/login", "/register"],
};
