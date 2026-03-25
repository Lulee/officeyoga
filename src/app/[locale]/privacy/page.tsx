import type { Metadata } from "next";
import PrivacyPageContent from "@/components/PrivacyPageContent";
import { isLocale, messages } from "@/i18n/messages";
import {
  buildLanguageAlternates,
  localizePath,
  toAbsoluteUrl,
} from "@/i18n/routing";

type PrivacyPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "en";
  const t = messages[safeLocale];

  return {
    title: t.nav.privacy,
    description:
      safeLocale === "zh-CN"
        ? "查看 Office Yoga Blog 的隐私政策，包括分析工具与邮件订阅相关说明。"
        : "Read the privacy policy for Office Yoga Blog, including analytics and newsletter subscriptions.",
    alternates: {
      canonical: localizePath(safeLocale, "/privacy"),
      languages: buildLanguageAlternates("/privacy"),
    },
    openGraph: {
      url: toAbsoluteUrl(localizePath(safeLocale, "/privacy")),
      locale: safeLocale === "zh-CN" ? "zh_CN" : "en_US",
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
