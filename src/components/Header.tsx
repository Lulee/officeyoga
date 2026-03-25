"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, Monitor, MoonStar, SunMedium, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { locales } from "@/i18n/messages";
import { useLocale, useMessages } from "@/components/LocaleProvider";
import { localizePath, stripLocaleFromPath } from "@/i18n/routing";

const navigation = [
  { href: "/", key: "home" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/privacy", key: "privacy" },
];

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

function subscribeToHydration(callback: () => void) {
  queueMicrotask(callback);
  return () => {};
}

function getThemePreferenceSnapshot(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const savedPreference = window.localStorage.getItem(
    "office-yoga-theme-preference",
  );

  return savedPreference === "light" ||
    savedPreference === "dark" ||
    savedPreference === "system"
    ? savedPreference
    : "system";
}

function subscribeToThemePreference(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handlePreferenceChange = () => callback();

  window.addEventListener("storage", handlePreferenceChange);
  window.addEventListener(
    "office-yoga-theme-preference-change",
    handlePreferenceChange,
  );

  return () => {
    window.removeEventListener("storage", handlePreferenceChange);
    window.removeEventListener(
      "office-yoga-theme-preference-change",
      handlePreferenceChange,
    );
  };
}

function getSystemThemeSnapshot(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeToSystemTheme(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleThemeChange = () => callback();

  mediaQuery.addEventListener("change", handleThemeChange);

  return () => mediaQuery.removeEventListener("change", handleThemeChange);
}

export default function Header() {
  const { locale } = useLocale();
  const t = useMessages();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const themePreference = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreferenceSnapshot,
    () => "system",
  );
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    () => "light",
  );
  const resolvedTheme =
    themePreference === "system" ? systemTheme : themePreference;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [hydrated, resolvedTheme]);

  const toggleTheme = () => {
    const nextTheme =
      themePreference === "system"
        ? "dark"
        : themePreference === "dark"
          ? "light"
          : "system";

    window.localStorage.setItem("office-yoga-theme-preference", nextTheme);
    window.dispatchEvent(new Event("office-yoga-theme-preference-change"));
  };

  const themeLabel =
    themePreference === "system"
      ? t.nav.themeSystem
      : themePreference === "dark"
        ? t.nav.themeDark
        : t.nav.themeLight;
  const ThemeIcon =
    themePreference === "system"
      ? Monitor
      : resolvedTheme === "dark"
        ? SunMedium
        : MoonStar;
  const barePath = stripLocaleFromPath(pathname);

  const switchLocale = (nextLocale: (typeof locales)[number]) => {
    const nextPath = localizePath(nextLocale, barePath);
    const nextQuery = searchParams.toString();

    router.push(nextQuery ? `${nextPath}?${nextQuery}` : nextPath);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-[#1F1F1F]/80 dark:shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href={localizePath(locale, "/")} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4A6741] text-sm font-bold text-white shadow-lg shadow-[#4A6741]/25">
            OY
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-[var(--color-foreground)]">
              Office Yoga
            </p>
            <p className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
              Workday Wellness
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? barePath === "/"
                : barePath === item.href || barePath.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={localizePath(locale, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#4A6741] text-white shadow-md shadow-[#4A6741]/20"
                    : "text-[var(--color-foreground)] hover:bg-[#4A6741]/8 hover:text-[#4A6741]"
                }`}
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </Link>
            );
          })}
          <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/10">
            {locales.map((nextLocale) => (
              <button
                key={nextLocale}
                type="button"
                onClick={() => switchLocale(nextLocale)}
                aria-label={`${t.nav.language}: ${nextLocale}`}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  locale === nextLocale
                    ? "bg-[#4A6741] text-white"
                    : "text-[var(--color-foreground)]"
                }`}
              >
                {nextLocale === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 transition hover:scale-105 hover:border-[#4A6741]/30 dark:border-white/10 dark:bg-white/10"
          >
            {hydrated ? <ThemeIcon size={18} /> : <Monitor size={18} />}
          </button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <div className="inline-flex items-center rounded-full border border-black/10 bg-white/70 p-1 dark:border-white/10 dark:bg-white/10">
            {locales.map((nextLocale) => (
              <button
                key={nextLocale}
                type="button"
                onClick={() => switchLocale(nextLocale)}
                aria-label={`${t.nav.language}: ${nextLocale}`}
                className={`rounded-full px-3 py-2 text-[11px] font-semibold transition ${
                  locale === nextLocale
                    ? "bg-[#4A6741] text-white"
                    : "text-[var(--color-foreground)]"
                }`}
              >
                {nextLocale === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/10"
          >
            {hydrated ? <ThemeIcon size={18} /> : <Monitor size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/10"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="animate-fade-up border-t border-black/5 bg-white/90 px-6 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#1F1F1F]/95 md:hidden">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? barePath === "/"
                  : barePath === item.href || barePath.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={localizePath(locale, item.href)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-[#4A6741] text-white"
                      : "text-[var(--color-foreground)] hover:bg-[#4A6741]/8 hover:text-[#4A6741]"
                  }`}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
