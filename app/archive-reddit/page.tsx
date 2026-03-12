import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import ArchiveRedditTool from "@/components/archive-reddit-tool";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Free Reddit Archive Viewer & Downloader | Xarchive";
const pageDescription =
  "Explore and download Reddit archive snapshots by subreddit, user, or URL. Xarchive surfaces historical Reddit captures from the Wayback Machine in HTML, CSV, and JSON.";

const faqEntries = [
  {
    question: "What can I search in the Reddit archive explorer?",
    answer:
      "You can search archived Reddit captures by subreddit, user profile, or direct Reddit URL.",
  },
  {
    question: "Does Xarchive store Reddit content itself?",
    answer:
      "No. Xarchive queries Internet Archive CDX data and helps you review captures that already exist in the Wayback Machine.",
  },
  {
    question: "Can I export Reddit archive results?",
    answer:
      "Yes. Reddit archive captures can be exported in HTML, CSV, and JSON.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Xarchive Reddit Archive Explorer",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/archive-reddit`,
  description: pageDescription,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Reddit Archive",
      item: `${SITE_URL}/archive-reddit`,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/archive-reddit`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/archive-reddit`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function RedditArchivePage() {
  return (
    <main className="font-sans flex min-h-screen w-full flex-col">
      <section className="relative overflow-hidden border-b bg-[radial-gradient(circle_at_top_left,_rgba(255,115,0,0.14),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_30%),linear-gradient(to_bottom,_rgba(250,250,250,1),_rgba(255,255,255,1))]">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 md:py-24">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Reddit Archive Explorer
            </h1>
            <p className="text-lg text-zinc-700">
              Search subreddit, user, and post captures from the Wayback Machine without leaving Xarchive.
            </p>
            <p className="text-sm text-zinc-600">
              Review historical Reddit URLs, inspect archive timestamps, and export the full result set in HTML, CSV, or JSON.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-background flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <ArchiveRedditTool />
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-16 flex flex-col gap-10">
          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Choose the Right Reddit Search Mode</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <article className="rounded-lg border p-4">
                <h3 className="font-medium">Subreddit</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Best for archive discovery across a whole community such as `r/programming`.
                </p>
              </article>
              <article className="rounded-lg border p-4">
                <h3 className="font-medium">User</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Best for checking profile history and content tied to one Reddit account.
                </p>
              </article>
              <article className="rounded-lg border p-4">
                <h3 className="font-medium">Direct URL</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Best for verifying a specific Reddit post, comment, or profile page.
                </p>
              </article>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How to Search Reddit Archives</h2>
            <p className="text-muted-foreground">
              Use subreddit mode when you want broad coverage for a community, user mode when you need a profile-level trail,
              and direct URL mode when you already know the exact Reddit page you want to verify. Xarchive queries Internet
              Archive CDX data and returns the captures that match your filters.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Source and Limits</h2>
            <p className="text-muted-foreground">
              Reddit results are sourced from the Internet Archive CDX index. Coverage depends on what the Wayback Machine
              crawled publicly, so older or less-linked Reddit pages may have sparse capture history.
            </p>
            <p className="text-sm text-muted-foreground">
              Data source:{" "}
              <a
                href="https://web.archive.org/cdx/search/cdx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Internet Archive CDX API
              </a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Export Reddit Archive Snapshots</h2>
            <p className="text-muted-foreground">
              Once you find the captures you need, export them as HTML for quick review, CSV for spreadsheet analysis, or JSON
              for engineering and research workflows. Each export includes timestamps, source URLs, and archive metadata.
            </p>
          </section>

          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Learn the Workflow</h2>
            <p className="text-muted-foreground">
              If you want Reddit-specific search guidance instead of jumping straight into the tool, start with the Reddit guide hub.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/reddit-archives"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Open Reddit Guides
              </Link>
              <Link
                href="/guides/how-to-search-reddit-archives"
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Search Reddit Archives Guide
              </Link>
            </div>
          </section>

          <section className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Try the <Link href="/archive-reddit" className="text-primary hover:underline">Reddit Archive tool</Link>, the{" "}
              <Link href="/" className="text-primary hover:underline">Twitter Archive tool</Link>, or the{" "}
              <Link href="/archive-instagram" className="text-primary hover:underline">Instagram Archive tool</Link>.
            </p>
          </section>

          <section className="space-y-6" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-semibold text-center">Wayback Machine Reddit Archive FAQ</h2>
            <div className="space-y-4">
              {faqEntries.map((entry) => (
                <article key={entry.question} className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">{entry.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{entry.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Script
        id="reddit-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="reddit-app-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Script
        id="reddit-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
