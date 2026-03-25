import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { locales } from "@/i18n/messages";
import { baseUrl, localizePath } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = locales.flatMap((locale) =>
    ["", "/blog", "/about", "/privacy"].map((path) => ({
      url: `${baseUrl}${localizePath(locale, path || "/")}`,
      lastModified: new Date(),
    })),
  );

  const postPages = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${baseUrl}${localizePath(locale, `/blog/${post.slug}`)}`,
      lastModified: new Date(post.date),
    })),
  );

  return [...staticPages, ...postPages];
}
