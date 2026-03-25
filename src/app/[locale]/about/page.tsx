import type { Metadata } from "next";
import AboutPageDeferred from "@/components/AboutPageDeferred";
import { isLocale, messages } from "@/i18n/messages";
import {
  buildLanguageAlternates,
  localizePath,
  toAbsoluteUrl,
} from "@/i18n/routing";

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = messages[safeLocale];

  return {
    title: t.nav.about,
    description:
      safeLocale === "zh-CN"
        ? "了解 Office Yoga Blog 的使命、内容方向以及联系方式。"
        : "Learn more about the mission behind Office Yoga Blog and how to get in touch.",
    alternates: {
      canonical: localizePath(safeLocale, "/about"),
      languages: buildLanguageAlternates("/about"),
    },
    openGraph: {
      url: toAbsoluteUrl(localizePath(safeLocale, "/about")),
      locale: safeLocale === "zh-CN" ? "zh_CN" : "en_US",
    },
  };
}

export default function AboutPage() {
  return <AboutPageDeferred />;
}
