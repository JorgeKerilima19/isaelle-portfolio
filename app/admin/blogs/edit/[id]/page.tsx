// app/admin/blogs/edit/[id]/page.tsx
import prisma from "@/lib/prisma";
import BlogEditClient from "./BlogEditClient";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!blog) {
    return <div className="max-w-4xl mx-auto p-8">Artículo no encontrado</div>;
  }

  return <BlogEditClient blog={blog} />;
}
