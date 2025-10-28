import type { Metadata } from "next";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

import ArchiveInstagramTool from "@/components/archive-instagram-tool";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "instagram" });

  return {
    metadataBase: new URL("https://xarchive.net"),
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `https://xarchive.net${locale === "en" ? "" : `/${locale}`}/archive-instagram`,
      languages: {
        en: "https://xarchive.net/archive-instagram",
        ja: "https://xarchive.net/ja/archive-instagram",
        es: "https://xarchive.net/es/archive-instagram",
      },
    },
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      url: `https://xarchive.net${locale === "en" ? "" : `/${locale}`}/archive-instagram`,
      siteName: "Xarchive",
      type: "website",
      locale: locale,
    },
  };
}

export default function InstagramArchivePage() {
  const t = useTranslations("instagram");

  const faqEntries = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
    {
      question: t("faq.q4"),
      answer: t("faq.a4"),
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

  return (
    <main className="font-sans mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold">{t("hero.title")}</h1>
        <p className="text-muted-foreground">{t("hero.subtitle")}</p>
        <p className="text-sm text-muted-foreground">{t("hero.description")}</p>
      </div>

      <ArchiveInstagramTool />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t("sections.howToTitle")}</h2>
        <p className="text-muted-foreground">{t("sections.howToContent")}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t("sections.downloadTitle")}</h2>
        <p className="text-muted-foreground">{t("sections.downloadContent")}</p>
      </section>

      <section className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {t.rich("sections.tryTools", {
            instagramLink: (chunks) => (
              <Link href="/archive-instagram" className="text-primary hover:underline">
                {chunks}
              </Link>
            ),
            twitterLink: (chunks) => (
              <Link href="/" className="text-primary hover:underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </section>

      <section className="space-y-6" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold text-center">
          {t("faq.title")}
        </h2>
        <div className="space-y-4">
          {faqEntries.map((entry) => (
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
