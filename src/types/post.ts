import type { Locale } from "@/i18n/messages";

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
  translationKey?: string;
};

export type PostMeta = PostFrontmatter & {
  locale: Locale;
  slug: string;
  translationKey: string;
  tags: string[];
  readingTime: string;
  formattedDate: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};
