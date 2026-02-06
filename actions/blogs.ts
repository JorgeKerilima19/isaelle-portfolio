// actions/blogs.ts
"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/projects";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function createBlogAction(
  prevState: string | null,
  formData: FormData,
) {
  try {
    const sessionToken = (await cookies()).get(
      "next-auth.session-token",
    )?.value;
    if (!sessionToken) return "unauthorized";

    const { payload } = await jwtVerify(sessionToken, secret);
    if (payload.role !== "admin") return "unauthorized";

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const locale = formData.get("locale") as string;
    const published = formData.get("published") === "on";
    const imageFile = formData.get("image") as File | null;

    if (!title || !content || !locale) {
      return "missing_fields";
    }

    const imageUrl = await uploadImage(imageFile as File);

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "") || "blog-post";

    const link = `/${locale}/blog/${slug}`;

    await prisma.blogPost.create({
      data: {
        title,
        excerpt: excerpt || null,
        content,
        locale,
        published,
        imageUrl,
        slug,
        link,
        authorId: payload.sub as string,
      },
    });

    return "success";
  } catch (error) {
    console.error("Blog creation error:", error);
    return "unknown_error";
  }
}

export async function updateBlogAction(
  prevState: string | null,
  formData: FormData,
) {
  try {
    const sessionToken = (await cookies()).get(
      "next-auth.session-token",
    )?.value;
    if (!sessionToken) return "unauthorized";

    const { payload } = await jwtVerify(sessionToken, secret);
    if (payload.role !== "admin") return "unauthorized";

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "on";
    const imageFile = formData.get("image") as File | null;

    if (!id || !title || !content) {
      return "missing_fields";
    }

    const blog = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!blog) {
      return "blog_not_found";
    }

    let imageUrl = blog.imageUrl;

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        excerpt: excerpt || null,
        content,
        published,
        imageUrl,
      },
    });

    return "success";
  } catch (error) {
    console.error("Blog update error:", error);
    return "unknown_error";
  }
}

export async function createBlogTranslation(
  prevState: string | null,
  formData: FormData,
) {
  const sessionToken = (await cookies()).get("next-auth.session-token")?.value;
  if (!sessionToken) throw new Error("unauthorized");

  const { payload } = await jwtVerify(sessionToken, secret);
  if (payload.role !== "admin") throw new Error("unauthorized");

  const sourceBlogId = formData.get("sourceBlogId") as string;
  const targetLocale = formData.get("targetLocale") as string;

  if (!sourceBlogId || !targetLocale) {
    return "missing_fields";
  }

  const sourceBlog = await prisma.blogPost.findUnique({
    where: { id: sourceBlogId },
  });

  if (!sourceBlog) {
    return "source_not_found";
  }

  const existingTranslation = await prisma.blogPost.findFirst({
    where: {
      slug: sourceBlog.slug,
      locale: targetLocale,
    },
  });

  let translationId: string;

  if (existingTranslation) {
    translationId = existingTranslation.id;
  } else {
    const translationLink = `/${targetLocale}/blog/${sourceBlog.slug}`;

    const translation = await prisma.blogPost.create({
      data: {
        title: `${sourceBlog.title} (${targetLocale.toUpperCase()})`,
        excerpt: sourceBlog.excerpt,
        content: "<p>Contenido pendiente de traducción...</p>",
        locale: targetLocale,
        published: false,
        imageUrl: sourceBlog.imageUrl,
        slug: sourceBlog.slug,
        link: translationLink,
        authorId: payload.sub as string,
        sourcePostId: sourceBlog.id,
      },
    });

    await prisma.blogPost.update({
      where: { id: sourceBlog.id },
      data: {
        translations: {
          connect: { id: translation.id },
        },
      },
    });

    translationId = translation.id;
  }

  redirect(`/admin/blogs/edit/${translationId}`);
}
