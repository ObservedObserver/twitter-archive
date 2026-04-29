import { buildEmptyCdxRows, fetchArchiveCdxJson } from "./cdx";
import type { ArchiveFetchResult, ArchiveQueryOptions } from "./types";
import { normalizeArchiveDate } from "./utils";

export async function fetchInstagramArchiveCdx(
  options: ArchiveQueryOptions
): Promise<ArchiveFetchResult> {
  const {
    username,
    collapse,
    matchType,
    timestampFrom,
    timestampTo,
    limit,
    resumptionKey,
  } = options;

  const params = new URLSearchParams();
  // Search for Instagram posts - Instagram uses /p/ for posts, not username-based URLs
  // We'll search for the profile page which contains links to posts
  params.set("url", `instagram.com/${username}${matchType ? "" : "/*"}`);
  params.set("output", "json");
  params.set("filter", "statuscode:200");

  const normalizedFrom = normalizeArchiveDate(timestampFrom ?? undefined, false);
  const normalizedTo = normalizeArchiveDate(timestampTo ?? undefined, true);

  if (collapse) params.set("collapse", collapse);
  if (normalizedFrom) params.set("from", normalizedFrom);
  if (normalizedTo) params.set("to", normalizedTo);
  if (limit && limit > 0) params.set("limit", String(limit));
  if (resumptionKey) params.set("resumptionKey", resumptionKey);
  if (matchType) params.set("matchType", matchType);

  const showResumeKey = Boolean(limit && limit > 0);
  if (showResumeKey) params.set("showResumeKey", "true");

  const json = await fetchArchiveCdxJson(params);

  if (json.length === 0) {
    return {
      rows: buildEmptyCdxRows(),
      showResumeKey,
    };
  }

  return {
    rows: json as ArchiveFetchResult["rows"],
    showResumeKey,
  };
}
