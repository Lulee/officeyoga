"use client";

import Link from "next/link";
import Image from "next/image";
import NewsletterDeferred from "@/components/NewsletterDeferred";
import PostCard from "@/components/PostCard";
import { useLocale, useMessages } from "@/components/LocaleProvider";
import { localizePath } from "@/i18n/routing";
import type { Post, PostMeta } from "@/types/post";

type PostPageContentProps = {
  post: Post;
  relatedPosts: PostMeta[];
  articleJsonLd: string;
};

export default function PostPageContent({
  post,
  relatedPosts,
  articleJsonLd,
}: PostPageContentProps) {
  const { locale } = useLocale();
  const t = useMessages();

  return (
    <section className="px-6 pb-20 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd }}
      />
      <div className="mx-auto max-w-3xl">
        <article className="glass-card overflow-hidden rounded-[2rem] p-6 sm:p-10">
          {post.coverImage ? (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[1.75rem]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
            <span>{post.formattedDate}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-muted)]" />
            <span>{post.readingTime}</span>
            {post.author ? (
              <>
                <span className="h-1 w-1 rounded-full bg-[var(--color-muted)]" />
                <span>{post.author}</span>
              </>
            ) : null}
          </div>

          <h1 className="mt-5 font-display text-4xl leading-tight font-semibold text-[var(--color-foreground)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
            {post.description}
          </p>

          {post.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`${localizePath(locale, "/blog")}?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-[#4A6741]/10 px-3 py-1 text-sm font-medium text-[#4A6741] dark:bg-[#E9D8A6]/10 dark:text-[#E9D8A6]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}

          <div
            className="prose prose-lg prose-stone mt-10 max-w-none prose-headings:font-display prose-headings:text-[var(--color-foreground)] prose-p:text-[var(--color-foreground)] prose-a:text-[#4A6741] prose-a:no-underline hover:prose-a:text-[#D95B5B] prose-strong:text-[var(--color-foreground)] prose-img:rounded-3xl dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <div className="mt-10">
          <NewsletterDeferred
            title={t.post.articleEnjoyed}
            description={t.post.articleDescription}
            compact
          />
        </div>

        {relatedPosts.length > 0 ? (
          <section className="mt-14">
            <div className="mb-6">
              <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
                {t.post.relatedLabel}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--color-foreground)]">
                {t.post.relatedTitle}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}

        {post.tags.length > 0 ? (
          <section className="mt-12 rounded-[1.75rem] border border-black/5 bg-white/70 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
              {t.post.continueLabel}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--color-foreground)]">
              {t.post.taggedLabel}
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`${localizePath(locale, "/blog")}?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[#4A6741]/20 bg-[#4A6741]/8 px-4 py-2 text-sm font-semibold text-[#4A6741] transition hover:bg-[#4A6741] hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
