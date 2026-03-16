import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import ArchiveRedditTool from "@/components/archive-reddit-tool";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Reddit Archive Viewer, Thread Saver & Offline Export Tool | Xarchive";
const pageDescription =
  "Search Reddit archive snapshots by subreddit, user page, or URL, then export captures in HTML, CSV, or JSON. Learn the best ways to archive Reddit posts and threads for offline viewing.";

const faqEntries = [
  {
    question: "How do I archive a Reddit post for offline viewing?",
    answer:
      "If a Reddit page is already archived by the Wayback Machine, Xarchive lets you search it by subreddit, user page, or direct URL and export the capture in HTML, CSV, or JSON for offline use. If you need a fresh capture of a live thread, users often pair this workflow with tools such as SingleFile or ArchiveWeb.page.",
  },
  {
    question: "Can I save an entire Reddit thread in one file?",
    answer:
      "Yes, but the best format depends on the job. Single-file HTML is convenient for offline reading, PDF is quick but lower fidelity, JSON is best for structured data, and WARC or WACZ is stronger for preservation-grade replay.",
  },
  {
    question: "Does Xarchive archive live Reddit pages by itself?",
    answer:
      "No. Xarchive searches existing Internet Archive CDX records and helps you inspect and export captures that already exist in the Wayback Machine.",
  },
  {
    question: "What is better for Reddit archiving: HTML, JSON, PDF, or WARC?",
    answer:
      "Use HTML when you want a readable offline copy, JSON when you care about post and comment data more than layout, PDF when you need a quick static snapshot, and WARC or WACZ when you want a higher-fidelity archive package that can be replayed later.",
  },
  {
    question: "Can I archive Reddit comments, GIFs, and videos?",
    answer:
      "Sometimes. Captured comments, media, and embeds depend on what the original archiving tool saved and what the Wayback Machine preserved. Direct URL captures are usually the cleanest verification path, but media completeness can vary.",
  },
  {
    question: "What is the best way to archive many Reddit posts at once?",
    answer:
      "For bulk collection, users often move from one-off page capture tools to structured pipelines such as Bulk Downloader for Reddit (BDFR) and HTML viewers built on top of those exports. Xarchive is strongest when you need to search and validate already-archived Reddit pages quickly.",
  },
];

const archivingMethods = [
  {
    title: "Single-file HTML",
    bestFor: "Best for saving one Reddit post or thread into one portable file for offline reading.",
    detail:
      "Community replies repeatedly pointed to SingleFile for this use case. It is convenient when you want a single HTML file that opens in a browser without juggling many assets.",
    href: "https://github.com/gildas-lormeau/SingleFile",
    linkLabel: "SingleFile",
  },
  {
    title: "Structured JSON",
    bestFor: "Best for extracting post and comment data when layout matters less than raw content.",
    detail:
      "One of the most practical tips in the thread was to append .json to a Reddit post URL when you want the page data rather than a visual copy. Xarchive exports also help when you want machine-readable archive results.",
  },
  {
    title: "WARC or WACZ",
    bestFor: "Best for higher-fidelity archiving and replay workflows.",
    detail:
      "For preservation-oriented capture, WARC and WACZ are a stronger fit than PDF. ArchiveWeb.page can capture pages interactively and export both formats for later replay or transfer.",
    href: "https://archiveweb.page/",
    linkLabel: "ArchiveWeb.page",
  },
  {
    title: "Bulk export pipelines",
    bestFor: "Best for archiving many Reddit posts, users, or subreddits at once.",
    detail:
      "The thread also surfaced BDFR and BDFR-HTML as the more scalable route when a one-page browser save is not enough and you want structured archives plus a browsable HTML layer.",
    href: "https://github.com/Serene-Arc/bulk-downloader-for-reddit",
    linkLabel: "BDFR",
    secondaryHref: "https://github.com/BlipRanger/bdfr-html",
    secondaryLinkLabel: "BDFR-HTML",
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to archive a Reddit post or thread for offline viewing",
  description:
    "Use Xarchive to find existing Wayback Machine captures of Reddit pages, inspect the best timestamps, and export them for offline analysis. Pair this with a fresh capture tool when you need to save a live thread that has not been archived yet.",
  totalTime: "PT5M",
  supply: [
    {
      "@type": "HowToSupply",
      name: "A Reddit post URL, subreddit, or user page",
    },
  ],
  tool: [
    {
      "@type": "HowToTool",
      name: "Xarchive Reddit Archive Explorer",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Choose the target",
      text: "Copy the Reddit URL you want to verify, or decide whether subreddit mode or user-page mode is a better starting point.",
      url: `${SITE_URL}/archive-reddit`,
    },
    {
      "@type": "HowToStep",
      name: "Search existing captures",
      text: "Run the query in Xarchive to pull matching Internet Archive CDX records for the Reddit target.",
      url: `${SITE_URL}/archive-reddit`,
    },
    {
      "@type": "HowToStep",
      name: "Narrow by time",
      text: "Use the date filters to focus on the event window and reduce noisy captures.",
      url: `${SITE_URL}/archive-reddit`,
    },
    {
      "@type": "HowToStep",
      name: "Open the best timestamps",
      text: "Inspect the archived URLs closest to the date you care about and verify whether the page, comments, and media were preserved well enough.",
      url: `${SITE_URL}/archive-reddit`,
    },
    {
      "@type": "HowToStep",
      name: "Export the result",
      text: "Export the final capture set in HTML, CSV, or JSON. If you need a new offline copy of a still-live Reddit thread, use a dedicated capture tool such as SingleFile or ArchiveWeb.page in addition to Xarchive.",
      url: `${SITE_URL}/archive-reddit`,
    },
  ],
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
  keywords: [
    "reddit archive",
    "reddit archive viewer",
    "archive reddit post",
    "archive reddit thread",
    "save reddit post offline",
    "reddit json",
    "wayback reddit",
    "reddit thread saver",
  ],
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
              Search archived Reddit posts, threads, and user pages from the Wayback Machine without leaving Xarchive.
            </p>
            <p className="text-sm text-zinc-600">
              Review historical Reddit URLs, inspect archive timestamps, and export the result set in HTML, CSV, or JSON when you need offline evidence.
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
                  Best for archived user profile pages and user-specific URLs that were publicly captured.
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

          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Best Ways to Archive a Reddit Post Offline</h2>
            <p className="text-muted-foreground">
              A recent high-ranking r/DataHoarder discussion around archiving entire Reddit threads offline kept converging on the same practical options.
              The right choice depends on whether you want a readable one-file copy, structured data, or a more preservation-oriented archive package.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {archivingMethods.map((method) => (
                <article key={method.title} className="rounded-lg border p-4">
                  <h3 className="font-medium">{method.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{method.bestFor}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{method.detail}</p>
                  {(method.href || method.secondaryHref) && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Reference:{" "}
                      {method.href && (
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {method.linkLabel}
                        </a>
                      )}
                      {method.href && method.secondaryHref ? " and " : ""}
                      {method.secondaryHref && (
                        <a
                          href={method.secondaryHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {method.secondaryLinkLabel}
                        </a>
                      )}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Source and Limits</h2>
            <p className="text-muted-foreground">
              Reddit results are sourced from the Internet Archive CDX index. Coverage depends on what the Wayback Machine
              crawled publicly, so older or less-linked Reddit pages may have sparse capture history.
            </p>
            <p className="text-muted-foreground">
              Xarchive is strongest when the Reddit page was already captured. If you need to preserve a live thread before it disappears,
              use a live-capture workflow first, then use Xarchive later to search and verify the public archive history.
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
            <p className="text-muted-foreground">
              That makes Xarchive especially useful after a page is already archived and you need to keep a cleaner evidence bundle instead of manually
              copying timestamps and archive URLs one by one.
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
        id="reddit-howto-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Script
        id="reddit-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
