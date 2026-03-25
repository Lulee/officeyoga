import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.officeyoga.blog"),
  title: {
    default: "Office Yoga Blog | Yoga, Posture, and Wellness at Work",
    template: "%s | Office Yoga Blog",
  },
  description:
    "Modern, practical guidance for office yoga, posture care, desk stretches, and healthier workdays.",
  openGraph: {
    title: "Office Yoga Blog",
    description:
      "Yoga, mobility, and workplace wellness tips for global office teams.",
    type: "website",
    url: "https://www.officeyoga.blog",
    siteName: "Office Yoga Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Office Yoga Blog",
    description:
      "Yoga, mobility, and workplace wellness tips for global office teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full scroll-smooth"
    >
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
