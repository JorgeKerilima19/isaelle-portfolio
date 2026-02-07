// lib/types.ts
export type Project = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string;
  content: string;
  year: number | null;
  published: boolean;
  imageUrl: string | null;
  link: string | null;
};
