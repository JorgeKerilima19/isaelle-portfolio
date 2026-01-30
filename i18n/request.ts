// i18n/request.ts
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "../i18n";

export default getRequestConfig(async ({ locale }) => {
  // Handle both string and Promise
  let resolvedLocale = typeof locale === "string" ? locale : await locale;

  // If still undefined or invalid, use default
  if (!resolvedLocale || !locales.includes(resolvedLocale as any)) {
    resolvedLocale = defaultLocale;
  }

  try {
    const messages = (await import(`../public/locales/${resolvedLocale}.json`))
      .default;
    return {
      locale: resolvedLocale,
      messages,
    };
  } catch (error) {
    // Fallback to empty messages if JSON is missing
    console.warn(`Missing translation file for locale: ${resolvedLocale}`);
    return {
      locale: resolvedLocale,
      messages: {},
    };
  }
});
