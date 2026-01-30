// app/[locale]/layout.tsx
import { Metadata } from "next";
import { locales } from "../../i18n";
import { Navbar } from "@/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    alternates[loc] = `/${loc}`;
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <>{children}</>;
}
