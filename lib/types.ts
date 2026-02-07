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

export type BlogPost = {
  id: string;
  slug: string;
  locale: string;
  title: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  imageUrl: string | null;
  link: string | null;
  createdAt: Date;
  updatedAt: Date;
};
