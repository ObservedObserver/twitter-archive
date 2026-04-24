import { track } from "@vercel/analytics/server";

type AnalyticsProperties = Record<string, string | number | boolean | null>;

export async function trackServerEvent(
  request: Request,
  name: string,
  properties?: AnalyticsProperties
) {
  try {
    await track(name, properties, {
      headers: request.headers,
    });
  } catch {
    // Analytics should never block archive lookups or waitlist submissions.
  }
}

