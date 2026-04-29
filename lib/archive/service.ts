import { buildEmptyCdxRows, fetchArchiveCdxJson } from "./cdx";
import type { ArchiveFetchResult, ArchiveQueryOptions } from "./types";
import { normalizeArchiveDate } from "./utils";

export async function fetchArchiveCdx(
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
  params.set("url", `https://twitter.com/${username}/status${matchType ? "" : "/*"}`);
  params.set("output", "json");

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
