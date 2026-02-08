// app/[locale]/proyectos/[slug]/page.tsx
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project } from "@/lib/types";

export async function generateStaticParams() {
  // Generate paths for all published projects in both languages
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, locale: true },
  });

  return projects.map((project) => ({
    locale: project.locale,
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const project = await prisma.project.findFirst({
    where: { slug, locale, published: true },
  });

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: project.title,
    description: project.excerpt || project.content.substring(0, 160),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const project = await prisma.project.findFirst({
    where: {
      slug,
      locale,
      published: true,
    },
  });

  if (!project) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "projects" });

  // Format year for display (show just the year)
  const displayYear = project.year ? project.year.toString() : null;

  return (
    <section className="min-h-screen pt-24 px-16 pb-16">
      <Link
        href={`/${locale}/projects`}
        className="text-[1.6rem] inline-flex items-center text-amber-500 hover:text-amber-600 mb-8 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        {t("back_to_projects")}
      </Link>

      <header className="mb-8">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h1 className="text-5xl font-bold text-gray-900 my-4">
            {project.title}
          </h1>
          <span
            className={`px-3 py-1 text-md rounded-full ${
              project.locale === "es"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {project.locale.toUpperCase()}
          </span>
          {displayYear && (
            <time className="text-gray-500 text-[1.6rem]">{displayYear}</time>
          )}
        </div>
        {project.excerpt && (
          <p className="text-xl text-gray-600 italic mb-6">
            "{project.excerpt}"
          </p>
        )}
      </header>

      {/* Project content */}
      <article className="prose prose-amber max-w-none mt-16">
        {project.imageUrl && (
          <div className="mb-8">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="page_main_img rounded-lg shadow-md"
            />
          </div>
        )}

        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />

        {/* Related projects (optional) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/${locale}/projects`}
            className="text-[1.6rem] inline-flex items-center text-amber-500 hover:text-amber-600 transition-colors"
          >
            {t("back_to_projects")}
          </Link>
        </div>
      </article>
    </section>
  );
}
