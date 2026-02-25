import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import ArchiveInstagramTool from "@/components/archive-instagram-tool";

const pageTitle = "Free Instagram Archive Viewer & Downloader | Xarchive";
const pageDescription =
  "Explore and download Instagram archive snapshots instantly. Xarchive lets you search, preview, and export Instagram data saved on the Wayback Machine in HTML, CSV, or JSON formats.";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://xarchive.net"),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "https://xarchive.net/archive-instagram",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://xarchive.net/archive-instagram",
    siteName: "Xarchive",
    type: "website",
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
              Try our <Link href="/archive-instagram" className="text-primary hover:underline">Instagram Archive tool</Link> or explore the <Link href="/" className="text-primary hover:underline">Twitter Archive version</Link>.
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
    </main>
  );
}

