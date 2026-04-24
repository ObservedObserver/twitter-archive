import type { Metadata } from "next";
import Link from "next/link";

import { AdSlot } from "@/components/ad-slot";
import { PageShell } from "@/components/page-shell";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Journalists: Verify Deleted Statements";
const pageDescription =
  "A newsroom workflow for finding archived Twitter evidence, validating deleted statements, and exporting results from Xarchive.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/use-cases/journalists-verify-deleted-statements`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/use-cases/journalists-verify-deleted-statements`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const steps = [
  "Collect the direct tweet URL, profile URL, and the reporting window you need to verify.",
  "Run the URL search in Xarchive and narrow captures to the dates around the statement.",
  "Open the nearest captures before and after the claimed deletion or edit.",
  "Record the archive URL, UTC timestamp, and any visible context such as replies, media, or profile bio.",
  "Export the result set in HTML for editors and CSV or JSON for structured fact-checking notes.",
];

const checks = [
  {
    title: "A single capture is not enough",
    description:
      "Compare nearby timestamps when possible. Newsroom verification is stronger when you can show continuity across captures.",
  },
  {
    title: "Profile captures can add context",
    description:
      "If the direct tweet URL is missing, profile snapshots may still confirm the statement, timeline position, or linked content.",
  },
  {
    title: "Archive gaps should be stated explicitly",
    description:
      "Internet Archive coverage depends on public crawls. Absence of a capture is not proof that a post never existed.",
  },
];

export default function JournalistsVerifyDeletedStatementsPage() {
  return (
    <PageShell
      title="Journalists: Verify Deleted Statements"
      subtitle="A practical workflow for newsroom teams that need defensible archived evidence from public Twitter captures."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          This use case is designed for reporters, editors, and fact-checkers. The goal is not just to
          find a deleted tweet, but to create an evidence trail that survives review and handoff.
        </p>
        <p className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Quick answer:</span> Use Xarchive to query
          Internet Archive CDX records, compare captures around the reporting window, and export the verified set with timestamps.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">30-Second Workflow</h2>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Verification Checks</h2>
        <div className="space-y-3">
          {checks.map((check) => (
            <article key={check.title} className="rounded-lg border p-4">
              <h3 className="font-medium">{check.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{check.description}</p>
            </article>
          ))}
        </div>
      </section>

      <AdSlot label="Journalist verification content ad" />

      <section className="space-y-3 rounded-lg border bg-muted/20 p-4">
        <h2 className="text-xl font-semibold">Data Source and Limitations</h2>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Data source:</span> Internet Archive CDX
          index (
          <a
            href="https://web.archive.org/cdx/search/cdx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://web.archive.org/cdx/search/cdx
          </a>
          ). Results only reflect publicly archived captures and may be incomplete.
        </p>
      </section>

      <section className="space-y-4 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Run This in Xarchive</h2>
        <p className="text-sm text-muted-foreground">
          Search captures, verify timestamps, and export the final evidence set in one workflow.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open Xarchive Tool
          </Link>
          <Link
            href="/guides/find-deleted-twitter-posts"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Read Related Guide
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Related Pages</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <Link href="/guides/find-deleted-twitter-posts" className="text-primary hover:underline">
              Find Deleted Twitter Posts
            </Link>
          </li>
          <li>
            <Link href="/guides/how-to-use-wayback-machine-for-twitter" className="text-primary hover:underline">
              How to Use Wayback Machine for Twitter
            </Link>
          </li>
          <li>
            <Link href="/guides/deleted-tweets" className="text-primary hover:underline">
              Deleted Tweets Guides Hub
            </Link>
          </li>
        </ul>
      </section>
    </PageShell>
  );
}
