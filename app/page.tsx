import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import ArchiveTool from "@/components/archive-tool";

const pageTitle = "Free Twitter Archive Viewer & Downloader | Xarchive";
const pageDescription =
  "Explore and download Twitter archive snapshots instantly. Xarchive lets you search, preview, and export Twitter data saved on the Wayback Machine in HTML, CSV, or JSON formats.";

const faqEntries = [
  {
    question: "What is the Xarchive Twitter archive explorer?",
    answer:
      "Xarchive lets you search the Twitter archive via the Wayback Machine, preview snapshots, and export the results in HTML, CSV, or JSON.",
  },
  {
    question: "How do I download tweets from the Twitter archive?",
    answer:
      "Enter a tweet or profile URL and select your desired snapshot range. The tool gathers archived data and lets you download it in multiple formats.",
  },
  {
    question: "Is the Twitter archive data sourced from Wayback Machine snapshots?",
    answer:
      "Yes. Xarchive fetches CDX records from the Internet Archive's Wayback Machine to surface historical Twitter snapshots you can analyze or export.",
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

export const metadata: Metadata = {
  metadataBase: new URL("https://xarchive.net"),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "https://xarchive.net",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://xarchive.net",
    siteName: "Xarchive",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="font-sans flex min-h-screen w-full flex-col">
      {/* Hero Section — desktop only */}
      <section className="relative hidden w-full overflow-hidden md:block" style={{ maxHeight: "75vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/xarchive-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-52 lg:pb-64 xl:pb-80">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 drop-shadow-lg sm:text-5xl">
            Twitter Archive Explorer
          </h1>
          <p className="mt-4 text-lg text-black/70 drop-shadow-md">
            Discover, preview, and export Twitter archive snapshots from Xarchive.net in seconds.
          </p>
          <p className="mt-2 text-sm text-black/70 drop-shadow">
            Search Wayback Machine CDX data for tweets and download results in HTML, CSV, and JSON.
          </p>
        </div>
      </section>

      {/* Mobile header — shown only on small screens */}
      <div className="flex flex-col gap-2 text-center px-4 pt-10 pb-4 md:hidden">
        <h1 className="text-3xl font-semibold">Twitter Archive Explorer – View and Export Saved Tweets</h1>
        <p className="text-muted-foreground">
          Discover, preview, and export Twitter archive snapshots from Xarchive.net in seconds.
        </p>
        <p className="text-sm text-muted-foreground">
          Search Wayback Machine CDX data for tweets and download results in HTML, CSV, and JSON.
        </p>
      </div>

      {/* Content section — tool card overlaps the hero on desktop */}
      <section className="relative bg-background flex-1">
        <div className="mx-auto max-w-3xl px-4 md:-mt-32 lg:-mt-48 xl:-mt-64 relative z-10">
          <ArchiveTool />
        </div>

        <div className="mx-auto max-w-5xl px-4 pt-16 pb-16 flex flex-col gap-10">
          <section className="space-y-4 rounded-lg border p-5">
            <h2 className="text-2xl font-semibold">Start With a Proven Workflow</h2>
            <p className="text-muted-foreground">
              Most visits currently land on the tool first. If you also need a repeatable method, jump straight
              into one of the archive workflows below.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <Link href="/guides/find-deleted-tweets" className="rounded-lg border p-4 hover:bg-muted/40">
                <h3 className="font-medium">Find Deleted Tweets</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  URL-first workflow for deleted tweet recovery and validation.
                </p>
              </Link>
              <Link
                href="/guides/how-to-use-wayback-machine-for-twitter"
                className="rounded-lg border p-4 hover:bg-muted/40"
              >
                <h3 className="font-medium">Use Wayback for Twitter</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Best starting point for profile history and archive navigation.
                </p>
              </Link>
              <Link
                href="/use-cases/journalists-verify-deleted-statements"
                className="rounded-lg border p-4 hover:bg-muted/40"
              >
                <h3 className="font-medium">Journalist Verification</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Evidence workflow for editors, reporters, and fact-checkers.
                </p>
              </Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">How to Search Twitter Archives</h2>
            <p className="text-muted-foreground">
              Searching through Twitter archive data is simple with Xarchive. Enter any tweet URL or Twitter profile link in the search box above, and our tool will scan the Wayback Machine for all available snapshots. You can filter results by date range to find specific Twitter archive entries from any time period, making it easy to recover historical tweets and conversations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Download Twitter Archive Snapshots</h2>
            <p className="text-muted-foreground">
              Once you&apos;ve found the Twitter archive snapshots you need, Xarchive allows you to download them in multiple formats. Export your Twitter archive data as HTML for easy viewing, CSV for spreadsheet analysis, or JSON for developers and researchers. All Twitter archive downloads include timestamps, URLs, and complete snapshot metadata from the Internet Archive.
            </p>
          </section>

          <section className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Try our <Link href="/" className="text-primary hover:underline">Twitter Archive tool</Link>, the{" "}
              <Link href="/archive-reddit" className="text-primary hover:underline">Reddit Archive version</Link>, or the{" "}
              <Link href="/archive-instagram" className="text-primary hover:underline">Instagram Archive version</Link>.
            </p>
            <p className="text-sm text-muted-foreground">
              Need workflows? Browse the{" "}
              <Link href="/guides" className="text-primary hover:underline">
                Guides Library
              </Link>
              , the{" "}
              <Link href="/guides/deleted-tweets" className="text-primary hover:underline">
                Deleted Tweets hub
              </Link>
              , or the{" "}
              <Link
                href="/use-cases/journalists-verify-deleted-statements"
                className="text-primary hover:underline"
              >
                newsroom verification page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-6" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-semibold text-center">Wayback Machine Twitter Archive FAQ</h2>
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
    </main>
  );
}
