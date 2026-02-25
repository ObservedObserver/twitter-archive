export type GuideIssue = {
  title: string;
  description: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideDefinition = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  quickAnswer: string;
  steps: string[];
  commonIssues: GuideIssue[];
  faq: GuideFaq[];
  relatedSlugs: string[];
};

const guideDefinitions: GuideDefinition[] = [
  {
    slug: "how-to-see-deleted-tweets",
    title: "How to See Deleted Tweets",
    description:
      "Learn how to see deleted tweets using Internet Archive CDX snapshots with Xarchive.",
    intro:
      "Deleted tweets are often recoverable only if a public snapshot was captured before removal. This guide gives you a fast workflow to check those captures in Xarchive.",
    quickAnswer:
      "Use Xarchive to query Internet Archive CDX records for a tweet URL or profile URL, filter by date, and open saved snapshots that existed before deletion.",
    steps: [
      "Copy the tweet URL or profile URL you want to investigate.",
      "Open Xarchive Tool and paste the URL into the search field.",
      "Set a date range around when the post was likely live.",
      "Run the search and inspect returned snapshot timestamps.",
      "Open relevant captures and export matches in JSON, CSV, or HTML.",
    ],
    commonIssues: [
      {
        title: "No results returned",
        description:
          "The URL may never have been crawled, or your date range is too narrow. Expand the range and retry.",
      },
      {
        title: "Deleted account content is missing",
        description:
          "If the account was protected or removed before a crawl, snapshots may not exist in the index.",
      },
      {
        title: "Wrong URL format",
        description:
          "Use canonical Twitter/X URLs when possible so CDX lookup matches archived records consistently.",
      },
    ],
    faq: [
      {
        question: "Can I see every deleted tweet?",
        answer:
          "No. You can only view tweets that were captured by the archive before they were deleted.",
      },
      {
        question: "Do I need a Twitter login to search?",
        answer:
          "No login is required for Xarchive search because it reads archival index data, not your account data.",
      },
      {
        question: "Can I export the findings?",
        answer:
          "Yes. You can export search results as JSON, CSV, or HTML from the tool.",
      },
    ],
    relatedSlugs: [
      "find-deleted-tweets",
      "how-to-find-deleted-tweets",
      "twitter-archive-deleted-tweets",
      "archived-tweets-viewer",
    ],
  },
  {
    slug: "find-deleted-tweets",
    title: "Find Deleted Tweets",
    description:
      "Practical workflow to find deleted tweets from archived snapshots using Xarchive.",
    intro:
      "When a tweet disappears, archived captures are the fastest way to check if a public copy still exists. This page focuses on a search-first workflow.",
    quickAnswer:
      "To find deleted tweets, search the original URL or profile in Xarchive, narrow by date, then review and export matching Internet Archive CDX captures.",
    steps: [
      "Start with the most specific input you have: tweet URL first, profile URL second.",
      "Run search in Xarchive and sort captures by timestamp to identify pre-deletion copies.",
      "Use date filtering to isolate the target event window.",
      "Open snapshot links to confirm the post content and context.",
      "Export the verified capture set for documentation or further analysis.",
    ],
    commonIssues: [
      {
        title: "Only profile captures appear",
        description:
          "Try both tweet and profile URLs. A tweet URL may be absent while the profile timeline was archived.",
      },
      {
        title: "Too many irrelevant captures",
        description:
          "Use narrower date filters and prioritize captures closest to the alleged deletion time.",
      },
      {
        title: "Captured page but tweet not visible",
        description:
          "Archived rendering can vary. Check nearby timestamps and alternate captures from the same day.",
      },
    ],
    faq: [
      {
        question: "What is the best input for finding deleted tweets?",
        answer:
          "A direct tweet URL is best. If unavailable, a profile URL plus date range can still surface useful snapshots.",
      },
      {
        question: "How reliable are archived captures?",
        answer:
          "Reliability depends on crawl timing and page completeness, so validate across multiple close timestamps when possible.",
      },
      {
        question: "Can this help find tweets from someone else?",
        answer:
          "Yes, as long as public snapshots exist and the relevant URLs were captured by the archive.",
      },
    ],
    relatedSlugs: [
      "how-to-see-deleted-tweets",
      "how-to-find-deleted-tweets",
      "twitter-archive-deleted-tweets",
      "archived-tweets-viewer",
    ],
  },
  {
    slug: "how-to-find-deleted-tweets",
    title: "How to Find Deleted Tweets",
    description:
      "Step-by-step tutorial for finding deleted tweets with date filters, validation, and exports.",
    intro:
      "This walkthrough is designed for repeatable research. It emphasizes traceable steps so you can defend the result quality.",
    quickAnswer:
      "Find deleted tweets by combining URL-based lookup, precise date windows, and timestamp verification across multiple archive captures.",
    steps: [
      "Define the target: tweet, user profile, and suspected deletion timeframe.",
      "Search the target URL in Xarchive and capture all returned timestamps.",
      "Check nearest pre- and post-event captures for consistency.",
      "Validate the content in at least two captures when available.",
      "Export results and keep timestamps with source URLs in your report.",
    ],
    commonIssues: [
      {
        title: "Unclear deletion timeframe",
        description:
          "Start broad, then tighten date windows once you identify likely activity spikes in captures.",
      },
      {
        title: "Conflicting capture content",
        description:
          "Use the nearest timestamp to the event and document both states if the archive changed across captures.",
      },
      {
        title: "Missing original tweet URL",
        description:
          "Use profile captures and date-based navigation to recover references to missing direct links.",
      },
    ],
    faq: [
      {
        question: "Should I trust a single archive capture?",
        answer:
          "For higher confidence, compare nearby captures and keep original timestamps in your notes.",
      },
      {
        question: "Is this workflow useful for journalism and OSINT?",
        answer:
          "Yes. The method is designed for verification use cases where timing and provenance matter.",
      },
      {
        question: "What export format is best?",
        answer:
          "CSV is easiest for spreadsheets, JSON for engineering workflows, and HTML for quick sharing.",
      },
    ],
    relatedSlugs: [
      "how-to-see-deleted-tweets",
      "find-deleted-tweets",
      "twitter-archive-deleted-tweets",
      "archived-tweets-viewer",
    ],
  },
  {
    slug: "twitter-archive-deleted-tweets",
    title: "Twitter Archive Deleted Tweets Guide",
    description:
      "Use Twitter archive context plus Wayback captures to investigate deleted tweets.",
    intro:
      "People often conflate account exports with public web archives. This guide clarifies the difference and shows where Xarchive fits.",
    quickAnswer:
      "Account exports and public web archives are different sources; for public verification, use Internet Archive CDX captures and inspect historical snapshots.",
    steps: [
      "Identify whether you need personal export data or public archival evidence.",
      "For public evidence, search tweet/profile URLs in Xarchive.",
      "Filter by timeline to find captures before and after the deletion window.",
      "Open captures to confirm visibility and context of the tweet.",
      "Export the final evidence set in JSON, CSV, or HTML.",
    ],
    commonIssues: [
      {
        title: "Confusing personal archive vs public archive",
        description:
          "Twitter account exports include account-level data, while CDX captures reflect public pages crawled on the web.",
      },
      {
        title: "No CDX snapshot for target tweet",
        description:
          "If no public crawl occurred before deletion, recovery from public archives may be impossible.",
      },
      {
        title: "Timestamp interpretation errors",
        description:
          "Always reference snapshot timestamps in UTC and keep the original source URL in documentation.",
      },
    ],
    faq: [
      {
        question: "Is Xarchive the same as Twitter's official archive export?",
        answer:
          "No. Xarchive surfaces public web archive captures and does not replace account export files.",
      },
      {
        question: "Why do some deleted tweets still appear in archives?",
        answer:
          "Because archived copies can persist if the page was crawled before the tweet was removed.",
      },
      {
        question: "Can I cite these captures in reports?",
        answer:
          "Yes. Include source URL, capture timestamp, and notes about archival limitations.",
      },
    ],
    relatedSlugs: [
      "how-to-see-deleted-tweets",
      "find-deleted-tweets",
      "how-to-find-deleted-tweets",
      "archived-tweets-viewer",
    ],
  },
  {
    slug: "archived-tweets-viewer",
    title: "Archived Tweets Viewer",
    description:
      "Use Xarchive as an archived tweets viewer to search, preview, and export Wayback captures.",
    intro:
      "If you need a focused archived tweets viewer, this page covers how to retrieve and review captures quickly with minimal noise.",
    quickAnswer:
      "An archived tweets viewer works by querying CDX snapshot records, displaying historical captures, and letting you export validated matches.",
    steps: [
      "Paste a tweet or profile URL into Xarchive Viewer.",
      "Run the CDX lookup and scan returned timestamps.",
      "Preview captures to confirm tweet visibility and context.",
      "Bookmark important timestamps for your case notes.",
      "Export selected results in JSON, CSV, or HTML.",
    ],
    commonIssues: [
      {
        title: "Viewer returns captures but no useful content",
        description:
          "Try a nearby timestamp. Interface rendering can vary between captures.",
      },
      {
        title: "Need machine-readable output",
        description:
          "Use JSON export for automation and CSV for quick filtering in spreadsheet workflows.",
      },
      {
        title: "Uncertain if capture is authentic",
        description:
          "Verify the archive URL, timestamp, and target URL alignment before citing.",
      },
    ],
    faq: [
      {
        question: "What does an archived tweets viewer show?",
        answer:
          "It shows historical snapshot records and links to archived page captures for tweet/profile URLs.",
      },
      {
        question: "Can I use this for deleted accounts?",
        answer:
          "Sometimes. It depends on whether the account pages were publicly crawled before deletion.",
      },
      {
        question: "Does Xarchive support export formats?",
        answer:
          "Yes. You can export in JSON, CSV, and HTML.",
      },
    ],
    relatedSlugs: [
      "how-to-see-deleted-tweets",
      "find-deleted-tweets",
      "how-to-find-deleted-tweets",
      "twitter-archive-deleted-tweets",
    ],
  },
];

const guideMap = new Map(guideDefinitions.map((guide) => [guide.slug, guide]));

export function getAllGuides(): GuideDefinition[] {
  return guideDefinitions;
}

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guideMap.get(slug);
}

export function getRelatedGuides(guide: GuideDefinition): GuideDefinition[] {
  return guide.relatedSlugs
    .map((relatedSlug) => guideMap.get(relatedSlug))
    .filter((relatedGuide): relatedGuide is GuideDefinition => Boolean(relatedGuide));
}
