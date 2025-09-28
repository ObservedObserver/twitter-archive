import { DEFAULT_USER_AGENT } from "./constants";
import type { ArchiveFetchResult, ArchiveQueryOptions } from "./types";
import { normalizeArchiveDate } from "./utils";

const ARCHIVE_CDX_ENDPOINT = "https://web.archive.org/cdx/search/cdx";

type ArchiveApiError = {
  error: string;
};

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

  const response = await fetch(`${ARCHIVE_CDX_ENDPOINT}?${params.toString()}`, {
    headers: {
      "User-Agent": DEFAULT_USER_AGENT,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Archive service responded with ${response.status}`);
  }

  const json = (await response.json()) as ArchiveApiError | unknown[];

  if (!Array.isArray(json) || json.length === 0) {
    throw new Error("No data returned by the archive service.");
  }

  return {
    rows: json as ArchiveFetchResult["rows"],
    showResumeKey,
  };
}
