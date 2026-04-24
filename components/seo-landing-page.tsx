import Link from "next/link";
import Script from "next/script";

import { PageShell } from "@/components/page-shell";
import { TrackedToolLink } from "@/components/tracked-tool-link";

type SeoSection = {
  title: string;
  body: string;
};

type SeoFaq = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

type SeoLandingPageProps = {
  title: string;
  subtitle: string;
  canonicalUrl: string;
  source: string;
  tool: "twitter" | "instagram" | "reddit";
  toolHref: string;
  toolLabel: string;
  quickAnswer: string;
  steps: string[];
  sections: SeoSection[];
  faqs: SeoFaq[];
  relatedLinks: RelatedLink[];
};

export function SeoLandingPage({
  title,
  subtitle,
  canonicalUrl,
  source,
  tool,
  toolHref,
  toolLabel,
  quickAnswer,
  steps,
  sections,
  faqs,
  relatedLinks,
}: SeoLandingPageProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((entry) => ({
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
    name: title,
    description: subtitle,
    totalTime: "PT5M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
      url: canonicalUrl,
    })),
  };

  return (
    <PageShell title={title} subtitle={subtitle}>
      <section className="space-y-3">
        <p className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Quick answer:</span> {quickAnswer}
        </p>
        <div className="flex flex-wrap gap-3">
          <TrackedToolLink
            href={toolHref}
            source={source}
            tool={tool}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {toolLabel}
          </TrackedToolLink>
          <Link
            href="/guides"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Browse Guides
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Workflow</h2>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        {sections.map((section) => (
          <article key={section.title} className="space-y-2">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="text-muted-foreground">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3 rounded-lg border bg-muted/20 p-4">
        <h2 className="text-xl font-semibold">Data Source and Limits</h2>
        <p className="text-sm text-muted-foreground">
          Xarchive searches public Internet Archive CDX records. Coverage depends on what was publicly
          crawled, so an empty result means there is no matching public capture in the selected range,
          not that the original post never existed.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Related Workflows</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedLinks.map((link) => (
            <article key={link.href} className="rounded-lg border p-4">
              <Link href={link.href} className="font-medium text-primary hover:underline">
                {link.label}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {faqs.map((entry) => (
            <article key={entry.question} className="rounded-lg border p-4">
              <h3 className="font-medium">{entry.question}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{entry.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Script
        id={`faq-jsonld-${source}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id={`howto-jsonld-${source}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </PageShell>
  );
}

