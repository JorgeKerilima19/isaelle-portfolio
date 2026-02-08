// app/[locale]/blog/page.tsx
import { getTranslations } from "next-intl/server";
import prisma from "@/lib/prisma";
import { BlogCard } from "@/components/subcomponents/BlogCard";
import type { BlogPost } from "@/lib/types";

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "pt" }];
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch published blog posts for current locale
  const blogPosts: BlogPost[] = await prisma.blogPost.findMany({
    where: {
      locale,
      published: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="min-h-screen pt-24 p-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          {t("description")}
        </p>
      </div>

      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center">
          <p className="text-gray-500 text-xl">{t("no_posts")}</p>
        </div>
      )}
    </section>
  );
}
