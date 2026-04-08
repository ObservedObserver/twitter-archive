import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import ArchiveInstagramTool from "@/components/archive-instagram-tool";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const pageTitle = "Free Instagram Archive Viewer & Downloader | Xarchive";
const pageDescription =
  "Explore and download Instagram archive snapshots instantly. Xarchive lets you search, preview, and export Instagram data saved on the Wayback Machine in HTML, CSV, or JSON formats.";

const bestUseCases = [
  {
    title: "Deleted post verification",
    description: "Check whether a public Instagram post was captured before it disappeared.",
    href: "/guides/view-deleted-instagram-posts",
  },
  {
    title: "Profile history review",
    description: "Map older profile and post history with archive timestamps instead of browsing captures manually.",
    href: "/guides/find-old-instagram-posts",
  },
  {
    title: "Wayback workflow",
    description: "Use a repeatable Instagram archive method when a simple one-off lookup is not enough.",
    href: "/guides/wayback-machine-instagram",
  },
];

const topInstagramGuides = [
  {
    href: "/guides/how-to-search-instagram-archives",
    title: "How to Search Instagram Archives",
    description: "Best starting point for username and direct-URL Instagram archive lookups.",
  },
  {
    href: "/guides/view-deleted-instagram-posts",
    title: "View Deleted Instagram Posts",
    description: "Verification flow for deleted post checks and timestamp comparison.",
  },
  {
    href: "/guides/archive-instagram-posts",
    title: "Archive Instagram Posts",
    description: "Live capture plus archive lookup workflow for preserved Instagram pages.",
  },
];

const faqEntries = [
  {
    question: "What is the Xarchive Instagram archive explorer?",
    answer:
      "Xarchive lets you search the Instagram archive via the Wayback Machine, preview snapshots, and export the results in HTML, CSV, or JSON.",
  },
  {
    question: "How do I download posts from the Instagram archive?",
    answer:
      "Enter an Instagram username and select your desired snapshot range. The tool gathers archived data and lets you download it in multiple formats.",
  },
  {
    question: "How to archive Instagram posts?",
    answer:
      "To archive Instagram posts, you can use the Wayback Machine's 'Save Page Now' feature at web.archive.org/save. Simply paste the Instagram post URL and it will be saved to the Internet Archive. You can also use browser extensions like 'Wayback Machine' to quickly save pages. Once archived, you can search for them using Xarchive by entering the username.",
  },
  {
    question: "Is the Instagram archive data sourced from Wayback Machine snapshots?",
    answer:
      "Yes. Xarchive fetches CDX records from the Internet Archive's Wayback Machine to surface historical Instagram snapshots you can analyze or export.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Xarchive Instagram Archive Explorer",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: `${SITE_URL}/archive-instagram`,
  description: pageDescription,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to search Instagram archives with Xarchive",
  description:
    "Search public Wayback Machine captures for Instagram usernames and URLs, validate the best timestamps, and export the results.",
  totalTime: "PT5M",
  tool: [
    {
      "@type": "HowToTool",
      name: "Xarchive Instagram Archive Explorer",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Choose the target",
      text: "Start with a post URL when you have it, or use a username or profile URL for broader archive history.",
      url: `${SITE_URL}/archive-instagram`,
    },
    {
      "@type": "HowToStep",
      name: "Search the archive",
      text: "Run the query in Xarchive to surface matching Wayback Machine CDX records for the Instagram target.",
      url: `${SITE_URL}/archive-instagram`,
    },
    {
      "@type": "HowToStep",
      name: "Filter by date",
      text: "Use the date filters to narrow the result set to the period that matters.",
      url: `${SITE_URL}/archive-instagram`,
    },
    {
      "@type": "HowToStep",
      name: "Compare nearby captures",
      text: "Open the archive timestamps closest to the event and compare nearby captures before citing them.",
      url: `${SITE_URL}/archive-instagram`,
    },
    {
      "@type": "HowToStep",
      name: "Export the archive set",
      text: "Export the validated Instagram archive results in HTML, CSV, or JSON.",
      url: `${SITE_URL}/archive-instagram`,
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Instagram Archive",
      item: `${SITE_URL}/archive-instagram`,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "instagram archive",
    "instagram archive viewer",
    "wayback machine instagram",
    "view deleted instagram posts",
    "instagram archive downloader",
  ],
  alternates: {
    canonical: `${SITE_URL}/archive-instagram`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/archive-instagram`,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function InstagramArchivePage() {
  return (
    <main className="font-sans flex min-h-screen w-full flex-col">
      {/* Hero Section — desktop only */}
      <section className="relative hidden w-full overflow-hidden md:block" style={{ maxHeight: "75vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/insarchive-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-52 lg:pb-64 xl:pb-80">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 drop-shadow-lg sm:text-5xl">
            Instagram Archive Explorer
          </h1>
          <p className="mt-4 text-lg text-black/70 drop-shadow-md">
            Discover, preview, and export Instagram archive snapshots from Xarchive.net in seconds.
          </p>
          <p className="mt-2 text-sm text-black/70 drop-shadow">
            Search Wayback Machine CDX data for Instagram posts and download results in HTML, CSV, and JSON.
          </p>
        </div>
      </section>

      {/* Mobile header — shown only on small screens */}
      <div className="flex flex-col gap-2 text-center px-4 pt-10 pb-4 md:hidden">
        <h1 className="text-3xl font-semibold">Instagram Archive Explorer – View and Export Saved Posts</h1>
        <p className="text-muted-foreground">
          Discover, preview, and export Instagram archive snapshots from Xarchive.net in seconds.
        </p>
        <p className="text-sm text-muted-foreground">
          Search Wayback Machine CDX data for Instagram posts and download results in HTML, CSV, and JSON.
        </p>
      </div>

      {/* Content section — tool card overlaps the hero on desktop */}
      <section className="relative bg-background flex-1">
        <div className="mx-auto max-w-3xl px-4 md:-mt-32 lg:-mt-48 xl:-mt-64 relative z-10">
          <ArchiveInstagramTool />
        </div>

        <div className="mx-auto max-w-5xl px-4 pt-16 pb-16 flex flex-col gap-10">
          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Start Here</h2>
            <p className="text-muted-foreground">
              Use the tool when you already have a username or direct Instagram URL. Use the guide cluster when you need a repeatable
              workflow for deleted posts, older profile history, or a cleaner team handoff.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/instagram-archives"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Browse Instagram Guides
              </Link>
              <Link
                href="/guides/how-to-search-instagram-archives"
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Start with Search Workflow
              </Link>
            </div>
          </section>

          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Best Use Cases</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {bestUseCases.map((item) => (
                <Link key={item.title} href={item.href} className="rounded-lg border p-4 hover:bg-muted/40">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Also Research Twitter Archives?</h2>
            <p className="text-muted-foreground">
              This Instagram page is already one of the site&apos;s strongest entry points. If the visitor also
              needs Twitter investigation workflows, route them deeper instead of ending at a single tool session.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Browse Twitter Guides
              </Link>
              <Link
                href="/guides/how-to-use-wayback-machine-for-twitter"
                className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Wayback Twitter Workflow
              </Link>
            </div>
          </section>

          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Top Related Guides</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {topInstagramGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="rounded-lg border p-4 hover:bg-muted/40">
                  <h3 className="font-medium">{guide.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{guide.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How to Search Instagram Archives</h2>
            <p className="text-muted-foreground">
              Searching through Instagram archive data is simple with Xarchive. Enter any Instagram username in the search box above, and our tool will scan the Wayback Machine for all available snapshots. You can filter results by date range to find specific Instagram archive entries from any time period, making it easy to recover historical posts, stories, and profiles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Download Instagram Archive Snapshots</h2>
            <p className="text-muted-foreground">
              Once you&apos;ve found the Instagram archive snapshots you need, Xarchive allows you to download them in multiple formats. Export your Instagram archive data as HTML for easy viewing, CSV for spreadsheet analysis, or JSON for developers and researchers. All Instagram archive downloads include timestamps, URLs, and complete snapshot metadata from the Internet Archive.
            </p>
          </section>

          <section className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Try our <Link href="/archive-instagram" className="text-primary hover:underline">Instagram Archive tool</Link>, the{" "}
              <Link href="/" className="text-primary hover:underline">Twitter Archive version</Link>, or the{" "}
              <Link href="/archive-reddit" className="text-primary hover:underline">Reddit Archive version</Link>.
            </p>
            <p className="text-sm text-muted-foreground">
              Need Twitter-specific workflows? Start with the{" "}
              <Link href="/guides" className="text-primary hover:underline">
                Guides Library
              </Link>
              .
            </p>
          </section>

          <section className="space-y-6" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-semibold text-center">Wayback Machine Instagram Archive FAQ</h2>
            <div className="space-y-4">
              {faqEntries.map((entry) => (
                <article key={entry.question} className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">{entry.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{entry.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="instagram-app-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <Script
        id="instagram-howto-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Script
        id="instagram-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
