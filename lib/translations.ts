// lib/translations.ts
import prisma from "@/lib/prisma";

export async function createProjectWithTranslations(
  projectData: {
    title: string;
    excerpt: string;
    content: string;
    locale: string;
    year?: number;
    imageUrl?: string;
    published: boolean;
    authorId: string;
  },
  translationData?: {
    title: string;
    excerpt: string;
    content: string;
    locale: string; // Should be the other language
    year?: number;
    imageUrl?: string;
  },
) {
  // Generate slug
  const slug =
    projectData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || "project";

  // Auto-generate link: /{locale}/proyectos/{slug}
  const link = `/${projectData.locale}/proyectos/${slug}`;

  // Create main project
  const mainProject = await prisma.project.create({
    data: {
      ...projectData,
      slug,
      link,
      imageUrl: projectData.imageUrl || null,
    },
  });

  let translationProject = null;

  // Create translation if provided
  if (translationData) {
    const translationLink = `/${translationData.locale}/proyectos/${slug}`;

    translationProject = await prisma.project.create({
      data: {
        ...translationData,
        slug,
        link: translationLink,
        imageUrl: translationData.imageUrl || null,
        published: projectData.published,
        authorId: projectData.authorId,
        sourceProjectId: mainProject.id,
      },
    });

    // Link main project to translation
    await prisma.project.update({
      where: { id: mainProject.id },
      data: {
        translations: {
          connect: { id: translationProject.id },
        },
      },
    });
  }

  return {
    main: mainProject,
    translation: translationProject,
  };
}
