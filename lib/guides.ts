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

export const deletedTweetsGuideSlugs = [
  "see-deleted-tweets",
  "view-deleted-tweets",
  "search-deleted-tweets",
  "how-to-see-deleted-tweets",
  "find-deleted-tweets",
  "how-to-find-deleted-tweets",
  "find-deleted-twitter-posts",
  "twitter-archive-deleted-tweets",
  "archived-tweets-viewer",
  "archived-twitter-posts",
];

export const waybackTwitterGuideSlugs = [
  "wayback-machine-deleted-tweets",
  "wayback-machine-twitter-accounts",
  "how-to-use-wayback-machine-for-twitter",
];

const guideDefinitions: GuideDefinition[] = [
  {
    slug: "see-deleted-tweets",
    title: "See Deleted Tweets",
    description:
      "See deleted tweets quickly with Xarchive using Internet Archive CDX snapshot lookups.",
    intro:
      "This page is built for speed when you need a quick yes/no check on whether a deleted tweet was publicly archived.",
    quickAnswer:
      "Paste a tweet or profile URL into Xarchive, check Internet Archive CDX timestamps around the event window, then open captures to confirm.",
    steps: [
      "Paste the target tweet URL into Xarchive first; use profile URL as fallback.",
      "Set a date range that covers before and after the suspected deletion.",
      "Run search and review returned capture timestamps.",
      "Open the closest captures to verify tweet visibility.",
      "Export validated results in JSON, CSV, or HTML.",
    ],
    commonIssues: [
      {
        title: "No captures in the selected range",
        description:
          "Expand the date window. A crawl may have happened days before or after the expected time.",
      },
      {
        title: "Capture exists but tweet is not rendered",
        description:
          "Check nearby timestamps because capture completeness varies between snapshots.",
      },
      {
        title: "Uncertain source quality",
        description:
          "Keep the archive URL and exact timestamp with your notes for later verification.",
      },
    ],
    faq: [
      {
        question: "Can I see deleted tweets from any account?",
        answer:
          "Only if public snapshots were captured before deletion. Private or uncrawled pages will not appear.",
      },
      {
        question: "Is tweet URL always required?",
        answer:
          "No. Profile URLs can work, but direct tweet URLs usually produce cleaner results.",
      },
      {
        question: "Can I export a proof set?",
        answer:
          "Yes. Xarchive supports JSON, CSV, and HTML exports for documentation workflows.",
      },
    ],
    relatedSlugs: [
      "how-to-see-deleted-tweets",
      "view-deleted-tweets",
      "find-deleted-tweets",
      "search-deleted-tweets",
    ],
  },
  {
    slug: "view-deleted-tweets",
    title: "View Deleted Tweets",
    description:
      "Learn how to view deleted tweets by validating archived captures with Xarchive.",
    intro:
      "Viewing deleted tweets reliably is less about a single hit and more about validating nearby captures and timestamps.",
    quickAnswer:
      "To view deleted tweets, query CDX records in Xarchive, open captures nearest to the deletion window, and verify content across multiple timestamps.",
    steps: [
      "Start with the original tweet URL whenever possible.",
      "Run the query in Xarchive and sort captures by timestamp.",
      "Open at least two nearby captures for consistency checks.",
      "Note status changes before and after the deletion period.",
      "Export the final set for sharing or analysis.",
    ],
    commonIssues: [
      {
        title: "Only one capture is available",
        description:
          "Use profile-level captures to add context and avoid over-reliance on a single snapshot.",
      },
      {
        title: "Different content across captures",
        description:
          "Document both timestamps and prefer the snapshot closest to the event you are verifying.",
      },
      {
        title: "Timezone confusion",
        description:
          "Treat Wayback timestamps as UTC and convert explicitly in reports.",
      },
    ],
    faq: [
      {
        question: "What is the difference between see and view deleted tweets?",
        answer:
          "In practice they overlap, but this guide emphasizes verification across multiple captures before drawing conclusions.",
      },
      {
        question: "Can archived captures disappear later?",
        answer:
          "Archive availability can change, so keep timestamped URLs in your records.",
      },
      {
        question: "Is this suitable for compliance or legal teams?",
        answer:
          "It can support investigations, but teams should follow their own evidence and retention policies.",
      },
    ],
    relatedSlugs: [
      "see-deleted-tweets",
      "how-to-see-deleted-tweets",
      "how-to-find-deleted-tweets",
      "archived-tweets-viewer",
    ],
  },
  {
    slug: "wayback-machine-deleted-tweets",
    title: "Wayback Machine Deleted Tweets",
    description:
      "Use Wayback Machine deleted tweet captures through Xarchive with a repeatable verification flow.",
    intro:
      "If your workflow is Wayback-first, this guide maps directly from the query to validated deleted tweet evidence.",
    quickAnswer:
      "Search Wayback-indexed tweet/profile URLs via Xarchive, then confirm deleted tweet visibility by inspecting captures around the relevant dates.",
    steps: [
      "Collect tweet or profile URLs tied to the event.",
      "Run a CDX lookup in Xarchive for each target URL.",
      "Filter captures around the suspected deletion timeframe.",
      "Open captures in sequence to see when availability changed.",
      "Export and annotate timestamped evidence.",
    ],
    commonIssues: [
      {
        title: "Wayback has profile captures but not tweet captures",
        description:
          "Use profile timeline snapshots to reconstruct likely posting windows and linked tweet references.",
      },
      {
        title: "Large capture sets are hard to review",
        description:
          "Narrow by date and focus on captures nearest to the claimed deletion.",
      },
      {
        title: "Archived page loads slowly",
        description:
          "Try adjacent timestamps or reload; rendering stability can differ by capture.",
      },
    ],
    faq: [
      {
        question: "Does Xarchive store deleted tweets itself?",
        answer:
          "No. Xarchive queries Internet Archive CDX data and helps you inspect existing captures.",
      },
      {
        question: "Can I search by username only?",
        answer:
          "Yes, but URL-based inputs usually produce cleaner and faster verification.",
      },
      {
        question: "What should I cite in a report?",
        answer:
          "Cite the original URL, archive capture URL, and capture timestamp for each claim.",
      },
    ],
    relatedSlugs: [
      "twitter-archive-deleted-tweets",
      "how-to-see-deleted-tweets",
      "find-deleted-tweets",
      "archived-tweets-viewer",
    ],
  },
  {
    slug: "twitter-archive-deleted-account",
    title: "Twitter Archive Deleted Account",
    description:
      "Investigate deleted-account timelines with archived captures and profile snapshot workflows.",
    intro:
      "Deleted accounts are harder to reconstruct because tweet URLs may vanish from discovery paths. Profile snapshots are key.",
    quickAnswer:
      "For deleted accounts, start with profile URL captures in Xarchive, map timeline timestamps, then drill into referenced tweet URLs when available.",
    steps: [
      "Locate the canonical profile URL for the deleted account.",
      "Search the profile URL in Xarchive and collect capture timestamps.",
      "Open captures around important dates to map timeline changes.",
      "Extract and test any tweet URLs found within profile snapshots.",
      "Export your account timeline evidence in JSON, CSV, or HTML.",
    ],
    commonIssues: [
      {
        title: "No profile captures found",
        description:
          "Try alternate historical handles or old URL forms if the account changed usernames.",
      },
      {
        title: "Handles changed before deletion",
        description:
          "Search each known handle variation and compare timestamp overlap.",
      },
      {
        title: "Cannot recover complete timeline",
        description:
          "Document gaps clearly; archive coverage for deleted accounts is often partial.",
      },
    ],
    faq: [
      {
        question: "Can I recover every tweet from a deleted account?",
        answer:
          "No. Recovery depends on what was publicly crawled before deletion.",
      },
      {
        question: "Is profile snapshot analysis still useful?",
        answer:
          "Yes. Even partial profile captures can confirm activity windows and references.",
      },
      {
        question: "Which export is best for timeline work?",
        answer:
          "CSV is usually best for chronological review, with JSON for structured analysis.",
      },
    ],
    relatedSlugs: [
      "wayback-machine-deleted-tweets",
      "find-deleted-tweets",
      "how-to-find-deleted-tweets",
      "archived-tweets-viewer",
    ],
  },
  {
    slug: "find-deleted-twitter-posts",
    title: "Find Deleted Twitter Posts",
    description:
      "Find deleted Twitter posts with a URL-first workflow built on Internet Archive CDX captures.",
    intro:
      "Some searchers use tweet and post interchangeably. This guide targets that wording while keeping the workflow grounded in public archive evidence.",
    quickAnswer:
      "To find deleted Twitter posts, search the original tweet URL or profile URL in Xarchive, narrow the date window, then validate the closest archived captures.",
    steps: [
      "Collect the original tweet URL if available, and keep the profile URL as a fallback.",
      "Run the search in Xarchive to retrieve matching CDX rows.",
      "Filter by the likely posting and deletion dates to cut noise.",
      "Open the nearest captures and compare before-and-after visibility.",
      "Export the final evidence set in CSV, JSON, or HTML for review.",
    ],
    commonIssues: [
      {
        title: "Search intent is too broad",
        description:
          "Use a specific URL and time window. Generic profile searches create too many low-signal captures.",
      },
      {
        title: "Profile shows activity but the post is absent",
        description:
          "Keep the profile snapshot as context and try nearby captures for the direct tweet URL.",
      },
      {
        title: "Need a faster verification handoff",
        description:
          "HTML export is usually the quickest format for editors or investigators to review.",
      },
    ],
    faq: [
      {
        question: "Is a deleted Twitter post different from a deleted tweet here?",
        answer:
          "No. The workflow is the same; this page matches the alternative phrasing people search for.",
      },
      {
        question: "Can I search by date only?",
        answer:
          "Date filters help, but a tweet or profile URL is still the strongest starting point.",
      },
      {
        question: "What should I save for later verification?",
        answer:
          "Keep the original URL, archive URL, UTC timestamp, and exported result set together.",
      },
    ],
    relatedSlugs: [
      "find-deleted-tweets",
      "search-deleted-tweets",
      "archived-twitter-posts",
      "how-to-find-deleted-tweets",
    ],
  },
  {
    slug: "search-deleted-tweets",
    title: "Search Deleted Tweets",
    description:
      "Search deleted tweets with URL-first CDX queries, date filtering, and export-ready results.",
    intro:
      "This guide focuses on the search workflow itself so you can move from query to validated matches with minimal friction.",
    quickAnswer:
      "Search deleted tweets by querying tweet/profile URLs in Xarchive, narrowing by date, then validating top matches in archived captures.",
    steps: [
      "Prepare tweet URL, profile URL, or both as search inputs.",
      "Run the query in Xarchive and inspect returned rows.",
      "Apply date filters to isolate the relevant period.",
      "Open the top candidate captures and confirm tweet context.",
      "Export the final search result set for downstream use.",
    ],
    commonIssues: [
      {
        title: "Too many low-signal rows",
        description:
          "Prioritize rows nearest to your event date and de-emphasize distant captures.",
      },
      {
        title: "No direct tweet matches",
        description:
          "Search profile captures and trace linked tweets from those snapshots.",
      },
      {
        title: "Hard to share findings",
        description:
          "Use HTML export for quick review links and CSV/JSON for structured collaboration.",
      },
    ],
    faq: [
      {
        question: "What should I search first?",
        answer:
          "Use the direct tweet URL first, then fall back to profile URL if needed.",
      },
      {
        question: "Can this workflow support ongoing monitoring?",
        answer:
          "Yes. Save key URLs and rerun searches on a fixed cadence.",
      },
      {
        question: "Do I need Wayback expertise to use this?",
        answer:
          "No. Xarchive handles CDX query flow and keeps export options straightforward.",
      },
    ],
    relatedSlugs: [
      "see-deleted-tweets",
      "view-deleted-tweets",
      "find-deleted-tweets",
      "how-to-find-deleted-tweets",
    ],
  },
  {
    slug: "wayback-machine-twitter-accounts",
    title: "Wayback Machine Twitter Accounts",
    description:
      "Use Wayback Machine Twitter account snapshots to reconstruct profile activity and deleted-account history.",
    intro:
      "Account-level captures are often the best fallback when a direct tweet URL is missing. This page focuses on timeline reconstruction from profile snapshots.",
    quickAnswer:
      "Search the Twitter account URL in Xarchive, inspect profile captures across key dates, and extract referenced tweet URLs to verify deleted content.",
    steps: [
      "Start with the canonical profile URL and any known older handles.",
      "Run the account search in Xarchive and collect capture timestamps.",
      "Open snapshots around major events to map profile changes and visible posts.",
      "Follow linked tweet URLs from those snapshots when deeper verification is needed.",
      "Export the account timeline in CSV or JSON for structured analysis.",
    ],
    commonIssues: [
      {
        title: "The handle changed over time",
        description:
          "Search each known handle variant and merge the timeline using timestamps.",
      },
      {
        title: "Only sparse profile captures exist",
        description:
          "Use each capture as a waypoint. Even partial profile pages can confirm activity windows.",
      },
      {
        title: "Need to explain gaps in coverage",
        description:
          "State clearly that Internet Archive coverage depends on public crawls and may be incomplete.",
      },
    ],
    faq: [
      {
        question: "Can I recover every tweet from an archived account page?",
        answer:
          "No. Account snapshots help reconstruct history, but not every tweet will have been captured separately.",
      },
      {
        question: "Is this useful when the account was deleted?",
        answer:
          "Yes. Profile captures can still establish that the account existed and what was visible at certain times.",
      },
      {
        question: "Which export is best for account timelines?",
        answer:
          "CSV is best for sorting by time, while JSON works well for downstream tooling.",
      },
    ],
    relatedSlugs: [
      "twitter-archive-deleted-account",
      "wayback-machine-deleted-tweets",
      "how-to-use-wayback-machine-for-twitter",
      "archived-twitter-posts",
    ],
  },
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
  {
    slug: "archived-twitter-posts",
    title: "Archived Twitter Posts",
    description:
      "Review archived Twitter posts with a verification workflow for public Wayback captures.",
    intro:
      "This page covers a broader archive-review workflow when you need historical Twitter posts, not only confirmed deletions.",
    quickAnswer:
      "Archived Twitter posts can be reviewed by searching tweet or profile URLs in Xarchive, inspecting CDX timestamps, and exporting the captures that matter.",
    steps: [
      "Choose the tweet URL or account URL that best matches your research goal.",
      "Run the archive lookup in Xarchive and review the returned timestamps.",
      "Open representative captures to confirm the post text, media, and surrounding context.",
      "Flag captures tied to key events, edits, or deletions.",
      "Export the reviewed set for reporting, analysis, or handoff.",
    ],
    commonIssues: [
      {
        title: "The page is archived, but media is incomplete",
        description:
          "Treat the text and metadata as primary evidence and note missing assets separately.",
      },
      {
        title: "Too many snapshots for one URL",
        description:
          "Sample captures near important dates instead of reviewing every row.",
      },
      {
        title: "Need both context and structure",
        description:
          "Use HTML export for reviewers and JSON/CSV for structured analysis.",
      },
    ],
    faq: [
      {
        question: "Does this page only apply to deleted content?",
        answer:
          "No. It also covers historical post review when the goal is context, verification, or timeline analysis.",
      },
      {
        question: "What input works best for archived Twitter posts?",
        answer:
          "A direct tweet URL is still best, but profile URLs help when the exact post URL is missing.",
      },
      {
        question: "Can I use this for newsroom research?",
        answer:
          "Yes. The workflow is built for evidence capture, context review, and export.",
      },
    ],
    relatedSlugs: [
      "archived-tweets-viewer",
      "find-deleted-twitter-posts",
      "wayback-machine-twitter-accounts",
      "how-to-use-wayback-machine-for-twitter",
    ],
  },
  {
    slug: "how-to-use-wayback-machine-for-twitter",
    title: "How to Use Wayback Machine for Twitter",
    description:
      "Use Wayback Machine for Twitter research with a repeatable Xarchive workflow for profiles and tweets.",
    intro:
      "This guide is for users who understand Wayback Machine at a high level but need a practical Twitter-specific process.",
    quickAnswer:
      "Use Xarchive to query Internet Archive CDX records for Twitter URLs, focus on the right date range, and validate captures before exporting results.",
    steps: [
      "Decide whether you need a tweet-level lookup, profile-level lookup, or both.",
      "Paste the target Twitter URL into Xarchive and run the CDX search.",
      "Use date filters to narrow to the relevant activity window.",
      "Open the nearest captures and confirm what was publicly visible at that time.",
      "Export validated results and keep archive timestamps in UTC.",
    ],
    commonIssues: [
      {
        title: "Starting directly in raw Wayback is slow",
        description:
          "Use Xarchive first to surface the capture list, then open only the rows worth reviewing.",
      },
      {
        title: "Users mix profile and tweet evidence",
        description:
          "Keep profile timeline captures and direct tweet captures in separate notes so claims stay precise.",
      },
      {
        title: "Not sure what to cite",
        description:
          "Cite the original Twitter URL, the archive capture URL, and the capture timestamp together.",
      },
    ],
    faq: [
      {
        question: "Do I need to know the CDX API to use this workflow?",
        answer:
          "No. Xarchive handles the CDX lookup and presents the captures in a simpler interface.",
      },
      {
        question: "Can I use this for deleted tweets and deleted accounts?",
        answer:
          "Yes. The same process works for both, assuming public captures exist.",
      },
      {
        question: "What is the main limitation?",
        answer:
          "The archive only shows what was publicly crawled, so missing captures are a normal limitation.",
      },
    ],
    relatedSlugs: [
      "wayback-machine-deleted-tweets",
      "wayback-machine-twitter-accounts",
      "archived-twitter-posts",
      "find-deleted-tweets",
    ],
  },
];

const guideMap = new Map(guideDefinitions.map((guide) => [guide.slug, guide]));

export function getAllGuides(): GuideDefinition[] {
  return guideDefinitions;
}

export function getGuidesBySlugs(slugs: string[]): GuideDefinition[] {
  return slugs
    .map((slug) => guideMap.get(slug))
    .filter((guide): guide is GuideDefinition => Boolean(guide));
}

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guideMap.get(slug);
}

export function getRelatedGuides(guide: GuideDefinition): GuideDefinition[] {
  return guide.relatedSlugs
    .map((relatedSlug) => guideMap.get(relatedSlug))
    .filter((relatedGuide): relatedGuide is GuideDefinition => Boolean(relatedGuide));
}
