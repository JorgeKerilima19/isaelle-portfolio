// app/[locale]/page.tsx
import {
  Hero,
  Projects,
  Welcome,
  Blogs,
  AcademicCollaboration,
} from "@/components";
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/prisma";
import type { Project, BlogPost } from "@/lib/types";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "pt" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch all published projects (sort by year)
  const allProjects: Project[] = await prisma.project.findMany({
    where: { published: true },
    orderBy: { year: "desc" },
  });

  // Fetch all published blog posts (sort by createdAt, most recent first)
  const allBlogs: BlogPost[] = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const welcomeT = await getTranslations({ locale, namespace: "welcome" });

  const cards = [
    { title: welcomeT("card1_title"), content: welcomeT("card1_content") },
    { title: welcomeT("card2_title"), content: welcomeT("card2_content") },
    { title: welcomeT("card3_title"), content: welcomeT("card3_content") },
    { title: welcomeT("card4_title"), content: welcomeT("card4_content") },
  ];

  const projectT = await getTranslations({ locale, namespace: "projects" });
  const blogT = await getTranslations({ locale, namespace: "blog" });

  return (
    <>
      <Hero params={params} />
      <Welcome
        title={welcomeT("title")}
        paragraph1={welcomeT("paragraph1")}
        cards={cards}
      />
      <Projects title={projectT("title")} projects={allProjects} />
      <AcademicCollaboration />
      <Blogs title={blogT("title")} blogs={allBlogs} />
    </>
  );
}
