import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { getAllGuides } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Deleted Tweets Guides Hub";
const pageDescription =
  "Browse Xarchive guides for finding, viewing, and exporting deleted tweet captures from Internet Archive CDX data.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/guides/deleted-tweets`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/guides/deleted-tweets`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function DeletedTweetsGuidesHubPage() {
  const guides = getAllGuides();

  return (
    <PageShell
      title="Deleted Tweets Guides"
      subtitle="Start here for practical workflows to search archived tweets and verify deletions."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          This hub groups Xarchive guides for deleted tweet research. Each page includes a direct tool
          CTA, export workflow, and a data source disclosure.
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
          ).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Published Guides (Week 1)</h2>
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
          Run searches directly in the tool and export findings for analysis or reporting.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Open Xarchive Tool
        </Link>
      </section>
    </PageShell>
  );
}
