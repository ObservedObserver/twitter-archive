import Link from "next/link";
import Script from "next/script";

import { PageShell } from "@/components/page-shell";
import type { GuideDefinition } from "@/lib/guides";

type GuidePageProps = {
  guide: GuideDefinition;
  relatedGuides: GuideDefinition[];
};

export function GuidePage({ guide, relatedGuides }: GuidePageProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };

  return (
    <PageShell title={guide.title} subtitle={guide.description}>
      <section className="space-y-3">
        <p className="text-muted-foreground">{guide.intro}</p>
        <p className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Quick answer:</span> {guide.quickAnswer}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Step-by-Step</h2>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
          {guide.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Common Failure Cases</h2>
        <div className="space-y-3">
          {guide.commonIssues.map((issue) => (
            <article key={issue.title} className="rounded-lg border p-4">
              <h3 className="font-medium">{issue.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{issue.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-lg border bg-muted/20 p-4">
        <h2 className="text-xl font-semibold">Data Source and Limitations</h2>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Data source:</span> Internet Archive CDX
          index (
          <a
            href="https://web.archive.org/cdx/search/cdx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://web.archive.org/cdx/search/cdx
          </a>
          ). Results depend on what was publicly crawled and stored.
        </p>
      </section>

      <section className="space-y-4 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Run This in Xarchive</h2>
        <p className="text-sm text-muted-foreground">
          Search captures, preview snapshots, and export your verified set in one flow.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Open Xarchive Tool
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Export JSON/CSV/HTML
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Related Guides</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          {relatedGuides.map((relatedGuide) => (
            <li key={relatedGuide.slug}>
              <Link
                href={`/guides/${relatedGuide.slug}`}
                className="text-primary hover:underline"
              >
                {relatedGuide.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {guide.faq.map((entry) => (
            <article key={entry.question} className="rounded-lg border p-4">
              <h3 className="font-medium">{entry.question}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{entry.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted-foreground">Last updated: February 25, 2026</p>

      <Script
        id={`faq-jsonld-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </PageShell>
  );
}
