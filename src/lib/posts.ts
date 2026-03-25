import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import { locales } from "@/i18n/messages";
import type { Locale } from "@/i18n/messages";
import { localizePath } from "@/i18n/routing";
import type { Post, PostFrontmatter, PostMeta } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "posts");

type PostSource = {
  locale: Locale;
  slug: string;
  translationKey: string;
  title: string;
  date: string;
  description: string;
  author?: string;
  tags: string[];
  coverImage?: string;
  content: string;
};

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "zh-CN" ? "zh-CN" : "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function formatReadingTime(content: string, locale: Locale) {
  const stats = readingTime(content);

  if (locale === "zh-CN") {
    return `${Math.max(1, Math.round(stats.minutes))} 分钟阅读`;
  }

  return stats.text;
}

function listMarkdownFiles(directory: string) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory).filter((file) => file.endsWith(".md"));
}

function getLocalePostsDirectory(locale: Locale) {
  return path.join(postsDirectory, locale);
}

function getLegacyEnglishFiles() {
  return listMarkdownFiles(postsDirectory).map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
    filePath: path.join(postsDirectory, fileName),
  }));
}

function getLocaleFiles(locale: Locale) {
  const localeDirectory = getLocalePostsDirectory(locale);
  const localeFiles = listMarkdownFiles(localeDirectory).map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
    filePath: path.join(localeDirectory, fileName),
  }));

  if (locale !== "en") {
    return localeFiles;
  }

  const mergedFiles = new Map<string, string>();

  for (const file of getLegacyEnglishFiles()) {
    mergedFiles.set(file.slug, file.filePath);
  }

  for (const file of localeFiles) {
    mergedFiles.set(file.slug, file.filePath);
  }

  return [...mergedFiles.entries()].map(([slug, filePath]) => ({ slug, filePath }));
}

function parsePostFile(filePath: string, locale: Locale): PostSource {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;
  const slug = path.basename(filePath, ".md");

  return {
    locale,
    slug,
    translationKey: frontmatter.translationKey ?? slug,
    title: frontmatter.title,
    date: frontmatter.date,
    description: frontmatter.description,
    author: frontmatter.author,
    tags: frontmatter.tags ?? [],
    coverImage: frontmatter.coverImage,
    content,
  };
}

function getPostSources(locale: Locale): PostSource[] {
  return getLocaleFiles(locale).map(({ filePath }) => parsePostFile(filePath, locale));
}

function toPostMeta(source: PostSource): PostMeta {
  return {
    locale: source.locale,
    slug: source.slug,
    translationKey: source.translationKey,
    title: source.title,
    date: source.date,
    description: source.description,
    author: source.author,
    tags: source.tags,
    coverImage: source.coverImage,
    readingTime: formatReadingTime(source.content, source.locale),
    formattedDate: formatDate(source.date, source.locale),
  };
}

export function getPostSlugs(locale: Locale = "en") {
  return getLocaleFiles(locale).map((file) => file.slug);
}

export function getAllPosts(locale: Locale = "en"): PostMeta[] {
  return getPostSources(locale)
    .map((source) => toPostMeta(source))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(
  slug: string,
  locale: Locale = "en",
): Promise<Post | null> {
  const post = getPostSources(locale).find((source) => source.slug === slug);

  if (!post) {
    return null;
  }

  const processedContent = await remark().use(html).process(post.content);

  return {
    ...toPostMeta(post),
    contentHtml: processedContent.toString(),
  };
}

export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  locale: Locale = "en",
  limit = 2,
): PostMeta[] {
  const normalizedTags = new Set(tags.map((tag) => tag.toLowerCase()));

  return getAllPosts(locale)
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.reduce((total, tag) => {
        return total + (normalizedTags.has(tag.toLowerCase()) ? 1 : 0);
      }, 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.post.date > b.post.date ? -1 : 1))
    .slice(0, limit)
    .map((item) => item.post);
}

export function getAllTags(locale: Locale = "en", limit = 8) {
  const tagCounts = new Map<string, number>();

  for (const post of getAllPosts(locale)) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit);
}

export function getPostsByTag(tag: string, locale: Locale = "en") {
  const normalizedTag = tag.toLowerCase();
  return getAllPosts(locale).filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === normalizedTag),
  );
}

export function getPostLanguageAlternates(translationKey: string) {
  const alternates: Partial<Record<Locale, string>> = {};

  for (const locale of locales) {
    const matchingPost = getPostSources(locale).find(
      (post) => post.translationKey === translationKey,
    );

    if (matchingPost) {
      alternates[locale] = localizePath(locale, `/blog/${matchingPost.slug}`);
    }
  }

  return alternates;
}
