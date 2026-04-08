"use client";

import { useMessages } from "@/components/LocaleProvider";

export default function AboutPageContent() {
  const t = useMessages();

  return (
    <section className="px-6 pb-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white/75 p-8 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
        <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
          {t.about.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-foreground)]">
          {t.about.title}
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-[var(--color-muted)]">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-[#E9D8A6]/40 p-6 dark:bg-[#E9D8A6]/10">
            <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
              {t.about.coverageTitle}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t.about.coverageBody}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-[#4A6741]/8 p-6 dark:bg-[#4A6741]/15">
            <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
              {t.about.contactTitle}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t.about.contactBody.split("officeyoga@lulee.dev")[0]}
              <a
                href="mailto:officeyoga@lulee.dev"
                className="font-medium text-[#4A6741] transition hover:text-[#D95B5B]"
              >
                officeyoga@lulee.dev
              </a>
              {t.about.contactBody.split("officeyoga@lulee.dev")[1] ?? ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
