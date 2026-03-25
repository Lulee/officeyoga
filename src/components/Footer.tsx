"use client";

import Link from "next/link";
import { useMessages } from "@/components/LocaleProvider";
import { localizePath } from "@/i18n/routing";
import { useLocale } from "@/components/LocaleProvider";

export default function Footer() {
  const { locale } = useLocale();
  const t = useMessages();

  return (
    <footer className="border-t border-black/5 bg-black/[0.02] px-6 py-8 dark:border-white/10 dark:bg-white/[0.02] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <div className="flex items-center gap-5">
          <Link
            href={localizePath(locale, "/about")}
            className="transition hover:text-[#D95B5B]"
          >
            {t.footer.about}
          </Link>
          <Link
            href={localizePath(locale, "/privacy")}
            className="transition hover:text-[#D95B5B]"
          >
            {t.footer.privacy}
          </Link>
          <a
            href="mailto:hello@officeyoga.blog"
            className="transition hover:text-[#D95B5B]"
          >
            {t.footer.contact}
          </a>
        </div>
      </div>
    </footer>
  );
}
