// actions/projects.ts
"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { createProjectWithFiles } from "@/lib/projects";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function createProjectAction(prevState: any, formData: FormData) {
  try {
    const sessionToken = (await cookies()).get(
      "next-auth.session-token",
    )?.value;
    if (!sessionToken) return "unauthorized";

    const { payload } = await jwtVerify(sessionToken, secret);
    if (payload.role !== "admin") return "unauthorized";

    // Main project data
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const locale = formData.get("locale") as string;
    const year = formData.get("year") as string;
    const published = formData.get("published") === "on";
    const mainImageFile = formData.get("image") as File | null;

    // Translation data
    const hasTranslation = formData.get("hasTranslation") === "on";
    let translationData = undefined;
    let translationImageFile = null;

    if (hasTranslation) {
      const transTitle = formData.get("transTitle") as string;
      const transExcerpt = formData.get("transExcerpt") as string;
      const transContent = formData.get("transContent") as string;
      const transLocale = locale === "es" ? "pt" : "es"; // Auto-switch language
      const transYear = formData.get("transYear") as string;

      translationImageFile = formData.get("transImage") as File | null;

      if (!transTitle || !transExcerpt || !transContent) {
        return "missing_translation_fields";
      }

      translationData = {
        title: transTitle,
        excerpt: transExcerpt,
        content: transContent,
        locale: transLocale,
        year: transYear ? parseInt(transYear) : undefined,
      };
    }

    if (!title || !excerpt || !content || !locale) {
      return "missing_fields";
    }

    await createProjectWithFiles(
      {
        title,
        excerpt,
        content,
        locale,
        year: year ? parseInt(year) : undefined,
        published,
        authorId: payload.sub as string,
      },
      translationData,
      mainImageFile instanceof File && mainImageFile.size > 0
        ? mainImageFile
        : undefined,
      translationImageFile instanceof File && translationImageFile.size > 0
        ? translationImageFile
        : undefined,
    );

    return "success";
  } catch (error) {
    console.error("Project creation error:", error);
    return "unknown_error";
  }
}
