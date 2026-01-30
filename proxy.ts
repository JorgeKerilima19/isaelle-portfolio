// proxy.ts
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip validation for non-localized paths (e.g., /api, /_next)
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return intlMiddleware(req);
  }

  // Extract locale from path: /es/... → "es"
  const locale = pathname.split("/")[1];

  // Validate locale
  if (locale && !locales.includes(locale as any)) {
    // Redirect invalid locale to default
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return Response.redirect(url);
  }

  // If no locale in path, redirect to default
  if (!locale || !locales.includes(locale as any)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return Response.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(es|pt)/:path*"],
};
