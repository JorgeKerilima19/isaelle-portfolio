// app/admin/blogs/edit/[id]/BlogEditClient.tsx
"use client";

import { updateBlogAction } from "@/actions/blogs";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  locale: string;
  published: boolean;
  imageUrl: string | null;
  authorId: string;
  sourcePostId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function BlogEditClient({ blog }: { blog: BlogPost }) {
  const router = useRouter();
  const [state, formAction] = useFormState(updateBlogAction, null);

  useEffect(() => {
    if (state === "success") {
      router.push("/admin/blogs");
      router.refresh();
    }
  }, [state, router]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Editar Artículo</h1>

      {state === "success" && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
          ¡Artículo actualizado exitosamente!
        </div>
      )}

      <form
        action={formAction}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <input type="hidden" name="id" value={blog.id} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Título *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={blog.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="locale"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Idioma
            </label>
            <input
              id="locale"
              name="locale"
              type="text"
              defaultValue={blog.locale}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Extracto
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={blog.excerpt || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido *
          </label>
          <RichTextEditor name="content" initialValue={blog.content} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de creación
            </label>
            <input
              type="text"
              value={new Date(blog.createdAt).toLocaleDateString("es-ES")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Última actualización
            </label>
            <input
              type="text"
              value={new Date(blog.updatedAt).toLocaleDateString("es-ES")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen actual
            </label>
            {blog.imageUrl ? (
              <img
                src={blog.imageUrl}
                alt="Imagen del artículo"
                className="max-w-full h-auto rounded border"
              />
            ) : (
              <p className="text-gray-500">Sin imagen</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nueva imagen (opcional)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={blog.published}
            className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-700"
          >
            Publicado
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Actualizar Artículo
          </button>
          <a
            href="/admin/blogs"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
