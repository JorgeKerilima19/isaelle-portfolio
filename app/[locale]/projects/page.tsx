// app/[locale]/proyectos/page.tsx
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/prisma";
import { ProjectCard } from "@/components/subcomponents/ProjectCard";
import type { Project } from "@/lib/types";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "pt" }];
}

export default async function ProjectsListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch published projects for current locale
  const projects: Project[] = await prisma.project.findMany({
    where: {
      locale,
      published: true,
    },
    orderBy: { year: "desc" },
  });

  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <section className="min-h-screen pt-24 p-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          {t("description")}
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center">
          <p className="text-gray-500 text-xl">{t("no_projects")}</p>
        </div>
      )}
    </section>
  );
}
