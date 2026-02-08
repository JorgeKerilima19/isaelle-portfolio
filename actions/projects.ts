// actions/projects.ts
"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/projects";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function createProjectAction(
  prevState: string | null,
  formData: FormData,
) {
  try {
    const sessionToken = (await cookies()).get("next-auth.session-token")?.value;
    if (!sessionToken) return "unauthorized";

    const { payload } = await jwtVerify(sessionToken, secret);
    if (payload.role !== "admin") return "unauthorized";

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const locale = formData.get("locale") as string;
    const year = formData.get("year") as string;
    const published = formData.get("published") === "on";
    const imageFile = formData.get("image") as File | null;

    if (!title || !excerpt || !content || !locale) {
      return "missing_fields";
    }

    const imageUrl = await uploadImage(imageFile as File);

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "") || "project";

    const link = `/${locale}/projects/${slug}`;

    await prisma.project.create({
      data: {
        title,
        excerpt,
        content,
        locale,
        year: year ? parseInt(year) : null,
        published,
        imageUrl,
        slug,
        link,
        authorId: payload.sub as string,
      },
    });

    return "success";
  } catch (error) {
    console.error("Project creation error:", error);
    return "unknown_error";
  }
}

export async function updateProjectAction(
  prevState: string | null,
  formData: FormData,
) {
  try {
    const sessionToken = (await cookies()).get("next-auth.session-token")?.value;
    if (!sessionToken) return "unauthorized";

    const { payload } = await jwtVerify(sessionToken, secret);
    if (payload.role !== "admin") return "unauthorized";

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const year = formData.get("year") as string;
    const published = formData.get("published") === "on";
    const imageFile = formData.get("image") as File | null;

    if (!id || !title || !excerpt || !content) {
      return "missing_fields";
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return "project_not_found";
    }

    let imageUrl = project.imageUrl;

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        excerpt,
        content,
        year: year ? parseInt(year) : project.year,
        published,
        imageUrl,
      },
    });

    return "success";
  } catch (error) {
    console.error("Project update error:", error);
    return "unknown_error";
  }
}
