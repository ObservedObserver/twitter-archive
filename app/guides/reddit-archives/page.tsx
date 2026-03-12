import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Reddit Archive Guides Hub";
const pageDescription =
  "Browse Xarchive guides for searching Reddit archives, using the Wayback Machine for Reddit, and exporting Reddit captures.";

const guides = [
  {
    href: "/guides/how-to-search-reddit-archives",
    title: "How to Search Reddit Archives",
    description:
      "A practical workflow for finding archived Reddit posts, comments, and community pages with Xarchive.",
  },
  {
    href: "/guides/wayback-machine-reddit",
    title: "Wayback Machine Reddit Guide",
    description:
      "Use the Wayback Machine for Reddit verification, timeline review, and exported evidence capture.",
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/guides/reddit-archives`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/guides/reddit-archives`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function RedditArchivesGuidesHubPage() {
  return (
    <PageShell
      title="Reddit Archive Guides"
      subtitle="Start here for subreddit, user, and direct-URL archive workflows built on public Wayback Machine captures."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          This hub groups Reddit-specific workflows for archive research. Each page is written to support both
          search-driven SEO entry points and direct tool conversion into the Reddit archive explorer.
        </p>
        <p className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Data source:</span> Internet Archive CDX index (
          <a
            href="https://web.archive.org/cdx/search/cdx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://web.archive.org/cdx/search/cdx
          </a>
          ).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Published Guides</h2>
        <div className="space-y-3">
          {guides.map((guide) => (
            <article key={guide.href} className="rounded-lg border p-4">
              <h3 className="font-medium">
                <Link href={guide.href} className="text-primary hover:underline">
                  {guide.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{guide.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Next Step</h2>
        <p className="text-muted-foreground">
          Ready to search live captures? Open the Reddit archive tool and run the workflow against a subreddit, user, or exact URL.
        </p>
        <Link href="/archive-reddit" className="text-primary hover:underline">
          Open Reddit Archive Tool
        </Link>
      </section>
    </PageShell>
  );
}
