// app/admin/blogs/BlogListClient.tsx
"use client";

import { createBlogTranslation } from "@/actions/blogs";
import { useFormState } from "react-dom";
import Link from "next/link";

type BlogPost = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  imageUrl: string | null;
  link: string | null;
  authorId: string;
  sourcePostId: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: { name: string | null };
  translations: { locale: string }[];
  sourcePost?: { id: string } | null;
};

function BlogTranslationForm({
  sourceBlogId,
  targetLocale,
  label,
  colorClass,
}: {
  sourceBlogId: string;
  targetLocale: string;
  label: string;
  colorClass: string;
}) {
  const [state, formAction] = useFormState(createBlogTranslation, null);
  return (
    <form action={formAction}>
      <input type="hidden" name="sourceBlogId" value={sourceBlogId} />
      <input type="hidden" name="targetLocale" value={targetLocale} />
      <button
        type="submit"
        className={`px-2 py-1 ${colorClass} text-white text-sm rounded hover:bg-opacity-90`}
      >
        {label}
      </button>
    </form>
  );
}

export default function BlogListClient({ blogs }: { blogs: BlogPost[] }) {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link
          href="/admin/blogs/create"
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          + Nuevo Artículo
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-[1.1rem] text-gray-500 max-w-10">
                Título
              </th>
              <th className="px-6 py-3 text-left text-[1.1rem] text-gray-500">
                Idioma
              </th>
              <th className="px-6 py-3 text-left text-[1.1rem] text-gray-500">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-[1.1rem] text-gray-500">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-[1.1rem] text-gray-500">
                Traducciones
              </th>
              <th className="px-6 py-3 text-left text-[1.1rem] text-gray-500">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-[1.1rem] text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => {
              const allTranslationsForSlug = blogs.filter(
                (b) => b.slug === blog.slug,
              );
              const hasSpanish = allTranslationsForSlug.some(
                (b) => b.locale === "es",
              );
              const hasPortuguese = allTranslationsForSlug.some(
                (b) => b.locale === "pt",
              );
              const isSource = !blog.sourcePostId;
              const sourceBlog = isSource
                ? blog
                : blogs.find((b) => b.id === blog.sourcePostId) || blog;

              const formattedDate = new Date(blog.createdAt).toLocaleDateString(
                "es-ES",
              );

              return (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-[1.2rem] font-medium text-gray-900">
                      {blog.title}
                    </div>
                    <div className="text-gray-500">{blog.link}</div>
                    {!isSource && (
                      <div className="text-sm text-gray-400">
                        Traducción de: {sourceBlog?.title}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        blog.locale === "es"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {blog.locale.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formattedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        isSource
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {isSource ? "Original" : "Traducción"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {hasSpanish && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                          ES
                        </span>
                      )}
                      {hasPortuguese && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                          PT
                        </span>
                      )}
                      {isSource && !hasSpanish && (
                        <BlogTranslationForm
                          sourceBlogId={blog.id}
                          targetLocale="es"
                          label="+ ES"
                          colorClass="bg-blue-500 hover:bg-blue-600"
                        />
                      )}
                      {isSource && !hasPortuguese && (
                        <BlogTranslationForm
                          sourceBlogId={blog.id}
                          targetLocale="pt"
                          label="+ PT"
                          colorClass="bg-green-500 hover:bg-green-600"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.published ? (
                      <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Publicado
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                    <Link
                      href={`/admin/blogs/edit/${blog.id}`}
                      className="text-amber-500 hover:text-amber-700 mr-4"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
