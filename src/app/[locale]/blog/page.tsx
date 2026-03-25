import type { Metadata } from "next";
import BlogPageContent from "@/components/BlogPageContent";
import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/posts";
import { isLocale, messages } from "@/i18n/messages";
import {
  buildLanguageAlternates,
  localizePath,
  toAbsoluteUrl,
} from "@/i18n/routing";

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams?: Promise<{
    tag?: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = messages[safeLocale];

  return {
    title: t.nav.blog,
    description: t.blog.description,
    alternates: {
      canonical: localizePath(safeLocale, "/blog"),
      languages: buildLanguageAlternates("/blog"),
    },
    openGraph: {
      url: toAbsoluteUrl(localizePath(safeLocale, "/blog")),
      locale: safeLocale === "zh-CN" ? "zh_CN" : "en_US",
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeTag = resolvedSearchParams?.tag?.trim();

  const posts = activeTag
    ? getPostsByTag(activeTag, safeLocale)
    : getAllPosts(safeLocale);
  const popularTags = getAllTags(safeLocale, 8);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: toAbsoluteUrl(localizePath(safeLocale, `/blog/${post.slug}`)),
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <BlogPageContent
        key={`${safeLocale}:${activeTag ?? "all"}`}
        posts={posts}
        activeTag={activeTag}
        popularTags={popularTags}
      />
    </>
  );
}
