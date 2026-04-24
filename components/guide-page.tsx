import Link from "next/link";
import Script from "next/script";

import { PageShell } from "@/components/page-shell";
import { TrackedToolLink } from "@/components/tracked-tool-link";
import {
  type GuideDefinition,
  getGuideHub,
  getGuideTopic,
} from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

type GuidePageProps = {
  guide: GuideDefinition;
  relatedGuides: GuideDefinition[];
};

export function GuidePage({ guide, relatedGuides }: GuidePageProps) {
  const topic = getGuideTopic(guide);
  const hub = getGuideHub(guide);
  const toolHref =
    topic === "instagram"
      ? "/archive-instagram"
      : topic === "reddit"
        ? "/archive-reddit"
        : "/";
  const toolLabel =
    topic === "instagram"
      ? "Open Instagram Archive Tool"
      : topic === "reddit"
        ? "Open Reddit Archive Tool"
        : "Open Twitter Archive Tool";
  const toolName =
    topic === "instagram" ? "instagram" : topic === "reddit" ? "reddit" : "twitter";
  const canonicalUrl = `${SITE_URL}/guides/${guide.slug}`;

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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    totalTime: "PT5M",
    tool: [
      {
        "@type": "HowToTool",
        name:
          topic === "instagram"
            ? "Xarchive Instagram Archive Explorer"
            : topic === "reddit"
              ? "Xarchive Reddit Archive Explorer"
              : "Xarchive Twitter Archive Explorer",
      },
    ],
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
      url: canonicalUrl,
    })),
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
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <PageShell title={guide.title} subtitle={guide.description}>
      <section className="space-y-3">
        <p className="text-muted-foreground">{guide.intro}</p>
        <p className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Quick answer:</span> {guide.quickAnswer}
        </p>
      </section>

      <section className="space-y-4 rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Start Here</h2>
        <p className="text-sm text-muted-foreground">
          Use the tool for the live archive lookup, then return to this guide when you need the repeatable workflow,
          failure cases, and the next pages to read.
        </p>
        <div className="flex flex-wrap gap-3">
          <TrackedToolLink
            href={toolHref}
            source={guide.slug}
            tool={toolName}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {toolLabel}
          </TrackedToolLink>
          <Link
            href={hub.href}
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {hub.label}
          </Link>
        </div>
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
          Search captures, preview snapshots, and export your verified set in one flow. Keep the original URL,
          archive URL, and timestamp together so the evidence bundle is easy to reuse later.
        </p>
        <div className="flex flex-wrap gap-3">
          <TrackedToolLink
            href={toolHref}
            source={guide.slug}
            tool={toolName}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {toolLabel}
          </TrackedToolLink>
          <Link
            href={hub.href}
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {hub.label}
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Related Workflows</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedGuides.map((relatedGuide) => (
            <article key={relatedGuide.slug} className="rounded-lg border p-4">
              <Link
                href={`/guides/${relatedGuide.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {relatedGuide.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{relatedGuide.description}</p>
            </article>
          ))}
        </div>
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

      <p className="text-xs text-muted-foreground">Last updated: April 6, 2026</p>

      <Script
        id={`faq-jsonld-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id={`howto-jsonld-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Script
        id={`breadcrumb-jsonld-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </PageShell>
  );
}
