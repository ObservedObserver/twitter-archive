import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const canonical = `${SITE_URL}/deleted-instagram-posts`;
const title = "Deleted Instagram Posts Archive Search";
const description =
  "Check public Wayback Machine captures for deleted Instagram posts, profiles, and timestamps with Xarchive.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "how to see deleted instagram posts",
    "deleted instagram posts",
    "view deleted instagram posts",
    "instagram archive",
    "wayback machine instagram",
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

export default function DeletedInstagramPostsPage() {
  return (
    <SeoLandingPage
      title={title}
      subtitle={description}
      canonicalUrl={canonical}
      source="deleted-instagram-posts"
      tool="instagram"
      toolHref="/archive-instagram"
      toolLabel="Open Instagram Archive Tool"
      quickAnswer="To look for deleted Instagram posts, search the public Instagram username or URL in Xarchive, inspect Wayback Machine captures around the date you care about, and export the useful archive rows."
      steps={[
        "Start with the post URL if you have it, or use the Instagram username as a fallback.",
        "Run the Instagram archive lookup in Xarchive.",
        "Filter captures around the likely posting or deletion date.",
        "Open nearby Wayback timestamps and check whether the post or profile context rendered.",
        "Export verified rows in HTML, CSV, or JSON.",
      ]}
      sections={[
        {
          title: "Public Archive vs Instagram App Archive",
          body: "Xarchive is for public web archive captures. It is not the same as Instagram's private in-app Archive feature, and it cannot access private account data.",
        },
        {
          title: "Profile Captures Can Help",
          body: "If the exact post URL is unavailable, profile snapshots may still show context, captions, or links around the time period you are researching.",
        },
      ]}
      faqs={[
        {
          question: "Can I see deleted Instagram posts from private accounts?",
          answer: "No. Xarchive only searches public captures that were available to the Internet Archive.",
        },
        {
          question: "Why does a capture exist but not show the post?",
          answer: "Instagram rendering can vary across archive timestamps. Try nearby captures and preserve the exact timestamp you reviewed.",
        },
        {
          question: "Is this the same as unarchiving a post in Instagram?",
          answer: "No. This page is about public Wayback Machine captures, not Instagram's in-app archive controls.",
        },
      ]}
      relatedLinks={[
        {
          href: "/archive-instagram",
          label: "Instagram Archive Tool",
          description: "Search public Instagram archive captures.",
        },
        {
          href: "/guides/view-deleted-instagram-posts",
          label: "View Deleted Instagram Posts",
          description: "Detailed verification workflow for deleted post captures.",
        },
        {
          href: "/guides/instagram-archives",
          label: "Instagram Archive Guides",
          description: "Browse Instagram archive workflows and limitations.",
        },
      ]}
    />
  );
}

