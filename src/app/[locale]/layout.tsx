import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/components/LocaleProvider";
import { isLocale, locales } from "@/i18n/messages";
import { buildLanguageAlternates } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return {
    alternates: {
      languages: buildLanguageAlternates("/"),
    },
    openGraph: {
      locale: locale === "zh-CN" ? "zh_CN" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale}>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Suspense fallback={<div className="h-24" />}>
          <Header />
        </Suspense>
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
