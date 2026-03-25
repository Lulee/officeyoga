import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { isLocale, messages } from "@/i18n/messages";
import {
  buildLanguageAlternates,
  localizePath,
  toAbsoluteUrl,
} from "@/i18n/routing";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = messages[safeLocale];

  return {
    title: safeLocale === "en" ? undefined : "办公室瑜伽博客 | 工作中的瑜伽、姿势与健康",
    description: t.home.description,
    alternates: {
      canonical: localizePath(safeLocale, "/"),
      languages: buildLanguageAlternates("/"),
    },
    openGraph: {
      url: toAbsoluteUrl(localizePath(safeLocale, "/")),
      locale: safeLocale === "zh-CN" ? "zh_CN" : "en_US",
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = messages[safeLocale];
  const allPosts = getAllPosts(safeLocale);
  const latestPosts = allPosts.slice(0, 6);
  const featuredPosts = allPosts.slice(0, 4);
  const popularTags = getAllTags(safeLocale, 8);

  return (
    <HomePageContent
      locale={safeLocale}
      t={t}
      latestPosts={latestPosts}
      featuredPosts={featuredPosts}
      popularTags={popularTags}
    />
  );
}
