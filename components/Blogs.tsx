// components/Blogs.tsx
"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BlogCard } from "./subcomponents/BlogCard";
import type { BlogPost } from "@/lib/types";

export const Blogs = ({
  title,
  blogs,
}: {
  title: string;
  blogs: BlogPost[];
}) => {
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(blogs);
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "es" | "pt">(
    "all",
  );

  useEffect(() => {
    if (selectedLanguage === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter((blog) => blog.locale === selectedLanguage),
      );
    }
  }, [selectedLanguage, blogs]);

  // Swiper breakpoints
  const breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 40 },
  };

  return (
    <section className="section_container px-16 sm:px-8 pb-32 pt-16">
      <h2 className="text-5xl font-bold text-primary mb-16 mt-16">{title}</h2>
      <div className="flex flex-wrap gap-4 text-2xl justify-center">
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

      {/* Blogs Slider */}
      {filteredBlogs.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={breakpoints}
          navigation
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {filteredBlogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500 text-center py-12">
          No hay artículos disponibles en este idioma.
        </p>
      )}
    </section>
  );
};
