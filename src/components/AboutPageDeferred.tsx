"use client";

import dynamic from "next/dynamic";

const AboutPageContent = dynamic(() => import("@/components/AboutPageContent"), {
  ssr: false,
  loading: () => (
    <section className="px-6 pb-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white/75 p-8 shadow-lg shadow-black/5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
        <div className="h-4 w-32 rounded-full bg-[#4A6741]/12" />
        <div className="mt-4 h-10 w-2/3 rounded-full bg-black/6 dark:bg-white/6" />
        <div className="mt-8 space-y-4">
          <div className="h-4 w-full rounded-full bg-black/6 dark:bg-white/6" />
          <div className="h-4 w-11/12 rounded-full bg-black/6 dark:bg-white/6" />
          <div className="h-4 w-4/5 rounded-full bg-black/6 dark:bg-white/6" />
        </div>
      </div>
    </section>
  ),
});

export default function AboutPageDeferred() {
  return <AboutPageContent />;
}
