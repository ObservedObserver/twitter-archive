import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const canonical = `${SITE_URL}/reddit-archive-search`;
const title = "Reddit Archive Search";
const description =
  "Search Reddit archive captures by subreddit, user profile, or direct URL, then export public Wayback Machine results.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "reddit archive search",
    "reddit archive",
    "wayback reddit",
    "archive reddit post",
    "reddit thread archive",
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

export default function RedditArchiveSearchPage() {
  return (
    <SeoLandingPage
      title={title}
      subtitle={description}
      canonicalUrl={canonical}
      source="reddit-archive-search"
      tool="reddit"
      toolHref="/archive-reddit"
      toolLabel="Open Reddit Archive Tool"
      quickAnswer="Use Reddit archive search when you need to inspect public Wayback captures for a subreddit, Reddit user page, or exact post URL and export the matching timestamps."
      steps={[
        "Choose subreddit, user, or direct URL mode.",
        "Enter the target and choose the archive date range.",
        "Run the search to pull public Internet Archive CDX records.",
        "Open the archived Reddit URLs closest to the event you care about.",
        "Export the result set in HTML, CSV, or JSON.",
      ]}
      sections={[
        {
          title: "Subreddit, User, or URL",
          body: "Subreddit mode works for broad discovery, user mode helps with profile history, and direct URL mode is the cleanest option for verifying one Reddit post or comment thread.",
        },
        {
          title: "Offline Review",
          body: "When you need to hand off findings, HTML export is the fastest readable format. CSV and JSON are better when you want to filter, sort, or process rows later.",
        },
      ]}
      faqs={[
        {
          question: "Can Xarchive save a live Reddit thread?",
          answer: "No. Xarchive searches existing public archive captures. Use a live capture tool first when you need to save a page that has not been archived.",
        },
        {
          question: "Why are some Reddit comments missing?",
          answer: "Archive completeness depends on how the original capture was made and what the crawler could render at that timestamp.",
        },
        {
          question: "Which mode should I use first?",
          answer: "Use direct URL mode when you know the post URL. Use subreddit or user mode for discovery.",
        },
      ]}
      relatedLinks={[
        {
          href: "/archive-reddit",
          label: "Reddit Archive Tool",
          description: "Run subreddit, user, or direct URL archive searches.",
        },
        {
          href: "/reddit-archive-deleted-posts",
          label: "Reddit Archive Deleted Posts",
          description: "Verify whether a deleted Reddit post has public captures.",
        },
        {
          href: "/guides/reddit-archives",
          label: "Reddit Archive Guides",
          description: "Browse Reddit archive workflows and export guidance.",
        },
      ]}
    />
  );
}

