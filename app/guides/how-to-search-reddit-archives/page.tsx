import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { PageShell } from "@/components/page-shell";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "How to Search Reddit Archives";
const pageDescription =
  "Learn how to search Reddit archives by subreddit, user, and direct URL using Xarchive and Internet Archive CDX data.";

const faqEntries = [
  {
    question: "What is the best starting point for searching Reddit archives?",
    answer:
      "Start with a subreddit when you need broad discovery, a user when you need profile history, and a direct URL when you need exact-page verification.",
  },
  {
    question: "Can I search archived Reddit comments?",
    answer:
      "Yes. Comment captures can appear when a direct comment URL or a post-level URL was archived publicly.",
  },
  {
    question: "Can I export Reddit archive results from Xarchive?",
    answer:
      "Yes. Xarchive supports HTML, CSV, and JSON exports for Reddit captures.",
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

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-search-reddit-archives`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/guides/how-to-search-reddit-archives`,
    siteName: SITE_NAME,
    type: "article",
  },
};

export default function HowToSearchRedditArchivesPage() {
  return (
    <PageShell
      title="How to Search Reddit Archives"
      subtitle="A practical Reddit archive workflow for subreddit discovery, user history, and exact-page verification."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          Reddit archive search works best when the query matches the actual research job. Choose subreddit mode for
          broad community discovery, user mode for profile history, and direct URL mode for the cleanest verification path.
        </p>
        <p className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Quick answer:</span> Enter a subreddit, Reddit username, or direct
          Reddit URL into Xarchive, filter by date, inspect the returned Wayback captures, and export the subset you want to keep.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Step-by-Step</h2>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>Decide whether your goal is community discovery, profile history, or exact-page verification.</li>
          <li>Choose the matching search mode in the Reddit archive tool.</li>
          <li>Set a date range around the period you care about to reduce noise.</li>
          <li>Review capture rows, then open the archived URLs nearest to the relevant event window.</li>
          <li>Export the validated capture set in HTML, CSV, or JSON.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Common Failure Cases</h2>
        <div className="space-y-3">
          <article className="rounded-lg border p-4">
            <h3 className="font-medium">Too much noise in subreddit results</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tighten the date range or switch to a direct post URL if you already know the target page.
            </p>
          </article>
          <article className="rounded-lg border p-4">
            <h3 className="font-medium">User results are sparse</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Archive coverage depends on what was publicly crawled. Sparse results usually reflect sparse capture history.
            </p>
          </article>
          <article className="rounded-lg border p-4">
            <h3 className="font-medium">A comment URL is missing</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Check the parent post URL as well. Some archived Reddit captures preserve post pages more consistently than direct comment URLs.
            </p>
          </article>
        </div>
      </section>

      <section className="space-y-3 rounded-lg border bg-muted/20 p-4">
        <h2 className="text-xl font-semibold">Data Source and Limitations</h2>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Data source:</span> Internet Archive CDX index (
          <a
            href="https://web.archive.org/cdx/search/cdx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://web.archive.org/cdx/search/cdx
          </a>
          ). Results depend on what the Wayback Machine crawled publicly and stored over time.
        </p>
      </section>

      <section className="space-y-4 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Run This in Xarchive</h2>
        <p className="text-sm text-muted-foreground">
          Use the Reddit archive tool to search captures, inspect timestamps, and export your final result set.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/archive-reddit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open Reddit Archive Tool
          </Link>
          <Link
            href="/guides/wayback-machine-reddit"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Read Wayback Reddit Guide
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {faqEntries.map((entry) => (
            <article key={entry.question} className="rounded-lg border p-4">
              <h3 className="font-medium">{entry.question}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{entry.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Script
        id="reddit-search-guide-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </PageShell>
  );
}
