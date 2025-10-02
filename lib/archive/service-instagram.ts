import { DEFAULT_USER_AGENT } from "./constants";
import type { ArchiveFetchResult, ArchiveQueryOptions } from "./types";
import { normalizeArchiveDate } from "./utils";

const ARCHIVE_CDX_ENDPOINT = "https://web.archive.org/cdx/search/cdx";

type ArchiveApiError = {
  error: string;
};

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
    throw new Error(`No archived Instagram data found for username: ${username}. The user may not have been archived, or try a different date range.`);
  }

  return {
    rows: json as ArchiveFetchResult["rows"],
    showResumeKey,
  };
}

