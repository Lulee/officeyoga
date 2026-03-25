import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostPageContent from "@/components/PostPageContent";
import {
  getPostBySlug,
  getPostLanguageAlternates,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { isLocale, locales, messages } from "@/i18n/messages";
import {
  localizePath,
  toAbsoluteUrl,
} from "@/i18n/routing";

type PostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const post = await getPostBySlug(slug, safeLocale);

  if (!post) {
    return {
      title: safeLocale === "zh-CN" ? "文章未找到" : "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: localizePath(safeLocale, `/blog/${post.slug}`),
      languages: getPostLanguageAlternates(post.translationKey),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: toAbsoluteUrl(localizePath(safeLocale, `/blog/${post.slug}`)),
      locale: safeLocale === "zh-CN" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const post = await getPostBySlug(slug, safeLocale);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags, safeLocale, 2);
  const t = messages[safeLocale];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: safeLocale,
    author: {
      "@type": "Person",
      name: post.author ?? "Office Yoga Team",
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: toAbsoluteUrl(localizePath(safeLocale, `/blog/${post.slug}`)),
    articleSection: t.nav.blog,
  };

  return (
    <PostPageContent
      post={post}
      relatedPosts={relatedPosts}
      articleJsonLd={JSON.stringify(articleJsonLd)}
    />
  );
}
