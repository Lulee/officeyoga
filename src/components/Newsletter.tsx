"use client";

import { FormEvent, useState } from "react";
import { useMessages } from "@/components/LocaleProvider";

type NewsletterProps = {
  title?: string;
  description?: string;
  compact?: boolean;
};

export default function Newsletter({
  title = "Stay in the flow",
  description = "Subscribe for fresh office yoga insights, short desk routines, and mindful workday inspiration.",
  compact = false,
}: NewsletterProps) {
  const t = useMessages();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section
      className={`relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 ${
        compact ? "sm:p-8" : "sm:p-10"
      }`}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(74,103,65,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(233,216,166,0.3),transparent_35%)]" />
      <p className="text-sm font-semibold tracking-[0.24em] text-[#4A6741] uppercase">
        {t.newsletter.label}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--color-foreground)]">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
        {description}
      </p>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.newsletter.placeholder}
          className="min-h-14 flex-1 rounded-full border border-black/10 bg-white px-5 text-[var(--color-foreground)] outline-none transition focus:border-[#4A6741] dark:border-white/10 dark:bg-[#1F1F1F]"
          aria-label="Email address"
          required
        />
        <button type="submit" className="btn-primary min-h-14 justify-center">
          {t.newsletter.subscribe}
        </button>
      </form>

      {submitted ? (
        <p className="mt-4 text-sm font-medium text-[#4A6741] dark:text-[#E9D8A6]">
          {t.newsletter.success}
        </p>
      ) : null}
    </section>
  );
}
