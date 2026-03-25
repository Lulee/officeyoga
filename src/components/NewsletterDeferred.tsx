"use client";

import dynamic from "next/dynamic";

const Newsletter = dynamic(() => import("@/components/Newsletter"), {
  ssr: false,
  loading: () => (
    <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-xl shadow-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
      <div className="h-4 w-28 rounded-full bg-[#4A6741]/12" />
      <div className="mt-4 h-10 w-3/4 rounded-full bg-black/6 dark:bg-white/6" />
      <div className="mt-5 h-4 w-full rounded-full bg-black/6 dark:bg-white/6" />
      <div className="mt-3 h-4 w-5/6 rounded-full bg-black/6 dark:bg-white/6" />
      <div className="mt-8 h-14 w-full rounded-full bg-black/6 dark:bg-white/6" />
    </div>
  ),
});

type NewsletterDeferredProps = {
  title: string;
  description: string;
  compact?: boolean;
};

export default function NewsletterDeferred({
  title,
  description,
  compact = false,
}: NewsletterDeferredProps) {
  return (
    <div
      className={compact ? "min-h-[21rem] sm:min-h-[22rem]" : "min-h-[23rem] sm:min-h-[24rem]"}
    >
      <Newsletter title={title} description={description} compact={compact} />
    </div>
  );
}
