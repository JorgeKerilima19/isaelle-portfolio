// app/[locale]/page.tsx
import { Hero } from "@/components";
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
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className="">
      <Hero params={params} />
    </main>
  );
}
