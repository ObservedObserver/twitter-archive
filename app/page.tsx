import type { Metadata } from "next";
import Script from "next/script";

import ArchiveTool from "@/components/archive-tool";

const pageTitle = "Twitter Archive Free Online Tool | Xarchive";
const pageDescription =
  "Explore the Twitter archive with Xarchive.net. Search, preview, and download Wayback Machine tweet snapshots in seconds.";

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
    <main className="font-sans mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold">Twitter Archive Snapshot Explorer</h1>
        <p className="text-muted-foreground">
          Discover, preview, and export Twitter archive snapshots from Xarchive.net in
          seconds.
        </p>
        <p className="text-sm text-muted-foreground">
          Search Wayback Machine CDX data for tweets and download results in HTML,
          CSV, and JSON.
        </p>
      </div>

      <ArchiveTool />

      <section className="space-y-6" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold text-center">Twitter Archive FAQ</h2>
        <div className="space-y-4">
          {faqEntries.map((entry, index) => (
            <article key={entry.question} className="rounded-lg border p-4">
              <h3 className="text-lg font-medium">{entry.question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{entry.answer}</p>
            </article>
          ))}
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
