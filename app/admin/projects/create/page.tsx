// app/admin/projects/create/page.tsx
"use client";

import { createProjectAction } from "@/actions/projects";
import { useFormState } from "react-dom";
import RichTextEditor from "@/components/RichTextEditor";

function SubmitButton() {
  return (
    <button
      type="submit"
      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
    >
      Crear Proyecto
    </button>
  );
}

export default function CreateProjectPage() {
  const [state, formAction] = useFormState(createProjectAction, undefined);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Proyecto</h1>

      {state === "success" && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
          ¡Proyecto creado exitosamente!
        </div>
      )}

      {state === "unauthorized" && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          No autorizado
        </div>
      )}

      {state === "missing_translation_fields" && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          Por favor, complete todos los campos de la traducción
        </div>
      )}

      <form
        action={formAction}
        className="space-y-8"
        encType="multipart/form-data"
      >
        {/* Main Project Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Proyecto Principal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                Idioma Principal *
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

          <div className="mb-6">
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Extracto (descripción corta) *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido Completo *
            </label>
            <RichTextEditor name="content" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Año
              </label>
              <input
                id="year"
                name="year"
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Imagen principal
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Translation Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-6">
            <input
              id="hasTranslation"
              name="hasTranslation"
              type="checkbox"
              className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label
              htmlFor="hasTranslation"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Crear traducción automáticamente
            </label>
          </div>

          <div id="translationFields" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="transTitle"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Título de la traducción *
                </label>
                <input
                  id="transTitle"
                  name="transTitle"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label
                  htmlFor="transYear"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Año de la traducción
                </label>
                <input
                  id="transYear"
                  name="transYear"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="transExcerpt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Extracto de la traducción *
              </label>
              <textarea
                id="transExcerpt"
                name="transExcerpt"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido de la traducción *
              </label>
              <RichTextEditor name="transContent" />
            </div>

            <div>
              <label
                htmlFor="transImage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Imagen para la traducción
              </label>
              <input
                id="transImage"
                name="transImage"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center mb-6">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked
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
          <SubmitButton />
          <a
            href="/admin/projects"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}
