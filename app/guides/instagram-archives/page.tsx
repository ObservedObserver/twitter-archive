import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { getGuidesBySlugs, instagramGuideSlugs } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Instagram Archive Guides Hub";
const pageDescription =
  "Browse Xarchive guides for Instagram archive search, deleted-post verification, and Wayback Machine Instagram workflows.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/guides/instagram-archives`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/guides/instagram-archives`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function InstagramArchivesGuidesHubPage() {
  const guides = getGuidesBySlugs(instagramGuideSlugs);

  return (
    <PageShell
      title="Instagram Archive Guides"
      subtitle="Start here for Instagram profile history, deleted-post verification, and repeatable archive workflows."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          This hub groups the Instagram archive workflows that now support the site&apos;s second-largest traffic segment.
          Each page is written to answer the query quickly, push readers into the Instagram archive tool, and route them to
          the next relevant workflow instead of ending in a single-page session.
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
          ). Results depend on what was publicly crawled and preserved.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Top Instagram Workflows</h2>
        <div className="space-y-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="rounded-lg border p-4">
              <h3 className="font-medium">
                <Link href={`/guides/${guide.slug}`} className="text-primary hover:underline">
                  {guide.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{guide.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Start Here</h2>
        <p className="text-sm text-muted-foreground">
          Use the Instagram archive tool when you already have a username or URL. Use the guides when you need a repeatable
          workflow, stronger verification language, or a cleaner handoff path.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/archive-instagram"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open Instagram Archive Tool
          </Link>
          <Link
            href="/guides"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Browse All Guides
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
