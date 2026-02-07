// components/Projects.tsx
"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProjectCard } from "./subcomponents/ProjectCard";
import type { Project } from "@/lib/types";

export const Projects = ({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "es" | "pt">(
    "all",
  );

  useEffect(() => {
    if (selectedLanguage === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.locale === selectedLanguage),
      );
    }
  }, [selectedLanguage, projects]);

  // Swiper breakpoints
  const breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 40 },
  };

  return (
    <section className="px-16 sm:px-8 md:px-16 py-16">
      <h2 className="text-5xl md:text-5xl font-bold text-primary mb-8">
        {title}
      </h2>

      {/* Language Filter */}
      <div className="flex flex-wrap gap-4 justify-center text-2xl">
        <button
          onClick={() => setSelectedLanguage("all")}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedLanguage === "all"
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Todos los idiomas
        </button>
        <button
          onClick={() => setSelectedLanguage("es")}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedLanguage === "es"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Español
        </button>
        <button
          onClick={() => setSelectedLanguage("pt")}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedLanguage === "pt"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Português
        </button>
      </div>

      {filteredProjects.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={breakpoints}
          navigation
          pagination={{ clickable: true }}
          className="gap-2"
        >
          {filteredProjects.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 text-center py-12">
          No hay proyectos disponibles en este idioma.
        </p>
      )}
    </section>
  );
};
