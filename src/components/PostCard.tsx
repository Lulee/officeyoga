"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useMessages } from "@/components/LocaleProvider";
import { localizePath } from "@/i18n/routing";
import type { PostMeta } from "@/types/post";

type PostCardProps = {
  post: PostMeta;
  priority?: boolean;
};

export default function PostCard({ post }: PostCardProps) {
  const { locale } = useLocale();
  const t = useMessages();

  return (
    <article className="glass-card animate-fade-up flex h-full flex-col overflow-hidden rounded-[1.75rem] transition hover:-translate-y-1.5">
      {post.coverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <span>{post.formattedDate}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-muted)]" />
          <span>{post.readingTime}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#4A6741]/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#4A6741] uppercase dark:bg-[#E9D8A6]/10 dark:text-[#E9D8A6]"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={localizePath(locale, `/blog/${post.slug}`)}
          className="group mt-4 flex flex-1 flex-col rounded-[1.25rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A6741]"
          aria-label={`${t.post.readMore}: ${post.title}`}
        >
          <h3 className="text-xl font-bold text-[var(--color-foreground)] transition duration-300 group-hover:text-[#4A6741] md:text-2xl">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-3 flex-1 leading-7 text-[var(--color-muted)]">
            {post.description}
          </p>
          <span className="mt-6 inline-flex shrink-0 self-start rounded-full bg-[#4A6741] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#4A6741]/20 transition group-hover:scale-105 group-hover:bg-[#3a5533]">
            {t.post.readMore}
          </span>
        </Link>
      </div>
    </article>
  );
}
