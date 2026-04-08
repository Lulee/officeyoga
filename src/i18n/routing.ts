import type { Locale } from "@/i18n/messages";

export const baseUrl = "https://officeyoga.lulee.dev";

export function localizePath(locale: Locale, path = "/") {
  if (path === "/" || path === "") {
    return `/${locale}`;
  }

  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripLocaleFromPath(pathname: string) {
  const segments = pathname.split("/");
  const [, maybeLocale, ...rest] = segments;

  if (maybeLocale === "en" || maybeLocale === "zh-CN") {
    const nextPath = `/${rest.join("/")}`;
    return nextPath === "/" ? "/" : nextPath.replace(/\/+$/, "") || "/";
  }

  return pathname;
}

export function buildLanguageAlternates(path = "/") {
  return {
    en: localizePath("en", path),
    "zh-CN": localizePath("zh-CN", path),
    "x-default": localizePath("en", path),
  };
}

export function toAbsoluteUrl(path: string) {
  return `${baseUrl}${path}`;
}
