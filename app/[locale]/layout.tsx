// app/[locale]/layout.tsx
import { Metadata } from "next";
import { locales } from "../../i18n";

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

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
