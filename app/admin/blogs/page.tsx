// app/admin/blogs/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import BlogListClient from "./BlogListClient";

export default async function BlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true } },
      translations: { select: { locale: true } },
      sourcePost: { select: { id: true } },
    },
  });

  return <BlogListClient blogs={blogs} />;
}
