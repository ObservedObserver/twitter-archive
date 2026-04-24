import type { Metadata } from "next";
import Link from "next/link";

import { AdSlot } from "@/components/ad-slot";
import { PageShell } from "@/components/page-shell";
import {
  deletedTweetsGuideSlugs,
  getGuidesBySlugs,
  instagramGuideSlugs,
  waybackTwitterGuideSlugs,
} from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Twitter Archive Guides Library";
const pageDescription =
  "Browse Xarchive guides for deleted tweets, Wayback Machine Twitter research, and archive verification workflows.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
  openGraph: {
    title: `${pageTitle} | ${SITE_NAME}`,
    description: pageDescription,
    url: `${SITE_URL}/guides`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const sections = [
  {
    title: "Deleted Tweets",
    description:
      "Guides focused on finding, validating, and exporting deleted tweet captures from public archives.",
    href: "/guides/deleted-tweets",
    guides: getGuidesBySlugs(deletedTweetsGuideSlugs),
  },
  {
    title: "Instagram Archive",
    description:
      "Guides for Instagram profile history, deleted-post verification, and archive search workflows.",
    href: "/guides/instagram-archives",
    guides: getGuidesBySlugs(instagramGuideSlugs),
  },
  {
    title: "Wayback Twitter",
    description:
      "Guides for profile snapshots, archive navigation, and broader Twitter research in the Wayback Machine.",
    href: "/guides/wayback-twitter",
    guides: getGuidesBySlugs(waybackTwitterGuideSlugs),
  },
  {
    title: "Reddit Archive",
    description:
      "Guides for archived subreddit discovery, Reddit URL verification, and Wayback Machine Reddit research.",
    href: "/guides/reddit-archives",
    guides: [
      {
        slug: "how-to-search-reddit-archives",
        title: "How to Search Reddit Archives",
        description:
          "A practical workflow for subreddit, user, and direct-URL archive research.",
      },
      {
        slug: "wayback-machine-reddit",
        title: "Wayback Machine Reddit Guide",
        description:
          "Use the Wayback Machine for Reddit verification, review, and exported evidence capture.",
      },
      {
        slug: "archive-reddit-post",
        title: "Archive Reddit Post",
        description:
          "Capture, verify, and export archived Reddit posts with a cleaner workflow.",
      },
      {
        slug: "save-reddit-thread-offline",
        title: "Save Reddit Thread Offline",
        description:
          "Choose the right offline Reddit preservation path for readable review or structured export.",
      },
      {
        slug: "reddit-json-export",
        title: "Reddit JSON Export",
        description:
          "Use JSON export when you need structured Reddit archive data instead of just a visual copy.",
      },
    ],
  },
];

export default function GuidesIndexPage() {
  return (
    <PageShell
      title="Xarchive Guides"
      subtitle="Use this library to move from search intent to a concrete archive workflow."
    >
      <section className="space-y-3">
        <p className="text-muted-foreground">
          The guide library is organized by search intent. Start with deleted-tweet recovery if you need
          direct verification, use the Instagram cluster when the job is profile/post history, or use the Reddit cluster
          when you need subreddit, thread, or user-page archive workflows.
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

      <AdSlot label="Guides library content ad" />

      {sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="text-muted-foreground">{section.description}</p>
            <Link href={section.href} className="text-primary hover:underline">
              Open {section.title} Hub
            </Link>
          </div>
          <div className="space-y-3">
            {section.guides.map((guide) => (
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
      ))}

      <section className="space-y-3 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Use Cases</h2>
        <p className="text-sm text-muted-foreground">
          Need a role-specific workflow instead of a keyword guide? Start with our newsroom verification page.
        </p>
        <Link
          href="/use-cases/journalists-verify-deleted-statements"
          className="text-primary hover:underline"
        >
          Journalists: Verify Deleted Statements
        </Link>
      </section>
    </PageShell>
  );
}
