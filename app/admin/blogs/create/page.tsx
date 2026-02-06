// app/admin/blogs/create/page.tsx
"use client";

import { createBlogAction } from "@/actions/blogs";
import { useFormState } from "react-dom";
import RichTextEditor from "@/components/RichTextEditor";
import { useEffect, useState } from "react";

function SubmitButton() {
  return (
    <button
      type="submit"
      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
    >
      Crear Artículo
    </button>
  );
}

export default function CreateBlogPage() {
  const [state, formAction] = useFormState(createBlogAction, null);
  const [formError, setFormError] = useState<string | null>(null);

  // Handle server errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Listen for form submission errors
      const handleFormError = (event: any) => {
        if (event.detail?.statusCode === 413) {
          setFormError(
            "El contenido es demasiado grande. Por favor, reduce el tamaño de las imágenes o el texto.",
          );
        }
      };

      // Unfortunately, we can't easily catch 413 errors from Server Actions
      // So we'll rely on client-side validation and show a general error
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Artículo</h1>

      {formError && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {formError}
        </div>
      )}

      {state === "success" && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
          ¡Artículo creado exitosamente!
        </div>
      )}

      {state === "unauthorized" && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          No autorizado
        </div>
      )}

      {state === "unknown_error" && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          Error al crear el artículo. Por favor, verifica que el contenido no
          sea demasiado grande.
        </div>
      )}

      <form
        action={formAction}
        className="space-y-6"
        encType="multipart/form-data"
      >
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="locale"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Idioma *
            </label>
            <select
              id="locale"
              name="locale"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue="es"
              required
            >
              <option value="es">Español</option>
              <option value="pt">Portugués</option>
            </select>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido *
          </label>
          <RichTextEditor name="content" />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Imagen principal (máx. 2MB)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            // Add client-side validation
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size > 2 * 1024 * 1024) {
                alert("La imagen es demasiado grande. Máximo 2MB.");
                e.target.value = "";
              }
            }}
          />
        </div>

        <div className="flex items-center">
          <input
            id="published"
            name="published"
            type="checkbox"
            className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
          />
          <label
            htmlFor="published"
            className="ml-2 block text-sm text-gray-700"
          >
            Publicado por defecto
          </label>
        </div>

        <div className="flex space-x-4">
          <SubmitButton />
          <a
            href="/admin/blogs"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </a>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Consejo:</strong> Para evitar errores, mantenga las imágenes
          por debajo de 2MB y el contenido razonablemente corto.
        </p>
      </div>
    </div>
  );
}
