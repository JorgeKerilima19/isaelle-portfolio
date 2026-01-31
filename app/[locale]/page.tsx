// app/[locale]/page.tsx
import { Hero, Navbar, Welcome } from "@/components";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "pt" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const homeT = await getTranslations({ locale, namespace: "home" });
  const navbarT = await getTranslations({ locale, namespace: "navbar" });
  const welcomeT = await getTranslations({ locale, namespace: "welcome" });

  const cards = [
    { title: welcomeT("card1_title"), content: welcomeT("card1_content") },
    { title: welcomeT("card2_title"), content: welcomeT("card2_content") },
    { title: welcomeT("card3_title"), content: welcomeT("card3_content") },
    { title: welcomeT("card4_title"), content: welcomeT("card4_content") },
  ];

  return (
    <>
      <Navbar
        locale={locale}
        navItems={{
          home: navbarT("home"),
          blog: navbarT("blog"),
          about: navbarT("about"),
          contact: navbarT("contact"),
        }}
      />
      <main className="pt-24">
        <Hero params={params} />
        <Welcome
          title={welcomeT("title")}
          paragraph1={welcomeT("paragraph1")}
          cards={cards}
        />
      </main>
    </>
  );
}
