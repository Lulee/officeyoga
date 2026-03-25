"use client";

import { useMessages } from "@/components/LocaleProvider";

export default function PrivacyPageContent() {
  const t = useMessages();

  return (
    <section className="px-6 pb-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white/75 p-8 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
        <h1 className="font-display text-4xl font-semibold text-[var(--color-foreground)]">
          {t.privacy.title}
        </h1>
        <div className="prose prose-stone mt-8 max-w-none prose-headings:font-display prose-a:text-[#4A6741] dark:prose-invert">
          <p>{t.privacy.intro}</p>
          {t.privacy.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
