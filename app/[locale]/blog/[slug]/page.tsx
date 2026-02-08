// app/[locale]/blog/[slug]/page.tsx
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { BlogPost } from "@/lib/types";

export async function generateStaticParams() {
  // Generate paths for all published blog posts in both languages
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, locale: true },
  });

  return posts.map((post) => ({
    locale: post.locale,
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: { slug, locale, published: true },
  });

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      locale,
      published: true,
    },
  });

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  // Format date for display
  const formattedDate = new Date(post.createdAt).toLocaleDateString(
    locale === "es" ? "es-ES" : "pt-PT",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <section className="p-16">
      {/* Back to blog link */}
      <Link
        href={`/${locale}/blog`}
        className="text-[1.5rem] inline-flex items-center text-amber-500 hover:text-amber-600 mb-8 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        {t("back_to_blog")}
      </Link>

      <header className="mb-8">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h1 className="text-5xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <span
            className={`px-3 py-1 text-lg rounded-full ${
              post.locale === "es"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {post.locale.toUpperCase()}
          </span>
          <time className="text-gray-500 text-[1.6rem]">{formattedDate}</time>
        </div>
      </header>

      {/* Blog post content */}
      <article className="prose prose-amber max-w-none">
        {post.imageUrl && (
          <div className="mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="page_main_img rounded-lg shadow-md"
            />
          </div>
        )}

        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related posts (optional) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/${locale}/blog`}
            className="text-[1.5rem] inline-flex items-center text-amber-500 hover:text-amber-600 transition-colors"
          >
            {t("back_to_blog")}
          </Link>
        </div>
      </article>
    </section>
  );
}
