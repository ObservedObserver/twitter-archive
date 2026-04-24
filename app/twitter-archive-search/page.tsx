import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const canonical = `${SITE_URL}/twitter-archive-search`;
const title = "Twitter Archive Search";
const description =
  "Search public Twitter and X archive captures by username, date range, and Wayback Machine timestamp with Xarchive.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "twitter archive search",
    "x archive search",
    "twitter archive viewer",
    "twitter history search",
    "old tweets archive",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description,
    url: canonical,
    siteName: SITE_NAME,
    type: "article",
  },
};

export default function TwitterArchiveSearchPage() {
  return (
    <SeoLandingPage
      title={title}
      subtitle={description}
      canonicalUrl={canonical}
      source="twitter-archive-search"
      tool="twitter"
      toolHref="/"
      toolLabel="Search Twitter Archives"
      quickAnswer="Use Xarchive when you need a practical Twitter archive search workflow: enter a username, choose a date range, inspect public Wayback captures, and export the rows that matter."
      steps={[
        "Enter a Twitter or X username without the @ symbol.",
        "Choose the archive date range you want to inspect.",
        "Use unique URL mode when you want a cleaner list of captures.",
        "Open archived URLs from the results table to verify the page content.",
        "Download HTML for review or CSV/JSON for structured analysis.",
      ]}
      sections={[
        {
          title: "Best Inputs",
          body: "Username searches are best for profile-level discovery. If you need to verify a specific deleted tweet, start from a direct tweet URL workflow in the deleted tweets guides.",
        },
        {
          title: "Search by Date Range",
          body: "Date filtering is useful when you know the event window. A narrow range reduces noisy captures and makes it easier to compare what changed over time.",
        },
      ]}
      faqs={[
        {
          question: "Does Xarchive store Twitter data itself?",
          answer: "No. Xarchive queries public Internet Archive CDX records and formats the results for review and export.",
        },
        {
          question: "Can I use this for X.com URLs?",
          answer: "Yes. Xarchive is built for Twitter/X archive workflows, but archive availability still depends on public captures.",
        },
        {
          question: "What export format should I use?",
          answer: "Use HTML for human review, CSV for spreadsheets, and JSON for developer or research workflows.",
        },
      ]}
      relatedLinks={[
        {
          href: "/deleted-tweets",
          label: "Deleted Tweets Archive Search",
          description: "Find and validate deleted tweet captures.",
        },
        {
          href: "/guides/wayback-twitter",
          label: "Wayback Twitter Guides",
          description: "Browse profile and Wayback Machine workflows.",
        },
        {
          href: "/guides/archived-tweets-viewer",
          label: "Archived Tweets Viewer",
          description: "Inspect archived tweet results with export-ready context.",
        },
      ]}
    />
  );
}

