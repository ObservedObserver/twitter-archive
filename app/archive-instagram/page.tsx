import type { Metadata } from "next";
import Script from "next/script";

import ArchiveInstagramTool from "@/components/archive-instagram-tool";

const pageTitle = "Instagram Archive Free Online Tool | Xarchive";
const pageDescription =
  "Explore the Instagram archive with Xarchive.net. Search, preview, and download Wayback Machine Instagram snapshots in seconds.";

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
    <main className="font-sans mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold">Instagram Archive Snapshot Explorer</h1>
        <p className="text-muted-foreground">
          Discover, preview, and export Instagram archive snapshots from Xarchive.net in
          seconds.
        </p>
        <p className="text-sm text-muted-foreground">
          Search Wayback Machine CDX data for Instagram posts and download results in HTML,
          CSV, and JSON.
        </p>
      </div>

      <ArchiveInstagramTool />

      <section className="space-y-6" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold text-center">Instagram Archive FAQ</h2>
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

