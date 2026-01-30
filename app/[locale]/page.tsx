// app/[locale]/page.tsx
import { Hero,Navbar } from "@/components";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "pt" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return { title: t("title") };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Keep params as Promise, await once
  const { locale } = await params;

  // Fetch BOTH home and navbar translations on server
  const homeT = await getTranslations({ locale, namespace: "home" });
  const navbarT = await getTranslations({ locale, namespace: "navbar" });

  return (
    <>
      {/* Pass translated strings directly */}
      <Navbar 
        locale={locale}
        navItems={{
          home: navbarT('home'),
          blog: navbarT('blog'),
          about: navbarT('about'),
          contact: navbarT('contact')
        }}
      />
      <main className="pt-24 bg-letter">
        {/* Hero still uses its own translation logic */}
        <Hero params={params} />
      </main>
    </>
  );
}