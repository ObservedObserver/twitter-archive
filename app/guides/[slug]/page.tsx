import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuidePage } from "@/components/guide-page";
import {
  getAllGuides,
  getGuideBySlug,
  getRelatedGuides,
} from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type GuideArticlePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: GuideArticlePageProps): Metadata {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `${SITE_URL}/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${guide.title} | ${SITE_NAME}`,
      description: guide.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | ${SITE_NAME}`,
      description: guide.description,
    },
  };
}

export default function GuideArticlePage({ params }: GuideArticlePageProps) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  return <GuidePage guide={guide} relatedGuides={getRelatedGuides(guide)} />;
}
