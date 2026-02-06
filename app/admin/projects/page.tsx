// app/admin/projects/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import TranslationForm from "./TranslationForm";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { id: "desc" },
    include: {
      author: { select: { name: true } },
      translations: { select: { locale: true } },
      sourceProject: { select: { id: true, slug: true } },
    },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <Link
          href="/admin/projects/create"
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          + Nuevo Proyecto
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Idioma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Traducciones
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => {
              const allTranslationsForSlug = projects.filter(
                (p) => p.slug === project.slug,
              );

              const hasSpanish = allTranslationsForSlug.some(
                (p) => p.locale === "es",
              );
              const hasPortuguese = allTranslationsForSlug.some(
                (p) => p.locale === "pt",
              );

              // ✅ Determine if this is a source or translation
              const isSource = !project.sourceProjectId;
              const sourceProject = isSource
                ? project
                : projects.find((p) => p.id === project.sourceProjectId) ||
                  project;

              return (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {project.title}
                    </div>
                    <div className="text-sm text-gray-500">{project.link}</div>
                    {!isSource && (
                      <div className="text-xs text-gray-400">
                        Traducción de: {sourceProject?.title}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.locale === "es"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.locale.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          ES
                        </span>
                      )}
                      {hasPortuguese && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          PT
                        </span>
                      )}
                      {/* Only show add buttons for source projects */}
                      {isSource && !hasSpanish && (
                        <TranslationForm
                          sourceProjectId={project.id}
                          targetLocale="es"
                          label="+ ES"
                          colorClass="bg-blue-500 hover:bg-blue-600"
                        />
                      )}
                      {isSource && !hasPortuguese && (
                        <TranslationForm
                          sourceProjectId={project.id}
                          targetLocale="pt"
                          label="+ PT"
                          colorClass="bg-green-500 hover:bg-green-600"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.published ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Publicado
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Borrador
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
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
    </div>
  );
}
