import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const canonical = `${SITE_URL}/deleted-tweets`;
const title = "Deleted Tweets Archive Search";
const description =
  "Find deleted tweets in public Wayback Machine captures, compare archive timestamps, and export verified results with Xarchive.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "deleted tweets",
    "how to see deleted tweets",
    "view deleted tweets",
    "find deleted tweets",
    "deleted tweets archive",
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

export default function DeletedTweetsPage() {
  return (
    <SeoLandingPage
      title={title}
      subtitle={description}
      canonicalUrl={canonical}
      source="deleted-tweets"
      tool="twitter"
      toolHref="/"
      toolLabel="Open Twitter Archive Tool"
      quickAnswer="To see whether a deleted tweet was publicly archived, search the tweet URL or profile in Xarchive, narrow the date range around the event, then open nearby Wayback captures before exporting the useful timestamps."
      steps={[
        "Start with the direct tweet URL when you have it, or use the profile username as a fallback.",
        "Run a public archive lookup in Xarchive.",
        "Filter captures around the likely posting, deletion, or news event window.",
        "Open the closest Wayback timestamps and compare more than one capture when possible.",
        "Export the confirmed rows in HTML, CSV, or JSON.",
      ]}
      sections={[
        {
          title: "When Deleted Tweets Can Be Found",
          body: "Deleted tweets can only be reviewed when a public crawler saved the tweet or profile before it disappeared. Direct tweet URLs usually produce cleaner evidence than broad profile searches, but profile captures can still help when the exact URL is missing.",
        },
        {
          title: "What to Save",
          body: "Keep the original URL, archived URL, UTC timestamp, visible text, and export file together. That makes the archive result easier to cite, share, or re-check later.",
        },
      ]}
      faqs={[
        {
          question: "Can Xarchive recover any deleted tweet?",
          answer: "No. Xarchive searches public Wayback Machine records. Private, uncrawled, or blocked pages will not appear.",
        },
        {
          question: "Is absence of a capture proof that a tweet never existed?",
          answer: "No. It only means Xarchive did not find a matching public archive capture for the selected target and date range.",
        },
        {
          question: "Should I search by username or tweet URL?",
          answer: "Use the tweet URL first. Use username or profile searches when the exact URL is unavailable.",
        },
      ]}
      relatedLinks={[
        {
          href: "/guides/how-to-see-deleted-tweets",
          label: "How to See Deleted Tweets",
          description: "Step-by-step deleted tweet lookup workflow.",
        },
        {
          href: "/guides/wayback-machine-deleted-tweets",
          label: "Wayback Machine Deleted Tweets",
          description: "Use Wayback timestamps to verify deleted tweet captures.",
        },
        {
          href: "/guides/deleted-tweets",
          label: "Deleted Tweets Guides Hub",
          description: "Browse the full deleted tweets guide cluster.",
        },
      ]}
    />
  );
}

