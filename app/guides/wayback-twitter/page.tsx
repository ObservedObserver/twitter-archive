import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { getGuidesBySlugs, waybackTwitterGuideSlugs } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Wayback Twitter Guides Hub";
const pageDescription =
  "Browse Xarchive guides for using Wayback Machine with Twitter profiles, accounts, and archived posts.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/guides/wayback-twitter`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/guides/wayback-twitter`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function WaybackTwitterGuidesHubPage() {
  const guides = getGuidesBySlugs(waybackTwitterGuideSlugs);

  return (
    <PageShell
      title="Wayback Twitter Guides"
      subtitle="Use these workflows when profile history, account snapshots, and archive navigation matter more than a single tweet lookup."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          This hub groups guides for broader Wayback Machine Twitter research. It is the best starting
          point when you are mapping account history, navigating profile captures, or teaching a repeatable archive workflow.
        </p>
        <p className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
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
          ). Results depend on what was publicly crawled.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Published Guides</h2>
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

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Next Step</h2>
        <p className="text-muted-foreground">
          For direct deleted-tweet recovery, switch back to the deleted tweets cluster or run your search in the tool.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/guides/deleted-tweets" className="text-primary hover:underline">
            Browse Deleted Tweets Guides
          </Link>
          <Link href="/" className="text-primary hover:underline">
            Open Xarchive Tool
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
