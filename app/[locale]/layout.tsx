// app/[locale]/layout.tsx
import { Metadata } from "next";
import { locales } from "../../i18n";
import { Footer, Navbar } from "@/components";

import { getTranslations } from "next-intl/server";

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

  const homeT = await getTranslations({ locale, namespace: "home" });
  const navbarT = await getTranslations({ locale, namespace: "navbar" });

  return (
    <>
      <Navbar
        locale={locale}
        navItems={{
          home: navbarT("home"),
          blog: navbarT("blog"),
          about: navbarT("about"),
          contact: navbarT("contact"),
          projects: navbarT("projects")
        }}
      />
      <main className="pt-24 bg-letter">{children}</main>
      <Footer />
    </>
  );
}
