// components/subcomponents/BlogCard.tsx
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export const BlogCard = ({ blog }: { blog: BlogPost }) => {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString(
    blog.locale === "es" ? "es-ES" : "pt-PT",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <Link
      href={blog.link || `/${blog.locale}/blog/${blog.slug}`}
      className="block group h-full"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        {blog.imageUrl && (
          <div className="overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="blog_img w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6 card-content flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-3 justify-between w-full">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                blog.locale === "es"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {blog.locale.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              📅 {formattedDate}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="text-gray-600 line-clamp-3 text-left">
              {blog.excerpt}
            </p>
          )}
          <button className="py-4 px-8 bg-primary rounded-2xl text-white text-[1.6rem] ">
            Ver...
          </button>
        </div>
      </div>
    </Link>
  );
};
