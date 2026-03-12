import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { PageShell } from "@/components/page-shell";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Wayback Machine Reddit Guide";
const pageDescription =
  "Use the Wayback Machine for Reddit research with a workflow for archived subreddits, users, posts, and comments.";

const faqEntries = [
  {
    question: "Can Wayback Machine show deleted Reddit posts?",
    answer:
      "Sometimes. It depends on whether the post or its parent page was captured publicly before deletion.",
  },
  {
    question: "Should I search subreddit or direct URL first?",
    answer:
      "Use a direct URL first when you have it. Use subreddit mode when you need discovery or context around a community.",
  },
  {
    question: "What should I cite from a Reddit archive capture?",
    answer:
      "Keep the original Reddit URL, archive capture URL, and archived timestamp together for later verification.",
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
    canonical: `${SITE_URL}/guides/wayback-machine-reddit`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/guides/wayback-machine-reddit`,
    siteName: SITE_NAME,
    type: "article",
  },
};

export default function WaybackMachineRedditGuidePage() {
  return (
    <PageShell
      title="Wayback Machine Reddit Guide"
      subtitle="A repeatable Reddit verification workflow for public archive captures from the Internet Archive."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          Reddit research in the Wayback Machine becomes much easier when you split the job into discovery, verification,
          and export. Xarchive handles the CDX lookup and gives you a cleaner review surface for those archived captures.
        </p>
        <p className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Quick answer:</span> Search the relevant subreddit, user, or Reddit
          URL in Xarchive, inspect the nearest archive timestamps, and export the captures that support your verification task.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Workflow</h2>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>Collect the subreddit name, Reddit username, or direct URL tied to the event you are researching.</li>
          <li>Run the target in the Reddit archive tool and apply date filters around the event window.</li>
          <li>Inspect the returned capture rows and open the archive URLs nearest to the relevant date.</li>
          <li>Save the original URL, archive URL, and timestamp for every claim you want to preserve.</li>
          <li>Export the final evidence set in the format that fits your reporting or analysis workflow.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What to Watch For</h2>
        <div className="space-y-3">
          <article className="rounded-lg border p-4">
            <h3 className="font-medium">Deleted content may survive indirectly</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Even when a direct Reddit URL is missing, subreddit or user captures can still preserve useful context about the missing content.
            </p>
          </article>
          <article className="rounded-lg border p-4">
            <h3 className="font-medium">Coverage is uneven across time</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Large, active communities tend to have better archive coverage than niche subreddits or low-visibility user pages.
            </p>
          </article>
          <article className="rounded-lg border p-4">
            <h3 className="font-medium">Direct URLs are still strongest</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              When you already know the exact Reddit post or comment URL, direct-URL mode usually produces the cleanest evidence path.
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
          ). Archive availability depends on public crawls and may not represent complete Reddit history.
        </p>
      </section>

      <section className="space-y-4 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Run This in Xarchive</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/archive-reddit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open Reddit Archive Tool
          </Link>
          <Link
            href="/guides/reddit-archives"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Browse Reddit Guides Hub
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
        id="wayback-reddit-guide-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </PageShell>
  );
}
