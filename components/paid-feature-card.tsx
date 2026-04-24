"use client";

import Link from "next/link";

import { trackEvent, type Surface } from "@/lib/analytics";

type PaidFeature = {
  id: string;
  title: string;
  description: string;
};

type PaidFeatureCardsProps = {
  surface: Exclude<Surface, "guide" | "early_access">;
  features?: PaidFeature[];
};

const defaultFeatures: PaidFeature[] = [
  {
    id: "batch_search",
    title: "Batch Search",
    description: "Check many profiles, posts, or URLs in one archive lookup.",
  },
  {
    id: "evidence_report",
    title: "Evidence Report",
    description: "Save timestamps, source URLs, archive URLs, and exports into one report.",
  },
  {
    id: "monitor_profile",
    title: "Monitor This Profile",
    description: "Get notified when a public archive target has new captures to review.",
  },
  {
    id: "api_access",
    title: "API Access",
    description: "Run archive searches from scripts, research workflows, or internal tools.",
  },
];

export function PaidFeatureCards({ surface, features = defaultFeatures }: PaidFeatureCardsProps) {
  return (
    <section className="rounded-lg border bg-muted/20 p-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Power User Features</h2>
        <p className="text-sm text-muted-foreground">
          These are early-access experiments. Your click helps us decide what to build first.
        </p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.id}
            href={`/early-access?feature=${encodeURIComponent(feature.id)}&surface=${encodeURIComponent(surface)}`}
            onClick={() =>
              trackEvent("paid_feature_click", {
                feature: feature.id,
                surface,
              })
            }
            className="rounded-lg border bg-background p-4 transition-colors hover:bg-muted/40"
          >
            <h3 className="font-medium">{feature.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

