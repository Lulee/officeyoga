import Link from "next/link";
import NewsletterDeferred from "@/components/NewsletterDeferred";
import { localizePath } from "@/i18n/routing";
import type { Locale, Messages } from "@/i18n/messages";
import type { PostMeta } from "@/types/post";

type HomePageContentProps = {
  locale: Locale;
  t: Messages;
  latestPosts: PostMeta[];
  featuredPosts: PostMeta[];
  popularTags: Array<{
    tag: string;
    count: number;
  }>;
};

export default function HomePageContent({
  locale,
  t,
  latestPosts,
  featuredPosts,
  popularTags,
}: HomePageContentProps) {
  return (
    <>
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-10 sm:px-8 lg:px-12">
        <div className="hero-glow absolute inset-0 -z-20" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#4A6741] via-[#5d7b54] to-[#E9D8A6] p-8 text-white shadow-2xl shadow-[#4A6741]/15 sm:p-12">
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm tracking-[0.24em] text-white/80 uppercase backdrop-blur-sm">
              {t.home.eyebrow}
            </p>
            <h1 className="font-display text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
              {t.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              {t.home.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={localizePath(locale, "/blog")} className="btn-primary">
                {t.home.primaryCta}
              </Link>
              <a
                href="#newsletter"
                className="btn-secondary border-white/50 text-white hover:bg-white/10"
              >
                {t.home.secondaryCta}
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {t.home.focuses.map((item, index) => (
              <div
                key={item}
                className="glass-card animate-fade-up rounded-[1.75rem] p-6"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-sm font-medium tracking-[0.2em] text-[#4A6741] uppercase">
                  Focus {index + 1}
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-foreground)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-auto px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card rounded-[2rem] p-8">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
              {t.home.featuredEyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--color-foreground)] sm:text-4xl">
              {t.home.featuredTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              {t.home.featuredDescription}
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={localizePath(locale, `/blog/${post.slug}`)}
                  className="rounded-[1.5rem] border border-black/5 bg-white/70 p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#4A6741] uppercase">
                    {post.formattedDate}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--color-foreground)]">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 leading-7 text-[var(--color-muted)]">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
                {t.home.pathEyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--color-foreground)]">
                {t.home.pathTitle}
              </h2>
            </div>
            {t.home.pathCards.map((card, index) => (
              <div
                key={card.title}
                className="glass-card animate-fade-up rounded-[1.5rem] p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-lg font-semibold text-[var(--color-foreground)]">
                  {card.title}
                </p>
                <p className="mt-2 leading-7 text-[var(--color-muted)]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-auto px-6 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-[#4A6741] uppercase">
                {t.home.latestEyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--color-foreground)]">
                {t.home.latestTitle}
              </h2>
            </div>
            <Link
              href={localizePath(locale, "/blog")}
              className="hidden text-sm font-semibold text-[#4A6741] transition hover:text-[#D95B5B] md:inline-flex"
            >
              {t.home.viewAll}
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="glass-card animate-fade-up flex h-full flex-col overflow-hidden rounded-[1.75rem] transition hover:-translate-y-1.5"
              >
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
            ))}
          </div>
        </div>
      </section>

      <section className="content-auto px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
              {t.home.topicEyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--color-foreground)]">
              {t.home.topicTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
              {t.home.topicDescription}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {popularTags.map((item, index) => (
              <Link
                key={item.tag}
                href={`${localizePath(locale, "/blog")}?tag=${encodeURIComponent(item.tag)}`}
                className="glass-card animate-fade-up rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="text-sm font-semibold tracking-[0.18em] text-[#4A6741] uppercase">
                  {item.count} posts
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--color-foreground)]">
                  {item.tag}
                </h3>
                <p className="mt-3 text-sm font-medium text-[var(--color-muted)]">
                  {t.home.topicRead}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="newsletter"
        className="content-auto px-6 pb-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <NewsletterDeferred
            title={t.home.newsletterTitle}
            description={t.home.newsletterDescription}
          />
        </div>
      </section>
    </>
  );
}
