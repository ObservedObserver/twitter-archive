import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const canonical = `${SITE_URL}/reddit-archive-deleted-posts`;
const title = "Reddit Archive Deleted Posts";
const description =
  "Check whether deleted Reddit posts or threads have public Wayback Machine captures and export the archive evidence.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "reddit archive deleted posts",
    "deleted reddit posts archive",
    "view deleted reddit posts",
    "reddit archive search",
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

export default function RedditArchiveDeletedPostsPage() {
  return (
    <SeoLandingPage
      title={title}
      subtitle={description}
      canonicalUrl={canonical}
      source="reddit-archive-deleted-posts"
      tool="reddit"
      toolHref="/archive-reddit"
      toolLabel="Search Reddit Captures"
      quickAnswer="To check a deleted Reddit post, search the direct Reddit URL in Xarchive, compare public Wayback timestamps around the deletion window, and export any captures that still show useful context."
      steps={[
        "Collect the direct Reddit post or comment URL when possible.",
        "Use direct URL mode in the Reddit archive tool.",
        "Set a date range before and after the suspected deletion.",
        "Open nearby captures and check whether title, body, comments, or media are visible.",
        "Export the capture rows that support your conclusion.",
      ]}
      sections={[
        {
          title: "Why Direct URLs Matter",
          body: "Deleted Reddit post searches are most reliable when the original URL is known. Subreddit searches can help discovery, but they usually produce a broader and noisier capture list.",
        },
        {
          title: "Evidence Quality",
          body: "A capture that only shows a deleted placeholder is weaker than a capture with title, body, comments, or metadata. Compare nearby timestamps before relying on one row.",
        },
      ]}
      faqs={[
        {
          question: "Can Xarchive show every deleted Reddit post?",
          answer: "No. It can only surface deleted posts that were publicly captured by the Internet Archive.",
        },
        {
          question: "Can I search by subreddit if I do not know the URL?",
          answer: "Yes, but expect broader results. A direct URL is better for verification.",
        },
        {
          question: "Does Xarchive bypass Reddit deletion?",
          answer: "No. Xarchive only searches public archive records that already exist.",
        },
      ]}
      relatedLinks={[
        {
          href: "/reddit-archive-search",
          label: "Reddit Archive Search",
          description: "Search archived Reddit pages by subreddit, user, or URL.",
        },
        {
          href: "/guides/archive-reddit-post",
          label: "Archive Reddit Post",
          description: "Workflow for capture, verification, and export.",
        },
        {
          href: "/guides/save-reddit-thread-offline",
          label: "Save Reddit Thread Offline",
          description: "Choose the right export format for a Reddit thread.",
        },
      ]}
    />
  );
}

