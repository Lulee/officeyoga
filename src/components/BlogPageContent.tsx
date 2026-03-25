"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PostCard from "@/components/PostCard";
import { useLocale, useMessages } from "@/components/LocaleProvider";
import { localizePath } from "@/i18n/routing";
import type { PostMeta } from "@/types/post";

const INITIAL_POSTS = 9;
const LOAD_MORE_COUNT = 6;

type BlogPageContentProps = {
  posts: PostMeta[];
  activeTag?: string;
  popularTags: Array<{
    tag: string;
    count: number;
  }>;
};

export default function BlogPageContent({
  posts,
  activeTag,
  popularTags,
}: BlogPageContentProps) {
  const { locale } = useLocale();
  const t = useMessages();
  const [visibleCount, setVisibleCount] = useState(INITIAL_POSTS);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < posts.length;

  useEffect(() => {
    if (!hasMorePosts || !loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setVisibleCount((currentCount) =>
          Math.min(currentCount + LOAD_MORE_COUNT, posts.length),
        );
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMorePosts, posts.length]);

  return (
    <section className="px-6 pb-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-[2rem] border border-black/5 bg-white/70 p-8 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
            {t.blog.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-foreground)]">
            {t.blog.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {t.blog.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-[var(--color-muted)]">
              {t.blog.filterLabel}
            </span>
            {popularTags.map((item) => {
              const isActive = activeTag?.toLowerCase() === item.tag.toLowerCase();
              return (
                <Link
                  key={item.tag}
                  href={`${localizePath(locale, "/blog")}?tag=${encodeURIComponent(item.tag)}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#4A6741] text-white"
                      : "bg-[#4A6741]/10 text-[#4A6741] hover:bg-[#4A6741]/15"
                  }`}
                >
                  {item.tag}
                </Link>
              );
            })}
            {activeTag ? (
              <Link
                href={localizePath(locale, "/blog")}
                className="text-sm font-semibold text-[#D95B5B]"
              >
                {t.blog.clearFilter}
              </Link>
            ) : null}
          </div>
          {activeTag ? (
            <p className="mt-4 text-sm font-medium text-[var(--color-muted)]">
              {t.blog.showingTag}: <span className="text-[#4A6741]">{activeTag}</span>
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {hasMorePosts ? (
          <div
            ref={loadMoreRef}
            aria-hidden="true"
            className="mt-12 flex justify-center py-6"
          >
            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4A6741]/55" />
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4A6741]/35 [animation-delay:180ms]" />
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#4A6741]/20 [animation-delay:360ms]" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
