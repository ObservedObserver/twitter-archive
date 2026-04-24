"use client";

import { track } from "@vercel/analytics";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

export type Surface = "twitter_tool" | "instagram_tool" | "reddit_tool" | "guide" | "early_access";

export function trackEvent(name: string, properties?: AnalyticsProperties) {
  track(name, properties);
}

export function trackToolEvent(
  name: string,
  surface: Extract<Surface, "twitter_tool" | "instagram_tool" | "reddit_tool">,
  properties?: AnalyticsProperties
) {
  trackEvent(name, {
    surface,
    ...properties,
  });
}

