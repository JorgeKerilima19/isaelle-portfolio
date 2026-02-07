// components/subcomponents/ProjectCard.tsx
import Link from "next/link";
import type { Project } from "@/lib/types";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={project.link || `/${project.locale}/proyectos/${project.slug}`}
      className="bg-white block group rounded-4xl"
    >
      <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {project.imageUrl && (
          <div className="overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="project_img w-full h-12 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6 card-content">
          <h3 className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mb-3 w-full justify-between">
            <span
              className={`px-2 py-1 text-xl rounded-full font-bold mr-10 ${
                project.locale === "es"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {project.locale.toUpperCase()}
            </span>
            {project.year && (
              <span className="text-xl text-gray-500">📅 {project.year}</span>
            )}
          </div>

          {project.excerpt && (
            <p className="text-gray-600 line-clamp-3 text-xl">
              {project.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
